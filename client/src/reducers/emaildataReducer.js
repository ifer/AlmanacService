import { SET_EMAILDATA } from '../actions/types';

export default function (state = '', action) {
    switch (action.type) {
        case SET_EMAILDATA:
            // console.log('reducer:' + action.payload);

            return action.payload;
        default:
            return state;
    }
}
