import React from 'react';
import BusinessLayout from '../Layouts/BusinessLayout';
import { useSettings } from '../Context/SettingsContext';
import EmailNotifications from '../Components/EmailNotifications';
import SmsNotifications from '../Components/SmsNotifications';
import TwoFactorAuth from '../Components/TwoFactorAuth';
import LanguageSettings from '../Components/LanguageSettings';
import InvoiceHistory from '../Components/InvoiceHistory';

const Settings = () => {
  const {
    emailNotificationsEnabled,
    toggleEmailNotifications,
    smsNotificationsEnabled,
    toggleSmsNotifications,
    twoFactorAuthEnabled,
    toggleTwoFactorAuth,
    selectedLanguage,
    handleLanguageChange,
    invoiceHistory,
  } = useSettings();

  return (
    <BusinessLayout>
      <div className='h-full w-full bg-backroundPurple mt-2 rounded-[50px] p-6'>
        <h1 className="text-4xl text-white font-bold flex justify-center mb-4 text-shadow-lg text-border">
          Nastavenia
        </h1>
        <EmailNotifications
          enabled={emailNotificationsEnabled}
          toggle={toggleEmailNotifications}
        />
        <SmsNotifications
          enabled={smsNotificationsEnabled}
          toggle={toggleSmsNotifications}
        />
        <TwoFactorAuth
          enabled={twoFactorAuthEnabled}
          toggle={toggleTwoFactorAuth}
        />
        <LanguageSettings
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
        <InvoiceHistory invoices={invoiceHistory} />
      </div>
    </BusinessLayout>
  );
};

export default Settings;
