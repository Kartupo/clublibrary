import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { ApiError } from '../api/client';
import { login, User } from '../api/auth';
import ApiStatus from '../components/ApiStatus';
import { Button, colors, TextField } from '../components/ui';

type Props = {
  onLoggedIn: (user: User) => void;
  onUnverified: (email: string) => void;
  onForgotPassword: () => void;
  onGoToSignUp: () => void;
};

export default function LoginScreen({ onLoggedIn, onUnverified, onForgotPassword, onGoToSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Enter your e-mail and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { user } = await login({ email: email.trim().toLowerCase(), password });
      onLoggedIn(user);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        onUnverified(email.trim().toLowerCase());
      } else {
        setError(err instanceof ApiError ? err.message : 'Could not reach the server. Try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>Welcome back to Clublibrary.</Text>

        <TextField
          label="University e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title="Log in" onPress={handleSubmit} loading={loading} />
        <Button title="Forgot password?" onPress={onForgotPassword} variant="link" />
        <Button title="No account? Sign up" onPress={onGoToSignUp} variant="link" />
        <ApiStatus />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 96 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 24 },
  error: { color: colors.error, marginBottom: 12 },
});
