// index.js: controls the data layer of the app (Redux)

import 'materialize-css/dist/css/materialize.min.css';
// relative path to node_modules dir

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// Εισαγωγή του component App που ελέγχει το UI της εφαρμογής
import App from './components/App';

// Επειδή το './reducers' είναι ένα directory, αυτό που στην ουσία
// εισάγεται είναι το index.js που υπάρχει στο directory αυτό.
import reducers from './reducers';

// Δημιουργία του store όπου θα φυλάσσεται το state της εφαρμογής
// Η createstore παίρνει ως παραμέτρους μια συνάρτηση reducer, το αρχικό state
// της εφαρμογής και το applyMiddleWare - εδώ όλα άδεια
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Ο Provider είναι το αντικείμενο που υλοποιεί την συνεργασία το react με το
// redux. Είναι στην κορυφή της ιεραρχίας των αντικειμένων της εφαρμογής.
// Όπως φαίνεται παρακάτω, το δηλώνουμε περνώντας του ως παράμετρο το store
// που δημιουργήσαμε και θέτοντας το App ως θυγατρικό του αντικείμενο
// (child component), ώστε όλα τα επόμενα components της εφαρμογής να έχουν
// πρόσβαση στο store.

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root') //App starting point is the div with id: 'root' in public/index.html
);
