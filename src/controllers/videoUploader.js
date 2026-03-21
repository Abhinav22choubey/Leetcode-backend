const cloudinary = require("cloudinary").v2;
const Problem = require("../Models/problem");
const SolutionVideo = require("../Models/video");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateUploadSignature = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    // Verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    // Generate unique public_id for the video
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `leetcode-solutions/${problemId}/${userId}_${timestamp}`;

    // Upload parameters
    const uploadParams = {
      timestamp: timestamp,
      public_id: publicId,
    };
    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET,
    );
    res.json({
      signature,
      timestamp,
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    });
  } catch (err) {
    console.log("Error : " + err);
    res.status(500).json({
      error: "Failed to generate upload creadentials ",
    });
  }
};

const saveVideoMetadata = async (req, res) => {
  try {
    const { problemId, cloudinaryPublicId, secureUrl, duration } = req.body;
    const userId = req.user._id;

    // Verify the upload with cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      cloudinaryPublicId,
      { resource_type: "video" },
    );
    // console.log(cloudinaryResource)
    if (!cloudinaryResource) {
      return res.status(400).json({ error: "Video not found on cloudinary" });
    }
    // Check if video already exists for this problem and user
    const existingVideo = await SolutionVideo.findOne({
      problemId,
      userId,
      cloudinaryPublicId,
    });
    if (existingVideo) {
      return res.status(409).json({ error: "video not found on Cloudinary" });
    }
    const thumbnailUrl = cloudinary.image(cloudinaryResource.public_id, {
      resource_type: "video",
    });
    // Store in db
    const videoSolution = await SolutionVideo.create({
      problemId,
      userId,
      cloudinaryPublicId,
      secureUrl,
      duration: cloudinaryResource.duration || duration,
      thumbnailUrl,
    });
    res.status(201).json({
      message: "Video solution saved successfully",
      videoSolution: {
        id: videoSolution._id,
        thumbnailUrl: videoSolution.thumbnailUrl,
        duration: videoSolution.duration,
        uploadedAt: videoSolution.createdAt,
      },
    });
  } catch (err) {
    console.error("Error saving video metadata: ", err);
    res.status(500).json({ error: "Failed to save video metadata" });
  }
};

const getVideo = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const Video = await SolutionVideo.findOne({ problemId: problemId }).select("secureUrl thumbnailUrl duration");
    if (!Video) res.status(404).send("Video Not found");
    console.log(Video);
    res.status(200).send(Video);
  } catch (err) {
    res.status(500).send("Error in finding the video : " + err);
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;
    const video = await SolutionVideo.findOneAndDelete({
      problemId: problemId,
    });

    if (!video) {
      return res.status(404).json({
        error: "video not found",
      });
    }
    await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
      resource_type: "video",
      invalidate: true,
    });
    res.json({ message: "Video delete successfully" });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ error: "Failed to delete video" });
  }
};
module.exports = { generateUploadSignature, saveVideoMetadata, deleteVideo,getVideo };
