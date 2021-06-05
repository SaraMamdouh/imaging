import {FETCH_DATA_SUCCESS,DELETE_POST,CREATE_POST,UPDATE_POST} from './postsType'
import {db} from '../../config';


export const getPosts=()=>{
  return(dispatch)=>{
  db.ref("posts").once("value", snapshot => {
    let allPosts = [];
    snapshot.forEach(snap => {
      var post=snap.val();
      var key=snap.key;
      allPosts.push({...post,key:key});
    });
      dispatch(FetchData(allPosts))
 });
  }  
}


  export const CreatePosts =(post)=>{
    db.ref("posts").push(post);
    return(dispatch)=>{
      dispatch(CreatePost(post))
}

  }

  export const DeletePost = (posts,post)=>{
    const removed=posts.filter(i=>i!==post)
    db.ref('posts/').set(removed);
    return (dispatch)=>{
        dispatch(Deletepost(removed));
    }
  }
  export const UpdatePost = (posts,post)=>{
    const updatedpost=posts.map(i=>{
      if(i.id === post.id ) {
          return post
       }
       else{
           return i
       }
      }
      )
     db.ref('posts').set(updatedpost);
    return (dispatch)=>{
        dispatch(updatePost(updatedpost));
    }
  }


export const FetchData =(post)=>{
    return{
    type:FETCH_DATA_SUCCESS,
    payload:post,
}
}
export const CreatePost=(post)=>{
  return{
    type:CREATE_POST,
    payload:post
  }
}
export const Deletepost =(post)=>{
  return {
    type:DELETE_POST,
    payload:post
  }
}

export const updatePost=(post)=>{
  return {
    type:UPDATE_POST,
    payload:post
  }
}







   