import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { SignUpPage } from './pages/signUpPage/signUpPage';
import { apiSportsDriver } from '@backend/apiSportsResponseTypes';
import { TeamCreationPage } from './pages/teamPages/teamCreationPage';
import { LeagueRankingPage } from './pages/leagueRankingPage/leagueRankingPage';
import { League, Team } from '@backend/dbTypes';
import { TeamPointPage } from './pages/teamPages/teamPointsPage';
import { LeaguePage } from './pages/LeaguePage/leaguePage';
import { NavBar } from './Util/UI/navBar/navBar';
import { dataResponse } from '@backend/HTTPtypes';
import { login, refreshToken } from './apis/auth';
import { getData } from './apis/user';
import { AuthenticationResultType, } from '@aws-sdk/client-cognito-identity-provider';
import { TeamPageBase } from './pages/teamPages/teamPageBase';
import { AccountPage } from './pages/accountPage/accountPage';

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

export function App() {
  const [LogInState, setLogin] = useState(false);
  const [state, setState] = useState(States.Team);
  const [userData, setUserData] = useState<dataResponse>();
  const [authenticationResult, setauthenticationResult] = useState<AuthenticationResultType>();
  const [errorState, setErrorState] = useState<string>();

  useEffect(() => { //download user data from sever when page loads
    initGetData();
  }, [authenticationResult]);

  useEffect(() => {
    loginWithStorageData();
  }, []);

  const loginWithStorageData = () => {
    if (!authenticationResult) {
      const auth = localStorage.getItem('authentication');
      const loginDate = Number(localStorage.getItem('loginDate'));
      if (auth && loginDate) {
        const parsed_auth = JSON.parse(auth) as AuthenticationResultType;
        setauthenticationResult(parsed_auth);
      }
    }
  };
  const stateChanger = (state: States) => {
    setState(state);
  };

  function initAccessToken(auth: AuthenticationResultType | undefined) {
    setauthenticationResult(auth);
  }

  const initGetData = async () => {
    try {
      if (authenticationResult?.AccessToken) {
        const res = await getData(authenticationResult.AccessToken);
        if (typeof res == 'string') {
          setErrorState(res);
          return;
        }
        setUserData(res);
        setLogin(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLogin(false);
        initRefreshToken();
        setErrorState(err.message);
      }
    }
  };


  const initRefreshToken = async () => {
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
    }
  };




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

  if (state == States.Home) {

  }
  if (userData && authenticationResult) {
    if (state == States.Leagues) {
      page = <LeaguePage userData={userData} authentication={authenticationResult} reloadData={initGetData}></LeaguePage>;
    }

    if (state == States.Account) {
      page = <AccountPage userData={userData} authentication={authenticationResult} reloadData={initGetData} setLogin={setLogin}></AccountPage>;
    }

    if (state == States.Team) {
      page = <TeamPageBase userData={userData} authData={authenticationResult} setUserData={setUserData} reloadData={initGetData}></TeamPageBase>;
    }
  }

  if (LogInState) {
    return (
      <>
        <NavBar navItems={navItems}>
          {page}
        </NavBar>
      </>
    );
  } else {
    return (
      <SignUpPage setAppAccessToken={initAccessToken} setLoginStatus={setLogin} getInitialData={initGetData}></SignUpPage>
    );
  }
}


