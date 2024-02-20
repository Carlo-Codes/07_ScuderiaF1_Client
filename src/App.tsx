import React, { useEffect, useState } from 'react';
import './App.css';
import { LeaguePage } from './pages/LeaguePage/leaguePage';
import { NavBar } from './Util/UI/navBar/navBar';
import { dataResponse } from '@backend/HTTPtypes';
import { getData } from './apis/user';
import { TeamPageBase } from './pages/teamPages/teamPageBase';
import { AccountPage } from './pages/accountPage/accountPage';
import { fetchAuthSession } from '@aws-amplify/auth';
import { Amplify, } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {AuthUser} from 'aws-amplify/auth'
import {AuthEventData} from '@aws-amplify/ui'
import {config} from './amplify/amplifyconfiguration'

Amplify.configure(config);

export interface navItemInterface {
  name: States,
  stateChanger: (state: States) => void;
}

export enum States {
  LoginLoading = 'LoginLoading',
  Home = 'Home',
  Leagues = 'Leagues',
  Account = 'Account',
  Team = 'Team',

}

function App(props:{signOut:(data?: AuthEventData | undefined) => void, user:AuthUser|undefined}) {
  const [state, setState] = useState(States.Team);
  const [userData, setUserData] = useState<dataResponse>();
  const [accessToken, setAccesstoken] = useState<string>();

  useEffect(() => { //download user data from sever when page loads
    
    initGetData();
  },[accessToken]);

  function signOutApp(){
    if(props.signOut){
      props.signOut();
    }
  }

/*   const loginWithStorageData = () => {
    if (!authenticationResult) {
      const auth = localStorage.getItem('authentication');
      const loginDate = Number(localStorage.getItem('loginDate'));
      if (auth && loginDate) {
        const parsed_auth = JSON.parse(auth) as AuthenticationResultType;
        setauthenticationResult(parsed_auth);
      }
    }
  }; */
  const stateChanger = (state: States) => {
    setState(state);
  };

/*   function initAccessToken(auth: AuthenticationResultType | undefined) {
    setauthenticationResult(auth);
  } */

  const initGetData = async () => {
    try {
      if (props.user) {
        const session = await fetchAuthSession()
        setAccesstoken(session.tokens?.accessToken.toString())
        const res = await getData(accessToken!);
      
        if (typeof res == 'string') {
          console.log(res);
          return;
        }
        setUserData(res);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }}
  


/*   const initRefreshToken = async () => {
    try {
      if (authenticationResult?.RefreshToken) {
        const res = await refreshToken(authenticationResult.RefreshToken);
        if (typeof res == 'string') {
          setErrorState(res);
          return;
        }
        setauthenticationResult(res);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
        setauthenticationResult(undefined);
        setLogin(false);
        localStorage.removeItem('authentication');
        localStorage.removeItem('loginDate');
        setErrorState(err.message);
      }
    } }*/




  const navItems: navItemInterface[] = [
/*     {
      name: States.Home,
      stateChanger: stateChanger
    }, */
    {
      name: States.Leagues,
      stateChanger: stateChanger
    },
    {
      name: States.Team,
      stateChanger: stateChanger
    },
    {
      name: States.Account,
      stateChanger: stateChanger
    },

  ];

  let page: React.ReactNode;


  if (userData && accessToken) {
    if (state == States.Leagues) {
      page = <LeaguePage userData={userData} authentication={accessToken} reloadData={initGetData}></LeaguePage>;
    }

    if (state == States.Account) {
      page = <AccountPage userData={userData} authentication={accessToken} reloadData={initGetData} signout={signOutApp}></AccountPage>;
    }

    if (state == States.Team) {
      page = <TeamPageBase userData={userData} authData={accessToken} setUserData={setUserData} reloadData={initGetData}></TeamPageBase>;
    }
  }


  return (
    <>
      <NavBar navItems={navItems}>
        {page}
      </NavBar>
    </>
  );
  
}


export default withAuthenticator(App);