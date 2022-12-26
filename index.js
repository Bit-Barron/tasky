const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const path = require('path');
const { workerData } = require('worker_threads');

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);

  tray.on('click', (event, bounds) => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const { x, y } = bounds;
      const { height, width } = mainWindow.getBounds();
      const yPosition = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: Math.floor(x - width / 2),
        y: Math.floor(yPosition),
        width: width,
        height: height,
      });
      mainWindow.show();
    }
  });
});
