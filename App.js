import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Homepage/HomeScreen';
import DetailScreen from './screens/Detail/DetailScreen';
import FavoriteScreen from './screens/Favorite/FavoriteScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { storeData, retrieveData } from './utils/WatchUtils';
import Automatic from './screens/Automatic/AutomaticScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  const getData = async () => {
    let data = await retrieveData();
    if (data?.length > 0) {
      return data;
    } else {
      storeData();
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Home':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'Favorite':
          iconName = focused ? 'heart' : 'heart-outline';
          break;
        case 'Automatic':
          iconName = focused ? 'list': 'list-outline';
          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#92B4D3',
    tabBarInactiveTintColor: 'gray',
  })

  const tabOptions = {
    tabBarButton: () => null,
    tabBarStyle: { display: 'none' },
  }

  return (
    <NavigationContainer style={{ backgroundColor: "#9ca3af40" }}>
      <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions} >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Detail" component={DetailScreen} options={tabOptions} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        <Tab.Screen name="Automatic" component={Automatic} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}