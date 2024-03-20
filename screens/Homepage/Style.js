import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    banner: {
        width: '100%',
        height: 170,
        marginTop: 20,
        borderRadius: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    scrollView: {
        paddingVertical: 20,
    },
    allOrchids: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 28,
        marginEnd: 15,
    },
    allOrchidText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    flatList: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#d3d8e0',
        borderRadius: 10,
        padding: 10,
    },
    orchidImage: {
        width: windowWidth/3, 
        height: windowHeight/6, 
        borderRadius: 10
    },
    orchidInformationBox: {
        marginLeft: 10, 
        justifyContent: 'center'
    },
    orchidName: {
        width: 200,
        fontSize: 16, 
        fontWeight: 'bold'
    },
    orchidCategory: {
        fontSize: 16
    },
    orchidButtonBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    orchidButtonColor: {
        color: 'white'
    },
    orchidViewButton: {
        backgroundColor: '#92B4D3', 
        padding: 10, 
        borderRadius: 10
    },
    orchidAddButton: {
        backgroundColor: '#92B4D3',
        marginLeft: 5, 
        padding: 10, 
        borderRadius: 10
    },
    orchidFavoritedButton: {
        display: 'flex',
        flexDirection: 'row',
    },
    orchidFavoritedImage: {
        height: 25, 
        width: 25
    },
    orchidFavoritedText: {
        color: 'white',
        marginLeft: 5
    }
});

export default styles;