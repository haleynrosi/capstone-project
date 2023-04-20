/**
 * This is a reducer function that handles state updates for a userID in a Redux store.
 * @param state - The current state of the application. If it is undefined, it will be initialized with
 * an object containing a null userID property.
 * @param action - The `action` parameter is an object that describes the change that needs to be made
 * to the state. It has a `type` property that indicates the type of action being performed, and a
 * `data` property that contains any additional data needed to perform the action. The `reducer`
 * function
 * @returns The reducer function is being returned as the default export of the module. When called
 * with a state and an action, it will return a new state object based on the action type and data. If
 * the state argument is undefined, it will initialize it with an object containing a null userID
 * property.
 */

const reducer = (state, action) => {


    if(state === undefined){
        state = {
            userID: null
        }
    }


    switch(action.type){

        case "ALTERID": 
            return {
                ...state, 
                userID: action.data
            }


        default: 
            return state;
    }
}

export default reducer;