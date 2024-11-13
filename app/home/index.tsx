import { Link, Redirect } from 'expo-router'
import { Image, StyleSheet, Text, View, Pressable, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const HomePage = () => {
    return (
        <View style={styles.containerPrincipal}>
            <ScrollView>
                <Image style={styles.image} source={require('../../assets/images/welcomee.png')} />
                <View style={styles.title}>
                    <Text>___________________________</Text>
                    <Text style={styles.titleInfo}>Juntos</Text>
                    <Text style={styles.titleInfoCenter}>Haremos Realidad tus</Text>
                    <Text style={styles.titleInfo}>Ideas</Text>
                    <Text>___________________________</Text>
                </View>
                <Link style={styles.link} href="/provider/(tabs)">
                    <Text style={styles.buttomText}>Mi info</Text>
                </Link>
                <View style={styles.containerInfo}>
                    <View style={styles.box}>
                        <MaterialCommunityIcons name="certificate-outline" size={24} style={styles.icons} />
                        <Text style={styles.titleBox}>Propiedad</Text>
                        <Text style={styles.descriptionBox}>Una vez finalizada la app, tu empresa será la única propietaria del código.</Text>
                    </View>
                    <View style={styles.boxCenter}>
                        <MaterialIcons name="design-services" size={24} style={styles.icons} />
                        <Text style={styles.titleBox}>Diseño a Medida</Text>
                        <Text style={styles.descriptionBox}>Creación de aplicaciones móviles únicas y adaptadas a tus necesidades.</Text>
                    </View>
                    <View style={styles.box}>
                        <Entypo name="line-graph" size={24} style={styles.icons} />
                        <Text style={styles.titleBox}>Escalabilidad</Text>
                        <Text style={styles.descriptionBox}>Podrás escalar tu proyecto y añadir más funcionalidades siempre que lo necesites.</Text>
                    </View>
                </View>
                <View style={styles.socialBox}>
                    <Ionicons name="logo-github" size={30} style={styles.socialIcons} />
                    <Entypo name="instagram" size={30} style={styles.socialIcons} />
                    <AntDesign name="linkedin-square" size={30} style={styles.socialIcons} />
                </View>
            </ScrollView>
        </View>

    )
}

export default HomePage

const styles = StyleSheet.create({
    link: {
        backgroundColor: 'purple',
        width: 90,
        borderRadius: 50,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center',
        marginTop: '5%'
    },
    containerPrincipal: {
        paddingTop: StatusBar.currentHeight
    },
    image: {
        width: 350,
        height: 300,
        marginLeft: 25
    },
    title: {
        alignItems: 'center',
    },
    titleInfo: {
        fontSize: 35
    },
    titleInfoCenter: {
        fontSize: 30
    },
    buttom: {
        
    },
    buttomText: {
        color: 'white',
        textAlign: 'center'
    },
    containerInfo: {
        marginTop: 30,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    box: {
        textAlign: 'center',
        width: 115,
        backgroundColor: '#E7E0EC',
        marginTop: 15,
        marginBottom: 13,
        paddingTop: 20,
        paddingBottom: 20,
    },
    boxCenter: {
        textAlign: 'center',
        width: 130,
        backgroundColor: '#E2D6FF',
        marginRight: 8,
        marginLeft: 8,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 40,
        paddingBottom: 45
    },
    titleBox: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    descriptionBox: {
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    socialBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    socialIcons: {
        marginLeft: 20,
        marginRight: 20
    },
    icons: {
        alignSelf: 'center',
        marginBottom: 10
    }

})
