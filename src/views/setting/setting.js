import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import FCM from 'react-native-fcm';
import Prompt from 'react-native-prompt';

import styles from './styles';

class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
          drawerLabel: 'Setting',
          title: 'Setting',
          headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent'
          },
          headerLeft: (
              <TouchableHighlight underlayColor='transparent' style={{marginLeft:20}} onPress={() => params.onClickMenu()}>
                  <Image resizeMode={'contain'} style={{width: 20, height: 20}} source={require('../../static/images/menu.png')} />
              </TouchableHighlight>
          ),
          headerTintColor: 'black'
      }
  };

  constructor(props){
    super(props);
    this.state = {
      isMorningDatePicker: false,
      isNightDatePicker: false,
      morningDate: 'Select a time',
      nightDate: 'Select a time',
      promptVisible: false,
      setGoal: null
    };
  }

  onClickMenu() {
      this.props.navigation.navigate('DrawerOpen');
  }

  componentWillMount() {
    this.props.navigation.setParams({
        onClickMenu: this.onClickMenu.bind(this),
    });

    AsyncStorage.getItem('morningTime').then((morningTime) => {
      if(morningTime) {
        var date = new Date(morningTime);
        var dateF = date.getHours() +" : " +  date.getMinutes();
        this.setState({morningDate: dateF});
      }
    });

    AsyncStorage.getItem('nightTime').then((nightTime) => {
      if(nightTime) {
        var date = new Date(nightTime);
        var dateF = date.getHours() +" : " +  date.getMinutes();
        this.setState({nightDate: dateF});
      }
    });

    AsyncStorage.getItem('goal').then((goal) => {
        if(goal) {
            this.setState({setGoal: goal});
        }
    });

  }

  showMorningDatePicker = () => this.setState({ isMorningDatePicker: true });

  hideMorningDatePicker = () => this.setState({ isMorningDatePicker: false });

  showNightDatePicker = () => this.setState({ isNightDatePicker: true });

  hideNightDatePicker = () => this.setState({ isNightDatePicker: false });

  handleMorningDatePicker = (date) => {
    AsyncStorage.setItem('morningTime', date);
    var dateF = date.getHours() +" : " +  date.getMinutes();
    this.setState({morningDate: dateF});

    this.hideMorningDatePicker();

    FCM.scheduleLocalNotification({
        fire_date: date.getTime(),
        id: "morning",
        title: "Goal To Finish",
        body: "Please type in your goal",
        repeat_interval: "day",
        click_action: 'HELLO',
        show_in_foreground: true
    });
  }

  handleNightDatePicker = (date) => {
    AsyncStorage.setItem('nightTime', date);
    var dateF = date.getHours() +" : " +  date.getMinutes();
    this.setState({nightDate: dateF});

    this.hideNightDatePicker();

    FCM.scheduleLocalNotification({
        fire_date: date.getTime(),
        id: "night",
        title: "Goal To Finish",
        body: "Please type in your goal",
        repeat_interval: "day",
        click_action: 'HELLO',
        show_in_foreground: true
    });
  };

  onPressChange(){
    this.setState({promptVisible: true});
  }

  onPressSubmitFromAlert(value){
    this.setState({promptVisible: false});
    if(value.length > 0) {
      AsyncStorage.setItem('goal', value);
      this.setState({setGoal: value});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 10, alignItems:'center', marginBottom: 20, justifyContent:'center'}}>
          <Text style={{fontSize: 16}}>
            Notification Times
          </Text>
        </View>
        <View style={{flexDirection:'row',  height: 40, borderBottomWidth:1, borderBottomColor: 'rgba(248,248,248,1)',
        alignItems:'center', justifyContent:'center'}}>
          <Text style={{marginLeft:10, flex: 0.50}}>Morning</Text>
          <TouchableOpacity style={{flex: 0.50}} onPress={this.showMorningDatePicker}>
            <Text style={{textAlign:'center'}}>{this.state.morningDate}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', height: 40, borderBottomWidth:1, borderBottomColor: 'rgba(248,248,248,1)',
        alignItems:'center', justifyContent:'center'}}>
          <Text style={{marginLeft:10,flex: 0.50}}>Night</Text>
          <TouchableOpacity style={{flex: 0.50}} onPress={this.showNightDatePicker}>
            <Text style={{textAlign:'center'}}>{this.state.nightDate}</Text>
          </TouchableOpacity>
        </View>
        {this.state.setGoal &&
        <View style={{marginTop: 40, alignItems:'center', marginBottom: 20, justifyContent:'center'}}>
          <Text style={{fontSize: 22}}>
            Your Goal
          </Text>
        </View>
        }
        {this.state.setGoal &&
        <View style={{marginTop: 20, alignItems:'center', marginBottom: 20, justifyContent:'center'}}>
          <Text style={{fontSize: 16, marginRight: 20, marginLeft:20}} numberOfLines={5}>
            {this.state.setGoal}
          </Text>
        </View>
        }
        {this.state.setGoal &&
        <TouchableHighlight
            underlayColor='rgba(140,136,255,1)'
            style={styles.btnAdd}
            onPress={() => this.onPressChange()}
        >
            <Text style={{color:'white'}}>Change</Text>
        </TouchableHighlight>
        }
        <DateTimePicker
          mode={'time'}
          isVisible={this.state.isMorningDatePicker}
          onConfirm={this.handleMorningDatePicker}
          onCancel={this.hideMorningDatePicker}
        />
        <DateTimePicker
          mode={'time'}
          isVisible={this.state.isNightDatePicker}
          onConfirm={this.handleNightDatePicker}
          onCancel={this.hideNightDatePicker}
        />
        <Prompt
          title="New Goal"
          placeholder="Please type in your new goal"
          defaultValue=""
          submitText= "Set"
          visible={this.state.promptVisible}
          onCancel={ () => this.setState({
              promptVisible: false
          }) }
          onSubmit={ (value) => this.onPressSubmitFromAlert(value) }/>
      </View>
    );
  }
}

export default SettingScreen;