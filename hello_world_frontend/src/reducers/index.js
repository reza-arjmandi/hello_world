import { combineReducers } from 'redux';
import AddNewResourceDialogVisibility from './AddNewResourceDialogVisibility';
import Videos from './Videos';
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
import Email from './Email';
import PageNumber from './PageNumber';
import AuthToken from './AuthToken';
import LoginDialogVisibility from './LoginDialogVisibility';
import LoginStep from './LoginStep';
import LoginRequestResult from './LoginRequestResult';
import LoginRequestIsFetching from './LoginRequestIsFetching';
import IsFetchingProfileRequest from './IsFetchingProfileRequest';
import ProfileInfo from './ProfileInfo';
import IsFetchingProfileRequestSucceeded from './IsFetchingProfileRequestSucceeded';
import BlogPosts from './BlogPosts';
import ProfileAvatar from './ProfileAvatar';
import EnglishClasses from './EnglishClasses';
import SelectedEnglishClass from './SelectedEnglishClass';
import Subscriptions from './Subscriptions';

const root_reducer = combineReducers({ 
    AddNewResourceDialogVisibility,
    Videos,
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
    Email,
    PageNumber,
    AuthToken,
    LoginDialogVisibility,
    LoginStep,
    LoginRequestResult,
    LoginRequestIsFetching,
    IsFetchingProfileRequest,
    ProfileInfo,
    IsFetchingProfileRequestSucceeded,
    BlogPosts,
    ProfileAvatar,
    EnglishClasses,
    SelectedEnglishClass,
    Subscriptions,
 });

export default root_reducer;