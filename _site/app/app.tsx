import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { useStrict } from 'mobx'
import SiteHomePage from "../components/SiteHomePage";
import CounterPage from "../../_shared/components/CounterPage";
import StoreRoot from "../../_shared/stores/StoreRoot";

import "./app.global.scss";

useStrict(true);

const stores = new StoreRoot();

ReactDOM.render(
    <Provider appState={stores}>
        <HashRouter>
            <div>
                <Route exact path="/counter" component={CounterPage} />
                <Route exact path="/" component={SiteHomePage} />
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('Content')
);