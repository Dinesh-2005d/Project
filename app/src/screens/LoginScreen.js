// ══════════════════════════════════════════════
// LoginScreen.js — Role-based Login
// ══════════════════════════════════════════════
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Animated, Alert, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { USERS } from '../data/mockData';

export default function LoginScreen({ navigation }) {
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password && u.role === role);
      setLoading(false);
      if (user) {
        if (role === 'doctor') {
          navigation.replace('DoctorTabs', { user });
        } else {
          navigation.replace('PatientTabs', { user });
        }
      } else {
        Alert.alert('Login Failed', 'Invalid credentials.\n\nTry:\nDoctor: doctor@health.com / 123456\nPatient: patient@health.com / 123456');
      }
    }, 1000);
  };

  const fillDemo = () => {
    if (role === 'doctor') {
      setEmail('doctor@health.com');
      setPassword('123456');
    } else {
      setEmail('patient@health.com');
      setPassword('123456');
    }
  };

  return (
    <LinearGradient colors={['#0A0E27', '#0D1B45', '#091428']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Logo */}
            <View style={styles.logoWrap}>
              <Text style={styles.logoIcon}>🏥</Text>
              <Text style={styles.logoTitle}>HealthCare Pro</Text>
              <Text style={styles.logoSub}>Smart Patient Recovery System</Text>
            </View>

            {/* Role Toggle */}
            <View style={styles.roleToggle}>
              {['doctor', 'patient'].map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.roleBtn, role === r && styles.roleBtnActive]}
                  onPress={() => setRole(r)}
                >
                  <Text style={styles.roleIcon}>{r === 'doctor' ? '👨‍⚕️' : '🧑'}</Text>
                  <Text style={[styles.roleText, role === r && styles.roleTextActive]}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.formLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder={`${role}@health.com`}
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.3)"
                secureTextEntry
              />

              <TouchableOpacity style={styles.demoBtn} onPress={fillDemo}>
                <Text style={styles.demoBtnText}>🔑 Fill Demo Credentials</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#00BCD4', '#0097A7']}
                  style={styles.loginGrad}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginText}>{loading ? 'Signing in...' : 'Sign In →'}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Text style={styles.footer}>© 2024 HealthCare Pro · Anti Gravity Platform</Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 28, paddingTop: 60 },
  logoWrap: { alignItems: 'center', marginBottom: 40 },
  logoIcon: { fontSize: 64, marginBottom: 12 },
  logoTitle: { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  logoSub: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: 0.5 },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 28,
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 11,
    gap: 8,
  },
  roleBtnActive: {
    backgroundColor: 'rgba(0,188,212,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0,188,212,0.4)',
  },
  roleIcon: { fontSize: 20 },
  roleText: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '600' },
  roleTextActive: { color: '#00BCD4' },
  form: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  formLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 6, letterSpacing: 0.8, textTransform: 'uppercase' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  demoBtn: {
    alignSelf: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  demoBtnText: { color: 'rgba(0,188,212,0.8)', fontSize: 13 },
  loginBtn: { borderRadius: 14, overflow: 'hidden' },
  loginBtnDisabled: { opacity: 0.6 },
  loginGrad: { paddingVertical: 16, alignItems: 'center' },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  footer: { color: 'rgba(255,255,255,0.2)', textAlign: 'center', fontSize: 11, marginTop: 40 },
});
