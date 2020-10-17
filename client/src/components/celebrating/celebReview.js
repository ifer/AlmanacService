import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    },
    recipList: {
        maxWidth: '500px',
        maxHeight: '500px',
        height: '500px',
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
        padding: '7px',
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
        padding: '8px',
        height: '100%',
        background: 'whitesmoke',
    },
    pageTitle: {
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '18px',
        marginTop: '20px',
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
                        {this.props.recipients.split(',').map((recipient) => {
                            return <ListItemText key={recipient} primary={recipient} />;
                        })}
                    </List>
                </Paper>
            </div>
        );
    }

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
                    {'Επαλήθευση στοιχείων'}
                </Typography>
                <Grid container justify="center" spacing={3} style={{ maxWidth: '1100px' }}>
                    <Grid item xs={5}>
                        {this.renderRecipients()}
                    </Grid>
                    <Grid item xs={5} style={{ height: '575px', marginTop: '20px' }}>
                        {this.renderEmaildata()}
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={5} style={{ marginTop: '30px' }}>
                    <Grid container item xs={7} justify="flex-end">
                        <Typography variant="subtitle1" gutterBottom style={{ color: 'darkblue' }}>
                            {messages.review_guide}
                        </Typography>
                    </Grid>
                    <Grid xs={5} container item justify="flex-end">
                        <form>
                            <Button
                                onClick={this.props.previousPage}
                                variant="outlined"
                                color="default"
                                style={{ marginRight: '50px' }}
                                className={this.classes.controlButtons}
                            >
                                {messages.prev_step}
                            </Button>
                            <Button variant="outlined" color="primary" className={this.classes.sendEmailButton}>
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
export default connect(mapStateToProps, null)(withRouter(styledCelebReview));
