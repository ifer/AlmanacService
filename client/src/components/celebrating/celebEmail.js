import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import CelebList from './celebList';
import CelebReview from './celebReview';

class CelebEmail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(`CelebEmail: ${this.props.recipients}`);
    }

    render() {
        console.log(`Recipients: ${this.props.recipients}`);
        return <div>Email</div>;
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        recipients: state.recipients,
    };
}

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate
})(connect(mapStateToProps, null)(CelebEmail));
