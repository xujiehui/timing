const About = () => {
  return (
    <div className="py-24 md:py-32">
      <div className="container max-w-5xl">
        <div className="text-center mb-20 md:mb-24">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            关于项目
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            了解定时关机管理应用的背景和技术
          </p>
        </div>

        {/* 项目介绍 */}
        <div className="bg-card/50 border border-border/50 rounded-2xl p-8 md:p-10 mb-10 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">项目介绍</h2>
          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              定时关机管理是一款跨平台桌面应用程序，旨在帮助用户轻松管理电脑的定时关机、重启、休眠等系统操作。
            </p>
            <p>
              无论是需要定时自动关机节省电力，还是需要定时重启进行系统维护，或是需要定时锁定屏幕保护隐私，
              这款应用都能满足您的需求。
            </p>
            <p>
              我们致力于打造一款简单易用、安全可靠、轻量高效的定时任务管理工具。
            </p>
          </div>
        </div>

        {/* 技术栈 */}
        <div className="bg-card/50 border border-border/50 rounded-2xl p-8 md:p-10 mb-10 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">技术栈</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">前端</h3>
              <ul className="space-y-2 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>React 18 + TypeScript</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Arco Design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Zustand (状态管理)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">后端</h3>
              <ul className="space-y-2 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Tauri 2.0 (Rust)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Tokio (异步运行时)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Chrono (时间处理)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">构建工具</h3>
              <ul className="space-y-2 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Vite</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Cargo (Rust)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">平台支持</h3>
              <ul className="space-y-2 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Windows 10/11</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>macOS 10.15+</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1.5 font-bold">•</span>
                  <span>Linux (主流发行版)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 开源信息 */}
        <div className="bg-card/50 border border-border/50 rounded-2xl p-8 md:p-10 mb-10 shadow-lg hover-lift transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">开源信息</h2>
          <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              本项目采用 <strong className="text-foreground font-semibold">MIT License</strong> 开源协议。
              您可以自由使用、修改和分发本软件。
            </p>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">相关链接</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/xujiehui/timing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors"
                  >
                    GitHub 仓库
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/xujiehui/timing/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors"
                  >
                    发布版本
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/xujiehui/timing/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors"
                  >
                    问题反馈
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 贡献 */}
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">贡献</h2>
          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              我们欢迎所有形式的贡献！无论是报告问题、提出建议、改进文档，还是提交代码，都非常感谢。
            </p>
            <p>
              如果您想贡献代码，请先 Fork 本项目，创建功能分支，提交更改后发起 Pull Request。
              我们会尽快审查并合并您的贡献。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
