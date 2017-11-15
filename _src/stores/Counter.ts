import { observable, action } from 'mobx';

const { ipcRenderer } = (window as any).nodeRequire('electron');

class CounterStore {

    constructor() {
        // Parameters can be passed either as objects or as strings
        // (as noted below I wasn't able to get ints to work as argument types
        // without wrapping them in objects first)
        // These line register the handlers for the response messages from the backend
        // corresponding to the object and string typed messages to the backend
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
        // (my guess is it's because ints are value types but that's just a guess)
        ipcRenderer.send("counter-delta", {delta:1});
        // ipcRenderer.send("counter-delta-string","1");
    }

    @action decrement() {
        ipcRenderer.send("counter-delta", {delta:-1});
        // ipcRenderer.send("counter-delta-string","-1");
    }
  
}

export default CounterStore;