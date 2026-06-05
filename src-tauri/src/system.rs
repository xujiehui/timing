use std::process::Command;

#[cfg(target_os = "windows")]
pub async fn execute_action(action: &str) -> Result<(), String> {
    let cmd = match action {
        "shutdown" => "shutdown /s /t 0",
        "restart" => "shutdown /r /t 0",
        "sleep" => "rundll32.exe powrprof.dll,SetSuspendState 0,1,0",
        "hibernate" => "shutdown /h",
        "lock" => "rundll32.exe user32.dll,LockWorkStation",
        _ => return Err(format!("不支持的操作: {}", action)),
    };

    Command::new("cmd")
        .args(["/C", cmd])
        .spawn()
        .map_err(|e| format!("执行失败: {}", e))?;

    Ok(())
}

#[cfg(target_os = "macos")]
pub async fn execute_action(action: &str) -> Result<(), String> {
    let cmd = match action {
        "shutdown" => "sudo shutdown -h now",
        "restart" => "sudo shutdown -r now",
        "sleep" => "pmset sleepnow",
        "hibernate" => "sudo pmset -a hibernatemode 25",
        "lock" => "/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend",
        _ => return Err(format!("不支持的操作: {}", action)),
    };

    // 对于需要sudo的命令，使用osascript来提示用户输入密码
    if action == "shutdown" || action == "restart" || action == "hibernate" {
        let script = format!(
            "do shell script \"{}\" with administrator privileges",
            cmd.replace("sudo ", "")
        );
        Command::new("osascript")
            .args(["-e", &script])
            .spawn()
            .map_err(|e| format!("执行失败: {}", e))?;
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(cmd)
            .spawn()
            .map_err(|e| format!("执行失败: {}", e))?;
    }

    Ok(())
}

#[cfg(target_os = "linux")]
pub async fn execute_action(action: &str) -> Result<(), String> {
    let cmd = match action {
        "shutdown" => "shutdown -h now",
        "restart" => "shutdown -r now",
        "sleep" => "systemctl suspend",
        "hibernate" => "systemctl hibernate",
        "lock" => {
            // 尝试使用不同的锁屏命令
            if Command::new("which").arg("gnome-screensaver-command").output().is_ok() {
                "gnome-screensaver-command -l"
            } else if Command::new("which").arg("dm-tool").output().is_ok() {
                "dm-tool lock"
            } else {
                "xlock"
            }
        },
        _ => return Err(format!("不支持的操作: {}", action)),
    };

    // 对于需要root权限的命令，使用pkexec或sudo
    if action == "shutdown" || action == "restart" {
        if Command::new("which").arg("pkexec").output().is_ok() {
            Command::new("pkexec")
                .arg("sh")
                .arg("-c")
                .arg(cmd)
                .spawn()
                .map_err(|e| format!("执行失败: {}", e))?;
        } else {
            Command::new("sudo")
                .arg("sh")
                .arg("-c")
                .arg(cmd)
                .spawn()
                .map_err(|e| format!("执行失败: {}", e))?;
        }
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(cmd)
            .spawn()
            .map_err(|e| format!("执行失败: {}", e))?;
    }

    Ok(())
}
