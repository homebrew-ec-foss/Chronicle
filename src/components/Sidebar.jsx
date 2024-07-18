/* eslint-disable react/prop-types */
import React from 'react';

const Sidebar = ({ files }) => {
  return (
    <div className="sidebar">
      <h2>My Workspace</h2>
      <div className="file-tree">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            {file}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;