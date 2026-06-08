import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton, DemoScreen, SectionCard } from '@/components/demo-ui';
import { colors, spacing } from '@/constants/theme';

type UserData = {
  id: number;
  name: string;
  profile: {
    email: string;
    settings: {
      theme: string;
      notifications: boolean;
    };
  };
};

function strategicPlacementDemo(a: number, b: number): string {
  console.log('[Strategic] Bắt đầu divideNumbers', { a, b });

  if (b === 0) {
    console.log('[Strategic] Phát hiện chia cho 0 — chuyển sang xử lý lỗi');
    return 'Không thể chia cho 0';
  }

  const result = a / b;
  console.log('[Strategic] Tính toán xong', { result });
  return `Kết quả: ${result}`;
}

function enhancedLoggingDemo(input: string): string {
  console.log('[Enhanced] Bắt đầu parse JSON', { input });

  if (input.trim() === '') {
    console.warn('[Enhanced] Input rỗng — có nguy cơ lỗi parse');
    return 'Input rỗng';
  }

  try {
    const data = JSON.parse(input);
    console.log('[Enhanced] Parse thành công', { data });
    return `Tên: ${data.name}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định';
    console.error('[Enhanced] Parse thất bại — lỗi nghiêm trọng', { message, input });
    return `Lỗi: ${message}`;
  }
}

function objectInspectionDemo(): string {
  const user: UserData = {
    id: 1,
    name: 'Nguyen Van A',
    profile: {
      email: 'a@fpt.edu.vn',
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
  };

  console.log('[Object] User object (formatted):');
  console.log(JSON.stringify(user, null, 2));
  return 'Đã ghi log object';
}

export default function ConsoleLogScreen() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <DemoScreen
      title="Console Logging for Debugging"
      subtitle="console.log, console.warn, console.error, JSON.stringify"
      steps={[
        'Strategic placement',
        'Enhanced logging',
        'Object inspection',
      ]}>
      <SectionCard step={1} title="Đặt vị trí chiến lược">
        <View style={styles.group}>
          <ActionButton
            title="Chia hợp lệ (10 / 2)"
            onPress={() => setResult(strategicPlacementDemo(10, 2))}
          />
          <ActionButton
            title="Chia cho 0 (10 / 0)"
            variant="outline"
            onPress={() => setResult(strategicPlacementDemo(10, 0))}
          />
        </View>
      </SectionCard>

      <SectionCard step={2} title="Ghi log nâng cao">
        <View style={styles.group}>
          <ActionButton
            title="Parse JSON hợp lệ"
            onPress={() => setResult(enhancedLoggingDemo('{"name":"FPT"}'))}
          />
          <ActionButton
            title="Input rỗng"
            variant="outline"
            onPress={() => setResult(enhancedLoggingDemo(''))}
          />
          <ActionButton
            title="Parse JSON lỗi"
            variant="outline"
            onPress={() => setResult(enhancedLoggingDemo('{ bad json'))}
          />
        </View>
      </SectionCard>

      <SectionCard step={3} title="Kiểm tra đối tượng dữ liệu">
        <View style={styles.group}>
          <ActionButton title="Ghi log user object" onPress={() => setResult(objectInspectionDemo())} />
        </View>
      </SectionCard>

      {result && (
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
    backgroundColor: colors.infoBg,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
});
