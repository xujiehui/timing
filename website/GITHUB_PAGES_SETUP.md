# GitHub Pages 配置指南

## 当前状态

GitHub Pages 当前配置为从 `gh-pages-deploy` 分支直接部署，但我们的项目使用 GitHub Actions workflow 来构建和部署。

## 配置步骤

### 1. 访问 GitHub 仓库设置

1. 打开浏览器，访问你的 GitHub 仓库：`https://github.com/xujiehui/timing`
2. 点击仓库页面顶部的 **Settings** 标签
3. 在左侧菜单中找到并点击 **Pages** 选项

### 2. 修改部署源

在 "Build and deployment" 部分：

1. 找到 **Source** 下拉菜单（当前显示为 "Deploy from a branch"）
2. 点击下拉菜单，选择 **"GitHub Actions"**
3. 点击 **Save** 按钮保存更改

### 3. 验证配置

修改完成后：

- GitHub Pages 将使用 `.github/workflows/deploy-website.yml` workflow 进行部署
- 当向以下分支推送 `website/` 目录的更改时，会自动触发构建和部署：
  - `main`
  - `master`
  - `gh-pages-deploy`

### 4. 测试部署

1. 向 `gh-pages-deploy` 分支推送一些更改（例如修改 `website/` 目录下的文件）
2. 访问 **Actions** 标签页，查看 workflow 运行状态
3. 部署完成后，访问 `https://xujiehui.github.io/timing/` 查看更新

## Workflow 工作流程

当触发部署时，workflow 会执行以下步骤：

1. **Checkout** - 检出代码
2. **Setup pnpm** - 设置 pnpm 包管理器
3. **Setup Node.js** - 设置 Node.js 环境
4. **Install dependencies** - 安装项目依赖（`pnpm install`）
5. **Build website** - 构建网站（`pnpm run build`）
6. **Setup Pages** - 配置 GitHub Pages
7. **Upload artifact** - 上传构建产物（`website/dist`）
8. **Deploy to GitHub Pages** - 部署到 GitHub Pages

## 注意事项

- 确保 workflow 文件 `.github/workflows/deploy-website.yml` 已推送到仓库
- 部署只会在 `main` 或 `gh-pages-deploy` 分支触发（避免 `master` 分支的环境保护规则问题）
- 如果部署失败，可以在 Actions 标签页查看详细日志

## 故障排除

如果遇到问题：

1. 检查 Actions 标签页中的 workflow 运行日志
2. 确认 GitHub Pages 设置中 Source 已改为 "GitHub Actions"
3. 确认 workflow 文件语法正确
4. 检查是否有足够的权限（需要 `pages: write` 权限）
