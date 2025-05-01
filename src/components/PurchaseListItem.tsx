import React, { memo } from "react";
import { Text, View } from "react-native";
import { Item } from "../modules/purchase-list/domain/models/item-dto";
import { BaseInput } from "./BaseInput";
import { MainButton } from "./MainButton";

interface PurchaseListItemProps {
  item: Item;
  onChangeItem: (localId: number, field: keyof Item, value: string) => void;
  onSetItem: (localId: number, field: keyof Item, value: string) => void;
  onToggleFieldEdit: (localId: number, field?: keyof Item) => void;
}

export const PurchaseListItem = memo(({
  item,
  onChangeItem,
  onSetItem,
  onToggleFieldEdit,
}: PurchaseListItemProps) => {
  console.log("Rendering item list");
  return (
    <View className="flex-row items-center justify-between bg-white rounded-lg h-16 px-4 py-3">
      <View className="flex-1 flex-row gap-2 items-center">
        {item.isEditing ? (
          <BaseInput
            placeholder="Nome do item"
            customStyle="w-1/2 h-[40px]"
            value={item.name}
            onChange={(e) =>
              onChangeItem(item.localId, "name", e.nativeEvent.text)
            }
            onSubmitEditing={() =>
              onSetItem(item.localId, "name", item.name || "")
            }
          />
        ) : (
          <Text
            onPress={() => onToggleFieldEdit(item.localId, "name")}
            className="flex-1"
          >
            {item.name}
          </Text>
        )}
        {item.isEditing ? (
          <BaseInput
            placeholder="Quantidade"
            customStyle="w-[44%] h-[40px]"
            value={item.quantity}
            onChange={(e) =>
              onChangeItem(item.localId, "quantity", e.nativeEvent.text)
            }
            onSubmitEditing={() =>
              onSetItem(item.localId, "quantity", item.quantity || "")
            }
          />
        ) : (
          <Text
            onPress={() => onToggleFieldEdit(item.localId, "quantity")}
            className="w-10 text-center"
          >
            {item.quantity}
          </Text>
        )}
        {item.price ? (
          <Text
            onPress={() => onToggleFieldEdit(item.localId, "price")}
            className={`text-gray-800 text-[12px] font-semibold ${
              item.isEditing || item.isEditingPrice ? "hidden" : ""
            }`}
          >
            {Number(item.price.replace(",", ".")).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        ) : null}
      </View>

      <View className="flex-row items-center">
        {(item.price && item.isEditing) || item.isEditingPrice ? (
          <BaseInput
            placeholder="Preço"
            customStyle="w-20 h-[40px]"
            value={item.price}
            autoFocus
            onChange={(e) =>
              onChangeItem(item.localId, "price", e.nativeEvent.text)
            }
            onSubmitEditing={() =>
              onSetItem(item.localId, "price", item.price || "")
            }
          />
        ) : (
          <>
            {!item.price && (
              <MainButton
                onPress={() => onToggleFieldEdit(item.localId, "price")}
                className="bg-red-700 rounded-lg px-4 h-10 w-fit justify-center items-center ml-2"
              >
                <Text className="text-white font-semibold text-md">R$+</Text>
              </MainButton>
            )}
          </>
        )}
      </View>
    </View>
  );
});

PurchaseListItem.displayName = "PurchaseListItem";