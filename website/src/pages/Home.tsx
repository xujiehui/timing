import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import DownloadButton from '../components/DownloadButton';

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

const Home = () => {
  const features = [
    {
      icon: <PowerIcon />,
      title: '定时关机',
      description: '设置指定时间后自动关闭电脑，支持绝对时间和相对时间设置。',
    },
    {
      icon: <RefreshIcon />,
      title: '定时重启',
      description: '定时重启电脑，适用于系统维护和定期清理场景。',
    },
    {
      icon: <MoonIcon />,
      title: '定时睡眠/休眠',
      description: '支持定时进入睡眠或深度休眠状态，节省电力消耗。',
    },
    {
      icon: <LockIcon />,
      title: '定时锁定',
      description: '定时锁定屏幕，保护您的隐私和数据安全。',
    },
    {
      icon: <ListIcon />,
      title: '任务管理',
      description: '轻松管理多个定时任务，实时查看倒计时和任务状态。',
    },
    {
      icon: <NotificationIcon />,
      title: '通知提醒',
      description: '任务执行前自动提醒，避免误操作造成数据丢失。',
    },
  ];

  return (
    <div>
      <Hero />
      
      {/* 核心特性 */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              核心特性
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              功能强大，操作简单，让系统定时任务管理变得轻松愉快
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 快速开始 */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                快速开始
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                只需三个简单步骤，即可开始使用
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center md:text-left group">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">下载安装</h3>
                <p className="text-muted-foreground leading-relaxed">
                  根据您的操作系统下载对应版本，安装后即可使用
                </p>
              </div>
              <div className="text-center md:text-left group">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">创建任务</h3>
                <p className="text-muted-foreground leading-relaxed">
                  选择操作类型（关机、重启等），设置执行时间
                </p>
              </div>
              <div className="text-center md:text-left group">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">自动执行</h3>
                <p className="text-muted-foreground leading-relaxed">
                  应用会在指定时间自动执行任务，无需手动操作
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container relative text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            准备开始了吗？
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            立即下载，体验简单高效的定时任务管理
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DownloadButton 
              platform="windows" 
              variant="secondary"
              className="text-base px-8 py-3 shadow-xl hover:shadow-2xl" 
            />
            <Link
              to="/docs"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-foreground/30 rounded-lg font-medium hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all text-base"
            >
              查看文档
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
