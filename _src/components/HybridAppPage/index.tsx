import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ElectronWebView from 'react-electron-web-view/lib/ElectronWebView';
import { inject, observer } from 'mobx-react';
import StoreRoot from '../../stores/StoreRoot';

import * as styles from "./styles.scss";
const remote = ((window as any).isElectron) ? (window as any).nodeRequire('electron').remote : null;

//
// NOTE: the WebView tag only accepts the file: protocol for the preload script
// HACK: for reasons that I don't understand the following path gets
//       mangled somewhere seemingly beyond my control into ...../node_modules/Assets/preload.js
//       so you need to make sure the preload.js ends up there. At present I'm
//       manually copying the Assets folder into the various destition folders
//          obj/{desktop,host}/node_modules/Assets
//          bin/desktop/*/resources/app/node_modules/Assets
//
const preloadScript = (remote === null ) ? "" : `file://${remote.app.getAppPath()+'/../../../../../../../Assets/preload.js'}`;

//
// Note: you can change the WebView src attribute to 
//       "https://yodon.github.io/Electron.NET-React-Typescript-MobX/sample" 
//       to show you can pull the code from the web (but that page might 
//       not be entirely up to date with the main repo)
//

@inject('appState')
@observer
class HybridAppPage extends React.Component<{appState: StoreRoot}, {}> {

    private mDisposers = [] as (()=>void)[];
    private mElement:any;

    getWebView() {
        return (document.getElementsByClassName(styles.webView) as any)[0];
    }
    componentDidMount() {
        if ((window as any).isElectron) {
            this.mElement = this.getWebView();
            this.mElement.addEventListener("dom-ready", () => {
                this.mDisposers = this.props.appState.counter.addWebViewListeners(this.mElement);
                this.props.appState.counter.initializeWebViewState(this.mElement);
                // Uncomment next line to automatically open the devTools window after the content loads
                // element.openDevTools();
            });
        }
    }

    componentWillUnmount() {
        this.mDisposers.forEach((disposer) => {
            disposer();
        })
    }

    openDevTools() {
        this.mElement.openDevTools();
    }

    innerBack() {
        if (this.mElement.canGoBack()) { 
            this.mElement.goBack();
        }
    }

    plus() {
        this.props.appState.counter.increment();
    }

    minus() {
        this.props.appState.counter.decrement();
    }

    render() {
        if ((window as any).isElectron === false) {
            return (
                <div>
                    <h2>WebView is only available directly in Electron</h2>
                    <div className={styles.backButton}>
                    <br/>
                        <Link to="/">
                            <i className="fa fa-arrow-left fa-3x"/>
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <ElectronWebView 
                    src="./index.html" 
                    preload={preloadScript}
                    className={styles.webView}
                />
                <div style={{margin:"15px"}}>
                    Counter: <b>{this.props.appState.counter.value}</b>
                </div>
                <div style={{margin:"15px"}}>
                    VERY IMPORTANT for now you need to manually copy the ./Assets folder into
                    a couple of nested node_modules locations after build for the first time,
                    as described in the repo readme. If you forgot to do that, you'll either 
                    see white above where the WebView should be or when you click on "Counter"
                    you'll see the WebView telling you it's using JS rather than C# to track
                    the counter state and it's not updating the main Electron counter state, 
                    both of which are because it didn't receive the electron access it needs 
                    (see the next section for more info).
                </div>
                <div style={{margin:"15px"}}>
                    You can also load the contained page (https://yodon.github.io/Electron.NET-React-Typescript-MobX/sample) 
                    in your browser where it does not have access to the Electron API. In that case the 
                    contained code will use "local state" maintained in JS rather than "electron state"
                    maintained by C#
                </div>
                <div className={styles.backButton}>
                    <Link to="/" style={{marginRight:"60px"}}>
                        <i className="fa fa-arrow-left fa-3x"/>
                    </Link>
                    <button 
                        className="btn btn.main" 
                        style={{margin:"15px", backgroundColor:"coral"}} 
                        onClick={this.openDevTools.bind(this)}
                    >
                        Open inner dev tools
                    </button>
                    <button 
                        className="btn btn.main" 
                        style={{margin:"15px", backgroundColor:"coral"}} 
                        onClick={this.innerBack.bind(this)}
                    >
                        Inner back back button
                    </button>
                    <button 
                        className="btn btn.main" 
                        style={{margin:"15px", backgroundColor:"coral"}} 
                        onClick={this.plus.bind(this)}
                    >
                        Plus
                    </button>
                    <button 
                        className="btn btn.main" 
                        style={{margin:"15px", backgroundColor:"coral"}} 
                        onClick={this.minus.bind(this)}
                    >
                        Minus
                    </button>
                </div>
            </div>
        );
    }
}

export default HybridAppPage;
