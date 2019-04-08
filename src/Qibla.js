/* @flow */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  PermissionsAndroid,
  Alert,
  Platform,
  TouchableOpacity,
  Linking
} from 'react-native';
import Permissions from 'react-native-permissions';
import moment from 'moment';
import RNSimpleCompass from 'react-native-simple-compass';
import { styles as s } from 'react-native-style-tachyons';
import AndroidOpenSettings from 'react-native-android-open-settings';
import LottieView from 'lottie-react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';

import Vicon from './components/fonts/Vicon';
import Fuel from './components/fonts/Fuel';
import Header from './components/Header';

import { getShalat } from './api';
import { storeData } from './helpers';

const { width } = Dimensions.get('window');

type Props = {};
type State = {
  degree: number
};
export default class Qibla extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };
  state = {
    degree: 0,
    date: new Date(),
    shalat: null,
    location: { lat: 0, lng: 0 }
  };

  componentDidMount = async () => {
    this.getCurrentLocation();
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
    RNSimpleCompass.start(1, degree => {
      this.setState({ degree });
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.location !== this.state.location) {
      const { lat, lng } = this.state.location;
      const shalat = await getShalat(`${lat},${lng}`);
      this.setState({ shalat });
      storeData('shalat', shalat);
    }
    const { isFocused } = this.props;
    if (prevProps.isFocused !== isFocused) {
      this.animation.play();
    }
  };

  locationPermissionAndroid = async () => {
    if (Platform.OS === 'ios') {
      return true;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title:
              'Allow "ULO" to access your location while you are using the app?',
            message:
              'Your location is required for better functionality and user experience.'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  };

  alertForLocationPermission = () => {
    if (this.state.locationPermission === 'undetermined') {
      this.requestPermission();
    } else if (this.state.locationPermission !== 'authorized') {
      Alert.alert(
        `Allow "Arah" to access your location while you are using the app?`,
        `Your location is required for better functionality and user experience.`,
        [
          {
            text: `Don't Allow`,
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: 'Open Settings',
            onPress:
              Platform.OS === 'ios'
                ? Permissions.openSettings
                : AndroidOpenSettings.locationSourceSettings
          }
        ]
      );
    }
  };

  requestPermission = async () => {
    const locationPermission = await Permissions.request('location');
    this.setState({ locationPermission });
  };

  getCurrentLocation = async () => {
    const onChangeGPS = pos => {
      const {
        coords: { latitude, longitude }
      } = pos;
      let location = {
        lat: latitude,
        lng: longitude
      };
      this.setState({ location });
    };
    const onErrorGPS = () => {
      this.alertForLocationPermission();
    };
    const locationPermission = await Permissions.check('location');
    const locationAndroid = await this.locationPermissionAndroid();
    this.setState({ locationPermission });
    if (locationAndroid) {
      navigator.geolocation.getCurrentPosition(onChangeGPS, onErrorGPS, {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      });
    }
  };

  clockToDate = (clock: string) => {
    let date = new Date();
    let time = clock.split(new RegExp(':'));
    date.setHours(time[0], time[1], 0);
    return date;
  };

  getSalahStatus = () => {
    const { date, shalat } = this.state;
    if (date < this.clockToDate(shalat.Fajr)) {
      return 'Fajr';
    } else if (
      date > this.clockToDate(shalat.Fajr) &&
      date < this.clockToDate(shalat.Dhuhr)
    ) {
      return 'Dhuhr';
    } else if (
      date > this.clockToDate(shalat.Dhuhr) &&
      date < this.clockToDate(shalat.Asr)
    ) {
      return 'Asr';
    } else if (
      date > this.clockToDate(shalat.Asr) &&
      date < this.clockToDate(shalat.Maghrib)
    ) {
      return 'Maghrib';
    } else if (
      date > this.clockToDate(shalat.Maghrib) &&
      date < this.clockToDate(shalat.Isha)
    ) {
      return 'Isha';
    } else {
      return 'Isha';
    }
  };

  getSalahCountdown = () => {
    const { shalat } = this.state;
    switch (this.getSalahStatus()) {
      case 'Fajr':
        return moment(this.clockToDate(shalat.Fajr)).fromNow();
      case 'Dhuhr':
        return moment(this.clockToDate(shalat.Dhuhr)).fromNow();
      case 'Asr':
        return moment(this.clockToDate(shalat.Asr)).fromNow();
      case 'Maghrib':
        return moment(this.clockToDate(shalat.Maghrib)).fromNow();
      default:
        return moment(this.clockToDate(shalat.Isha)).fromNow();
    }
  };

  render() {
    const { degree, shalat } = this.state;
    return (
      <MenuProvider style={{ flex: 1 }}>
        <Header
          backgroundColor="#1a2a3a"
          height={80}
          style={[s.absolute, s.z_index]}
        >
          <Menu
            opened={this.state.menu}
            onBackdropPress={() =>
              this.setState({
                menu: false
              })
            }
          >
            <MenuTrigger style={{ borderRadius: 30, borderWidth: 0 }}>
              <TouchableOpacity
                style={[s.aife, s.jcfe]}
                onPress={() => this.setState({ menu: true })}
              >
                <Image
                  style={{ height: 16, width: 34 }}
                  source={require('../assets/images/menu.png')}
                />
              </TouchableOpacity>
            </MenuTrigger>
            <MenuOptions style={[s.pv2, s.ph3]}>
              <MenuOption
                onSelect={() => {
                  this.setState({ menu: false });
                  this.props.navigation.navigate('About');
                }}
              >
                <Text style={[s.primary, s.f5, { fontFamily: 'Lato-Medium' }]}>
                  About
                </Text>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  this.setState({ menu: false });
                  Linking.openURL(
                    'http://1001digitalproducts.awancoder.com/report/'
                  );
                }}
              >
                <Text style={[s.primary, s.f5, { fontFamily: 'Lato-Medium' }]}>
                  Report
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </Header>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
          showHideTransition={'fade'}
        />
        <View style={[s.flx_i, s.jcc, s.aic, { backgroundColor: '#1a2a3a' }]}>
          {shalat ? (
            <>
              <ImageBackground
                source={require('../assets/images/compass_bg.png')}
                style={{
                  height: width - 120,
                  width: width - 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                  resizeMode: 'contain',
                  transform: [{ rotate: 270 - degree + 'deg' }]
                }}
              >
                <Image
                  source={require('../assets/images/arrow.png')}
                  style={{
                    height: width - 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    resizeMode: 'contain',
                    transform: [
                      { rotate: parseFloat(shalat.qibla) - 270 + 'deg' }
                    ]
                  }}
                />
              </ImageBackground>
              <Text
                style={[s.f4, s.white, s.mt5, { fontFamily: 'Butler-Medium' }]}
              >{`${this.getSalahStatus()} ${this.getSalahCountdown()}`}</Text>
            </>
          ) : (
            <LottieView
              style={[s.h3]}
              ref={animation => {
                this.animation = animation;
              }}
              source={require('./animations/circle.json')}
              autoPlay
              loop
            />
          )}
        </View>
      </MenuProvider>
    );
  }
}
