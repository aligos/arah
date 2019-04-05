import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';

import { getData } from './helpers';

import HomeScreen from './Home';
import Vicon from './components/fonts/Vicon';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import BarAnimation from './components/BarAnimation';

NativeTachyons.build(
  {
    /* REM parameter is optional, default is 16 */
    rem: Dimensions.get('screen').width > 340 ? 18 : 16,
    colors: {
      palette: {
        primary: '#1a2a3a',
        white: '#ffffff',
        green: '#068587',
        yellow: '#F2B134'
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

class PrayersScreen extends React.Component {
  state = {
    shalat: null
  };

  componentDidMount = async () => {
    let shalat = await getData('shalat');
    delete shalat.day;
    delete shalat.qibla;
    this.setState({ shalat });
  };

  render() {
    const { shalat } = this.state;
    return (
      <React.Fragment>
        <Header backgroundColor="#f2f2f2f2">
          <Text style={[s.f2, s.green, { fontFamily: 'Butler-Medium' }]}>
            Prayer times
          </Text>
        </Header>
        <View style={[s.flx_i, { backgroundColor: '#f2f2f2f2' }]}>
          {shalat && (
            <View style={[s.mh3]}>
              {Object.keys(shalat).map((slt, i) => (
                <Card key={i}>
                  <Text
                    style={[s.f5, s.primary, { fontFamily: 'Lato-Medium' }]}
                  >
                    {slt}
                  </Text>
                  <Text style={[s.f5, s.yellow, { fontFamily: 'Lato-Bold' }]}>
                    {shalat[slt]}
                  </Text>
                </Card>
              ))}
            </View>
          )}
        </View>
      </React.Fragment>
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
    Prayers: PrayersScreen,
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
