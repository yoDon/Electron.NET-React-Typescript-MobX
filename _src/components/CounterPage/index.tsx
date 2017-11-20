import * as React from "react";
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import StoreRoot from '../../stores/StoreRoot';

import * as styles from "./styles.scss";

@inject('appState')
@observer
class CounterPage extends React.Component<{appState: StoreRoot}, {}> {

    private increment() {
        this.props.appState.counter.increment();
    }

    private decrement() {
        this.props.appState.counter.decrement();
    }

    render() {
        return (
            <div>
                <div className={styles.backButton}>
                    <Link to="/">
                        <i className="fa fa-arrow-left fa-3x"/>
                    </Link>
                </div>
                <div className={`counter ${styles.counter}`}>
                    { this.props.appState.counter.value }
                    <br/>
                    { this.props.appState.counter.hasElectronAccess ? "C# Value" : "JS Value" }
                </div>
                <div className={styles.btnGroup}>
                    <button className={styles.btn} onClick={this.increment.bind(this)}>
                        <i className="fa fa-plus" />
                    </button>
                    <br/>
                    <button className={styles.btn} onClick={this.decrement.bind(this)}>
                        <i className="fa fa-minus" />
                    </button>
                </div>
            </div>
        );
    }
}

export default CounterPage;