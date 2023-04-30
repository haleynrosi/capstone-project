import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '../actions/dropzoneSlice';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';



function Dropzone() {
  const dispatch = useDispatch();
    
  const selectedFile = useSelector((state => state.dropzone.selectedFile));
  const [filePreview, setFilePreview] = useState(null);
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const name = acceptedFile[0].name;
      dispatch(setSelectedFile(name));
      setFilePreview(URL.createObjectURL(acceptedFile[0]));
      const formData = new FormData();
      formData.append('file', acceptedFile[0]);
  
      axios.post('http://34.210.179.63:8008/Images/upload', formData, {
          headers:{
            'api-key':'DigtalCrafts',
            'Content-Type':'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
          setFilePreview(URL.createObjectURL(acceptedFile[0]));
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFile ? (
        <div className= "fileSelect">
          <p>Image Upload:</p>
          <UploadFileIcon className='file-upload' />
          {filePreview && <img style={{maxWidth:'200px',maxHeight:'200px'}} src={filePreview} alt='Preview' />}
        </div>
      ) : (
        <div>
          <p>Image Upload:</p>
          <UploadFileIcon className='file-upload' />
          <p className='file-upload'></p>
        </div>
      )}
    </div>
  );
}


export default Dropzone;