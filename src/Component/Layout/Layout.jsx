import React from 'react';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '90px' }}> {/* Adjust the margin as needed */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
