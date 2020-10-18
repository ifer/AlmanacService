import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';

import CelebList from './celebList';
import CelebEmailForm from './celebEmailForm';
import CelebReview from './celebReview';

import * as actions from '../../actions';

class CelebWizard extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.wizardCancelled = this.wizardCancelled.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

        this.state = {
            page: 1,
        };

        this.emailFormSubmitted = this.emailFormSubmitted.bind(this);
    }

    wizardCancelled() {
        this.props.setCelebSelected([]);
        this.props.setEmailData(null);
        this.props.history.push('/');
    }

    emailFormSubmitted(emaildata, arg2, arg3, arg4) {
        // debugger;
        this.props.setEmailData({ subject: emaildata.subject, body: emaildata.body });
        this.setState({ page: this.state.page + 1 });
    }

    sendEmail() {
        console.log('Sending email  ... ');
        console.log(this.props.recipients);
        console.log(this.props.emaildata.subject + '  ' + this.props.emaildata.body);
        this.props.setCelebSelected([]);
        this.props.setEmailData(null);
        this.props.history.push('/');
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        // const { onSubmit } = this.props;
        const { page } = this.state;
        return (
            <div>
                {page === 1 && <CelebList cancel={this.wizardCancelled} onSubmit={this.nextPage} />}
                {page === 2 && <CelebEmailForm previousPage={this.previousPage} onSubmit={this.emailFormSubmitted} />}
                {page === 3 && <CelebReview previousPage={this.previousPage} onSubmit={this.sendEmail} />}
            </div>
        );
    }
}

// CelebWizard.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };

function mapStateToProps(state) {
    // console.log(state);
    return {
        recipients: state.recipients,
        emaildata: state.emaildata,
    };
}

// export default connect(mapStateToProps, actions)(withRouter(CelebWizard));

// We are using here reduxForm for one reason only: so that if the user presses cancel
// in the CelebList screen or BACK on the browser, all form fields are cleared.
// This is necessary because in  SurveyForm component, we are using the setting
// "destroyOnUnmount: false" so that the form keeps its values when user leaves
// SurveyForm and goes to SurveyFormReview.
// In this component we are not using this setting (the default is true) and so
// the form is being cleared when unmounted.
export default reduxForm({
    form: 'wizard',
})(connect(mapStateToProps, actions)(withRouter(CelebWizard)));
