import routes from "../routes";
import Video from "../models/Video";

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
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
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
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    //왼쪽 : models-Video , 오른쪽 : (input=>)req의 정보
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
    await Video.findOneAndRemove({ _id: id });
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home);
  }
};
