// 简单的 SVG 图标组件
const PowerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const StorageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const LockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ListIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
  </svg>
);

const Features = () => {
  const features = [
    {
      icon: <PowerIcon />,
      title: '定时关机',
      description: '设置指定时间后自动关闭电脑',
      details: [
        '支持绝对时间设置（如：2024-12-25 23:00:00）',
        '支持相对时间设置（如：30分钟后、2小时后）',
        '实时显示倒计时',
        '任务执行前可随时取消',
      ],
    },
    {
      icon: <RefreshIcon />,
      title: '定时重启',
      description: '设置指定时间后自动重启电脑',
      details: [
        '适用于系统维护场景',
        '支持所有时间设置方式',
        '执行前会进行提醒',
        '可随时取消任务',
      ],
    },
    {
      icon: <MoonIcon />,
      title: '定时睡眠/休眠',
      description: '设置指定时间后使电脑进入睡眠或深度休眠状态',
      details: [
        'macOS/Linux：睡眠模式',
        'Windows：待机模式',
        '深度休眠：完全断电，节省更多电力',
        '任务执行前可取消',
      ],
    },
    {
      icon: <StorageIcon />,
      title: '定时深度休眠',
      description: '设置指定时间后使电脑进入深度休眠状态',
      details: [
        'Windows：休眠模式（Hibernate）',
        'macOS/Linux：深度睡眠',
        '完全断电，节省电力',
        '恢复时间较长，但数据安全',
      ],
    },
    {
      icon: <LockIcon />,
      title: '定时锁定屏幕',
      description: '设置指定时间后自动锁定屏幕',
      details: [
        '执行后需要密码解锁',
        '保护隐私和数据安全',
        '适用于离开电脑场景',
        '任务执行前可取消',
      ],
    },
    {
      icon: <ListIcon />,
      title: '任务列表管理',
      description: '轻松管理所有定时任务',
      details: [
        '显示所有已创建的定时任务',
        '显示任务状态（待执行、执行中、已取消、已完成）',
        '实时显示任务倒计时',
        '支持删除已完成/已取消的任务',
      ],
    },
    {
      icon: <NotificationIcon />,
      title: '通知提醒',
      description: '任务执行前自动提醒',
      details: [
        '任务执行前5分钟提醒',
        '任务执行前1分钟提醒',
        '任务执行时最终提醒',
        '支持自定义提醒时间',
      ],
    },
    {
      icon: <SettingsIcon />,
      title: '系统托盘',
      description: '最小化到系统托盘，方便快捷',
      details: [
        '最小化到系统托盘',
        '托盘图标显示当前任务状态',
        '右键菜单快速操作',
        '双击托盘图标恢复窗口',
      ],
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            功能特性
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            功能强大，操作简单，满足您的各种定时任务需求
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 md:p-8 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-3xl md:text-4xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground mb-5 text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2.5">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 font-bold">•</span>
                      <span className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            跨平台支持
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            支持 Windows、macOS 和 Linux 三大主流操作系统
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all">
              <span className="font-medium text-foreground">Windows 10/11</span>
            </div>
            <div className="px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all">
              <span className="font-medium text-foreground">macOS 10.15+</span>
            </div>
            <div className="px-6 py-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all">
              <span className="font-medium text-foreground">Linux (主流发行版)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
