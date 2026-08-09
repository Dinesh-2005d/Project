// ══════════════════════════════════════════════
// DoctorDashboard.js
// ══════════════════════════════════════════════
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HealthStatusBadge from '../components/HealthStatusBadge';
import { PATIENTS, DOCTORS, APPOINTMENTS, RECOVERY_PARAMS } from '../data/mockData';

export default function DoctorDashboard({ navigation, route }) {
  const user = route?.params?.user || {};
  const doctor = DOCTORS.find(d => d.id === user.id) || DOCTORS[0];
  const todayAppts = APPOINTMENTS.filter(a => a.status !== 'completed').slice(0, 3);

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good Morning 👋</Text>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialty}>{doctor.specialty}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>{doctor.avatar}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Patients', value: PATIENTS.length, icon: '🏥', color: '#00BCD4' },
              { label: 'Appointments', value: todayAppts.length, icon: '📅', color: '#E040FB' },
              { label: 'Rating', value: doctor.rating, icon: '⭐', color: '#FFD740' },
            ].map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* My Patients */}
          <Text style={styles.sectionTitle}>My Patients</Text>
          {PATIENTS.map((patient) => {
            const params = RECOVERY_PARAMS[patient.id] || {};
            return (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientCard}
                onPress={() => navigation.navigate('Assessment', { patient })}
              >
                <View style={styles.patientLeft}>
                  <Text style={styles.patientAvatar}>{patient.avatar}</Text>
                  <View>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.patientMeta}>Age {patient.age} · {patient.condition}</Text>
                    <Text style={styles.patientDay}>
                      Day {patient.currentDay} / {patient.treatmentDays}
                    </Text>
                  </View>
                </View>
                <View style={styles.patientRight}>
                  <HealthStatusBadge status={params.status || 'Stable'} size="small" />
                  <Text style={styles.patientRecovery}>{params.overall}% recovered</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Today's Appointments */}
          <Text style={styles.sectionTitle}>Today's Appointments</Text>
          {todayAppts.map((appt) => {
            const patient = PATIENTS.find(p => p.id === appt.patientId);
            return (
              <View key={appt.id} style={styles.apptCard}>
                <View style={styles.apptTime}>
                  <Text style={styles.apptTimeText}>{appt.time}</Text>
                </View>
                <View style={styles.apptInfo}>
                  <Text style={styles.apptName}>{patient?.name}</Text>
                  <Text style={styles.apptType}>{appt.type}</Text>
                </View>
                <View style={[
                  styles.apptStatus,
                  { backgroundColor: appt.status === 'confirmed' ? 'rgba(0,230,118,0.15)' : 'rgba(255,215,64,0.15)' }
                ]}>
                  <Text style={[
                    styles.apptStatusText,
                    { color: appt.status === 'confirmed' ? '#00E676' : '#FFD740' }
                  ]}>
                    {appt.status}
                  </Text>
                </View>
              </View>
            );
          })}

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 8 },
  greeting: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  doctorName: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 2 },
  specialty: { color: '#00BCD4', fontSize: 13, marginTop: 2 },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(0,188,212,0.15)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(0,188,212,0.3)',
  },
  avatarEmoji: { fontSize: 28 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 14, marginTop: 4 },
  patientCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16,
    marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  patientLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  patientAvatar: { fontSize: 32 },
  patientName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  patientMeta: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  patientDay: { color: '#00BCD4', fontSize: 11, marginTop: 3 },
  patientRight: { alignItems: 'flex-end', gap: 6 },
  patientRecovery: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  apptCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  apptTime: {
    backgroundColor: 'rgba(0,188,212,0.15)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8,
  },
  apptTimeText: { color: '#00BCD4', fontSize: 12, fontWeight: '700' },
  apptInfo: { flex: 1 },
  apptName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  apptType: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  apptStatus: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  apptStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
});
