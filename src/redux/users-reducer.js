import {usersAPI} from "../api/api";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS'
const SET_FRIENDS_FILTER_CHECKBOX = 'users/SET_FRIENDS_FILTER_CHECKBOX'
const SET_FILTER_BY_STR = 'users/SET_FILTER_BY_STR'

let initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    filterFriends: true,
    filterSearchByStr: ""
}



const usersReducer = (state = initialState, action) => {

    switch(action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case SET_FRIENDS_FILTER_CHECKBOX: {
            return {...state, filterFriends: action.payload}
        }

        case SET_FILTER_BY_STR: {
            return {...state, filterSearchByStr: action.payload}
        }

        default:
            return state;
    }

}

// action creators

const follow = (userId) => ({ type: FOLLOW, userId });
const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});
export const setFriendsFilter = (friendsCheckbox) => {
    const payload = friendsCheckbox ? true : null
    return {type: SET_FRIENDS_FILTER_CHECKBOX, payload: payload};
    }
export const setFilterByStr = (filterByStr) => {
    const payload = filterByStr
    return {type: SET_FILTER_BY_STR, payload: payload};
}


// Thunks

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage))

        const userId = getState().auth.userId
        const term=getState().usersPage.filterSearchByStr
        const friend=getState().usersPage.filterFriends
        let data = await usersAPI.getUsers(currentPage, pageSize, term, friend)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const unfollowUserThunkCreator = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.unfollowUserRequest(userId)
                if (data.data.resultCode == 0) {
                    dispatch(unfollow(userId))
                }
                dispatch (toggleFollowingProgress(false, userId));

    }
}

export const followUserThunkCreator = (userId) => {

    return async (dispatch) => {

        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.followUserRequest(userId)
            if (data.data.resultCode == 0) {
            dispatch(follow(userId))
                }
            dispatch (toggleFollowingProgress(false, userId));
    }
}



export default usersReducer