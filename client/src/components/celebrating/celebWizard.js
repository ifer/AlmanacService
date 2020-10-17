import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CelebList from './celebList';
import CelebEmailForm from './celebEmailForm';
import CelebReview from './celebReview';

import * as actions from '../../actions';

class CelebWizard extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1,
        };

        this.emailFormSubmitted = this.emailFormSubmitted.bind(this);
    }

    recipientsSubmitted() {}

    emailFormSubmitted(emaildata, arg2, arg3, arg4) {
        // debugger;
        this.props.setEmailData({ subject: emaildata.subject, body: emaildata.body });
        this.setState({ page: this.state.page + 1 });
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;
        return (
            <div>
                {page === 1 && <CelebList onSubmit={this.nextPage} />}
                {page === 2 && <CelebEmailForm previousPage={this.previousPage} onSubmit={this.emailFormSubmitted} />}
                {page === 3 && <CelebReview previousPage={this.previousPage} onSubmit={onSubmit} />}
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
    };
}

// export default CelebWizard;
export default connect(mapStateToProps, actions)(CelebWizard);
