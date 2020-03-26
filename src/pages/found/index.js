import React, { Component } from 'react';
import {connect} from "react-redux"
import {changeText} from '../../store/actionCreator'
class Index extends Component {
    handleClick = () => {
        this.props.change()
    }
    render() { 
    return ( <h1 onClick={this.handleClick}>{this.props.text}</h1> );
    }
}
 const mapStateToProps = (state) => {
     return {
         text:state.test.name
     }
 }
 const mapDispatchToProps = (dispatch) => {
     return {
         change(){
             dispatch(changeText())
         }
     }
 }
export default connect(mapStateToProps,mapDispatchToProps)(Index);

 
