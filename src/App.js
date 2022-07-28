import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import {ACCESSTOKEN} from './axios';
import {CheckTokenThunk} from './redux/thunk';
import {checkTokenRequest} from './redux/reducer/userSlice';
import {getUserInfo} from './redux/selector';
import {updateViewPort} from './redux/reducer/viewPortSlice';

function App() {
  const dispatch = useDispatch();
  const {isCheckToken} = useSelector(getUserInfo);
  // check valid token in localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(ACCESSTOKEN));
    if (userData) {
      dispatch(checkTokenRequest());
      const checkToken = CheckTokenThunk(userData);
      dispatch(checkToken);
    }
  }, [dispatch])

  return (
    <div className="App">

    </div>
  );
}

export default App;
