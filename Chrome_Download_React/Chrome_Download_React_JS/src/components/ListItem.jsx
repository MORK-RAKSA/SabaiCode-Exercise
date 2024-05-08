import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FileUploadForm from './FileUploadForm'; 
import FileListItem from './FileListItem';

const ListItem = () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }
    
    const currentDate = new Date().toLocaleDateString();
    const newFile = { file: file, fileName: fileName, uploadDate: currentDate, category: category };
    setFileList([...fileList, newFile]);
    handleClose(); 
    setFileList([...fileList, newFile]);
  };
  const handleDelete = (index) => {
    const updatedList = [...fileList];
    updatedList.splice(index, 1);
    setFileList(updatedList);
  };

  return (
    <div>
      <Button 
          variant="contained" 
          onClick={handleOpen}
          style={{ position: 'fixed', bottom: '20px', right: '20px', borderRadius: '20px', zIndex: '999' }}
      >
        Add
      </Button>

      <FileUploadForm open={open} handleClose={handleClose} onFileUpload={handleFileUpload} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ width: '700px' }}>
          {fileList.map((file, index) => (
            <FileListItem key={index} file={file} handleDelete={() => handleDelete(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
