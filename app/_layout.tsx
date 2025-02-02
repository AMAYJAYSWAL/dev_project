import Colors from '@/constants/Colors';
import { Clerk, ClerkProvider } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store'
const CLERK_PUBLISHABLE_KEY=process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Error getting token from SecureStore", err);
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Error saving token to SecureStore", err);
    }
  }
};



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout=()=>{
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (<GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="signup" options={{
              title:'',
              headerBackTitle:'',
              headerShadowVisible:false,
              headerStyle:{backgroundColor:Colors.background},
              headerLeft:()=>(
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name='arrow-back' size={24} color={Colors.primary}/>
                </TouchableOpacity>
              ),
            }}/>

            <Stack.Screen name="login" options={{
              title:'',
              headerBackTitle:'',
              headerShadowVisible:false,
              headerStyle:{backgroundColor:Colors.background},
              headerLeft:()=>(
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name='arrow-back' size={24} color={Colors.primary}/>
                </TouchableOpacity>
              ),

              headerRight:()=>(
                <Link href={'/help'} asChild>
                  <TouchableOpacity onPress={router.back}>
                    <Ionicons name='help-circle-outline' size={24} color={Colors.primary}/>
                  </TouchableOpacity>
                </Link>
              ),
            }}/>

            <Stack.Screen name='help' options={{title:'help', presentation:'modal'}}/>

      </Stack>
  
        </GestureHandlerRootView>);
}

const RootLayoutNav=()=> {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{flex:1}}>
        <StatusBar style="light"/>
        <InitialLayout/>
      </GestureHandlerRootView>
    </ClerkProvider>

  );
      
}

export default RootLayoutNav;
