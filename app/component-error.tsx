import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton, DemoScreen, SectionCard } from '@/components/demo-ui';
import { colors, spacing } from '@/constants/theme';

type User = {
  name?: string;
  email?: string;
} | null;

function validateUserName(user: User): string {
  if (user === null || user === undefined) {
    return 'User not found';
  }
  if (!user.name || user.name.trim() === '') {
    return 'User not found';
  }
  return user.name;
}

function getUserEmail(user: User): string {
  const email = user?.email ?? 'Email not found';
  return email;
}

function UserProfile({ user }: { user: User }) {
  if (!user) {
    return (
      <View style={styles.notFoundBox}>
        <Text style={styles.notFound}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.profile}>
      <Text style={styles.profileRow}>
        <Text style={styles.label}>Name: </Text>
        {user.name ?? 'Unknown'}
      </Text>
      <Text style={styles.profileRow}>
        <Text style={styles.label}>Email: </Text>
        {user.email ?? 'Không có email'}
      </Text>
    </View>
  );
}

export default function ComponentErrorScreen() {
  const [user, setUser] = useState<User>({ name: 'Nguyen Van A', email: 'a@fpt.edu.vn' });

  return (
    <DemoScreen
      title="Component Error Handling"
      subtitle="Kiểm tra props/state trước khi dùng — app hiển thị fallback thay vì crash."
      steps={[
        'Validate props & state',
        'Implement default values',
        'Add conditional rendering',
      ]}>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Chọn trạng thái user</Text>
        <ActionButton
          title="User hợp lệ"
          onPress={() => setUser({ name: 'Nguyen Van A', email: 'a@fpt.edu.vn' })}
        />
        <ActionButton title="User = null" variant="outline" onPress={() => setUser(null)} />
        <ActionButton
          title="User thiếu name"
          variant="outline"
          onPress={() => setUser({ email: 'b@fpt.edu.vn' })}
        />
      </View>

      <SectionCard step={1} title="Validate">
        <Text style={styles.value}>{validateUserName(user)}</Text>
      </SectionCard>

      <SectionCard step={2} title="Default values">
        <Text style={styles.value}>Email: {getUserEmail(user)}</Text>
      </SectionCard>

      <SectionCard step={3} title="Conditional rendering">
        <UserProfile user={user} />
      </SectionCard>
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
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  notFoundBox: {
    backgroundColor: colors.errorBg,
    borderRadius: 6,
    padding: spacing.sm,
  },
  notFound: {
    color: colors.error,
    fontWeight: '600',
  },
  profile: {
    gap: spacing.xs,
  },
  profileRow: {
    fontSize: 16,
    color: colors.text,
  },
  label: {
    fontWeight: '700',
    color: colors.textMuted,
  },
});
