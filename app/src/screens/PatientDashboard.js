// ══════════════════════════════════════════════
// PatientDashboard.js — Key Innovation Screen
// Recovery Progress with Circle + Charts + Params
// ══════════════════════════════════════════════
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import RecoveryCircle from '../components/RecoveryCircle';
import ParameterBar from '../components/ParameterBar';
import HealthStatusBadge from '../components/HealthStatusBadge';
import { PATIENTS, RECOVERY_PARAMS, VITALS_HISTORY, MEDICINES } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function PatientDashboard({ route }) {
  const user = route?.params?.user || {};
  const patient = PATIENTS.find(p => p.id === user.id) || PATIENTS[0];
  const params = RECOVERY_PARAMS[patient.id] || {};
  const vitals = VITALS_HISTORY[patient.id] || [];
  const meds = MEDICINES[patient.id] || [];

  const chartData = {
    labels: vitals.map(v => v.date.split(' ')[1]),
    datasets: [{ data: vitals.map(v => v.recoveryScore), strokeWidth: 2 }],
  };

  const PARAM_BARS = [
    { label: 'Vital Signs', value: params.vitalSigns, color: '#00E676', icon: '❤️' },
    { label: 'Symptoms', value: params.symptoms, color: '#00BCD4', icon: '🌡️' },
    { label: 'Lab Results', value: params.labResults, color: '#E040FB', icon: '🔬' },
    { label: 'Treatment Response', value: params.treatmentResponse, color: '#FFD740', icon: '💊' },
    { label: 'Doctor Assessment', value: params.doctorAssessment, color: '#FF7043', icon: '👨‍⚕️' },
  ];

  const latest = vitals[vitals.length - 1] || {};

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome back 👋</Text>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.condition}>{patient.condition}</Text>
          </View>

          {/* Recovery Circle Card */}
          <View style={styles.circleCard}>
            <LinearGradient
              colors={['rgba(0,188,212,0.1)', 'rgba(0,97,150,0.05)']}
              style={styles.circleGrad}
            >
              <Text style={styles.circleTitle}>Overall Recovery Progress</Text>
              <View style={styles.circleRow}>
                <RecoveryCircle
                  percentage={params.overall || 0}
                  size={190}
                  status={params.status}
                />
                <View style={styles.circleInfo}>
                  <HealthStatusBadge status={params.status || 'Stable'} />
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Treatment Day</Text>
                    <Text style={styles.infoValue}>
                      {patient.currentDay} / {patient.treatmentDays}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Blood Group</Text>
                    <Text style={styles.infoValue}>{patient.bloodGroup}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Age</Text>
                    <Text style={styles.infoValue}>{patient.age} yrs</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Latest Vitals */}
          <Text style={styles.sectionTitle}>Latest Vitals</Text>
          <View style={styles.vitalsGrid}>
            {[
              { label: 'Blood Pressure', value: latest.bp || '--', icon: '🫀', color: '#FF5252' },
              { label: 'Heart Rate', value: latest.hr ? `${latest.hr} bpm` : '--', icon: '❤️', color: '#E040FB' },
              { label: 'Temperature', value: latest.temp ? `${latest.temp}°F` : '--', icon: '🌡️', color: '#FFD740' },
              { label: 'SpO₂', value: latest.spo2 ? `${latest.spo2}%` : '--', icon: '💨', color: '#00E676' },
            ].map((v) => (
              <View key={v.label} style={styles.vitalCard}>
                <Text style={styles.vitalIcon}>{v.icon}</Text>
                <Text style={[styles.vitalValue, { color: v.color }]}>{v.value}</Text>
                <Text style={styles.vitalLabel}>{v.label}</Text>
              </View>
            ))}
          </View>

          {/* Recovery Parameters */}
          <Text style={styles.sectionTitle}>Recovery Parameters</Text>
          <View style={styles.card}>
            {PARAM_BARS.map((p) => (
              <ParameterBar key={p.label} {...p} />
            ))}
          </View>

          {/* Recovery Trend Chart */}
          {vitals.length > 1 && (
            <>
              <Text style={styles.sectionTitle}>Recovery Trend</Text>
              <View style={styles.chartCard}>
                <LineChart
                  data={chartData}
                  width={width - 56}
                  height={180}
                  chartConfig={{
                    backgroundColor: 'transparent',
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})`,
                    propsForDots: { r: '5', strokeWidth: '2', stroke: '#00BCD4' },
                  }}
                  bezier
                  style={styles.chart}
                  withInnerLines={false}
                  withOuterLines={false}
                />
              </View>
            </>
          )}

          {/* Active Medicines */}
          <Text style={styles.sectionTitle}>Active Medications</Text>
          {meds.filter(m => m.status === 'active').map((med) => (
            <View key={med.id} style={styles.medCard}>
              <Text style={styles.medIcon}>💊</Text>
              <View style={styles.medInfo}>
                <Text style={styles.medName}>{med.name} <Text style={styles.medDose}>{med.dosage}</Text></Text>
                <Text style={styles.medFreq}>{med.frequency} · {med.duration}</Text>
                <View style={styles.medTrack}>
                  <View style={[styles.medFill, { width: `${med.progress}%` }]} />
                </View>
              </View>
              <Text style={styles.medPct}>{med.progress}%</Text>
            </View>
          ))}

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 20, marginTop: 8 },
  welcomeText: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  patientName: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 2 },
  condition: { color: '#00BCD4', fontSize: 13, marginTop: 3 },
  circleCard: {
    borderRadius: 20, overflow: 'hidden', marginBottom: 22,
    borderWidth: 1, borderColor: 'rgba(0,188,212,0.2)',
  },
  circleGrad: { padding: 20 },
  circleTitle: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 16, letterSpacing: 0.5 },
  circleRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  circleInfo: { flex: 1, gap: 12 },
  infoItem: {},
  infoLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' },
  infoValue: { color: '#fff', fontSize: 15, fontWeight: '700', marginTop: 2 },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 12, marginTop: 4 },
  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  vitalCard: {
    width: (width - 60) / 2, backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  vitalIcon: { fontSize: 24, marginBottom: 6 },
  vitalValue: { fontSize: 20, fontWeight: '800' },
  vitalLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18,
    padding: 18, marginBottom: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  chartCard: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18,
    padding: 8, marginBottom: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
  },
  chart: { borderRadius: 12 },
  medCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  medIcon: { fontSize: 28 },
  medInfo: { flex: 1 },
  medName: { color: '#fff', fontSize: 14, fontWeight: '700' },
  medDose: { color: '#00BCD4', fontWeight: '400' },
  medFreq: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 3 },
  medTrack: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2, overflow: 'hidden', marginTop: 8,
  },
  medFill: { height: '100%', backgroundColor: '#00BCD4', borderRadius: 2 },
  medPct: { color: '#00BCD4', fontWeight: '700', fontSize: 14 },
});
