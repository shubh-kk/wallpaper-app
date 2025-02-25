import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.FlatList>();
  const scrollY = useSharedValue(0);
  const bottom = useBottomTabOverflow();
  
  // Use animated scroll handler instead of useScrollViewOffset
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollY.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        ref={scrollRef}
        data={[{ key: 'content' }]} // Dummy data to make FlatList work
        renderItem={() => (
          <>
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: headerBackgroundColor[colorScheme] },
                headerAnimatedStyle,
              ]}>
              {headerImage}
            </Animated.View>
            <ThemedView style={styles.content}>{children}</ThemedView>
          </>
        )}
        keyExtractor={(item) => item.key}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        nestedScrollEnabled={true} // Allow nested scrolling
        contentContainerStyle={{ paddingBottom: bottom }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    marginBottom: 6
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
    overflow: 'hidden',
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 20,
  },
});