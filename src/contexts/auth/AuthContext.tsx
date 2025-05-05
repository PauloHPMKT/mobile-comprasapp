import { AccountModel } from "@/src/modules/user/domain/models/account";
import { UserModel } from "@/src/modules/user/domain/models/user";
import { createContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  accountId: string;
  createdAt: string;
}


interface AuthContextType {
  user: User | null;
  login: ({ email, password }: AccountModel.SignIn) => Promise<UserModel.Result | boolean>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);