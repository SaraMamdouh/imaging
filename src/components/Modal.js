import React,{useState} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {CreatePosts} from '../redux/posts/postsAction';



function BlogModal({isOpen,close,createPosts}){ 
  const[newPost,setPost]=useState({})
  const [tagArray,setTagArray]=useState([]);
  var post={};

  const AddTags =(e)=>{
   if(e.key==="Enter") {
     var v=e.target.value;
     e.preventDefault();
    setTagArray(prev=>[...prev,v])
    e.target.value="";
   }

    }
  

  const AddPost= (e)=>{
    e.preventDefault();
    post={
      ...newPost,
      id:String(Math.floor(Math.random() * 101)),
      publishDate:String(new Date(Date.now())),
      tags:tagArray,
      likes:0
    }
    createPosts(post)
    close();
}

  const SaveData =(e,owner)=>{
    if(owner){
      setPost(prev=>{
        return{
          ...prev,
          owner:{
            ...prev.owner,
          [e.target.name]: e.target.value,
          email:"smamdouh@hotmail.com",
          id:String(Math.random()),
        }
      }
      })
    }
    else{
    setPost(prev=>{
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    });
    }
  }

 
    return (
        <Modal isOpen={isOpen} onRequestClose={close}> 
        <div className="modal-header">
          <h2>Add Post</h2>
          <i className="fas fa-times fa-x" onClick={close}></i>
          </div>
          <div className="modal-body">
          <form onSubmit={(e)=>AddPost(e)}>
  <div className="form-group name">
    <label htmlFor="exampleFormControlInput1" className="publisher-label">Publisher Name</label>
    <input type="text" className="form-control first" id="exampleFormControlInput1" placeholder="Enter Your First Name" name="firstName" onChange={(e,owner)=>SaveData(e,true)}/>
    <input type="text" className="form-control last" id="exampleFormControlInput2" placeholder="Enter Your Second Name" name="lastName" onChange={(e,owner)=>SaveData(e,true)}/>
  </div>
  <div className="form-group ">
    <label htmlFor="exampleFormControlInput1" className="publisher-label">tags</label>
  <input type="text" className="form-control " id="exampleFormControlInput3" placeholder="Enter tags"  name="tags" onKeyPress={(e)=>AddTags(e)}/>
    {tagArray.map(i=>
    <span className="badge badge-secondary m-1 mt-3 tags">{i}</span>
    )}
  </div>
  <div className="form-group ">
    <label htmlFor="exampleFormControlInput1" className="publisher-label">Provided link</label>
    <input type="text" className="form-control " id="exampleFormControlInput3" placeholder="Enter link" name="link"  onChange={(e,owner)=>SaveData(e,false)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Post Text</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="text" onChange={(e,owner)=>SaveData(e,false)}></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlFile1">image Url</label>
    <input type="text" className="form-control" id="exampleFormControlFile1" name="image" onChange={(e,owner)=>SaveData(e,false)}/>
  </div>
  <div className="button text-right">
  <button type="submit" className="btn btn-primary" >Save</button>
  </div>
</form>
          </div>

          
        </Modal>
    );
}

  
  const mapDispatchToProps = dispatch => {
    return {
      createPosts: (post) => dispatch(CreatePosts(post))
    }
  }
  
  
  export default connect(null,
    mapDispatchToProps
  )(BlogModal)