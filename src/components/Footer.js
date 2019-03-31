import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';

export default function Footer(props) {
  let { children, backgroundColor } = props;
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <View
        style={[
          s.bt,
          s.flx_row,
          s.aic,
          s.jcsa,
          { height: 50, borderColor: '#dddddd' }
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
