import React from 'react'
import Presenter from '../layout/playout/presenter.jsx'
import PManagement from '../layout/pmlayout/pmanagement.jsx'
import Media from '../layout/mlayout/media.jsx'

 const ComponentWrapper = ({participantsArray, pLayout, mLayout, setParticipantsArray, setVoiceActivated}) => {
  return (
    <>
        <Presenter pLayout={pLayout} />
        <Media mLayout={mLayout}/>
        <PManagement participantsArray={participantsArray} setParticipantsArray={setParticipantsArray} setVoiceActivated={setVoiceActivated} /> 
    </>
  )
}
export default ComponentWrapper
