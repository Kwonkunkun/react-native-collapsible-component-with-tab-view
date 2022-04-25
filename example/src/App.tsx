import React, { useEffect } from 'react'
import RNCollapsibleComponentWithTapViewModule, { Counter } from 'react-native-collapsible-component-with-tab-view'

const App = () => {
  useEffect(() => {
    console.log(RNCollapsibleComponentWithTapViewModule)
  })

  return <Counter />
}

export default App
