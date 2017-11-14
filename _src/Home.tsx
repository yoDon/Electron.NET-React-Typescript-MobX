import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ElectronWebView from 'react-electron-web-view/lib/ElectronWebView';

class Home extends React.Component {
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ElectronWebView src="http://github.com" />
                        <Link to='/chat'>go to chat...</Link>
                    </div>
                </div>
            </div>
        );
    }
}

 export default Home;