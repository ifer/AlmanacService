import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
    },
    recipList: {
        maxWidth: '500px',
        maxHeight: '500px',
        height: '500px',
        overflow: 'hidden',
        overflowY: 'scroll',
        background: 'whitesmoke',
        color: 'black',
    },
});

class CelebReview extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.renderRecipients = this.renderRecipients.bind(this);
    }

    renderRecipients() {
        return (
            <div className={this.classes.root}>
                <List component="nav" className={this.classes.recipList}>
                    {this.props.recipients.split(',').map((recipient) => {
                        return <ListItemText key={recipient} primary={recipient} style={{ paddingLeft: '5' }} />;
                    })}
                </List>
            </div>
        );
    }

    render() {
        // console.log('subject:' + this.props.emaildata.subject + ', body: ' + this.props.emaildata.body);
        console.log('recipients: ' + this.props.recipients);
        return <div>{this.renderRecipients()}</div>;
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        recipients: state.recipients,
        emaildata: state.emaildata,
    };
}

const styledCelebReview = withStyles(useStyles)(CelebReview);
export default connect(mapStateToProps, null)(withRouter(styledCelebReview));
