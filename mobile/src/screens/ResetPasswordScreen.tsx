import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ApiError } from '../api/client';
import { resetPassword } from '../api/auth';
import { Button, colors, TextField } from '../components/ui';

type Props = {
  onDone: () => void;
  onRequestNew: () => void;
};

export default function ResetPasswordScreen({ onDone, onRequestNew }: Props) {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!token.trim()) return setError('Enter the code from the e-mail');
    if (password.length < 8) return setError('Password must be at least 8 characters');
    if (password !== confirm) return setError('Passwords do not match');

    setLoading(true);
    setError('');
    try {
      await resetPassword({ token: token.trim(), password });
      onDone();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a new password</Text>
      <Text style={styles.subtitle}>Paste the code from your reset e-mail.</Text>

      <TextField label="Reset code" value={token} onChangeText={setToken} autoCapitalize="none" autoCorrect={false} />
      <TextField label="New password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextField label="Confirm new password" value={confirm} onChangeText={setConfirm} secureTextEntry />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Update password" onPress={handleSubmit} loading={loading} />
      <Button title="Request a new link" onPress={onRequestNew} variant="link" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 96 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 24 },
  error: { color: colors.error, marginBottom: 12 },
});
