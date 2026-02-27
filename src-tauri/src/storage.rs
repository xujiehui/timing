use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSettings {
    pub auto_start: bool,
    pub default_action: String,
    pub reminder_times: Vec<i64>, // 提醒时间（秒）
    pub theme: String, // "light" or "dark"
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            auto_start: false,
            default_action: "shutdown".to_string(),
            reminder_times: vec![300, 60], // 5分钟和1分钟
            theme: "light".to_string(),
        }
    }
}

pub fn get_settings_path(app: &tauri::AppHandle) -> PathBuf {
    let mut path = app.path().app_data_dir().unwrap();
    path.push("settings.json");
    path
}

pub fn load_settings(app: &tauri::AppHandle) -> AppSettings {
    let path = get_settings_path(app);
    
    if path.exists() {
        if let Ok(content) = fs::read_to_string(&path) {
            if let Ok(settings) = serde_json::from_str::<AppSettings>(&content) {
                return settings;
            }
        }
    }
    
    AppSettings::default()
}

pub fn save_settings(app: &tauri::AppHandle, settings: &AppSettings) -> Result<(), String> {
    let path = get_settings_path(app);
    
    // 确保目录存在
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| format!("创建目录失败: {}", e))?;
    }
    
    let content = serde_json::to_string_pretty(settings)
        .map_err(|e| format!("序列化设置失败: {}", e))?;
    
    fs::write(&path, content)
        .map_err(|e| format!("保存设置失败: {}", e))?;
    
    Ok(())
}
