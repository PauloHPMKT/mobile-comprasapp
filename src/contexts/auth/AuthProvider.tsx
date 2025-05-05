import { makeAuthSignInFactory } from "@/src/modules/main/factories/auth";
import { AccountModel } from "@/src/modules/user/domain/models/account";
import { UserModel } from "@/src/modules/user/domain/models/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { JSX, useState } from "react";
import { AuthContext } from "./AuthContext";

const authSignIn = makeAuthSignInFactory();

interface AuthProviderProps {
  children: React.ReactNode | JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserModel.Result | null>(null);

  const login = async ({ email, password }: AccountModel.SignIn): Promise<UserModel.Result | boolean> => {
    const data = await authSignIn.execute(email, password);

    if (data) {
      const { token, user } = data;
      setUser(user);
      await AsyncStorage.setItem("token", token);

      return user;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};