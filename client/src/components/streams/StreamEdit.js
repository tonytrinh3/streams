import React from 'react';
import {connect} from 'react-redux';

//les 263 
//props are coming from react router dom
//you get access to these props bc in app.js, streamEdit is passed as a component in Router
//<Route path="/streams/edit/:id" exact component = {StreamEdit}/>
//since you are using react router dom within <Route/>, react router dom is going to add a bunch of props/properties into StreamEdit
const StreamEdit = (props) => {
    //console.log(props);
    return <div>StreamEdit</div>
};

//this function that you put into the connect has the newState as well as ownProps which is the props that this component has 
//doesn't really matter what you call the first and second argument that goes into the function, they are always state and props
const mapStateToProps = (state, ownProps) =>{
    console.log(ownProps);
    return {stream: null }
}

export default connect(mapStateToProps,null)(StreamEdit);