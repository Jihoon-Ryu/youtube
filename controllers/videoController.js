import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// Home

export const home = async (req, res) => {
  try {
    const videosdb = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videosdb });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videosdb: [] });
  }
};

export const search = async (req, res) => {
  const searchingBy = req.query.term;
  //const {query: {term : searchingBy}} = req
  let modelVideoDB_search = [];

  try {
    modelVideoDB_search = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    modelVideoDB_search,
  });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  //req.body.title...
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title: title,
    description: description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// Edit Video

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  //왼쪽 : models-Video , 오른쪽 : (input=>)req의 정보
  try {
    await Video.findOneAndUpdate(
      { _id: id },
      { title: title, description: description }
    );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views = video.views + 1;
    //같은의미 video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    //code 400 : "bad request"
    res.end();
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  //comment from addComment.js-sendComment
  try {
    const video = await Video.findById(id);
    const commentUser = await User.findById(user.id);
    //user.id = newComment.creator(id형식)
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      creatorName: user.name,
      creatorAvatarUrl: commentUser.avatarUrl,
    });
    video.comments.push(newComment._id);
    video.save();
    //VideoModel의 comments [ ]
    console.log(newComment.creatorAvatarUrl);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentID },
  } = req;
  //commentID from addComment.js-deleteComment
  try {
    const video = await Video.findById(id);
    await Comment.findOneAndRemove({ _id: commentID });
    video.comments.remove(commentID);
    video.save();
    //VideoModel의 comments [ ]
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
