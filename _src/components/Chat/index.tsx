import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react'
import ChatStore from '../../stores/Chat'

@inject('appState')
@observer
class Chat extends React.Component<{appState: ChatStore}, {}> {

    private sayHello(e:React.FormEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        this.props.appState.sayHello(value);
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <input 
                            type="text" 
                            placeholder="say your name" 
                            onInput={this.sayHello.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        Server responded '{this.props.appState.message}'
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to='/'>back to home page...</Link>
                    </div>
                </div>
            </div>
        );
    }
}

 export default Chat;