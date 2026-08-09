// ══════════════════════════════════════════════
// HealthRecordsScreen.js — EHR
// ══════════════════════════════════════════════
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HEALTH_RECORDS, PATIENTS } from '../data/mockData';

export default function HealthRecordsScreen({ route }) {
  const [activeTab, setActiveTab] = useState('history');
  const patient = route?.params?.patient || PATIENTS[0];
  const record = HEALTH_RECORDS[patient.id] || HEALTH_RECORDS['p1'];

  const TABS = [
    { key: 'history', label: 'History', icon: '📋' },
    { key: 'diagnosis', label: 'Diagnosis', icon: '🔍' },
    { key: 'labs', label: 'Lab Reports', icon: '🔬' },
    { key: 'prescriptions', label: 'Prescriptions', icon: '💊' },
  ];

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>📋 Health Records</Text>

          {/* Patient Card */}
          <View style={styles.patientCard}>
            <Text style={styles.patientEmoji}>{patient.avatar || '🧑'}</Text>
            <View>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientMeta}>{patient.bloodGroup} · Age {patient.age} · {patient.gender}</Text>
              <Text style={styles.patientPhone}>{patient.phone}</Text>
            </View>
          </View>

          {/* Tab Bar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
            {TABS.map((t) => (
              <TouchableOpacity
                key={t.key}
                style={[styles.tab, activeTab === t.key && styles.tabActive]}
                onPress={() => setActiveTab(t.key)}
              >
                <Text style={styles.tabIcon}>{t.icon}</Text>
                <Text style={[styles.tabText, activeTab === t.key && styles.tabTextActive]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Tab Content */}
          <View style={styles.contentCard}>
            {activeTab === 'history' && (
              <View>
                <Text style={styles.contentTitle}>Medical History</Text>
                <Text style={styles.contentText}>{record.history}</Text>
                <Text style={styles.contentTitle}>Doctor's Notes</Text>
                <Text style={styles.contentText}>{record.doctorNotes}</Text>
              </View>
            )}

            {activeTab === 'diagnosis' && (
              <View>
                <Text style={styles.contentTitle}>Current Diagnosis</Text>
                <View style={styles.diagBox}>
                  <Text style={styles.diagText}>{record.diagnosis}</Text>
                </View>
                <Text style={styles.contentTitle}>Admit Date</Text>
                <Text style={styles.contentText}>{patient.admitDate}</Text>
              </View>
            )}

            {activeTab === 'labs' && (
              <View>
                <Text style={styles.contentTitle}>Lab Reports</Text>
                {record.labReports.map((lab, i) => (
                  <View key={i} style={styles.labRow}>
                    <View style={styles.labLeft}>
                      <Text style={styles.labTest}>{lab.test}</Text>
                      <Text style={styles.labDate}>{lab.date}</Text>
                    </View>
                    <View style={styles.labResult}>
                      <Text style={styles.labResultText}>{lab.result}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'prescriptions' && (
              <View>
                <Text style={styles.contentTitle}>Active Prescriptions</Text>
                {record.prescriptions.map((rx, i) => (
                  <View key={i} style={styles.rxRow}>
                    <Text style={styles.rxIcon}>💊</Text>
                    <Text style={styles.rxText}>{rx}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  pageTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 16, marginTop: 8 },
  patientCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(224,64,251,0.1)', borderRadius: 16, padding: 16,
    marginBottom: 20, borderWidth: 1, borderColor: 'rgba(224,64,251,0.25)',
  },
  patientEmoji: { fontSize: 40 },
  patientName: { color: '#fff', fontSize: 17, fontWeight: '700' },
  patientMeta: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 3 },
  patientPhone: { color: '#E040FB', fontSize: 12, marginTop: 3 },
  tabRow: { marginBottom: 16 },
  tab: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 20, marginRight: 8, gap: 6,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  tabActive: { backgroundColor: 'rgba(224,64,251,0.2)', borderColor: '#E040FB' },
  tabIcon: { fontSize: 14 },
  tabText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#E040FB' },
  contentCard: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: 18,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  contentTitle: { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  contentText: { color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 22 },
  diagBox: {
    backgroundColor: 'rgba(224,64,251,0.08)', borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: 'rgba(224,64,251,0.2)', marginBottom: 8,
  },
  diagText: { color: '#fff', fontSize: 14, lineHeight: 22 },
  labRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  labLeft: {},
  labTest: { color: '#fff', fontSize: 13, fontWeight: '600' },
  labDate: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 },
  labResult: {
    backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  labResultText: { color: '#FFD740', fontSize: 12, fontWeight: '600' },
  rxRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  rxIcon: { fontSize: 20 },
  rxText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
});
