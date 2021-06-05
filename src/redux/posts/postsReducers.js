import { FETCH_DATA_SUCCESS,DELETE_POST, CREATE_POST,UPDATE_POST} from './postsType'

const initialState={
    posts:[]
}

export const postReducer=(state=initialState,action)=>{
switch (action.type){
    case FETCH_DATA_SUCCESS:
        return{
            ...state,
            posts:action.payload,
        }

        case CREATE_POST:
            const addpost=[...state.posts,action.payload];
            console.log(addpost)
            return{
                posts:addpost
            }
    
        case DELETE_POST:
            return{
                posts:action.payload
            }
            case UPDATE_POST:
          
                return{
                    posts:action.payload
                    
                }
        default:
            return state;
}
}