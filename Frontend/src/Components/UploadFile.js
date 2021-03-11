import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
function UploadFile(props){
    const { register,handleSubmit } = useForm();

    return (
        <div>
            <form onSubmit={handleSubmit(props.onsubmit)} >
            <input ref={register} type="file" name="picture" onChange={props.onchange}/>
            {props.WithUpload ? <Button type="submit">Upload</Button> : null}
            </form>
        </div>

    )
}

export default UploadFile;