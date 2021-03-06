import React from 'react';
import {connect} from "react-redux";
import {
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setFriendsFilter,
    toggleIsFetching,
    toggleFollowingProgress,
    getUsersThunkCreator,
    unfollowUserThunkCreator,
    followUserThunkCreator,
    setFilterByStr
} from "../../redux/users-reducer";
import {getAuthUserData} from "../../redux/auth-reducer"
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

let timerId=0
let stepWhellScrolling = 1




class UsersContainer extends React.Component {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber) => {
        stepWhellScrolling=1
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize);

    };

    onFrinedsFilterChange = (e) => {
        console.log("filter .... >>>> ", e)
        this.props.setFriendsFilter(e)
        this.props.getUsers(1, this.props.pageSize)
    }

    onFilterByStr = (e) => {
        console.log("filter .... >>>> ", e)
        this.props.setFilterByStr(e)
        this.props.getUsers(1, this.props.pageSize)
    }


    //setFilterByStr

    onMousePageChanged = (deltaY, currentPage, maxPageNumber) => {
        if (timerId !=0) {stepWhellScrolling=stepWhellScrolling+0.5} else {stepWhellScrolling=1}
        clearTimeout(timerId)
        currentPage = Math.ceil(currentPage - (deltaY/100)*stepWhellScrolling)
        if (currentPage<1) {currentPage = 1}
        if (currentPage>maxPageNumber) {currentPage=maxPageNumber}
        this.props.setCurrentPage(currentPage)
        timerId = setTimeout(() => {this.props.getUsers(currentPage, this.props.pageSize); timerId=0}, 700)
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                          pageSize={this.props.pageSize}
                          currentPage={this.props.currentPage}
                          users={this.props.users}
                          onPageChanged={this.onPageChanged}
                          onMousePageChanged={this.onMousePageChanged}
                          unfollowThunk={this.props.unfollowThunk}
                          followThunk={this.props.followThunk}
                          toggleFollowingProgress={this.props.toggleFollowingProgress}
                          followingInProgress={this.props.followingInProgress}
                          isAuth={this.props.isAuth}
                          onFrinedsFilterChange={this.onFrinedsFilterChange}
                          filterFriends={this.props.filterFriends}
                          onFilterByStr={this.onFilterByStr}
            />
         </>
    }
}

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

let mapStateToProps = (state) => {

    return {
        someParameter: 10,
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth,
        filterFriends: state.usersPage.filterFriends
    }
}

export default compose (
    /*withAuthRedirect,*/
    connect(mapStateToProps, {
        setFilterByStr,
        setFriendsFilter,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        toggleFollowingProgress,
        getUsers: getUsersThunkCreator,
        unfollowThunk: unfollowUserThunkCreator,
        followThunk: followUserThunkCreator
    })
)(UsersContainer)


