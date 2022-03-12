import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Screen/HomeScreen';
import NotificationScreen from '../Screen/NotificationScreen';
import AddTenantScreen from '../Screen/AddTenantScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import { Badge } from 'react-native-paper';


const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#385ed9' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#1b4cec',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: '(0) Notifications',
          tabBarColor: '#1b4cec',
          tabBarIcon: ({ color }) => (
            // <Badge style={{color:'#fff',backgroundColor:'grey'}} size={26}>3</Badge>
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />


      <Tab.Screen
        name="Add Tenant"
        component={AddTenantScreen}
        options={{
          tabBarLabel: 'Add Tenant',
          tabBarColor: '#1b4cec',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
          ),
        }}
      />


      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#1b4cec',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default BottomTabs;