import { View, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "react-native-svg"
import { useRouter, Router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const router = useRouter();

const PanduanPage = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 100,
                    }}
                >
                    Panduan
                </Text>
            </View>
            <TouchableOpacity
                style={{
                marginTop: 14,
                backgroundColor: "#FFF",
                paddingVertical: 12,
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                }}

                onPress={() => router.push("/food")}
            >
                <Text style={{ color: "#C85A9D", fontSize: 16, fontWeight: "bold", marginLeft: 8 }}>
                Lacak kontraksimu!
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default PanduanPage