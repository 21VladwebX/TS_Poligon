import React , {FC} from 'react';
import { UserType } from '../../types/common';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (PageSize: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (id: number)=> void
    unfollow: (id: number)=> void
}

let Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}

export default Users;