// ══════════════════════════════════════════════
// MedicineTrackingScreen.js
// ══════════════════════════════════════════════
import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MEDICINES, PATIENTS } from '../data/mockData';

const STATUS_CONFIG = {
  active:    { color: '#00E676', bg: 'rgba(0,230,118,0.15)', label: 'Active' },
  completed: { color: '#00BCD4', bg: 'rgba(0,188,212,0.15)', label: 'Completed' },
  paused:    { color: '#FFD740', bg: 'rgba(255,215,64,0.15)', label: 'Paused' },
};

export default function MedicineTrackingScreen({ route }) {
  const patient = route?.params?.patient || PATIENTS[0];
  const meds = MEDICINES[patient.id] || MEDICINES['p1'];
  const activeMeds = meds.filter(m => m.status === 'active');
  const doneMeds = meds.filter(m => m.status !== 'active');

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>💊 Medicine & Treatment</Text>

          {/* Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{activeMeds.length}</Text>
              <Text style={styles.summaryLabel}>Active Meds</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={[styles.summaryValue, { color: '#FFD740' }]}>
                {Math.round(activeMeds.reduce((a, m) => a + m.progress, 0) / (activeMeds.length || 1))}%
              </Text>
              <Text style={styles.summaryLabel}>Avg Progress</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={[styles.summaryValue, { color: '#00E676' }]}>{doneMeds.length}</Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
          </View>

          {/* Active Medicines */}
          <Text style={styles.sectionTitle}>Active Medications</Text>
          {activeMeds.map((med) => {
            const sc = STATUS_CONFIG[med.status];
            return (
              <View key={med.id} style={styles.medCard}>
                <View style={styles.medHeader}>
                  <View style={styles.medTop}>
                    <Text style={styles.medEmoji}>💊</Text>
                    <View style={styles.medTitleArea}>
                      <Text style={styles.medName}>{med.name}</Text>
                      <Text style={styles.medDose}>{med.dosage}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                    <Text style={[styles.statusText, { color: sc.color }]}>{sc.label}</Text>
                  </View>
                </View>
                <View style={styles.medDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Frequency</Text>
                    <Text style={styles.detailValue}>{med.frequency}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{med.duration}</Text>
                  </View>
                </View>
                <View style={styles.progressArea}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Treatment Progress</Text>
                    <Text style={[styles.progressValue, { color: sc.color }]}>{med.progress}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${med.progress}%`, backgroundColor: sc.color }]} />
                  </View>
                </View>
              </View>
            );
          })}

          {/* Completed Medicines */}
          {doneMeds.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Completed</Text>
              {doneMeds.map((med) => (
                <View key={med.id} style={[styles.medCard, styles.medCardDone]}>
                  <View style={styles.medHeader}>
                    <View style={styles.medTop}>
                      <Text style={styles.medEmoji}>✅</Text>
                      <View>
                        <Text style={[styles.medName, { color: 'rgba(255,255,255,0.5)' }]}>{med.name}</Text>
                        <Text style={styles.medDose}>{med.dosage}</Text>
                      </View>
                    </View>
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                </View>
              ))}
            </>
          )}

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  pageTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 20, marginTop: 8 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  summaryCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  summaryValue: { fontSize: 24, fontWeight: '800', color: '#E040FB' },
  summaryLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4 },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 14 },
  medCard: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  medCardDone: { opacity: 0.6 },
  medHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  medTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  medEmoji: { fontSize: 28 },
  medTitleArea: {},
  medName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  medDose: { color: '#00BCD4', fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: '700' },
  medDetails: { flexDirection: 'row', gap: 20, marginBottom: 12 },
  detailItem: {},
  detailLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' },
  detailValue: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600', marginTop: 3 },
  progressArea: {},
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  progressValue: { fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  completedText: { color: '#00BCD4', fontSize: 12, fontWeight: '600' },
});
