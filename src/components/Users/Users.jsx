import React from 'react';
import s from "./users.module.css";
import userPhoto from "../assets/images/maleUser.jpg";
import {NavLink} from "react-router-dom";
import Pagenator from "./Pagenator/Pagenator";
import User from "./User/User";



let Users = (props) => {



   const soldCheckbox = ({ target: { checked } }) => {
       /* console.log(" TARGET >>> ",checked);*/
        props.onFrinedsFilterChange(checked)

    };

    const handleSubmit = (data) => {
        props.onFilterByStr(data.target[0].value)
        data.preventDefault()
    }

    let showPagenator = true

    if (Math.ceil(props.totalUsersCount / props.pageSize) < 2) {showPagenator = false}


    return <div>
        {props.isAuth && <div className={s.searchModule}>
            <div>
                <input type="checkbox" checked={props.filterFriends} name={'Friends'} onChange={soldCheckbox}/>
                <label htmlFor="Friends"> Followed </label>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name={'Find'}/>
                    <input type="submit" value="Find" />
                </form>
            </div>

        </div>}

        {showPagenator && <Pagenator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   onMousePageChanged={props.onMousePageChanged}
                   totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                    />}

        {   props.users.map( u =>  <User user={u}
                                                  followingInProgress={props.followingInProgress}
                                                  followThunk={props.followThunk}
                                                  unfollowThunk={props.unfollowThunk}
                                                   />)
        }
        {showPagenator && <Pagenator currentPage={props.currentPage}
                                     onPageChanged={props.onPageChanged}
                                     onMousePageChanged={props.onMousePageChanged}
                                     totalUsersCount={props.totalUsersCount}
                                     pageSize={props.pageSize}
        />}
    </div>
}

export default Users;


{/*<div className={s.userBox + " " + (u.followed && s.followedUser)} key={u.id}>
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

