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
        // this.caldate = '21082020';
        this.gotoDate = this.gotoDate.bind(this);
        // this.state = {
        //     curdate: moment(),
        // };
    }

    componentDidMount() {
        // this.setState({ curdate: this.props.date || moment() });
    }

    gotoDate() {
        // console.log(this.props.curdate);
        this.props.changeDate('next', this.props.curdate.format('DDMMYYYY'));
    }

    render() {
        // let curdate = null;
        // if (this.props.curdate) curdate = this.props.curdate.format('DD/MM/YYYY');
        // else curdate = moment().format('DD/MM/YYYY');
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
                            {this.props.curdate.format('dddd DD/MM/YYYY')}
                        </Card>
                    </Col>
                </Row>
                <Button node="button" waves="light" style={{ marginTop: '10px' }} onClick={this.gotoDate}>
                    Next day
                </Button>
            </div>
        );
    }
}

//href={this.props.changeDate('next', this.state.curdate.format('DDMMYYYY'))}
function mapStateToProps(state) {
    let curdate;
    if (!state.date) {
        curdate = moment();
    } else {
        curdate = moment(state.date, 'DDMMYYYY');
    }

    return { curdate: curdate };
}

// With the statement below, actions will be passed to App as props
export default connect(mapStateToProps, actions)(Home);
// export default Home;
