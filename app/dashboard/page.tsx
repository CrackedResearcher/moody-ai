"use client";
import React from 'react'
import Dashboard from '../(dashboard)/page';
import ProtectedRoute from '@/components/ProtectedRoute';

const DashboardPage = () => {
  return (
    <div>
      <ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute>
    </div>
  )
}

export default DashboardPage;