import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { X, Moon, Sun } from 'lucide-react';

interface Settings {
  auto_start: boolean;
  default_action: string;
  reminder_times: number[];
  theme: string;
}

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [settings, setSettings] = useState<Settings>({
    auto_start: false,
    default_action: 'shutdown',
    reminder_times: [300, 60],
    theme: 'light',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      const data = await invoke<Settings>('get_settings');
      setSettings(data);
    } catch (error) {
      console.error('加载设置失败:', error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      await invoke('save_settings_command', { settings });
      // 应用主题
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      onClose();
    } catch (error) {
      console.error('保存设置失败:', error);
      alert('保存设置失败: ' + error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-scale-in border border-white/50 dark:border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">设置</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
            title="关闭"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-8">
          {/* 主题设置 */}
          <div>
            <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
              主题
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  settings.theme === 'light'
                    ? 'border-primary-500 bg-gradient-primary text-white shadow-primary'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <Sun size={24} />
                <span className="font-semibold">浅色</span>
              </button>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  settings.theme === 'dark'
                    ? 'border-primary-500 bg-gradient-primary text-white shadow-primary'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <Moon size={24} />
                <span className="font-semibold">深色</span>
              </button>
            </div>
          </div>

          {/* 默认操作 */}
          <div>
            <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
              默认操作类型
            </label>
            <select
              value={settings.default_action}
              onChange={(e) => setSettings({ ...settings, default_action: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-soft font-medium"
            >
              <option value="shutdown">关机</option>
              <option value="restart">重启</option>
              <option value="sleep">睡眠</option>
              <option value="hibernate">休眠</option>
              <option value="lock">锁定</option>
            </select>
          </div>

          {/* 开机自启动 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-2 border-gray-200 dark:border-gray-600">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.auto_start}
                onChange={(e) => setSettings({ ...settings, auto_start: e.target.checked })}
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 focus:ring-2 rounded cursor-pointer"
              />
              <span className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">开机自启动</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={saveSettings}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-primary hover:bg-gradient-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-primary hover:shadow-primary-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                保存中...
              </span>
            ) : (
              '保存'
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
