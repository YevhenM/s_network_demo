import React from 'react';
import s from "./user.module.css";
import userPhoto from "../../../components/assets/images/maleUser.jpg";
import {NavLink} from "react-router-dom";

let User = (user, followingInProgress, followThunk, unfollowThunk, photos ) => {

    return  <div className={s.userBox + " " + (user.followed && s.followedUser)}>
                <span className={s.userPicAndButton}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={s.userpic} src={photos? photos: userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)} className={s.butFolow}
                                      onClick={() =>{ unfollowThunk(user.id) }}>Unfollow</button>

                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() =>{ followThunk(user.id) }}>Follow</button>}
                    </div>
                </span>


                    <span>
                        <div className={s.userName}>{user.name}</div>
                        <div className={s.status}>{user.status}</div>
                    </span>
        </div>
    }


export default User;