import { GET_RECIPIENTS } from '../actions/types';

export default function (state = '', action) {
    switch (action.type) {
        case GET_RECIPIENTS:
            console.log('reducer:' + action.payload);

            return action.payload;
        default:
            return state;
    }
}
