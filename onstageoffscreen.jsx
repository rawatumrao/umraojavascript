import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { IoMdMicOff, IoMdMic } from "react-icons/io";
import { BsCameraVideoOffFill, BsCameraVideoFill } from "react-icons/bs";

import "./onstageoffscreen.css";

/* const initialData = {
  onStage: [
    {
      id: "1",
      content: "Samantha Taylor",
      muted: true,
      videoOff: true,
      host: false,
    },
    {
      id: "2",
      content: "Jennifer Garcia ",
      muted: false,
      videoOff: false,
      host: true,
    },
    {
      id: "3",
      content: "Olivia Anderson",
      muted: true,
      videoOff: true,
      host: false,
    },
  ],
  offScreen: [
    {
      id: "4",
      content: "Omar Hasan",
      muted: true,
      videoOff: true,
      host: false,
    },
    {
      id: "5",
      content: "Shannon Jackson",
      muted: true,
      videoOff: true,
      host: false,
    },
    {
      id: "6",
      content: "Catherine Davis",
      muted: true,
      videoOff: true,
      host: false,
    },
    {
      id: "7",
      content: "Georgia Thompson",
      muted: true,
      videoOff: true,
      host: false,
    },
    {
      id: "8",
      content: "Melody Williams",
      muted: true,
      videoOff: true,
      host: false,
    },
  ],
};
*/
const OnStageOffScreen = ({participantsArray}) => {

  console.log("participantsArray data is here :", participantsArray);

  const [data, setData] = useState(participantsArray);
  
  const [onStageItems, setOnStageItems] = useState([])
  const [offScreenItems, setOffScreenItems] = useState([])

  useEffect(()=> {
    const loadItems =() => {
      const onStage = data.filter((item)=>item.spotlightOrder !== 0).sort((a,b)=>a.spotlightOrder - b.spotlightOrder);
      const offScreen = data.filter((item)=>item.spotlightOrder === 0);
      setOnStageItems(onStage);
      setOffScreenItems(offScreen);
    }
    loadItems();
  }, []);

  const moveItem = (id, newSpotlightOrder) => {
    const item = [...onStageItems, ...offScreenItems].find((item)=> item.uuid ===id);
    if(item) {
      const updatedItem = {...item, spotlightOrder: newSpotlightOrder};
        // Sinulate API call to update spotlightOrder
        console.log(`Updated item ${id} to spotlightOrder ${newSpotlightOrder}`);
      
      if(newSpotlightOrder === 0){
        setOffScreenItems((prev)=> [...prev, updatedItem]);
        setOnStageItems((prev) => prev.filter((i)=> i.id !==id).sort((a,b)=> a.spotlightOrder - b.spotlightOrder));

      }else{
        setOnStageItems((prev)=> [...prev, updatedItem].sort((a,b)=> a.spotlightOrder - b.spotlightOrder));
        setOffScreenItems((prev) => prev.filter((i)=> i.id !==id));
      }

    }
  }
  
  
  
  
  
  const [onStageOpen, setOnStageOpen] = useState(true);
  const [offScreenOpen, setOffScreenOpen] = useState(true);

  const [isMicMuted, setIsMicMuted] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(true);


  

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
  };

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    //Dropped outside the list
    if (!destination) {
      return;
    }
    const sourceClone = Array.from(data[source.droppableId]);
    const destClone = Array.from(data[destination.droppableId]);
    const [removed] = sourceClone.splice(source.index, 1);

    destClone.splice(destination.index, 0, removed);

    setData({
      ...data,
      [source.droppableId]: sourceClone,
      [destination.droppableId]: destClone,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="list-container">
          <h3 onClick={() => setOnStageOpen(!onStageOpen)}>
            {" "}
            {onStageOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
            On Stage
          </h3>
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
                          <span className="item-content">{item.displayName}</span>
                          <span className="">
                            { (
                              <span className="icon" onClick={toggleMic}>
                                {item.isMuted ? <IoMdMicOff color="red" /> : <IoMdMic color="green"/>}
                              </span>
                            )}
                            { (
                              <span className="icon" onClick={toggleCamera}>
                                {item.isCameraMuted ? (
                                  <BsCameraVideoOffFill color="red"/>
                                ) : (
                                  <BsCameraVideoFill color="green"/>
                                )}
                              </span>
                            )}
                            {item.role === "chair" && <span className="host">/Host</span>}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          )}
        </div>
        <div className="list-container">
          <h3 onClick={() => setOffScreenOpen(!offScreenOpen)}>
            {" "}
            {offScreenOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
            Off Screen
          </h3>
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
                          {item.displayName}
                          { (
                            <span className="icon" onClick={toggleMic}>
                              {item.isMuted ? <IoMdMicOff color="red" /> : <IoMdMic color="green"/>}
                            </span>
                          )}
                          {  (
                            <span className="icon" onClick={toggleCamera}>
                              {item.isCameraMuted ? (
                                <BsCameraVideoOffFill color="red"/>
                              ) : (
                                <BsCameraVideoFill color="green"/>
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default OnStageOffScreen;
