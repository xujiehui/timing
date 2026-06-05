import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Modal, Select, Checkbox } from '@arco-design/web-react';
import { IconMoon, IconSun } from '@arco-design/web-react/icon';

const Option = Select.Option;

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
      // 持久化主题到 localStorage
      localStorage.setItem('timing-theme', settings.theme);
      onClose();
    } catch (error) {
      console.error('保存设置失败:', error);
      alert('保存设置失败: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isOpen}
      onOk={saveSettings}
      onCancel={onClose}
      title="设置"
      okText="保存"
      cancelText="取消"
      confirmLoading={loading}
      style={{ width: 520 }}
    >
      <div className="space-y-5">
        {/* 主题设置 */}
        <div>
          <div className="mb-3 text-sm font-medium">主题</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                settings.theme === 'light'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
            >
              <IconSun style={{ fontSize: 18 }} />
              <span className="text-sm font-medium">浅色</span>
            </button>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary hover:bg-primary/5'
              }`}
            >
              <IconMoon style={{ fontSize: 18 }} />
              <span className="text-sm font-medium">深色</span>
            </button>
          </div>
        </div>

        {/* 默认操作 */}
        <div>
          <div className="mb-2 text-sm font-medium">默认操作类型</div>
          <Select
            value={settings.default_action}
            onChange={(value) => setSettings({ ...settings, default_action: value })}
            style={{ width: '100%' }}
          >
            <Option value="shutdown">关机</Option>
            <Option value="restart">重启</Option>
            <Option value="sleep">睡眠</Option>
            <Option value="hibernate">休眠</Option>
            <Option value="lock">锁定</Option>
          </Select>
        </div>

        {/* 开机自启动 */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-border">
          <Checkbox
            checked={settings.auto_start}
            onChange={(checked) => setSettings({ ...settings, auto_start: checked })}
          >
            <span className="text-sm font-medium">开机自启动</span>
          </Checkbox>
        </div>
      </div>
    </Modal>
  );
}
