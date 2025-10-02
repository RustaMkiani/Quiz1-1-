import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const handleSubmit = () => {
    if (studentId.trim() === '' || studentName.trim() === '') {
      Alert.alert('Error', 'Please enter both Student ID and Student Name');
    } else {
      const newRecord = { id: studentId, name: studentName, status: attendanceStatus };
      setAttendanceRecords([...attendanceRecords, newRecord]);

      Alert.alert(
        'Attendance Submitted',
        Student: ${studentName} (ID: ${studentId}) is marked as ${attendanceStatus},
      );

      setStudentId('');
      setStudentName('');
      setAttendanceStatus('Present');
    }
  };

  const renderAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <Text style={styles.attendanceText}>
        {item.name} (ID: {item.id}) - {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Attendance System</Text>

      <Card style={styles.card}>
        <Text style={styles.inputLabel}>Student ID</Text>
        <TextInput
          style={styles.input}
          value={studentId}
          onChangeText={setStudentId}
          placeholder="Enter Student ID"
        />

        <Text style={styles.inputLabel}>Student Name</Text>
        <TextInput
          style={styles.input}
          value={studentName}
          onChangeText={setStudentName}
          placeholder="Enter Student Name"
        />

        <Text style={styles.inputLabel}>Attendance Status</Text>
        <View style={styles.attendanceSelector}>
          <Button
            title="Present"
            onPress={() => setAttendanceStatus('Present')}
            color={attendanceStatus === 'Present' ? '#4CAF50' : '#bbb'}
          />
          <Button
            title="Absent"
            onPress={() => setAttendanceStatus('Absent')}
            color={attendanceStatus === 'Absent' ? '#f44336' : '#bbb'}
          />
        </View>

        <Button title="Submit Attendance" onPress={handleSubmit} style={styles.submitButton} />
      </Card>

      <Text style={styles.attendanceListHeader}>Attendance Records</Text>

      <FlatList
        data={attendanceRecords}
        renderItem={renderAttendanceItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 20,
  },
  attendanceSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  attendanceListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  attendanceItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    elevation: 2,
  },
  attendanceText: {
    fontSize: 16,
    color: '#333',
  },
});