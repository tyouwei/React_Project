'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import FileDropForm from "@components/FileDropForm";
import Form from "@components/Form";

const InsertFile = () => {

    const [file, setFile] = useState([])
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        
        if (file.length == 0) {
            return
        }

        //Extract text from pdf file and save into database
    }

    // return (
    //     <FileDropForm
    //         type = "Insert"
    //         desc = "Insert File to fine-tune the bot!"
    //         files = {file}
    //         setFiles = {setFile}
    //         submitting = {submitting}
    //         handleSubmit = {handleSubmit}
    //     />
    // )

    return (
        <Form
            type = "Insert"
            desc = "Insert File to fine-tune the bot!"
            post = {file}
            setPost = {setFile}
            submitting = {submitting}
            handleSubmit = {handleSubmit}
        />
    )
}

export default InsertFile