import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

// Import all action -creator functions
// import * as actions from '../../actions';
import { getRecipients } from '../../actions';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { TablePagination } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import * as Yup from 'yup';

import { withStyles } from '@material-ui/core/styles';

import messages from '../../util/messages';
import ShowNotification from '../ShowNotification';
import validateEmails from '../../util/validateEmails';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    table: {
        minWidth: 600,
    },
    container: {
        maxHeight: 350,
    },
    tableTitle: {
        color: 'darkred',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '18px',
    },
    tableLabel: {
        fontWeight: 'bold',
    },
    input1: {
        height: 50,
    },
    controlLabels: {
        color: 'darkred',
        textTransform: 'none',
    },
    controlButtons: {
        color: 'darkred',
        textTransform: 'none',
    },
});

class CelebList extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;

        this.renderTable = this.renderTable.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.validate = this.validate.bind(this);
        this.submitRecipients = this.submitRecipients.bind(this);
        this.hideError = this.hideError.bind(this);

        this.state = {
            rows: [],
            selected: [],
            page: 0,
            rowsPerPage: 10,
            error: false,
            errormsg: '',
        };

        this.selected = [];
        // this.rows = [];
        this.allSelected = false;
    }

    componentDidMount() {
        let id = 0;
        if (!this.props.celebratingList) return;

        let rows = this.props.celebratingList.map((person) => {
            return {
                id: ++id,
                fullName: person.fullName,
                email: person.email,
                phone: person.phone,
            };
        });
        this.setState({ rows: rows });
    }

    handleClick(event, row) {
        if (!row.email) {
            return;
        }
        const selectedIndex = this.selected.indexOf(row.id);
        if (selectedIndex === -1) {
            this.selected.push(row.id);
        } else {
            this.selected.splice(selectedIndex, 1);
        }
        this.setState({ selected: this.selected });
        // console.log(this.selected);
    }

    handleSelectAllClick(event) {
        if (!this.allSelected) {
            const havingEmail = this.state.rows.filter((row) => {
                return row.email;
            });
            this.selected = havingEmail.map((row) => {
                return row.id;
            });
            this.allSelected = true;
        } else {
            this.selected = [];
            this.allSelected = false;
        }
        this.setState({ selected: this.selected });
        // console.log(this.selected);
    }

    isSelected(id) {
        return this.selected.indexOf(id) !== -1;
    }

    handleChangePage(event, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: parseInt(event.target.value), page: 0 });
    }

    handleBackButton() {
        this.props.history.push('/');
    }

    validate(recipients) {
        // let recipients = '';
        // this.state.rows.forEach((person) => {
        //     if (this.isSelected(person.id)) {
        //         recipients += person.email + ',';
        //     }
        // });
        const errors = {}; // If this object remains empty, that means there are no errors
        errors.recipients = validateEmails(recipients || '');

        if (errors.recipients.length > 0) {
            this.setState({ error: true, errormsg: 'Οι εξής διευθύνσεις είναι άκυρες: ' + errors.recipients });
            return false;
        }
        // console.log(errors.recipients);
    }

    hideError() {
        this.setState({ error: false, errormsg: '' });
    }

    submitRecipients() {
        let recipients = '';
        this.state.rows.forEach((person) => {
            if (this.isSelected(person.id)) {
                recipients += person.email + ',';
            }
        });
        console.log('submitRecipients');
        if (this.validate(recipients) == false) return;
        this.props.getRecipients(recipients);
        this.props.handleSubmit();
    }

    renderTable() {
        const today = `${this.props.curdayinfo.dayOfMonth} ${this.props.curdayinfo.month}  ${this.props.curdayinfo.year}`;

        const emptyRows =
            this.state.rowsPerPage -
            Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage);
        // console.log(`emptyRows=${emptyRows}`);

        return (
            <div>
                <Typography paragraph variant="h5" className={this.classes.tableTitle}>
                    {`${messages.celebrating_table_title} ${today}`}
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={this.classes.table} selectable="true" size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={this.allSelected}
                                        onClick={(event) => this.handleSelectAllClick(event)}
                                    />
                                </TableCell>
                                <TableCell className={this.classes.tableLabel}>{messages.label_fullname}</TableCell>
                                <TableCell className={this.classes.tableLabel}>{messages.label_email}</TableCell>
                                <TableCell className={this.classes.tableLabel}>{messages.label_phone}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows
                                .slice(
                                    this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
                                )
                                .map((row) => {
                                    const isSelected = this.isSelected(row.id);
                                    const isDisabled = row.email ? false : true;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isSelected}
                                            onClick={(event) => this.handleClick(event, row)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} disabled={isDisabled} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.fullName}
                                            </TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                        </TableRow>
                                    );
                                })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={this.state.rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelDisplayedRows={({ from, to, count }) =>
                        `${messages.label_rows} ${from}-${to} ${messages.label_rows_count} ${count}`
                    }
                    labelRowsPerPage={messages.label_rows_per_page}
                />
            </div>
        );
    }

    render() {
        // console.log(`Subject=${this.state.subject} body=${this.state.body}`);
        if (!this.props.celebratingList) {
            return <div />;
        }

        return (
            <div>
                <ShowNotification
                    open={this.state.error}
                    text={this.state.errormsg}
                    onClose={this.hideError}
                    severity={'error'}
                />

                <div className={this.classes.root}>
                    <IconButton size="medium" onClick={this.handleBackButton}>
                        <ArrowBackIcon style={{ color: 'blue' }} />
                    </IconButton>

                    <Grid container justify="center" spacing={3} style={{ maxWidth: '1100px', minWidth: '1000px' }}>
                        <Grid item xs={12}>
                            {this.renderTable()}
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} spacing={5} style={{ marginTop: '30px' }}>
                        <Grid container item xs={8} justify="flex-end">
                            <Typography variant="subtitle1" gutterBottom style={{ color: 'darkblue' }}>
                                Επιλέξτε τα πρόσωπα στα οποία θέλετε να στείλετε email και πατήστε 'Επόμενο'
                            </Typography>
                        </Grid>
                        <Grid xs={4} container item justify="flex-end">
                            <form>
                                <Button
                                    onClick={this.handleBackButton}
                                    variant="outlined"
                                    color="default"
                                    style={{ marginRight: '50px' }}
                                    className={this.classes.controlButtons}
                                >
                                    Άκυρο
                                </Button>
                                <Button
                                    onClick={this.submitRecipients}
                                    variant="outlined"
                                    color="primary"
                                    className={this.classes.controlButtons}
                                    disabled={this.selected.length === 0}
                                >
                                    Επόμενο
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
/*
{this.renderEmailForm()}

*/

function mapStateToProps(state) {
    // console.log(state);
    return {
        celebratingList: state.celebratingList,
        curdayinfo: state.date,
    };
}

//plugin styles as props (material-ui)
const styledCelebList = withStyles(useStyles)(CelebList);
// With the statement below, actions will be passed to App as props
// We wrap SurveyFormReview into withRouter in order to make available
// the history object and to pass it to the action creator.
const connectedCelebList = connect(mapStateToProps, { getRecipients })(withRouter(styledCelebList));

export default reduxForm({
    form: 'wizard', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(connectedCelebList);
