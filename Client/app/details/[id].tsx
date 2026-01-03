import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import API from '../../services/api';

export default function VoterDetails() {
    const { id } = useLocalSearchParams(); // Gets the ID from the URL
    const router = useRouter();
    const [voter, setVoter] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVoterDetails = async () => {
            try {
                // Fetch specific voter by ID from your Node.js backend
                const response = await API.get(`/voters/${id}`);
                setVoter(response.data);
            } catch (error) {
                console.error("Error fetching voter details:", error);
            } finally {
                setLoading(false);
            }
        };
        getVoterDetails();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" color="#FF6600" style={{ flex: 1 }} />;
    if (!voter) return <Text style={styles.errorText}>माहिती सापडली नाही</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>मतदार तपशील</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <MaterialCommunityIcons name="account" size={50} color="#fff" />
                    </View>
                    <Text style={styles.name}>{voter.name}</Text>
                    <Text style={styles.epic}>ID: {voter.epic}</Text>
                </View>

                <View style={styles.infoCard}>
                    <DetailItem icon="calendar-outline" label="वय" value={`${voter.age} वर्षे`} />
                    <DetailItem icon="gender-male-female" label="लिंग" value={voter.gender} />
                    <DetailItem icon="office-building" label="बूथ क्रमांक" value={voter.booth} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const DetailItem = ({ icon, label, value }: any) => (
    <View style={styles.item}>
        <MaterialCommunityIcons name={icon} size={22} color="#FF6600" />
        <View style={styles.itemText}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    content: { padding: 20 },
    profileSection: { alignItems: 'center', marginBottom: 30 },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FF6600', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    epic: { fontSize: 14, color: '#666' },
    infoCard: { backgroundColor: '#F9F9F9', borderRadius: 15, padding: 15 },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    itemText: { marginLeft: 15 },
    label: { fontSize: 12, color: '#888' },
    value: { fontSize: 16, fontWeight: '600', color: '#333' },
    errorText: { textAlign: 'center', marginTop: 50, color: 'red' }
});