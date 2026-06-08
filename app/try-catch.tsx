import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton, DemoScreen, ResultCard } from '@/components/demo-ui';
import { colors, spacing } from '@/constants/theme';

type DemoResult = {
  label: string;
  success: boolean;
  message: string;
};

function divideNumbers(a: number, b: number): DemoResult {
  try {
    if (b === 0) throw new Error('Không thể chia cho 0');
    const result = a / b;
    return { label: 'Chia số', success: true, message: `Kết quả: ${result}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định';
    return { label: 'Chia số', success: false, message: `Đã bắt lỗi: ${message}` };
  }
}

function parseUserJson(json: string): DemoResult {
  try {
    const data = JSON.parse(json);
    const name = data.name.toUpperCase();
    return { label: 'Parse JSON', success: true, message: `Kết quả: ${name}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định';
    return { label: 'Parse JSON', success: false, message: `Đã bắt lỗi: ${message}` };
  }
}

function getFirstItem(items: string[] | null): DemoResult {
  try {
    const first = items![0];
    return { label: 'Mảng null', success: true, message: `Kết quả: ${first}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định';
    return { label: 'Mảng null', success: false, message: `Đã bắt lỗi: ${message}` };
  }
}

export default function TryCatchDemoScreen() {
  const [result, setResult] = useState<DemoResult | null>(null);

  return (
    <DemoScreen
      title="Try-Catch Block"
      subtitle="Bắt lỗi đồng bộ để app không crash — hiển thị fallback thay vì dừng đột ngột."
      steps={[
        'Identify error-prone code',
        'Wrap in try block',
        'Handle in catch block',
      ]}>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Thử các trường hợp</Text>
        <ActionButton title="Chia hợp lệ (10 / 2)" onPress={() => setResult(divideNumbers(10, 2))} />
        <ActionButton title="Chia cho 0 (10 / 0)" onPress={() => setResult(divideNumbers(10, 0))} />
        <ActionButton
          title="Parse JSON hợp lệ"
          onPress={() => setResult(parseUserJson('{"name":"FPT"}'))}
        />
        <ActionButton title="Parse JSON lỗi" onPress={() => setResult(parseUserJson('{ bad json'))} />
        <ActionButton title="Truy cập mảng null" onPress={() => setResult(getFirstItem(null))} />
      </View>

      {result && (
        <ResultCard label={result.label} message={result.message} success={result.success} />
      )}
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: spacing.sm,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
});
