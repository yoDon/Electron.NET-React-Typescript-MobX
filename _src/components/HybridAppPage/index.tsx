import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ElectronWebView from 'react-electron-web-view/lib/ElectronWebView';
import { inject, observer } from 'mobx-react';
import StoreRoot from '../../../_shared/stores/StoreRoot';

import * as styles from "./styles.scss";

//
// NOTE: the WebView tag only accepts the file: protocol for the preload script
//       so the preload.js file must be included in the app as a resource
//
// NOTE: As of Nov 2017, when building a dev version on a PC the preloadScript
//       must be manually copied into the obj\Host folders as follows:
//
//     PC:  obj\Host\node_modules\electron\dist\resources\ <- this much exists after npm run cs
//                  app\bin\Assets\preload.js <---------- create these folders and copy in preload.js
//
//  or OSX: obj/Host/node_modules/electron/dist/Electron.app/Contents/Resources/ <- this much exists after npm run cs
//                  app/bin/Asssets/preload.js <------------------------------- create these folders and copy in preload.js
//
//       (Fortunately after the first time this normally only needs to be repeated
//        if you need to change preload.js, which should be a fairly rare occurance)
//
const preloadScript = ((window as any).isElectron === false) ? "" : `file://${(window as any).nodeRequire('electron').remote.app.getAppPath()+'/../app/bin/Assets/preload.js'}`;

//
// Note: you can set the WebView src attribute to ./index.html to just load this
//       app into itself as a WebView (handy for testing if stuff works) or to
//       "https://yodon.github.io/Electron.NET-React-Typescript-MobX/sample" 
//       to pull in a built version of the sample _site in this example code 
//       (but that page might not be entirely up to date with the main repo
//       since we don't currently have any automated build hooks to make sure
//       they are in sync)
//
const electronWebViewSrc = "./index.html";
//const electronWebViewSrc = "https://yodon.github.io/Electron.NET-React-Typescript-MobX/sample

@inject('appState')
@observer
class HybridAppPage extends React.Component<{appState: StoreRoot}, {}> {

    private mElement:any;

    getWebView() {
        return (document.getElementsByClassName(styles.webView) as any)[0];
    }

    componentDidMount() {
        this.mElement = this.getWebView();
        this.props.appState.counter.registerWebView(this.mElement);
    }

    componentWillUnmount() {
        this.props.appState.counter.unregisterWebView(this.mElement);
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
                    src={electronWebViewSrc}
                    preload={preloadScript}
                    className={styles.webView}
                />
                <div style={{margin:"15px"}}>
                    Counter: <b>{this.props.appState.counter.value}</b>
                </div>
                <div style={{margin:"15px"}}>
                    VERY IMPORTANT for now you need to manually copy the ./Assets folder into
                    a couple of nested node_modules locations after building for the first time,
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
