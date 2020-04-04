import React from 'react';
import indexCss from './index.module.scss'
import {baseURL} from '../../utils/axios'
const Index = (props) => <div>
    {props.data&&<div className={indexCss.list_item} >
        <div className={indexCss.house_img}>
            <img src={baseURL + props.data.houseImg} alt="" />
        </div>
        <div className={indexCss.house_desc}>
            <div className={indexCss.title}>{props.data.title}</div>
            <div className={indexCss.introduce}>{props.data.desc}</div>
            <div className={indexCss.tags}>
                {props.data.tags.map(vv => <span key={vv}>{vv}</span>)}
            </div>
            <div className={indexCss.price}>
                <span>{props.data.price}</span>元/月
        </div>
        </div>
    </div>}
</div>


// class Index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() {
//         console.log(this.props.data)
//         return ( <div></div> );
//     }
// }

export default Index;