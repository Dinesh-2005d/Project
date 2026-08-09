// ══════════════════════════════════════════════
// App.js — Main Navigation Entry Point
// Smart Healthcare Management System
// ══════════════════════════════════════════════
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import DoctorDashboard from './src/screens/DoctorDashboard';
import PatientDashboard from './src/screens/PatientDashboard';
import AppointmentScreen from './src/screens/AppointmentScreen';
import HealthRecordsScreen from './src/screens/HealthRecordsScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import MedicineTrackingScreen from './src/screens/MedicineTrackingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_BAR_STYLE = {
  backgroundColor: '#0D1B45',
  borderTopColor: 'rgba(255,255,255,0.06)',
  borderTopWidth: 1,
  paddingBottom: 8,
  paddingTop: 8,
  height: 62,
};

const HEADER_STYLE = {
  headerStyle: { backgroundColor: '#0A0E27' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' },
};

// ── Doctor Bottom Tabs ──
function DoctorTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route: r }) => ({
        tabBarStyle: TAB_BAR_STYLE,
        tabBarActiveTintColor: '#00BCD4',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        ...HEADER_STYLE,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            DoctorHome: '🏥',
            Appointments: '📅',
            Records: '📋',
            Medicines: '💊',
          };
          return <Text style={{ fontSize: size - 4 }}>{icons[r.name] || '📱'}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="DoctorHome"
        component={DoctorDashboard}
        initialParams={route?.params}
        options={{ title: 'Dashboard', headerTitle: '🏥 HealthCare Pro' }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{ title: 'Appointments', headerTitle: '📅 Appointments' }}
      />
      <Tab.Screen
        name="Records"
        component={HealthRecordsScreen}
        options={{ title: 'Records', headerTitle: '📋 Health Records' }}
      />
      <Tab.Screen
        name="Medicines"
        component={MedicineTrackingScreen}
        options={{ title: 'Medicines', headerTitle: '💊 Medicines' }}
      />
    </Tab.Navigator>
  );
}

// ── Patient Bottom Tabs ──
function PatientTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route: r }) => ({
        tabBarStyle: TAB_BAR_STYLE,
        tabBarActiveTintColor: '#E040FB',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        ...HEADER_STYLE,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            PatientHome: '📊',
            MyAppointments: '📅',
            MyRecords: '📋',
            MyMedicines: '💊',
          };
          return <Text style={{ fontSize: size - 4 }}>{icons[r.name] || '📱'}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="PatientHome"
        component={PatientDashboard}
        initialParams={route?.params}
        options={{ title: 'Recovery', headerTitle: '❤️ My Recovery' }}
      />
      <Tab.Screen
        name="MyAppointments"
        component={AppointmentScreen}
        options={{ title: 'Appointments', headerTitle: '📅 Appointments' }}
      />
      <Tab.Screen
        name="MyRecords"
        component={HealthRecordsScreen}
        options={{ title: 'Records', headerTitle: '📋 Health Records' }}
      />
      <Tab.Screen
        name="MyMedicines"
        component={MedicineTrackingScreen}
        options={{ title: 'Medicines', headerTitle: '💊 Medicines' }}
      />
    </Tab.Navigator>
  );
}

// ── Root Stack ──
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DoctorTabs" component={DoctorTabs} />
        <Stack.Screen name="PatientTabs" component={PatientTabs} />
        <Stack.Screen
          name="Assessment"
          component={AssessmentScreen}
          options={{ headerShown: true, ...HEADER_STYLE, headerTitle: '🩺 Health Assessment' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
