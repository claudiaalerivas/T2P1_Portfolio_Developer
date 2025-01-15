import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { info } from '../../../data/data';

const LanguagesList = () => {

  return (
    <View style={styles.principalContainer}>
      <Text style={styles.linesTitle}>___________________________</Text>
      <Text style={styles.titleInfo}>Herramientas y Tecnologías Clave</Text>
      <Text style={styles.linesTitleBottom}>___________________________</Text>
      <FlatList
        style={styles.list}
        data={info}
        renderItem={({ item }) =>
          <View style={styles.container}>
            <Image style={styles.images} source={item.photo} />
            <View style={styles.informationList}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        }
      />
    </View>
  )
}

export default LanguagesList

const styles = StyleSheet.create({
  list: {
    height: 200
  },
  link: {
    backgroundColor: 'purple',
    width: 90,
    borderRadius: 150,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15
  },
  buttomText: {
    color: 'white',
    textAlign: 'center'
  },
  container: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
  title: {
    fontWeight: 'bold',
  },
  principalContainer: {
    width: '100%',
    marginTop: -100
  },
  images: {
    width: 70,
    height: 70,
    marginTop: 5
  },
  titleInfo: {
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  linesTitle: {
    alignSelf: 'center',
    marginBottom: -10
  },
  linesTitleBottom: {
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: -10
  },
  informationList: {
    marginTop: 20,
    width: 280,
  }
});