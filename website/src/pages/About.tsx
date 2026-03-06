const About = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            关于项目
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            了解定时关机管理应用的背景和技术
          </p>
        </div>

        {/* 项目介绍 */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">项目介绍</h2>
          <p className="text-muted-foreground mb-4">
            定时关机管理是一款跨平台桌面应用程序，旨在帮助用户轻松管理电脑的定时关机、重启、休眠等系统操作。
          </p>
          <p className="text-muted-foreground mb-4">
            无论是需要定时自动关机节省电力，还是需要定时重启进行系统维护，或是需要定时锁定屏幕保护隐私，
            这款应用都能满足您的需求。
          </p>
          <p className="text-muted-foreground">
            我们致力于打造一款简单易用、安全可靠、轻量高效的定时任务管理工具。
          </p>
        </div>

        {/* 技术栈 */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">前端</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Arco Design</li>
                <li>• Zustand (状态管理)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">后端</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Tauri 2.0 (Rust)</li>
                <li>• Tokio (异步运行时)</li>
                <li>• Chrono (时间处理)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">构建工具</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Vite</li>
                <li>• TypeScript</li>
                <li>• Cargo (Rust)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">平台支持</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Windows 10/11</li>
                <li>• macOS 10.15+</li>
                <li>• Linux (主流发行版)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 开源信息 */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">开源信息</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              本项目采用 <strong className="text-foreground">MIT License</strong> 开源协议。
              您可以自由使用、修改和分发本软件。
            </p>
            <div>
              <h3 className="font-semibold text-foreground mb-2">相关链接</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/xujiehui/timing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub 仓库
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/xujiehui/timing/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    发布版本
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/xujiehui/timing/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    问题反馈
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 贡献 */}
        <div className="bg-muted/50 border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">贡献</h2>
          <p className="text-muted-foreground mb-4">
            我们欢迎所有形式的贡献！无论是报告问题、提出建议、改进文档，还是提交代码，都非常感谢。
          </p>
          <p className="text-muted-foreground">
            如果您想贡献代码，请先 Fork 本项目，创建功能分支，提交更改后发起 Pull Request。
            我们会尽快审查并合并您的贡献。
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
