import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/configure-store';
import Routes from './routes';
import './App.scss';

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}

export default App;
