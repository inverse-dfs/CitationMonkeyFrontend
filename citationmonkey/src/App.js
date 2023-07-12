import React from 'react'
import * as screens from './screens'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <>
      {
        loggedIn ? <screens.TabMenu /> : <screens.AuthScreen setLoggedIn={setLoggedIn}/>
      }
    </>
  )
}

export default App
