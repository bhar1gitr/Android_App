import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import API from '../../services/api'; // Ensure this path matches your file structure

export default function VoterSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Function to fetch data from Node.js Backend
    const fetchVoters = async () => {
        try {
            const response = await API.get('/voters');
            // Sort by most recent if you want the new records at the top
            setVoters(response.data.reverse());
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Real-Time Logic: Initial load + Polling every 10 seconds
    useEffect(() => {
        fetchVoters(); // Initial load

        const interval = setInterval(() => {
            console.log("Auto-refreshing voter list...");
            fetchVoters();
        }, 10000); // 10000ms = 10 seconds

        // Cleanup: Stops the interval when you leave this page
        return () => clearInterval(interval);
    }, []);

    // Manual Swipe-to-Refresh logic
    const onRefresh = () => {
        setRefreshing(true);
        fetchVoters();
    };

    // Filter Logic for Search Bar
    const filteredVoters = voters.filter(voter =>
        voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voter.epic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>मतदार शोधा</Text>
                </View>

                {/* Search Bar Section */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <MaterialCommunityIcons name="magnify" size={24} color="#666" />
                        <TextInput
                            style={styles.input}
                            placeholder="नाव किंवा मतदार ओळखपत्र क्रमांक टाका"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                {/* Main Content Area */}
                {loading && !refreshing ? (
                    <View style={styles.centerLoader}>
                        <ActivityIndicator size="large" color="#FF6600" />
                        <Text style={styles.loaderText}>माहिती लोड होत आहे...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredVoters}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#FF6600']}
                                tintColor={'#FF6600'}
                            />
                        }
                        renderItem={({ item }) => (
                            <View style={styles.voterCard}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.voterName}>{item.name}</Text>
                                    <View style={styles.boothBadge}>
                                        <Text style={styles.boothText}>बूथ: {item.booth}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text style={styles.voterDetails}>
                                        वय: <Text style={styles.boldDetail}>{item.age}</Text> |
                                        लिंग: <Text style={styles.boldDetail}>{item.gender}</Text>
                                    </Text>
                                    <Text style={styles.epicText}>EPIC ID: {item.epic}</Text>
                                </View>
                                <TouchableOpacity style={styles.viewButton}
                                    style={styles.viewButton}
                                    // Navigate to the details folder using the MongoDB _id
                                    onPress={() => router.push({
                                        pathname: "/details/[id]",
                                        params: { id: item._id }
                                    })}>
                                    <Text style={styles.viewButtonText}>पूर्ण माहिती पहा</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <MaterialCommunityIcons name="account-search-outline" size={50} color="#ccc" />
                                <Text style={styles.emptyText}>कोणतेही मतदार सापडले नाहीत</Text>
                            </View>
                        }
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 2
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    searchContainer: { flexDirection: 'row', padding: 15, alignItems: 'center' },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
    voterCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    voterName: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', flex: 1 },
    boothBadge: { backgroundColor: '#FF660015', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    boothText: { color: '#FF6600', fontWeight: 'bold', fontSize: 13 },
    cardBody: { marginVertical: 10 },
    voterDetails: { color: '#666', fontSize: 14, marginBottom: 4 },
    boldDetail: { color: '#333', fontWeight: '600' },
    epicText: { color: '#888', fontSize: 13, letterSpacing: 0.5 },
    viewButton: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 12
    },
    viewButtonText: { color: '#FF6600', fontWeight: 'bold', textAlign: 'center', fontSize: 15 },
    centerLoader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loaderText: { marginTop: 10, color: '#666' },
    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: '#999', marginTop: 10, fontSize: 16 }
});