import '@babel/polyfill';
import path from 'path';
import { app, BrowserWindow } from 'electron';


// TODO see https://electronjs.org/docs/tutorial/security
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

let mainWindow;

if (process.env.NODE_ENV === 'development') {
	require('electron-debug')({
		showDevTools: true,
	});
}

function installDevTools() {
	if (process.env.NODE_ENV === 'development') {
		require('devtron').install();
		require('vue-devtools').install();
	}
}

function createWindow() {

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: false,
	});

	const url = process.env.NODE_ENV === 'production'
		? `file://${path.resolve(__dirname, 'dist/renderer/index.html')}` // prod
		: `file://${path.join(__dirname, '../renderer/dev.html')}`; // dev

	mainWindow.loadURL(url);

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus()
	});

	mainWindow.on('closed', () => {
		mainWindow = null
	});
}

app.on('ready', () => {
	createWindow();
	installDevTools();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
