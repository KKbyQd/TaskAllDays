# TaskAlldays

个人用的 Windows 工时任务管理系统，基于 Electron + 原生 HTML/CSS/JavaScript。

## 已实现

- 任务新建、编辑、删除、完成状态与名称搜索
- 自动跳过周末，按工作日均分工时，并在日容量不足时向后避让
- 月历查看每日工时，点击日期编辑任务工时；调整时保持任务总工时不变
- 每日容量、周末排布、已完成任务显示开关
- 本地 JSON 持久化，采用临时文件写入后替换原文件，数据不上传云端

## Windows 启动

需要先安装 Node.js 18 或更高版本。进入项目目录后执行：

```powershell
npm install
npm start
```

生成便携版 Windows 程序：

```powershell
npm run dist
```

数据默认保存到 Electron 的用户数据目录下的 `save/tasks.json`。设置页面会显示实际路径。
