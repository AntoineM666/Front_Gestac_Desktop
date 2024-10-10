// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// Quitter l'application lorsque toutes les fenêtres sont fermées, sauf sur macOS où il est courant pour les applications et leur barre de menu de rester actives jusqu'à ce que l'utilisateur quitte explicitement en utilisant Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  createWindow();
});



