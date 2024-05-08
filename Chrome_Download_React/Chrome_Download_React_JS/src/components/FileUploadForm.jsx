import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const FileUploadForm = ({ open, handleClose, handleSubmit, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    } else {
      setFile(null);
      setFileName('');
      setError('Please select a file.');
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }
    // Call the onFileUpload prop function to pass the uploaded file
    onFileUpload(file);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="fileName"
          label="File Name"
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          fullWidth
          variant="standard"
          error={!!error}
          helperText={error}
        />
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ marginTop: '10px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadForm;
