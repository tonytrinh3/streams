import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'; 
import Modal from '../Modal';
import history from "../../history"
import {fetchStream, deleteStream} from '../../actions/index';

import { render } from '@testing-library/react';


//les 281 - changing it into class bc you are fetching data 
class StreamDelete extends React.Component {


    componentDidMount(){
        //this.props comes from <Route />
        //bc you as passing this StreamDelete as a component in <Route /> in app.js file
        console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    };


    // React Frament doesnt produce any thing on screen but works as div
    renderActions(){

        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                {/* on onClick - you want to wait to run the function- not run the function when render */}
                <button onClick ={()=>this.props.deleteStream(id)}className="ui button negative ">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )   
    };

    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream?"
        } else {
            return `Are you sure you want to delete the stream -with title: ${this.props.stream.title}?`
        }
    };

    render(){
        return (
        <Modal title = 'Delete Stream'
        content = {this.renderContent()}
        actions={this.renderActions()}
        onDismiss={()=>history.push("/")}
        />
        );
    };


};

//ownProps is just this.props that you get from <Router/> from react router
const mapStateToProps = (state,ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps,{fetchStream, deleteStream})(StreamDelete);