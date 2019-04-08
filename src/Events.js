import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { withNavigationFocus } from 'react-navigation';

import Header from './components/Header';
import Badge from './components/Badge';

let screen = Dimensions.get('window').width;

class Events extends React.Component {
  state = {
    events: [
      {
        title: '1st Ramadhan',
        backgroundColor: '#3d2c8a',
        date: '2019-05-06'
      },
      {
        title: 'Eid al-Fitr',
        backgroundColor: '#92c4cb',
        date: '2019-06-04'
      },
      {
        title: 'Eid al-Adha',
        backgroundColor: '#be343a',
        date: '2019-08-11'
      }
    ]
  };

  componentDidUpdate(prevProps, prevState) {
    const { isFocused } = this.props;
    if (prevProps.isFocused !== isFocused) {
      this.animation.play();
    }
  }

  renderItem = ({ item }) => (
    <Badge backgroundColor={item.backgroundColor}>
      <Text style={[s.f5, s.white, { fontFamily: 'Butler-Medium' }]}>
        {item.title}
      </Text>
      <View>
        <Text style={[s.f7, s.yellow, { fontFamily: 'Lato-Medium' }]}>
          {moment(item.date).format('D MMM YYYY')}
        </Text>
        <Text style={[s.f7, s.yellow, { fontFamily: 'Lato-Medium' }]}>
          {moment(item.date).fromNow()}
        </Text>
      </View>
    </Badge>
  );

  render() {
    const { events } = this.state;
    return (
      <React.Fragment>
        <Header backgroundColor="#f2f2f2f2" height={120}>
          <Text style={[s.f2, s.green, s.pb3, { fontFamily: 'Butler-Medium' }]}>
            Events
          </Text>
        </Header>
        <View style={[s.flx_i, { backgroundColor: '#f2f2f2f2' }]}>
          <View style={[s.mh3, s.mb4]}>
            <Text
              style={[s.f5, s.primary, s.pb3, { fontFamily: 'Lato-Medium' }]}
            >
              Holidays
            </Text>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              firstItem={1}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              slideStyle={[s.ml2]}
              data={events}
              renderItem={this.renderItem}
              sliderWidth={screen - 32}
              itemWidth={120}
              layout={'default'}
            />
          </View>
          <View style={[s.mh3]}>
            <Text
              style={[s.f5, s.primary, s.pb3, { fontFamily: 'Lato-Medium' }]}
            >
              Nearby Events
            </Text>
            <View style={[s.h4, s.aic, s.jcc]}>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                source={require('./animations/coming-soon.json')}
                autoPlay
                loop
              />
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default withNavigationFocus(Events);
