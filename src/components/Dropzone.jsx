import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';


function Dropzone() {
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      setSelectedFile(acceptedFile[0]);
    }
  });

  return (
    <div  {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFile ? (
        <div >
          <UploadFileIcon className='file-upload' />
          <p className='file-upload'>{selectedFile.name}</p>
          <img style={{maxWidth:'200px',maxHeight:'200px'}} src={URL.createObjectURL(selectedFile)} alt='Preview' />
        </div>
      ) : (
        <div>
          <UploadFileIcon className='file-upload' />
          <p className='file-upload'>Select file</p>
        </div>
      )}
    </div>
  );
}

export default Dropzone;