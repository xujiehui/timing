import { useEffect, useState } from 'react';
import { Button, Alert, Tag } from '@arco-design/web-react';
import { IconSettings, IconClockCircle, IconCloseCircle } from '@arco-design/web-react/icon';
import { useStore } from './store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { AppCard } from './components/AppCard';

function App() {
  const { fetchTasks, tasks, error } = useStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    // 每秒刷新任务列表以更新倒计时
    const interval = setInterval(() => {
      fetchTasks();
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <IconClockCircle className="text-primary-foreground" style={{ fontSize: 20 }} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                定时关机管理
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                轻松管理您的系统定时任务
              </p>
            </div>
          </div>
          <Button
            type="text"
            shape="circle"
            onClick={() => setSettingsOpen(true)}
            title="设置"
            aria-label="打开设置"
            icon={<IconSettings />}
          />
        </div>

        {/* Error Message */}
        {error && (
          <Alert
            type="error"
            content={error}
            icon={<IconCloseCircle />}
            closable
            style={{ marginBottom: 16 }}
          />
        )}

        {/* Task Form */}
        <AppCard>
          <TaskForm />
        </AppCard>

        {/* Task List */}
        <AppCard
          title="当前任务列表"
          actions={tasks.length > 0 && (
            <Tag color="gray">{tasks.length} 个任务</Tag>
          )}
        >
          <TaskList tasks={tasks} />
        </AppCard>
      </div>

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default App;
