import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image, 
    FlatList,   
} from 'react-native';

import { Header } from '../components/Header';

import waterdropImg from '../assets/waterdrop.png';

import colors from '../styles/colors';
import { loadPlant, PlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../components/PlantCardSecundary';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR }
            );

            setNextWaterd(
                `Não exqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
            ) 
            
            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    }, []);    

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterdropImg} style={styles.spotlightImage}/>

                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PlantCardSecundary
                            data={item}
                            onPress={() => {}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}                
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background,
    },
    spotlight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});