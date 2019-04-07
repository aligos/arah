import React from 'react';
import { Text, View } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

import { getData } from './helpers';

import Header from './components/Header';
import Card from './components/Card';

export default class Prayers extends React.Component {
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
          <Text style={[s.f2, s.green, s.pb3, { fontFamily: 'Butler-Medium' }]}>
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
