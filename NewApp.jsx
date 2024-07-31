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
  setParticipantToLayoutGroup,
  clearParticipantFromLayoutGroup,
  clearPinningConfig,
  setPinningConfig,
} from "./utils/fetchRequests.js";
import {
  getNewPresenterLayout,
  getParticipantsNumber,
} from "./config/imageConstants.js";

const findRoleOfUser = (users) => {
  let amIaHost = false;
  users.map((user) => {
    if (VB_URI_NAME === user.uri && user.role === ROLES.chair) amIaHost = true;
  });
  return amIaHost;
};

const numberToWords = (num) => {
  const words = [
    "pin_01",
    "pin_02",
    "pin_03",
    "pin_04",
    "pin_05",
    "pin_06",
    "pin_07",
    "pin_08",
    "pin_09",
    "pin_10",
    "pin_11",
    "pin_12",
    "pin_13",
    "pin_14",
    "pin_15",
    "pin_16",
    "pin_17",
    "pin_18",
    "pin_19",
    "pin_20",
  ];
  return words[num - 1] || "unknown";
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key, initialValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initialValue;
};

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
      if (!voiceActivated) {
        try {
          const response = await clearPinningConfig({
            token: Data.current.token,
          });

          if (!response.ok) {
            throw new Error("Network clearPinningConfigresponse is not ok");
          }
          const result = await response.json();
          console.log("Called clearPinningConfig API response: ", result);
        } catch (error) {
          console.error("Error message: ", error);
        }
      }

      const selectedLayout =
        presenterAllLayout !== null ? presenterAllLayout : presenterLayout;

      if (selectedLayout !== null) {
        try {
          const response = await transformLayout({
            token: Data.current.token,
            body: { transforms: { layout: selectedLayout } },
          });

          if (response.ok) {
            console.log("Transform Layout successfully", response);
          } else {
            console.log(
              "There is some network issue during Transform Layout : ",
              response
            );
          }
        } catch (error) {
          console.error("Error message: ", error);
        }
        //  hasChanges = true;
      }

      const onStageParticipants = participantsArray.filter((participant) => {
       
        return (
          participant && participant.layout_group !== null && participant.layout_group !== ""
        );
      });

      console.log("onStageParticipants value or data", onStageParticipants);

      const offScreenParticipants = participantsArray.filter((participant) => {
        
        return (
          participant && (participant.layout_group === null ||
            participant.layout_group === "")
        );
      });

      console.log("offScreenParticipants value or data", offScreenParticipants);

      // Make mecessary API calls to update participant's Layout_group values
      let parNumber = onStageParticipants.length;
      if (parNumber > 0) {
        console.log("Participants on onStage count", parNumber);
        try {
          await setPinningConfig({
            token: Data.current.token,
            pinning_config: numberToWords(parNumber),
          });
        } catch (e) {
          console.error("There is error while setting up pinning config");
        }

        if (parNumber > getParticipantsNumber(selectedLayout)) {
          const newLayout = getNewPresenterLayout(parNumber);
          try {
            await transformLayout({
              token: Data.current.token,
              body: { transforms: { layout: newLayout } },
            });
          } catch (e) {
            console.error(
              "There is error to recall tansformLayout due to increased participant in existing presenter layout"
            );
          }
        }

        // hasChanges = true;
        if (onStageParticipants.length > 0) {
          for (const participant of onStageParticipants) {
            //await callSetLayoutAPI(participant.uuid);
            try {
              await setParticipantToLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
                layoutgroup: participant.layout_group,
              });
            } catch (e) {
              console.error(
                "There is error while setting participant LayoutGroup"
              );
            }
          }
        }

        if (offScreenParticipants.length > 0) {
          for (const participant of offScreenParticipants) {
            //await callReduceLayoutAPI(participant.uuid);
            try {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
                layoutgroup: null,
              });
            } catch (e) {
              console.error(
                "There is error during clear Participant From Layout Group"
              );
            }
          }
        }
        console.log("Participant layout_group data updated successfully");
      }
    } catch (e) {
      console.log("Error during apply changes : ", e);
    }
  }, [
    voiceActivated,
    presenterLayout,
    presenterAllLayout,
    participantsArray,
    initialParticipantsArray,
  ]);

  useEffect(() => {
    const fetchInitialParticipants = async () => {
      try {
        let data = await fetchParticipants();
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
            <Route
              path="/view-all"
              element={
                <ViewAllLayout
                  setPresenterAllLayout={handlePresenterAllLayoutChange}
                />
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
