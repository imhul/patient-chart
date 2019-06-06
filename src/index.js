// Core
import { hot, AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';

// Components
import PatientChart from './components/PatientChart';

// Styles
import './scss/index.scss';

function renderApp() {
    const App = () => (
        <AppContainer className="container">
            <Provider store={ store }>
                <PatientChart />
            </Provider>
        </AppContainer>
    );
    ReactDOM.render(<App />, document.getElementById('PatientChart'))
};

renderApp();

// Hot Reloading
hot(module)(renderApp);