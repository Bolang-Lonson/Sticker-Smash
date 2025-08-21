import { View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";

export default function Index() {

	const PlaceHolderImage = require("@/assets/images/background-image.png");
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer imgSource={PlaceHolderImage}/>
			</View>
			<View style={styles.footerContainer}>
				<Button label='Choose a photo' theme="primary"/>
				<Button label='Use this photo'/>
			</View>
		</View>
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
		paddingTop: 28
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
});