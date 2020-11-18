import { GET_VERSION } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case GET_VERSION:
            // console.log('reducer:' + action.payload);

            return action.payload;
        default:
            return state;
    }
}
