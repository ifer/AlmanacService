import { SEND_EMAIL } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case SEND_EMAIL:
            // console.log('reducer:' + action.payload);

            return action.payload;
        default:
            return state;
    }
}
