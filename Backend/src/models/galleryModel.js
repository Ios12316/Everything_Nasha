import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true // Base64 encoded string or external file URL
    },
    type: {
        type: String,
        required: true,
        enum: ["image", "video"]
    },
    caption: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
