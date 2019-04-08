import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';
import SplashScreen from 'react-native-splash-screen';

import About from './About';
import Qibla from './Qibla';
import Prayers from './Prayers';
import Events from './Events.js';

import Vicon from './components/fonts/Vicon';
import Footer from './components/Footer';
import BarAnimation from './components/BarAnimation';

NativeTachyons.build(
  {
    /* REM parameter is optional, default is 16 */
    rem: Dimensions.get('screen').width > 340 ? 18 : 16,
    colors: {
      palette: {
        splash: '#061C20',
        primary: '#1a2a3a',
        white: '#ffffff',
        green: '#068587',
        yellow: '#F2B134',
        purple: '#3d2c8a',
        lightBlue: '#92c4cb',
        red: '#be343a'
      }
    }
  },
  StyleSheet
);

class TabNavigation extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    const { navigation } = this.props;
    const { index, routes } = navigation.state;
    const tabIcons = ['target', 'clock', 'moon'];
    const tabColors = ['#1a2a3a', '#068587', '#F2B134'];
    const tabWidth = [110, 135, 145];
    return (
      <Footer>
        {routes.map((route, i) => {
          let navigate = () => {
            if (route.routeName === 'Prayers' || route.routeName === 'Events') {
              StatusBar.setBarStyle('dark-content');
            } else {
              StatusBar.setBarStyle('light-content');
            }
            navigation.navigate(route.routeName);
          };
          if (i === index) {
            return (
              <BarAnimation
                {...this.props}
                key={route.key}
                onPress={navigate}
                label={route.key}
                color={tabColors[i]}
                tabWidth={tabWidth[i]}
                renderIcon={() => (
                  <Vicon name={tabIcons[i]} size={18} color={tabColors[i]} />
                )}
              />
            );
          } else {
            return (
              <TouchableOpacity
                style={[s.pv2, s.ph4]}
                key={route.key}
                onPress={navigate}
              >
                <Vicon name={tabIcons[i]} size={18} color="#0C202D" />
              </TouchableOpacity>
            );
          }
        })}
      </Footer>
    );
  }
}

const Home = createStackNavigator({
  Qibla: Qibla,
  About: About
});

Home.navigationOptions = ({
  navigation: {
    state: { index, routes }
  }
}) => {
  const { params } = routes[index];
  return {
    tabBarVisible: params ? params.tabBarVisible : index > 0 ? false : true
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Qibla: Home,
    Prayers: Prayers,
    Events: Events
  },
  {
    tabBarComponent: props => <TabNavigation {...props} />,
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default createAppContainer(TabNavigator);
