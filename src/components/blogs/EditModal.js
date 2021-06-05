import React,{useState} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {UpdatePost} from '../../redux/posts/postsAction'



function EditModal({isOpen,close,updatepost,data,posts}){ 
  const [tagArray,setTagArray]=useState([]);

  const AddTags =(e)=>{
   if(e.key==="Enter") {
     var v=e.target.value;
     e.preventDefault();
    setTagArray(prev=>[...prev,v])
    e.target.value="";
   }

    }
  

  const updatePost=(e)=>{
    e.preventDefault();
    data={
        ...data,
        tags:tagArray
    }
    console.log(data)
    updatepost(posts,data)
   close();
}

  const SaveData =(e)=>{
    data={
        ...data,
        [e.target.name]:e.target.value
    }
  }

 
    return (
        <Modal isOpen={isOpen} onRequestClose={close}> 
        <div className="modal-header">
          <h2>Edit Post</h2>
          <i className="fas fa-times fa-x" onClick={close}></i>
          </div>
          <div className="modal-body">
          <form onSubmit={(e)=>updatePost(e)}>
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
  <button type="submit" className="btn btn-primary">Save</button>
  </div>
</form>
          </div>

          
        </Modal>
    );
}

const mapStateToProps = state => {
  return {
    posts:state.posts.posts,
  }
}
  const mapDispatchToProps = dispatch => {
    return {
        updatepost:(posts,post)=>dispatch(UpdatePost(posts,post))
    }
  }
  
  
  export default connect(mapStateToProps,
    mapDispatchToProps
  )(EditModal)