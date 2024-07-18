'use client';
import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import '../styles.css';

const files = ['item 1', 'item 2', 'item 3']; // Replace this with your actual file data

const Page = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content">
        <Sidebar files={files} />
        <Editor />
      </div>
    </div>
  );
};

export default Page;
