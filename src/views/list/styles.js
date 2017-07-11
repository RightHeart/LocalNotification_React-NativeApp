import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

var windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  viewActivity: {
        height: 85,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom:10,
        backgroundColor: 'white',
        borderRadius: 10
    }
});

export default styles;