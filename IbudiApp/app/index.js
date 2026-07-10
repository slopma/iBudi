import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PTSerif_400Regular, PTSerif_700Bold, useFonts } from '@expo-google-fonts/pt-serif';

import WelcomeScreen from '../components/WelcomeScreen';
import LandingPage from '../components/LandingPage';
import DemoDashboard from '../components/DemoDashboard';

export default function Index() {
  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  // Flow State: 'welcome' | 'landing' | 'demo'
  const [flowState, setFlowState] = useState('welcome');

  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="large" color="#003366" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {flowState === 'welcome' && (
        <WelcomeScreen onFinished={() => setFlowState('landing')} />
      )}
      {flowState === 'landing' && (
        <LandingPage onStartDemo={() => setFlowState('demo')} />
      )}
      {flowState === 'demo' && (
        <DemoDashboard onBackToLanding={() => setFlowState('landing')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});