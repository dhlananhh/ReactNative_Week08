import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
const widthWindow = Dimensions.get('window').width;

const DATA = [
    {
        id: 1,
        name: "Pinarello",
        price: 1800,
        image: require('./Images/bifour_-removebg-preview (1).png'),
        type:'Mountain'
    },
    {
        id: 2,
        name: "Pina Mountai",
        price: 1700,
        image: require('./Images/bione-removebg-preview.png'),
        type:'Mountain'
    },
    {
        id: 3,
        name: "Pina Bike",
        price: 1500,
        image: require('./Images/bithree_removebg-preview.png'),
        type:'Roadbike'
    },
    {
        id: 4,
        name: "Pinarello",
        price: 1900,
        image: require('./Images/bitwo-removebg-preview.png'),
        type:'Roadbike'
    },
    {
        id: 5,
        name: "Pinarello",
        price: 2700,
        image: require('./Images/bithree_removebg-preview.png'),
        type:'Roadbike'
    },
    {
        id: 6,
        name: "Pinarello",
        price: 1350,
        image: require('./Images/bione-removebg-preview.png'),
        type:'Mountain'
    },
]

const Item = ({ item, isHeart, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Screen03',
        {item}
    )}>
        <View style={Styles.Item}>
            <View style={{ position: 'relative' }}>
                {isHeart && <Image source={require('./Images/heart.png')} style={{ width: 25, height: 25, position: 'absolute' }} />}
                {!isHeart && <Image source={require('./Images/heart (1).png')} style={{ width: 25, height: 25, position: 'absolute' }} />}
                <Image source={{uri: item.image}} style={{ width: 135, height: 127 }} />
            </View>
            <Text style={Styles.ItemName}>{item.name}</Text>
            <Text style={Styles.ItemPrice}><Text style={{ color: '#F7BA83', fontWeight: 400, fontSize: 20 }}>$</Text>{item.price}</Text>
        </View>
    </TouchableOpacity>
)

const App = ({ navigation }) => {

    const[dataInitial, setDataInitial] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const filterRoadbike = () => {
        setData(dataInitial.filter(item => item.type === 'Roadbike'))
    }
    const filterMountain = () => {
        setData(dataInitial.filter(item => item.type === 'Mountain'))
    }
    const filterAll = () => {
        setData(dataInitial)
    }

    const fetchData = async () => {
        try {
          const response = await fetch('https://670b36dcac6860a6c2cb6921.mockapi.io/data');
          const json = await response.json();
          setDataInitial(json);
          setData(json);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchData();
    },[])

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.Part1}>
                <Text style={Styles.Text}>The world’s Best Bike</Text>
                <View style={{ width: widthWindow, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 5 }}>
                    <TouchableOpacity style={Styles.Button} onPress={filterAll}>
                        <Text style={[Styles.ButtonName, { color: '#E94141' }]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.Button} onPress={filterRoadbike}>
                        <Text style={[Styles.ButtonName, { color: '#BEB6B6' }]}>Roadbike</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.Button} onPress={filterMountain}>
                        <Text style={[Styles.ButtonName, { color: '#BEB6B6' }]}>Mountain</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.Part2}>
                <SafeAreaView style={{ height: '100%' }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Item item={item} isHeart={item.id === 1} navigation={navigation}/>}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Part1: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    Part2: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text: {
        color: '#E94141',
        fontWeight: 700,
        fontSize: 25,
        left: -45,
        marginTop: 20
    },
    Button: {
        borderColor: '#E9414187',
        borderWidth: 1,
        borderRadius: 5,
        width: 99,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonName: {
        fontWeight: 400,
        fontSize: 20

    },
    Item: {
        backgroundColor: '#F7BA8326',
        borderRadius: 10,
        width: 167,
        height: 200,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ItemName: {
        color: '#00000099',
        fontWeight: 400,
        fontSize: 20
    },
    ItemPrice: {
        color: '#000000',
        fontWeight: 400,
        fontSize: 20
    }
})

export default App;