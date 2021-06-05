import {FETCH_COMMENT_SUCCESS,DELETE_COMMENT,CREATE_COMMENT,UPDATE_COMMENT} from './commentType'
import {db} from '../../config';


export const getComments=()=>{
  return(dispatch)=>{
  db.ref("comments").once("value", snapshot => {
    let allComments = [];
    snapshot.forEach(snap => {
      var comment=snap.val();
      var key=snap.key;
      allComments.push({...comment,key:key});
    });
    dispatch(FetchCommentData(allComments))
  
});
  }
}


  export const CreateComments =(currentComments,comment,id)=>{
       const newComment=currentComments.slice();
            var alreadyexists=false;
            newComment.forEach(i=>{
                if(i.post_id===id){
                    alreadyexists=true;
                        i.commentArray.push(comment)
                        console.log(i)
                }
                    })
    if(!alreadyexists){
        newComment.push({post_id:id,
          commentArray:[comment]})
    }
    db.ref("comments").set(newComment);
    return(dispatch)=>{
      dispatch(CreateComment(newComment))
}

  }

  export const DeleteComment = (comments,comment,post_id)=>{
    const removed=comments.slice();
    removed.forEach(i=>{
        if(i.post_id===post_id){
            if(i.commentArray.length===1){
                i.commentArray=[]
            }
        else{
       i.commentArray=i.commentArray.filter(i=>i!==comment)
        }
        }
    })
    db.ref("comments").set(removed);
    return (dispatch)=>{
        dispatch(deleteComment(removed));
    }
  }
  export const UpdateComment = (comments,comment,post_id)=>{
   const updated=comments.slice();
   updated.forEach(i=>{
     if(i.post_id===post_id){
       i.commentArray.forEach(item=>{
         if(item.comment_id===comment.comment_id){
              item.message=comment.message
         }
       })
     }
   })
   db.ref("comments").set(updated);
   return (dispatch)=>{
        dispatch(updateComment(updated));
    }
  }


export const FetchCommentData =(comment)=>{
    return{
    type:FETCH_COMMENT_SUCCESS,
    payload:comment
}
}
export const CreateComment=(comment)=>{
  return{
    type:CREATE_COMMENT,
    payload:comment
  }
}
export const deleteComment =(comment)=>{
  return {
    type:DELETE_COMMENT,
    payload:comment
}
}

export const updateComment=(comment)=>{
  return {
    type:UPDATE_COMMENT,
    payload:comment
  }
}







   