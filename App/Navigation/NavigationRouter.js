// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// screens identified by the router
import CarSearch from '../Containers/CarSearch'
import CarResults from '../Containers/CarResults'
import CarMake from '../Containers/CarMake'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key="root">
          <Scene key='CarSearch' component={CarSearch} initial title='Search Cars'/>
          <Scene key='CarMake' component={CarMake} title='Choose Make'/>
          <Scene key='CarResults' component={CarResults} title='Car Results'/>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
