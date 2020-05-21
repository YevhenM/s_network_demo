import React from 'react'
import {connect} from 'react-redux'
import {compose} from "redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import Settings from "./Settings";

class SettingsContainer extends React.Component {


    render(){
        return (
            <div>
                <Settings profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(connect(
    mapStateToProps
),withRouter,)(SettingsContainer);