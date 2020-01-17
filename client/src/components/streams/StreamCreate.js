import React from 'react';
import { connect } from 'react-redux';
import {createStream } from "../../actions"
import StreamForm from './StreamForm';


class StreamCreate extends React.Component{


    //les 268 - now you are only passing the form values through the stream form to be used... 
    //when you press onsubmit on the streamform... something is created with formvalues info


    //the name formValues doesn't matter
    //the function name onSubmit doesn't matter as well...
    onSubmit = (formValues) =>{


      
        //formValues takes title and description
        console.log(formValues);

        //les 242 - you are passing formValues (title and description) through to the action creator 
        //you are using this.props bc you have wired the action creator into the react 
        this.props.createStream(formValues);

    };


    render(){

        return(
           <div>
               <h3>Create a Stream</h3>
               <StreamForm onSubmit2 = {this.onSubmit}/>
            </div>
        )
    }
};



//remember createStream is an action creator 
export default connect(null, { createStream })(StreamCreate);



//everything before les 267

// import React from 'react';
// //import {Field, reduxForm} from 'redux-form';
// import { connect } from 'react-redux';
// import {createStream } from "../../actions"
// import StreamForm from './StreamForm';


// class StreamCreate extends React.Component{
//     renderError(formProps){
//         if (formProps.meta.touched && formProps.meta.error){
//             return (
//                 <div className="ui error message">
//                     <div className="header">{formProps.meta.error}</div>
//                 </div>
//             )
//         }
//     }


//     //i like to think formprops are already included in Field of redux-form bc they are linked to <Field/>
//     //something about formprops makes the data of form more controlled
//     //les 236 - need to make renderInput into an arrow function now since you are calling another method in this method
//     //bc we are using class - "this." is needed to reference the other method
//     //renderInput is a function we pass off to some component (similar to passing a function through onClick handler)
//     //so when we call renderInput - we don't know the value of "this" is until we bind this. with this.renderError - binding the method to this class rather than the method binded to React.Component
//     renderInput =(formProps)=>{
//         //i guess you don't need this.className - probably bc you aren't passing anything
//         //or you know the value of className is so you don't need this
//         //className isn't really pointing anywhere else...
//         const className = `field ${formProps.meta.error && formProps.meta.touched ? `error`: ``}`;


//         //everytime you type - formProps gets each words 
//         console.log(formProps);
//         //see twice bc for each Field 
//         //console.log(formProps.meta);
//         return (
//              <div className = {className}>
//                 <label>{formProps.label}</label>
//                 {/* remember {...formProps.input} will get all "on" methods */}
//                 <input 
//                     {...formProps.input}
//                     onChange = {formProps.input.onChange}
//                     value = {formProps.input.value}
//                     //you need onFocus here in order for the renderError to work with meta.touched bc you need to see if onFocus is changed over time
//                     onFocus = {formProps.input.onFocus}
//                     autoComplete = "off"
//                 />
//                 {/* lesson 236 */}
//                 {this.renderError(formProps)}
//                 {/* <div>{formProps.meta.error}</div> */}
//              </div>       
//         )

//     }
//     //this also includes all input properties 
//     //<input {...formProps.input}/>

//     //the name formValues doesn't matter
//     //the function name onSubmit doesn't matter as well...
//     onSubmit = (formValues) =>{


//         //event.preventDefault();
//         //event handler isnt need to be used
//         //formValues takes title and description
//         console.log(formValues);

//         //les 242 - you are passing formValues (title and description) through to the action creator 
//         //you are using this.props bc you have wired the action creator into the react 
//         this.props.createStream(formValues);

//     };


//     render(){
//         //this.props is apart of react tho 
//         //console.log(this.props);
//         return(
//             //this.props.handlesubmit stuff is redux-form - pass in form submit 
//             //redux-form does form submit for us 
            
//             //i guess you gotta pass a function through this.props.handleSubmit
//            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className= "ui form error" >
//                 <Field name = "title" component = {this.renderInput} label = "Enter Title" />
//                 <Field name = "description" component = {this.renderInput} label = "Enter Description" />
//                 {/* crazy thing is that button isn't linked up to any event handler */}
//                 <button className="ui button primary">Submit</button>
//            </form>
//         )
//     }
// };

// //i guess formValues name doesn't mattter here too
// const validate = (formValues) =>{
//     const errors = {};
//     //formValues is literally an empty object to start off
//     //for some reason, when you type - formValues here update automatically
//     console.log(formValues);
//     //the connection between formValues.title and formValues.description is literally the name = "title" in <Field/>
//     //you can see it in the formProps.meta
//     if(!formValues.title){
//         errors.title = "You must enter a title";
//     }

//     if(!formValues.description){
//         errors.description = "You must enter a description";
//     }
    
//     return errors;

// }


// //validate is built into reduxform
// //streamCreate is form name
// //les 242
// const formWrapped = reduxForm({
//     form: 'streamCreate',
//     validate: validate
// })(StreamCreate);

// //remember createStream is an action creator 
// export default connect(null, { createStream })(formWrapped);