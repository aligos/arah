import React from "react";
import { View } from "react-native";
import { styles as s } from "react-native-style-tachyons";

export default function Footer(props) {
  let { children, backgroundColor } = props;
  return (
    <View
      style={[
        s.ba,
        s.flx_row,
        s.aic,
        s.jcsb,
        s.pa2,
        s.mb2,
        s.br2,
        { height: 50, borderColor: "#dddddd" }
      ]}
    >
      {children}
    </View>
  );
}
