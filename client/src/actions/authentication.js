import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

// TODO: errors not showing in register form
export const registerUser = (user, history) => dispatch => {
  axios.post('/api/users/register', user)
      .then(res => {
        console.log('response', res);
        history.push('/login');
      })
      .catch(err => {
        console.log('error resgitering', err);
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      });
};

export const loginUser = (user) => dispatch => {
  axios.post('/api/users/login', user)
      .then(res => {
        const { token } = res.data;
        console.log(token);
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
        console.log('login errors reducer', err);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
};