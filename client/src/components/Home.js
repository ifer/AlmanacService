import React, { Component } from 'react';

class Home extends Component {
    render() {
        let caldate = '21082020';
        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <span className="flow-text">{caldate}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large">
                            <i className="material-icons left">arrow_upward</i>
                            prev month
                        </a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large">
                            <i className="material-icons left">arrow_back</i>
                            prev day
                        </a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large" href="/api/goto/next/21082020">
                            <i className="material-icons right">arrow_forward</i>
                            next day
                        </a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large">
                            <i className="material-icons right">arrow_downward</i>
                            next month
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn-large">
                            <i className="material-icons right">keyboard_return</i>
                            today
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
