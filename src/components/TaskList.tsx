import { useState } from 'react';
import { Card, Tag, Button, Modal } from '@arco-design/web-react';
import { IconClose, IconClockCircle, IconCalendar, IconExclamationCircle } from '@arco-design/web-react/icon';
import { Task } from '../types';
import { useStore } from '../store';
import { formatDateTime, formatRemainingTime, getActionLabel, getStatusLabel } from '../utils';
import { useToast } from '@/hooks/use-toast';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const { cancelTask } = useStore();
  const { toast } = useToast();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [taskToCancel, setTaskToCancel] = useState<string | null>(null);

  const handleCancelClick = (taskId: string) => {
    setTaskToCancel(taskId);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (taskToCancel) {
      try {
        await cancelTask(taskToCancel);
        toast({
          variant: "success",
          title: "任务已取消",
          description: "定时任务已成功取消",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "取消失败",
          description: error instanceof Error ? error.message : '未知错误',
        });
      }
      setCancelDialogOpen(false);
      setTaskToCancel(null);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'gray';
      default:
        return 'blue';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green/10 mb-4">
          <IconClockCircle className="text-green" style={{ fontSize: 32 }} />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          暂无任务
        </h3>
        <p className="text-sm text-muted-foreground">
          请在上方创建一个新的定时任务
        </p>
      </div>
    );
  }

  const taskToCancelInfo = tasks.find(t => t.id === taskToCancel);

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange';
      case 'completed':
        return 'bg-green';
      case 'cancelled':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-green transition-colors hover:shadow-sm"
          >
            <div className="flex-1 p-4 w-full">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="text-sm font-medium text-foreground">
                  {getActionLabel(task.action)}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${getStatusDotColor(task.status)}`} />
                  <span className="text-xs text-muted-foreground">
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendar style={{ fontSize: 14 }} className="text-green flex-shrink-0" />
                  <span className="font-mono text-xs">
                    {formatDateTime(task.execute_at)}
                  </span>
                </div>
                {task.status === 'pending' && task.remaining_seconds > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <IconClockCircle style={{ fontSize: 14 }} className="text-green flex-shrink-0" />
                    <span className="text-muted-foreground text-xs">剩余：</span>
                    <span className="font-mono font-semibold text-base text-green">
                      {formatRemainingTime(task.remaining_seconds)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {task.status === 'pending' && (
              <div className="p-4 sm:p-4 sm:pl-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-border">
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  onClick={() => handleCancelClick(task.id)}
                  title="取消任务"
                  aria-label={`取消任务：${getActionLabel(task.action)}`}
                  icon={<IconClose />}
                  style={{ color: 'var(--color-text-2)' }}
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal
        visible={cancelDialogOpen}
        onOk={handleCancelConfirm}
        onCancel={() => setCancelDialogOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <IconExclamationCircle style={{ color: 'var(--color-danger)', fontSize: 20 }} />
            确认取消任务
          </div>
        }
        okText="确认取消"
        cancelText="取消"
        okButtonProps={{ status: 'danger' }}
      >
        {taskToCancelInfo && (
          <div>
            <p>确定要取消这个定时任务吗？</p>
            <p className="font-medium text-foreground mt-2">
              {getActionLabel(taskToCancelInfo.action)} - {formatDateTime(taskToCancelInfo.execute_at)}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
