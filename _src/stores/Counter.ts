import { observable, action, autorun } from 'mobx';

//
// This is configured to talk to the Electron backend store via ipcRenderer 
// (when loaded in Electron) or to talk over ipcRendererStub to the Electron
// host renderer (when loaded as a hybrid web page in an Electron WebView) 
// or to run locally if no backend is available. See the definition of ipcRendererStub
// in preload.js for more info on the specific set of whitelisted paths and functions
// supported by ipcRendererStub.
//

const ipcRenderer = ((window as any).isElectron) ? (window as any).nodeRequire('electron').ipcRenderer : (window as any).ipcRendererStub;

class CounterStore {

    public isElectron:boolean = (window as any).isElectron;
    public isInHybridWebView:boolean = ((window as any).isElectron == false && ipcRenderer !== undefined && ipcRenderer !== null);
    public hasElectronAccess:boolean = (ipcRenderer !== undefined && ipcRenderer !== null);
    @observable value = 0;
    private mDisposers = [] as (()=>void)[];
    private mElement = null as any;

    constructor() {
        if (this.isElectron) {
            ipcRenderer.on("counter-delta-reply",(event:any, arg:number) => {
                this.setReply(arg);
            });
            ipcRenderer.on("open-dev-tools-webview-reply",(event:any, arg:string) => {
                this.openDevToolsWebView();
            });
            ipcRenderer.on("browser-back-webview-reply",(event:any, arg:string) => {
                this.browserBackWebView();
            });
            ipcRenderer.send("menu-for-webview");
        } else if (this.isInHybridWebView) {
            ipcRenderer.on("webview-counter-delta-reply",(event:any, arg:number) => {
                this.setReply(arg);
            });
        } else {
            // alert('no electron access - presumably loaded as a conventional web page in a conventional browser');
        }
    }

    public unregisterWebView(element:any) {
        if (this.isElectron) {
            this.mDisposers.forEach((disposer) => {
                disposer();
            })
        }
    }

    public registerWebView(element:any) {
        if (element !== null && element !== undefined) {
            element.addEventListener("dom-ready", this.registerWebView_Impl.bind(this,element) );
        }
    }

    private registerWebView_Impl(element:any) {
        if (this.isElectron) {
            this.mElement = element;
            if (this.mElement.getAttribute('webviewlistener') !== 'true') {
                this.mElement.setAttribute('webviewlistener', 'true');
                //
                // NOTE: By convention this app only allows loaded pages to register
                //       and call routes starting with "webview-", so that all messages
                //       from the webview can be inspected and approved by this electron
                //       renderer process before passing them on to the electron backend
                //       process. It's important that untrusted websites and web content
                //       not be granted full access to the electron API in order to 
                //       protect the user's PC from potentially malicious web content.
                //
                this.mElement.addEventListener("ipc-message",(event:any) =>{
                    const key = event.channel as string;
                    switch(key) {
                        case "webview-counter-delta": this.change(event.args[0].delta as number); break;
                    }
                });
                //
                // Relay state updates to the webview
                //
                this.mDisposers.push(autorun(()=>{
                    this.mElement.send("webview-counter-delta-reply",this.value);
                }));
                //
                // Initialize
                //
                this.mElement.send("webview-counter-delta-reply",this.value);
                // Uncomment next line to automatically open the devTools window after the content loads
                // element.openDevTools();
            }
        }
    }

    @action change(value:number) {
        if (this.isElectron) {
            ipcRenderer.send("counter-delta", {delta:value});
        } else if (this.isInHybridWebView) {
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

    @action setReply(arg:number) {
        this.value = arg;
    }

    public openDevToolsWebView() {
        if (this.mElement) {
            this.mElement.openDevTools();
        }
    }

    public browserBackWebView() {
        if (this.mElement) {
            if (this.mElement.canGoBack()) { 
                this.mElement.goBack();
            }
        }
    }

}

export default CounterStore;