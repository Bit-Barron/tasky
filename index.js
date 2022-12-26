const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const path = require('path');
let mainWindow;
// let tray;

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);
  const { height, width } = mainWindow.getBounds();

  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: Math.floor(x - width / 2),
        y: Math.floor(yPosition),
        height: height,
        width: width,
      });
      mainWindow.show();
    }
  });
});
