import { View, StyleSheet, Image, Text ,Button} from "react-native";

export default function Card({ item }) {
    function handlePress() {
        console.log("Card pressed");
    }
    return (
        <View style={styles.container}>
            
                <Image
                    source={{
                        uri: item.images ? item.images[0] : null,
                        height: 200,
                    }}
                    resizeMode="contain"
                />
            <View
                style={{
                    marginTop: 10,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderColor: "#e5e5e5",
                }}
            >
                <View style= {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'  }}>
                
                <View>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.category}>
                        {item.category}
                    </Text>
                </View>
                <Image
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/2550/2550288.png",
                        marginTop: 10,
                        height: 30,
                        width: 30,
                        
                    }}
                    resizeMode="contain"
                />
                </View>

                <Text style={styles.price}>
                    {item.price}$
                </Text>

                <Button title="I'll buy" onPress={handlePress} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "lightgray"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    category: {
        fontSize: 18,
        color: "gray",
        fontWeight: 700
    },
    price: {
        fontSize: 20,
        color: "green",
        fontWeight: 700,
        textAlign: "right",
        marginBottom: 10
    }
});