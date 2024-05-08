import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// FileListItem component displays a single file item with delete functionality
const FileListItem = ({ file, handleDelete }) => {
  return (
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ width: '700px' }}>
          {fileList.map((item, index) => (
            <Paper key={index} elevation={3} style={{ margin: '10px', padding: '10px', display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
              {/* You can replace the 'alt' attribute with the file name or any other relevant information */}
              <img src="/path/to/thumbnail.png" alt="Thumbnail" style={{ width: '50px', marginRight: '10px' }} />
              <div>
                <Typography variant="body1" style={{ maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold', color: '#333' }}>{item.fileName}</Typography>
                <Typography variant="caption" style={{ color: '#666' }}>Uploaded on {item.uploadDate}</Typography>
              </div>
              <IconButton onClick={() => handleDelete(index)} style={{ marginLeft: 'auto' }}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </div>
      </div>
  );
};

export default FileListItem;
