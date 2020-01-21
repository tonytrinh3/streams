import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions/index';

class StreamShow extends React.Component{
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
        
    }

    renderContent(){
        if(!this.props.stream){
            return "Loading..."
        }else{
            const {title, description} = this.props.stream;
            return (
                <div>
                <h3>{title}</h3>
                <p>{description}</p>
                </div>
            )
        }
    }


    render(){


        return(
            <div>
             {this.renderContent()}
            </div>
        )
    }


};

const mapStateToProps = (state,ownProps)=>{
    return {stream: state.streams[ownProps.match.params.id]}
}


export default connect(mapStateToProps,{fetchStream})(StreamShow);