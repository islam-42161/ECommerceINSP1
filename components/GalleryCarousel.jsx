import { StyleSheet, View, Dimensions, Text, StatusBar, ScrollView, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { Extrapolation, interpolate, runOnUI, scrollTo, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const IMAGE_WIDTH = Dimensions.get('window').width
const GalleryCarousel = ({ navigation, route }) => {
    const images = route?.params?.images || [
        'https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    ];
    const active_index = route?.params?.active_index || 0;

    const placeholder_blurhash =
        "|6PZfSi_.AyE8^m+%gt,o~_3t7t7R*WBs,ofR-a#*0o#DgR4.Tt,ITVYZ~_3R*D%xt%MIpRj%0oJMcV@%itSI9R5x]tRbcIot7-:IoM{%LoeIVjuNHoft7M{RkxuozM{ae%1WBg4tRV@M{kCxuog?vWB9Et7-=NGM{xaae";

    const animatedScrollX = useSharedValue(IMAGE_WIDTH * active_index);
    const animatedRef = useAnimatedRef();
    const animatedScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            animatedScrollX.value = e.contentOffset.x;
        },
    });

    useEffect(() => {
        runOnUI(() => {
            scrollTo(animatedRef, active_index * IMAGE_WIDTH, 0, true);
        })();
    }, [active_index])
    const AnimatedThumbnail = ({ index, image }) => {
        const ThumbnailStyle = useAnimatedStyle(() => {
            const width = 60;
            return {
                width: interpolate(
                    animatedScrollX.value,
                    [
                        (index - 1) * IMAGE_WIDTH,
                        index * IMAGE_WIDTH,
                        (index + 1) * IMAGE_WIDTH,
                    ],
                    [width, width * 1.25, width],
                    Extrapolation.CLAMP
                ),
                borderWidth: interpolate(
                    animatedScrollX.value,
                    [
                        (index - 1) * IMAGE_WIDTH,
                        index * IMAGE_WIDTH,
                        (index + 1) * IMAGE_WIDTH,
                    ],
                    [0, 1.5, 0],
                    Extrapolation.CLAMP
                ),
                borderColor: 'white'
            };
        });

        const handleThumbnailPress = () => {
            runOnUI(() => {
                scrollTo(animatedRef, index * IMAGE_WIDTH, 0, true);
            })();
        };

        return (
            <AnimatedPressable style={ThumbnailStyle} onPress={handleThumbnailPress}>
                <Image source={image} style={StyleSheet.absoluteFillObject} />
            </AnimatedPressable>
        );
    };

    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
        });
    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = e.rotation;
        })
        .onEnd(() => {
            rotation.value = withSpring(0);
        });


    const pinchStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotateZ: `${(rotation.value / Math.PI) * 180}deg` }
        ],
    }));
    const composed = Gesture.Simultaneous(pinchGesture, rotationGesture)
    return (
        <View style={styles.container}>
            {/* Image Container - Takes the available space dynamically */}
            <GestureDetector gesture={composed}>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={"fast"}
                    onScroll={animatedScrollHandler}
                    ref={animatedRef}
                    style={[styles.imageScrollView, pinchStyle]}  // Use flexGrow to make this container take available space
                >
                    {images.map((uri, key) => (
                        <View style={[styles.imageContainer]} key={key}>
                            <Image
                                source={{ uri }}
                                placeholder={placeholder_blurhash}
                                style={styles.image}
                                transition={1000}
                                contentFit="contain"
                                cachePolicy={"disk"}
                            />
                        </View>
                    ))}
                </Animated.ScrollView>
            </GestureDetector>

            {/* Components below the image */}
            <View style={styles.bottom_row_container}>
                <MaterialCommunityIcons
                    name="arrow-collapse"
                    onPress={() => navigation.goBack()}
                    style={[styles.button]}
                />
                <View style={styles.thumbnails_container}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 10 }}
                    >
                        {images.map((item, index) => (
                            <AnimatedThumbnail key={index.toString()} image={item} index={index} />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default GalleryCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343434',
        paddingTop: STATUSBAR_HEIGHT
    },
    imageScrollView: {
        flexGrow: 1, // Takes available space dynamically
    },
    imageContainer: {
        flex: 1, // Let the image container fill its parent space
        width: IMAGE_WIDTH,
    },
    image: {
        width: '100%',
        height: '100%', // Fills the available space within the container
    },
    bottom_row_container: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#151515'
    },
    thumbnails_container: {
        // backgroundColor: 'rgba(0,0,0,0.2)',
        // height: 100,
    },
    thumbnail: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 5,
    },
    button: {
        width: 24 + 16,
        height: 24 + 16,
        padding: 8,
        backgroundColor: "#343434",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 16,
        borderRadius: 14,
        color: "white",
    },
});
