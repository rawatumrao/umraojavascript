import "./App.css";
import ComponentWrapper from "./components/common/ComponentWrapper.jsx";
import ViewAllLayout from "./components/layout/viewalllayout/viewalllayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  EVENTS,
  INITIAL_TOKEN,
  INITIAL_PARTICIPANT,
  ENV,
  ENVIRONMENT,
  VB_URI_NAME,
  ROLES,
} from "./config/constants.js";
import { AppContext } from "././contexts/context";
import { createData } from "././utils/processJsonData";
import {
  fetchParticipants,
  transformLayout,
  participantSpotlightOn,
  participantSpotlightOff,
  setParticipantToLayoutGroup,
  clearParticipantFromLayoutGroup,
  clearPinningConfig,
} from "./utils/fetchRequests.js";

const findRoleOfUser = (users) => {
  let amIaHost = false;
  users.map((user) => {
    if (VB_URI_NAME === user.uri && user.role === ROLES.chair) amIaHost = true;
  });
  return amIaHost;
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key, initialValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initialValue;
};

// const callSetLayoutAPI = async (itemId) => {
//   try{
//     const response = await setParticipantToLayoutGroup({
//       uuid: itemId,
//       body: { "layout_group": "seven" },
//     });
//     if(!response.ok){
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     console.log("setLayout response : ", result);
//   }catch(error) {
//     console.log("Failed to set layout: ", error);
//   }
// };

// const callReduceLayoutAPI = async (itemId) => {
//   try{
//     const response = await clearParticipantFromLayoutGroup({
//       uuid: itemId,
//       body: { "layout_group": "seven" },
//     });
//     if(!response.ok){
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     console.log("setLayout response : ", result);
//   }catch(error) {
//     console.log("Failed to set layout: ", error);
//   }
// };




function App() {
  const [presenterLayout, setPresenterLayout] = useState(null);
  const [presenterAllLayout, setPresenterAllLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);
  const [voiceActivated, setVoiceActivated] = useState(true);
  let [participantsArray, setParticipantsArray] = useState(
    loadFromLocalStorage("participants", createData(INITIAL_PARTICIPANT))
  );
  const [initialParticipantsArray, setInitialParticipantsArray] =
    useState(participantsArray);
  const Data = useRef({ token: INITIAL_TOKEN });

  useEffect(() => {
    saveToLocalStorage("participants", participantsArray);
  }, [participantsArray]);

  

  // Setting up presenter and media layout by clicking on apply button

  const handleApplyClick = useCallback(async () => {
   // let hasChanges = false;
    try {
      if(!voiceActivated){
        const response = await clearPinningConfig();
      if(!response.ok){
        throw new Error("Network clearPinningConfigresponse is not ok");
      }
      const result = await response.json();
      console.log("Called clearPinningConfig API response: ", result);
      }

      const selectedLayout =
        presenterAllLayout !== null ? presenterAllLayout : presenterLayout;

      if (selectedLayout !== null) {
        const response = await transformLayout({
          token: Data.current.token,
          body: { transforms: { layout: selectedLayout } },
        });

        if (response.ok) {
          console.log("Transform Layout successfully", response);
        } else {
          console.log("There is some network issue during Transform Layout : ", response);
        }
      //  hasChanges = true;
      }

      const participantsChanges = participantsArray.filter((participant) => {
        const initialParticipant = initialParticipantsArray.find(
          (p) => p.uuid === participant.uuid
        );
        return (
          initialParticipant &&
          initialParticipant.layout_group !== participant.layout_group
        );
      });

      // Make mecessary API calls to update participant's Layout_group values
      if (participantsChanges.length > 0) {
       // hasChanges = true;
        for (const participant of participantsArray) {
          if (participant.layout_group > 0) {
            //await callSetLayoutAPI(participant.uuid);
            await setParticipantToLayoutGroup({
              uuid: participant.uuid,
              token: Data.current.token,
              layoutgroup: participant.layout_group,
            });

            // await participantSpotlightOn({
            //   uuid: participant.uuid,
            //   token: Data.current.token,
            // });
            
            
          } else {
            //await callReduceLayoutAPI(participant.uuid);
            await clearParticipantFromLayoutGroup({
              uuid: participant.uuid,
              token: Data.current.token,
              layoutgroup: "",
            });
            // await participantSpotlightOff({
            //   uuid: participant.uuid,
            //   token: Data.current.token,
            // });
           
          }
        }
        console.log("Participant layout_group data updated successfully");
      }

      // if (hasChanges) {
      //   console.log("Changes are applied successfully");
      // } else {
      //   console.log("No changes to apply");
      // }
    } catch (e) {
      console.log("Error during apply changes : ", e);
    }
  }, [voiceActivated, presenterLayout, presenterAllLayout, participantsArray, initialParticipantsArray,]);

  useEffect(() => {
    const fetchInitialParticipants = async () => {
      try {
        let data = await fetchParticipants({
          token: Data.current.token,
        });
        let updatedData = createData(data.result);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
        setInitialParticipantsArray(updatedData);
      } catch (error) {
        console.error("Error Fetching participants: ", error);
      }
    };

    if (ENV === ENVIRONMENT.prod) {
      fetchInitialParticipants();
    }
    // get server sent events on pexip broadcast channel
    const bc = new BroadcastChannel("pexip");
    bc.onmessage = (msg) => {
      console.log(msg.data);
      console.log(
        `%c ****************************`,
        `color: red; font-weight: bold;`
      );

      if (msg.data.event === EVENTS.token_refresh) {
        Data.current = {
          token: msg.data.info,
        };
        console.log(msg.data);
      } else if (msg.data.event === EVENTS.participants) {
        let updatedData = createData(msg.data.info.participants);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
        setInitialParticipantsArray(updatedData); // Save initial state
        console.log(msg.data.info.participants);
      }
    };
  }, []);

  const handlePresenterLayoutChange = (layout) => {
    setPresenterLayout(layout);
    setPresenterAllLayout(null); // Clear the other selection
  };

  const handlePresenterAllLayoutChange = (layout) => {
    setPresenterAllLayout(layout);
    setPresenterLayout(null); // Clear the other selection
  };

  return (
    <>
      <AppContext.Provider
        value={{
          presenterLayout,
          setPresenterLayout,
          mediaLayout,
          setMediaLayout,
          participantsArray,
          setParticipantsArray,
          voiceActivated,
          setVoiceActivated,
          Data,
        }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ComponentWrapper
                    participantsArray={participantsArray}
                    pLayout={handlePresenterLayoutChange}
                    mLayout={setMediaLayout}
                    setParticipantsArray={setParticipantsArray}
                  />
                  <button className="btn" onClick={handleApplyClick}>
                    Apply
                  </button>
                </>
              }
            />
            <Route path="/view-all" element={<ViewAllLayout  setPresenterAllLayout={handlePresenterAllLayoutChange}/>} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
