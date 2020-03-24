// export default
import { getLocalCity, getPoint } from '../../utils/bdMap'
export const getLocalCityAction = () => {
    return async (dispatch) => {
        const res = await getLocalCity()
        dispatch({
            type: 'initCity',
            value: res
        })
    }
}
export const getPointAction = (city, address) => {
    return async (dispatch) => {
        const point = await getPoint({city})
        const res = {
            name: city,
            point
        }
        dispatch({
            type: "initCity",
            value: res
        })
    }
}