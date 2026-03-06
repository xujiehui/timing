# 定时关机管理应用官网

这是定时关机管理应用的官方网站项目。

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产构建
pnpm run preview
```

## 部署

网站通过 GitHub Actions 自动部署到 GitHub Pages。

当 `website/` 目录下的文件有变更并推送到主分支时，会自动触发部署流程。

访问地址：https://xujiehui.github.io/timing/
