import { Link } from 'react-router-dom';
import DownloadButton from './DownloadButton';

const Hero = () => {
  return (
    <section className="relative py-24 md:py-36 lg:py-44 overflow-hidden">
      {/* 背景装饰 - 更柔和的渐变光晕 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-primary/2 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* 应用图标 */}
          <div className="mb-12 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl scale-150 opacity-50" />
              <div className="relative">
                <img 
                  src="/icon.svg" 
                  alt="定时关机管理" 
                  className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 drop-shadow-lg"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-gradient animate-slide-up">
            定时关机管理
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            轻松管理您的系统定时任务
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            一款跨平台桌面应用程序，用于管理电脑的定时关机、重启、休眠等系统操作。
            <br className="hidden sm:block" />
            简单易用，安全可靠。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <DownloadButton 
              platform="windows" 
              className="text-base px-10 py-4 shadow-lg hover:shadow-xl hover-lift" 
            />
            <Link
              to="/features"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-medium border border-border bg-card/50 hover:bg-accent hover:border-primary/30 transition-all duration-200 hover-lift"
            >
              了解更多
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
