import { StyleSheet, Text, View ,FlatList,Image} from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const OrderDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const order = route?.params?.orderDetails;
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: order?._id,
        });
      }, []);
      function renderOrderItem(itemData){
        console.log(itemData,'itemData');
        return <View style={styles.orderContainer}>
            <Image style={styles.imgOrder}
            source={{uri:itemData.item.image}}/>
            <View style={styles.info}>
                <Text>Name  : <Text style={{fontWeight:'bold',color:'gray',fontStyle:'italic'}}>{itemData.item.name}</Text></Text>
                <Text>Price : SR {itemData.item.price}</Text>
            <Text>Quantity :<Text style={{color:'red'}}>{itemData.item.quantity}</Text></Text>
            </View>
            </View>
      }
  return (
    <View style={styles.root}>
        <View style={styles.OrderInfo}>
            <Text style={[styles.location,{marginBottom:10}]}> Total Price : SR <Text style={{color:'red'}}>{order.totalPrice}</Text></Text>
           <Text style={styles.header}>Your Pay Method : {order.paymentMethod} </Text> 
           <View style={styles.locationContainer}>
           <Text style={styles.header}> Shippment will arrive to </Text> 
           <Text style={styles.location}>{order.shippingAddress.street} - 
            {order.shippingAddress.landmrak} - 
            {order.shippingAddress.houseNo}</Text>
            <Text style={styles.header}>The courior will contact you on <Text style={styles.location}>{order.shippingAddress.mobileNo}</Text></Text>
            <Text style={styles.header}>Created At -  
            {new Date(order.createdAt).toDateString()} - 
            {new Date(order.createdAt).toLocaleTimeString()} </Text> 
           </View>
        </View>
        <FlatList renderItem={renderOrderItem} data={order.products} keyExtractor={(item) =>item._id}/>
    </View>
  )
}

export default OrderDetailsScreen

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
        flex:1,
        //marginRight:10
    },
    info:{
        flex:2
    },
    OrderInfo:{
        backgroundColor:'#fff',
        borderColor:"#ddd",
        borderWidth:1,
        borderRadius:9,
        padding:5,
        marginBottom:15,
        overflow:'hidden'
    },
    locationContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center'
    },
    header:{
        fontSize:15,
        fontStyle:'italic',
        marginBottom:12
    },
    location:{
        fontSize:18,
        fontWeight:'bold'
    }
})