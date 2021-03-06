import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post_1.jsx';
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControl";


let maxLength10 = maxLengthCreator(255)


const MyPosts = (props) => {

    let onDeletePost = (id) => {
        console.log(id)
        let idToRemove = id;
        props.deletePost(idToRemove);
    }

    let postsElements = props.postsData.map(p => <Post text={p.text}
                                                       likes={p.likes}
                                                       comments={p.comments}
                                                       key={p.id}
                                                       onDeletePost={onDeletePost}
                                                       id={p.id}
                                                       userPhoto={props.userPhoto}
                                                       userName={props.userName}/>);

    let newPostElement = React.createRef()

    let onAddPost = (values) =>{
        //props.dispatch(addPostActionCreator())
        props.addPost(values.newPostText);

    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        //props.dispatch(updateNewPostActionCreator(text));
        props.updateNewPostText(text);
    }


    return (      
      <div>

              <AddNewPostRedux onSubmit={onAddPost} />
              <div className={s.posts}>

                {postsElements}

                <br></br>
                <br></br>
                <br></br>
              </div>
      </div>  
    );    
}


const AddNewPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.postsNewPostTextAreaBloc}>
                <Field component={Textarea}
                       placeholder={'What are you thinking about?'}
                       name='newPostText'
                       className={s.textAreaNewPost}
                       validate={[required, maxLength10]}/>
            </div>
            <div className={s.buttonBox}>
                <div>
                    <button>New post</button>
                </div>
            </div>
        </form>
    )
}

const AddNewPostRedux = reduxForm({form:"postAddMessageForm"})(AddNewPost)

export default MyPosts;