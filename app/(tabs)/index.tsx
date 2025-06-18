import { getPlates } from '@/services/plate_service';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Card } from 'react-native-paper';

interface Plate {
  name: string;
  description: string;
  image: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const [plates, setPlates] = useState<Plate[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getPlates().then((data) => {
      console.log('Platos cargados:', data);
      setPlates(data);
    });
  }, []);

  useEffect(() => {
    if (plates.length === 0) return;

    const itemWidth = screenWidth * 0.8 + 16;

    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % plates.length;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * itemWidth,
        animated: true,
      });
      currentIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [plates]);




  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = screenWidth * 0.8 + 16;
    const index = Math.round(offsetX / itemWidth);
    currentIndexRef.current = index;
    setActiveIndex(index);
  };

  const goToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    currentIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <ImageBackground
  source={{ uri: 'https://res.cloudinary.com/dssczoogn/image/upload/v1750266168/food_bqj75m.png' }}
      style={{ flex: 1 }}
      blurRadius={3}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.overlay}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dssczoogn/image/upload/v1750266161/CopperBites_Logo_g6bk2t.png' }}
          style={styles.image}
        />
        <Text style={styles.logo}>Restaurant App</Text>

        {plates.length > 0 && (
          <View style={{ marginBottom: 20, alignItems: 'flex-start', width: '100%' }}>
            <FlatList
              ref={flatListRef}
              data={plates}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              snapToInterval={screenWidth * 0.8 + 16}
              decelerationRate="fast"
              onMomentumScrollEnd={handleScrollEnd}
              contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10 }}
              getItemLayout={(_, index) => ({
                length: screenWidth * 0.8 + 16,
                offset: (screenWidth * 0.8 + 16) * index,
                index,
              })}
              renderItem={({ item }) => (
                <Card
                  style={{
                    width: screenWidth * 0.8,
                    marginRight: 16,
                    borderRadius: 12,
                    backgroundColor: '#fff',
                  }}
                  mode="elevated"
                >
                  <Card.Cover
                    source={{
                      uri: item.image || 'https://via.placeholder.com/300x200.png?text=Sin+imagen',
                    }}
                    style={{
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      backgroundColor: '#ccc',
                    }}
                  />
                  <Card.Title
                    title={item.name}
                    subtitle={item.description}
                    titleStyle={{ color: '#000' }}
                    subtitleStyle={{ color: '#555' }}
                  />
                  <Card.Actions>
                    <Button mode="contained" onPress={() => router.push('/menu')}>
                      Ver más
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />

            <View style={styles.dotsContainer}>
              {plates.map((_, index) => (
                <TouchableOpacity key={index} onPress={() => goToIndex(index)}>
                  <View
                    style={[
                      styles.dot,
                      index === activeIndex ? styles.activeDot : null,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push('/signup')}
          >
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
  image: {
    width: '100%',
    aspectRatio: 1.2,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 2,
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#aaa',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
  },
});