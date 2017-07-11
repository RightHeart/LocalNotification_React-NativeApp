import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

var windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  inputContainer: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,200,200,1)'
  },
  input: {
    left: 0,
    top: 0,
    right: 0,
    height: 50,
    fontSize: 14,
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'center'
  },
  btnAdd: {
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
  },
  btnCheck: {
    position: 'absolute',
    bottom: 30,
    width: 200,
    height: 30,
    borderRadius: 25,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(140,136,255,1)',
    borderColor:'rgba(140,136,255,1)'
  }
});

export default styles;