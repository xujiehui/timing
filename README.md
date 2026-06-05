# 定时关机管理应用

一款跨平台桌面应用程序，用于管理电脑的定时关机、重启、休眠等系统操作。

## 功能特性

- ✅ 定时关机
- ✅ 定时重启
- ✅ 定时睡眠/休眠
- ✅ 定时锁定屏幕
- ✅ 任务列表管理
- ✅ 系统托盘支持
- ✅ 通知提醒
- ✅ 设置管理（主题、默认操作等）
- ✅ 跨平台支持（Windows、macOS、Linux）

## 技术栈

- **前端**: React + TypeScript + Tailwind CSS
- **后端**: Tauri (Rust)
- **状态管理**: Zustand
- **构建工具**: Vite

## 开发环境要求

- Node.js 18+
- Rust 1.70+
- 系统依赖（根据平台）:
  - Windows: 无需额外依赖
  - macOS: Xcode Command Line Tools
  - Linux: `libwebkit2gtk-4.0-dev`, `build-essential`, `curl`, `wget`, `libssl-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`

## 安装和运行

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装 Rust 依赖（首次运行时会自动安装）
cd src-tauri
cargo build
cd ..
```

### 开发模式

```bash
npm run dev
```

### 构建应用

```bash
npm run tauri build
```

构建产物将位于 `src-tauri/target/release/` 目录。

## 项目结构

```
timing/
├── src/                    # React 前端代码
│   ├── components/         # React 组件
│   ├── store.ts           # 状态管理
│   ├── types.ts           # TypeScript 类型定义
│   ├── utils.ts           # 工具函数
│   └── App.tsx            # 主应用组件
├── src-tauri/             # Rust 后端代码
│   ├── src/
│   │   ├── main.rs        # 主入口
│   │   ├── commands.rs    # Tauri 命令定义
│   │   ├── scheduler.rs   # 任务调度器
│   │   ├── system.rs      # 系统命令执行
│   │   └── storage.rs     # 设置存储
│   └── Cargo.toml         # Rust 依赖配置
├── package.json           # Node.js 依赖配置
└── README.md              # 项目说明
```

## 使用说明

1. **创建定时任务**:
   - 选择操作类型（关机、重启、睡眠、休眠、锁定）
   - 选择时间类型（绝对时间或相对时间）
   - 点击"创建任务"

2. **管理任务**:
   - 在任务列表中查看所有任务
   - 可以取消待执行的任务
   - 实时查看任务倒计时

3. **系统托盘**:
   - 应用可以最小化到系统托盘
   - 双击托盘图标恢复窗口
   - 右键菜单可以快速操作

4. **设置**:
   - 点击右上角设置图标
   - 可以设置主题、默认操作等

## 注意事项

- 执行系统操作（关机、重启等）需要管理员/root权限
- 不同平台对某些操作的支持可能不同
- 建议在测试环境中先验证功能

## 许可证

MIT License
