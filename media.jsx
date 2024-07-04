import React, { useState } from "react";
import "./media.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const images = [
  {host_layout: "", imageUrl: "./images/mlayoutmain.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts1.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts2.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts3.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts4.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts5.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts6.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts7.png", Descrption: ""},
  {host_layout: "", imageUrl: "./images/mlayouts8.png", Descrption: ""},
];


const Media = (mLayout) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    mLayout(image);
    axios.post('/api/selectedImage', image).then(response => {
      console.log('Image data posted successfully : ', response.data);
    }).catch(error =>{
      console.error('Error posting image data: ', error);
    });
  };


  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleSeeAllClick = () => {
    navigate("/view-all");
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
        {!expanded ? (
          <>
            <button className="expand-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowRight /> Media Layout
            </button>
            <span className="">
              <img className="imagess" src="./images/main.png"></img>
            </span>
          </>
        ) : (
          <>
            <button className="collapse-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowDown /> Media Layout
            </button>
            <span className="see-all" onClick={handleSeeAllClick}>
              See All
            </span>
          </>
        )}
      </div>
      {expanded && (
        <div className="image-gallery">
          <button className="nav-button" onClick={handlePrev}>
            &lt;
          </button>
          <div className="images">
            {images
              .slice(currentImageIndex, currentImageIndex + 7)
              .map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  onClick={()=>handleImageClick(image)}
                  className = "zoom-image"
                  style={{ border: selectedImage?.imageUrl === image.imageUrl ? '2px solid blue' : 'none'}}

                />
              ))}
          </div>
          <button className="nav-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Media;
