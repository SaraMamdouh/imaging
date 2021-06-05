import { FETCH_COMMENT_SUCCESS,DELETE_COMMENT, CREATE_COMMENT,UPDATE_COMMENT} from './commentType'

const initialState={
    comments:[
    ]
}             
               
                

export const commentReducer=(state=initialState,action)=>{
switch (action.type){
    case FETCH_COMMENT_SUCCESS:
        return{
            ...state,
            comments:action.payload,
        }

        case CREATE_COMMENT:
            return{
                comments:action.payload
            }
    
        case DELETE_COMMENT:
             return{
                comments:action.payload
            }
            case UPDATE_COMMENT:
                return{
                    comments:action.payload
                }
        default:
            return state;
}
}