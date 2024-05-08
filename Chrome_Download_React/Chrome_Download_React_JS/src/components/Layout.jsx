import React from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './NavBar/NavBar';
import ListItem from './ListItem';
const [fileList, setFileList] = useState([]); // Your original fileList state
const [filteredFileList, setFilteredFileList] = useState([]); // State to hold filtered file list

const Layout = () => {
  return (
    <>
      <NavBar />
      <Grid container spacing={3} style={{ padding: '20px' }}>
        <Grid item xs={12}>
          <ListItem />
        </Grid>
      </Grid>
      
    </>
  );
};

export default Layout;
