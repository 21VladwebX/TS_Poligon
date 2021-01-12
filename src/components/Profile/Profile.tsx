import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { savePhoto, saveProfile } from '../../redux/profile-reducer';
import { ProfileType } from '../../types/common';

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    savePhoto: (photo: File) => void
    saveProfile: (data: HTMLInputElement) => Promise<any>
    updateStatus: (status: string) => void
}
const Profile:FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;