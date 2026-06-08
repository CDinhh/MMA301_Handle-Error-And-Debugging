import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ReactNode,
} from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

type ScreenProps = {
  title: string;
  subtitle: string;
  steps: string[];
  children: ReactNode;
};

export function DemoScreen({ title, subtitle, steps, children }: ScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.stepsCard}>
        {steps.map((step, index) => (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {children}
    </ScrollView>
  );
}

export function ActionButton({
  title,
  onPress,
  variant = 'primary',
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      accessibilityRole="button"
      style={[styles.button, isOutline ? styles.buttonOutline : styles.buttonPrimary]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          { color: isOutline ? colors.primary : '#FFFFFF' },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function ResultCard({
  label,
  message,
  success,
}: {
  label: string;
  message: string;
  success: boolean;
}) {
  return (
    <View style={[styles.resultCard, success ? styles.resultSuccess : styles.resultError]}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={[styles.resultMessage, success ? styles.textSuccess : styles.textError]}>
        {message}
      </Text>
    </View>
  );
}

export function SectionCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>{step}</Text>
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  stepsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  button: {
    borderRadius: radius.sm,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    width: '100%',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  resultCard: {
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
  },
  resultSuccess: {
    backgroundColor: colors.successBg,
    borderColor: '#86EFAC',
  },
  resultError: {
    backgroundColor: colors.errorBg,
    borderColor: '#FCA5A5',
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultMessage: {
    fontSize: 16,
    fontWeight: '600',
  },
  textSuccess: {
    color: colors.success,
  },
  textError: {
    color: colors.error,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.infoBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionBadge: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  sectionBody: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});
