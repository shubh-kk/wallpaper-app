import { View, Image, Text, StyleSheet, Dimensions, Pressable, useWindowDimensions } from 'react-native';
import type { Wallpaper } from '@/hooks/useWallpaper';

// Default values for phone
const COLUMN_GAP = 10;
const NUM_COLUMNS = 2;

interface ImageCardProps {
    item: Wallpaper;
    onPress?: (item: Wallpaper) => void;
}

export function ImageCard({ item, onPress }: ImageCardProps) {
    const { width: windowWidth } = useWindowDimensions();
    
    // Responsive calculations
    const isTablet = windowWidth >= 768;
    const columns = isTablet ? 3 : 2;
    const cardWidth = (windowWidth - (32 + COLUMN_GAP * columns)) / columns;

    function handlePress() {
        onPress?.(item);
    }

    return (
        <Pressable onPress={handlePress}>
            <View style={[
                styles.container, 
                { 
                    width: cardWidth,
                    height: isTablet ? 400 : 230 // Increased from 280 to 320 for tablets
                }
            ]}>
                <Image 
                    source={{ uri: item.url }} 
                    style={[
                        styles.image,
                        { height: isTablet ? 400 : 230 } // Increased from 280 to 320 for tablets
                    ]}
                    accessibilityLabel={item.name}
                />
                <Text 
                    style={styles.title}
                    numberOfLines={1}
                    accessibilityRole="text"
                >
                    {item.name}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginBottom: 0,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 230
    },
    title: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
}); 