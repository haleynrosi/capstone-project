import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFile } from '../actions/dropzoneSlice';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';

function Dropzone() {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state => state.dropzone.selectedFile));
  // const setFileData = useState()

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const name = acceptedFile[0].name
      dispatch(setSelectedFile(name));
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
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  return (
    <div  {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFile ? (
        <div >
          <UploadFileIcon className='file-upload' />
          <p className='file-upload'>{selectedFile}</p>
          {/* <img style={{maxWidth:'200px',maxHeight:'200px'}} src={URL.createObjectURL({formData})} alt='Preview' /> */}
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