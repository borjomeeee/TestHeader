import React from "react";
import * as RN from "react-native";

const Header = () => {
  return (
    <RN.SafeAreaView>
      <RN.Text style={s.title}>Hello, world!</RN.Text>
    </RN.SafeAreaView>
  );
};

const s = RN.StyleSheet.create({
  title: {
    fontSize: 44,
    fontWeight: "bold",
  },
});

export default Header;
