import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

import styles from './styles';
import Database from '../../helpers/database';

class GoalListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
          drawerLabel: 'Goal Journal',
          title: 'Goal Journal',
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
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var goalData = [];

        this.state = {
            listViewKey : Math.random(),
            ds:ds,
            goalDataSource: ds.cloneWithRows(goalData),
        }
}

  onClickMenu() {
      this.props.navigation.navigate('DrawerOpen');
  }

  componentWillMount() {
    this.props.navigation.setParams({
        onClickMenu: this.onClickMenu.bind(this),
    });

    this.db = new Database();
    this.db.getDataFromGoalTable((data) => {
        this.setState({goalDataSource: this.state.ds.cloneWithRows(data)})
    });
  }

  renderGoals(data, rowId){
        return (
            <View style={styles.viewActivity}>
                <Text numberOfLines={4} style={{fontWeight:'600', marginTop: 10, marginLeft: 20, marginBottom: 10, fontSize: 13}}>
                    "{data.goal_name}"
                </Text>
                <Text style={{fontWeight:'600',  marginLeft: 20, fontSize: 12, marginBottom: 10}}>
                    {data.created_date}
                </Text>
                {data.status == 'P' &&
                    <Text style={{fontWeight:'600', color:'green',  marginLeft: 20, fontSize: 10}}>
                        Pass
                    </Text>
                }
                {data.status == 'F' &&
                    <Text style={{fontWeight:'600', color:'red', marginLeft: 20, fontSize: 10}}>
                        Fail
                    </Text>
                }
            </View>
        );
    }

  render() {
        return (
           <ListView
                key={this.state.listViewKey}
                dataSource={this.state.goalDataSource}
                removeClippedSubviews={false}
                enableEmptySections={true}
                renderRow={(data, sectionId, rowId) => this.renderGoals(data, rowId)}
            />
        );
  }
}

export default GoalListScreen;