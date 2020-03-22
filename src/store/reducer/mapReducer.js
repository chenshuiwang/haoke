const defaultState = {
    city:{
    }
}
export default (state = defaultState,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    if(action.type === 'initCity'){
        newState.city = action.value
        return newState
    }
    return state
}