//
// Note: the WebView preload attribute only accepts file: protocols
//       and only accepts js files so this file needs to be pure
//       browser-readable javascript
//
// SECURITY NOTE The preload script is part of the electron app so it has access to 
// the node.js and electron APIs. The remote web app should not have 
// access to Electron or the ipcRenderer except as explicitly allowed
// by the electron copy of this file (so the following line is safe
// as web pages can't provide their own malicious copy of this file)
//
const { ipcRenderer } = require('electron');

(function() {
    //
    // SECURITY WARNING here we do work to prevent exposing any functionality
    // or APIs that could compromise the user's computer. Only allow specific
    // routes to be registered or called that are paths starting with "webview-",
    // so the app can easily tell whether the messages it receives came from 
    // the webview or from the backend. The electron backend should similarly never
    // expose any routes starting with "webview-". It's important to avoid 
    // exposing core Electron (even IPC) or node.js modules to the loaded web page 
    // to prevent malicious pages or web content from taking control of the user's PC. 
    //
    window.ipcRendererStub = {
        on: (path, handler) => {
            if (path.indexOf("webview-") === 0) {
                //
                // NOTE: ipcRenderer.on is registering for messages
                //       from the containing electron renderer, not
                //       from the electron backend
                //
                ipcRenderer.on(path, handler);
            }
        },
        sendToHost: (path, arg) => {
            if (path.indexOf("webview-") === 0) {
                //
                // NOTE: Send to host sends to the containing
                //       electron renderer, not to the electron
                //       backend
                //
                ipcRenderer.sendToHost(path,arg);
            }
        }
    };
})();
