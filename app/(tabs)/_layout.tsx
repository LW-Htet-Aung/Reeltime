import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

type Props = {};
const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        source={images.highlight}
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="ml-2 text-base font-semibold text-secondary">
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="items-center justify-center mt-4 rounded-full size-full">
      <Image source={icon} tintColor="#abb5db" className="size-5" />
    </View>
  );
};
const _layout = (props: Props) => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Home" icon={icons.home} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Search" icon={icons.search} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Saved" icon={icons.save} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Profile" icon={icons.person} />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
