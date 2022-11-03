import { View, Text, StyleSheet, Image } from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Welcome to Team 2's React Native App</Text> */}
      <Image
        source={
          {
            // uri: "https://m.media-amazon.com/images/I/61kqkYoeysL._AC_UL640_FMwebp_QL65_.jpg",
          }
        }
        style={{ width: 400, height: 400 }}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
