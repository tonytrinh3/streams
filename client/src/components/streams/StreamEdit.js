import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions/index';

//les 263 
//props are coming from react router dom
//you get access to these props bc in app.js, streamEdit is passed as a component in Router
//<Route path="/streams/edit/:id" exact component = {StreamEdit}/>
//since you are using react router dom within <Route/>, react router dom is going to add a bunch of props/properties into StreamEdit

//les 266
//using fetchstream action to fetch data - so you need componentDidMount to get api data 
class StreamEdit extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);

    }


    //this.props.stream is the state within this component
    //so if the state hasn't been fetched yet from the api server, return loading then take time to fetch and rerender the page 
    render(){
        if (!this.props.stream){
            return <div>Loading...</div>
        } else {
            return <div>{this.props.stream.title}</div>
        }
    }
}




//this function that you put into the connect has the newState as well as ownProps which is the props that this component has 
//doesn't really matter what you call the first and second argument that goes into the function, they are always state and props
//ownProps is the same as props, which you get from react router dom

//interesting, state is literally all the state that you made in the reducer in index.js
const mapStateToProps = (state, ownProps) =>{
    console.log(ownProps);
    console.log(state);
    return {stream: state.streams[ownProps.match.params.id]}
}

//mapstatetoprops is called before you call the class itself, so that is why you can use mapStateToProps and reference it in your class
//connect is a function that you pass mapStateToProps function that connect functions already have state and ownProps ready based on what you ahve in the store state and ownProps based on react router dom 
//if you don't have react router dom, then no props?
// les 266 - once you connect the action through the connect function, you can then use the action as a props? - yes bc remember you are calling the action before you are running your class
export default connect(mapStateToProps,{fetchStream})(StreamEdit);