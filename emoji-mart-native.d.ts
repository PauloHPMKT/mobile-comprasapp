// src/@types/emoji-mart-native/index.d.ts
declare module 'emoji-mart-native' {
  import * as React from 'react';

  export interface PickerProps {
    onSelect: (emoji: any) => void;
    title?: string;
    emoji?: string;
    emojiSize?: number;
    perLine?: number;
    showPreview?: boolean;
    showSkinTones?: boolean;
    style?: React.CSSProperties;
  }

  export const Picker: React.FC<PickerProps>;
}
