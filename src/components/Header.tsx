import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import profileImg from '../assets/profile.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadUserName();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <Image source={profileImg} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: Constants.statusBarHeight,
    },
    greeting: {
        fontSize: 24,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 24,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 28
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
});