"use client"
import React,{ useEffect,useState } from 'react';
import Sidebar from "../../components/dashboard/Sidebar"
import Visitors from '../../components/dashboard/Visitors';
const Admin = () => {
  return(
    <div className="flex h-full p-4">
      <Sidebar />
      <Visitors />
    </div>
  );
};

export default Admin;