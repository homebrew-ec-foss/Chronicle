/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import Editor from '../components/Editor';
import Navbar from '../components/navbar';
import Login from '../components/login';

const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='p-5'></div>
      <div>
        <Editor />
      </div>
    </>
  );
};

export default App;
