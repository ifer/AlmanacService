import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import messages from '../../util/messages';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        // '& .MuiGrid-spacing-xs-3': {
        //     margin: '0px',
        // },
    },
    recipList: {
        // maxWidth: '500px',
        // maxHeight: '500px',
        height: '93%',
        overflow: 'hidden',
        overflowY: 'auto',
        background: 'whitesmoke',
        color: 'black',
        paddingLeft: '10px',
    },
    emailElement: {
        maxHeight: '330px',
        overflow: 'hidden',
        overflowY: 'auto',
        border: '1px inset lightgray',
        padding: '8px',
    },
    emailBox: {
        height: '93%',
        padding: '8px',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
    },
    sectionTitle: {
        color: 'darkred',
        height: '4%',
    },
    section: {
        // margin: '5px',
        marginLeft: '5px',
        marginRight: '5px',
        padding: '8px',
        height: '550px',
        background: 'whitesmoke',
    },
    pageTitle: {
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '18px',
        marginTop: '0px',
    },
    controlButtons: {
        color: 'darkred',
        textTransform: 'none',
    },
    sendEmailButton: {
        background: 'green',
        color: 'white',
        textTransform: 'none',
    },
    buttonSection: {
        background: 'SeaShell',
        border: '2px solid lightgrey',
        marginTop: '30px',
        padding: '10px',
        // paddingTop: '8px',
        // paddingBottom: '8px',
        // paddingLeft: '12px',
        // paddingRight: '12px',
        // maxWidth: '1100px',
        // minWidth: '1000px',
    },
});

class CelebReview extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.renderRecipients = this.renderRecipients.bind(this);
        this.renderEmaildata = this.renderEmaildata.bind(this);
    }

    renderRecipients() {
        return (
            <div className={this.classes.root}>
                <Paper elevation={2} className={this.classes.section}>
                    <Typography paragraph variant="subtitle2" className={this.classes.sectionTitle}>
                        {messages.email_recipients}
                    </Typography>
                    <List component="nav" className={this.classes.recipList}>
                        {this.props.recipients.map((recipient) => {
                            return (
                                <ListItemText
                                    key={recipient.email}
                                    primary={recipient.name + ' (' + recipient.email + ')'}
                                />
                            );
                        })}
                    </List>
                </Paper>
            </div>
        );
    }
    /*
{this.props.recipients.split(',').map((recipient) => {
    return <ListItemText key={recipient} primary={recipient} />;
})}
*/
    renderEmaildata() {
        return (
            <Paper elevation={2} className={this.classes.section}>
                <Typography paragraph variant="subtitle2" className={this.classes.sectionTitle}>
                    {messages.email_data}
                </Typography>
                <div className={this.classes.emailBox}>
                    <div style={{ color: 'SlateGrey' }}>{messages.email_subject}</div>
                    <Typography paragraph variant="subtitle1" className={this.classes.emailElement}>
                        {this.props.emaildata.subject}
                    </Typography>
                    <div style={{ color: 'SlateGrey' }}>{messages.email_body}</div>
                    <Typography paragraph variant="subtitle1" className={this.classes.emailElement}>
                        {this.props.emaildata.body}
                    </Typography>
                </div>
            </Paper>
        );
    }

    render() {
        // console.log('subject:' + this.props.emaildata.subject + ', body: ' + this.props.emaildata.body);
        // console.log('recipients: ' + this.props.recipients);
        return (
            <div className={this.classes.root}>
                <Typography paragraph variant="h5" className={this.classes.pageTitle}>
                    {messages.email_verify_data}
                </Typography>
                <Paper
                    elevation={2}
                    style={{
                        background: 'white',
                        paddingLeft: '10px',
                        height: '100%',
                        // paddingTop: '30px',
                        paddingBottom: '20px',
                    }}
                >
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={5}>
                            {this.renderRecipients()}
                        </Grid>
                        <Grid item xs={5} style={{ marginTop: '20px' }}>
                            {this.renderEmaildata()}
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container item xs={12} className={this.classes.buttonSection}>
                    <Grid container item xs={7} justify="flex-end" alignItems="center">
                        <Typography variant="subtitle1" gutterBottom style={{ color: 'darkblue' }}>
                            {messages.review_guide}
                        </Typography>
                    </Grid>
                    <Grid xs={5} container item justify="flex-end" alignItems="center">
                        <form onSubmit={this.props.handleSubmit}>
                            <Button
                                onClick={this.props.previousPage}
                                variant="outlined"
                                color="default"
                                style={{ width: '115px', marginRight: '20px' }}
                                className={this.classes.controlButtons}
                            >
                                {messages.prev_step}
                            </Button>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                style={{ width: '115px' }}
                                className={this.classes.sendEmailButton}
                            >
                                {messages.send_email}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        );
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

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate
})(connect(mapStateToProps, null)(withRouter(styledCelebReview)));

// export default connect(mapStateToProps, null)(withRouter(styledCelebReview));
