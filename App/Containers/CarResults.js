// @flow

import React, { PropTypes } from 'react'
import { InteractionManager, View, Image, Text, ListView, Linking } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import TimeAgo from 'react-native-timeago';

// Styles
import styles from './Styles/CarResultsStyle'

// Joshs
import { View as ViewUI, Caption, Subtitle, Card, Image as ImageUI, Tile, Title, Button, Text as TextUI, ListView as ListViewUI, Divider, Row } from '@shoutem/ui';
import get_cars from './GetCars';


class CarResults extends React.Component {

  state: {
    renderPlaceholderOnly: boolean,
    cars: Array
  }

  constructor (props) {
    super(props)
    // If you need scroll to bottom, consider http://bit.ly/2bMQ2BZ
    this.state = {
      renderPlaceholderOnly: true,
      cars: null
    };
  }

  async getLocation() {
    let response;
    try {
      response = await fetch('https://geo.craigslist.org/');
    }
    catch(e) {
      throw e
    }

    console.log("response = ", response);
    res = response.headers.get('set-cookie').replace(/cl_def_hp=(.*?);.*/g, '$1');
    console.log("location = ", res);
  	return res;
  }

  getCars(location)
  {
    // Get model
    var models = this.props.model.replace(' ', '+');
    get_cars({"--make_model": this.props.make.toLowerCase() + "+" + models.toLowerCase(), "--city": location}).then((data) => {
      console.log(data);
      this.setState({"cars": JSON.parse(data.Payload)})
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false,
      });
    });
  }

  async componentWillMount()
  {

    try {
      let location = await this.getLocation();
      this.getCars(location);
    }
    catch(e) {
      console.log("Failed, ", e);
    }

  }

  listing_press(url) {
    Linking.openURL(url);
  }

  rowStyle(percentage) {
    var res = {paddingLeft:10, paddingBottom:10, paddingRight:10};
    var color = "red";
    if (percentage <= 0) {
      color = "green"
    }

    res["color"] = color

    return res;
  }

  renderPercentage(percentage)
  {
    var modifierText = " above ";
    if (percentage <= 0 )
    {
      modifierText = " below ";
    }

    var percentageText = Math.abs(percentage).toString() + "%" + modifierText;
    percentageText += "kelley blue book"

    return (
      <Title style={this.rowStyle(percentage)}>
        {percentageText}
      </Title>
    );
  }

  renderRow (rowData) {
    return (
      <Row style={{backgroundColor:"silver"}}>
        <Tile style={{}}>
          <ViewUI styleName="vertical space-between">
            <Title style={{paddingLeft:10, paddingTop:10, paddingRight:10}}>
              {rowData.desc} ${rowData.price}
            </Title>
            {this.renderPercentage(rowData.percent_above_kbb)}
          </ViewUI>
          <ImageUI
            styleName="large-wide"
            source={{ uri: rowData.thumbnail }}
          />
          <ViewUI styleName="content">
            <ViewUI styleName="vertical space-between">
              <ViewUI styleName="horizontal" style={{paddingBottom: 10}}>
                <TextUI style={{color:"blue"}}>Odometer: </TextUI>
                <TextUI>{rowData.odometer} </TextUI>
                <TextUI style={{color:"blue"}}>Location: </TextUI>
                <TextUI>{rowData.location} </TextUI>
              </ViewUI>
              <ViewUI styleName="horizontal" style={{paddingBottom: 10}}>
                <TextUI style={{color:"blue"}}>Posted: </TextUI>
                <TimeAgo time={rowData.timeago} />
              </ViewUI>
              <ViewUI styleName="horizontal h-center" style={{paddingBottom: 10}}>
                <Button styleName="dark" onPress={this.listing_press.bind(this, rowData.url)}>
                  <TextUI>Go To Listing</TextUI>
                </Button>
                <Button styleName="dark" onPress={this.listing_press.bind(this, rowData.kbb_url)}>
                  <TextUI>Go To Kbb</TextUI>
                </Button>
              </ViewUI>
            </ViewUI>


          </ViewUI>
        </Tile>
      </Row>
    )
  }

  render () {
    console.log("cars = ", this.state.cars);
    if (!this.state.cars || this.state.renderPlaceholderOnly)
    {
      console.log("loading")
      return (
        <View style={styles.container}>
          <Text>
            Loading
          </Text>
        </View>
      );
    }

    if(this.state.cars.length === 0) {
      return (
        <View style={styles.container}>
          <Text>
            No results found
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListViewUI
          initialListSize={1}
          data={this.state.cars}
          renderRow={this.renderRow.bind(this)}
          pageSize={2}
          onRefresh={this.getCars}
          scrollRenderAheadDistance={2}
        />
      </View>
    )
  }
}

export default CarResults
