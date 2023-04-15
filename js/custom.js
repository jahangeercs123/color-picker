//Create Initial References
let pickColor = document.getElementById("pick-color");
let error = document.getElementById("error");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hexValRef = document.getElementById("hex-val-ref");
let rgbValRef = document.getElementById("rgb-val-ref");
let customAlert = document.getElementById("custom-alert");
let pickedColorRef = document.getElementById("picked-color-ref");
let eyeDropper;

//Function On Window Load
window.onload = () => {
	//Check if the browser supports EyeDropper
	if ("EyeDropper" in window) {
		pickColor.classList.remove("hide");
		eyeDropper = new EyeDropper();
	} else {
		error.classList.remove("hide");
		error.innerText =
			"This app doesn't support Eyedropper API. Try opening it in Chrome, Brave or Edge";
		pickColor.classList.add("hide");
		return false;
	}
};
//eyedropper logic
const colorSelector = async () => {
	const color = await eyeDropper.open().then((colorValue) => {
		error.classList.add("hide");
		//Get the hex color code
		let outputValue = colorValue.sRGBHex;
		let hex = "#";

		if (outputValue.includes("rgb")) {
			var rgbValue = outputValue;
			rgbValue = rgbValue.replace(/[rgb()]+/g, "") || rgbValue;
			rgbValue = rgbValue.split(",");
			rgbValue.forEach((value) => {
				value = parseInt(value).toString(16);
				hex += value.length == 1 ? "0" + value : value;
			});
			var hexValue = hex;
			var rgbValue = outputValue;
		} else {
			var hexValue = outputValue;
			let rgbArr = [];
			for (let i = 1; i < hexValue.length; i += 2) {
				rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
				console.log(rgbArr);
			}
			var rgbValue = "rgb(" + rgbArr + ")";
		}
		//Convert Hex Value To RGB
		console.log(hexValue, rgbValue);
		result.style.display = "grid";
		hexValRef.value = hexValue;
		rgbValRef.value = rgbValue;
		pickedColorRef.style.backgroundColor = hexValue;
	});
};

//button click
pickColor.addEventListener("click", colorSelector);

fileInput.onchange = () => {
	result.style.display = "none";
	//The FileReader object helps to read contents of file stored on computer
	let reader = new FileReader();
	//readAsDataURL reads the content of input File
	reader.readAsDataURL(fileInput.files[0]);

	reader.onload = () => {
		//onload is triggered after file reading operation is successfully completed.
		//set src attribute of image to the result/input File
		image.setAttribute("src", reader.result);
	};
};

//Function to copy the color code
let copy = (textId) => {
	//Selects the text in the <input> elemet
	document.getElementById(textId).select();
	//Copies the selected text to clipboard
	document.execCommand("copy");
	//Display alert
	customAlert.style.transform = "scale(1)";
	setTimeout(() => {
		customAlert.style.transform = "scale(0)";
	}, 2000);
};
