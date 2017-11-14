import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import Home from "./Home";
import Chat from "./Chat";
import ChatStore from "./stores/Chat";

require('./index.html');

const stores = new ChatStore();

ReactDOM.render(
    <Provider appState={stores}>
        <HashRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/chat" component={Chat}/>
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('Content')
);