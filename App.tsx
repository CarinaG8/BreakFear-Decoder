import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Disclaimer } from './components/Disclaimer';
import { DecoderApp } from './components/DecoderApp';
import { Paywall } from './components/Paywall';
import { AppState, UserInfo } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    // 1. Check if user is returning from a successful payment
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment');

    // 2. Check if we have a saved user backup in storage
    const savedUserJson = localStorage.getItem('breakfear_user_backup');
    let savedUser: UserInfo | undefined = savedUserJson ? JSON.parse(savedUserJson) : undefined;
    
    // 3. Check if premium was previously unlocked
    const isPremiumStored = localStorage.getItem('breakfear_is_premium') === 'true';

    if (paymentStatus === 'success') {
      // Unlock premium forever on this device
      localStorage.setItem('breakfear_is_premium', 'true');
      
      // Clean the URL so the user doesn't see ?payment=success forever
      window.history.replaceState({}, document.title, window.location.pathname);
      
      if (savedUser) {
        savedUser = { ...savedUser, isPremium: true };
        setUserInfo(savedUser);
        setAppState(AppState.DECODER);
      } else {
        // If for some reason we lost the user data, send them to Disclaimer but mark as premium
        setUserInfo({ name: 'Traveler', email: '', isPremium: true });
        setAppState(AppState.DECODER);
      }
    } else if (isPremiumStored && savedUser) {
      // Restore session if they reload page
      savedUser = { ...savedUser, isPremium: true };
      setUserInfo(savedUser);
    }
  }, []);

  const handleDisclaimerConfirm = (info: UserInfo) => {
    // Check if they are already premium from storage
    const isPremium = localStorage.getItem('breakfear_is_premium') === 'true';
    const updatedInfo = { ...info, isPremium };
    
    setUserInfo(updatedInfo);
    setAppState(AppState.DECODER);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LANDING:
        return <LandingPage onStart={() => setAppState(AppState.DISCLAIMER)} />;
      case AppState.DISCLAIMER:
        return (
          <Disclaimer 
            onConfirm={handleDisclaimerConfirm} 
            onBack={() => setAppState(AppState.LANDING)} 
          />
        );
      case AppState.DECODER:
        return <DecoderApp setAppState={setAppState} userInfo={userInfo} />;
      case AppState.PAYWALL:
        return (
          <>
            <DecoderApp setAppState={setAppState} userInfo={userInfo} />
            <Paywall setAppState={setAppState} userInfo={userInfo} />
          </>
        );
      default:
        return <LandingPage onStart={() => setAppState(AppState.DISCLAIMER)} />;
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default App;