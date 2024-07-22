import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../mlayout/media.css";
import { images } from "../../../config/imageConstants.js";

const ViewAllLayout = ({ setPresenterAllLayout }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleImageClick = (image) => {
    setPresenterAllLayout(image.layout);
    setSelectedImage(image.layout);
    console.log("You are selecting layout view from allView:", image.layout);
  };

  const categorizeImages = (category) => {
    return images.filter((image) => image.layout.startsWith(category));
  };

  const adaptiveImages = categorizeImages("4:3");
  const speakerFocusedImages = categorizeImages("1:");
  const equalSizeImages = categorizeImages("2:");
  const largeGroupImages = categorizeImages("2:18");

  return (
    <div className="view-all-layout">
      <span className="link-text" onClick={handleBackClick}>
        &lt; Back
      </span>
      <div className="layouts">
        <div>
          <span className="text-style"> Adaptive</span>
          <div className="gridContainer">
            {adaptiveImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  className={`image ${selectedImage === image.layout ? "selected" : ""}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-style"> Speaker Focused</span>
          <div className="gridContainer">
            {speakerFocusedImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  className={`image ${selectedImage === image.layout ? "selected" : ""}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-style"> Equal Size</span>
          <div className="gridContainer">
            {equalSizeImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  className={`image ${selectedImage === image.layout ? "selected" : ""}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-style"> Large Group</span>
          <div className="gridContainer">
            {largeGroupImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  className={`image ${selectedImage === image.layout ? "selected" : ""}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllLayout;
