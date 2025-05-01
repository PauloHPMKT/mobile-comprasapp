import React, { ComponentProps } from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";

interface OverlayModalProps extends ComponentProps<typeof Modal> {
  children: React.ReactNode;
  onClose: () => void;
}

export function OverlayModal({ onClose, children, ...modalProps }: OverlayModalProps) {
  return (
    <Modal transparent animationType="fade" {...modalProps}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View>
          { children }
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
