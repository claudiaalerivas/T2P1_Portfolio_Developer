import { Tabs } from 'expo-router'
import Info_Personal from '../../../components/Info_Personal/Info_Personal'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='languages' options={{ header: ()=> <Info_Personal/>}} />
        <Tabs.Screen name='qr' options={{ header: ()=> <Info_Personal/>}}/>
    </Tabs>
  )
}

export default _layout