import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

var windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnAdd: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
    width: 80,
    height:30,
    borderRadius: 25,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(140,136,255,1)',
    borderColor:'rgba(140,136,255,1)'
  }
});

export default styles;