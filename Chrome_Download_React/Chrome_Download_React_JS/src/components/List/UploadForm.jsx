import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './ListItem.css'
import Slide from '@mui/material/Slide';


const ListItem = () => {
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFileName('');
    setFile(null);
    setError('');
  };

  const handleDeleteConfirmOpen = (file) => {
    setFileToDelete(file);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setFileToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name || 'Untitled');
    setError('');
  };

  const handleUploadedByChange = (event) => {
    setUploadedBy(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileName.length < 3) {
      setError('File name must be at least 3 characters.');
      return;
    }
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    const existingDateIndex = fileList.findIndex((item) => item.uploadDate === currentDate);
    if (existingDateIndex !== -1) {
      const updatedFileList = [...fileList];
      updatedFileList[existingDateIndex].files.push({ fileName, category, uploadedBy });
      setFileList(updatedFileList);
    } else {
      setFileList([...fileList, { uploadDate: currentDate, files: [{ fileName, category, uploadedBy }] }]);
    }
    handleClose();
  };

  const handleDelete = (dateIndex, fileIndex) => {
    const updatedFileList = [...fileList];
    updatedFileList[dateIndex].files.splice(fileIndex, 1);
    if (updatedFileList[dateIndex].files.length === 0) {
      updatedFileList.splice(dateIndex, 1);
    }

    setFileList(updatedFileList);
    handleDeleteConfirmClose();
  };

  // const handleDownloadConfirm = () => {
  //   // Implement download functionality here
  //   // Once download is complete, close the dialog
  //   handleDeleteConfirmClose();
  // };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newFileList = [...fileList];
    const [removed] = newFileList[source.droppableId].files.splice(source.index, 1);
    newFileList[destination.droppableId].files.splice(destination.index, 0, removed);

    setFileList(newFileList);
  };

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  const getFilePreview = (fileName) => {
    const extension = getFileExtension(fileName);
    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif') {
      return `/path/to/${fileName}`;
    } else if (extension === 'pdf') {
      return '../assets/pdf.png'; // You need to replace this with the path to your PDF icon
    } else if (extension === 'doc' || extension === 'docx') {
      return '/path/to/word-icon.png'; // You need to replace this with the path to your Word icon
    } else if (extension === 'xls' || extension === 'xlsx') {
      return '/path/to/excel-icon.png'; // You need to replace this with the path to your Excel icon
    } else {
      return '/path/to/default-icon.png'; // You need to replace this with the path to your default icon
    }
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            id="fileName"
            label="File Name"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error}
            required
          />
          <TextField
            margin="dense"
            id="uploadedBy"
            label="Uploaded By"
            type="text"
            value={uploadedBy}
            onChange={handleUploadedByChange}
            fullWidth
            variant="outlined"
          />
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{
              width:'100%',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              borderStyle: 'none',
              padding: '10px 10px',
              color: '#ffffff',
              marginTop: '10px'
            }}
          />


        </DialogContent>
        <DialogActions>
          <Button onMouseDown={handleClose} color="warning">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={fileName.length < 3}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the file "{fileToDelete?.fileName}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(fileToDelete?.dateIndex, fileToDelete?.fileIndex)} color="warning" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ width: '700px' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {fileList.map((dateItem, dateIndex) => (
              <Droppable key={dateIndex} droppableId={String(dateIndex)}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Typography variant="caption" style={{ color: '#666', marginBottom: '10px' }}>{dateItem.uploadDate}</Typography>
                    {dateItem.files.map((item, fileIndex) => (
                      <Draggable key={fileIndex} draggableId={String(fileIndex)} index={fileIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Paper
                              elevation={3}
                              style={{ 
                                margin: '10px', 
                                padding: '30px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                backgroundColor: '#202124', 
                                borderRadius: '10px', 
                                boxShadow: '0px 2px 8px solid #333' 
                              }}
                            >
                              <img src={getFilePreview(item.fileName)} alt="Thumbnail" style={{ width: '50px', marginRight: '20px' }} />
                              <div>
                                <Typography variant="body1" style={{ width: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold', color: '#ffffff' }}>{item.fileName}</Typography><br />
                                <Typography variant="caption" style={{ color: '#666' }}>Uploaded By: {item.uploadedBy}</Typography>
                              </div>
                              <IconButton style={{width:'40px', marginLeft: '10px', color: '#fff', right: '0%'}} onClick={() => handleDeleteConfirmOpen({ dateIndex, fileIndex })}>
                                <DeleteIcon />
                              </IconButton>
                            </Paper>
                          </div>  
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
