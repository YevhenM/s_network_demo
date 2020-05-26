import React from 'react';
import s from "./user.module.css";
import userPhoto from "../../../components/assets/images/maleUser.jpg";
import {NavLink} from "react-router-dom";



let User = (props ) => {



    return  <div className={s.userBox + " " + (props.user.followed && s.followedUser)}>
                <span className={s.userPicAndButton}>
                    <div>
                        <NavLink to={'/profile/' + props.user.id}>
                            <img className={s.userpic} src={props.user.photos.small? props.user.photos.small: userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {props.user.followed
                            ? <button disabled={ props.followingInProgress.some(id => id === props.user.id) } className={s.butFolow}
                                      onClick={() =>{ props.unfollowThunk(props.user.id) }}>Unfollow</button>

                            : <button disabled={ props.followingInProgress.some(id => id === props.user.id) }
                                      onClick={() =>{ props.followThunk(props.user.id) }}>Follow</button> }
                    </div>
                </span>


                    <span>
                        <div className={s.userName}>{props.user.name}</div>
                        <div className={s.status}>{props.user.status}</div>
                    </span>
        </div>
    }


export default User;