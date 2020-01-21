import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchStreams } from '../../actions';

//les 250 - change to class bc we want to call our action component in componentDidMount
class StreamList extends React.Component{

    //so you need this to load the fetchStreams from the api server 
    //just like calling an api from 3rd party 
    //but why props...
    componentDidMount(){
        this.props.fetchStreams();
        console.log(this.props.fetchStreams());
    }
    //les 242
    //i thinnk json server automatically creates the id when you create a new title/description entry or axios but i doubt axios


    renderAdmin(stream){
        if (stream.userId === this.props.currentUserId){
            return(
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`}className="ui button primary">Edit</Link>
                    {/* les 280 */}
                    <Link to = {`/streams/delete/${stream.id}`}className="ui button negative">
                        Delete
                    </Link>
                </div>
            ) 
        }
    }



    renderList(){
        return this.props.streams.map(stream =>{
            return (
                <div className="item" key = {stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                    {/* les 284 */}
                    <Link to ={`/streams/${stream.id}`} className="header">
                        {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    };

    //les 254 for explanation
    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div style = {{ textAlign: 'right'}}>
                    <Link to = "/streams/new" className = "ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }


    //so when you want to return a method - you have to call this.renderList in order for the method point back to this class instead of react.component
    //you also have to put in a div
    //you also have to put () after the method in order to run the function when the page renders
    render(){

        return (
            <div>
            <h2>Streams </h2>
                <div className="ui celled list">{this.renderList()}</div>
                <div>{this.renderCreate()}</div>
            </div>


         
            
        )
    }
};

//make sure our list of streams available as props inside our component 
const mapStateToProps = (state) =>{
    //les 251
    //Object.values is built in javascript function
    //takes object as an argument
    //all of that different values inside of that object are going to be pulled out and put into an array
    //const something = {1: "some", 2: "hi"};
    //Object.values(something) which equals ["some", "hi"]

    //so now you put {action.payload.id: {action.payload.id : action.payload} } into Object.values, you now get [{action.payload.id: action.payload}]
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

//connecting the action creator in this class in order to pass some info to the prop into the fetchStream to get to the reducer to update state
//connecting mapStateToProps allow you get state.streams from the connect function and fetchStream action into {streams: } props
//connect connects the action to the store of reducers 
//mapStateToProps is what you want to get from the store - fetchStreams is what you ordered 

//so what you get from the store of reducer after passing action fetchStream is what is returned from the reducer 
// case FETCH_STREAMS:
//     //return {id:{id:action.payload}} repeat
//     return newState = {...state, ..._.mapKeys(action.payload, "id")}; //this is given return to mapStateToProps - a new state
//then your state goes to props to be used in this component

export default connect(mapStateToProps, { fetchStreams })(StreamList);