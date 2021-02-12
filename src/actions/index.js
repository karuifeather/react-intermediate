import stream from '../apis/stream';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const { data } = await stream.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: data });
  history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
  const { data } = await stream.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: data });
};

export const fetchStream = (id) => async (dispatch) => {
  const { data } = await stream.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const { data } = await stream.patch(`streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: data });
  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await stream.delete(`streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
