import state from './state'
export default (prevState=state,actions)=>{
    let newState=JSON.parse(JSON.stringify(prevState))



    return newState
}