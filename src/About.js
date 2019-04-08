import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';

import Fuel from './components/fonts/Fuel';
import Header from './components/Header';

class About extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const {
      navigation: { setParams }
    } = this.props;
    setParams({
      tabBarVisible: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          backgroundColor="#061C20"
          height={80}
          style={[s.absolute, s.z_index]}
        >
          <TouchableOpacity
            style={[s.aifs, s.jcfs]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Fuel name="back" size={18} color="white" />
          </TouchableOpacity>
        </Header>
        <View style={[s.bg_splash, s.flx_i, s.aic, s.jcc]}>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle="light-content"
            translucent={true}
            showHideTransition={'fade'}
          />
          <View style={[s.flx_i, s.jcc, { marginTop: -80 }]}>
            <Image
              style={{ width: 160, height: 160, resizeMode: 'contain' }}
              source={require('../assets/images/logo.png')}
            />
            <Text
              style={[
                s.f3,
                s.white,
                s.tc,
                s.pv1,
                { fontFamily: 'Butler-Medium' }
              ]}
            >
              Arah
            </Text>
            <Text style={[s.white, s.tc, s.pv1, { fontFamily: 'Lato-Medium' }]}>
              Version {require('../package.json').version}
            </Text>
          </View>
          <Text
            style={[
              s.white,
              s.bottom_2,
              s.absolute,
              { fontFamily: 'Lato-Bold' }
            ]}
          >
            1001 Digital Products
          </Text>
        </View>
      </React.Fragment>
    );
  }
}

export default About;
