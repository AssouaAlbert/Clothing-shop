import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; //This is a compopnent Give access to the store (where state is kept)
import './index.css';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
//Import the store
import {store,persistor} from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    {/**
     * The persistGate if remove will work
     * 1) It is used to receive the store
     * 2) Fire actions that will re-hydrate the state when ever the application refreshes
     */}
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

