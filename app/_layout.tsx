import { CormorantGaramond_400Regular, CormorantGaramond_600SemiBold, useFonts as useCormorant } from '@expo-google-fonts/cormorant-garamond';
import { Inter_300Light, Inter_400Regular, Inter_600SemiBold, useFonts as useInter } from '@expo-google-fonts/inter';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MD3LightTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { scheduleDailyMorningNotification, setupNotifications } from '../notifications/dailyReminder';

const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#fa8d5f',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [interLoaded] = useInter({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const [cormorantLoaded] = useCormorant({
    CormorantGaramond_400Regular,
    CormorantGaramond_600SemiBold,
  });

  useEffect(() => {
    async function initNotifications() {
      await setupNotifications();
      await scheduleDailyMorningNotification(6, 0);
    }

    initNotifications();
  }, []);

  if (!interLoaded || !cormorantLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

 return (
  <View style={{ flex: 1, backgroundColor: '#111827' }}>
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: '#111827',
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        <StatusBar style="dark" />
      </ThemeProvider>
    </PaperProvider>
  </View>
);
}