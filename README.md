# Smart Healthcare Management & Patient Recovery Monitoring System

> 🏥 A React Native (Expo) mobile app for managing patient health, appointments, electronic health records, and tracking patient recovery progress.

---

## 🔗 Quick Links & App Access

- 🌐 **GitHub Repository**: [https://github.com/Dinesh-2005d/Project](https://github.com/Dinesh-2005d/Project)
- 🚀 **Live EAS Android Build Page**: [https://expo.dev/accounts/deepanjagan/projects/healthcare-pro/builds/81b63dfd-8ecb-458d-ab03-6568ccb019e7](https://expo.dev/accounts/deepanjagan/projects/healthcare-pro/builds/81b63dfd-8ecb-458d-ab03-6568ccb019e7)
- 📱 **All Expo Builds & APK Downloads**: [https://expo.dev/accounts/deepanjagan/projects/healthcare-pro/builds](https://expo.dev/accounts/deepanjagan/projects/healthcare-pro/builds)
- 📦 **Expo Project Page**: [https://expo.dev/accounts/deepanjagan/projects/healthcare-pro](https://expo.dev/accounts/deepanjagan/projects/healthcare-pro)

---

## 📱 Features

### Module 1: Patient & Appointment Management
- Patient registration and profile management
- Doctor availability and appointment booking
- Appointment status tracking and reminders

### Module 2: Electronic Health Records (EHR)
- Medical history
- Diagnosis records
- Laboratory reports
- Prescriptions
- Doctor observations

### Module 3: Doctor Health Assessment & Treatment Management
- Update Blood Pressure, Heart Rate, Temperature, SpO₂
- Record symptoms and test results
- Update diagnosis and treatment plans
- Add doctor remarks and assessments

### Module 4: 📊 Patient Health Progress & Recovery Monitoring *(Key Innovation)*
- Track health changes over time
- Animated **circular progress indicator** for overall recovery
- Recovery score calculated from: Vital Signs, Symptoms, Lab Results, Treatment Response, Doctor Assessment
- Display health status: **Improving** / **Stable** / **Needs Attention**
- Line chart showing recovery trend over treatment days

### Module 5: Medicine & Treatment Tracking
- Medicine name, dosage, frequency, and treatment duration
- Treatment progress bars
- Active/Completed medication status

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native (Expo SDK) |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| Charts | react-native-chart-kit + react-native-svg |
| Styling | StyleSheet (Dark Mode) |
| Storage | AsyncStorage / Mock Data |
| Build | EAS (Expo Application Services) |

---

## 🚀 Getting Started

```bash
# Install dependencies
cd app
npm install

# Start development server
npx expo start

# Run on Android
npx expo run:android
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Doctor | doctor@health.com | 123456 |
| Patient | patient@health.com | 123456 |

---

## 📦 EAS Build (Android APK)

```bash
cd app

# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build Android APK (preview)
eas build --platform android --profile preview
```

---

## 📁 Project Structure

```
Project/
├── app/                    ← Expo React Native app
│   ├── App.js              ← Navigation root
│   ├── app.json            ← Expo configuration
│   ├── eas.json            ← EAS build profiles
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.js
│   │   │   ├── DoctorDashboard.js
│   │   │   ├── PatientDashboard.js
│   │   │   ├── AppointmentScreen.js
│   │   │   ├── HealthRecordsScreen.js
│   │   │   ├── AssessmentScreen.js
│   │   │   └── MedicineTrackingScreen.js
│   │   ├── components/
│   │   │   ├── RecoveryCircle.js
│   │   │   ├── ParameterBar.js
│   │   │   └── HealthStatusBadge.js
│   │   └── data/
│   │       └── mockData.js
│   └── assets/
└── README.md
```

---

## 👨‍💻 Author

**Dinesh R** — Anti Gravity Platform  
GitHub: [@Dinesh-2005d](https://github.com/Dinesh-2005d)

---

> ⚠️ *Note: In a real healthcare product, recovery scores should be defined and validated by qualified healthcare professionals.*
