import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export default function Footer(props) {
  let { children, backgroundColor } = props;
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <View style={[s.flx_row, s.jcfs, s.aife, s.mh3, { height: 120 }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}
