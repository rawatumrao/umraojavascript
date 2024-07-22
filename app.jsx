import "./App.css";
import ComponentWrapper from "./components/common/ComponentWrapper.jsx";
import ViewAllLayout from "./components/layout/viewalllayout/viewalllayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  EVENTS,
  INITIAL_TOKEN,
  INITIAL_PARTICIPANT,
  ENV,
  ENVIRONMENT,
  VB_URI_NAME,
  ROLES,
} from "./config/constants.js";
import { createData } from "./utils/processJsonData";
import {
  fetchParticipants,
  transformLayout,
  participantSpotlightOn,
  participantSpotlightOff,
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

function App() {
  const [presenterLayout, setPresenterLayout] = useState(null);
  const [presenterAllLayout, setPresenterAllLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);
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
    let hasChanges = false;
    try {
      const selectedLayout =
        presenterAllLayout !== null ? presenterAllLayout : presenterLayout;
      console.log("selectedLayout:", selectedLayout);

      if (selectedLayout !== null) {
        console.log("Selected Layout:", selectedLayout);

        const response = await transformLayout({
          token: Data.current.token,
          body: { transforms: { layout: selectedLayout } },
        });

        if (response.ok) {
          console.log("Layout setup successfully", response);
          hasChanges = true;
        } else {
          console.log("Network issue setting up layout", response);
        }
      }

      const participantsChanges = participantsArray.filter((participant) => {
        const initialParticipant = initialParticipantsArray.find(
          (p) => p.uuid === participant.uuid
        );
        return (
          initialParticipant &&
          initialParticipant.spotlightOrder !== participant.spotlightOrder
        );
      });

      // Make necessary API calls to update participant's spotlightOrder value
      if (participantsChanges.length > 0) {
        console.log("Calling spotlight change", participantsChanges);
        hasChanges = true;
        for (const participant of participantsArray) {
          if (participant.spotlightOrder > 0) {
            console.log("Calling spotlightOn", participant.spotlightOrder);
            await participantSpotlightOn({
              uuid: participant.uuid,
              token: Data.current.token,
            });
          } else {
            console.log("Calling spotlightOff", participant.spotlightOrder);
            await participantSpotlightOff({
              uuid: participant.uuid,
              token: Data.current.token,
            });
          }
        }
        console.log("Participants updated successfully");
      }

      if (hasChanges) {
        console.log("Changes applied successfully");
      } else {
        console.log("No changes to apply");
      }
    } catch (e) {
      console.log("Error during apply process", e);
    }
  }, [presenterLayout, presenterAllLayout, participantsArray, initialParticipantsArray]);

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
        console.error("Error fetching participants:", error);
      }
    };

    if (ENV === ENVIRONMENT.dev) {
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
    </>
  );
}

export default App;
