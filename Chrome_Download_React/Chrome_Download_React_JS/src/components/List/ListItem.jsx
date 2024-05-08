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
  import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
  import { MuiFileInput } from 'mui-file-input';

  const ListItem = () => {
    const [open, setOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [category] = useState('');  
    const [uploadedBy, setUploadedBy] = useState('');
    const [fileList, setFileList] = useState([]);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setFileName('');
      setFile(null);
      setUploadedBy('morkraksa');
      setError('');
    };

    const handleDeleteConfirmOpen = (file, dateIndex, fileIndex) => {
      setFileToDelete({ file, dateIndex, fileIndex });
      setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirmClose = () => {
      setFileToDelete(null);
      setDeleteConfirmOpen(false);
    };

    const handleChange = (newFile) => {
      setFile(newFile);
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
        updatedFileList[existingDateIndex].files.push({ fileName, category, uploadedBy, file });
        setFileList(updatedFileList);
      } else {
        setFileList([...fileList, { uploadDate: currentDate, files: [{ fileName, category, uploadedBy, file }] }]);
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


    const getFilePreview = (file) => {
      return URL.createObjectURL(file);
    };

    const handleUpdate = () => {
      const updatedFileList = fileList.map((dateItem, dateIndex) => {
        if (dateIndex === selectedFile.dateIndex) {
          const updatedFiles = dateItem.files.map((file, fileIndex) => {
            if (fileIndex === selectedFile.fileIndex) {
              return {
                ...file,
                fileName: selectedFile.fileName,
                uploadedBy: selectedFile.uploadedBy,
                file: selectedFile.file
              };
            }
            return file;
          });
          return {
            ...dateItem,
            files: updatedFiles
          };
        }
        return dateItem;
      });
      setFileList(updatedFileList);
      setIsEditFormOpen(false);
      setSelectedFile(null); // Clear selectedFile state
    };
    
    return (
      <div>
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            borderRadius: '40px',
            width: '40px',
            height:'62px',
            zIndex: '999',
          }}
        >
          Add
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
              variant="standard"
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
              variant="standard"
            />
            <MuiFileInput
              type="file"
              id="fileInput"
              placeholder="Please select file..."
              value={file}
              onChange={handleChange}
              accept="image/*"
              style={{ marginTop: "10px", width: "100%" }}
            />
            {file && (
              <img src={getFilePreview(file)} alt="Preview" />
            )}
          </DialogContent>
          <DialogActions>
            <Button onMouseDown={handleClose} color="warning">Cancel</Button>
            <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!fileName.trim() || fileName.trim().length < 3}>
              Upload
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the file "{fileToDelete?.file?.fileName}"?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmClose} color="success" variant="contained">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(fileToDelete?.dateIndex, fileToDelete?.fileIndex)} variant="outlined" color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isEditFormOpen} onClose={() => setIsEditFormOpen(false)}>
          <DialogTitle>Edit File Details</DialogTitle>
          <DialogContent dividers>
            {selectedFile && (
              <>
                <img src={getFilePreview(selectedFile.file)} alt="Preview" style={{ width: '100%', marginBottom: '20px' }} />
                <TextField
                  margin="dense"
                  id="editFileName"
                  label="File Name"
                  type="text"
                  value={selectedFile.fileName}
                  onChange={(e) => setSelectedFile({ ...selectedFile, fileName: e.target.value })}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="editUploadedBy"
                  label="Uploaded By"
                  type="text"
                  value={selectedFile.uploadedBy}
                  onChange={(e) => setSelectedFile({ ...selectedFile, uploadedBy: e.target.value })}
                  fullWidth
                  variant="standard"
                />
                <input
                  type="file"
                  id="editFileInput"
                  onChange={(e) => setSelectedFile({ ...selectedFile, file: e.target.files[0] })}
                  style={{ marginTop: '20px' }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditFormOpen(false)} color="warning">Cancel</Button>
            <Button onClick={handleUpdate} color="primary" variant="contained" disabled={!selectedFile || !selectedFile.fileName.trim() || selectedFile.fileName.trim().length < 3}>
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <div style={{ display: 'flex', justifyContent: 'center', background: "#202124" }}>
          <div style={{ width: '760px', marginTop: '20px'}}>
            <DragDropContext onDragEnd={handleDragEnd}>
              {fileList.map((dateItem, dateIndex) => (
                <Droppable key={dateIndex} droppableId={String(dateIndex)}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Typography variant="caption" style={{ color: '#fff'}}>{dateItem.uploadDate}</Typography>
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
                                  marginTop: '15px',
                                  overflow: 'hidden',
                                  height: '120px',
                                  margin: '10px',
                                  padding: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  borderRadius: '10px',
                                  backgroundColor: '#202124',
                                  boxShadow: '0px 2px 8px solid #333',
                                  border: selectedFile && selectedFile.dateIndex === dateIndex && selectedFile.fileIndex === fileIndex ? '2px solid green' : '2px solid transparent'
                                }}
                                onDoubleClick={() => {
                                  setSelectedFile({ ...item, dateIndex, fileIndex });
                                  setIsEditFormOpen(true);
                                }}
                              >
                                {item.file && item.file.type.startsWith('image/') ? (
                                  <img src={getFilePreview(item.file)} alt="Preview" style={{ width: '140px', marginRight: '40px', overflow:'hidden' }} />
                                ) : (
                                  <div style={{ width: '80px', height: '80px', marginRight: '10px' }}></div>
                                )}
                                <div>
                                  <Typography variant="body1" style={{ width: '480px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold', color: '#ffffff' }}>{item.fileName}</Typography><br />
                                  <Typography variant="caption" style={{ color: '#666' }}>Date: {dateItem.uploadDate}</Typography><br />
                                  <Typography variant="caption" style={{ color: '#666' }}>Uploaded By: {item.uploadedBy}</Typography>
                                </div>
                                <IconButton style={{ width: '40px', marginLeft: '10px', color: '#fff' }} onClick={() => handleDeleteConfirmOpen(item, dateIndex, fileIndex)}>
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
