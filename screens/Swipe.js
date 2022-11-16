import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useIsFocused } from "@react-navigation/native";
import { getRecommendations } from "../clients/FlaskServer";
import { currRecipient, updateCurrRecipient } from "../Global.js";
import { async } from "@firebase/util";

const Users = [
  {
    title:
      "Sports Earphones Truefree F1 Open-Ear Bluetooth Headphones with ENC Noise-Cancellation Mic Air Conduction Wireless Headset for Workouts and Running, 11 Hours of Music, with Headband (Black & Grey)",
    asin: "B0BBM59FSK",
    price: "$59.99",
    img: "https://m.media-amazon.com/images/I/51tWF4xA1tL._AC_UL320_.jpg",
  },
  {
    title:
      "Wireless Earbuds, Bluetoth 5.3 Earbuds with Hi-Fi Stereo Audio, Wireless Headphones with Dual Mic Noise Reduction, 13mm Driver, IPX7 Waterproof, USB-C Charge, 45H Play Time for Work/Exercise",
    asin: "B0B74PHW73",
    price: "$39.99",
    img: "https://m.media-amazon.com/images/I/511VEGqUPsL._AC_UL320_.jpg",
  },
  {
    title: "Audio-Technica ATH-M20x Professional Headphones",
    asin: "B00HVLUR18",
    price: "$69.00",
    img: "https://m.media-amazon.com/images/I/71HlB-gf46L._AC_UL320_.jpg",
  },
  {
    title:
      "Wireless Earbuds, 75Hrs Playtime Bluetooth 5.1 Headphones, True Wireless Earphones with Digital Display & CVC 8.0 Noise Cancelling, Waterproof Earbuds with Mic for Sports, Running, Yoga, Workout",
    asin: "B0B585BKCV",
    price: "$49.99",
    img: "https://m.media-amazon.com/images/I/61NkNTpPgXL._AC_UL320_.jpg",
  },
  {
    title: "Skullcandy Riff On-Ear Headphones, Black (S5PXY-L003)",
    asin: "B07HB9Q3CY",
    price: "$24.98",
    img: "https://m.media-amazon.com/images/I/71MWCCkt6VL._AC_UL320_.jpg",
  },
  {
    title: "Sennheiser Professional HD 280 PRO Over-Ear Monitoring Headphones",
    asin: "B00IT0IHOY",
    price: "$129.95",
    img: "https://m.media-amazon.com/images/I/615Nba6dy4L._AC_UL320_.jpg",
  },
  {
    title:
      "Plantronics 211138-99 Backbeat Go 600 Noise-Isolating Headphones, Over-The-Ear Bluetooth Headphones, Black",
    asin: "B07BDRHT4M",
    price: "$49.91",
    img: "https://m.media-amazon.com/images/I/61Yg2kYS5xL._AC_UL320_.jpg",
  },
  {
    title:
      "JBL Tune 500 Wired On-Ear Headphones with One-Button Remote/Mic - Black",
    asin: "B07PFLL2CY",
    price: "$44.98",
    img: "https://m.media-amazon.com/images/I/61Ypg5kkO7L._AC_UL320_.jpg",
  },
  {
    title:
      "1MORE SonoFlow Active Noise Cancelling Headphones, Over Ear Bluetooth Headphones with LDAC, Hi-Res Wireless Audio, 70H Playtime, 5 Mics, Clear Calls, Preset EQ, App, Foldable\u00a0Headset Black",
    asin: "B0B7NBXWDV",
    price: "$129.99",
    img: "https://m.media-amazon.com/images/I/51zGLOQ9GxL._AC_UL320_.jpg",
  },
];

let currId = 0;

const Swipe = ({ navigation, route }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(async () => {
    const rslt = await getRecommendations();
    console.log(rslt);
    setRecommendations(rslt);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen was focused");
      async function fetchData() {
        const rslt = await getRecommendations();
        currId = global.currRec;
        setRecommendations(rslt);
      }

      if (currId != global.currRec) {
        console.log("Request Sent");
        fetchData();
      }
    }, [])
  );

  if (recommendations.length === 0) {
    return <AppLoading />;
  }

  return (
    <View>
      <Text style={{ top: 40 }}></Text>
      <Text style={styles.container}>{global.currRec}</Text>
      <View style={styles.cards}>
        <Cards navigation={navigation} users={recommendations} />
      </View>
    </View>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
  },
  cards: {},
});
