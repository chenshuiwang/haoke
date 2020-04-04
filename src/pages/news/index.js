import React, { Component } from 'react';
import {connect} from "react-redux"
class Index extends Component {
    render() { 
    return ( <h1>{this.props.text}</h1> );
    }
}
 const mapStateToProps = (state) => {
     return {
         text:state.test.name
     }
 }
export default connect(mapStateToProps)(Index);
// class Index extends Component {
//     render() { 
//         return ( <h1>资讯</h1> );
//     }
// }
// export default connect()(Index);