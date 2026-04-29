import React, { useState } from 'react';
import './CreateFood.css';
import axios from 'axios';

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    video: null,
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        video: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Get video duration
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        setVideoDuration(Math.floor(video.duration));
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const clearVideo = () => {
    setFormData(prev => ({
      ...prev,
      video: null
    }));
    setVideoPreview(null);
    setVideoDuration(null);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("video", formData.video); // MUST MATCH multer field

    const res = await axios.post(
      "http://localhost:3000/api/food/create",
      formDataToSend,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
  }
};

  return (
    <div className="create-food-container">
      <div className="create-food-page">
        <h1 className="page-title">Create New Food Item</h1>
        
        <form className="food-form" onSubmit={handleSubmit}>

          {/* Video Upload Section */}
          <div className="form-section">
            <label className="form-label">Food Video <span className="required">*</span></label>
            <div className="video-upload-wrapper">
              <input
                type="file"
                id="video-input"
                accept="video/*"
                onChange={handleVideoChange}
                className="file-input"
                required
              />
              {!videoPreview ? (
                <label htmlFor="video-input" className="video-upload-label">
                  <div className="video-upload-box">
                    <div className="video-icon-wrapper">
                      <svg className="video-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                    <h3 className="upload-title">Upload Food Video</h3>
                    <p className="upload-description">Drag and drop your video here or click to browse</p>
                    <p className="upload-formats">MP4, WebM, OGG • Max 50MB</p>
                  </div>
                </label>
              ) : (
                <div className="video-preview-box">
                  <div className="video-preview-wrapper">
                    <video className="preview-video" controls>
                      <source src={videoPreview} />
                    </video>
                    <div className="video-info">
                      <span className="video-duration">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14" fill="none" stroke="white" strokeWidth="2"></polyline>
                        </svg>
                        {formatDuration(videoDuration)}
                      </span>
                    </div>
                  </div>
                  <div className="video-actions">
                    <label htmlFor="video-input" className="btn-change-video">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 3 23 13 13 13"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2-8.83"></path>
                      </svg>
                      Change Video
                    </label>
                    <button type="button" onClick={clearVideo} className="btn-remove-video">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div className="form-section">
            <label htmlFor="name" className="form-label">Food Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter food name"
              className="form-input"
              required
            />
          </div>

          {/* Description Input */}
          <div className="form-section">
            <label htmlFor="description" className="form-label">Description <span className="required">*</span></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter food description"
              className="form-textarea"
              rows="5"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="btn-submit">Create Food Item</button>
            <button type="reset" className="btn-reset">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;