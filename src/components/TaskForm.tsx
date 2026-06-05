import { useState, useMemo } from 'react';
import { Button, Input, Select, Radio, DatePicker, TimePicker } from '@arco-design/web-react';
import { IconPoweroff, IconRefresh, IconMoon, IconStorage, IconLock } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import { useStore } from '../store';
import { TaskFormData, ActionType } from '../types';
import { calculateExecuteTime, formatDateTime } from '../utils';
import { useToast } from '@/hooks/use-toast';

const Option = Select.Option;

const actionOptions: { value: ActionType; label: string; icon: any }[] = [
  { value: 'shutdown', label: '关机', icon: IconPoweroff },
  { value: 'restart', label: '重启', icon: IconRefresh },
  { value: 'sleep', label: '睡眠', icon: IconMoon },
  { value: 'hibernate', label: '休眠', icon: IconStorage },
  { value: 'lock', label: '锁定', icon: IconLock },
];

export default function TaskForm() {
  const { createTask } = useStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState<TaskFormData>({
    action: 'shutdown',
    timeType: 'relative',
    absoluteDate: new Date().toISOString().split('T')[0],
    absoluteTime: '23:00',
    relativeValue: 30,
    relativeUnit: 'minutes',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 计算执行时间预览
  const executeTimePreview = useMemo(() => {
    try {
      const executeAt = calculateExecuteTime(
        formData.timeType,
        formData.absoluteDate,
        formData.absoluteTime,
        formData.relativeValue,
        formData.relativeUnit
      );
      return formatDateTime(executeAt);
    } catch {
      return null;
    }
  }, [formData]);

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.timeType === 'absolute') {
      const dateTime = new Date(`${formData.absoluteDate}T${formData.absoluteTime}`);
      const now = new Date();
      if (dateTime <= now) {
        newErrors.absoluteTime = '执行时间不能是过去的时间';
      }
    } else {
      if (formData.relativeValue < 1) {
        newErrors.relativeValue = '时间值必须大于 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "表单验证失败",
        description: "请检查输入的时间设置",
      });
      return;
    }

    setLoading(true);

    try {
      const executeAt = calculateExecuteTime(
        formData.timeType,
        formData.absoluteDate,
        formData.absoluteTime,
        formData.relativeValue,
        formData.relativeUnit
      );

      await createTask(formData.action, executeAt);
      
      toast({
        variant: "success",
        title: "任务创建成功",
        description: `将在 ${executeTimePreview} 执行${formData.action === 'shutdown' ? '关机' : formData.action === 'restart' ? '重启' : formData.action === 'sleep' ? '睡眠' : formData.action === 'hibernate' ? '休眠' : '锁定'}操作`,
      });
      
      // 重置表单
      setFormData({
        action: 'shutdown',
        timeType: 'relative',
        absoluteDate: new Date().toISOString().split('T')[0],
        absoluteTime: '23:00',
        relativeValue: 30,
        relativeUnit: 'minutes',
      });
      setErrors({});
    } catch (error) {
      console.error('创建任务失败:', error);
      toast({
        variant: "destructive",
        title: "创建任务失败",
        description: error instanceof Error ? error.message : '未知错误',
      });
    } finally {
      setLoading(false);
    }
  };

  // 操作类型颜色映射
  const getActionColor = (action: ActionType) => {
    const colors: Record<ActionType, { bg: string; border: string; text: string }> = {
      shutdown: { bg: 'bg-red', border: 'border-red', text: 'text-red-foreground' },
      restart: { bg: 'bg-primary', border: 'border-primary', text: 'text-primary-foreground' },
      sleep: { bg: 'bg-purple', border: 'border-purple', text: 'text-purple-foreground' },
      hibernate: { bg: 'bg-cyan', border: 'border-cyan', text: 'text-cyan-foreground' },
      lock: { bg: 'bg-orange', border: 'border-orange', text: 'text-orange-foreground' },
    };
    return colors[action];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">创建定时任务</h2>
        <p className="text-sm text-muted-foreground">选择操作类型并设置执行时间</p>
      </div>
      
      {/* 操作类型选择 */}
      <div>
        <div className="mb-3 text-sm font-medium">选择操作类型</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {actionOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = formData.action === option.value;
            const colors = getActionColor(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, action: option.value })}
                aria-pressed={isSelected}
                aria-label={`选择${option.label}操作`}
                className={`group flex flex-col items-center justify-center p-4 h-auto rounded-lg border transition-colors ${
                  isSelected 
                    ? `${colors.bg} ${colors.text} ${colors.border} border-2 shadow-sm` 
                    : 'border-border bg-background hover:border-purple hover:bg-purple/5'
                }`}
              >
                <Icon 
                  style={{ fontSize: 24 }}
                  className="mb-1.5" 
                />
                <span className="text-xs font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 时间类型选择 */}
      <div>
        <div className="mb-3 text-sm font-medium">设置时间</div>
        <Radio.Group
          value={formData.timeType}
          onChange={(value) => {
            setFormData({ ...formData, timeType: value as 'absolute' | 'relative' });
            setErrors({});
          }}
          className="flex gap-4 mb-4"
        >
          <Radio value="absolute">绝对时间</Radio>
          <Radio value="relative">相对时间</Radio>
        </Radio.Group>

        <div className={`p-4 rounded-lg border transition-all ${
          formData.timeType === 'absolute' 
            ? 'border-purple bg-purple/5' 
            : 'border-border'
        }`}>
          {formData.timeType === 'absolute' ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <DatePicker
                  value={formData.absoluteDate ? dayjs(formData.absoluteDate) : undefined}
                  onChange={(_, date) => {
                    const dateValue = date ? date.format('YYYY-MM-DD') : '';
                    setFormData({ ...formData, absoluteDate: dateValue });
                    setErrors({ ...errors, absoluteTime: '' });
                  }}
                  style={{ width: '100%' }}
                  status={errors.absoluteTime ? 'error' : undefined}
                  placeholder="选择日期"
                />
              </div>
              <div className="flex-1">
                <TimePicker
                  value={formData.absoluteTime ? dayjs(formData.absoluteTime, 'HH:mm') : undefined}
                  onChange={(_, time) => {
                    const timeValue = time ? time.format('HH:mm') : '';
                    setFormData({ ...formData, absoluteTime: timeValue });
                    setErrors({ ...errors, absoluteTime: '' });
                  }}
                  style={{ width: '100%' }}
                  status={errors.absoluteTime ? 'error' : undefined}
                  format="HH:mm"
                  placeholder="选择时间"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Input
                type="number"
                id="relative-value"
                min="1"
                value={String(formData.relativeValue)}
                onChange={(value) => {
                  setFormData({ ...formData, relativeValue: parseInt(value) || 1 });
                  setErrors({ ...errors, relativeValue: '' });
                }}
                status={errors.relativeValue ? 'error' : undefined}
                style={{ width: '100%', maxWidth: '112px' }}
                className="text-center font-semibold"
                aria-label="相对时间数值"
              />
              <Select
                value={formData.relativeUnit}
                onChange={(value) => setFormData({ ...formData, relativeUnit: value as 'minutes' | 'hours' })}
                style={{ flex: 1 }}
              >
                <Option value="minutes">分钟后</Option>
                <Option value="hours">小时后</Option>
              </Select>
            </div>
          )}
          {errors.absoluteTime && (
            <p className="text-sm text-destructive mt-2">{errors.absoluteTime}</p>
          )}
          {errors.relativeValue && (
            <p className="text-sm text-destructive mt-2">{errors.relativeValue}</p>
          )}
        </div>

        {/* 执行时间预览 */}
        {executeTimePreview && (
          <div className="mt-3 p-3 rounded-lg bg-purple/5 border border-purple/20">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">预计执行时间：</span>
              <span className="font-semibold text-purple">
                {executeTimePreview}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 提交按钮 */}
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        style={{ width: '100%' }}
        size="large"
      >
        创建任务
      </Button>
    </form>
  );
}
