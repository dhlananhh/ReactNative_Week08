import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const BikeDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const calculatePrice = item.price - (item.price * 15 / 100);

    const [fontsLoaded] = useFonts({
        'Voltaire': require('../assets/fonts/Voltaire-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.Part1}>
                <View style={styles.BackgroundImage}>
                    <Image source={{ uri: item.image }} style={{ width: '100%', height: 310 }} />
                </View>
            </View>

            <View style={styles.Part2}>
                <Text style={styles.Name}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '75%' }}>
                    <Text style={styles.SaleOff}>15% OFF | ${calculatePrice}</Text>
                    <Text style={styles.Price}>${item.price}</Text>
                </View>
                <Text style={styles.Description}>Description</Text>
                <Text style={styles.DescriptionContent}>It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.</Text>
            </View>

            <View style={styles.Part3}>
                <TouchableOpacity onPress={() => console.log('Favourite clicked')}>
                    <AntDesign name='hearto' size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.goBack()}>
                    <Text style={styles.ButtonName}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Part1: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Part2: {
        flex: 1.5,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    Part3: {
        flex: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    BackgroundImage: {
        width: 339,
        height: 348,
        backgroundColor: '#E941411A',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    Name: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 35,
        marginLeft: 10,
        marginTop: 10,
    },
    SaleOff: {
        color: '#00000096',
        fontWeight: '400',
        fontSize: 25,
        marginLeft: 10,
    },
    Price: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 25,
        textDecorationLine: 'line-through',
    },
    Description: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 25,
        marginLeft: 10,
    },
    DescriptionContent: {
        color: '#00000091',
        fontWeight: '400',
        fontSize: 22,
        marginLeft: 10,
    },
    Button: {
        backgroundColor: '#E94141',
        width: 269,
        height: 54,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonName: {
        color: '#FFFAFA',
        fontWeight: '400',
        fontSize: 25,
    },
});

export default BikeDetailScreen;
