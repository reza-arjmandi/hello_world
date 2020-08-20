import { combineReducers } from 'redux';
import AddNewResourceDialogVisibility from './AddNewResourceDialogVisibility';
import PageData from './PageData';
import IsFetchingResources from './IsFetchingResources';
import Notification from './Notification';
import IsServerStarted from './IsServerStarted';
import IsFetchingServerStatus from './IsFetchingServerStatus';
import MenuTitle from './MenuTitle';
import MenuList from './MenuList';
import MenuIsOpen from './MenuIsOpen';
import IsEnableAddResource from './IsEnableAddResource';
import PostOptions from './PostOptions';
import IsLogin from './IsLogin';
import Profile from './Profile';
import PageNumber from './PageNumber';

const root_reducer = combineReducers({ 
    AddNewResourceDialogVisibility,
    PageData,
    IsFetchingResources,
    Notification,
    IsServerStarted,
    IsFetchingServerStatus,
    MenuTitle,
    MenuList,
    MenuIsOpen,
    IsEnableAddResource,
    PostOptions,
    IsLogin,
    Profile,
    PageNumber,
 });

export default root_reducer;