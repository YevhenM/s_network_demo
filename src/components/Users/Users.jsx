import React from 'react';
import s from "./users.module.css";
import userPhoto from "../assets/images/maleUser.jpg";
import {NavLink} from "react-router-dom";
import Pagenator from "./Pagenator/Pagenator";
import User from "./User/User";

let Users = (props) => {

    return <div>

        <Pagenator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   onMousePageChanged={props.onMousePageChanged}
                   totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                    />

        {   props.users.map( u =>  <div className={s.userBox + " " + (u.followed && s.followedUser)} key={u.id}>
                <span className={s.userPicAndButton}>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img className={s.userpic} src={u.photos.small? u.photos.small: userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} className={s.butFolow} onClick={() =>{
                                props.unfollowThunk(u.id)

                            } }>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() =>{
                                props.followThunk(u.id)

                            } }>Follow</button>}
                    </div>
                </span>

            <span>
                    <span>
                        <div className={s.userName}>{u.name}</div>
                        <div className={s.status}>{u.status}</div>
                    </span>

         <span>
                        <span className={s.location}>{"u.location.country"}</span>
                        <span className={s.location}>{"u.location.city"}</span>
                    </span>

                </span>
        </div>)
        }
        <Pagenator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   onMousePageChanged={props.onMousePageChanged}
                   totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
        />
    </div>
}

export default Users;



{/*
<div className={s.userBox + " " + (u.followed && s.followedUser)} key={u.id}>
                <span className={s.userPicAndButton}>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img className={s.userpic} src={u.photos.small? u.photos.small: userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} className={s.butFolow} onClick={() =>{
                                props.unfollowThunk(u.id)

                            } }>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() =>{
                                props.followThunk(u.id)

                            } }>Follow</button>}
                    </div>
                </span>

    <span>
                    <span>
                        <div className={s.userName}>{u.name}</div>
                        <div className={s.status}>{u.status}</div>
                    </span>

         <span>
                        <span className={s.location}>{"u.location.country"}</span>
                        <span className={s.location}>{"u.location.city"}</span>
                    </span>

                </span>
</div>*/}
