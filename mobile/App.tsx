import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { logout, restoreSession, User } from './src/api/auth';
import { colors } from './src/theme';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';

type Screen =
  | { name: 'signup' }
  | { name: 'verify'; email: string }
  | { name: 'login' }
  | { name: 'forgot' }
  | { name: 'reset' };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'login' });
  const [user, setUser] = useState<User | null>(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    restoreSession()
      .then(setUser)
      .finally(() => setRestoring(false));
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
    setScreen({ name: 'login' });
  }

  function renderContent() {
    if (restoring) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      );
    }
    if (user) {
      return <HomeScreen user={user} onLogout={handleLogout} />;
    }
    switch (screen.name) {
      case 'signup':
        return (
          <SignUpScreen
            onRegistered={(email) => setScreen({ name: 'verify', email })}
            onGoToLogin={() => setScreen({ name: 'login' })}
          />
        );
      case 'verify':
        return (
          <VerifyEmailScreen
            email={screen.email}
            onGoToLogin={() => setScreen({ name: 'login' })}
            onChangeEmail={() => setScreen({ name: 'signup' })}
          />
        );
      case 'forgot':
        return (
          <ForgotPasswordScreen
            onHaveToken={() => setScreen({ name: 'reset' })}
            onBack={() => setScreen({ name: 'login' })}
          />
        );
      case 'reset':
        return (
          <ResetPasswordScreen
            onDone={() => setScreen({ name: 'login' })}
            onRequestNew={() => setScreen({ name: 'forgot' })}
          />
        );
      default:
        return (
          <LoginScreen
            onLoggedIn={setUser}
            onUnverified={(email) => setScreen({ name: 'verify', email })}
            onForgotPassword={() => setScreen({ name: 'forgot' })}
            onGoToSignUp={() => setScreen({ name: 'signup' })}
          />
        );
    }
  }

  return (
    <View style={styles.container}>
      {renderContent()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
