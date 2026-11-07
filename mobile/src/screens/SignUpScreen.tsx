import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { ApiError } from '../api/client';
import { isUniversityEmail, register } from '../api/auth';
import { Button, colors, TextField } from '../components/ui';

type Props = {
  onRegistered: (email: string) => void;
  onGoToLogin: () => void;
};

type Errors = Partial<Record<'name' | 'email' | 'password' | 'confirm', string>>;

export default function SignUpScreen({ onRegistered, onGoToLogin }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Enter your name';
    if (!isUniversityEmail(email)) next.email = 'Use your @itu.edu.tr e-mail address';
    if (password.length < 8) next.password = 'Password must be at least 8 characters';
    if (confirm !== password) next.confirm = 'Passwords do not match';
    return next;
  }

  async function handleSubmit() {
    const next = validate();
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      await register({ name: name.trim(), email: email.trim().toLowerCase(), password });
      onRegistered(email.trim().toLowerCase());
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'Could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Sign up with your university e-mail address.</Text>

        <TextField label="Full name" value={name} onChangeText={setName} error={errors.name} autoCapitalize="words" />
        <TextField
          label="University e-mail"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="name@itu.edu.tr"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextField label="Password" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry />
        <TextField
          label="Confirm password"
          value={confirm}
          onChangeText={setConfirm}
          error={errors.confirm}
          secureTextEntry
        />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <Button title="Sign up" onPress={handleSubmit} loading={loading} />
        <Button title="Already have an account? Log in" onPress={onGoToLogin} variant="link" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 72 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 24 },
  formError: { color: colors.error, marginBottom: 12 },
});
