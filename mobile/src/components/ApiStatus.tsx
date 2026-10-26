import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getHealth, USE_MOCK } from '../api/client';
import { colors } from '../theme';

type Status = 'checking' | 'online' | 'offline' | 'mock';

// Calls the backend health check once and shows whether the API is reachable.
export default function ApiStatus() {
  const [status, setStatus] = useState<Status>(USE_MOCK ? 'mock' : 'checking');

  useEffect(() => {
    if (USE_MOCK) return;
    getHealth()
      .then((health) => setStatus(health.status === 'ok' ? 'online' : 'offline'))
      .catch(() => setStatus('offline'));
  }, []);

  const label = {
    checking: 'Checking API…',
    online: 'API: online',
    offline: 'API: offline',
    mock: 'API: mock mode',
  }[status];
  const dotColor = status === 'online' ? colors.success : status === 'offline' ? colors.error : colors.muted;

  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  text: { fontSize: 13, color: colors.muted },
});
