import React from 'react'
import UserMenu from '../components/UserMenu';

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto grid grid-cols-[250px,1fr] ">
        <div>
            <UserMenu/>
        </div>
        <div>
            user contant
        </div>
      </div>
    </section>
  );
};

export default Dashboard