// ══════════════════════════════════════════════
// AppointmentScreen.js
// ══════════════════════════════════════════════
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { APPOINTMENTS, PATIENTS, DOCTORS } from '../data/mockData';

const STATUS_COLORS = {
  confirmed: '#00E676',
  pending:   '#FFD740',
  scheduled: '#00BCD4',
  completed: 'rgba(255,255,255,0.3)',
};

export default function AppointmentScreen() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? APPOINTMENTS
    : APPOINTMENTS.filter(a => a.status === filter);

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>📅 Appointments</Text>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {['all', 'confirmed', 'pending', 'scheduled'].map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterTab, filter === f && styles.filterTabActive]}
                onPress={() => setFilter(f)}
              >
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Appointments */}
          {filtered.map((appt) => {
            const patient = PATIENTS.find(p => p.id === appt.patientId);
            const doctor = DOCTORS.find(d => d.id === appt.doctorId);
            return (
              <TouchableOpacity
                key={appt.id}
                style={styles.apptCard}
                onPress={() => Alert.alert(
                  `${appt.type}`,
                  `Patient: ${patient?.name}\nDoctor: ${doctor?.name}\nDate: ${appt.date}\nTime: ${appt.time}\nStatus: ${appt.status}`
                )}
              >
                <View style={[styles.statusBar, { backgroundColor: STATUS_COLORS[appt.status] || '#888' }]} />
                <View style={styles.apptBody}>
                  <View style={styles.apptHeader}>
                    <Text style={styles.apptType}>{appt.type}</Text>
                    <View style={[
                      styles.statusPill,
                      { backgroundColor: `${STATUS_COLORS[appt.status]}20` || 'rgba(255,255,255,0.1)' }
                    ]}>
                      <Text style={[styles.statusText, { color: STATUS_COLORS[appt.status] || '#fff' }]}>
                        {appt.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.apptPatient}>👤 {patient?.name}</Text>
                  <Text style={styles.apptDoctor}>👨‍⚕️ {doctor?.name}</Text>
                  <View style={styles.apptMeta}>
                    <Text style={styles.apptDate}>📅 {appt.date}</Text>
                    <Text style={styles.apptTime}>🕐 {appt.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Book New Appointment */}
          <TouchableOpacity style={styles.newApptBtn}>
            <LinearGradient colors={['#E040FB', '#AB47BC']} style={styles.newApptGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.newApptText}>＋  Book New Appointment</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Doctors Available */}
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          {DOCTORS.map((d) => (
            <View key={d.id} style={styles.doctorCard}>
              <Text style={styles.doctorEmoji}>{d.avatar}</Text>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{d.name}</Text>
                <Text style={styles.doctorSpec}>{d.specialty} · {d.experience}</Text>
                <Text style={styles.doctorRating}>⭐ {d.rating}</Text>
              </View>
              <View style={[
                styles.availDot,
                { backgroundColor: d.available ? '#00E676' : '#FF5252' }
              ]}>
                <Text style={styles.availText}>{d.available ? 'Free' : 'Busy'}</Text>
              </View>
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
  pageTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginBottom: 16, marginTop: 8 },
  filterRow: { marginBottom: 16 },
  filterTab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  filterTabActive: { backgroundColor: 'rgba(0,188,212,0.2)', borderColor: '#00BCD4' },
  filterText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#00BCD4' },
  apptCard: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16, marginBottom: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  statusBar: { width: 4 },
  apptBody: { flex: 1, padding: 14 },
  apptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  apptType: { color: '#fff', fontSize: 15, fontWeight: '700' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  apptPatient: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 3 },
  apptDoctor: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 8 },
  apptMeta: { flexDirection: 'row', gap: 16 },
  apptDate: { color: '#00BCD4', fontSize: 12 },
  apptTime: { color: '#E040FB', fontSize: 12 },
  newApptBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 24, marginTop: 8 },
  newApptGrad: { paddingVertical: 16, alignItems: 'center' },
  newApptText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 14 },
  doctorCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  doctorEmoji: { fontSize: 36 },
  doctorInfo: { flex: 1 },
  doctorName: { color: '#fff', fontSize: 14, fontWeight: '700' },
  doctorSpec: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 3 },
  doctorRating: { color: '#FFD740', fontSize: 12, marginTop: 3 },
  availDot: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  availText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
