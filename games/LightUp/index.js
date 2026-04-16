// index.js - 明灯谜境后端API

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

function handleOptions() {
  return new Response(null, { headers: corsHeaders });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
}

function validateLevel(levelData) {
  const { name, category, width, height, grid } = levelData;
  
  if (!name || name.length === 0 || name.length > 30) return false;
  if (!category || !['regular', 'mirror', 'scatter', 'mixed'].includes(category)) return false;
  if (!width || !height || width < 3 || width > 20 || height < 3 || height > 20) return false;
  if (!grid || !Array.isArray(grid) || grid.length !== height) return false;
  
  for (let row of grid) {
    if (!Array.isArray(row) || row.length !== width) return false;
    for (let val of row) {
      if (val < 0 || val > 9) return false;
    }
  }
  return true;
}

async function getLevelsIndex(env) {
  const index = await env.LEVELS_KV.get('levels_index', 'json');
  if (!index) {
    const initIndex = { version: "1.0", lastUpdate: Date.now(), levels: [] };
    await env.LEVELS_KV.put('levels_index', JSON.stringify(initIndex));
    return initIndex;
  }
  return index;
}

async function saveLevelsIndex(env, index) {
  index.lastUpdate = Date.now();
  await env.LEVELS_KV.put('levels_index', JSON.stringify(index));
}

async function handleGetLevels(request, env) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') || '';
  const size = url.searchParams.get('size') || '';
  
  const index = await getLevelsIndex(env);
  let levels = [...index.levels];
  
  if (category) {
    levels = levels.filter(l => l.category === category);
  }
  if (size) {
    levels = levels.filter(l => l.width === parseInt(size));
  }
  
  levels.sort((a, b) => b.createTime - a.createTime);
  
  return new Response(JSON.stringify({
    success: true,
    total: levels.length,
    levels: levels.map(l => ({
      id: l.id,
      name: l.name,
      category: l.category,
      width: l.width,
      height: l.height,
      createTime: l.createTime,
      previewGrid: l.previewGrid
    }))
  }), { headers: corsHeaders });
}

async function handleGetLevel(request, env) {
  const url = new URL(request.url);
  const levelId = url.pathname.split('/').pop();
  
  const levelData = await env.LEVELS_KV.get(`level_${levelId}`, 'json');
  if (!levelData) {
    return new Response(JSON.stringify({ success: false, error: '关卡不存在' }), 
      { status: 404, headers: corsHeaders });
  }
  
  return new Response(JSON.stringify({
    success: true,
    level: levelData
  }), { headers: corsHeaders });
}

async function handleUploadLevel(request, env) {
  try {
    const body = await request.json();
    const { name, category, width, height, grid, maxLights } = body;
    
    const levelData = { name, category, width, height, grid, maxLights };
    
    if (!validateLevel(levelData)) {
      return new Response(JSON.stringify({ success: false, error: '关卡数据无效' }), 
        { status: 400, headers: corsHeaders });
    }
    
    const levelId = `L_${generateId()}`;
    const now = Date.now();
    
    const previewGrid = grid.slice(0, 6).map(row => row.slice(0, 6));
    
    const fullLevel = {
      id: levelId,
      name,
      category,
      width,
      height,
      maxLights: maxLights || Math.floor(width * height * 0.15),
      grid,
      createTime: now
    };
    
    await env.LEVELS_KV.put(`level_${levelId}`, JSON.stringify(fullLevel));
    
    const index = await getLevelsIndex(env);
    index.levels.unshift({
      id: levelId,
      name,
      category,
      width,
      height,
      createTime: now,
      previewGrid
    });
    await saveLevelsIndex(env, index);
    
    return new Response(JSON.stringify({
      success: true,
      levelId: levelId,
      message: '上传成功'
    }), { headers: corsHeaders });
    
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), 
      { status: 500, headers: corsHeaders });
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }
    
    const url = new URL(request.url);
    const path = url.pathname;
    
    if (path === '/api/levels' && request.method === 'GET') {
      return handleGetLevels(request, env);
    }
    if (path === '/api/levels' && request.method === 'POST') {
      return handleUploadLevel(request, env);
    }
    if (path.startsWith('/api/level/') && request.method === 'GET') {
      return handleGetLevel(request, env);
    }
    
    return new Response(JSON.stringify({ error: 'Not Found' }), 
      { status: 404, headers: corsHeaders });
  }
};