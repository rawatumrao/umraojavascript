import React, { useState } from "react";
import "./presenter.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const images = [
  {layout: "", imageUrl: "./images/viewall/Adaptive1.PNG", Descrption: ""},
  {layout: "1:0", imageUrl: "./images/viewall/sf1.PNG", Descrption: "main speaker only"},
  {layout: "1:1", imageUrl: "./images/viewall/sf2.PNG", Descrption: "main speaker and up to 1 previous speakers"},
  {layout: "1:7", imageUrl: "./images/viewall/sf3.PNG", Descrption: "main speaker and up to 7 previous speakers"},
  {layout: "2:0", imageUrl: "./images/viewall/es1.PNG", Descrption: "2 main speakers only"},
  {layout: "3:0", imageUrl: "./images/viewall/es2.PNG", Descrption: "3 main speakers only"},
  {layout: "4:0", imageUrl: "./images/viewall/es3.PNG", Descrption: "2x2 layout, up to a maximum of 4 speakers"},
  {layout: "9:0", imageUrl: "./images/viewall/es4.PNG", Descrption: "3x3 layout, up to a maximum of 9 speakers"},
  {layout: "16:0", imageUrl: "./images/viewall/es5.PNG", Descrption: "4x4 layout, up to a maximum of 16 speakers"},
  {layout: "20:0", imageUrl: "./images/viewall/es6.PNG", Descrption: "4x5 layout, up to a maximum of 20 speakers"},
  {layout: "2:18", imageUrl: "./images/viewall/lg1.PNG", Descrption: "two main speakers and up to 18 other participants"},
  {layout: "2:8", imageUrl: "./images/viewall/lg2.PNG", Descrption: "two main speakers and up to 8 other participants"},
  {layout: "1:9", imageUrl: "./images/viewall/lg3.PNG", Descrption: "one main speaker and up to 9 other participants"},
  {layout: "1:18", imageUrl: "./images/viewall/lg4.PNG", Descrption: "one main speakers and up to 18 other participants"},
  {layout: "1:12", imageUrl: "./images/viewall/lg5.PNG", Descrption: "large main speaker and up to 12 other participants"},
  {layout: "1:19", imageUrl: "./images/viewall/lg6.PNG", Descrption: "one main speakers and up to 19 other participants"},
];

const Presenter = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

const handleImageClick = (image) => {
  setSelectedImage(image);
}
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
              <MdOutlineKeyboardArrowRight /> Presenter Layout
            </button>
            <span className="">
              <img className="imagess" src="./images/presenterhead.png"></img>
            </span>
          </>
        ) : (
          <>
            <button className="collapse-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowDown /> Presenter Layout
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
              .map((src, index) => (
                <img
                  key={index}
                  src={src.imageUrl}
                  alt={`Image ${index + 1}`}
                  onClick={()=>handleImageClick(src)}
                  className = "zoom-image"
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

export default Presenter;
