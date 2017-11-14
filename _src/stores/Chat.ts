import { observable, action } from 'mobx';

const { ipcRenderer } = (window as any).nodeRequire('electron');

class ChatStore {

    constructor() {
        ipcRenderer.on("say-hello-reply", (event:any, arg:string) => {
            this.setReply(arg);
        });
    }

    @observable message = "Please say your name";

    @action setReply(arg:string) {
        this.message = arg;
    }

    @action sayHello(name:string) {
        ipcRenderer.send("say-hello", name);
    }
  
}

export default ChatStore;