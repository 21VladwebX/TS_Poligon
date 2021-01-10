import React, {FC, FormEvent} from 'react';
import s from '../MyPosts.module.css';
import {Field, reduxForm} from "redux-form";

type PropsType = {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}
const AddPostForm: FC<PropsType> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={"textarea"} name="postText"/>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

export default reduxForm({form: 'profile-add-post'})(AddPostForm)
