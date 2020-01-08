import _ from 'lodash';

import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "../actions/types";

//redux requirement of always returning a new object 
export default (state = {}, action ) =>{
    switch (action.type){

        //same as below
        // const newState = {...state};
        // newState[action.payload.id] = action.payload; //this line specifically adds the new line to the object
        //{action.payload.id : action.payload} in newState
        // return newState //returns all of the newState object

        //les 249
        //taking the payload - which is an array full of objects - using the object's id as the key id for this super object which will be the newstate
        
        case FETCH_STREAMS:
        //return {id:{id:action.payload}} repeat
            return {...state, ..._.mapKeys(action.payload, "id")};
        case FETCH_STREAM:
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
        //action.payload is already id 
        //lodash returns newState object , copies original state without id we want to take out
            return _.omit(state , action.payload);

        
        default:
            return state;
    }
}