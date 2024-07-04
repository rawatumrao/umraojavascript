// import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import "./assets/css/styles.css";
import ComponentWrapper from "./components/ComponentWrapper.jsx";
import ViewAllLayout from "./components/viewalllayout/viewalllayout.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//===========================================================

import { useState, useRef, useEffect } from "react";
import {
  EVENTS,
  INITIAL_TOKEN,
  EVENT_ID,
  NODE_ADDRESS,
  INITIAL_PARTICIPANT,
  ENV,
  ENVIRONMENT,
  VB_URI_NAME,
  ROLES,
} from "././contexts/constants";
import { AppContext } from "././contexts/context";
import { createData } from "././utils/processJsonData";
import axios from 'axios';

const findRoleOfUser = (users) => {
  let amIaHost = false;
  users.map((user) => {
    if (VB_URI_NAME === user.uri && user.role === ROLES.chair) amIaHost = true;
  });
  return amIaHost;
};

function App() {
  const [preseterLayout, setPresenterLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);

  const handleApplyClick = () => {
    const postData = {
      pLayout: preseterLayout,
      mLayout: mediaLayout,
    };
    
    axios.post(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/transform_layout`,postData).then(response => {
      console.log('Data posted successfully :', response.data);
    }).catch(error => {
      console.error('Error posting data :', error);
    });
  }

  let [participantsArray, setParticipantsArray] = useState(
    createData(INITIAL_PARTICIPANT)
  );
  const Data = useRef({ token: INITIAL_TOKEN });

  useEffect(() => {
    if (ENV === ENVIRONMENT.prod) {
      // get initial participants on open
      fetch(
        `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants`,
        {
          headers: {
            token: `${INITIAL_TOKEN}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let updatedData = createData(data.result);
          Data.current.meRole = findRoleOfUser(updatedData);
          return setParticipantsArray(updatedData);
        })
        .catch((error) => console.error(error));
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
        console.log(msg.data.info.participants);
      }
    };
  }, []);

  //==================================================

  return (
    <>
    <AppContext.Provider value={Data}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ComponentWrapper participantsArray={participantsArray} pLayout={setPresenterLayout} mLayout={setMediaLayout} />}
          />
          <Route path="/view-all" element={<ViewAllLayout />} />
        </Routes>
      </Router>
      <button className="apply-button" onClick={handleApplyClick}>Apply</button>
    </AppContext.Provider>
    </>
  );
}

export default App;
