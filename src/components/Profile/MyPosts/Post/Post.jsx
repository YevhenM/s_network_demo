import React from 'react';
import s from './Post.module.css';


const Post = (props) => {
            let delPost = (a) =>{
                console.log('delpost', a)
                props.onDeletePost(a)
            }
  return (

      
            <div className={s.item}>
              
              <img src={props.userPhoto} alt="userpic" className={s.userpic}/>
              <div className={s.textBlock}>{props.text}
                    <div className={s.likes}>♥ {props.likes} ✉︎ {props.comments}</div>
                    <div  className={s.deleteButton}><span onClick={()=>{delPost(props.id)} }> Delete? </span>✘</div>
              </div>
              
              
            </div>

 
  
    );    
}

export default Post;