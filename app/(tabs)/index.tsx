import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function Index() {

	const PlaceHolderImage = require("@/assets/images/background-image.png");
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={PlaceHolderImage} style={styles.image}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 15
	},
	text: {
		color: '#fff',
	},
	imageContainer: {
    	flex: 1,
	},
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});