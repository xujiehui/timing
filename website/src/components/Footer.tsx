import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* 品牌和描述 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/timing/icon.svg" 
                alt="定时关机管理" 
                className="w-8 h-8"
              />
              <h3 className="text-lg font-semibold text-foreground tracking-tight">定时关机管理</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              一款跨平台桌面应用程序，用于管理电脑的定时关机、重启、休眠等系统操作。
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/xujiehui/timing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 导航链接 */}
          <div>
            <h4 className="text-sm font-semibold mb-5 text-foreground">导航</h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: '首页' },
                { path: '/features', label: '功能' },
                { path: '/download', label: '下载' },
                { path: '/docs', label: '文档' },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 资源链接 */}
          <div>
            <h4 className="text-sm font-semibold mb-5 text-foreground">资源</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/xujiehui/timing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                >
                  源代码
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/xujiehui/timing/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                >
                  问题反馈
                </a>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                >
                  关于
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 定时关机管理. MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
