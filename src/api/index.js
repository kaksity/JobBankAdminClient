/* eslint-disable camelcase */
/* eslint-disable max-len  */
import request from './utils';

const authUrls = {
  login: '/login',
  logout: '/logout',
  readMe: '/users/me',
};

const urlPrefix = '/api/common';
const urls = {
  // users
  readUser: '/users/<id>',
  readUsers: '/users',
  createUsers: '/users',
  updateUsers: '/users/<id>',
  deleteUsers: '/users/<id>',

  // tables
  readTablesList: '/tables/list',
};

Object.keys(urls).map((url) => {
  urls[url] = urlPrefix + urls[url];
  return url;
});

export default new function API() {
  // auth
  this.Login = params => request.post('/login', params);
  this.logout = () => request.post(authUrls.logout);
  this.readMe = params => request.get(authUrls.readMe, params);

  // users
  this.readUser = id => request.get(urls.readUser.replace('<id>', id));
  this.readUsers = () => request.get(urls.readUsers, {});
  this.createUsers = params => request.post(urls.createUsers, params);
  this.updateUsers = (id, params) => request.put(urls.updateUsers.replace('<id>', id), params);
  this.deleteUsers = id => request.delete(urls.deleteUsers.replace('<id>', id));

  // table
  // this.readTablesList = () => request.get(urls.readTablesList, {});
  this.GetAllCompletedProfile = (Page, Size) => request.get(`/profile?type=true&page=${Page}&size=${Size}`);
  this.GetAllUncompletedProfile = (Page, Size) => request.get(`/profile?type=false&page=${Page}&size=${Size}`);
  this.GetProfileDetails = id => request.get(`/profile/${id}`);
  this.GenerateCV = id => request.get(`/generate/cv/${id}`);
  this.GetLGA = () => request.get('/lga');
  this.GetHighestQualification = () => request.get('/education-level');
  this.GetSkillSet = () => request.get('/skills');
  this.GetDashBoardData = () => request.get('/dashboard');

  this.GenerateProfileExcelReport = query => request.get(`/generate/user/profile${query}`);
  this.GenerateQualificationExcelReport = query => request.get(`/generate/user/qualifications${query}`);
  this.GenerateSkillSetExcelReport = query => request.get(`/generate/user/skills${query}`);
  this.PutChangePassword = params => request.put('/change-password', params);
}();
