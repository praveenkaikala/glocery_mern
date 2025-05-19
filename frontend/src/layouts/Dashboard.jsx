import React from 'react'
import UserMenu from '../components/UserMenu';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <section className="bg-white h-screen">
     <div className=" container mx-auto p-3 grid md:grid-cols-4 h-full">
        <div className='sticky top-24 overflow-y-auto md:block hidden'>
            <UserMenu/>
        </div>
        <div className='overflow-y-auto w-full shadow md:col-span-3'>
           <Outlet/>
        </div>
      </div>
    </section>
  );
};

export default Dashboard