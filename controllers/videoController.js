
// import {videos} from "../db"
import routes from "../routes"
import Video from "../models/Video";

// export const home = (req, res) => {
//         res.render("home", {pageTitle:"HOME", videos})
// }

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({_id:-1});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req,res) =>{
    const {
        query:{term: searchingBy}
    } = req;
    let videos=[];
    try {
      videos = await Video.find({
        title:{$regex: searchingBy, $options: "i"}
      })
    } catch (error) {
      console.log(error)
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}


//getUpload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
//postUpload
export const postUpload = async(req, res) => {
const {
    body: {title, description },
    file:{path}
  } = req;
  console.log(req.body.title)
  console.log(req.body.description)
  // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl:path,
    title,
    description
  })
  res.redirect(routes.videoDetail(newVideo.id));//무얼넘기냐 => newVideo.id
};


export const videoDetail = async (req,res)=>{
  const{
    params:{id}
  }=req;
  try{
    const video = await Video.findById(id);
    res.render("videoDetail", {pageTitle:video.title, video})
  }catch(error){
    res.redirect(routes.home)
  }
}

// export const editVideo = (req, res) =>
//   res.render("editVideo", { pageTitle: "Edit Video" });

export const getEditVideo = async(req,res)=>{
  const{
    params:{id}
  }=req;
  try {
    const video = await Video.findById(id)
    res.render("editVideo",{pageTitle:`Edit ${video.title}`,video})
  } catch (error) {
    res.redirect(routes.home);
  }
}
export const postEditVideo = async(req,res)=>{
  const {
    params:{id},
    body:{title,description}
  }=req;
  try {
    await Video.findOneAndUpdate({_id:id},{title,description});
    // console.log("_id is : " + _id)
    // console.log("id is : " + id)
    console.log(req.body.title)
    console.log(req.body.description)
    res.redirect(routes.videoDetail(id))
  } catch (error) {
    res.redirect(routes.home)
  }
}

export const deleteVideo = async(req, res) =>{
    const{
      params:{id}
    }=req;
    try {
      await Video.findOneAndRemove({_id:id});
      res.redirect(routes.home);
    } catch (error) {
      res.redirect(routes.home)
    }
}
  