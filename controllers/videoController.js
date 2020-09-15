import routes from "../routes";
import Video from "../models/Video";
import { render } from "pug";

export const home = async (req, res) => {
  try {
    const videosdb = await Video.find({});
    res.render("home", { pageTitle: "Home", videosdb: videosdb });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videosdb: [] });
  }
};

export const search = (req, res) => {
  const searchingBy = req.query.term;
  //const {query: {term}} = req
  res.render("search", { pageTitle: "Search", searchingBy, videosdb });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  //req.body.title..
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title: title,
    description: description,
  });

  //console.log(newVideo);

  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
