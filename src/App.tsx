import React from 'react';
import { RegistrationView } from './views/RegistrationView';
import { DashboardView } from './views/DashboardView';
import { useRegistration } from './hooks/useRegistration';

export function App() {
  const { isRegistrationComplete } = useRegistration();
  return isRegistrationComplete ? <DashboardView /> : <RegistrationView />;
}

export default App;