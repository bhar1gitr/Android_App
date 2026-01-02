import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
    const router = useRouter();

    const DATA = [
        { id: '1', title: 'मतदार शोधा', icon: 'account-search-outline', route: '/search' },
        { id: '2', title: 'माझे मतदार', icon: 'account-group-outline', route: '/my-voters' },
        { id: '3', title: 'फोन बुक', icon: 'phone-outline', route: '/phone-book' },
        { id: '4', title: 'प्रभाग रिपोर्ट', icon: 'file-document-outline', route: '/division-report' },
        { id: '5', title: 'डाउनलोड डेटा ', icon: 'download-outline', route: '/download-data' },
        { id: '6', title: 'विश्लेषण', icon: 'chart-line', route: '/analysis' },
        { id: '7', title: 'रिपोर्ट', icon: 'file-chart-outline', route: '/report' },
        { id: '8', title: 'व्होटिंग', icon: 'ballot-outline', route: '/voting' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Banner Image */}
            <Image
                source={require('../../assets/images/banner.jpg')}
                style={styles.banner}
            />

            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>ठाणे महानगरपालिका</Text>
            </View>

            {/* Info Bar (Version & Date) */}
            <View style={styles.infoBar}>
                <Text style={styles.infoLabel}>
                    आवृत्ती : <Text style={styles.infoValue}>3.9</Text>
                </Text>
                <Text style={styles.infoLabel}>
                    प्रकाशन दिनांक : <Text style={styles.infoValue}>19-12-2025</Text>
                </Text>
            </View>

            {/* Grid Buttons */}
            <FlatList
                data={DATA}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push(item.route as any)}
                    >
                        <View style={styles.innerBox}>
                            <MaterialCommunityIcons name={item.icon as any} size={50} color="#FF6600" />
                            <Text style={styles.cardText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    banner: {
        width: '100%',
        height: 180,
        resizeMode: 'cover'
    },
    header: {
        backgroundColor: '#FF6600',
        padding: 15,
        // Removed excessive paddingTop to prevent covering content
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    infoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    infoLabel: { fontSize: 13, color: '#333', fontWeight: '500' },
    infoValue: { color: '#D35400', fontWeight: 'bold' },
    listContent: {
        padding: 10,
        paddingBottom: 100, // Important: Space for the Bottom Tab Bar
    },
    card: {
        flex: 0.5,
        margin: 10,                 // equal spacing
        paddingVertical: 22,
        paddingHorizontal: 10,
        borderWidth: 5,              // thoda strong border
        borderColor: '#FF6A00',      // clean orange
        borderRadius: 16,            // smooth rounded corners
        alignItems: 'center',
        justifyContent: 'center',
        height: 145,
        backgroundColor: '#fff',

        // Subtle shadow (professional)
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
    },
    cardText: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        fontSize: 14
    }
});