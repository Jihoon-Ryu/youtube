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
const ME = "/users/me";

//videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/videos/:id";
const EDIT_VIDEO = "/videos/:id/edit";
const UPLOAD = "/videos/upload";
const DELETE_VIDEO = "/videos/:id/delete";

//Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//Facebook

const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

//API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/delete_comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT,
};

export default routes;
