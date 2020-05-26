import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControl";

const ProfileDataForm = (props) => {
    return <div className={s.profileinfoBox}>
        <div className={s.avatarBlock}>
            <div className={s.userpic}><img src={props.profile.photos.large || props.userPhoto} alt=""/>
                {props.isOwner &&
                <label htmlFor='file-upload' className={s.newImageButton}>NEW PHOTO<input id='file-upload'
                                                                                          className={s.inputButton}
                                                                                          type={'file'}
                                                                                          onChange={props.onMainPhotoSelected}/></label>}
            </div>


        </div>

        <form className={s.contacts} onSubmit={props.handleSubmit}>
            <div className={s.formItem}>
                <span>Full name</span>: {createField("Full name", 'fullName', [], Input)}
            </div>
            <div className={s.formItem}>
                <span>Looking for a job</span>: {createField("", 'lookingForAJob', [], Input, {type:'checkbox'})}
            </div>
            <div className={s.formItem}>
                <span>My professional skills</span>: {props.profile.LookingForAJobDescription}
                {createField("My professional skills", 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div className={s.formItem}>
                <span>About me</span>: {/*{props.profile.aboutMe}*/}
                {createField("About me", 'aboutMe', [], Textarea)}
            </div>

            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} className={s.status}/>
            <hr/>
            <br/>
            <b>Contacts:</b>

            <div>{Object.keys(props.profile.contacts).map(key => {
                /*return <ContactEdit key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>*/
                return <div className={s.formItem}>
                            <span>{key}: </span>{createField(key, "contacts."+key, [], Input)}
                       </div>
            })}</div>
            <button>save data</button>

        </form>
    </div>
}



const ProfileDataFormReduxFrom = reduxForm({form: 'profileData'})(ProfileDataForm)

export default ProfileDataFormReduxFrom