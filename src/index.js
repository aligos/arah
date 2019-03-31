import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';

import HomeScreen from './Home';
import Vicon from './components/fonts/Vicon';
import Footer from './components/Footer';
import BarAnimation from './components/BarAnimation';

NativeTachyons.build(
  {
    /* REM parameter is optional, default is 16 */
    rem: Dimensions.get('screen').width > 340 ? 18 : 16,
    /* fontRem parameter is optional to allow adjustment in font-scaling. default falls back to rem */
    fontRem: 8,
    colors: {
      palette: {
        primary: '#1a2a3a',
        white: '#ffffff'
      }
    }
  },
  StyleSheet
);

class TabNavigation extends React.Component {
  render() {
    const { navigation } = this.props;
    const { index, routes } = navigation.state;
    const tabIcons = ['target', 'clock', 'moon'];
    const tabColors = ['#1a2a3a', '#068587', '#F2B134'];
    const tabWidth = [110, 135, 145];
    return (
      <Footer>
        {routes.map((route, i) => {
          if (i === index) {
            return (
              <BarAnimation
                {...this.props}
                key={route.key}
                onPress={() => this.props.navigation.navigate(route.routeName)}
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
                style={[s.ph3]}
                key={route.key}
                onPress={() => this.props.navigation.navigate(route.routeName)}
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

class PrayerScreen extends React.Component {
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.aic]}>
        <Text>Prayer Times!</Text>
      </View>
    );
  }
}

class EventsScreen extends React.Component {
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.aic]}>
        <Text>Events!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Qibla: HomeScreen,
    Prayer: PrayerScreen,
    Events: EventsScreen
  },
  {
    tabBarComponent: props => <TabNavigation {...props} />,
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default createAppContainer(TabNavigator);
