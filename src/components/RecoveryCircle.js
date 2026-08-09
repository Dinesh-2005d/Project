// ══════════════════════════════════════════════
// RecoveryCircle.js — Animated Circular Progress
// ══════════════════════════════════════════════
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function RecoveryCircle({ percentage = 0, size = 180, status = 'Stable' }) {
  const animValue = useRef(new Animated.Value(0)).current;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const strokeDashoffset = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const getStatusColor = () => {
    if (status === 'Improving') return '#00E676';
    if (status === 'Stable') return '#FFD740';
    return '#FF5252';
  };

  const getGradientColors = () => {
    if (status === 'Improving') return ['#00E676', '#00BCD4'];
    if (status === 'Stable') return ['#FFD740', '#FF9800'];
    return ['#FF5252', '#E040FB'];
  };

  const colors = getGradientColors();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Background track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={12}
          fill="transparent"
        />
        {/* Animated progress arc */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGrad)"
          strokeWidth={12}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={[styles.percentage, { color: getStatusColor() }]}>{percentage}%</Text>
        <Text style={styles.label}>Recovery</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 36,
    fontWeight: '800',
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
