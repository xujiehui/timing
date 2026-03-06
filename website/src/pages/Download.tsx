import { useEffect, useState } from 'react';
import DownloadButton from '../components/DownloadButton';

const Download = () => {
  const [platform, setPlatform] = useState<'windows' | 'macos' | 'linux'>('windows');

  useEffect(() => {
    // 自动检测用户操作系统
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) {
      setPlatform('windows');
    } else if (userAgent.includes('mac')) {
      setPlatform('macos');
    } else if (userAgent.includes('linux')) {
      setPlatform('linux');
    }
  }, []);

  const platforms = [
    {
      id: 'windows' as const,
      name: 'Windows',
      version: 'Windows 10/11',
      requirements: ['Windows 10 或更高版本', 'x64 或 ARM 架构'],
      installSteps: [
        '下载 .exe 安装包',
        '双击运行安装程序',
        '按照提示完成安装',
        '启动应用即可使用',
      ],
    },
    {
      id: 'macos' as const,
      name: 'macOS',
      version: 'macOS 10.15+',
      requirements: ['macOS 10.15 (Catalina) 或更高版本', 'Intel 或 Apple Silicon (M1/M2)'],
      installSteps: [
        '下载 .dmg 安装包',
        '打开下载的 .dmg 文件',
        '将应用拖拽到 Applications 文件夹',
        '在应用程序中启动应用（首次运行可能需要允许权限）',
      ],
    },
    {
      id: 'linux' as const,
      name: 'Linux',
      version: '主流发行版',
      requirements: [
        'Ubuntu 20.04+ / Fedora 34+ / Arch Linux 等',
        'x64 或 ARM 架构',
        '需要安装 WebKit2GTK 等依赖',
      ],
      installSteps: [
        '下载 .AppImage 或 .deb / .rpm 包',
        '对于 .AppImage：赋予执行权限后直接运行',
        '对于 .deb：使用 `sudo dpkg -i package.deb` 安装',
        '对于 .rpm：使用 `sudo rpm -i package.rpm` 安装',
      ],
    },
  ];

  const currentPlatform = platforms.find((p) => p.id === platform) || platforms[0];

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            下载安装
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            选择您的操作系统，下载对应版本的应用
          </p>
        </div>

        {/* 平台选择 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                platform === p.id
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card border border-border hover:bg-accent hover:border-primary/50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* 当前平台信息 */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">{currentPlatform.name}</h2>
              <p className="text-muted-foreground mb-6">版本要求：{currentPlatform.version}</p>
              <DownloadButton platform={currentPlatform.id} className="text-lg px-8 py-4" />
              <p className="text-sm text-muted-foreground mt-4">
                最新版本：<a
                  href="https://github.com/xujiehui/timing/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  查看 GitHub Releases
                </a>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">系统要求</h3>
                <ul className="space-y-2">
                  {currentPlatform.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">安装步骤</h3>
                <ol className="space-y-2">
                  {currentPlatform.installSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-semibold">{idx + 1}.</span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="max-w-3xl mx-auto mt-12 p-6 md:p-8 bg-muted/50 border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-3">注意事项</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 执行系统操作（关机、重启等）需要管理员/root权限</li>
            <li>• 不同平台对某些操作的支持可能不同</li>
            <li>• 建议在测试环境中先验证功能</li>
            <li>• 如有问题，请查看 <a href="/docs" className="text-primary hover:underline">文档</a> 或提交 <a href="https://github.com/xujiehui/timing/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Issue</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Download;
