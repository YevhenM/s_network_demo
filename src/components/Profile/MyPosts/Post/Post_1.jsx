import React from 'react';
import s from './Post_1.module.css';
import shadowImage from '../../../assets/images/shadow0.png'
import userPhoto from '../../../assets/images/maleUser.jpg'


const Post = (props) => {
            let delPost = (a) =>{
                console.log('delpost', a)
                props.onDeletePost(a)
            }
  return (

      
            <div className={s.item}>

                   <div className={s.superContainer}>
                       <div className={s.postContainer}>
                           <div className={s.postHead}>
                               <img src={props.userPhoto ? props.userPhoto : userPhoto} alt="userpic" className={s.userpic}/>
                               <div className={s.postUserName}>{props.userName}</div>
                               <div  className={s.deleteButton}><span onClick={()=>{delPost(props.id)} }> Delete? </span>...</div>
                           </div>
                           <div>
                               <div className={s.textBlock}>{props.text}</div>
                           </div>
                           <div className={s.postColontytul}>
                               <div className={s.likes}>♥ {props.likes} ✉︎ {props.comments}</div>
                           </div>
                       </div>
                       <div className={s.shadowContainer}><img src={shadowImage} alt=""/> </div>
                   </div>


            </div>

 
  
    );    
}

export default Post;