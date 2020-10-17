import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
        overflowY: 'auto',
        background: 'whitesmoke',
        color: 'black',
        paddingLeft: '10px',
    },
    pageTitle: {},
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
                <List component="nav" className={this.classes.recipList}>
                    {this.props.recipients.split(',').map((recipient) => {
                        return <ListItemText key={recipient} primary={recipient} />;
                    })}
                </List>
            </div>
        );
    }

    renderEmaildata() {
        return (
            <Paper
                elevation={2}
                style={{ height: '100%', background: 'whitesmoke', paddingLeft: '10px', paddingTop: '10px' }}
            >
                <div>Θέμα:</div>
                <Typography paragraph variant="subtitle1">
                    {this.props.emaildata.subject}
                </Typography>
                <div>Κείμενο:</div>
                <Typography
                    paragraph
                    variant="subtitle1"
                    style={{ maxHeight: '200px', overflow: 'hidden', overflowY: 'auto' }}
                >
                    {this.props.emaildata.body}
                </Typography>
            </Paper>
        );
    }

    //  style={{ maxWidth: '1300px', minWidth: '1000px' }}

    render() {
        // console.log('subject:' + this.props.emaildata.subject + ', body: ' + this.props.emaildata.body);
        // console.log('recipients: ' + this.props.recipients);
        return (
            <div className={this.classes.root}>
                <Typography paragraph variant="h5" className={this.classes.tableTitle}>
                    {'Επαλήθευση στοιχείων'}
                </Typography>
                <Grid container justify="center" spacing={3} style={{ maxWidth: '1100px' }}>
                    <Grid item xs={5}>
                        {this.renderRecipients()}
                    </Grid>
                    <Grid item xs={5} style={{ height: '525px', marginTop: '20px' }}>
                        {this.renderEmaildata()}
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
