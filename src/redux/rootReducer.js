import {combineReducers} from 'redux';
import { postReducer } from './posts/postsReducers';
import {commentReducer} from './comments/commentReducer'

 const rootReducer=combineReducers({
    posts:postReducer,
    comment:commentReducer
})

export default rootReducer