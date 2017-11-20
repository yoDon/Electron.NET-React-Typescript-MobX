import { observable, action, autorun } from 'mobx';

//
// This is configured to talk to the Electron backend store via ipcRenderer 
// (when loaded in Electron) or to talk over ipcRendererStub to the Electron
// host renderer (when loaded as a web page in an Electron WebView) so the 
// host can talk to the backend, or to run locally if no backend is available. 
// ipcRendererStub exposes just a specific whitelisted set of ipcRenderer.sendToHost
// and ipcRenderer.on routes chosen at compile time by the app developer (and
// which is currently defined as routes starting with "webview-" are allowed
// between WebView and Host, and routes starting with "webview-" are not allowed
// between Host (renderer) and backend in order to make it easier to spot what's
// allowed/what's going on when reading the code). It's import that malicious code
// or content loaded by the contained webpage not be granted arbitrary access to
// the user's PC by way of exposed Electron functionality.
//
//
// In addition to talking to the electron backend or the electron
// renderer, when this class is hosted in an electron app it is also
// responsible for managing the relay of messages to and from any
// counter WebViews that the app is hosting.
//
const ipcRenderer = ((window as any).isElectron) ? (window as any).nodeRequire('electron').ipcRenderer : (window as any).ipcRendererStub;

class CounterStore {

    public isElectron = (window as any).isElectron;
    public isInWebView = ((window as any).isElectron == false && ipcRenderer !== undefined && ipcRenderer !== null);
    public hasElectronAccess = (ipcRenderer !== undefined && ipcRenderer !== null);

    constructor() {
        //
        // As needed register handlers for messages from either
        // the electron backend or the elecron host app
        //
        if (this.isElectron) {
            ipcRenderer.on("counter-delta-reply",(event:any, arg:number) => {
                this.setReply(arg);
            });
        } else if (this.isInWebView) {
            ipcRenderer.on("webview-counter-delta-reply",(event:any, arg:number) => {
                this.setReply(arg);
            });
        } else {
            // alert('no electron access - presumably loaded as a conventional web page in a conventional browser');
        }
    }

    @observable value = 0;

    public addWebViewListeners(element:any) {
        //
        // NOTE: By convention this app only allows loaded pages to register
        //       and call routes starting with "webview-", so that all messages
        //       from the webview can be inspected and approved by this electron
        //       renderer process before passing them on to the electron backend
        //       process. It's important that untrusted websites and web content
        //       not be granted full access to the electron API in order to 
        //       protect the user's PC from potentially malicious web content.
        //
        element.addEventListener("ipc-message",this.handleWebViewMessage.bind(this));
        //
        // Relay state updates to the webview
        //
        const disposers = [] as (()=>void)[];
        disposers.push(autorun(()=>{
            element.send("webview-counter-delta-reply",this.value);
        }));
        return disposers;
    }

    public initializeWebViewState(element:any) {
        element.send("webview-counter-delta-reply",this.value);
    }

    @action setReply(arg:number) {
        this.value = arg;
    }

    @action handleWebViewMessage(event:any) {
        const key = event.channel as string;
        switch(key) {
            case "webview-counter-delta": this.handleCounterDelta(event);
        }
    }

    @action handleCounterDelta(event:any) {
        const delta = event.args[0].delta as number;
        this.change(delta);
    }

    @action change(value:number) {
        if (this.isElectron) {
            //
            // wrap the integer in an object to send it to the backend, because I was 
            // having problems passing ints directly (my guess is it's because ints 
            // are value types but that's just a guess - strings can be passed directly 
            // without needing to wrap them like this)
            //
            ipcRenderer.send("counter-delta", {delta:value});
        } else if (this.isInWebView) {
            ipcRenderer.sendToHost("webview-counter-delta", {delta:value});
        } else {
            //
            // manage the state locally without talking to the Electron backend,
            // because there is no backend to talk to
            //
            this.value++;
        }
    }

    @action increment() {
        this.change(1)
    }

    @action decrement() {
        this.change(-1);
    }
  
}

export default CounterStore;