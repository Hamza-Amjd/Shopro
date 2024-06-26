import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from "react-native";
import React,{  useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import SearchTile from "../components/SearchTile";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(false);
  const getOrders = async () => {
    setloading(true);
    let userId = await AsyncStorage.getItem("userId");
    let url = `https://shopro-backend.vercel.app/api/shop/order/${userId}`;
    try {
      const response = await axios.get(url);
      let orders = response.data.orders;
      setOrders(orders);
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };
  const colorScheme = useColorScheme();
  //@ts-ignore
  const renderItem = ({ item }) => {
    return (
    <View style={{backgroundColor:Colors[colorScheme??'light'].background2,padding:8,borderRadius:10,marginBottom:15}}>
      <View >
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:0.5,borderBottomColor:Colors[colorScheme??'light'].text}}>
          <ThemedText type="defaultSemiBold">
          Awaitng delivey
        </ThemedText> 
        <ThemedText type="defaultSemiBold">
          {new Date(item.updatedAt).toDateString()}
        </ThemedText>
        </View>
        
        <ThemedText type="default">
          Deliver to {item.shippingAddress?.name} at{" "}
          {item.shippingAddress?.streetAddress},
          {item.shippingAddress?.city},{item.shippingAddress?.country}
        </ThemedText>
        <ThemedText type="default">
          Phone NO. : ********
          {(item.shippingAddress?.mobileNo).slice(7, 10)}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{color:Colors.light.tertiary}}>
          Total amount : {item.totalPrice}$
        </ThemedText>
        <ThemedText type="default">
          Payment Method : {item.paymentMethod}
        </ThemedText>
        
        
      </View>  
      {item.products.map((product:any)=> {return <SearchTile key={product._id} item={product}/>})}
      <ThemedText style={{  }}>
          All Orders will be shipped in 2-6 working days after placing
          order
        </ThemedText>
        <TouchableOpacity style={{alignSelf:'flex-end',padding:8,backgroundColor:Colors[colorScheme??'light'].primary, borderRadius:20}}>
          <Text style={{color:"white",fontSize:12}}>Track Order</Text>
        </TouchableOpacity>
    </View>)
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <ThemedView style={{flex:1 ,paddingTop:35,paddingHorizontal:10}}>
      <View style={{flexDirection:'row',alignItems:'center', paddingVertical:15}}>
       <TouchableOpacity
          onPress={() => {
            router.replace("(tabs)/profile");
          }}
        >
          <Ionicons name="arrow-back" size={30} color={Colors[colorScheme??'light'].text} />
        </TouchableOpacity>
        <ThemedText
          type="subtitle"
        >
           {"   "}Orders
        </ThemedText>
      </View>
      {loading ?(
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )
      :orders.length == 0 ? (
        <AnimatedLottieView
          autoPlay
          loop
          speed={0.3}
          style={{ height: 150, width: 150, alignSelf: "center", top: "30%" }}
          source={require("../assets/images/emptyCart.json")}
        />
      ):
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
 
});
export default OrdersScreen;
