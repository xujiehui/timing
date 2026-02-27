import { useEffect, useState } from 'react';
import { useStore } from './store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { Settings as SettingsIcon, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark transition-colors duration-300">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300/20 dark:bg-primary-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-primary">
              <Clock className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                定时关机管理
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                轻松管理您的系统定时任务
              </p>
            </div>
          </div>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-200 hover:scale-105"
            title="设置"
          >
            <SettingsIcon size={22} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg text-red-700 dark:text-red-400 animate-slide-up shadow-soft">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-soft"></div>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Task Form */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-soft-lg p-8 mb-8 animate-scale-in border border-white/50 dark:border-gray-700/50">
          <TaskForm />
        </div>

        {/* Task List */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-soft-lg p-8 animate-scale-in border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              当前任务列表
            </h2>
            {tasks.length > 0 && (
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                {tasks.length} 个任务
              </span>
            )}
          </div>
          <TaskList tasks={tasks} />
        </div>
      </div>

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default App;
