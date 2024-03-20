import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import { retrieveFavorite, removeFromFavorite, clearFavorite } from "../../utils/WatchUtils";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const FavoriteScreen = () => {
    const [favoriteOrchid, setFavoriteOrchid] = useState([])
    const navigation = useNavigation()

    const getFavoriteOrchid = async () => {
        retrieveFavorite().then((data) => {
            setFavoriteOrchid(data)
        })
    }

    const removeFavorite = (id) => {
        Alert.alert(
            "Remove Favorite",
            "Are you sure you want to remove this watch from favorite?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        removeFromFavorite(id)
                    }
                }
            ]
        )
    }

    const removeFavoriteAll = () => {
        Alert.alert(
            "Remove All Favorite",
            "Are you sure you want to remove all watch from favorite?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        clearFavorite()
                    }
                }
            ]
        )
    }

    const viewOrchid = (id) => {
        navigation.navigate("Detail", { id: id, prevScreen: "Favorite" })
    }

    useEffect(() => {
        getFavoriteOrchid()
    }, [favoriteOrchid])


    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.favoriteHeader}>Favorite</Text>
            {
                favoriteOrchid.length > 0 ? (
                    <View style={{flex: 1}}>
                        <FlatList
                            data={favoriteOrchid}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View key={item.id - 1} style={styles.favoriteBody}>
                                    <TouchableOpacity style={styles.favoriteCardBox} onPress={() => viewOrchid(item.id - 1)}>
                                        <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                                        <View style={{ width: 200 }}>
                                            <Text style={styles.favoriteText}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.orchidAddButton} onPress={() => removeFavorite(item.id - 1)}>
                                        <Text style={styles.orchidFavoritedText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                        {
                            favoriteOrchid.length > 1 ? (
                                <TouchableOpacity style={styles.orchidRemoveAllButton} onPress={() => removeFavoriteAll()}>
                                    <Text style={styles.orchidFavoritedText}>Remove All</Text>
                                </TouchableOpacity>
                            ) : (
                                <View></View>
                            )
                        }
                    </View>
                ) : (
                    <View style={styles.emptyFavorite}>
                        <Text style={styles.emptyFavoriteText}>No Favorite Watch</Text>
                    </View>
                )
            }
        </View>
    );
}

export default FavoriteScreen;