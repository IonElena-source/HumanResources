<template>
	<div
		class="wrapper"
		style="background-image: url('images/bg-registration-form-2.jpg')"
	>
		<div class="inner">
			<form>
				<h3>Profil</h3>
				<div class="form-group">
					<div class="form-wrapper">
						<label for="">Nume</label>
						<input type="text" class="form-control" id="inputNume" />
					</div>
					<div class="form-wrapper">
						<label for="">Prenume</label>
						<input type="text" class="form-control" id="inputPrenume" />
					</div>
				</div>

				<div class="form-wrapper">
					<label for="">Email</label>
					<input type="text" class="form-control" id="inputEmail" />
				</div>
				<div class="form-wrapper">
					<label for="">Telefon</label>
					<input type="text" class="form-control" id="inputTelefon" />
				</div>
				<div class="form-wrapper">
					<label for="">Adresa</label>
					<input type="text" class="form-control" id="inputAdresa" />
				</div>

				<div class="checkbox">
					<label> </label>
				</div>
				<button @click="salveazaSchimbari">Actualizeaza</button>
			</form>
		</div>
		<div class="" id="divSemnatura" style="float: right">
			<label for="" id="labelSemnatura">Semnatura</label>
			<canvas
				type="text"
				style="border: 1px solid black"
				id="uid"
				class="canvas"
				data-uid="uid"
			></canvas>
			<button id="btnStergeSemnatura" @click="stergeSemnatura">
				Sterge Semantura
			</button>
		</div>
	</div>
</template>
<script>
import SignaturePad from "signature_pad";
import axios from "axios";
import CryptoJS from "crypto-js";
export default {
	name: "SetariProfil",
	data() {
		return {
			signaturePad: {},
			dataURL: "",
			editing: true,
			dataURLSemnatura: localStorage.getItem("dataURLSemnatura"),
			angajati: [],
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
		};
	},
	mounted() {
		let canvas = document.getElementById("uid");
		this.signaturePad = new SignaturePad(canvas);

		this.signaturePad.fromDataURL(this.dataURLSemnatura);
		console.log("Semnatura");

		document.getElementById("inputNume").value = this.managerLogat.Nume;
		document.getElementById("inputPrenume").value = this.managerLogat.Prenume;
		document.getElementById("inputTelefon").value = this.managerLogat.Telefon;
		document.getElementById("inputEmail").value = this.managerLogat.Email;
		document.getElementById("inputAdresa").value = this.managerLogat.Adresa;
	},
	watch: {
		editing: function () {},
	},
	methods: {
		stergeSemnatura() {
			this.signaturePad.clear();
		},
		salveazaSchimbari(e) {
			e.preventDefault();
			let nume = document.getElementById("inputNume").value;
			let prenume = document.getElementById("inputPrenume").value;
			let telefon = document.getElementById("inputTelefon").value;
			let email = document.getElementById("inputEmail").value;
			let adresa = document.getElementById("inputAdresa").value;
			this.editing = !this.editing;
			this.dataURL = this.signaturePad.toDataURL();
			this.dataURLCriptata = CryptoJS.AES.encrypt(
				this.signaturePad.toDataURL(),
				"secretKey"
			);
			let managerNou = {
				Nume: nume,
				Prenume: prenume,
				Adresa: adresa,
				Telefon: telefon,
				Email: email,
				Semnatura: this.dataURLCriptata.toString(),
			};

			axios
				.put(
					`http://localhost:5000/manageri/update/${this.managerLogat.Email}`,
					managerNou
				)
				.then((response) => {
					console.log(response);
					//regasim din nou managerul
					
					console.log(this.editing);
					alert("Actualizare reusita");
					this.$router.push("/manager/logRegister")
				})
				.catch((err) => console.log(err));

			console.log(this.managerLogat._id);
		},
	},
};
</script>
<style scoped>
#labelSemnatura {
	position: absolute;
	margin-left: -430px;
	margin-top: -180px;
}
canvas {
	position: absolute;
	border: 1px solid black;
	margin-top: -150px;
	margin-left: -520px;
}
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	font-family: "Muli-Regular";
	color: #666;
	font-size: 13px;
	margin: 0;
}

input,
textarea,
select,
button {
	font-family: "Muli-Regular";
	color: #333;
	font-size: 13px;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
ul {
	margin: 0;
}

img {
	max-width: 80%;
}

ul {
	padding-left: 0;
	margin-bottom: 0;
}

a:hover {
	text-decoration: none;
}

:focus {
	outline: none;
}
#inputAdresa {
	margin-left: -5px;
	width: 550px;
}
.wrapper {
	min-height: 80vh;
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	width: 80vw;
	align-items: center;
}

