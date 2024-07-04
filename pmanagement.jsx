import React, { useState } from "react";
import "./pmanagement.css";
import OnStageOffScreen from "./onstageoffscreen.jsx";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Switch from "react-switch";

const PManagement = ({participantsArray}) => {
  const [checked, setChecked] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
        <div className="header">
          <button className="expand-button" onClick={toggleExpandCollapse}>
            {!expanded ? (
              <MdOutlineKeyboardArrowRight />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
            Presenter Management
          </button>
        </div>
      </div>
      {expanded && (
        <div>
          <div>
            <span className="switch-label">
              Voice-Activated
              <div className="toggle-container">
                <span className="toggle-label">OFF</span>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#888"
                  onColor="#00BFFF"
                  onHandleColor="#00BFFF"
                  handleDiameter={20}
                  uncheckedHandleIcon={false}
                  checkedIcon={false}
                  height={20}
                  width={48}
                />
                <span className="toggle-label">ON</span>
              </div>
            </span>
          </div>

          <dev>
            {!checked && <OnStageOffScreen participantsArray={participantsArray}/>}
          </dev>
        </div>
      )}
    </div>
  );
};

export default PManagement;
