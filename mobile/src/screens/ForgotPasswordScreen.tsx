import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ApiError } from '../api/client';
import { forgotPassword, isUniversityEmail } from '../api/auth';
import { Button, colors, TextField } from '../components/ui';

type Props = {
  onHaveToken: () => void;
  onBack: () => void;
};

export default function ForgotPasswordScreen({ onHaveToken, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!isUniversityEmail(email)) {
      setError('Use your @itu.edu.tr e-mail address');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await forgotPassword(email.trim().toLowerCase());
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>We will e-mail you a link to choose a new password.</Text>

      <TextField
        label="University e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}

      <Button title="Send reset link" onPress={handleSubmit} loading={loading} />
      <Button title="I have a reset code" onPress={onHaveToken} variant="link" />
      <Button title="Back to log in" onPress={onBack} variant="link" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 96 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 24 },
  error: { color: colors.error, marginBottom: 12 },
  success: { color: colors.success, marginBottom: 12 },
});
