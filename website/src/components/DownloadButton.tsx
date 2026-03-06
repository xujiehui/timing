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
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  };

  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200';

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
