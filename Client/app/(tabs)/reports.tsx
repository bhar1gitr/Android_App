import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ReportsScreen() {
    const router = useRouter();

    const reportData = [
        { id: '1', label: 'हितचिंतक', count: 0, color: '#00C8C8' }, // Teal
        { id: '2', label: 'माझा मतदार', count: 0, color: '#1EB139' }, // Green
        { id: '3', label: '५०-५०', count: 0, color: '#FFD740' },      // Yellow
        { id: '4', label: 'विरोधक', count: 0, color: '#FF5252' },    // Red
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="chevron-left" size={32} color="#FF6600" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>कलर-कोड नुसार रिपोर्ट</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Color Coded Bars */}
                {reportData.map((item) => (
                    <View key={item.id} style={[styles.reportRow, { backgroundColor: item.color }]}>
                        <Text style={styles.labelColor}>{item.label}</Text>
                        <Text style={styles.countColor}>{item.count}</Text>
                    </View>
                ))}

                {/* Plain Text Statistics */}
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>रिक्त</Text>
                    <Text style={styles.statCount}>53242</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    reportRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25, // Rounded pill shape
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    labelColor: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    countColor: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10,
    },
    statLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    statCount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
});