// ==================== 配置文件 ====================
// 在这里修改你的个人资料和网站配置

const profileConfig = {
    authorName: "雨巷猫归",
    bio: "音乐制作人 | 独立游戏开发者\n热爱创作独特的音乐谱面和有趣的游戏体验",
    avatarUrl: "images/avatar.jpg",
    lastUpdate: "2026-03-22"
};

// 谱面文件分类 - 同一个谱面有ZIP和PEZ两种格式
// 每个谱面对象包含 name（显示名称），zipFile（ZIP文件名），pezFile（PEZ文件名），size（大小）
const sheetFilesConfig = {
    zip: [
        { name: "Gravitational Revert", filename: "Gravitational Revert.zip", size: "3.41 MB", sheetId: 1 },
        { name: "Meltovt Necrosys", filename: "Meltovt Necrosys.zip", size: "1.8 MB", sheetId: 2 },
        { name: "Terrasphere", filename: "Terrasphere.zip", size: "3.1 MB", sheetId: 3 },
        { name: "蝎虎天体 -Lacertid-", filename: "蝎虎天体 -Lacertid-.zip", size: "2.64 MB", sheetId: 4 }
    ],
    pez: [
        { name: "Gravitational Revert", filename: "Gravitational Revert.pez", size: "3.41 MB", sheetId: 1 },
        { name: "Meltovt Necrosys", filename: "Meltovt Necrosys.pez", size: "1.5 MB", sheetId: 2 },
        { name: "Terrasphere", filename: "Terrasphere.pez", size: "2.8 MB", sheetId: 3 },
        { name: "蝎虎天体 -Lacertid-", filename: "蝎虎天体 -Lacertid-.pez", size: "2.64 MB", sheetId: 4 }
    ]
};

// 计算谱面数量（按 sheetId 去重）
function getUniqueSheetCount() {
    const uniqueSheets = new Set();
    
    // 遍历所有ZIP文件
    sheetFilesConfig.zip.forEach(file => {
        if (file.sheetId) {
            uniqueSheets.add(file.sheetId);
        }
    });
    
    // 遍历所有PEZ文件
    sheetFilesConfig.pez.forEach(file => {
        if (file.sheetId) {
            uniqueSheets.add(file.sheetId);
        }
    });
    
    return uniqueSheets.size;
}

// 根据当前文件类型获取显示列表
function getFileListByType(type) {
    if (type === 'zip') {
        return sheetFilesConfig.zip;
    } else {
        return sheetFilesConfig.pez;
    }
}

// ==================== 程序代码 ====================
// 以下为程序代码，不需要修改

// 当前激活的文件类型
let currentFileType = 'zip';

// 主题模式 - 默认设为深色模式
let currentTheme = 'drak';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    setupEventListeners();
    loadTheme();
});

// 加载个人资料
function loadProfile() {
    document.getElementById('author-name').textContent = profileConfig.authorName;
    document.getElementById('bio').textContent = profileConfig.bio;
    document.getElementById('avatar').src = profileConfig.avatarUrl;
    updateSheetCount();
    document.getElementById('update-date').textContent = profileConfig.lastUpdate;
}

// 更新谱面总数（显示去重后的数量）
function updateSheetCount() {
    const uniqueCount = getUniqueSheetCount();
    document.getElementById('sheet-count').textContent = uniqueCount;
}

// 设置事件监听器
function setupEventListeners() {
    const sheetBtn = document.getElementById('sheet-btn');
    const gameBtn = document.getElementById('game-btn');
    const sheetModal = document.getElementById('sheet-modal');
    const closeSheetBtn = document.querySelector('#sheet-modal .close');
    const themeBtn = document.getElementById('theme-btn');
    
    // 谱面文件按钮
    sheetBtn.addEventListener('click', () => {
        showFileList(currentFileType);
        sheetModal.style.display = 'block';
    });
    
    // 在线游戏按钮 - 跳转到游戏选择页面
    gameBtn.addEventListener('click', () => {
        window.location.href = 'games.html';
    });
    
    // 关闭模态框
    closeSheetBtn.addEventListener('click', () => {
        sheetModal.style.display = 'none';
    });
    
    // 点击模态框背景关闭
    window.addEventListener('click', (e) => {
        if (e.target === sheetModal) {
            sheetModal.style.display = 'none';
        }
    });
    
    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.getAttribute('data-type');
            switchFileType(type);
            
            // 更新激活状态
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // 主题切换
    themeBtn.addEventListener('click', toggleTheme);
}

// 切换文件类型
function switchFileType(type) {
    currentFileType = type;
    showFileList(type);
}

// 显示文件列表
function showFileList(type) {
    const fileListDiv = document.getElementById('file-list');
    const files = getFileListByType(type);
    
    if (!files || files.length === 0) {
        fileListDiv.innerHTML = '<div class="empty-message">📭 暂无文件</div>';
        return;
    }
    
    let html = '';
    files.forEach(file => {
        const fileIcon = type === 'zip' ? '📦' : '🎵';
        // 如果是PEZ格式，显示对应的ZIP名称
        const displayName = type === 'pez' ? `${file.name} (PEZ格式)` : file.name;
        
        html += `
            <div class="file-item">
                <div class="file-name">
                    <span>${fileIcon}</span>
                    <span>${escapeHtml(displayName)}</span>
                    <span style="font-size: 11px; color: #999;">(${file.size})</span>
                </div>
                <button class="download-btn" data-filename="${file.filename}">
                    📥 下载
                </button>
            </div>
        `;
    });
    
    fileListDiv.innerHTML = html;
    
    // 为所有下载按钮添加事件
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const filename = btn.getAttribute('data-filename');
            downloadFile(filename);
        });
    });
}

// 下载文件
function downloadFile(filename) {
    const filePath = `files/${filename}`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`开始下载: ${filename}`);
}

// 切换主题
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    
    if (currentTheme === 'dark') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        currentTheme = 'light';
        themeBtn.innerHTML = '🌙 深色模式';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        currentTheme = 'dark';
        themeBtn.innerHTML = '☀️ 浅色模式';
        localStorage.setItem('theme', 'dark');
    }
}

// 加载保存的主题 - 如果没有保存，默认深色模式
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    // 如果有保存的主题，使用保存的主题；否则默认深色模式
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        currentTheme = 'light';
        document.getElementById('theme-btn').innerHTML = '🌙 深色模式';
    } else {
        // 默认深色模式（包括没有保存的情况）
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        currentTheme = 'dark';
        document.getElementById('theme-btn').innerHTML = '☀️ 浅色模式';
        // 如果没有保存过主题，保存默认深色模式
        if (!savedTheme) {
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Toast提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1001;
        animation: fadeInOut 2s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 防止XSS攻击
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);