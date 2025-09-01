import { View, StyleSheet, ImageSourcePropType, Platform } from "react-native";
import { ImageViewer, Button, CircularButton, IconButton, EmojiPicker, EmojiList, EmojiSticker } from "@/components";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

const PlaceHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
	// Hooks
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
	const [status, requestPermission] = MediaLibrary.usePermissions();

	const imageRef = useRef<View>(null);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert('You did not select any image.');
		}
	}

	const onModalClose = () => setModalVisible(false);

	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1
				});

				await MediaLibrary.saveToLibraryAsync(localUri);

				if (localUri) alert('Saved!');
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				// capturing svg to jpeg screenshot of DOM image element using domtoimage
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 1,
					width: 320,
					height: 440,
				});

				let link = document.createElement('a');
				link.download = 'sticker-smash.jpeg';
				link.href = dataUrl;
				link.click();
			} catch (e) {
				console.log(e);
			}
		}
	};

	// requesting media permission to access media library
	if (status === null) requestPermission();
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer
						imgSource={PlaceHolderImage}
						selectedImage={selectedImage}
					/>
					{pickedEmoji &&
					<EmojiSticker
						imageSize={40}
						stickerSource={pickedEmoji}
					/>}
				</View>
			</View>
			{showAppOptions? (
			<View style={styles.optionsContainer}>
				<View style={styles.optionsRow}>
					<IconButton
						icon="refresh" label="Reset" 
						onPress={() => setShowAppOptions(false)}	// Causing the image picker button to appear again
					/>
					<CircularButton 
						onPress={() => setModalVisible(true)} // making modal visible
					/>
					<IconButton
						icon="save-alt" label="Save" 
						onPress={onSaveImageAsync}
					/>
				</View>
			</View>
			): (
			<View style={styles.footerContainer}>
				<Button 
					label='Choose a photo' theme="primary" 
					onPress={pickImageAsync}
				/>
				<Button 
					label='Use this photo' 
					onPress={() => setShowAppOptions(true)}
				/>
			</View>
			)}
			<EmojiPicker 
				isVisible={modalVisible}
				onClose={onModalClose}	//	making modal invisible when close button is clicked
			>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
			</EmojiPicker>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center'
	},
	imageContainer: {
    	flex: 1,
		paddingTop: 28,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
});