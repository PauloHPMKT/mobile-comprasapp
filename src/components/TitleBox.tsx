import { Text, View } from "react-native";
//import { BaseInput } from "./BaseInput";
import { useState } from "react";
import { BaseInput } from "./BaseInput";
import { MainButton } from "./MainButton";

interface TitleBoxProps {
  onSubmitTitle: (title: string) => void;
}

export function TitleBox({ onSubmitTitle }: TitleBoxProps) {
  const [title, setTitle] = useState("");

  const handleKeepListTitle = () => {
    onSubmitTitle(title);
    setTitle("");
  };

  return (
    <View className="bg-[rgba(0,0,0,0.3)] justify-center items-center w-screen h-screen abso">
      <View className="bg-white rounded-lg p-4 w-[320px] shadow-2xl">
        <Text className="text-lg font-semibold mt-4 text-center">
          Adicione um título à lista
        </Text>
        <Text className="text-gray-400 text-center mt-2">
          Para melhor organização das suas listas de compras, adicione um título
          a cada uma delas.
        </Text>
        <View className="flex-row w-full items-center justify-center gap-4 mt-4 px-4">
          <BaseInput
            value={title}
            onChangeText={setTitle}
            placeholder="Título da lista"
            customStyle="w-[80%] h-[42px] pr-[16%]"
          />
          <MainButton
            onPress={handleKeepListTitle}
            className="bg-red-600 h-[42px] rounded-lg px-4 justify-center items-center"
          >
            <Text className="text-white font-semibold">Criar</Text>
          </MainButton>
        </View>
      </View>
    </View>
  );
}
