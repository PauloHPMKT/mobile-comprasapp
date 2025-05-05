
import { BaseInput } from "@/src/components/BaseInput";
import { CustomCheckBox } from "@/src/components/CustomCheckBox";
import { MainButton } from "@/src/components/MainButton";
import { AuthContext } from "@/src/contexts/auth/AuthContext";
import { AccountModel } from "@/src/modules/user/domain/models/account";
import { setUser } from "@/src/store/auth/auth-reducer";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

type LoginProps = AccountModel.SignIn;

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useContext(AuthContext);

  const defaultValues: LoginProps = {
    email: "",
    password: "",
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>({ defaultValues });

  const handleLogin = async (data: LoginProps) => {
    const toLogin = {
      email: data.email,
      password: data.password,
    }
    const result = await auth.login(toLogin);

    const userData = typeof result !== "boolean" ? result : null;

    dispatch(setUser(userData!));

    if (result) {
      router.push("../main/dashboard");
    }
    else {
      console.log("Login failed");
    }
  }

  return (
    <>
      <View className="mt-10 gap-2">
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'O e-mail é obrigatório',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Insira um e-mail válido',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <BaseInput
              placeholder="Insira seu e-mail"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Senha é obrigatória',
            minLength: {
              value: 3,
              message: 'Senha deve ter pelo menos 3 caracteres',
            },
          }}
          render={({field}) => (
            <BaseInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Senha"
              hasError={!!errors.password}
              isPassword={true}
            />
          )}
        />

        <View className="flex-row justify-between items-center">
          <CustomCheckBox
            // checked={rememberMe}
            // onPress={() => setRememberMe(!rememberMe)}
            checkedColor="#ee2626"
            uncheckedColor="#ccc"
          >
            Lembrar-me
          </CustomCheckBox>
          <TouchableOpacity>
            <Text className="text-sm text-red-600">Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MainButton
        onPress={handleSubmit(handleLogin)}
        className="bg-red-600 mt-6 py-3 rounded-lg items-center"
      >
        <Text className="text-white font-semibold text-lg">
          {
            isSubmitting
              ? (
                  <>
                    <View className="w-6 h-6 border-2 border-white border-t-red-600 rounded-full animate-spin" />
                  </>
                )
              : "Login"
          }
        </Text>
      </MainButton>
    </>
  );
}
