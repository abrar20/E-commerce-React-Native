import { StyleSheet, Text, View,Image, FlatList } from 'react-native'
import React,{useEffect,useContext,useState,useLayoutEffect} from 'react'
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const OrdersScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8000/orders/${userId}`
            );
            const orders = response.data.orders;
            setOrders(orders);
    
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchOrders();
      }, []);
      console.log("orders", orders);
      function renderOrderItem(itemData){
        console.log(itemData,'itemData');
        return <View style={styles.orderContainer}>
            <Image style={styles.imgOrder}
            source={{uri:itemData.item.products[0].image}}/>
            <View style={styles.info}>
                <Text>Name  : {itemData.item.products[0].name}</Text>
                <Text>Total : SR <Text style={{color:'red'}}>{itemData.item.totalPrice}</Text></Text>
            <Text>Products :{itemData?.item?.products?.length}</Text>
            <Text>Payment: {itemData.item.paymentMethod}</Text>
            <Text>Date: {new Date(itemData.item.createdAt).toDateString()}</Text>
            <Text onPress={() => navigation.navigate('OrderDetails',{orderDetails:itemData.item})} style={styles.seeMore}>See More</Text>
            </View>
            </View>
      }
  return (
    <View style={styles.root}>
        <FlatList renderItem={renderOrderItem} data={orders} keyExtractor={(item) =>item._id}/>
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
    root:{
        flex:1,
        margin:20
    },
    orderContainer:{
        backgroundColor:'#fff',
        borderColor:"#ddd",
        borderWidth:1,
        borderRadius:9,
        padding:5,
        marginBottom:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        overflow:'hidden'
    },
    imgOrder:{
        height:100,
        width:100,
        borderRadius:10,
        resizeMode:'contain',
        flex:1
    },
    info:{
        flex:2
    },
    seeMore:{
        color:'blue',
        fontWeight:'bold',
        textDecorationLine:'underline',
        textAlign:'left',
        marginTop:10
    }

})