const intialState = {}

const clientReducers = (state=intialState,action) => {
    switch(action.type){
        case 'ADD_CLIENT' : {
            return {...action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default clientReducers

