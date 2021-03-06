import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// import CelebList from './celebList';
// import CelebReview from './celebReview';

import { setEmailData } from '../../actions';
import messages from '../../util/messages';
import { withStyles } from '@material-ui/core/styles';

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
    controlButtons: {
        color: 'darkred',
        textTransform: 'none',
    },
    pageTitle: {
        color: 'darkblue',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '18px',
        marginTop: '20px',
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
    formBackground: {
        // maxWidth: '1100px',
        // minWidth: '1000px',
        // minHeight: '500px',
        background: 'white',
        paddingLeft: '10px',
        // paddingTop: '30px',
        // paddingBottom: '30px',
    },
});

class CelebEmailForm extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;

        this.state = {
            subject: this.props.initialValues.subject || '',
            body: this.props.initialValues.body || '',
        };

        // this.submitEmailData = this.submitEmailData.bind(this);
        // this.handleChangeText = this.handleChangeText.bind(this);
    }
    // style={{ border: '5px solid blue' }}
    render() {
        // console.log('subject:' + this.state.subject + ', body: ' + this.state.body);
        return (
            <div>
                <Typography paragraph variant="h5" className={this.classes.pageTitle}>
                    {messages.email_message_title}
                </Typography>

                <Paper elevation={2} className={this.classes.formBackground}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <form
                            onSubmit={this.props.handleSubmit}
                            style={{ padding: '20px', width: '100%', textAlign: 'center' }}
                        >
                            <Field
                                name="subject"
                                component={renderTextField}
                                label={messages.email_subject}
                                onChange={this.handleChangeText}
                                style={{ width: '80%', margin: '10px' }}
                                inputProps={{
                                    style: {
                                        height: '2em',
                                        width: '80%',
                                        paddingLeft: '1em',
                                    },
                                }}
                            />
                            <Field
                                name="body"
                                component={renderTextField}
                                label={messages.email_body}
                                onChange={this.handleChangeText}
                                multiline
                                rows={15}
                                style={{ width: '80%', margin: '10px' }}
                                inputProps={{
                                    style: {
                                        height: '20em',
                                    },
                                }}
                            />
                        </form>
                    </Grid>
                </Paper>
                <Grid container item xs={12} className={this.classes.buttonSection}>
                    <Grid container item xs={8} justify="flex-end" alignItems="center">
                        <Typography variant="subtitle1" gutterBottom style={{ color: 'darkblue' }}>
                            {messages.email_message_guide}
                        </Typography>
                    </Grid>
                    <Grid xs={4} container item justify="flex-end" alignItems="center">
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
                                className={this.classes.controlButtons}
                            >
                                {messages.next_step}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
//     <TextField hintText={label} floatingLabelText={label} errorText={touched && error} {...input} {...custom} />
// );

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField
        label={label}
        placeholder={label}
        variant="outlined"
        error={touched && invalid}
        helperText={touched && error}
        style={{ width: '600px', marginTop: '20px' }}
        {...input}
        {...custom}
    />
);

function validate(values) {
    const errors = {}; // If this object remains empty, that means there are no errors

    if (!values['subject']) {
        errors['subject'] = messages.email_subject_mandatory;
    }
    if (!values['body']) {
        errors['body'] = messages.email_body_mandatory;
    }

    return errors;
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        recipients: state.recipients,
    };
}

//plugin styles as props (material-ui)
const styledCelebEmailForm = withStyles(useStyles)(CelebEmailForm);
export default reduxForm({
    form: 'wizard', // <------ same form name
    validate: validate,
    initialValues: {
        subject: '',
        body: '',
    },

    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate
})(connect(mapStateToProps, { setEmailData })(styledCelebEmailForm));
