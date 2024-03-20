import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import { addToFavorite, removeFromFavorite, retrieveAutomatic, sortAutomatic } from "../../utils/WatchUtils";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Automatic = () => {
    const [favoriteOrchid, setFavoriteOrchid] = useState([])
    const navigation = useNavigation()

    const getFavoriteOrchid = async () => {
        retrieveAutomatic().then((data) => {
            setFavoriteOrchid(data)
        })
    }

    const viewOrchid = (id) => {
        navigation.navigate("Detail", { id: id, prevScreen: "Automatic" })
    }

    const addFavorite = (index, id) => {
        let orchidDataArray = [...favoriteOrchid]
        orchidDataArray[index].favorite = true
        setFavoriteOrchid(orchidDataArray)
        addToFavorite(id)
    }

    const removeFavorite = (index, id) => {
        let orchidDataArray = [...favoriteOrchid]
        orchidDataArray[index].favorite = false
        setFavoriteOrchid(orchidDataArray)
        removeFromFavorite(id)
    }

    const sortAutomaticDesc = () => {
        sortAutomatic().then((data) => {
            setFavoriteOrchid(data)
        })
    }

    useFocusEffect(
        useCallback(() => {
            getFavoriteOrchid()
        }, [])
    )


    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.favoriteHeader}>Automatic</Text>
            <TouchableOpacity onPress={() => sortAutomaticDesc()}>
                <Text>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getFavoriteOrchid()}>
                <Text>Reset</Text>
            </TouchableOpacity>
            {
                favoriteOrchid.length > 0 ? (
                    <View style={{ flex: 1}}>
                        <FlatList
                            data={favoriteOrchid}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <View key={item.id - 1} style={styles.favoriteBody}>
                                    <TouchableOpacity style={styles.favoriteCardBox} onPress={() => viewOrchid(item.id - 1)}>
                                        <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                                        <View style={{ width: 200 }}>
                                            <Text style={styles.favoriteText}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.favoriteText}>{item.price}$</Text>
                                        </View>
                                        <View>
                                        {item.favorite ? (
                                            <TouchableOpacity style={styles.orchidAddButton} onPress={() => removeFavorite(index, item.id - 1)}>
                                                <View style={styles.orchidFavoritedButton}>
                                                    <Image source={require('../../assets/Favorite.png')} style={styles.orchidFavoritedImage} />
                                                    <Text style={styles.orchidFavoritedText}>Favorited</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={styles.orchidAddButton} onPress={() => addFavorite(index, item.id - 1)}>
                                                <Text style={styles.orchidButtonColor}>Add to Favorite</Text>
                                            </TouchableOpacity>
                                        )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
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

export default Automatic;