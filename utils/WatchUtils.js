import db from "../assets/db"
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async () => {
    try {
        await AsyncStorage.setItem('watchList', JSON.stringify(db));
    } catch (e) {
        console.log(e);
    }
}

const retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('watchList');
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (e) {
        console.log(e);
    }
}

const updateData = async (data) => {
    try {
        await AsyncStorage.setItem('watchList', JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

const getWatchCategory = () => {
    let watch = []
    db.map((item) => {
        if (!watch.includes(item.brandName)) {
            watch.push(item.brandName)
        }
    })
    return watch
}

const filterOrchid = async (category) => {
    let orchid = await retrieveData()
    if (category === "all") {
        return orchid
    } else {
        return orchid.filter((item) => item.brandName === category)
    }
}

const getOrchidById = async (id) => {
    let orchid = await retrieveData()
    return orchid[id]
}

const removeFromFavorite = async (id) => {
    let orchid = await retrieveData()
    orchid[id].favorite = false
    updateData(orchid)
}

const clearFavorite = async () => {
    let orchid = await retrieveData()
    orchid.forEach((item) => item.favorite = false)
    updateData(orchid)
}

const addToFavorite = async (id) => {
    let orchid = await retrieveData()
    orchid[id].favorite = true
    updateData(orchid)
}

const retrieveFavorite = async () => {
    let orchid = await retrieveData()
    return orchid.filter((item) => item.favorite === true)
}

const retrieveAutomatic = async () => {
    let orchid = await retrieveData()
    return orchid.filter((item) => item.automatic === true)
}

const sortAutomatic = async () => {
    let orchid = await retrieveAutomatic()
    return orchid.sort((a,b) => b.price - a.price)
}

export { storeData, retrieveData, updateData, getWatchCategory, filterOrchid, getOrchidById, removeFromFavorite, clearFavorite, addToFavorite, retrieveFavorite , retrieveAutomatic, sortAutomatic}