import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatus from "./ProfileStat";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../assets/images/maleUser.jpg'
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
      <div>
        {/*<img src="https://www.arohatours.co.nz/media/1645/banner_queenstown-g.jpg?mode=crop&height=700&width=1920&quality=80" alt="img" className={s.cover}/>*/}
        <div className={s.profileinfoBox}>
            <div className={s.avatarBlock}>
                <div className={s.userpic}><img src={props.profile.photos.large || userPhoto} alt=""/>
                    {props.isOwner && <label for='file-upload' className={s.newImageButton}>NEW PHOTO<input id='file-upload'  className={s.inputButton} type={'file'} onChange={onMainPhotoSelected} /></label> }
                </div>


                <div className={s.userName}>{props.profile.fullName}</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} className={s.status}/>
                <p>About me:</p>
                <div>{props.profile.aboutMe}</div>
            </div>

            <div className={s.contacts}>
                <div>{props.profile.lookingForAJob ? "Find a job" : "I'm not finding job"}</div>
                <div>{props.profile.LookingForAJobDescription}</div>
                <hr/>
                <b>Contacts:</b>

                <div>{Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}</div>



            </div>

        </div>      
    </div>  
    );    
}

const Contact = ({contactTitle, contactValue}) => {
    if (contactValue) {return <div><i>{contactTitle}</i>: {contactValue}</div>}
    return null
}

export default ProfileInfo;