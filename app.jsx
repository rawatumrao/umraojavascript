import "./App.css";
import ComponentWrapper from "./components/common/ComponentWrapper.jsx";
import ViewAllLayout from "./components/layout/presenterallview/viewalllayout.jsx";
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
  SHOW_VB_MSG,
  LABEL_NAMES,
  HEADERS,
  PARTICIPANTS_LIST_PROTOCOLS,
} from "./constants/constants.js";
import { AppContext } from "././contexts/context";
import { createData } from "././utils/processJsonData";
import {
  fetchInitialParticipants,
  transformLayout,
  setParticipantToLayoutGroup,
  clearParticipantFromLayoutGroup,
  clearPinningConfig,
  setPinningConfig,
  // participantSpotlightOff,
} from "./services/fetchRequests.js";
import {
  getParticipantsNumber,
  numberToWords,
} from "./constants/imageConstants.js";
import { findRoleOfUser, sortParticipants } from "./utils/categorizeFuncs.js";

const bc = new BroadcastChannel("pexip");

function App() {
  const [presenterLayout, setPresenterLayout] = useState(null);
  const [presenterAllLayout, setPresenterAllLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);
  const [voiceActivated, setVoiceActivated] = useState(true);
  const [participantsArray, setParticipantsArray] = useState(
    createData(INITIAL_PARTICIPANT)
  );
  const [roleStatus, setRoleStatus] = useState(false);
  const [initialParticipantsArray, setInitialParticipantsArray] =
    useState(participantsArray);
  const Data = useRef({ token: INITIAL_TOKEN });

  useEffect(() => {
    if (ENV === ENVIRONMENT.prod) {
      if (participantsArray.length) {
        setRoleStatus(findRoleOfUser(participantsArray));
      } else {
        fetchInitialParticipants()
          .then((data) => {
            let updatedData = createData(data.result);
            setParticipantsArray(updatedData);
            setRoleStatus(findRoleOfUser(updatedData));
            setInitialParticipantsArray(updatedData);
            return;
          })
          .catch((error) => console.error(error));
      }
    }
    // get server sent events on pexip broadcast channel

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
  }, [participantsArray]);

  // Setting up presenter and media layout by clicking on apply button

  const handleApplyClick = useCallback(async () => {
    // let hasChanges = false;
    try {
      let selectedLayout =
        presenterAllLayout !== null ? presenterAllLayout : presenterLayout;

      if (selectedLayout === null) {
        console.log("Please select valid Layout to Apply your changes");
        throw new Error("Layout is missing");
      }

      if (voiceActivated) {
        try {
          const response = await transformLayout({
            token: Data.current.token,
            body: { transforms: { layout: selectedLayout } },
          });

          if (response.ok) {
            console.info("Transform Layout successfully", response);
          } else {
            console.error(
              "There is some network issue during Transform Layout : ",
              response
            );
          }
        } catch (error) {
          console.error("Error message: ", error);
        }
      } else if (selectedLayout === "ac") {
        console.log(
          "The Adaptive Layout is only applicable for Voice-Activated ON"
        );
        throw new Error(
          "The Adaptive Layout is only applicable for Voice-Activated ON"
        );
      } else {
        try {
          const response = await clearPinningConfig({
            token: Data.current.token,
          });

          if (!response.ok) {
            throw new Error("Network clearPinningConfigresponse is not ok");
          }
        } catch (error) {
          console.error("Error message: ", error);
        }

        const countOnStageParticipants = participantsArray.filter(
          (participant) => {
            return (
              participant &&
              participant.layout_group !== null &&
              participant.layout_group !== ""
            );
          }
        );

        const onStageParticipants = participantsArray.filter((participant) => {
          const participantWithOldDetails = initialParticipantsArray.find(
            (p) => p.uuid === participant.uuid
          );
          return (
            participant &&
            participant.layout_group !== null &&
            participant.layout_group !== "" &&
            participant.layout_group !== participantWithOldDetails.layout_group
          );
        });

        //console.log("onStageParticipants value or data", onStageParticipants);

        const offScreenParticipants = participantsArray.filter(
          (participant) => {
            return participant && participant.layout_group === "";
          }
        );

        // Make mecessary API calls to update participant's Layout_group values
        let parNumber = countOnStageParticipants.length;
        let count = getParticipantsNumber(selectedLayout);

        if (parNumber > 0) {
          if (parNumber > count) {
            // Need to handle exception. no need to calculate
            let removeNumber = parNumber - count;
            //const voiceActivePresenterLayout = getNewPresenterLayout(parNumber);
            console.log(
              `Please remove ${removeNumber} Presenters from the Stage to apply the ${selectedLayout} Layout`
            );
            throw new Error(
              `Please remove ${removeNumber} Presenters from the Stage to apply the ${selectedLayout} Layout`
            );
          } else {
            // console.log("Participants on onStage count", parNumber);
            try {
              await setPinningConfig({
                token: Data.current.token,
                pinning_config: numberToWords(parNumber),
              });
            } catch (e) {
              console.error("There is error while setting up pinning config");
            }

            await transformLayout({
              token: Data.current.token,
              body: { transforms: { layout: selectedLayout } },
            });
          }

          for (const participant of onStageParticipants) {
            // console.log("OnStage changed participants:  ", participant);
            await setParticipantToLayoutGroup({
              uuid: participant.uuid,
              token: Data.current.token,
              layoutgroup: participant.layout_group,
            });
          }

          if (offScreenParticipants.length > 0) {
            for (const participant of offScreenParticipants) {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
              });
            }
          }
        } else {
          // console.log("While No onstage ppl then  tranform layout", selectedLayout);
          await transformLayout({
            token: Data.current.token,
            body: { transforms: { layout: selectedLayout } },
          });

          // console.log("While No onstage only checking offSceen ppl ", offScreenParticipants.length);
          if (offScreenParticipants.length > 0) {
            for (const participant of offScreenParticipants) {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
              });
            }
          }
        }
      }
    } catch (e) {
      SHOW_VB_MSG(`${LABEL_NAMES.applyChangesFailed}`);
      console.error("Error during apply changes : ", e);
    }
  }, [
    voiceActivated,
    presenterLayout,
    presenterAllLayout,
    participantsArray,
    initialParticipantsArray,
  ]);

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
                    participantsArray={sortParticipants(
                      participantsArray,
                      PARTICIPANTS_LIST_PROTOCOLS,
                      roleStatus,
                      false
                    )}
                    pLayout={handlePresenterLayoutChange}
                    mLayout={setMediaLayout}
                    setParticipantsArray={setParticipantsArray}
                    header={HEADERS.presenters}
                    roleStatus={roleStatus}
                    talkingPplArray={[]}
                    pexipBroadCastChannel={bc}
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
