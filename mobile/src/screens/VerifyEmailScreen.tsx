import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ApiError } from '../api/client';
import { resendVerification } from '../api/auth';
import { Button, colors } from '../components/ui';

const RESEND_COOLDOWN_SECONDS = 30;

type Props = {
  email: string;
  onGoToLogin: () => void;
  onChangeEmail: () => void;
};

export default function VerifyEmailScreen({ email, onGoToLogin, onChangeEmail }: Props) {
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend() {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await resendVerification(email);
      setMessage(res.message);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check your e-mail</Text>
      <Text style={styles.body}>
        We sent a verification link to <Text style={styles.email}>{email}</Text>. Open it to activate your account.
        The link expires after a while, so you can request a new one below.
      </Text>

      {message ? <Text style={styles.success}>{message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        title={cooldown > 0 ? `Resend e-mail (${cooldown}s)` : 'Resend e-mail'}
        onPress={handleResend}
        loading={loading}
        disabled={cooldown > 0}
      />
      <Button title="I have verified, log in" onPress={onGoToLogin} variant="link" />
      <Button title="Use a different e-mail" onPress={onChangeEmail} variant="link" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 96 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 12 },
  body: { fontSize: 16, color: colors.muted, lineHeight: 23, marginBottom: 24 },
  email: { color: colors.text, fontWeight: '600' },
  success: { color: colors.success, marginBottom: 12 },
  error: { color: colors.error, marginBottom: 12 },
});
