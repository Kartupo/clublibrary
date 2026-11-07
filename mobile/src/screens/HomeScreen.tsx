import { StyleSheet, Text, View } from 'react-native';

import { User } from '../api/auth';
import { Button, colors } from '../components/ui';

type Props = {
  user: User;
  onLogout: () => void;
};

// Placeholder for the home feed (WBS-17.2); only proves the logged-in session works
export default function HomeScreen({ user, onLogout }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {user.name}</Text>
      <Text style={styles.subtitle}>{user.email}</Text>
      <Button title="Log out" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, paddingTop: 96 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 24 },
});
