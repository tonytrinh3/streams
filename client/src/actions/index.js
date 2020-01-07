import streams from "../apis/streams";
import {SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM } from './types';
import { getFormInitialValues } from "redux-form";


export const signIn = (userId) =>{
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () =>{
    return {
        type: SIGN_OUT
    };
};

//streams is equal to below
// export default axios.create({
//     baseURL: "http://localhost:3001"
// })
//you are able to do use post method from axios, called from streams.js
//you are stating the url in the axios - passing through formValues

//les 243 - dispatch? you passing dispatch from redux - dispatch also carries the load to the store
export const createStream = (formValues) =>{
    return async (dispatch) => {
        //you get the data from response due to axios
        const response = await streams.post('/streams', formValues);

        dispatch({ type: CREATE_STREAM, payload: response.data})
    };

};

//les 244
export const fetchStreams = () =>{
    return async (dispatch) =>{
        const response = await streams.get('/streams');

        dispatch({type: FETCH_STREAMS, payload: response.data})
    }
};

//id of stream
export const fetchStream = (id) =>{
    return async (dispatch) =>{

        const response = await streams.get(`/streams/${id}`);

        dispatch({type: FETCH_STREAM, payload: response.data})
    }
};

//id of the stream and the formValues of that stream 
export const editStream = (id, formValues) =>{
    return async (dispatch) =>{
        const response = await streams.put(`/streams/${id}`, formValues);

        dispatch({ type: EDIT_STREAM, payload: response.data});
    }
};

export const deleteStream = (id) =>{
    return async (dispatch) =>{
        await streams.delete(`/streams/${id}`);

        dispatch({type: DELETE_STREAM, payload: id});
    }
};


// example for key interpolation from es2015
// obj= {};
// obj[1] = "something";
// which then givess
// obj = {1:"something"}