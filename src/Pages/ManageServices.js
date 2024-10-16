import React, { useState } from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import ProfileTabNavigation from '../Components/ProfileTabNavigation';
import ServiceOverviewEdit from '../Components/ServiceOverviewEdit';

const ManageServices = () => {

  return (
    <BusinessLayout>
      <ProfileTabNavigation />
      <div className='min-h-screen w-full bg-backroundPurple mt-2 rounded-[50px]'>
        <ServiceOverviewEdit />
      </div>
    </BusinessLayout>
  );
};

export default ManageServices;
