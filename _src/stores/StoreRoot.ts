import Counter from './Counter';

class StoreRoot {
    //
    // Following the MobX best practices documentation,
    // https://mobx.js.org/best/store.html use a root store 
    // to provide support breaking the application state into
    // multiple child stores (as the app gets bigger it's
    // important to not just mash all the state into a
    // single hyper-functional class definition)
    //
    counter = new Counter();
    //other = new Other();
    //stuff = new Stuff();
}

export default StoreRoot;