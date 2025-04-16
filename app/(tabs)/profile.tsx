import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex flex-col items-center justify-center flex-1 gap-5 ">
        <Image className="size-10" />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
