import React, { createContext, useContext, useState } from 'react';

// Vytvorenie kontextu
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to 'en' (English)

  // Add the list of languages here
  const languages = [
    { code: 'en', name: 'English', flag: '/images/flags/english.svg' }, // Example flag path
    { code: 'sk', name: 'Slovak', flag: '/images/flags/slovak.svg' },
    { code: 'de', name: 'German', flag: '/images/flags/german.svg' }
  ];

  const toggleEmailNotifications = () => setEmailNotificationsEnabled(!emailNotificationsEnabled);
  const toggleSmsNotifications = () => setSmsNotificationsEnabled(!smsNotificationsEnabled);
  const toggleTwoFactorAuth = () => setTwoFactorAuthEnabled(!twoFactorAuthEnabled);

  const handleLanguageChange = (newLanguage) => setSelectedLanguage(newLanguage);

  return (
    <SettingsContext.Provider
      value={{
        emailNotificationsEnabled,
        toggleEmailNotifications,
        smsNotificationsEnabled,
        toggleSmsNotifications,
        twoFactorAuthEnabled,
        toggleTwoFactorAuth,
        selectedLanguage,
        handleLanguageChange,
        languages // Provide the languages array to the context
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
