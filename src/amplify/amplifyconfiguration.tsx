import {ResourcesConfig } from 'aws-amplify';

export const config:ResourcesConfig = {
    Auth: {
    Cognito: {
      userPoolClientId: '354o62i1fdq4lh8eg9broksk1m',
      userPoolId: 'eu-north-1_Dqd2bccTT',
       loginWith:{
        email:true
       } 
      }
    }
  }