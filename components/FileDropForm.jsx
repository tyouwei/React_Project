'use client';

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileDropForm = ({ type, desc, files, setFiles, submitting, handleSubmit }) => {
  
  const [containsFile, setContainsFile] = useState(false);
  
  //Next 2 functions are from react-dropzone documentation, refer there for more info
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setContainsFile(containsFile => !containsFile);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    } else {
      alert("Only txt, pdf, doc, docx files are accepted")
    }
  }, [])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/*': ['.pdf', '.doc', '.docx']
    }
  })

  const removeFile = () => {
    setFiles([]);
    setContainsFile(containsFile => !containsFile);
  }

  return (
    // Title and description
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='green_gradient'>{type} File</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {desc}
      </p>

      <form onSubmit={ handleSubmit } className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        {/* Dropzone */}
        {containsFile ? 
        (
          <div className="p-8 border border-neutral-200">
          {files.map(file =>(
            <li key={ file.name }>{ file.name }</li>
          ))}
          <button onClick={ removeFile } className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-black transition-colors float-right'>
            Remove
          </button>
          </div>
        ) : (
          <div {...getRootProps({className : "p-8 border border-neutral-200"})}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag and Drop files here, or click to select files</p>
          }
          </div>
        )}

        {/* Submit and cancel buttons */}
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FileDropForm;