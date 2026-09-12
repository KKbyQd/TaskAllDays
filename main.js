const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(app.getPath('userData'), 'save');
const dataFile = path.join(dataDir, 'tasks.json');

function initialData() {
  return { tasks: [], settings: { dailyCapacity: 8, weekendEnabled: false, showCompleted: true } };
}

function readData() {
  try { return JSON.parse(fs.readFileSync(dataFile, 'utf8')); }
  catch { return initialData(); }
}

function writeData(data) {
  fs.mkdirSync(dataDir, { recursive: true });
  const tempFile = `${dataFile}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempFile, dataFile);
  return data;
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1440, height: 900, minWidth: 1100, minHeight: 720,
    backgroundColor: '#f5f7fb',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false }
  });
  window.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.handle('data:load', () => readData());
  ipcMain.handle('data:save', (_, data) => writeData(data));
  ipcMain.handle('data:clear', () => writeData(initialData()));
  ipcMain.handle('data:location', () => dataFile);
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });