import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BiscuitDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const [showMore, setShowMore] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{item.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.availability}>Available in: {item.availability}</Text>

        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text style={styles.toggleText}>
            {showMore ? 'Hide Details ↑' : 'Show Details ↓'}
          </Text>
        </TouchableOpacity>

        {showMore && (
          <Text style={styles.description}>
            {item.name.split('/')[0]} is a delicious biscuit loved for its rich flavor and crisp texture.
            Perfect for tea time or snacking, it comes in a variety of sizes to suit every craving.
          </Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buyNow]}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8CC3E2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backArrow: { fontSize: 24, fontWeight: 'bold', marginRight: 12, color: '#000' },
  title: { fontSize: 22, fontWeight: '700', color: '#000' },
  content: { padding: 20 },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  availability: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: '#D35400',
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buyNow: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BiscuitDetailScreen;
