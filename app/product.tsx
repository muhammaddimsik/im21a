import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TProduct } from "@/constants/Models";
import { router } from "expo-router";

const product = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dataProducts, setDataProducts] = useState<TProduct[]>();
  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        `https://api.itsnumart.com/api/product?search=${searchQuery}`
      );
      console.log(response);
      setDataProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const onSearch = () => {
    getAllProduct();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
      />
      <View style={styles.productList}>
        {dataProducts?.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.foto1 }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{item.nama_produk}</Text>
              <Text style={styles.productRating}>
                {item.value} | {item.rating} ⭐
              </Text>
              <Text style={styles.productPrice}>Rp {item.varian[0].harga}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light gray background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40", // Dark gray
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productList: {
    flexDirection: "column",
    gap: 16, // Space between items
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#f1f3f5", // Placeholder background
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 4,
  },
  productRating: {
    fontSize: 14,
    color: "#6c757d", // Subtle gray
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745", // Green
  },
});
