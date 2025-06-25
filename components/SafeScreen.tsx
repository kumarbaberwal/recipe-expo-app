import { colors } from '@/constants/colors';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafeScreen({ children }: { children: React.ReactNode }) {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top, flex: 1, backgroundColor: colors.background }}>
      {children}
    </View>
  )
}