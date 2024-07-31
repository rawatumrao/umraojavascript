import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoMdMicOff, IoMdMic } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { BsCameraVideoOffFill, BsCameraVideoFill } from "react-icons/bs";
import "./onstageoffscreen.css";
// import { setParticipantToLayoutGroup, clearParticipantFromLayoutGroup } from "../../../utils/fetchRequests";

const numberToWords = (num) => {
  const words = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
  ];
  return words[num - 1] || "unknown";
};

const OnStageOffScreen = ({ participantsArray, setParticipantsArray }) => {
  const [onStageItems, setOnStageItems] = useState([]);
  const [offScreenItems, setOffScreenItems] = useState([]);
  const [data, setData] = useState(participantsArray);

  useEffect(() => {
    const loadItems = () => {
      try {
        const onStage = data.filter((item) => {
          if (item.layout_group === undefined) {
            throw new Error("layout_group is undefined");
          }
          return (
            item.layout_group !== "" &&
            item.layout_group !== null &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
          );
        });
        
        const offScreen = data.filter((item) => {
          if (item.layout_group === undefined) {
            throw new Error("layout_group is undefined");
          }
          return (
            (item.layout_group === "" || item.layout_group === null) &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
          );
        });
        
        setOnStageItems(onStage);
        setOffScreenItems(offScreen);
      } catch (error) {
        console.error("Error processing data: ", error.message);
      }
    };
    loadItems();
  }, [data]);

  const updateLayoutGroups = (list, groupPrefix) => {
    return list.map((item, index) => ({
      ...item,
      layout_group: numberToWords(index + 1),
    }));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let updatedOnStageItems = [...onStageItems];
    let updatedOffScreenItems = [...offScreenItems];

    const sourceList =
      source.droppableId === "onStage"
        ? updatedOnStageItems
        : updatedOffScreenItems;
    const destList =
      destination.droppableId === "onStage"
        ? updatedOnStageItems
        : updatedOffScreenItems;

    const [movedItem] = sourceList.splice(source.index, 1);
    // Set Layout_group for the moved item
    if (source.droppableId !== destination.droppableId) {
      movedItem.layout_group =
        destination.draggableId === "onStage" ? numberToWords(1) : "";
    }

    destList.splice(destination.index, 0, movedItem);

    // Recalculate layout_group for the onStageItems
    if (destination.droppableId === "onStage") {
      updatedOnStageItems = updateLayoutGroups(destList, "onStage");
      setOnStageItems(updatedOnStageItems);
      // setOffScreenItems(updatedOffScreenItems);
    } else {
      // If Moving to offScreen, reset layout_group to empty
      updatedOffScreenItems = destList.map((item) => ({
        ...item,
        layout_group: "",
      }));
      setOffScreenItems(updatedOffScreenItems);
      // setOnStageItems(updatedOnStageItems);
    }

    //Recalculate layout_group for the onStage items if needed
    const undatedOnStageAfterRemoval = updateLayoutGroups(
      updatedOnStageItems,
      "onStage"
    );
    setOnStageItems(undatedOnStageAfterRemoval);

    const updatedData = [
      ...undatedOnStageAfterRemoval,
      ...updatedOffScreenItems,
    ];

    setData(updatedData);
    setParticipantsArray(updatedData); //Update the parent state with new data
    localStorage.setItem("participants", JSON.stringify(updatedData)); // Persist to localstorage
  };

  const [onStageOpen, setOnStageOpen] = useState(false);
  const [offScreenOpen, setOffScreenOpen] = useState(false);

  const toggleMic = (uuid) => {
    const updatedParticipants = participantsArray.map((participant) => {
      if (participant.uuid === uuid) {
        return { ...participant, isMuted: !participant.isMuted };
      }
      return participant;
    });
    setData(updatedParticipants);
    setParticipantsArray(updatedParticipants);
    localStorage.setItem("participants", JSON.stringify(updatedParticipants)); //persist to local storage
  };

  const toggleCamera = (uuid) => {
    const updatedParticipants = participantsArray.map((participant) => {
      if (participant.uuid === uuid) {
        return { ...participant, isCameraMuted: !participant.isCameraMuted };
      }
      return participant;
    });
    setData(updatedParticipants);
    setParticipantsArray(updatedParticipants);
    localStorage.setItem("participants", JSON.stringify(updatedParticipants)); //persist to local storage
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div className="list-container">
          <h4 onClick={() => setOnStageOpen(!onStageOpen)}>
            {onStageOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
            On Stage
          </h4>
          {onStageOpen && (
            <Droppable droppableId="onStage">
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {onStageItems.map((item, index) => (
                    <Draggable
                      key={item.uuid}
                      draggableId={item.uuid}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          <span className="item-content">
                            {item.displayName}
                          </span>
                          <span className="">
                            <span
                              className="icon"
                              onClick={() => toggleMic(item.uuid)}
                            >
                              {item.isMuted ? (
                                <IoMdMicOff color="red" />
                              ) : (
                                <IoMdMic color="green" />
                              )}
                            </span>
                            <span
                              className="icon"
                              onClick={() => toggleCamera(item.uuid)}
                            >
                              {item.isCameraMuted ? (
                                <BsCameraVideoOffFill color="red" />
                              ) : (
                                <BsCameraVideoFill color="green" />
                              )}
                            </span>
                            {item.role === "chair" && (
                              <>
                                <FaUserTie color="blue" />
                                Host
                              </>
                            )}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
        <div className="list-container">
          <h4 onClick={() => setOffScreenOpen(!offScreenOpen)}>
            {offScreenOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
            Off Screen
          </h4>
          {offScreenOpen && (
            <Droppable droppableId="offScreen">
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {offScreenItems.map((item, index) => (
                    <Draggable
                      key={item.uuid}
                      draggableId={item.uuid}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          <span className="item-content">
                            {item.displayName}
                          </span>
                          <span
                            className="icon"
                            onClick={() => toggleMic(item.uuid)}
                          >
                            {item.isMuted ? (
                              <IoMdMicOff color="red" />
                            ) : (
                              <IoMdMic color="green" />
                            )}
                          </span>
                          <span
                            className="icon"
                            onClick={() => toggleCamera(item.uuid)}
                          >
                            {item.isCameraMuted ? (
                              <BsCameraVideoOffFill color="red" />
                            ) : (
                              <BsCameraVideoFill color="green" />
                            )}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

OnStageOffScreen.propTypes = {
  participantsArray: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      spotlightOrder: PropTypes.number.isRequired,
      protocol: PropTypes.string,
      isMuted: PropTypes.bool,
      isCameraMuted: PropTypes.bool,
      role: PropTypes.string,
    })
  ).isRequired,
  setParticipantsArray: PropTypes.func.isRequired,
};

export default OnStageOffScreen;
