const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopStore', {
  load: () => ipcRenderer.invoke('data:load'),
  save: (data) => ipcRenderer.invoke('data:save', data),
  clear: () => ipcRenderer.invoke('data:clear'),
  location: () => ipcRenderer.invoke('data:location')
});