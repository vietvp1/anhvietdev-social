import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../profile/Profile';
import FriendList from '../friend_lists/FriendList';
import Group from '../group/Group';
import ProfileImage from '../profile-image/ProfileImage'
import ProfileVideo from '../profile-video/ProfileVideo'
import ProfileEvent from '../profile-event/ProfileEvent'
import Notification from '../notification/Notification';
import Files from '../files/Files';
import FriendRequest from '../friend-request/FriendRequest';
import Chat from '../chat/Chat';
import BirthDay from '../birth-day/BirthDay';
import Calendar from '../calendar/Calendar';
import Weather from '../weather/Weather';
import EmailCompose from '../email/EmailCompose';
import SignIn from '../authentication/SignIn';
import SignUp from '../authentication/SignUp';
import LockScreen from '../authentication/LockScreen';
import ConfirmMail from '../authentication/ConfirmMail';
import PageError404 from '../pages/axtra-pages/PageError404';
import PageError500 from '../pages/axtra-pages/PageError500';
import PrivateRoute from './PrivateRoute';
import { createBrowserHistory as createHistory } from 'history'
import Home from '../home/Home';
import ForgotPassword from '../authentication/ForgotPassword';
import ResetPassword from '../authentication/ResetPassword';
import GroupProfile from '../groupProfile/GroupProfile';
export const history = createHistory();

const Root = () => (
  <Switch>
    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute exact path='/profile/:id' component={Profile}/>
    <PrivateRoute exact path='/friend-list' component={FriendList} />
    <PrivateRoute exact path='/group' component={Group} />
    <PrivateRoute exact path='/group/:id' component={GroupProfile} />
    <PrivateRoute exact path='/profile-images' component={ProfileImage} />
    <PrivateRoute exact path='/profile-video' component={ProfileVideo} />
    <PrivateRoute exact path='/profile-event' component={ProfileEvent} />
    <PrivateRoute exact path='/notification' component={Notification} />
    <PrivateRoute exact path='/files' component={Files} />
    <PrivateRoute exact path='/friend-request' component={FriendRequest}/>
    <PrivateRoute exact path='/chat' component={Chat} />
    <PrivateRoute exact path='/chat/:id' component={Chat}/>
    <PrivateRoute exact path='/birthday' component={BirthDay} />
    <PrivateRoute exact path='/calendar' component={Calendar} />
    <PrivateRoute exact path='/weather' component={Weather} />
    <PrivateRoute exact path='/email-compose' component={EmailCompose} />
    <Route exact path='/sign-in' component={SignIn} />
    <Route exact path='/sign-up' component={SignUp} />
    <Route exact path='/lock-screen' component={LockScreen} />
    <Route exact path='/confirm-mail' component={ConfirmMail} />
    <Route exact path='/forgot-password' component={ForgotPassword} />
    <Route exact path="/reset-password/:token" component={ResetPassword} />
    <Route exact path='/page-error-500' component={PageError500} />
    <Route component={PageError404} />
  </Switch>
);

const Routes = () => {
  return (
      <Root history={history}/>
  );
};

export default Routes;