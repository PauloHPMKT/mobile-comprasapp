import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CheckBox, CheckBoxProps } from 'react-native-elements';

interface CustomCheckBoxProps extends TouchableOpacityProps, CheckBoxProps {
  children: string | ReactNode;
}

export function CustomCheckBox({ children, ...props }: CustomCheckBoxProps) {
  return (
    <TouchableOpacity
      className='flex-row items-center'
      activeOpacity={0.7}
      {...props}
    >
      <CheckBox
        containerStyle={styles.checkboxContainer}
        size={22}
        {...props}
      />
      <Text className='text-[12px] font-normal'>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
});