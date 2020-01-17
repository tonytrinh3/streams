import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
//les 269 - we added editStream
import {fetchStream, editStream} from '../../actions/index';
//les 269
import StreamForm from './StreamForm';

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
        
    };

    //les 269
    //going to be used for our callback for our streamform
    //this is here to have the submit button work...
    onSubmit = (formValues2)=>{
        this.props.editStream(this.props.match.params.id, formValues2)
    }



    //this.props.stream is the state within this component
    //so if the state hasn't been fetched yet from the api server, return loading then take time to fetch and rerender the page 
    render(){
        if (!this.props.stream){
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    {/* initialValues is a specific prop from React Form - so when you pass something through initialValues in StreamForm, since StreamForm is wrapped around reduxForm, the intitial values - which have names, title and desription, will be filled in into the <Field/> */}
                      <StreamForm 
                    //   initialValues = {{title: "awefaewf", description: "aewfawef"}}
                    // initialValues = {this.props.stream} - so you only want title and description but this also gives you id and userid
                    initialValues = {_.pick(this.props.stream, "title", "description")}
                      onSubmit2 = {this.onSubmit}/>
                </div>
            )
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
export default connect(mapStateToProps,{fetchStream, editStream })(StreamEdit);


// import React from 'react';
// import {connect} from 'react-redux';
// import {fetchStream} from '../../actions/index';
// //les 269
// import StreamForm from './StreamForm';

// //les 263 
// //props are coming from react router dom
// //you get access to these props bc in app.js, streamEdit is passed as a component in Router
// //<Route path="/streams/edit/:id" exact component = {StreamEdit}/>
// //since you are using react router dom within <Route/>, react router dom is going to add a bunch of props/properties into StreamEdit

// //les 266
// //using fetchstream action to fetch data - so you need componentDidMount to get api data 
// class StreamEdit extends React.Component{

//     componentDidMount(){
//         this.props.fetchStream(this.props.match.params.id);
//     };

//     //les 269
//     onSubmit = (formValues)=>{
//         console.log(formValues);
//     }



//     //this.props.stream is the state within this component
//     //so if the state hasn't been fetched yet from the api server, return loading then take time to fetch and rerender the page 
//     render(){
//         if (!this.props.stream){
//             return <div>Loading...</div>
//         } else {
//             return <div>{this.props.stream.title}</div>
//         }
//     }
// }




// //this function that you put into the connect has the newState as well as ownProps which is the props that this component has 
// //doesn't really matter what you call the first and second argument that goes into the function, they are always state and props
// //ownProps is the same as props, which you get from react router dom

// //interesting, state is literally all the state that you made in the reducer in index.js
// const mapStateToProps = (state, ownProps) =>{
//     console.log(ownProps);
//     console.log(state);
//     return {stream: state.streams[ownProps.match.params.id]}
// }

// //mapstatetoprops is called before you call the class itself, so that is why you can use mapStateToProps and reference it in your class
// //connect is a function that you pass mapStateToProps function that connect functions already have state and ownProps ready based on what you ahve in the store state and ownProps based on react router dom 
// //if you don't have react router dom, then no props?
// // les 266 - once you connect the action through the connect function, you can then use the action as a props? - yes bc remember you are calling the action before you are running your class
// export default connect(mapStateToProps,{fetchStream})(StreamEdit);