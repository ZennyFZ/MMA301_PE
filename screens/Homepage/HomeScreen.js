import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "./Style"
import { filterOrchid, getWatchCategory, addToFavorite, removeFromFavorite } from "../../utils/WatchUtils"
import { useState, useCallback } from "react"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

const Homepage = () => {
    const [selectedOrchid, setSelectedOrchid] = useState(-1)
    const [orchidData, setOrchidData] = useState([])
    const navigation = useNavigation()

    const goToDetail = (index) => {
        navigation.navigate("Detail", { id: index - 1, prevScreen: "Home" })
    }

    const filterOrchidData = (category) => {
        if(category === "all") {
            setSelectedOrchid(-1)
        }
        filterOrchid(category).then((data) => {
            setOrchidData(data)
        })
    }

    useFocusEffect(
        useCallback(() => {
            filterOrchidData("all")
        }, [])
    )

    const addFavorite = (index, id) => {
        let orchidDataArray = [...orchidData]
        orchidDataArray[index].favorite = true
        setOrchidData(orchidDataArray)
        addToFavorite(id)
    }

    const removeFavorite = (index, id) => {
        let orchidDataArray = [...orchidData]
        orchidDataArray[index].favorite = false
        setOrchidData(orchidDataArray)
        removeFromFavorite(id)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image source={require("../../assets/Banner.jpg")} resizeMode='stretch' style={styles.banner} />
                <Text style={styles.headerText}>Watch Company</Text>
            </View>

            <View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={styles.scrollView}
                >
                    <TouchableOpacity style={[styles.allOrchids, { backgroundColor: selectedOrchid < 0 ? '#92B4D3' : '#d3d8e0' }]} onPress={() => { setSelectedOrchid(-1), filterOrchidData("all") }}>
                        <Text style={styles.allOrchidText}>All Orchids</Text>
                    </TouchableOpacity>
                    {getWatchCategory().map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={[styles.allOrchids, { backgroundColor: selectedOrchid === index ? '#92B4D3' : '#d3d8e0' }]} onPress={() => { setSelectedOrchid(index), filterOrchidData(item) }}>
                                <Text style={styles.allOrchidText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

            <FlatList
                data={orchidData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({index, item }) => {
                    return (
                        <TouchableOpacity onPress={() => goToDetail(item.id)}>
                        <View style={styles.flatList}>
                            <Image source={{ uri: item.image }} style={styles.orchidImage} />
                            <View style={styles.orchidInformationBox}>
                                <Text style={styles.orchidName}>{item.name}</Text>
                                <Text style={styles.orchidCategory}>Brand: {item.brandName}</Text>
                                <View style={styles.orchidButtonBox}>
                                    <TouchableOpacity onPress={() => goToDetail(item.id)}>
                                    </TouchableOpacity>
                                    {item.favorite ? (
                                        <TouchableOpacity style={styles.orchidAddButton} onPress={() => removeFavorite(index, item.id-1)}>
                                            <View style={styles.orchidFavoritedButton}>
                                                <Image source={require('../../assets/Favorite.png')} style={styles.orchidFavoritedImage} />
                                                <Text style={styles.orchidFavoritedText}>Favorited</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.orchidAddButton} onPress={() => addFavorite(index, item.id-1)}>
                                            <Text style={styles.orchidButtonColor}>Add to Favorite</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Homepage