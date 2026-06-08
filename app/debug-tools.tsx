import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { ActionButton, DemoScreen, SectionCard } from '@/components/demo-ui';
import { colors, spacing } from '@/constants/theme';

const API_DEMO = 'https://jsonplaceholder.typicode.com/users/1';

function debugBreakpointDemo(value: number): string {
  const doubled = value * 2;
  console.log(`[debugBreakpointDemo] Value: ${value}, Doubled: ${doubled}`);
  return `Kết quả: ${doubled}`;
}

async function debugNetworkDemo(): Promise<string> {
  console.log('[debugNetworkDemo] Gửi request...');
  const response = await fetch(API_DEMO);
  const data = await response.json();
  console.log('[debugNetworkDemo] Response:');
  console.log(JSON.stringify(data, null, 2));
  return `Network OK: ${data.name}`;
}

export default function DebugToolsScreen() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runNetwork = async () => {
    setLoading(true);
    setResult(null);
    try {
      const message = await debugNetworkDemo();
      setResult(message);
    } catch {
      setResult('Network thất bại');
    }
    setLoading(false);
  };

  return (
    <DemoScreen
      title="Chrome & VS Code Debug"
      subtitle="Sources, Network, Console, VS Code breakpoints"
      steps={['Chrome DevTools']}>
      <SectionCard step={1} title="Chrome DevTools">
        <View style={styles.group}>
          <ActionButton title="Gửi request" onPress={runNetwork} />
          <ActionButton
            title="Breakpoint demo"
            variant="outline"
            onPress={() => setResult(debugBreakpointDemo(5))}
          />
          {loading && <ActivityIndicator color={colors.primary} />}
        </View>
      </SectionCard>

      {result && !loading && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: spacing.sm,
  },
  resultBox: {
    backgroundColor: colors.successBg,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultText: {
    fontSize: 15,
    color: colors.success,
    fontWeight: '600',
  },
});
