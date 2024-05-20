import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useEffect, useState,useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import {jwtDecode} from "jwt-decode"
  import "core-js/stable/atob";
 import { UserType } from "../UserContext";
  import axios from "axios";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {Ionicons} from '@expo/vector-icons';
  const AddressScreen = () => {
      const navigation = useNavigation();
      const route = useRoute()
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId,setUserId} = useContext(UserType)
    useEffect(() => {
      const fetchUser = async() => {
          const token = await AsyncStorage.getItem("authToken");
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          //console.log(token,'token',userId,'userId address screen');
          setUserId(userId)
      }
  
      fetchUser();
    },[]);
    useEffect(() =>{
      const address = route?.params?.address;
      //console.log(address["_id"],'item');
      if(address && address["_id"]){
        setName(address["name"]);
        setHouseNo(address["houseNo"]);
        setMobileNo(address["mobileNo"])
        setStreet(address["street"]);
        setPostalCode(address["postalCode"]);
        setLandmark(address["landmark"]); 
      }
    },[])
    //console.log(userId)
    const handleAddAddress = async() => {
      //console.log('start add address',userId,'userId');
      if(!name || !mobileNo || !houseNo || !street || 
        !landmark || !postalCode){
        Alert.alert("Falied","All Data Must be Entered")
        return;
      }
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }

        try{
          if(route?.params?.address["_id"]){
            console.log('patch used');
            const res =await axios.patch("http://192.168.100.46:8000/addresses",{userId,address,addressId:route.params.address["_id"]});
          }else{
            console.log('post used');
            const res =await axios.post("http://192.168.100.46:8000/addresses",{userId,address});
          }
          //console.log(response,'resp');
            Alert.alert("Success","Addresses added successfully");
            setName("");
            setMobileNo("");
            setHouseNo("");
            setStreet("");
            setLandmark("");
            setPostalCode("");
  
            setTimeout(() => {
              navigation.goBack();
            },500)
        }
        catch(error) {
            Alert.alert("Error","Failed to add address")
            //console.log("error",error)
        }
    }
    return (
      <ScrollView style={{ marginTop: 50 }}>
        <View style={styles.header} >
        <Ionicons style={styles.icon} name="arrow-back" size={24} 
        color='black' onPress={() => navigation.navigate('Address')}></Ionicons>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a new Address
          </Text>
  
          <TextInput
            placeholderTextColor={"black"}
            placeholder="Saudi Arabia"
            style={styles.inputStyle}
          />
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Full name (First and last name)
            </Text>
  
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="enter your name"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Mobile numebr
            </Text>
  
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Mobile No"
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Flat,House No,Building,Company
            </Text>
  
            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder=""
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Area,Street,sector,village
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder=""
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Eg near appollo hospital"
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
  
            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={"black"}
              style={styles.inputStyle}
              placeholder="Enter Pincode"
            />
          </View>
  
          <Pressable
          onPress={handleAddAddress}
            style={styles.addAddressBtn}
          >
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default AddressScreen;
  
  const styles = StyleSheet.create({
    header:{ height: 50, 
      backgroundColor: "#00CED1",
      justifyContent:'center'
     },
    icon:{
      paddingLeft:10
      // alignItems:'center',
      // justifyContent:'center'
    },
    addAddressBtn:{
      backgroundColor: "#FFC72C",
      padding: 19,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    inputStyle:{
      padding: 10,
      borderColor: "#D0D0D0",
      borderWidth: 1,
      marginTop: 10,
      borderRadius: 5,
    }
  });