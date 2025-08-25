import { ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
    imageSize: number;
    stickerSource: ImageSourcePropType;
}

/**
 * Emoji sticker component for React Native.
 * This component allows users to interact with an emoji sticker by dragging it
 * or resizing it with a double-tap gesture.
 *
 * @prop {number} imageSize - The initial size of the emoji.
 * @prop {ImageSourcePropType} stickerSource - The source of the emoji image.
 * @returns A React component that renders an interactive emoji sticker.
 */
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    const scaleImage = useSharedValue<number>(imageSize);
    const translateX = useSharedValue<number>(0);
    const translateY = useSharedValue<number>(0);

    /**Double tap gesture object */
    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        if (scaleImage.value !== imageSize * 2) {
            scaleImage.value *= 2;
        } else {
            scaleImage.value = Math.round(scaleImage.value / 2);
        }
    });

    /** Animated style for scaling the emoji image */
    const imageStyle = useAnimatedStyle(() => (
        {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        }
    ));

    /**Drag gesture object */
    const drag = Gesture.Pan()
    .onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    /** Animated style for dragging the emoji container */
    const containerStyle = useAnimatedStyle(() => (
        {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    ));
  return (
    <GestureDetector gesture={drag}>
        <Animated.View style={[containerStyle, {top: -350}]}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image 
                    source={stickerSource}
                    resizeMode='contain'
                    style={[
                        imageStyle,
                        {
                            width: imageSize,
                            height: imageSize
                        }
                    ]}
                />
            </GestureDetector>
        </Animated.View>
    </GestureDetector>
    
  )
}