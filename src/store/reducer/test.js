const defaultState = {
    name:'213'
}
export default (state = defaultState,action) => {
    let newState = JSON.parse(JSON.stringify(state))
    if(action.type === "change"){
        newState.name = action.name
        return newState
    }
    return state
}