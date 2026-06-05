import { ReactNode } from 'react';

interface DownloadButtonProps {
  platform: 'windows' | 'macos' | 'linux';
  children?: ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const DownloadButton = ({ platform, children, href, className = '', variant = 'primary' }: DownloadButtonProps) => {
  const platformNames = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
  };

  const defaultHref = `https://github.com/xujiehui/timing/releases/latest`;

  // 根据 variant 应用不同的样式
  const variantStyles = {
    primary: 'gradient-primary text-primary-foreground hover:shadow-xl hover-lift',
    secondary: 'bg-card text-primary border border-border hover:bg-accent hover:border-primary/30 hover-lift',
  };

  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg';

  return (
    <a
      href={href || defaultHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children || `下载 ${platformNames[platform]}`}
    </a>
  );
};

export default DownloadButton;
