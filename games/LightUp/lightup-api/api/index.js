import express from 'express';
import pg from 'pg';
const { Pool } = pg;

const app = express();
app.use(express.json({ limit: '10mb' }));

// CORS 允许所有来源
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 数据库连接（Render 会自动注入 DATABASE_URL 环境变量）
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 初始化数据库表
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS levels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      width INT NOT NULL,
      height INT NOT NULL,
      max_lights INT NOT NULL,
      grid JSONB NOT NULL,
      preview_grid JSONB NOT NULL,
      created_at BIGINT NOT NULL
    )
  `);
}
initDB();

// 获取关卡列表
app.get('/api/levels', async (req, res) => {
  const { category, size } = req.query;
  let sql = 'SELECT id, name, category, width, height, preview_grid, created_at FROM levels';
  const params = [];
  const conditions = [];
  
  if (category) {
    conditions.push(`category = $${params.length + 1}`);
    params.push(category);
  }
  if (size) {
    conditions.push(`width = $${params.length + 1}`);
    params.push(parseInt(size));
  }
  
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY created_at DESC';
  
  const result = await pool.query(sql, params);
  res.json({
    success: true,
    levels: result.rows.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      width: r.width,
      height: r.height,
      createTime: r.created_at,
      previewGrid: r.preview_grid
    }))
  });
});

// 获取单个关卡详情
app.get('/api/level/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM levels WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ success: false, error: '关卡不存在' });
  }
  res.json({ success: true, level: result.rows[0] });
});

// 上传关卡
app.post('/api/levels', async (req, res) => {
  const { name, category, width, height, grid, maxLights } = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
  const previewGrid = grid.slice(0, 6).map(row => row.slice(0, 6));
  
  await pool.query(
    `INSERT INTO levels (id, name, category, width, height, max_lights, grid, preview_grid, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [id, name, category, width, height, maxLights || Math.floor(width * height * 0.15),
     JSON.stringify(grid), JSON.stringify(previewGrid), Date.now()]
  );
  
  res.json({ success: true, levelId: id });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));