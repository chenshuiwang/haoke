import React, { Component } from 'react';
import {connect} from "react-redux"
import indexCss from './index.module.scss'
// class Index extends Component {
//     render() { 
//     return ( <h1>{this.props.text}</h1> );
//     }
// }
//  const mapStateToProps = (state) => {
//      return {
//          text:state.test.name
//      }
//  }
// export default connect(mapStateToProps)(Index);
class Index extends Component {

    render() { 
        return ( <div className={indexCss.news}>
            <div className={indexCss.mask}>
                暂时没有这个功能哦。。。
            </div>
        </div> );
    }
}
export default connect()(Index);