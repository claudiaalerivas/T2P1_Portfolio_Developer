import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack >
        <Stack.Screen name='(drawer)' options={{headerShown: false}}/> 
    </Stack>
  )
}

export default ProfileLayout