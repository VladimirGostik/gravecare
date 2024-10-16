import React, { createContext, useContext, useState } from 'react';
import { registerEntrepreneurAPI } from '../Services/auth';

// Vytvárame AuthContext
const AuthContext = createContext();

// Poskytovateľ kontextu
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [personalData, setPersonalData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [pendingReviewOrder, setPendingReviewOrder] = useState(null);

  const mockUsers = [
    {
      id: 1,
      email: "user@test.com",
      password: "password",
      role: "user",
      personalData: {
        id: 1,
        email: "user@test.com",
        password: "password",
        name: "Jozka Ferendzi",
        address: "1234 Main St",
        phoneNumber: "123-456-7890"
      }
    },
    {
      id: 2,
      email: "business@test.com",
      password: "password",
      role: "business",
      personalData: {
        id: 2,
        email: "business@test.com",
        password: "password",
        name: "Business Owner",
        address: "5678 Business Ave",
        phoneNumber: "987-654-3210"
      },
      companyData: {
        companyName: "Business Co.",
        companyLogo: null,
        adresa1: "Business Ave 1",
        adresa2: "Suite 500",
        mesto: "Business City",
        psc: "12345",
        ico: "12345678",
        dic: "1234567890",
        icdph: "SK1234567890",
        iban: "SK12345678901234567890",
        averageRating: 4.3,
        description: "Navigačné tlačidlá..."
      }
    }
  ];

  const registerEntrepreneur = async (userData, entrepreneur) => {
    try {
      const response = await registerEntrepreneurAPI(userData, entrepreneur);
      setCompanyData(response.data);
    } catch (error) {
      console.error('Chyba pri registrácii podnikateľa:', error);
    }
  };

  const login = (email, password) => {
    const foundUser = mockUsers.find(
      (mockUser) => mockUser.email === email && mockUser.password === password
    );

    if (foundUser) {
      setUser({ id: foundUser.id, email: foundUser.email, role: foundUser.role });

      if (foundUser.role === 'user') {
        setPersonalData(foundUser.personalData);
        setCompanyData(null);
      }

      if (foundUser.role === 'business') {
        setPersonalData(foundUser.personalData);
        setCompanyData(foundUser.companyData);
      }
    } else {
      console.log('Nesprávne prihlasovacie údaje');
    }
  };

  const logout = () => {
    setUser(null);
    setPersonalData(null);
    setCompanyData(null);
    setPendingReviewOrder(null); // Odhlásením sa zruší aj čakajúca objednávka
  };

  return (
    <AuthContext.Provider value={{ user, personalData, companyData, login, logout, registerEntrepreneur, pendingReviewOrder, setPendingReviewOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook na používanie AuthContext
export const useAuth = () => useContext(AuthContext);
