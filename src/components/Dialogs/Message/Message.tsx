import React, {FC} from 'react';
import s from './../Dialogs.module.css';

type PropTypes = {
    message: string
}
const Message: FC<PropTypes> = (props) => {
    return <div className={s.dialog}>{props.message}</div>
}

export default Message;