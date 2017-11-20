import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { useStrict } from 'mobx'
import HomePage from "../components/HomePage";
import HybridAppPage from "../components/HybridAppPage";
import WebViewPage from "../components/WebViewPage";
import CounterPage from "../components/CounterPage";
import StoreRoot from "../stores/StoreRoot";

import "./app.global.scss";

useStrict(true);
require('./index.html');

const stores = new StoreRoot();

ReactDOM.render(
    <Provider appState={stores}>
        <HashRouter>
            <div>
                <Route exact path="/counter" component={CounterPage} />
                <Route exact path="/webview" component={WebViewPage} />
                <Route exact path="/hybrid" component={HybridAppPage} />
                <Route exact path="/" component={HomePage} />
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('Content')
);