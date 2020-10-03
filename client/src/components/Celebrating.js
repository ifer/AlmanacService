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
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '40px',
    },
    table: {
        minWidth: 600,
    },
});

const columns = [
    { field: 'fullName', headerName: 'Ονοματεπώνυμο', width: 300 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Τηλέφωνο', width: 200 },
];

class Celebrating extends Component {
    constructor(props) {
        super(props);
        this.classes = this.props.classes;

        this.renderTable = this.renderTable.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.state = { selected: [] };

        this.selected = [];
        this.rows = [];
        // if (this.props.celebratingList) {
        //     let id = 0;
        //     this.rows = this.props.celebratingList.map((person) => {
        //         return {
        //             id: ++id,
        //             fullName: person.fullName,
        //             email: person.email,
        //             phone: person.phone,
        //         };
        //     });
        // }
    }

    handleClick(event, id) {
        const selectedIndex = this.selected.indexOf(id);
        if (selectedIndex === -1) {
            this.selected.push(id);
        } else {
            this.selected.splice(selectedIndex, 1);
        }
        this.setState({ selected: this.selected });
        console.log(this.selected);
    }

    handleSelectAllClick(event) {
        debugger;

        if (event.target.checked) {
            this.selected = this.rows.map((row) => {
                return row.id;
            });
        } else {
            this.selected = [];
        }
        this.setState({ selected: this.selected });
        console.log(this.selected);
    }

    isSelected(id) {
        return this.selected.indexOf(id) !== -1;
    }

    renderTable() {
        let id = 0;

        this.rows = this.props.celebratingList.map((person) => {
            return {
                id: ++id,
                fullName: person.fullName,
                email: person.email,
                phone: person.phone,
            };
        });
        const rows = this.rows;
        return (
            <TableContainer component={Paper}>
                <Table className={this.classes.table} selectable="true" size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox checked={false} onChange={this.handleSelectAllClick} />
                            </TableCell>
                            <TableCell>Ονοματεπώνυμο</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Τηλέφωνο</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
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
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    render() {
        // console.log(this.props.celebratingList);
        if (!this.props.celebratingList) {
            return <div />;
        }

        return (
            <div>
                <div className={this.classes.root}>
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
    return {
        celebratingList: state.celebratingList,
    };
}

//plugin styles as props (material-ui)
const styledCelebrating = withStyles(useStyles)(Celebrating);
// With the statement below, actions will be passed to App as props
// We wrap SurveyFormReview into withRouter in order to make available
// the history object and to pass it to the action creator.
export default connect(mapStateToProps, actions)(withRouter(styledCelebrating));
// export default Home;

// <Checkbox
//     checked={rows.length > 0 && this.selected.length === rows.length}
//     onChange={this.handleSelectAllClick}
// />
