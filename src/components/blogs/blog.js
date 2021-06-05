import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getPosts} from '../../redux/posts/postsAction';
import {getComments} from "../../redux/comments/commentAction";

import BlogModal from '../Modal';
import BlogCard from './blog-card';




 function Blog({posts,Fetchdata,getComment}) {  
  const[openModal,setModal]=useState(false)


  const closeModal=()=>{
    setModal(false);
  }

  useEffect(() => {
    Fetchdata();
    getComment();

},[])

return(
  <section className="blog">
  <main>
<div className="container text-right">
<button className="btn btn-secondary mb-5 " type="button" onClick={()=>setModal(true)}><i className="fas fa-plus"></i></button>
  <div className="row row-cols-1  row-cols-md-2 row-cols-lg-3 text-left">
  { 
  posts.map(i=> 
      <div className="col" key={i.id}>
        <BlogCard  card={i} />
        </div>    
      )}
  </div>
  </div>   
  {openModal?<BlogModal isOpen={openModal} close={closeModal} 
  />:null}
  </main>  
      <footer>All right is reserved</footer>
      </section>
      )}
const mapStateToProps = state => {
  return {
    posts: state.posts.posts,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    Fetchdata:()=>dispatch(getPosts()),
    getComment:()=>dispatch(getComments()),

    
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)