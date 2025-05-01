import { useState } from "react";
import { Text, View } from "react-native";
import { BaseInput } from "./BaseInput";
import { MainButton } from "./MainButton";

interface DescriptionBoxProps{
  onSubmitList: () => void;
  onChangeDescription: (description: string) => void;
}

export function DescriptionBox({ onSubmitList, onChangeDescription }: DescriptionBoxProps) {
  const [description, setDescription] = useState<string | null>(null);

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    onChangeDescription(text);
  };

  return (
    <View className="bg-[rgba(0,0,0,0.3)] justify-center items-center w-screen h-screen abso">
      <View className="bg-white rounded-lg p-4 w-[320px] shadow-2xl">
        <Text className="text-lg font-semibold mt-4 text-center">
          Deseja adicionar uma descrição à lista?
        </Text>
        <Text className="text-gray-400 text-center mt-2">
          A descrição auxilia na organização das suas listas de compras.
        </Text>
        <View className="flex-row w-full items-center justify-center gap-4 mt-4 px-4">
          <BaseInput
            value={description ?? ""}
            onChangeText={handleDescriptionChange}
            placeholder="Adicionar descrição..."
            customStyle="w-[68%] h-[42px]"
          />
          <MainButton
            onPress={onSubmitList}
            className="bg-red-600 h-[42px] rounded-lg px-4 justify-center items-center"
          >
            <Text className="text-white font-semibold">Salvar Lista</Text>
          </MainButton>
        </View>
      </View>
    </View>
  );
}
