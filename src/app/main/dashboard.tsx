import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Platform, ScrollView, Text, View } from "react-native";

import { BaseInput } from "@/src/components/BaseInput";
import { MainButton } from "@/src/components/MainButton";
import { OverlayModal } from "@/src/components/OverlayModal";
import { TitleBox } from "@/src/components/TitleBox";

const isAndroid = Platform.OS === "android";
const { height: screenHeight } = Dimensions.get("window");

export default function Home() {
  const scrollViewHeight = isAndroid ? screenHeight * 0.5 : screenHeight * 0.45;
  const router = useRouter();
  const [isTitleBoxVisible, setIsTitleBoxVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dropMenuVisible, setDropMenuVisible] = useState(false);
  // // aqui será carregado via requisição
  const [list, setList] = useState([
    {
      id: 1,
      title: "Lista de compras",
      description: "Lista de compras do mês",
      products: [
        { id: 1, name: "Arroz", quantity: 2, unitPrice: 5.00, totalPrice: 10.00 },
        { id: 2, name: "Feijão", quantity: 1, unitPrice: 4.50, totalPrice: 4.50 },
        { id: 3, name: "Macarrão", quantity: 3, unitPrice: 2.50, totalPrice: 7.50 }
      ]
    }
  ])

  const items = [
    {
      title: "Compras do mês de abril",
      description: "teste",
      details: "Itens mais comprados...",
      price: "R$ 300,25",
    },
    {
      title: "Compras do mês de abril",
      description: "teste",
      details: "Itens mais comprados...",
      price: "R$ 425,25",
    },
    {
      title: "Compras do mês de abril",
      description: "teste",
      details: "Itens mais comprados...",
      price: "R$ 425,25",
    },
    {
      title: "Compras do mês de abril",
      description: "teste",
      details: "Itens mais comprados...",
      price: "R$ 425,25",
    },
    {
      title: "Compras do mês de abril",
      description: "teste",
      details: "Itens mais comprados...",
      price: "R$ 425,25",
    },
  ];

  const handleOpenTitleBox = () => {
    setIsTitleBoxVisible(true);
    setDropMenuVisible(false);
  };

  const handleKeepListTitle = async (newTitle: string) => {
    if (!newTitle) return;

    try {
      await AsyncStorage.setItem("list-title", newTitle);
      setTitle(newTitle);
      setIsTitleBoxVisible(false);

      router.navigate("./create-list")
    } catch (error) {

    }
  };

  return (
    <>
      {!list.length ? (
        <View className="flex-1 gap-4 bg-white justify-center items-center relative">
          <View className="items-center gap-2 mb-48">
            <Image
              source={require('../../assets/images/img-casas.png')}
              className="w-56"
              resizeMode="contain"
            />
            <Text className="text-[#9CA3AF] -mt-20 text-center">Nenhuma lista encontrada</Text>
            <MainButton
              onPress={() => setIsTitleBoxVisible(true)}
              className="bg-red-600 rounded-lg justify-center items-center w-[80%] h-[42px] mt-4"
            >
              <Text className="text-white font-bold text-center w-fit px-6">Ir às compras</Text>
            </MainButton>
          </View>
        </View>
      ) : (
        <View className=" bg-white justify-center">
          <View className="flex-row items-center gap-3 w-full relative">
            <BaseInput placeholder="Buscar list por período..." customStyle="w-full h-[42px] pr-[16%]" />
            <MainButton className="bg-red-600 rounded-lg justify-center items-center w-[15%] h-[42px] absolute right-0">
              <FontAwesome5 name="search" size={20} color="white" />
            </MainButton>
          </View>
          <View className="mt-6">
            <View className="bg-[#E2E2E2] rounded-md p-3 pb-4 relative overflow-hidden mb-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-[14px] font-semibold">
                  Valor total de compras no ano
                </Text>
                <Image
                  source={require('../../assets/images/Logo-carrinho-verde.png')}
                  className="w-8"
                  resizeMode="contain"
                />
              </View>
              <View className="mb-3 -mt-2">
                <Text className="font-bold text-[20px]">R$ 1.125,25</Text>
              </View>
              <Text className="text-gray-500 line-clamp-2 text-[12px]">
                Utilize os valores aqui gerados para ajudar a medir seu orçamento
              </Text>
              <View className="border-green-700 border-t-4 absolute bottom-0 w-[500px] right-0"></View>
            </View>
          </View>
          <View style={{ height: scrollViewHeight }} className={`relative pt-3 border-t border-gray-100`}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 5 }}>
              {items.map((item, index) => (
                <View key={index} className="bg-gray-100 p-3 rounded-md mb-2">
                  <View className="flex-row items-start">
                    <FontAwesome5 name="check" size={16} color="#047857" className="bg-white rounded-full mt-1" />
                    <View className="flex-1 ml-2">
                      <Text className="text-[14px] font-bold">{item.title}</Text>
                      <Text className="text-gray-500 text-[12px]">{item.description}</Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <View className="flex-row items-center">
                      <FontAwesome5 name="shopping-bag" size={16} color="#DC2626" />
                      <Text className="text-gray-700 text-[12px] ml-2">{item.details}</Text>
                    </View>
                    <Text className="text-gray-700 font-semibold">{item.price}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View className="w-full flex-row justify-end items-center relative bg-white mt-4">
            <View className="relative">
              <MainButton
                onPress={() => setDropMenuVisible(!dropMenuVisible)}
                className="bg-red-600 px-4 h-14 justify-center items-center rounded-full"
              >
                <FontAwesome5 name="bars" size={26} color="white" />
              </MainButton>

              {dropMenuVisible && (
                <View className="absolute right-[40px] bottom-[40px] mt-2 bg-white w-[150px] rounded-lg shadow-lg z-10">
                  <Text className="py-6 mx-4" onPress={handleOpenTitleBox}>Criar lista</Text>
                  <View className="border border-gray-100"></View>
                  <Text className="py-6 mx-4">Minhas listas</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
      {isTitleBoxVisible && (
        <View className="absolute inset-0 z-50 justify-center items-center">
          <OverlayModal onClose={() => setIsTitleBoxVisible(false)}>
            <TitleBox
              onSubmitTitle={handleKeepListTitle}
            />
          </OverlayModal>
        </View>
      )}
    </>
  );
}