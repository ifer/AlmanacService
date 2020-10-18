import { SET_RECIPIENTS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case SET_RECIPIENTS:
            // console.log('reducer:' + action.payload);

            return action.payload;
        default:
            return state;
    }
}
