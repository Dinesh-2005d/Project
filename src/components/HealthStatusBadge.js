// ══════════════════════════════════════════════
// HealthStatusBadge.js
// ══════════════════════════════════════════════
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_CONFIG = {
  Improving: { color: '#00E676', bg: 'rgba(0,230,118,0.15)', icon: '📈', emoji: '✅' },
  Stable:    { color: '#FFD740', bg: 'rgba(255,215,64,0.15)',  icon: '➡️', emoji: '⚠️' },
  'Needs Attention': { color: '#FF5252', bg: 'rgba(255,82,82,0.15)', icon: '📉', emoji: '🚨' },
};

export default function HealthStatusBadge({ status = 'Stable', size = 'normal' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Stable'];
  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, isSmall && styles.small]}>
      <Text style={isSmall ? styles.iconSmall : styles.icon}>{config.emoji}</Text>
      <Text style={[styles.text, { color: config.color }, isSmall && styles.textSmall]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  small: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    fontSize: 16,
  },
  iconSmall: {
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 11,
  },
});
