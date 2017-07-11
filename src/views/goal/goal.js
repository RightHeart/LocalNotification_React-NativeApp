import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
  Keyboard,
  AsyncStorage,
} from 'react-native';

import styles from './styles';
import Database from '../../helpers/database';

import FCM, {FCMEvent} from 'react-native-fcm';

var stringSimilarity = require('string-similarity');

const CHECK_GOAL_PERCENTAGE = 0.9;

class GoalScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            drawerLabel: 'Goal',
            title: 'Goal',
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
            goal : '',
            setGoal: null
        }
        this.db = new Database();
        this.db.addTables();
    }

    onClickMenu() {
        this.props.navigation.navigate('DrawerOpen');
    }

    componentDidMount() {
        FCM.requestPermissions();
        this.props.navigation.setParams({
            onClickMenu: this.onClickMenu.bind(this),
        });

        AsyncStorage.getItem('initialConfig').then((initialConfig) => {
            if(!initialConfig) {
                FCM.scheduleLocalNotification({
                    fire_date: new Date().getTime(),
                    id: "firstCheck",
                    title: "Goal To Finish",
                    body: "Welcome to Goalish",
                    show_in_foreground: true
                });
                AsyncStorage.setItem('initialConfig', "set");
            }
        });

        AsyncStorage.getItem('goal').then((goal) => {
            if(goal) {
                this.setState({setGoal: goal});
            }
        });

    }

    componentWillMount(){
        this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {});
    }

    onPressSet(){
        Keyboard.dismiss();
        if(this.state.goal){
            AsyncStorage.setItem('goal', this.state.goal);            
            this.setState({goal: '', setGoal: this.state.goal});
        }
    }

    onPressDoIt(){
        Keyboard.dismiss();
        if(this.state.goal.length > 0) {
            this.setState({goal: ''});
            var similarity = stringSimilarity.compareTwoStrings(this.state.goal, this.state.setGoal);
            if(similarity >= CHECK_GOAL_PERCENTAGE) {
                let data = {goal_name: this.state.goal, status: 'P'};
                this.db.addDataInGoalTable(data, (status)=> {
                    if(status){
                        Alert.alert(
                            'Goalish',
                            'Goal checking pass !',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                        );
                    }
                });
            }else{
                let data = {goal_name: this.state.goal, status: 'F'};
                this.db.addDataInGoalTable(data, (status)=> {
                    if(status){
                        Alert.alert(
                            'Goalish',
                            'Please check your goal !',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                        );
                    }
                });
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="What is your goal you want to achieve?"
                        autoCapitalize="none"
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor="rgba(200,200,200,1)"
                        value={this.state.goal}
                        numberOfLines={3}
                        onChangeText={(text) => this.setState({ goal: text })}
                        editable
                    />
                </View>
                {!this.state.setGoal &&
                    <TouchableHighlight
                        underlayColor='rgba(140,136,255,1)'
                        style={styles.btnAdd}
                        onPress={() => this.onPressSet()}
                    >
                        <Text style={{color:'white'}}>Set</Text>
                    </TouchableHighlight>
                }
                {this.state.setGoal &&
                    <TouchableHighlight
                        underlayColor='rgba(140,136,255,1)'
                        style={[styles.btnAdd, {width: 100}]}
                        onPress={() => this.onPressDoIt()}
                    >
                        <Text style={{color:'white'}}>Let's do it !</Text>
                    </TouchableHighlight>
                }
            </View>
        );
    }
}

export default GoalScreen;