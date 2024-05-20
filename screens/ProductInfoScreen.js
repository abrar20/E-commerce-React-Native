import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    ImageBackground,
    Dimensions,
  } from "react-native";
  import React ,{useEffect, useState} from "react";
  import { Ionicons,MaterialCommunityIcons ,AntDesign, Feather} from "@expo/vector-icons";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart } from "../redux/CartReducer";
import Header from "../components/Header";
import { addFavorite, removeFavorite } from "../redux/FavoriteReducer";
  
  const ProductInfoScreen = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const navigation = useNavigation();
    const [addedToCart, setAddedToCart] = useState(false);
    const height = (width * 100) / 100;
    const dispatch = useDispatch();
    const [isFavorite,setIsFavorite]= useState(false);
    const favorite = useSelector((state) => state.favorite.favorite);
    console.log(favorite,'favorite screen',favorite.length);
    
    useEffect(() =>{
      if(favorite && favorite.length > 0){
            const isIncluded = favorite.find((item) => 
              item.id === route?.params?.item.id);
            //console.log(isIncluded,'isIncluded');
            if(isIncluded) {
              setIsFavorite(true)
            }else {
              //console.log(isIncluded,'isIncluded');
              setIsFavorite(false)
            }}
    },[favorite,addFav,removeFav])
    const addItemToCart = (item) => {
      setAddedToCart(true);
      dispatch(addToCart(item));
      setTimeout(() => {
        setAddedToCart(false);
      }, 60000);
    };
    const addFav = (item) => {
      dispatch(addFavorite(item));
      setIsFavorite(true)
    };
    const removeFav = (item) => {
      dispatch(removeFavorite(item));
      setIsFavorite(false)
    };
    const buyNowHandler =(item) =>{
      addItemToCart(item);
      navigation.navigate('Cart')
    }
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    return (
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
      >
  <Header back={true}/>
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.carouselImages.map((item, index) => (
            <ImageBackground
              style={{width, height, marginTop: 25, 
                resizeMode: "contain" }}
              source={{ uri: item }}
              key={index}
            >
              <View
                style={styles.container}
              >
                <View
                  style={styles.discount}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    20% off
                  </Text>
                </View>
  
                {/* <View
                  style={styles.shareIcon}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View> */}
              </View>
  
              <View
                style={styles.favorite}
              >{console.log(isFavorite,'isFavorite')}
                {isFavorite === true ? (<AntDesign name='heart' color='red' size={24} onPress={() => removeFav(route?.params?.item)} />)
                :
                (<AntDesign name="hearto" size={24} color="black" onPress={() => addFav(route?.params?.item)}/>)}
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
  
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route?.params?.title}
          </Text>
  
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
            SR {route?.params?.price}
          </Text>
        </View>
  
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
  
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <Text>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.color}
          </Text>
        </View>
  
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.size}
          </Text>
        </View>
  
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
  
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total : SR {route.params.price}
          </Text>
          <Text style={{ color: "#00CED1" }}>
            FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
          </Text>
  
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="black" />
  
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver To Abrar - Riyadh 560019
            </Text>
          </View>
        </View>
  
        <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
          IN Stock
        </Text>
  
        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          style={styles.addBtn}
        >
          {addedToCart ? (
            <View>
              <Text>Added to Cart</Text>
            </View>
          ) : (
            <Text>Add to Cart</Text>
          )}
        </Pressable>
  
        <Pressable
        onPress={() => buyNowHandler(route?.params?.item)}
          style={styles.buy}
        >
          <Text>Buy Now</Text>
        </Pressable>
      </ScrollView>
    );
  };
  
  export default ProductInfoScreen;
  
  const styles = StyleSheet.create({
    root:{ 
      marginTop: 55,
      flex: 1, 
      backgroundColor: "white" },
    container:{
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    discount:{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#C60C30",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    shareIcon:{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    favorite:{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: "auto",
      marginLeft: 20,
      marginBottom: 20,
    },
    addBtn:{
      backgroundColor: "#FFC72C",
      padding: 10,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 10,
    },
    buy:{
      backgroundColor: "#FFAC1C",
      padding: 10,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 10,
    }
  });