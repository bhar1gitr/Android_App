import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SyncScreen() {
    const [syncing, setSyncing] = useState(false);

    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => setSyncing(false), 3000); // Simulate sync
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>डेटा सिंक्रोनाइझेशन</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.syncStatusCard}>
                    <MaterialCommunityIcons 
                        name={syncing ? "sync" : "check-circle"} 
                        size={80} 
                        color={syncing ? "#FF6600" : "#4CAF50"} 
                    />
                    <Text style={styles.statusTitle}>
                        {syncing ? "डेटा सिंक होत आहे..." : "सर्व डेटा सुरक्षित आहे"}
                    </Text>
                    <Text style={styles.lastSync}>शेवटचा सिंक: आज, १२:३० PM</Text>
                </View>

                <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>ऑफलाइन मतदार:</Text>
                        <Text style={styles.infoValue}>१४२</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>प्रलंबित बदल:</Text>
                        <Text style={styles.infoValue}>१२</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.syncButton, syncing && styles.disabledButton]} 
                    onPress={handleSync}
                    disabled={syncing}
                >
                    {syncing ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <MaterialCommunityIcons name="cloud-upload-outline" size={24} color="#fff" />
                            <Text style={styles.syncButtonText}>आता सिंक करा</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
    syncStatusCard: { alignItems: 'center', marginBottom: 40 },
    statusTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, color: '#333' },
    lastSync: { color: '#999', marginTop: 5 },
    infoBox: { width: '100%', backgroundColor: '#F8F9FA', borderRadius: 15, padding: 20, marginBottom: 40 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    infoLabel: { fontSize: 16, color: '#666' },
    infoValue: { fontSize: 16, fontWeight: 'bold', color: '#FF6600' },
    syncButton: { backgroundColor: '#FF6600', width: '100%', height: 60, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 },
    disabledButton: { backgroundColor: '#FFCCBC' },
    syncButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }
});