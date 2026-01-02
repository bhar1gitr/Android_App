import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Switch,
    Modal,
    FlatList,
    TextInput,
    Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LANGUAGES } from '../../constants/language';
import '../i18n';

export default function SettingsScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // 1. SEARCH FILTER LOGIC
    const filteredLanguages = useMemo(() => {
        return LANGUAGES.filter(lang =>
            lang.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // 2. CHANGE LANGUAGE LOGIC
    const changeLanguage = async (code: string) => {
        i18n.changeLanguage(code);
        await AsyncStorage.setItem('user-language', code);
        setModalVisible(false);
        setSearchQuery('');
    };

    // 3. LOGOUT LOGIC
   const handleLogout = async () => {
        try {
            // 1. Clear storage
            await AsyncStorage.clear();

            // 2. Clear Auth State if using AuthContext
            // logout(); 

            // 3. Navigate to Login immediately
            // Ensure pathing matches your Expo Router structure (usually '/' or '/login')
            router.replace('/'); 
        } catch (e) {
            console.error("Logout Error", e);
        }
    };

    const SettingItem = ({ icon, title, subtitle, onPress, showSwitch = false, color = "#FF6600", isDestructive = false }: any) => (
        <TouchableOpacity style={styles.item} onPress={onPress} disabled={showSwitch}>
            <View style={[styles.iconContainer, { backgroundColor: isDestructive ? '#FFE5E5' : color + '15' }]}>
                <MaterialCommunityIcons name={icon} size={22} color={isDestructive ? '#FF3B30' : color} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.itemTitle, isDestructive && { color: '#FF3B30' }]}>{title}</Text>
                {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
            </View>
            {showSwitch ? (
                <Switch
                    value={isNotificationEnabled}
                    onValueChange={setIsNotificationEnabled}
                    trackColor={{ false: "#ddd", true: "#FF660050" }}
                    thumbColor={isNotificationEnabled ? "#FF6600" : "#f4f3f4"}
                />
            ) : (
                <MaterialCommunityIcons name="chevron-right" size={24} color="#CCC" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* SEARCHABLE LANGUAGE MODAL */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Language</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search language..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            clearButtonMode="while-editing"
                        />

                        <FlatList
                            data={filteredLanguages}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.langOption}
                                    onPress={() => changeLanguage(item.value)}
                                >
                                    <Text style={[
                                        styles.langText,
                                        i18n.language === item.value && styles.selectedLangText
                                    ]}>
                                        {item.label}
                                    </Text>
                                    {i18n.language === item.value && (
                                        <MaterialCommunityIcons name="check-circle" size={20} color="#FF6600" />
                                    )}
                                </TouchableOpacity>
                            )}
                            style={{ maxHeight: 400 }}
                        />
                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('settings')}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <MaterialCommunityIcons name="account" size={40} color="#fff" />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>Admin</Text>
                        <Text style={styles.userRole}>TMC Department</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>{t('account')}</Text>
                <View style={styles.group}>
                    <SettingItem icon="account-edit-outline" title={t('profile')} subtitle="Change name and contact" />
                </View>

                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.group}>
                    <SettingItem icon="bell-outline" title="Notifications" showSwitch={true} />
                    <SettingItem
                        icon="translate"
                        title={t('language')}
                        subtitle={LANGUAGES.find(l => l.value === i18n.language)?.label || 'English'}
                        onPress={() => setModalVisible(true)}
                    />
                </View>

                {/* LOGOUT SECTION */}
                <Text style={styles.sectionTitle}>Session</Text>
                <View style={styles.group}>
                    <SettingItem
                        icon="logout"
                        title={t('logout') || "Logout"}
                        subtitle="Sign out of your account"
                        onPress={handleLogout}
                        isDestructive={true}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>Version 1.0.4</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { backgroundColor: '#fff', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 50 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    profileCard: { flexDirection: 'row', padding: 20, backgroundColor: '#fff', marginVertical: 10, alignItems: 'center' },
    avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FF6600', justifyContent: 'center', alignItems: 'center' },
    profileInfo: { marginLeft: 15 },
    userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    userRole: { fontSize: 14, color: '#666' },
    sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#999', marginLeft: 20, marginTop: 15, marginBottom: 5, textTransform: 'uppercase' },
    group: { backgroundColor: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eee' },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    iconContainer: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    textContainer: { flex: 1, marginLeft: 15 },
    itemTitle: { fontSize: 16, color: '#333', fontWeight: '500' },
    itemSubtitle: { fontSize: 12, color: '#999', marginTop: 2 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContent: { width: '95%', backgroundColor: 'white', borderRadius: 20, padding: 20, elevation: 5, maxHeight: '80%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    searchBar: { backgroundColor: '#F0F0F0', padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 16 },
    langOption: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    langText: { fontSize: 16, color: '#333' },
    selectedLangText: { color: '#FF6600', fontWeight: 'bold' },

    footer: { padding: 40, alignItems: 'center' },
    versionText: { color: '#CCC', fontSize: 12 }
});