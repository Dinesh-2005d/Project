// ══════════════════════════════════════════════
// AssessmentScreen.js — Doctor Health Assessment
// ══════════════════════════════════════════════
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AssessmentScreen({ route, navigation }) {
  const patient = route?.params?.patient || {};

  const [vitals, setVitals] = useState({
    bp: '',
    heartRate: '',
    temp: '',
    spo2: '',
  });
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [remarks, setRemarks] = useState('');
  const [scores, setScores] = useState({
    vitalSigns: '',
    symptoms: '',
    labResults: '',
    treatmentResponse: '',
    doctorAssessment: '',
  });

  const calcOverall = () => {
    const vals = Object.values(scores).map(v => parseFloat(v) || 0);
    if (vals.every(v => v === 0)) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  const getStatus = (pct) => {
    if (pct >= 70) return 'Improving';
    if (pct >= 40) return 'Stable';
    return 'Needs Attention';
  };

  const handleSave = () => {
    const overall = calcOverall();
    Alert.alert(
      '✅ Assessment Saved',
      `Patient: ${patient.name}\nOverall Recovery: ${overall}%\nStatus: ${getStatus(overall)}\n\nData has been recorded successfully.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const overall = calcOverall();
  const status = getStatus(overall);

  const SCORE_PARAMS = [
    { key: 'vitalSigns', label: 'Vital Signs Score', icon: '❤️' },
    { key: 'symptoms', label: 'Symptoms Score', icon: '🌡️' },
    { key: 'labResults', label: 'Lab Results Score', icon: '🔬' },
    { key: 'treatmentResponse', label: 'Treatment Response', icon: '💊' },
    { key: 'doctorAssessment', label: 'Doctor Assessment', icon: '👨‍⚕️' },
  ];

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

          {/* Patient Info */}
          <View style={styles.patientBanner}>
            <Text style={styles.patientEmoji}>{patient.avatar || '🧑'}</Text>
            <View>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientMeta}>{patient.condition}</Text>
              <Text style={styles.patientDay}>Day {patient.currentDay} / {patient.treatmentDays}</Text>
            </View>
          </View>

          {/* Vitals Section */}
          <Text style={styles.sectionTitle}>📊 Update Vitals</Text>
          <View style={styles.card}>
            <View style={styles.vitalsGrid}>
              {[
                { key: 'bp', label: 'Blood Pressure', placeholder: '120/80' },
                { key: 'heartRate', label: 'Heart Rate (bpm)', placeholder: '72' },
                { key: 'temp', label: 'Temperature (°F)', placeholder: '98.6' },
                { key: 'spo2', label: 'SpO₂ (%)', placeholder: '98' },
              ].map((v) => (
                <View key={v.key} style={styles.vitalInput}>
                  <Text style={styles.vitalLabel}>{v.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={v.placeholder}
                    placeholderTextColor="rgba(255,255,255,0.25)"
                    value={vitals[v.key]}
                    onChangeText={(t) => setVitals({ ...vitals, [v.key]: t })}
                    keyboardType="numeric"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Symptoms */}
          <Text style={styles.sectionTitle}>🌡️ Symptoms & Observations</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter patient symptoms, complaints, clinical observations..."
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={symptoms}
              onChangeText={setSymptoms}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Diagnosis */}
          <Text style={styles.sectionTitle}>🔍 Diagnosis & Treatment Plan</Text>
          <View style={styles.card}>
            <TextInput
              style={[styles.textArea, { marginBottom: 12 }]}
              placeholder="Updated diagnosis..."
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={diagnosis}
              onChangeText={setDiagnosis}
              multiline
              numberOfLines={2}
            />
            <TextInput
              style={styles.textArea}
              placeholder="Doctor remarks and assessment notes..."
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={remarks}
              onChangeText={setRemarks}
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Recovery Score Inputs */}
          <Text style={styles.sectionTitle}>📈 Recovery Score (0–100)</Text>
          <View style={styles.card}>
            {SCORE_PARAMS.map((p) => (
              <View key={p.key} style={styles.scoreRow}>
                <Text style={styles.scoreIcon}>{p.icon}</Text>
                <Text style={styles.scoreLabel}>{p.label}</Text>
                <TextInput
                  style={styles.scoreInput}
                  placeholder="--"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={scores[p.key]}
                  onChangeText={(t) => setScores({ ...scores, [p.key]: t })}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            ))}

            {/* Calculated Overall */}
            {overall > 0 && (
              <View style={styles.overallRow}>
                <Text style={styles.overallLabel}>Overall Recovery</Text>
                <View style={[
                  styles.overallBadge,
                  { backgroundColor: status === 'Improving' ? 'rgba(0,230,118,0.15)' : status === 'Stable' ? 'rgba(255,215,64,0.15)' : 'rgba(255,82,82,0.15)' }
                ]}>
                  <Text style={[
                    styles.overallValue,
                    { color: status === 'Improving' ? '#00E676' : status === 'Stable' ? '#FFD740' : '#FF5252' }
                  ]}>
                    {overall}% · {status}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <LinearGradient colors={['#00BCD4', '#0097A7']} style={styles.saveGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.saveBtnText}>💾  Save Assessment</Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  patientBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(0,188,212,0.1)', borderRadius: 16, padding: 16,
    marginBottom: 22, borderWidth: 1, borderColor: 'rgba(0,188,212,0.25)',
  },
  patientEmoji: { fontSize: 40 },
  patientName: { color: '#fff', fontSize: 17, fontWeight: '700' },
  patientMeta: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  patientDay: { color: '#00BCD4', fontSize: 12, marginTop: 3 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10, marginTop: 4 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 18,
    padding: 16, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  vitalInput: { width: '47%' },
  vitalLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 6, letterSpacing: 0.5, textTransform: 'uppercase' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, color: '#fff', fontSize: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  textArea: {
    backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, color: '#fff', fontSize: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', textAlignVertical: 'top',
    minHeight: 70,
  },
  scoreRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginBottom: 12,
  },
  scoreIcon: { fontSize: 18, width: 24 },
  scoreLabel: { flex: 1, color: 'rgba(255,255,255,0.75)', fontSize: 13 },
  scoreInput: {
    width: 56, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, color: '#00BCD4',
    fontSize: 15, fontWeight: '700', textAlign: 'center',
    borderWidth: 1, borderColor: 'rgba(0,188,212,0.3)',
  },
  overallRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)',
  },
  overallLabel: { color: '#fff', fontSize: 14, fontWeight: '700' },
  overallBadge: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  overallValue: { fontSize: 14, fontWeight: '800' },
  saveBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 8 },
  saveGrad: { paddingVertical: 18, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});
