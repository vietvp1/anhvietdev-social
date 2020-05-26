import React, { useEffect } from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// some component
import AllComponents from './component/AllComponents'
import './App.css';
import './css/typography.css';
import './css/responsive.css';
import './css/style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer/>
      <div id="loading">
        <div id="loading-center">
        </div>
      </div>
      <div className="wrapper">
        <AllComponents/>
      </div>
    </Provider>
  );
};

export default App;
