import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import CelebList from './celebList';
import CelebReview from './celebReview';

class CelebEmail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('render');
        return <div>Email</div>;
    }
}

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate
})(CelebEmail);
