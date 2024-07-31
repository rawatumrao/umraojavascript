import { EVENT_ID, NODE_ADDRESS, INITIAL_TOKEN } from "../config/constants";

export const participantsPostFetch = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/${data.call}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
    }
  );
};

export const participantsPostWithBody = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/${data.call}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
      body: JSON.stringify(data.body),
    }
  );
};

export const conferencePostFetch = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/${data.call}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
    }
  );
};

export const conferenceGetFetch = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/${data.call}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.result)
    .catch((err) => {
      console.log(err);
    });
};
/* ============================     Control-Room-Api      =============================== */

export const transformLayout = async (data) => {
  console.log("Selected Layout and new token: ", data.body);
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/transform_layout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${data.token}`,
    },
    body: JSON.stringify(data.body),
  });
  return response;
};

export const fetchParticipants = async () => {
  
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants`, {
    headers: {
      token: `${INITIAL_TOKEN}`, 
    },
  });
  const data = await response.json();
  console.log("Verify generated token info", data.result );
  return data.result;
};

export const participantSpotlightOn = async (data) => {
  console.log("called participantSpotlightOn api ", data.token);
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/spotlighton`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      }
    }
  );
};

export const participantSpotlightOff = async (data) => {
  console.log("called participantSpotlightOff api ", data.token);
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/spotlightoff`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      }
    }
  );
};

/* ============================     Pinning API call During Voice-Activation Mode in Control-Room-Api      =============================== */

export const setPinningConfig = async (data) => {
  console.log("called setPinningConfig api and value is: ", data.pinning_config);
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/set_pinning_config`,  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${data.token}`,
    },
    body: JSON.stringify({"pinning_config": data.pinning_config}),
  });
  return response;
};

export const getPinningConfig = async (data) => {
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/get_pinning_config`, {
    headers: {
      token: `${data.token}`,
    },
  });
  const responseData = await response.json();
  return responseData.result;
};


export const clearPinningConfig = async (data) => {
  console.log("Called clearPinningConfig");
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/set_pinning_config`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${data.token}`,
    },
    body: JSON.stringify({"pinning_config": ""}),
  });
  return response;
};

export const setParticipantToLayoutGroup = async (data) => {
  console.log("called setParticipantToLayoutGroup API", data.layoutgroup);
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/layout_group`,  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${data.token}`,
    },
    body: JSON.stringify({"layout_group": data.layoutgroup }),
  });
  return response;
};

export const clearParticipantFromLayoutGroup = async (data) => {
  console.log("called clearParticipantFromLayoutGroup API");
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/layout_group`,  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${data.token}`,
    },
    body: JSON.stringify({"layout_group": data.layoutgroup }),
  });
  return response;
};

