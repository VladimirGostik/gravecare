import React from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import ProfileTabNavigation from '../Components/ProfileTabNavigation';

const ManageAppointments = () => {
  return (
    <BusinessLayout>
        <ProfileTabNavigation/>
        <div className='h-screen w-full bg-backroundPurple mt-2 rounded-[50px]'>
          <h1 className="text-4xl text-white font-bold flex justify-center p-4 text-shadow-lg text-border">
            sprava terminov
          </h1>
        </div>
    </BusinessLayout>
  );
};

export default ManageAppointments;
