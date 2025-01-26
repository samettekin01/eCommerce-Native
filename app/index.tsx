import { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native"
import { Store } from "./types/types"
import statusBarHeight from "./commons/commons"
import ProductCard from "./components/ProductCard/ProductCard"
import { router } from "expo-router"

export default function Index() {

  const [products, setProducts] = useState<Store[]>()
  const [sliderProducts, setSliderProducts] = useState<Store[]>()

  const getProduct = (id: number) => {
    router.navigate({
      pathname: "/components/ProductCardDetail/ProductCardDetail",
      params: { id: id }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const json = await res.json()
        setProducts(json)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products?limit=5')
        const json = await res.json()
        setSliderProducts(json)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <ScrollView
      style={{ backgroundColor: "#f2f2f2", marginTop: (statusBarHeight() || 0) + 60 }}
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        style={[styles.boxShadow, {
          height: Dimensions.get("window").height / 3,
          backgroundColor: "#fff",
          padding: 10
        }]}
        data={sliderProducts}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sliderItemContainer}
            onPress={() => getProduct(item.id)}
          >
            <Image
              style={styles.sliderImage}
              source={{ uri: item.image }}
            />
            <View style={{ width: Dimensions.get("window").width / 3 }}>
              <Text>{item.title}</Text>
              <Text style={[styles.productPriceText, { marginLeft: "auto", marginRight: 10, fontSize: 20 }]}>{item.price} $</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.container}>
        <View style={styles.productsContainer}>
          {products ? products.map(d =>
            <TouchableOpacity
              key={d.id}
              style={[styles.productContainer, styles.boxShadow]}
              activeOpacity={.95}
              onPress={() => getProduct(d.id)}
            >
              <ProductCard data={d} />
            </TouchableOpacity>
          ) : <Text>not loading</Text>}
        </View>
      </View >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "700"
  },
  productsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 20,
    margin: 4
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "45%",
    height: "auto",
    borderRadius: 10,
    padding: 10,
  },
  boxShadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2
  },
  productTitle: {
    textAlign: "center",
    color: "#000",
    margin: 1,
    fontSize: 12
  },
  productImage: {
    width: "70%",
    height: 200,
    resizeMode: "center"
  },
  productPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 10,
  },
  productPriceText: {
    color: "#fa5502",
    fontSize: 20,
    fontWeight: "bold"
  },
  sliderItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: "100%",
  },
  sliderImage: {
    width: "50%",
    height: "100%",
    resizeMode: 'contain',
  },
})