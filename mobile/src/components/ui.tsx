import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors, radius } from '../theme';

export { colors };

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'link';
  disabled?: boolean;
};

export function Button({ title, onPress, loading, variant = 'primary', disabled }: ButtonProps) {
  const isLink = variant === 'link';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, isLink ? styles.linkButton : styles.primaryButton, (disabled || loading) && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color={isLink ? colors.primary : colors.onPrimary} />
      ) : (
        <Text style={isLink ? styles.linkText : styles.primaryText}>{title}</Text>
      )}
    </Pressable>
  );
}

type TextFieldProps = TextInputProps & { label: string; error?: string };

export function TextField({ label, error, ...props }: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={colors.muted}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 48, borderRadius: radius, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  primaryButton: { backgroundColor: colors.primary },
  linkButton: { backgroundColor: 'transparent' },
  primaryText: { color: colors.onPrimary, fontSize: 16, fontWeight: '600' },
  linkText: { color: colors.primary, fontSize: 15 },
  disabled: { opacity: 0.6 },
  field: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius,
    paddingHorizontal: 12,
    minHeight: 46,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 13, marginTop: 4 },
});
