import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

export default function HomeScreen() {
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height;


  return (
    <ImageBackground
      source={require('@/assets/images/food.png')}
      style={{ flex: 1 }}
      blurRadius={3}
    >
      <ScrollView
        style={{ flexGrow: 1, width: '100%' }}
        contentContainerStyle={[
          styles.overlay,
          { minHeight: screenHeight, width: '100%' }
        ]}
      >

        <Image
          source={require('@/assets/images/CopperBites_Logo.png')}
          style={styles.image}
        />
        <Text style={styles.logo}>Restaurant App</Text>

        <Card style={{ width: '100%', marginBottom: 30, borderRadius: 12 }} mode="elevated">
          <Card.Cover
            source={require('@/assets/images/food.png')}
            style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />
          <Card.Title title="Plato del Día" subtitle="Sopa Thai con Camarones" />
          <Card.Actions>
            <Button mode="contained" onPress={() => router.push('/menu')}>
              Ver más
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.authButton} onPress={() => router.push('/login')}>
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={() => router.push('/signup')}>
            <Text style={styles.authButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/menu')}>
            <Text style={styles.gridText}>View the Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/contact')}>
            <Text style={styles.gridText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    resizeMode: 'contain',
    height: '30%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'Cochin',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  authButton: {
    backgroundColor: '#e74c3c',
    width: 160,
    paddingVertical: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 0,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },

  gridItem: {
    backgroundColor: '#1e1e1e',
    flexBasis: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  gridText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
