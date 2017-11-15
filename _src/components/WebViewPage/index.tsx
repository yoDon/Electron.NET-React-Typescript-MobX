import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ElectronWebView from 'react-electron-web-view/lib/ElectronWebView';

import * as styles from "./styles.scss";

class WebViewPage extends React.Component {
    render() {
        return (
            <div>
                <ElectronWebView src="http://github.com" className={styles.webView} />
                <div className={styles.backButton}>
                <Link to="/">
                    <i className="fa fa-arrow-left fa-3x"/>
                </Link>
            </div>
        </div>
        );
    }
}

export default WebViewPage;
