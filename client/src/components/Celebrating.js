import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Import all action -creator functions
import * as actions from '../actions';

import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';

import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '40px',
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
    }

    renderTable() {
        let id = 0;
        const rows = this.props.celebratingList.map((person) => {
            return {
                id: ++id,
                fullName: person.fullName,
                email: person.email,
                phone: person.phone,
            };
        });
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
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
