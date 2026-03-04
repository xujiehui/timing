import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@arco-design/web-react/dist/css/arco.css";
import "./styles.css";

// 在渲染前应用主题，避免闪烁
const savedTheme = localStorage.getItem('timing-theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
