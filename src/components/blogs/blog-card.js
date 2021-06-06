import React ,{useState}from 'react';
import {connect} from 'react-redux';
import{DeletePost} from '../../redux/posts/postsAction';
import {CreateComments,DeleteComment,UpdateComment} from "../../redux/comments/commentAction";
import EditModal from './EditModal';



 function BlogCard(props){
  const[openModal,setModal]=useState(false)
  const[data,setData]=useState({});
  const [commentArray,setArray]=useState({})
  const[edit,setEdit]=useState("")

  const closeModal=()=>{
    setModal(false);
  }

  const Edit=(post)=>{
    setModal(true);
    setData(post)
  }
  const EditComment=(e)=>{
    var ele= e.target.parentElement.parentElement.querySelector(".form-edit");
    ele.classList.toggle("d-none")
  }

  const AddComment=(e,id)=>{
    e.preventDefault();
    console.log(commentArray)
      props.createComments(props.comments,commentArray,id)
      }

      const UpdateData=(e,comment,post_id)=>{
        e.preventDefault();
        comment.message=edit;
        setEdit("")
         console.log(comment)
         props.updateComment(props.comments,comment,post_id)
      }
  const SaveComment=(e)=>{
   
    if(e.key==="Enter"){
      var comments={
        comment_id:String(Math.floor(Math.random() * 101)),
        message:e.target.value,
        PublishDate:String(new Date(Date.now()))
      }
      setArray(comments)
      e.target.value="";
    }
  }
   
  
  return(
    <div className="card" >
      <div className="card-header">
        <img src={props.card.owner.picture} alt="..." className="picture"/>
        <div className="details">
        <h5 className="owner-name">{props.card.owner.firstName+ " "+props.card.owner.lastName}</h5>
        <span className="owner-name">{props.card.owner.email}</span>
        </div>
        <div className="dropdown">
  <i className="fas fa-ellipsis-v" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i> 
  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" onClick={()=>Edit(props.card)}>Edit</a>
    <a className="dropdown-item" onClick={()=>props.deletePosts(props.posts,props.card)}>Delete</a>
  </div>
</div>
      </div>
  <img src={props.card.image} className="card-image" alt="...."/>
  <div className="card-body">
    {props.card.tags.map(i=>
      <span className="badge badge-info mr-1 mb-3 p-1" key={Math.random()}>{i}</span>
      )}
    <p className="card-text">{props.card.text}</p>
    <div className="icons">
    <i className="fas fa-heart"><span className="likes"> {props.card.likes} likes</span></i>
        </div>
        <div className="comments">
          <form onSubmit={(e)=> AddComment(e,props.card.id)}>
          <input className="form-control  mt-2 pb-2" placeholder="enter comment"   onKeyPress={(e)=>SaveComment(e)}/>
        </form>
        <div className="comment">
        {
props.comments.map(i=>{
  if(i.post_id===props.card.id){
    return(
      <ul className="comment-ul">
        {
          i.commentArray && i.commentArray.map(item=>
          <li className="comment-li">
            <div className="comment-owner">
              <h5>R</h5>
            </div>
            <div className="comment-message">
            {item.message}
            <div className="links">
            <a className="item" onClick={(e)=>EditComment(e)}>Edit</a>
            <a className="item" onClick={()=>props.deleteComments(props.comments,item,i.post_id)} >Delete</a>
            </div>
            <div className="form-edit  d-none">
              <form onSubmit={(e)=>UpdateData(e,item,i.post_id)}>
            <input className="form-control edit-input  mt-2 pb-2" placeholder="enter comment" value={edit}  onChange={(e)=>setEdit(e.target.value)}/>
            <button className="btn comment-button" type="submit">Post</button>

            </form>
            </div>
            </div>
           
            </li>
          )
        }
      </ul>
    )
  }
}
  )
          }
              

        </div>
        </div>
  </div>
  {openModal && <EditModal isOpen={openModal} close={closeModal} data={data} />}
</div>

  )
} 

const mapStateToProps = state => {
  return {
    posts:state.posts.posts,
    comments: state.comment.comments
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deletePosts:(posts,post)=>dispatch(DeletePost(posts,post)),
    createComments:(comments,comment,id) => dispatch(CreateComments(comments,comment,id)),
    deleteComments:(comments,comment,post_id)=>dispatch(DeleteComment(comments,comment,post_id)),
    updateComment:(comments,comment,post_id)=>dispatch(UpdateComment(comments,comment,post_id))
  }
}


export default connect(mapStateToProps,
  mapDispatchToProps
)(BlogCard)