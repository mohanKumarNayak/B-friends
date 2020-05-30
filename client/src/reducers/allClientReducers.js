const intialState = []

const allClientReducers = (state=intialState,action) => {
    switch(action.type){
        case  'ADD_ALL_CLIENTS' : {
            return [...action.payload]
        }
        default : {
            return [...state]
        }
    }
}

export default allClientReducers