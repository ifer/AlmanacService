import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Import all action -creator functions
import * as actions from '../actions';

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

import { withStyles } from '@material-ui/core/styles';

import messages from '../util/messages';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
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
});

class Celebrating extends Component {
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

        this.state = { rows: [], selected: [], page: 0, rowsPerPage: 10 };

        this.selected = [];
        // this.rows = [];
        this.allSelected = false;
    }

    componentWillMount() {
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

    handleClick(event, id) {
        const selectedIndex = this.selected.indexOf(id);
        if (selectedIndex === -1) {
            this.selected.push(id);
        } else {
            this.selected.splice(selectedIndex, 1);
        }
        this.setState({ selected: this.selected });
        // console.log(this.selected);
    }

    handleSelectAllClick(event) {
        if (!this.allSelected) {
            this.selected = this.state.rows.map((row) => {
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
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isSelected}
                                            onClick={(event) => this.handleClick(event, row.id)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
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

    /*
    labelDisplayedRows={
        (messages.labelDisplayedRows_from,
        messages.labelDisplayedRows_to,
        messages.labelDisplayedRows_count,
        messages.labelDisplayedRows_page)
    }
    */

    render() {
        // console.log(this.props.celebratingList);
        if (!this.props.celebratingList) {
            return <div />;
        }

        return (
            <div>
                <div className={this.classes.root}>
                    <IconButton size="medium" onClick={this.handleBackButton}>
                        <ArrowBackIcon style={{ color: 'blue' }} />
                    </IconButton>

                    <Grid container justify="center" spacing={3} style={{ maxWidth: '1100px', minWidth: '1000px' }}>
                        <Grid item xs={12}>
                            {this.renderTable()}
                        </Grid>
                        <Grid item xs={5} style={{ height: '300px' }}></Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        celebratingList: state.celebratingList,
        curdayinfo: state.date,
    };
}

//plugin styles as props (material-ui)
const styledCelebrating = withStyles(useStyles)(Celebrating);
// With the statement below, actions will be passed to App as props
// We wrap SurveyFormReview into withRouter in order to make available
// the history object and to pass it to the action creator.
export default connect(mapStateToProps, actions)(withRouter(styledCelebrating));
// export default Home;
