import React, { Component } from 'react';

// To connect to Redux
import { connect } from 'react-redux';
// Import all action -creator functions
import * as actions from '../actions';

import moment from 'moment';

import { Button, Row, Col, Card, Icon } from 'react-materialize';

moment.locale('el');

class Home extends Component {
    constructor(props) {
        super(props);

        this.gotoDate = this.gotoDate.bind(this);
    }

    componentDidMount() {
        this.props.changeDate('today');
    }

    gotoDate(where) {
        this.props.changeDate(where, this.props.curdayinfo.datestr);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col m={6} s={12}>
                        <Card
                            className="blue-grey darken-1"
                            closeIcon={<Icon>close</Icon>}
                            revealIcon={<Icon>more_vert</Icon>}
                            textClassName="white-text"
                            title="Ημερολόγιο"
                        >
                            {JSON.stringify(this.props.curdayinfo)}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col m={3} s={6}>
                        <Button
                            node="button"
                            waves="light"
                            style={{ marginTop: '10px' }}
                            onClick={() => this.gotoDate('prevDay')}
                        >
                            Prev day
                            <Icon left>arrow_back</Icon>
                        </Button>
                    </Col>
                    <Col m={3} s={6}>
                        <Button
                            node="button"
                            waves="light"
                            style={{ marginTop: '10px' }}
                            onClick={() => this.gotoDate('today')}
                        >
                            Today
                            <Icon left>arrow_downward</Icon>
                        </Button>
                    </Col>{' '}
                    <Col m={3} s={6}>
                        <Button
                            node="button"
                            waves="light"
                            style={{ marginTop: '10px' }}
                            onClick={() => this.gotoDate('nextDay')}
                        >
                            Next day
                            <Icon right>arrow_forward</Icon>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let curdayinfo = {};
    if (!state.date) {
        curdayinfo.datestr = moment().format('DDMMYYYY');
        // curdayinfo = '';
    } else {
        // curdayinfo = moment(state.date, 'DDMMYYYY');
        curdayinfo = state.date;
    }
    // console.log(curdayinfo);
    return { curdayinfo: curdayinfo };
}

// With the statement below, actions will be passed to App as props
export default connect(mapStateToProps, actions)(Home);
// export default Home;
