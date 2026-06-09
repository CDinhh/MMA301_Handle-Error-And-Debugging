import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { ActionButton, DemoScreen, ResultCard, SectionCard } from '@/components/demo-ui';
import { colors, spacing } from '@/constants/theme';

type DemoResult = {
  label: string;
  success: boolean;
  message: string;
};

const API_OK = 'https://jsonplaceholder.typicode.com/users/1';
const API_FAIL = 'https://jsonplaceholder.typicode.com/not-found-404';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Lỗi không xác định';
}

function fetchWithPromise(url: string): Promise<DemoResult> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => ({
      label: 'Promise',
      success: true,
      message: `Thành công: ${data.name}`,
    }))
    .catch((error) => ({
      label: 'Promise',
      success: false,
      message: `Catch: ${getErrorMessage(error)}`,
    }));
}

async function fetchWithAsyncAwait(url: string): Promise<DemoResult> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return {
      label: 'Async/Await',
      success: true,
      message: `Thành công: ${data.name}`,
    };
  } catch (error) {
    return {
      label: 'Async/Await',
      success: false,
      message: `Catch: ${getErrorMessage(error)}`,
    };
  }
}

async function checkNetworkStatus(): Promise<DemoResult> {
  try {
    const state = await NetInfo.fetch();
    const online = state.isConnected === true && state.isInternetReachable !== false;

    return {
      label: 'NetInfo',
      success: online,
      message: online
        ? `Online — type: ${state.type}`
        : `Offline — type: ${state.type ?? 'unknown'}`,
    };
  } catch (error) {
    return {
      label: 'NetInfo',
      success: false,
      message: getErrorMessage(error),
    };
  }
}


async function fetchWithRetry(maxRetries = 3): Promise<DemoResult> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt += 1) {
    try {
      const response = await fetch(API_OK);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      return {
        label: 'Retry',
        success: true,
        message: `Thành công sau ${attempt + 1}/${maxRetries} lần thử: ${data.name}`,
      };
    } catch (error) {
      lastError = error;
      const isLastAttempt = attempt === maxRetries - 1;
      if (isLastAttempt) {
        break;
      }

    }
  }

  return {
    label: 'Retry',
    success: false,
    message: `Thất bại sau ${maxRetries} lần thử: ${getErrorMessage(lastError)}`,
  };
}

export default function ApiErrorScreen() {
  const [result, setResult] = useState<DemoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [networkLabel, setNetworkLabel] = useState('Đang kiểm tra mạng...');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isConnected === true && state.isInternetReachable !== false;
      setNetworkLabel(online ? `Online (${state.type})` : `Offline (${state.type})`);
    });

    return unsubscribe;
  }, []);

  const run = async (task: () => Promise<DemoResult>) => {
    setLoading(true);
    setResult(null);
    const output = await task();
    setResult(output);
    setLoading(false);
  };

  return (
    <DemoScreen
      title="Handling API Errors"
      subtitle="Xử lý lỗi API bất đồng bộ — promise, async/await, mạng và retry."
      steps={[
        'Promise-based approach',
        'Async/await pattern',
        'Network status monitoring',
        'Retry mechanisms',
      ]}>
      <View style={styles.networkBanner}>
        <Text style={styles.networkLabel}>Trạng thái mạng:</Text>
        <Text style={styles.networkValue}>{networkLabel}</Text>
      </View>

      <SectionCard step={1} title="Promise (.catch)">
        <View style={styles.group}>
          <ActionButton title="Fetch thành công" onPress={() => run(() => fetchWithPromise(API_OK))} />
          <ActionButton
            title="Fetch lỗi 404"
            variant="outline"
            onPress={() => run(() => fetchWithPromise(API_FAIL))}
          />
        </View>
      </SectionCard>

      <SectionCard step={2} title="Async/Await (try-catch)">
        <View style={styles.group}>
          <ActionButton
            title="Fetch thành công"
            onPress={() => run(() => fetchWithAsyncAwait(API_OK))}
          />
          <ActionButton
            title="Fetch lỗi 404"
            variant="outline"
            onPress={() => run(() => fetchWithAsyncAwait(API_FAIL))}
          />
        </View>
      </SectionCard>

      <SectionCard step={3} title="NetInfo">
        <View style={styles.group}>
          <ActionButton title="Kiểm tra mạng" onPress={() => run(checkNetworkStatus)} />
        </View>
      </SectionCard>

      <SectionCard step={4} title="Retry + backoff">
        <View style={styles.group}>
          <ActionButton title="Gọi API không ổn định" onPress={() => run(fetchWithRetry)} />
          <Text style={styles.hint}>
            Tối đa 3 lần
          </Text>
        </View>
      </SectionCard>

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Đang gọi API...</Text>
        </View>
      )}

      {result && !loading && (
        <ResultCard label={result.label} message={result.message} success={result.success} />
      )}
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  networkBanner: {
    backgroundColor: colors.infoBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    gap: spacing.xs,
  },
  networkLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  networkValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  group: {
    gap: spacing.sm,
  },
  hint: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
