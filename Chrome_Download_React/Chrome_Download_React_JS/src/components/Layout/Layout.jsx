import React from 'react';
import NavBar from '../NavBar/NavBar';
import ListItem from '../List/ListItem';
import UploadForm from '../List/UploadForm';

const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      {/* <UploadForm/> */}
      <ListItem />
    </div>
  );
};

export default Layout;