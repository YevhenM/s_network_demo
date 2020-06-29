import React, {useState, useEffect} from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../assets/images/maleUser.jpg'
import Preloader from "../../common/Preloader/Preloader";
import ProfileDataForm from './ProfileDataForm'


const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState (false)

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
        setEditMode(false)
    }

    return (
      <div>

        { !editMode?
            <ProfileData profile={props.profile}
                     onMainPhotoSelected={onMainPhotoSelected}
                     isOwner={props.isOwner}
                     userPhoto={userPhoto}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     editMode={editMode}
                     setEditMode={setEditMode}
        /> : <ProfileDataForm profile={props.profile}
                     onMainPhotoSelected={onMainPhotoSelected}
                     isOwner={props.isOwner}
                     userPhoto={userPhoto}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     editMode={editMode}
                     setEditMode={setEditMode}
                     onSubmit={onSubmit}
                     initialValues={props.profile}
            />}

          {props.isOwner && <div className={s.editModeButtonBloc}>
                              <label htmlFor="editModeButton" className={s.editModeButtonLabel}>{!editMode? 'Edit user info' : 'Cancel edit'}
                                  <button className={s.editModeButton}
                                          id="editModeButton"
                                          onClick={()=>{editMode? setEditMode(false): setEditMode(true)}}>change data
                                  </button>
                              </label>
                            </div>
          }
      </div>
    );    
}

const Contact = ({contactTitle, contactValue}) => {
    if (contactValue) {return <div><i>{contactTitle}</i>: {contactValue}</div>}
    return null
}

const ProfileData = (props) => {
    return <div className={s.profileinfoBox}>
        <div className={s.avatarBlock}>
            <div className={s.userpic}><img src={props.profile.photos.large || props.userPhoto} alt=""/>
                {props.isOwner &&
                <label htmlFor='file-upload' className={s.newImageButton}>NEW PHOTO<input id='file-upload'
                                                                                          className={s.inputButton}
                                                                                          type={'file'}
                                                                                          onChange={props.onMainPhotoSelected}/></label>}
            </div>
            <div className={s.userName}>{props.profile.fullName}</div>
            <span>About me:</span>
            <div>{props.profile.aboutMe}</div>
        </div>

        <div className={s.contacts}>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} className={s.status}/>
            <hr/>
            <div>{props.profile.lookingForAJob ? "I am looking for a job" : "I'm not looking for a job"}</div>
            <div>{props.profile.lookingForAJobDescription}</div>
            <br/>
            <b>Contacts:</b>

            <div>{Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
            })}</div>
            {/*{props.isOwner && <button onClick={()=>{props.editMode? props.setEditMode(false): props.setEditMode(true)}}>change data</button>}*/}
        </div>
    </div>
}



export default ProfileInfo;