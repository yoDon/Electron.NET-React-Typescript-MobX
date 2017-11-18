import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ElectronWebView from 'react-electron-web-view/lib/ElectronWebView';

import * as styles from "./styles.scss";

class WebViewPage extends React.Component {

    openDevTools() {
        (document.getElementsByClassName(styles.webView) as any)[0].openDevTools();
    }

    innerBack() {
        if ((document.getElementsByClassName(styles.webView) as any)[0].canGoBack()) { 
            (document.getElementsByClassName(styles.webView) as any)[0].goBack();
        }
    }
    
    render() {
        if ((window as any).isElectron) {
            return (
                <div>
                    <ElectronWebView src="http://github.com" className={styles.webView} />
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
                    </div>
                </div>
            );
        }
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
}

export default WebViewPage;
