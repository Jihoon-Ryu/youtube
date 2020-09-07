//Global 전역
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//users
const USERS = "/users";
const USER_DETAIL = "/users/:id";
const EDIT_PROFILE = "/users/:id/edit-profile";
const CHANGE_PASSWORD = "/users/:id/change-password";

//videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/videos/:id";
const EDIT_VIDEO = "/videos/:id/edit";
const UPLOAD = "/videos/upload";
const DELETE_VIDEO = "/videos/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: VIDEO_DETAIL,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default routes;
