use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaskInfo {
    pub id: String,
    pub action: String,
    pub execute_at: i64,
    pub status: String,
    pub remaining_seconds: i64,
}
