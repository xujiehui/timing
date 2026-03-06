import { Link } from 'react-router-dom';
import DownloadButton from './DownloadButton';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* 应用图标 */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-150" />
              <img 
                src="/icon.svg" 
                alt="定时关机管理" 
                className="relative w-24 h-24 md:w-32 md:h-32 animate-fade-in"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent animate-slide-up">
            定时关机管理
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            轻松管理您的系统定时任务
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            一款跨平台桌面应用程序，用于管理电脑的定时关机、重启、休眠等系统操作。
            <br className="hidden sm:block" />
            简单易用，安全可靠。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <DownloadButton platform="windows" className="text-base px-8 py-3 shadow-lg hover:shadow-xl transition-shadow" />
            <Link
              to="/features"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-border rounded-lg font-medium hover:bg-accent hover:border-primary/50 transition-all"
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
