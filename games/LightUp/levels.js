// levels.js - 关卡配置文件
// 使用说明：
// 0 = empty (空格)
// 1 = obstacle (障碍)
// 2~6 = number:0~4 (数字块，2代表0，3代表1，4代表2，5代表3，6代表4)
// 7 = mirror1 (╱ 镜面)
// 8 = mirror2 (╲ 镜面)
// 9 = scatter (۞ 散射)

// 辅助函数：生成指定大小的空白盘面
function generateEmptyGrid(width, height) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return parseLevelGrid(grid);
}

const LEVELS_CATEGORIES = {
  // ========== 常规分类 ==========
  regular: {
    name: "常规",
    sizes: {
      8: {
        "1": {
          id: "R-8-1",
          displayName: "关卡1",
          width: 8,
          height: 8,
          maxLights: 9,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,0],
            [0,2,0,0,2,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,2,0,0,3,0],
            [0,2,0,0,2,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,3,0,0,2,0],
            [0,0,0,0,0,0,0,0]
          ])
        },
        "2": {
          id: "R-8-2",
          displayName: "关卡2",
          width: 8,
          height: 8,
          maxLights: 9,
          grid: parseLevelGrid([
            [3,0,0,0,0,0,0,0],
            [0,0,4,0,0,3,2,0],
            [0,4,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [2,0,0,2,0,3,2,0],
            [0,3,0,0,0,0,0,0],
            [0,0,3,0,0,0,0,0],
            [0,0,0,0,0,0,0,3]
          ])
        },
        "3": {
          id: "R-8-3",
          displayName: "关卡3",
          width: 8,
          height: 8,
          maxLights: 9,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,0],
            [0,2,0,0,0,3,0,3],
            [0,0,0,2,0,0,0,0],
            [3,0,0,0,0,0,0,0],
            [0,0,3,0,0,2,0,0],
            [0,0,0,0,2,0,0,0],
            [0,3,0,0,3,0,3,0],
            [0,0,0,0,0,0,0,0]
          ])
        },
        "4": {
          id: "R-8-4",
          displayName: "关卡4",
          width: 8,
          height: 8,
          maxLights: 6,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,0],
            [0,0,2,0,0,2,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,2,0,0],
            [0,0,0,0,0,0,0,0],
            [2,0,2,0,0,2,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,2,0,0]
          ])
        },
        "5": {
          id: "R-8-5",
          displayName: "关卡5",
          width: 8,
          height: 8,
          maxLights: 6,
          grid: parseLevelGrid([
            [2,0,2,0,0,0,0,2],
            [0,0,0,0,0,0,0,0],
            [2,0,2,0,2,0,2,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,2,0,2,0,2,0],
            [2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,2,0]
          ])
        },
        "6": {
          id: "R-8-6",
          displayName: "关卡6",
          width: 8,
          height: 8,
          maxLights: 8,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,0],
            [0,1,0,0,0,3,1,0],
            [0,0,1,0,3,1,0,0],
            [0,2,0,2,2,0,3,0],
            [0,0,0,0,0,0,0,0],
            [0,3,0,0,0,0,2,0],
            [0,1,0,3,2,0,1,0],
            [0,2,0,0,0,0,3,0]
          ])
        }
      },
      9: {
        "1": {
          id: "R-9-1",
          displayName: "关卡1",
          width: 9,
          height: 9,
          maxLights: 9,
          grid: parseLevelGrid([
            [0,0,0,3,0,0,0,3,0],
            [0,2,0,0,0,0,0,0,0],
            [0,0,2,0,2,0,3,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,2,0,2,0,3,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,3,0,3,0,2,0,0],
            [3,0,0,0,0,0,0,2,0],
            [0,0,0,0,0,3,0,0,0]
          ])
        },
        "2": {
          id: "R-9-2",
          displayName: "关卡2",
          width: 9,
          height: 9,
          maxLights: 13,
          grid: parseLevelGrid([
            [0,0,0,0,3,0,0,0,0],
            [0,2,0,0,0,3,0,0,0],
            [0,0,0,2,0,0,0,2,0],
            [0,0,0,0,0,0,0,0,0],
            [2,2,0,0,4,0,3,0,3],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,2,0,0,0,2,0],
            [0,2,0,0,0,2,0,0,0],
            [0,0,0,0,3,0,0,0,0]
          ])
        }
      },
      10: {
        "1": {
          id: "R-10-1",
          displayName: "关卡1",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: generateEmptyGrid(10, 10)
        },
        "2": {
          id: "R-10-2",
          displayName: "关卡2",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,0,0,0],
            [0,5,0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,9,0,2],
            [0,0,0,3,0,0,1,0,0,0],
            [0,0,0,0,7,0,0,1,0,0],
            [1,0,0,0,0,0,0,0,1,1],
            [0,9,1,0,0,9,3,0,0,3],
            [8,0,0,0,1,0,0,0,0,0],
            [0,3,0,0,2,1,0,0,5,0],
            [0,0,0,2,0,1,0,0,0,0]
          ])
        },
        "3": {
          id: "R-10-3",
          displayName: "关卡3",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,0,1,0,0,1,0,0,0],
            [0,0,2,0,0,0,0,2,0,0],
            [0,0,0,0,3,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,1],
            [0,0,2,0,0,0,0,2,0,0],
            [0,0,0,1,0,0,1,0,0,0]
          ])
        }
      },
      11: {
        "1": {
          id: "R-11-1",
          displayName: "关卡1",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "2": {
          id: "R-11-2",
          displayName: "关卡2",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,0,0,0,1,0,0,0,0,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [0,0,2,0,0,0,0,0,2,0,0],
            [0,1,0,0,0,0,0,0,0,1,0],
            [0,0,0,0,0,3,0,0,0,0,0],
            [1,0,0,0,3,0,3,0,0,0,1],
            [0,0,0,0,0,3,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,1,0],
            [0,0,2,0,0,0,0,0,2,0,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,1,0,0,0,0,0]
          ])
        }
      },
      12: {
        "1": {
          id: "R-12-1",
          displayName: "关卡1",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "2": {
          id: "R-12-2",
          displayName: "关卡2",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0],
            [0,0,0,2,0,0,0,0,0,0,0,0],
            [0,0,2,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,1,0],
            [0,0,0,0,0,3,0,0,0,0,0,0],
            [0,0,0,0,0,3,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0,2,0,0,0],
            [0,0,0,0,0,0,0,0,0,2,0,0],
            [0,0,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
          ])
        }
      }
      // 13x13 到 20x20 会由下面的批量生成函数自动添加
    }
  },

  // ========== 镜面分类 ==========
  mirror: {
    name: "镜面",
    sizes: {
      8: {
        "1": {
          id: "M-8-1",
          displayName: "关卡1",
          width: 8,
          height: 8,
          maxLights: 7,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,8],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,5,0,0],
            [0,0,0,0,0,0,0,0],
            [0,2,0,3,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,3,0,2,0,0,0,0],
            [0,0,0,0,0,0,0,7]
          ])
        },
        "2": {
          id: "M-8-2",
          displayName: "关卡2",
          width: 8,
          height: 8,
          maxLights: 8,
          grid: parseLevelGrid([
            [0,0,0,0,0,0,0,2],
            [0,2,0,0,0,2,0,0],
            [0,0,0,2,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [2,0,0,0,0,0,0,0],
            [0,0,0,2,0,0,0,0],
            [0,2,0,0,0,2,8,0],
            [0,0,8,0,0,0,0,0]
          ])
        }
      },
      9: {
        "1": {
          id: "M-9-1",
          displayName: "关卡1",
          width: 9,
          height: 9,
          maxLights: 1,
          grid: generateEmptyGrid(9, 9)
        },
        "2": {
          id: "M-9-2",
          displayName: "关卡2",
          width: 9,
          height: 9,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,7,0,0,0,8,0,0],
            [0,0,0,0,0,0,0,0,0],
            [7,0,0,1,0,1,0,0,8],
            [0,0,1,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,1,0,0],
            [8,0,0,1,0,1,0,0,7],
            [0,0,0,0,0,0,0,0,0],
            [0,0,8,0,0,0,7,0,0]
          ])
        }
      },
      10: {
        "1": {
          id: "M-10-1",
          displayName: "关卡1",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: generateEmptyGrid(10, 10)
        },
        "2": {
          id: "M-10-2",
          displayName: "关卡2",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,0,7,0,0,8,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,7,0,0,0,0,8,0,0],
            [0,0,0,0,1,1,0,0,0,0],
            [0,0,0,1,0,0,1,0,0,0],
            [0,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,1,1,0,0,0,0],
            [0,0,8,0,0,0,0,7,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,8,0,0,7,0,0,0]
          ])
        }
      },
      // 添加 11x11 镜面关卡（空白盘面）
      11: {
        "1": {
          id: "M-11-1",
          displayName: "关卡1",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "2": {
          id: "M-11-2",
          displayName: "关卡2",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "3": {
          id: "M-11-3",
          displayName: "关卡3",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        }
      },
      // 添加 12x12 镜面关卡（空白盘面）
      12: {
        "1": {
          id: "M-12-1",
          displayName: "关卡1",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "2": {
          id: "M-12-2",
          displayName: "关卡2",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "3": {
          id: "M-12-3",
          displayName: "关卡3",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        }
      }
    }
  },

  // ========== 散射分类 ==========
  scatter: {
    name: "散射",
    sizes: {
      8: {
        "1": {
          id: "S-8-1",
          displayName: "关卡1",
          width: 8,
          height: 8,
          maxLights: 1,
          grid: generateEmptyGrid(8, 8)
        },
        "2": {
          id: "S-8-2",
          displayName: "关卡2",
          width: 8,
          height: 8,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,0,0,9,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,9,0,0,0,9,0],
            [0,0,0,1,0,1,0,0],
            [0,0,0,1,0,1,0,0],
            [0,0,9,0,0,0,9,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,9,0,0,0]
          ])
        }
      },
      9: {
        "1": {
          id: "S-9-1",
          displayName: "关卡1",
          width: 9,
          height: 9,
          maxLights: 1,
          grid: generateEmptyGrid(9, 9)
        }
      },
      10: {
        "1": {
          id: "S-10-1",
          displayName: "关卡1",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: generateEmptyGrid(10, 10)
        }
      },
      // 添加 11x11 散射关卡（空白盘面）
      11: {
        "1": {
          id: "S-11-1",
          displayName: "关卡1",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "2": {
          id: "S-11-2",
          displayName: "关卡2",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "3": {
          id: "S-11-3",
          displayName: "关卡3",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        }
      },
      // 添加 12x12 散射关卡（空白盘面）
      12: {
        "1": {
          id: "S-12-1",
          displayName: "关卡1",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "2": {
          id: "S-12-2",
          displayName: "关卡2",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "3": {
          id: "S-12-3",
          displayName: "关卡3",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        }
      }
    }
  },

  // ========== 综合分类 ==========
  mixed: {
    name: "综合",
    sizes: {
      8: {
        "1": {
          id: "C-8-1",
          displayName: "关卡1",
          width: 8,
          height: 8,
          maxLights: 1,
          grid: generateEmptyGrid(8, 8)
        },
        "2": {
          id: "C-8-2",
          displayName: "关卡2",
          width: 8,
          height: 8,
          maxLights: 1,
          grid: parseLevelGrid([
            [0,0,7,0,0,9,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,1,0,0,1,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,8,0,0,9,0,0]
          ])
        }
      },
      9: {
        "1": {
          id: "C-9-1",
          displayName: "关卡1",
          width: 9,
          height: 9,
          maxLights: 1,
          grid: generateEmptyGrid(9, 9)
        }
      },
      10: {
        "1": {
          id: "C-10-1",
          displayName: "关卡1",
          width: 10,
          height: 10,
          maxLights: 1,
          grid: generateEmptyGrid(10, 10)
        }
      },
      // 添加 11x11 综合关卡（空白盘面）
      11: {
        "1": {
          id: "C-11-1",
          displayName: "关卡1",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "2": {
          id: "C-11-2",
          displayName: "关卡2",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        },
        "3": {
          id: "C-11-3",
          displayName: "关卡3",
          width: 11,
          height: 11,
          maxLights: 1,
          grid: generateEmptyGrid(11, 11)
        }
      },
      // 添加 12x12 综合关卡（空白盘面）
      12: {
        "1": {
          id: "C-12-1",
          displayName: "关卡1",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "2": {
          id: "C-12-2",
          displayName: "关卡2",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        },
        "3": {
          id: "C-12-3",
          displayName: "关卡3",
          width: 12,
          height: 12,
          maxLights: 1,
          grid: generateEmptyGrid(12, 12)
        }
      }
    }
  }
};

// 批量生成从 13x13 到 20x20 的空白关卡（每个尺寸3个关卡）
function batchGenerateLevels() {
  const categories = ['regular', 'mirror', 'scatter', 'mixed'];
  const categoryPrefix = {
    regular: 'R',
    mirror: 'M',
    scatter: 'S',
    mixed: 'C'
  };
  const sizes = [13, 14, 15, 16, 17, 18, 19, 20];
  const levelsPerSize = 0;
  
  for (let catName of categories) {
    const category = LEVELS_CATEGORIES[catName];
    const prefix = categoryPrefix[catName];
    for (let size of sizes) {
      if (!category.sizes[size]) {
        category.sizes[size] = {};
      }
      for (let i = 1; i <= levelsPerSize; i++) {
        const levelId = `${prefix}-${size}-${i}`;
        if (!category.sizes[size][i]) {
          category.sizes[size][i] = {
            id: levelId,
            displayName: `关卡${i}`,
            width: size,
            height: size,
            maxLights: Math.floor(size * size * 0.15),
            grid: generateEmptyGrid(size, size)
          };
        }
      }
    }
  }
}

// 执行批量生成
batchGenerateLevels();

function parseLevelGrid(simpleGrid) {
  return simpleGrid.map(row => row.map(cell => {
    if (cell === 0) return 'empty';
    if (cell === 1) return 'obstacle';
    if (cell >= 2 && cell <= 6) return `number:${cell - 2}`;
    if (cell === 7) return 'mirror1';
    if (cell === 8) return 'mirror2';
    if (cell === 9) return 'scatter';
    return 'empty';
  }));
}

// 为兼容旧代码，保留 LEVELS 变量
const LEVELS = LEVELS_CATEGORIES.mixed.levels;