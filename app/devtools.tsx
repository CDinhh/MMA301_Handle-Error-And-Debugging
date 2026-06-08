import { memo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton, DemoScreen, SectionCard } from '@/components/demo-ui';
import { colors, spacing } from '@/constants/theme';

type UserProps = {
  name: string;
  email: string;
};

function UserAvatar({ name }: { name: string }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
    </View>
  );
}

function UserInfo({ name, email }: UserProps) {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>
    </View>
  );
}
UserInfo.displayName = 'UserInfo';

function UserPanel({ user }: { user: UserProps }) {
  return (
    <View style={styles.userPanel}>
      <UserAvatar name={user.name} />
      <UserInfo name={user.name} email={user.email} />
    </View>
  );
}
UserPanel.displayName = 'UserPanel';

function RenderCounter({ label }: { label: string }) {
  const count = useRef(0);
  count.current += 1;

  return (
    <Text style={styles.renderCount}>
      {label}: đã render {count.current} lần
    </Text>
  );
}

function HeavyChild({ label }: { label: string }) {
  return (
    <View style={styles.heavyChild}>
      <Text style={styles.heavyLabel}>{label}</Text>
      <RenderCounter label="HeavyChild" />
    </View>
  );
}
HeavyChild.displayName = 'HeavyChild';

const MemoChild = memo(function MemoChild({ label }: { label: string }) {
  return (
    <View style={styles.memoChild}>
      <Text style={styles.heavyLabel}>{label}</Text>
      <RenderCounter label="MemoChild" />
    </View>
  );
});

function ProfilerDemo() {
  const [tick, setTick] = useState(0);
  const [bursting, setBursting] = useState(false);

  const incrementTick = () => {
    setTick((t) => {
      const next = t + 1;
      console.log('[ProfilerDemo] tick', next);
      return next;
    });
  };

  const burstRenders = () => {
    if (bursting) return;
    setBursting(true);
    console.log('[ProfilerDemo] burst start');

    for (let i = 1; i <= 5; i += 1) {
      setTimeout(() => {
        incrementTick();
        if (i === 5) {
          setBursting(false);
          console.log('[ProfilerDemo] burst end');
        }
      }, i * 150);
    }
  };

  return (
    <View style={styles.group}>
      <Text style={styles.value}>Parent tick: {tick}</Text>
      <HeavyChild label="HeavyChild — re-render mỗi tick" />
      <MemoChild label="MemoChild — memo, không re-render thừa" />
      <ActionButton title="Tăng tick" onPress={incrementTick} />
      <ActionButton
        title="Burst +5 (cho Profiler)"
        variant="outline"
        onPress={burstRenders}
      />
      {bursting && <Text style={styles.profilerStatus}>Đang burst render...</Text>}
    </View>
  );
}
ProfilerDemo.displayName = 'ProfilerDemo';

function DevToolsScreen() {
  const [user, setUser] = useState<UserProps>({ name: 'Nguyen Van A', email: 'a@fpt.edu.vn' });

  return (
    <DemoScreen
      title="React Native DevTools"
      subtitle="Component Inspection, Props & State, Performance Profiling"
      steps={[
        'Component Inspection',
        'Props & State Monitoring',
        'Performance Profiling',
      ]}>
      <SectionCard step={1} title="Kiểm tra Component">
        <View style={styles.group}>
          <UserPanel user={user} />
        </View>
      </SectionCard>

      <SectionCard step={2} title="Giám sát Props & State">
        <View style={styles.group}>
          <UserPanel user={user} />
          <ActionButton
            title="Đổi user 1"
            onPress={() => setUser({ name: 'Tran Thi B', email: 'b@fpt.edu.vn' })}
          />
          <ActionButton
            title="Đổi user 2"
            variant="outline"
            onPress={() => setUser({ name: 'Le Van C', email: 'c@fpt.edu.vn' })}
          />
        </View>
      </SectionCard>

      <SectionCard step={3} title="Profiler">
        <View style={styles.group}>
          <Text style={styles.profilerHint}>
            Tab Profiler DevTools có thể trống trên Expo Go — xem log render bên dưới và Console
          </Text>
          <ProfilerDemo />
        </View>
      </SectionCard>
    </DemoScreen>
  );
}
DevToolsScreen.displayName = 'DevToolsScreen';

export default DevToolsScreen;

const styles = StyleSheet.create({
  group: {
    gap: spacing.sm,
  },
  userPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textMuted,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  heavyChild: {
    backgroundColor: colors.errorBg,
    borderRadius: 6,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  memoChild: {
    backgroundColor: colors.successBg,
    borderRadius: 6,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  heavyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  renderCount: {
    fontSize: 13,
    color: colors.textMuted,
  },
  profilerStatus: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  profilerHint: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  profileLog: {
    backgroundColor: colors.surface,
    borderRadius: 6,
    padding: spacing.sm,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileRow: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'monospace',
  },
});
