"use client";
import React from 'react'
import Dashboard from '../(dashboard)/dashboard';
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