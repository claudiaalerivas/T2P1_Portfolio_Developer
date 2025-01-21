import { StyleSheet } from 'react-native'
import { Redirect } from 'expo-router'

const AppPage = () => {
  return (
    <Redirect href={"/registry"}></Redirect>
  )
}

export default AppPage

const styles = StyleSheet.create({})
