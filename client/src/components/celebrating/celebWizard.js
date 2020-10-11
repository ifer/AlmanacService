import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CelebList from './celebList';
import CelebEmail from './celebEmail';
import CelebReview from './celebReview';

class CelebWizard extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1,
        };
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
                {page === 2 && <CelebEmail previousPage={this.previousPage} onSubmit={this.nextPage} />}
                {page === 3 && <CelebReview previousPage={this.previousPage} onSubmit={onSubmit} />}
            </div>
        );
    }
}

// CelebWizard.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };

export default CelebWizard;
