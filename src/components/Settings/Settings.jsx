import React from 'react';
import s from './Settings.module.css';
import ProfileInfo from '../Profile/ProfileInfo/ProfileInfo'
import ProfileStatusWithHooks from "../Profile/ProfileInfo/ProfileStatusWithHooks";

const Settings = (props) => {
    return (
        <div>
            <div >
                <div><img src={props.profile.photos.small} alt=""/></div>

                <div>
                    <div>{props.profile.fullName}</div>
                    <div>{props.profile.aboutMe}</div>
                    <div>{props.profile.lookingForAJob ? "Find a job" : "I'm not finding job"}</div>
                    <div>{props.profile.LookingForAJobDescription}</div>
                </div>
                <div className={s.contacts}>
                    <div>Contacts</div>
                    <div>Facebook: {props.profile.contacts.facebook}</div>
                    <div>Website: {props.profile.contacts.facebook}</div>
                    <div>VK: {props.profile.contacts.vk}</div>
                    <div>Twitter: {props.profile.contacts.twitter}</div>
                    <div>instagram: {props.profile.contacts.instagram}</div>
                    <div>youtube: {props.profile.contacts.youtube}</div>
                    <div>github: {props.profile.contacts.github}</div>
                    <div>mainLink: {props.profile.contacts.mainLink}</div>
                </div>
            </div>
        </div>
    );
}

export default Settings;