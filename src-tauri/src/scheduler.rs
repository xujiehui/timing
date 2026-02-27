use crate::commands::TaskInfo;
use crate::system;
use chrono::{DateTime, Utc};
use std::collections::HashMap;
use uuid::Uuid;

pub struct Task {
    id: String,
    action: String,
    execute_at: i64,
    status: TaskStatus,
}

#[derive(Clone, PartialEq)]
enum TaskStatus {
    Pending,
    Executing,
    Completed,
    Cancelled,
}

pub struct TaskScheduler {
    tasks: HashMap<String, Task>,
}

impl TaskScheduler {
    pub fn new() -> Self {
        Self {
            tasks: HashMap::new(),
        }
    }

    pub async fn create_task(&mut self, action: String, execute_at: i64) -> Result<String, String> {
        let now = Utc::now().timestamp();
        if execute_at <= now {
            return Err("执行时间必须晚于当前时间".to_string());
        }

        let id = Uuid::new_v4().to_string();
        let task = Task {
            id: id.clone(),
            action: action.clone(),
            execute_at,
            status: TaskStatus::Pending,
        };

        self.tasks.insert(id.clone(), task);
        Ok(id)
    }

    pub async fn cancel_task(&mut self, task_id: &str) -> Result<(), String> {
        if let Some(task) = self.tasks.get_mut(task_id) {
            if task.status == TaskStatus::Pending {
                task.status = TaskStatus::Cancelled;
                Ok(())
            } else {
                Err("只能取消待执行的任务".to_string())
            }
        } else {
            Err("任务不存在".to_string())
        }
    }

    pub async fn get_tasks(&self) -> Vec<TaskInfo> {
        let now = Utc::now().timestamp();
        self.tasks
            .values()
            .map(|task| {
                let remaining_seconds = if task.execute_at > now {
                    task.execute_at - now
                } else {
                    0
                };

                let status = match task.status {
                    TaskStatus::Pending => "pending",
                    TaskStatus::Executing => "executing",
                    TaskStatus::Completed => "completed",
                    TaskStatus::Cancelled => "cancelled",
                };

                TaskInfo {
                    id: task.id.clone(),
                    action: task.action.clone(),
                    execute_at: task.execute_at,
                    status: status.to_string(),
                    remaining_seconds,
                }
            })
            .collect()
    }

    pub async fn check_and_execute(&mut self) {
        let now = Utc::now().timestamp();
        let mut to_remove = Vec::new();

        for (id, task) in self.tasks.iter_mut() {
            if task.status == TaskStatus::Pending && task.execute_at <= now {
                task.status = TaskStatus::Executing;
                let action = task.action.clone();
                let task_id = id.clone();

                // 异步执行系统命令
                tokio::spawn(async move {
                    if let Err(e) = system::execute_action(&action).await {
                        eprintln!("执行任务失败 {}: {}", task_id, e);
                    }
                });

                to_remove.push(id.clone());
            }
        }

        // 移除已完成的任务
        for id in to_remove {
            if let Some(task) = self.tasks.get_mut(&id) {
                task.status = TaskStatus::Completed;
            }
        }
    }
}
