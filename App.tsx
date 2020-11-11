import React, { useState } from "react";
import * as RN from "react-native";

const width = RN.Dimensions.get("window").width - 60;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }: any) => (
  <RN.View style={s.item}>
    <RN.Text style={s.text}>{title}</RN.Text>
  </RN.View>
);

export default function App() {
  const [scrollY] = useState(new RN.Animated.Value(0));
  const [widthTitle, setWidthTitle] = useState(0);
  const [heightHeader, setHeightHeader] = useState(0);

  return (
    <RN.View style={{ padding: 30, flex: 1 }}>
      <RN.StatusBar barStyle="dark-content" />
      <RN.SafeAreaView>
        <RN.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            paddingTop: 100,
          }}
          onLayout={(event) => setHeightHeader(event.nativeEvent.layout.height)}
        >
          <RN.Animated.Text
            style={[
              s.title,
              {
                fontSize: scrollY.interpolate({
                  inputRange: [-50, heightHeader],
                  outputRange: [40, 24],
                  extrapolate: "clamp",
                }),
              },
            ]}
            onLayout={(event) => {
              setWidthTitle(event.nativeEvent.layout.width);
            }}
          >
            Hello, world!
          </RN.Animated.Text>
          <RN.Animated.View
            style={{
              width: scrollY.interpolate({
                inputRange: [0, heightHeader],
                outputRange: [width - widthTitle, 0],
                extrapolate: "clamp",
              }),
            }}
          />
        </RN.View>
        <RN.FlatList
          data={DATA}
          onScroll={RN.Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          style={{ paddingVertical: 100 }}
          inverted
        />
      </RN.SafeAreaView>
    </RN.View>
  );
}

const s = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 32,
  },
});
