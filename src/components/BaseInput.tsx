import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface PasswordInputProps extends React.ComponentProps<typeof TextInput> {
  placeholder?: string;
  hasError?: boolean;
  customStyle?: string;
  isPassword?: boolean;
}

export function BaseInput({
  placeholder,
  hasError,
  customStyle,
  isPassword,
  ...props
}: PasswordInputProps) {
  const [inputType, setInputType] = useState<'password' | 'text'>(
    isPassword ? 'password' : 'text'
  );
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <View
      className={`
        flex-row justify-center items-center h-14 rounded-lg px-2 border border-gray-300
        ${hasError && 'border-2 border-red-500'}
        ${customStyle}
      `}
    >
      <TextInput
        secureTextEntry={isPassword && inputType === 'password'}
        placeholder={placeholder}
        className="flex-1 h-full text-base text-gray-800 outline-none"
        {...props}
      />
      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility} className="ml-2">
          <Feather
            name={inputType === 'password' ? 'eye-off' : 'eye'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}