.inner {
	min-width: 1150px;
	margin: auto;
	padding-top: 38px;
	padding-bottom: 48px;
	background-color: rgba(196, 196, 196, 0.185);
}
.inner h3 {
	text-transform: uppercase;
	font-size: 22px;
	font-family: "Muli-Bold";
	text-align: center;
	margin-bottom: 32px;
	color: #333;
	letter-spacing: 2px;
}

form {
	width: 50%;
	padding-left: 45px;
}

.form-group {
	display: flex;
}
.form-group .form-wrapper {
	width: 50%;
}
.form-group .form-wrapper:first-child {
	margin-right: 20px;
}

.form-wrapper {
	margin-bottom: 17px;
}
.form-wrapper label {
	margin-bottom: 9px;
	display: block;
}

.form-control {
	border: 1px solid #ccc;
	display: block;
	width: 100%;
	height: 40px;
	padding: 0 20px;
	border-radius: 20px;
	font-family: "Muli-Bold";
	background: none;
}
.form-control:focus {
	border: 1px solid #21318b;
}

select {
	-moz-appearance: none;
	-webkit-appearance: none;
	cursor: pointer;
	padding-left: 20px;
}
select option[value=""][disabled] {
	display: none;
}

button {
	border: none;
	width: 152px;
	height: 40px;
	margin: auto;
	margin-top: 29px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	background: #8d8bf3;
	font-size: 13px;
	color: #fff;
	text-transform: uppercase;
	font-family: "Muli-SemiBold";
	border-radius: 20px;
	overflow: hidden;
	-webkit-transform: perspective(1px) translateZ(0);
	transform: perspective(1px) translateZ(0);
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);
	position: relative;
	-webkit-transition-property: color;
	transition-property: color;
	-webkit-transition-duration: 0.5s;
	transition-duration: 0.5s;
}
button:before {
	content: "";
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #4d4ae4;
	-webkit-transform: scaleX(0);
	transform: scaleX(0);
	-webkit-transform-origin: 0 50%;
	transform-origin: 0 50%;
	-webkit-transition-property: transform;
	transition-property: transform;
	-webkit-transition-duration: 0.5s;
	transition-duration: 0.5s;
	-webkit-transition-timing-function: ease-out;
	transition-timing-function: ease-out;
}
button:hover:before {
	-webkit-transform: scaleX(1);
	transform: scaleX(1);
	-webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
	transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
}

.checkbox {
	position: relative;
}
.checkbox label {
	padding-left: 22px;
	cursor: pointer;
}
.checkbox input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
}
.checkbox input:checked ~ .checkmark:after {
	display: block;
}

.checkmark {
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	height: 12px;
	width: 13px;
	border-radius: 2px;
	background-color: #ebebeb;
	border: 1px solid #ccc;
	font-family: Material-Design-Iconic-Font;
	color: #000;
	font-size: 10px;
	font-weight: bolder;
}
.checkmark:after {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: none;
	content: "\f26b";
}

@media (max-width: 991px) {
	.inner {
		min-width: 768px;
	}
}
@media (max-width: 767px) {
	.inner {
		min-width: auto;
		background: none;
		padding-top: 0;
		padding-bottom: 0;
	}

	form {
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}
}
#btnStergeSemnatura {
	margin-left: -470px;
}
#btnStergeSemnatura {
	border: none;

	margin-left: -460px;
	width: 152px;
	height: 40px;
	margin-top: 29px;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	padding: 0;
	background: #d84949;
	font-size: 13px;
	color: #fff;
	text-transform: uppercase;
	font-family: "Muli-SemiBold";
	border-radius: 20px;
	overflow: hidden;
	-webkit-transform: perspective(1px) translateZ(0);
	transform: perspective(1px) translateZ(0);
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);

	-webkit-transition-property: color;
	transition-property: color;
	-webkit-transition-duration: 0.5s;
	transition-duration: 0.5s;
}
#btnStergeSemnatura:before {
	content: "";
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #861717;
	-webkit-transform: scaleX(0);
	transform: scaleX(0);
	-webkit-transform-origin: 0 50%;
	transform-origin: 0 50%;
	-webkit-transition-property: transform;
	transition-property: transform;
	-webkit-transition-duration: 0.5s;
	transition-duration: 0.5s;
	-webkit-transition-timing-function: ease-out;
	transition-timing-function: ease-out;
}
#btnStergeSemnatura:hover:before {
	-webkit-transform: scaleX(1);
	transform: scaleX(1);
	-webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
	transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
}

/*# sourceMappingURL=style.css.map */
</style>