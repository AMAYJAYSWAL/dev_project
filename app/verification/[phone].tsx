import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const Page = () => {
    const{phone,signin}=useLocalSearchParams<{phone:string, signin:string}>();
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}

export default Page;





