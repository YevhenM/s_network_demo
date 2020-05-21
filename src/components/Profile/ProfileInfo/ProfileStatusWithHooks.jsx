import React, {useState, useEffect} from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus (e.currentTarget.value)
    }

        return (
            <div>
                {!editMode &&
                <i>
                    <span onDoubleClick={activateEditMode}> {props.status || "No status"}</span>
                </i>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
                </div>
                }
            </div>

        );

}

export default ProfileStatusWithHooks;