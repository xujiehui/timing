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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">设置</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* 主题设置 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              主题
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  settings.theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Sun size={20} />
                <span>浅色</span>
              </button>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Moon size={20} />
                <span>深色</span>
              </button>
            </div>
          </div>

          {/* 默认操作 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              默认操作类型
            </label>
            <select
              value={settings.default_action}
              onChange={(e) => setSettings({ ...settings, default_action: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="shutdown">关机</option>
              <option value="restart">重启</option>
              <option value="sleep">睡眠</option>
              <option value="hibernate">休眠</option>
              <option value="lock">锁定</option>
            </select>
          </div>

          {/* 开机自启动 */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.auto_start}
                onChange={(e) => setSettings({ ...settings, auto_start: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">开机自启动</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveSettings}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? '保存中...' : '保存'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
