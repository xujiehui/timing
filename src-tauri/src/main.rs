// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod scheduler;
mod system;
mod storage;

use commands::*;
use scheduler::TaskScheduler;
use storage::{AppSettings, load_settings, save_settings};
use std::sync::Arc;
use tauri::{Manager, State, AppHandle};
use tauri::menu::{Menu, MenuItem};
use tauri_plugin_notification::NotificationExt;
use tokio::sync::Mutex;

#[derive(Clone)]
struct AppState {
    scheduler: Arc<Mutex<TaskScheduler>>,
}

#[tauri::command]
async fn create_task(
    action: String,
    execute_at: i64,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let mut scheduler = state.scheduler.lock().await;
    scheduler.create_task(action, execute_at).await
}

#[tauri::command]
async fn cancel_task(task_id: String, state: State<'_, AppState>) -> Result<(), String> {
    let mut scheduler = state.scheduler.lock().await;
    scheduler.cancel_task(&task_id).await
}

#[tauri::command]
async fn get_tasks(state: State<'_, AppState>) -> Result<Vec<TaskInfo>, String> {
    let scheduler = state.scheduler.lock().await;
    Ok(scheduler.get_tasks().await)
}

#[tauri::command]
async fn execute_system_command(action: String) -> Result<(), String> {
    system::execute_action(&action).await
}

#[tauri::command]
async fn get_settings(app: tauri::AppHandle) -> Result<AppSettings, String> {
    Ok(load_settings(&app))
}

#[tauri::command]
async fn save_settings_command(
    settings: AppSettings,
    app: tauri::AppHandle,
) -> Result<(), String> {
    save_settings(&app, &settings)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            let scheduler = Arc::new(Mutex::new(TaskScheduler::new()));
            let scheduler_clone = scheduler.clone();
            let app_handle = app.handle().clone();

            // 启动任务调度器
            tauri::async_runtime::spawn(async move {
                let mut interval = tokio::time::interval(tokio::time::Duration::from_secs(1));
                loop {
                    interval.tick().await;
                    let mut sched = scheduler_clone.lock().await;
                    let tasks = sched.get_tasks().await;
                    
                    // 检查任务提醒
                    let now = chrono::Utc::now().timestamp();
                    for task in &tasks {
                        if task.status == "pending" {
                            let remaining = task.execute_at - now;
                            // 5分钟提醒
                            if remaining == 300 {
                                send_notification(&app_handle, &format!("任务将在5分钟后执行：{}", task.action));
                            }
                            // 1分钟提醒
                            if remaining == 60 {
                                send_notification(&app_handle, &format!("任务将在1分钟后执行：{}", task.action));
                            }
                        }
                    }
                    
                    sched.check_and_execute().await;
                }
            });

            app.manage(AppState { scheduler });

            // 设置系统托盘
            setup_tray(app)?;

            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            create_task,
            cancel_task,
            get_tasks,
            execute_system_command,
            get_settings,
            save_settings_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_tray(app: &tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    
    let show_window = {
        let app_handle = app_handle.clone();
        move || {
            if let Some(window) = app_handle.get_webview_window("main") {
                window.show().unwrap();
                window.set_focus().unwrap();
            }
        }
    };

    let quit = {
        let app_handle = app_handle.clone();
        move || {
            app_handle.exit(0);
        }
    };

    // 创建菜单项
    let show_item = MenuItem::with_id(app_handle, "show", "显示窗口", true, None::<&str>)?;
    let quit_item = MenuItem::with_id(app_handle, "quit", "退出", true, None::<&str>)?;
    
    // 创建菜单
    let menu = Menu::with_items(app_handle, &[&show_item, &quit_item])?;

    let _tray = tauri::tray::TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .tooltip("定时关机管理")
        .menu(&menu)
        .on_menu_event(move |_app, event| {
            match event.id.as_ref() {
                "show" => show_window(),
                "quit" => quit(),
                _ => {}
            }
        })
        .on_tray_icon_event(|tray, event| {
            if let tauri::tray::TrayIconEvent::Click {
                button: tauri::tray::MouseButton::Left,
                ..
            } = event
            {
                if let Some(window) = tray.app_handle().get_webview_window("main") {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
        })
        .build(app_handle)?;

    Ok(())
}

fn send_notification(app: &AppHandle, message: &str) {
    let _ = app.notification()
        .builder()
        .title("定时任务提醒")
        .body(message)
        .show();
}
