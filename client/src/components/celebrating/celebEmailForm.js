import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import CelebList from './celebList';
// import CelebReview from './celebReview';

import { setEmailData } from '../../actions';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    controlButtons: {
        color: 'darkred',
        textTransform: 'none',
    },
});

class CelebEmailForm extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;

        this.state = { subject: '', body: '' };

        this.submitEmailData = this.submitEmailData.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    componentDidMount() {
        // console.log(`CelebEmail: ${this.props.recipients}`);
    }

    handleChangeText(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    submitEmailData() {
        if (validate({ subject: this.state.subject, body: this.state.body }) === false) return;

        this.props.setEmailData({ subject: this.state.subject, body: this.state.body });
        this.props.handleSubmit();
    }

    render() {
        console.log('subject:' + this.state.subject + ', body: ' + this.state.body);
        return (
            // console.log(`Recipients: ${this.props.recipients}`);
            <form onSubmit={this.props.handleSubmit} style={{ marginTop: '30px' }}>
                <div>
                    <Field
                        name="subject"
                        component={renderTextField}
                        label="Θέμα"
                        onChange={this.handleChangeText}
                        inputProps={{
                            style: {
                                height: '2em',
                                width: '600px',
                                paddingLeft: '1em',
                            },
                        }}
                    />
                    <Field
                        name="body"
                        component={renderTextField}
                        label="Κείμενο"
                        onChange={this.handleChangeText}
                        multiline
                        rows={10}
                        inputProps={{
                            style: {
                                height: '10em',
                            },
                        }}
                    />

                    <Grid container item xs={12} spacing={5} style={{ marginTop: '30px' }}>
                        <Grid container item xs={8} justify="flex-end">
                            <Typography variant="subtitle1" gutterBottom style={{ color: 'darkblue' }}>
                                Συμπληρώστε το θέμα και το κείμενο του μηνύματος και πατήστε 'Επόμενο'
                            </Typography>
                        </Grid>
                        <Grid xs={4} container item justify="flex-end">
                            <Button
                                onClick={this.props.previousPage}
                                variant="outlined"
                                color="default"
                                style={{ marginRight: '50px' }}
                                className={this.classes.controlButtons}
                            >
                                Προηγούμενο
                            </Button>
                            <Button
                                onClick={this.submitEmailData}
                                variant="outlined"
                                color="primary"
                                className={this.classes.controlButtons}
                            >
                                Επόμενο
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
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
        errors['subject'] = 'Παρακαλώ γράψτε το θέμα του μηνύματος';
    }
    if (!values['body']) {
        errors['body'] = 'Παρακαλώ γράψτε το κείμενο του μηνύματος';
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
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // validate
})(connect(mapStateToProps, { setEmailData })(styledCelebEmailForm));
