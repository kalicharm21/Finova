import React, { Suspense } from 'react';
import DashboardPage from './page';
import {BarLoader} from 'react-spinners';

const DashboardLayout = () => {
  return (
    <div className='px-5'>
        <h1 className='text-6xl font-bold bg-gradient-to-r text-bold from-blue-600 to-purple-800 text-transparent bg-clip-text'>DashBoard</h1>
      {/* DashboardPage */}
      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea "/> }>

      <DashboardPage />
      </Suspense>
      
    </div>
  )
}

export default DashboardLayout