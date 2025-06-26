import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import React from 'react'
import { Outlet } from 'react-router'

function PublicLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout