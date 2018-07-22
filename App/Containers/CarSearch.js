// @flow

import React from 'react'
import { Button, TouchableOpacity, TextInput, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import TimeAgo from 'react-native-timeago';


// Styles
import styles from './Styles/CarSearchStyle'

// Joshs

// // colored button with default theme (configurable)
// const ColoredRaisedButton = MKButton.accentColoredButton()
//   .withText('Submit')
//   .withBackgroundColor(MKColor.LightBlue)
//   .withOnPress(() => {
//     console.log("Hi, it's a colored button!");
//   })
//   .withStyle({
//       borderRadius: 20,
//       shadowRadius: 10,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: .7,
//       shadowColor: 'black',
//       elevation: 4,
//     })
//
//   .build();

type PropType = {make: String, model: String}

class CarSearch extends React.Component {

  state: {error: string}

  static defaultProps = {make: 'Make', model: 'Model'};

  constructor(props: PropType)
  {
    super(props);
    this.state = {error:''};
  }

  componentWillReceiveProps(newProps) {

    this.setState({error: ''});
  }

  // onSubmit() {
  //   // call getValue() to get the values of the form
  //   console.log("inside onSubmit");
  //   var value = this.refs.form.getValue();
  //   if (value) { // if validation fails, value will be null
  //     console.log(value); // value here is an instance of Person
  //     console.log("Form validated successfully");
  //     // this.props.attemptActivate(value.activation_code);
  //     NavigationActions.CarResults({make: value.make, model: value.model})
  //
  //   }
  // }

  onSubmit() {
    console.log(this.props)
    if (this.props.make !== "Make" && this.props.model !== "Model") {
      this.setState({error: ""})
      console.log("onSubmit: pass")
      NavigationActions.CarResults({make: this.props.make, model: this.props.model})

    }
    else {
      console.log("onSubmit: fail")
      this.setState({error: "Please pick a Make and Model"});

    }
  }

  pressMake()
  {
    NavigationActions.CarMake();
  }

  pressModel()
  {
    if (this.props.make === "Make") {
      this.setState({error: "Please choose a Make first"})
    }
    else {
      NavigationActions.CarMake({make: this.props.make});
    }

  }

  render () {
    return (

      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          {this.state.error !== '' && <Text style={{color: "red"}}>{this.state.error + "\n\n"}</Text>}

          {/* <Form
            ref="form"
            type={Type}
            options={options}
          /> */}
          
          <TouchableOpacity style={{padding: 10}} onPress={this.pressMake.bind(this)}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={this.props.make}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{padding: 10}} onPress={this.pressModel.bind(this)}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={this.props.model}
              editable={false}
            />
          </TouchableOpacity>

          <View style={{padding:10}}>
            {/* <ColoredRaisedButton onPress={this.onSubmit.bind(this)}/> */}
            <Button
              onPress={this.onSubmit.bind(this)}
              title="Submit"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

export default CarSearch;
