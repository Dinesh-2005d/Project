// ════════════════════════════════════════════
// mockData.js — Healthcare App Mock Data
// Smart Healthcare Management System
// ════════════════════════════════════════════

export const DOCTORS = [
  { id: 'd1', name: 'Dr. Priya Sharma', specialty: 'Cardiology', available: true, avatar: '👩‍⚕️', experience: '12 yrs', rating: 4.9 },
  { id: 'd2', name: 'Dr. Arjun Mehta', specialty: 'Neurology', available: true, avatar: '👨‍⚕️', experience: '8 yrs', rating: 4.7 },
  { id: 'd3', name: 'Dr. Sunita Rao', specialty: 'Orthopedics', available: false, avatar: '👩‍⚕️', experience: '15 yrs', rating: 4.8 },
  { id: 'd4', name: 'Dr. Kiran Patel', specialty: 'General Medicine', available: true, avatar: '👨‍⚕️', experience: '10 yrs', rating: 4.6 },
];

export const PATIENTS = [
  {
    id: 'p1',
    name: 'Ravi Kumar',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    condition: 'Hypertension & Recovery',
    admitDate: '2024-01-02',
    doctorId: 'd1',
    treatmentDays: 10,
    currentDay: 7,
    avatar: '🧑',
  },
  {
    id: 'p2',
    name: 'Meena Devi',
    age: 34,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 87654 32109',
    condition: 'Post-Surgery Recovery',
    admitDate: '2024-01-05',
    doctorId: 'd2',
    treatmentDays: 14,
    currentDay: 5,
    avatar: '👩',
  },
];

export const APPOINTMENTS = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: '2024-01-10', time: '10:00 AM', status: 'confirmed', type: 'Follow-up' },
  { id: 'a2', patientId: 'p2', doctorId: 'd2', date: '2024-01-11', time: '2:30 PM', status: 'pending', type: 'Consultation' },
  { id: 'a3', patientId: 'p1', doctorId: 'd1', date: '2024-01-15', time: '11:00 AM', status: 'scheduled', type: 'Check-up' },
];

export const HEALTH_RECORDS = {
  p1: {
    history: 'Hypertension diagnosed in 2020. Family history of cardiac disease.',
    diagnosis: 'Stage 2 Hypertension with mild cardiac involvement',
    labReports: [
      { test: 'CBC', result: 'Normal', date: '2024-01-03' },
      { test: 'Lipid Profile', result: 'LDL: 140 mg/dL (High)', date: '2024-01-03' },
      { test: 'ECG', result: 'Mild ST changes', date: '2024-01-04' },
    ],
    prescriptions: ['Amlodipine 5mg', 'Atorvastatin 20mg', 'Aspirin 75mg'],
    doctorNotes: 'Patient responding well to medication. Monitor BP daily.',
  },
};

export const VITALS_HISTORY = {
  p1: [
    { day: 1, date: 'Jan 02', bp: '160/100', hr: 95, temp: 99.1, spo2: 94, recoveryScore: 30 },
    { day: 3, date: 'Jan 04', bp: '150/95', hr: 88, temp: 98.6, spo2: 96, recoveryScore: 42 },
    { day: 5, date: 'Jan 06', bp: '140/90', hr: 82, temp: 98.4, spo2: 97, recoveryScore: 55 },
    { day: 7, date: 'Jan 08', bp: '130/85', hr: 78, temp: 98.2, spo2: 98, recoveryScore: 75 },
    { day: 10, date: 'Jan 11', bp: '120/80', hr: 72, temp: 98.0, spo2: 99, recoveryScore: 90 },
  ],
  p2: [
    { day: 1, date: 'Jan 05', bp: '118/78', hr: 90, temp: 100.2, spo2: 95, recoveryScore: 25 },
    { day: 3, date: 'Jan 07', bp: '116/76', hr: 84, temp: 99.1, spo2: 96, recoveryScore: 38 },
    { day: 5, date: 'Jan 09', bp: '115/75', hr: 80, temp: 98.5, spo2: 97, recoveryScore: 52 },
  ],
};

export const RECOVERY_PARAMS = {
  p1: {
    vitalSigns: 85,
    symptoms: 80,
    labResults: 75,
    treatmentResponse: 90,
    doctorAssessment: 85,
    overall: 83,
    status: 'Improving',
  },
  p2: {
    vitalSigns: 60,
    symptoms: 55,
    labResults: 65,
    treatmentResponse: 58,
    doctorAssessment: 62,
    overall: 60,
    status: 'Stable',
  },
};

export const MEDICINES = {
  p1: [
    { id: 'm1', name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', status: 'active', progress: 70 },
    { id: 'm2', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once at night', duration: '30 days', status: 'active', progress: 70 },
    { id: 'm3', name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '15 days', status: 'completed', progress: 100 },
  ],
  p2: [
    { id: 'm4', name: 'Cefazolin', dosage: '1g', frequency: 'Twice daily', duration: '7 days', status: 'active', progress: 55 },
    { id: 'm5', name: 'Tramadol', dosage: '50mg', frequency: 'As needed', duration: '5 days', status: 'active', progress: 80 },
  ],
};

export const USERS = [
  { id: 'd1', role: 'doctor', email: 'doctor@health.com', password: '123456', name: 'Dr. Priya Sharma' },
  { id: 'p1', role: 'patient', email: 'patient@health.com', password: '123456', name: 'Ravi Kumar' },
];
