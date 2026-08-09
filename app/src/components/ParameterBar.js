// ══════════════════════════════════════════════
// ParameterBar.js — Individual Parameter Progress Bar
// ══════════════════════════════════════════════
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function ParameterBar({ label, value, color = '#00BCD4', icon = '📊' }) {
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: value,
      duration: 1200,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const widthInterpolated = animWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={[styles.value, { color }]}>{value}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: widthInterpolated,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
