import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

export default function App() {
  const [uf, setUf] = useState("0");
  const [number, onChangeNumber] = useState("");

  useEffect(() => {
    async function loadUf() {
      fetch(
        "https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=216e5be5edfbbfa7b413513abc8f52229a728cf7&formato=json"
      )
        .then((response) => response.json())
        .then((data) => {
          setUf(data["UFs"][0]["Valor"]);
        });
    }
    loadUf();
  }, []);

  const result = () => {
    let ufSanitized = uf.replace(".", "");
    ufSanitized = ufSanitized.replace(",", ".");

    const total = parseFloat(number, 2) * parseFloat(ufSanitized, 2);

    if (isNaN(total)) {
      return '$0';
    }

    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(total);
  };

  return (
    <View className="flex-1 px-6">
      <SafeAreaView className="flex gap-6">
        <Text className="text-2xl text-center text-blue-500">UF: {uf}</Text>

        <View className="flex">
          <TextInput
            className="h-12 border border-gray-500 rounded-md px-2 text-right 2xl"
            keyboardType="numeric"
            onChangeText={onChangeNumber}
            value={number}
          />
        </View>

        <View className="flex items-center">
          <Text>Total en pesos</Text>
          <Text className="text-2xl text-center text-blue-500">{result()}</Text>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}
