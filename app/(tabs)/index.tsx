import { View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";

export default function Index() {

	const PlaceHolderImage = require("@/assets/images/background-image.png");
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer imgSource={PlaceHolderImage}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
	},
	text: {
		color: '#fff',
	},
	imageContainer: {
    	flex: 1,
	},
});