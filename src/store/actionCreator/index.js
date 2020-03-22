// export default
import {getLocalCity} from '../../utils/bdMap'
export const getLocalCityAction = () => {
    return async (dispatch) => {
        const res = await getLocalCity()
        dispatch({
            type:'initCity',
            value:res
        })
    }
}