import { observable, action } from 'mobx';

const { ipcRenderer } = (window as any).nodeRequire('electron');

class CounterStore {

    constructor() {
        ipcRenderer.on("counter-delta-reply", (event:any, arg:number) => {
            this.setReply(arg);
        });
        ipcRenderer.on("counter-delta-string-reply", (event:any, arg:number) => {
            this.setReply(arg);
        });
    }

    @observable counter = 0;

    @action setReply(arg:number) {
        this.counter = arg;
    }

    @action increment() {
        // wrap the integer in an object, because I was having problems passing ints directly
        // (strings are fine, I *think* the argument object you pass needs to be a nullable type in C#)
        // BUG - I'm not able to access the deserialized object properties on thee C# side, 
        //       so for not send the messages as strings
        ipcRenderer.send("counter-delta-string", "1");
        // ipcRenderer.send("counter-delta", {delta:1});
    }

    @action decrement() {
        ipcRenderer.send("counter-delta-string", "-1");
        // ipcRenderer.send("counter-delta", {delta:-1});
    }
  
}

export default CounterStore;