import React from 'react';
import { Layout } from '../components/Layout';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { RegistrationHeader } from '../components/registration/RegistrationHeader';

export function RegistrationView() {
  return (
    <Layout>
      <div className="space-y-8">
        <RegistrationHeader />
        <RegistrationForm />
      </div>
    </Layout>
  );
}