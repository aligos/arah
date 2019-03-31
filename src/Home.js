/* @flow */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground
} from 'react-native';
import moment from 'moment';
import RNSimpleCompass from 'react-native-simple-compass';
import { styles as s } from 'react-native-style-tachyons';
import { getShalat } from './api';

const { width, height } = Dimensions.get('window');

type Props = {};
type State = {
  degree: number
};
export default class App extends Component<Props, State> {
  state = {
    degree: 0,
    date: new Date(),
    shalat: null
  };

  componentDidMount = async () => {
    const shalat = await getShalat('-7.387,108.249');
    console.log(shalat);
    this.setState({ shalat });
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
    RNSimpleCompass.start(1, degree => {
      this.setState({ degree });
    });
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
    const { degree, shalat, date } = this.state;
    const timeInfo = `Menuju waktu ${shalat && this.getSalahStatus()}`;
    return (
      <React.Fragment>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
          showHideTransition={'fade'}
        />
        <View style={[s.flx_i, s.jcc, s.aic, { backgroundColor: '#1a2a3a' }]}>
          {shalat && (
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
                style={[s.f2, s.white, s.mt4, { fontFamily: 'Lato-Medium' }]}
              >{`${this.getSalahStatus()} ${this.getSalahCountdown()}`}</Text>
            </>
          )}
        </View>
      </React.Fragment>
    );
  }
}
