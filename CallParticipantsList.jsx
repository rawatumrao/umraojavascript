useEffect(() => {
  // Function to fetch initial participants
  const fetchParticipants = async () => {
    if (ENV === ENVIRONMENT.prod) {
      try {
        if (participantsArray.length) {
          setRoleStatus(findRoleOfUser(participantsArray));
        } else {
          const data = await fetchInitialParticipants();
          let updatedData = createData(data.result);
          setParticipantsArray(updatedData);
          setRoleStatus(findRoleOfUser(updatedData));
          setInitialParticipantsArray(updatedData);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Call the function to fetch initial participants
  fetchParticipants();

  // Setup server-sent events on the pexip broadcast channel
  bc.onmessage = (msg) => {
    if (msg?.data?.event === EVENTS.token_refresh) {
      // Ensure only relevant token refreshes are handled
      if (msg?.data?.uuid === YOUR_VB_UUID) {
        Data.current.token = msg?.data?.info;
        console.log(msg.data);
      }
    } else if (msg?.data?.event === EVENTS.participants) {
      // Handle participants update
      let updatedData = createData(msg?.data?.info?.participants);
      setParticipantsArray(updatedData);
      setRoleStatus(findRoleOfUser(updatedData));
      setInitialParticipantsArray(updatedData); // Save initial state
      console.log(updatedData);
    } else if (msg?.data?.event === EVENTS.stage) {
      // Handle stage event
      const updatedData = createData(msg?.data?.info);
      setTalkingPplArray(updatedData);
    }
  };

  // Cleanup function to close the BroadcastChannel on component unmount
  return () => {
    bc.close();
  };
}, []);  // Empty dependency array ensures this runs once on mount
