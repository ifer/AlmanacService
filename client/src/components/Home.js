import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
// Import all action -creator functions
import * as actions from '../actions';

import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);
        // this.caldate = '21082020';
        this.state = {
            curdate: moment(),
        };
    }

    componentDidMount() {
        // this.setState({ curdate: this.props.date || moment() });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <span className="flow-text">{this.state.curdate.format('DD/MM/YYYY')}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large" href="#">
                            <i className="material-icons left">arrow_upward</i>
                            prev month
                        </a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large" href="#">
                            <i className="material-icons left">arrow_back</i>
                            prev day
                        </a>
                    </div>
                    <div className="col s3">
                        <a
                            className="waves-effect waves-light btn-large"
                            href={this.props.changeDate('next', this.state.curdate.format('DDMMYYYY'))}
                        >
                            <i className="material-icons right">arrow_forward</i>
                            next day
                        </a>
                    </div>
                    <div className="col s3">
                        <a className="waves-effect waves-light btn-large" href="#">
                            <i className="material-icons right">arrow_downward</i>
                            next month
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn-large" href="#">
                            <i className="material-icons right">keyboard_return</i>
                            today
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

//href={this.props.changeDate('next', this.state.curdate.format('DDMMYYYY'))}
function mapStateToProps(state) {
    return { date: state.date };
}

// With the statement below, actions will be passed to App as props
export default connect(mapStateToProps, actions)(Home);
// export default Home;
