import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Text,
  View
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { BaseInput } from "@/src/components/BaseInput";
import { DescriptionBox } from "@/src/components/DescriptionBox";
import { MainButton } from "@/src/components/MainButton";
import { OverlayModal } from "@/src/components/OverlayModal";
import { PurchaseListItem } from "@/src/components/PurchaseListItem";
import { ListProps } from "@/src/modules/purchase-list/domain/models/create-list";
import { Item } from "@/src/modules/purchase-list/domain/models/item-dto";
// import { makeSavePurchaseListController } from "@/src/modules/ui/main/factories/create-purchase-list";

const isAndroid = Platform.OS === "android";
// const controller = makeSavePurchaseListController();

export default function CreateList() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState({ name: "", quantity: "1" });
  const [isDescriptionBoxVisible, setIsDescriptionBoxVisible] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      const listTitle = await AsyncStorage.getItem("list-title");
      if (listTitle) setTitle(listTitle);
    })();
  }, []);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      if (item.price) {
        const price = Number(item.price.replace(",", "."));
        const quantity = Number(item.quantity);
        return total + price * quantity;
      }
      return total;
    }, 0);
  }, [items]);

  const handleChangeSetItem = useCallback((id: number, field: keyof Item, value: string) => {
    setItems((prev) =>
      prev.map((i) => (i.localId === id ? { ...i, [field]: value } : i))
    );
  }, []);

  const handleAddItem = useCallback(() => {
    if (!newItem.name.trim()) return;
    setItems((prev) => [
      {
        localId: prev.length + 1,
        name: newItem.name,
        description: "",
        quantity: newItem.quantity,
        price: "",
        totalPrice: "",
        isEditing: false,
      },
      ...prev,
    ]);
    setNewItem({ name: "", quantity: "" });
  }, [newItem]);

  const handleToggleFieldEdit = useCallback((id: number, field?: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.localId !== id) return item;
        return {
          ...item,
          isEditing: field !== "price",
          isEditingPrice: field === "price",
        };
      })
    );
  }, []);

  const handleSetItem = useCallback((id: number, field: keyof Item, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.localId === id
          ? { ...item, [field]: value, isEditing: false, isEditingPrice: false }
          : item
      )
    );
  }, []);

  const handleDescriptionChange = useCallback((desc: string) => {
    setDescription(desc);
  }, []);

  const saveList = useCallback(async () => {
    const listData: ListProps.ToCreate = {
      title,
      description,
      products: items.map(({ name, quantity, price }) => ({
        name,
        quantity,
        unitPrice: price,
      })),
    };
    console.log("List data to save:", listData);
    // const response = await controller.handle(listData);
    // if (response.success) {
    //   setItems([]);
    //   setDescription("");
    //   setIsDescriptionBoxVisible(false);
    //   // navegar para "Minhas listas"
    // } else {
    //   console.error("Erro ao salvar lista:", response.error);
    // }
  }, [title, description, items]);

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.localId !== id));
  };

  const renderItem = useCallback<ListRenderItem<Item>>(({ item }) => (
      <View className="mb-2">
        <Swipeable
          renderRightActions={() => (
            <View className="bg-gray-100 justify-center items-center w-20">
              <FontAwesome5
                name="trash"
                size={20}
                color="red"
                onPress={() => handleDelete(item.localId)}
              />
            </View>
          )}
          overshootRight={false}
        >
          <PurchaseListItem
            item={item}
            onChangeItem={handleChangeSetItem}
            onSetItem={handleSetItem}
            onToggleFieldEdit={handleToggleFieldEdit}
          />
        </Swipeable>
      </View>

  ), [handleChangeSetItem, handleSetItem, handleToggleFieldEdit]);

  return (
    <View className="flex-1 bg-white">
      <View className="mb-4">
        <Text className="text-2xl font-bold">{title}</Text>
        <Text className="text-gray-500 text-sm">
          Insira os dados e preencha sua lista de compras
        </Text>
      </View>

      <View className="flex-row gap-2 items-center justify-between mb-4 border-b border-gray-300 pb-4">
        <BaseInput
          placeholder="Nome do item"
          customStyle={`w-[55%] h-[42px] ${!isAndroid ? "pb-2" : ""}`}
          value={newItem.name}
          onChangeText={(text) => setNewItem((prev) => ({ ...prev, name: text }))}
        />
        <BaseInput
          placeholder="Qntd..."
          customStyle={`w-[25%] h-[42px] ${!isAndroid ? "pb-2" : ""}`}
          value={newItem.quantity}
          onChangeText={(text) => setNewItem((prev) => ({ ...prev, quantity: text }))}
        />
        <MainButton
          onPress={handleAddItem}
          className="bg-red-600 rounded-lg w-[15%] h-[42px] justify-center items-center"
        >
          <FontAwesome5 name="plus" size={16} color="white" />
        </MainButton>
      </View>

      <View className="flex-1">
        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center mb-48">
            <Image
              source={require("../../assets/images/img-lista-vazia.png")}
              className="w-56"
              resizeMode="contain"
            />
            <Text className="font-bold text-xl mt-4">Lista Vazia!</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Nenhum item foi adicionado à lista...
            </Text>
          </View>
        ) : (
          <KeyboardAvoidingView
            className="flex-1"
            behavior={isAndroid ? undefined : "padding"}
            keyboardVerticalOffset={isAndroid ? 0 : 80}
          >
            <FlatList
              data={items}
              keyExtractor={(item) => item.localId.toString()}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              renderItem={renderItem}
              className="flex-1 mb-44 bg-gray-100 rounded-lg"
            />
            <View className="flex-row absolute bottom-0 left-0 right-0 h-[80px] mb-24 py-6 bg-white border-t border-gray-300 justify-between items-center">
              <View>
                <Text className="text-gray-500">
                  Total de itens: {items.length}
                </Text>
                <Text className="text-gray-800 font-bold">
                  {`Valor total: ${totalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`}
                </Text>
              </View>
              <MainButton
                onPress={() => setIsDescriptionBoxVisible(true)}
                className="bg-red-600 rounded-lg px-4 h-12 justify-center items-center mt-2"
              >
                <Text className="text-white font-semibold text-center w-fit px-6">
                  Salvar Lista
                </Text>
              </MainButton>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>

      {isDescriptionBoxVisible && (
        <View className="absolute inset-0 z-50 justify-center items-center">
          <OverlayModal onClose={() => {
            console.log("Modal closed");
            setIsDescriptionBoxVisible(false);
          }}>
            <DescriptionBox
              onSubmitList={saveList}
              onChangeDescription={handleDescriptionChange}
            />
          </OverlayModal>
        </View>
      )}
    </View>
  );
};
