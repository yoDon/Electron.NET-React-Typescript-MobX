import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import HomePage from "../components/HomePage";
import WebViewPage from "../components/WebViewPage";
import CounterPage from "../components/CounterPage";
import CounterStore from "../stores/Counter";

import "./app.global.scss";

require('./index.html');

const stores = new CounterStore();

ReactDOM.render(
    <Provider appState={stores}>
        <HashRouter>
            <div>
                <Route exact path="/counter" component={CounterPage} />
                <Route exact path="/webview" component={WebViewPage} />
                <Route exact path="/" component={HomePage} />
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('Content')
);