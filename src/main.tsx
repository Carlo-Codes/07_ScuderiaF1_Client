import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import {config} from './amplify/amplifyconfiguration'

Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator signUpAttributes={['preferred_username']}>
    {({ signOut, user }) => (
        <App signOut={signOut!} user={user}></App>
      )}
    </Authenticator>
    
  </React.StrictMode>,
)
