<template>
	<div id="bodyAngajat">
		<div id="loader" style="display: none"></div>
		<div class="container">
			<div class="forms-container">
				<div class="signin-signup">
					<form class="sign-in-form">
						<h2 class="title">Autentificare</h2>
						<div class="input-field">
							<i class="fas fa-user"></i>
							<input
								type="text"
								placeholder="Email                            @emp.hr.com"
								v-model="EmailLogin"
								@change="removeUser"
							/>
						</div>
						<div class="input-field">
							<i class="fas fa-lock"></i>
							<input
								type="password"
								placeholder="Parola"
								v-model="ParolaLogin"
							/>
						</div>
						<button type="submit" class="btn solid" @click.prevent="login">
							Intra in aplicatie
						</button>

						<p class="social-text">
							Te poti autentifica folosind si platformele sociale
						</p>
						<div class="social-media">
							<a href="#" class="social-icon">
								<i class="fab fa-facebook-f"></i>
							</a>
							<a href="#" class="social-icon">
								<i class="fab fa-twitter"></i>
							</a>
							<a href="#" class="social-icon">
								<i class="fab fa-google"></i>
							</a>
							<a href="#" class="social-icon">
								<i class="fab fa-linkedin-in"></i>
							</a>
						</div>
					</form>
					<form class="sign-up-form">
						<h2 class="title">Inregistrare</h2>
						<div class="input-field">
							<i class="fas fa-user"></i>
							<input
								type="text"
								placeholder="Nume Utilizator"
								v-model="NumeUtilizatorRegister"
							/>
						</div>
						<div class="input-field">
							<i class="fas fa-envelope"></i>
							<input
								type="email"
								placeholder="Email"
								id="inputEmail"
								v-model="EmailRegister"
							/>
						</div>
						<div class="input-field">
							<i class="fas fa-lock"></i>
							<input
								type="password"
								placeholder="Parola"
								v-model="ParolaRegister"
							/>
						</div>
						<div class="input-field">
							<i class="fas fa-lock"></i>
							<input
								type="password"
								v-model="ConfirmaParolaRegister"
								placeholder="Confirma Parola"
								value="ConfirmaParola"
							/>
						</div>
						<button class="btn" @click="signUp">Creeaza cont</button>
						<p class="social-text">
							Inregistreaza-te folosind platforme social
						</p>
						<div class="social-media">
							<a href="#" class="social-icon">
								<i class="fab fa-facebook-f"></i>
							</a>
							<a href="#" class="social-icon">
								<i class="fab fa-twitter"></i>
							</a>
							<a href="#" class="social-icon">
								<i class="fab fa-google"></i>
							</a>
							<a href="#" class="social-icon">
								<i class="fab fa-linkedin-in"></i>
							</a>
						</div>
					</form>
				</div>
			</div>

			<div class="panels-container">
				<div class="panel left-panel">
					<div class="content">
						<h3 id="hNuAiCont">Nu ai cont?</h3>

						<button
							class="btn transparent"
							id="sign-up-btn"
							@click="changeToSignUp"
						>
							Inregistrare
						</button>
					</div>
					<img src="../assets/log.png" class="image" alt="" />
				</div>
				<div class="panel right-panel">
					<div class="content">
						<h3 id="aiDejaCont">Ai deja cont?</h3>

						<button
							class="btn transparent"
							id="sign-in-btn"
							@click="changeToSignIn"
						>
							Intra in aplicatie
						</button>
					</div>
					<img src="../assets/register.svg" class="image" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
	name: "AuthAngajat",
	components: {},
	data() {
		return {
			NumeUtilizatorRegister: "",
			EmailRegister: "",
			ParolaRegister: "",
			ConfirmaParolaRegister: "",
			EmailLogin: "",
			ParolaLogin: "",
			errorRegister: "",
			errorLogin: "",
			angajati: [],
			dataURLSemnatura: "",
			angajatLogat: {},
		};
	},
	computed: {},
	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth").catch(() => {});
		}
	},
	methods: {
		removeUser() {
			if (localStorage.getItem("tokenAngajat") !== "") {
				console.log("A fost sters tokenul");
				localStorage.removeItem("tokenAngajat");
			}
		},
		changeToSignUp() {
			const container = document.querySelector(".container");
			container.classList.add("sign-up-mode");
		},
		changeToSignIn() {
			const container = document.querySelector(".container");
			container.classList.remove("sign-up-mode");
			console.log(container);
			console.log("Aaa");
		},
		signUp(e) {
			e.preventDefault();
			let utilizatorNou = {
				NumeUtilizator: this.NumeUtilizatorRegister,
				Email: this.EmailRegister,
				Parola: this.ParolaRegister,
			};
			if (this.ConfirmaParolaRegister !== this.ParolaRegister) {
				alert("Parolele nu coincid");
			}
			axios
				.post("http://localhost:5000/angajati/register", utilizatorNou)
				.then((res) => {
					if (res.data.succes) {
						this.changeToSignIn();
						console.log(res);
					} else {
						this.errorRegister = res.data.error;
						alert(this.errorRegister);
					}
				})
				.catch((err) => {
					this.errorRegister = err.response.data.error;
					alert(this.errorRegister);
				});
		},
		login(e) {
			e.preventDefault();
			console.log(localStorage.getItem("tokenAngajat"));
			console.log(localStorage.getItem("angajatLogat"));

			if (this.EmailLogin == "" || this.ParolaLogin == "") {
				alert("Toate campurile sunt obligatorii");
				return;
			}
			if (!/@emp.hr.com\s*$/.test(this.EmailLogin)) {
				alert("Format email incorec");
				console.log("Email incorect");
				return;
			}
			console.log("bbbb");
			let user = { Email: this.EmailLogin, Parola: this.ParolaLogin };
			document.querySelector("#loader").style.display = "block";
			document.querySelector(".container").style.display = "none";
			axios
				.post("http://localhost:5000/angajati/login", user)
				.then((res) => {
					if (res.status == 200) {
						console.log(res);
						localStorage.setItem("tokenAngajat", res.data.token);
						console.log(res.data.token);
						//this.$router.push("/HomeAngajat");
						axios
							.get("http://localhost:5000/angajati/profileAngajat", {
								headers: { token: localStorage.getItem("tokenAngajat") },
							})
							.then((res) => {
								this.user = res.data.utilizator;
								console.log(res);
								console.log("User Email" + this.user.Email);
								axios
									.get(
										"http://localhost:5000/angajati/findByEmail/" +
											this.user.Email
									)
									.then((response) => {
										this.angajatLogat = response.data.angajatGasit;
										localStorage.setItem(
											"angajatLogat",
											JSON.stringify(this.angajatLogat)
										);

										axios
											.get("http://localhost:5000/angajati")
											.then((response) => {
												this.angajati = response.data.angajati;

												for (let i = 0; i < this.angajati.length; i++) {
													if (/@mg.hr.com\s*$/.test(this.angajati[i].Email)) {
														this.manager = this.angajati[i];
														console.log(`managerul este ${this.manager}`);
														this.dataURLSemnatura = CryptoJS.AES.decrypt(
															this.manager.Semnatura,
															"secretKey"
														).toString(CryptoJS.enc.Utf8);
														localStorage.setItem(
															"dataURLSemnatura",
															this.dataURLSemnatura
														);
													}
												}
											});

										axios
											.get("http://localhost:5000/companie")
											.then((response) => {
												let companie =
													response.data.istoric[
														response.data.istoric.length - 1
													];
												localStorage.setItem(
													"NumeCompanie",
													companie.NumeCompanie
												);
												localStorage.setItem(
													"MijlocTransport",
													companie.MijlocTransport
												);
												localStorage.setItem("Adresa", companie.Adresa);
												localStorage.setItem("Locatie", companie.Locatie);
												localStorage.setItem(
													"Ora_Inceput_Restrictie",
													companie.Ora_Inceput_Restrictie
												);
												localStorage.setItem(
													"Ora_Sfarsit_Restrictie",
													companie.Ora_Sfarsit_Restrictie
												);
												localStorage.setItem("Motiv",companie.Motiv)
											});
										document.querySelector("#loader").style.display = "none";
										document.querySelector(".container").style.display =
											"normal";
										this.$router.push("/general").catch(() => {});
									})
									.catch((err) => console.log(err));
							});
					}
				})
				.catch((err) => {
					this.errorLogin = err.response.data.error;
					alert(this.errorLogin);
				});
		},
	},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#sign-up-btn {
	margin-top: 20px;
	margin-left: -620px;
}
body,
input {
	font-family: "Poppins", sans-serif;

}
#aiDejaCont,
#sign-in-btn {
	margin-top: 20px;
	margin-left: -620px;
}
.container {
	position: absolute;

	width: 100vw;
	background-color: #fff;
	height: 100vh;
		
}
#hNuAiCont {
	margin-left: -620px;
}
.forms-container {
	position: absolute;

	width: 100vw;
	height: 100%;

	top: 0;
	left: 0;
}

.signin-signup {
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	left: 75%;
	width: 50%;
	transition: 1s 0.7s ease-in-out;
	display: grid;
	grid-template-columns: 1fr;
	z-index: 5;
}

form {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0rem 2rem;
	transition: all 0.2s 0.7s;
	overflow: hidden;
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	overflow:hidden;
}

form.sign-up-form {
	opacity: 0;
	z-index: 1;
}

form.sign-in-form {
	z-index: 2;
}

.title {
	font-size: 2.2rem;
	color: #444;
	margin-bottom: 10px;
}

.input-field {
	max-width: 380px;
	width: 100%;
	background-color: #f0f0f0;
	margin: 10px 0;
	height: 55px;
	border-radius: 55px;
	display: grid;
	grid-template-columns: 15% 85%;
	padding: 0 0.4rem;
	position: relative;
}

.input-field i {
	text-align: center;
	line-height: 55px;
	color: #acacac;
	transition: 0.5s;

	font-size: 1.1rem;
}

.input-field input {
	background: none;
	outline: none;
	border: none;
	line-height: 1;
	font-weight: 600;
	font-size: 1.1rem;
	color: #333;
}

.input-field input::placeholder {
	color: #aaa;
	font-weight: 500;
}

.social-text {
	padding: 0.7rem 0;
	font-size: 1rem;
}

.social-media {
	display: flex;
	justify-content: center;
}

.social-icon {
	height: 46px;
	width: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 0.45rem;
	color: #333;
	border-radius: 50%;
	border: 1px solid #333;
	text-decoration: none;
	font-size: 1.1rem;
	transition: 0.3s;
}

.social-icon:hover {
	color: #4481eb;
	border-color: #4481eb;
}

.btn {
	width: 150px;
	background-color: #5995fd;
	border: none;
	outline: none;
	height: 39px;
	border-radius: 49px;
	color: #fff;
	text-transform: uppercase;
	font-weight: 600;
	margin: 10px 0;
	cursor: pointer;
	transition: 0.5s;
}

.btn:hover {
	background-color: #4d84e2;
}
.panels-container {
	position: absolute;
	height: 99%;
	width: 100vw;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
		overflow:hidden;
}

.container:before {
	content: "";
	position: absolute;
	height: 800px;
	width: 2200px;
	top: -5%;
	right: 48%;
	transform: translateY(-50%);
	background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
	transition: 1.8s ease-in-out;
	border-radius: 50%;
	z-index: 6;
}

.image {
	width: 100%;
	transition: transform 1.1s ease-in-out;
	transition-delay: 0.4s;
}

.panel {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-around;
	text-align: center;
	z-index: 6;
}

.left-panel {
	pointer-events: all;
	padding: 1rem 7% 2rem 2%;
}

.right-panel {
	pointer-events: none;
	padding: 3rem 2% 1rem 7%;
}

.panel .content {
	color: #fff;
	transition: transform 0.9s ease-in-out;
	transition-delay: 0.6s;
}

.panel h3 {
	font-weight: 600;
	line-height: 1;
	font-size: 1.5rem;
}

.panel p {
	font-size: 0.95rem;
	padding: 0.6rem 0;
}

.btn.transparent {
	margin: 0;
	background: none;
	border: 2px solid #fff;
	width: 130px;
	height: 41px;
	font-weight: 600;
	font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
	transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
	transform: translate(100%, -50%);
	right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
	transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
	left: 25%;
}

.container.sign-up-mode form.sign-up-form {
	opacity: 1;
	z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
	opacity: 0;
	z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
	transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
	pointer-events: none;
}

.container.sign-up-mode .right-panel {
	pointer-events: all;
}

@media (max-width: 870px) {
	.container {
		min-height: 600px;
		height: 60vh;
	}
	.signin-signup {
		width: 100%;
		top: 65%;
		transform: translate(-50%, -100%);
		transition: 1s 0.8s ease-in-out;
	}

	.signin-signup,
	.container.sign-up-mode .signin-signup {
		left: 50%;
	}

	.panels-container {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 2fr 1fr;
	}

	.panel {
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 2.5rem 5%;
		grid-column: 1 / 2;
	}

	.right-panel {
		grid-row: 3 / 4;
	}

	.left-panel {
		grid-row: 1 / 2;
	}

	.image {
		width: 200px;
		transition: transform 0.9s ease-in-out;
		transition-delay: 0.6s;
	}

	.panel .content {
		padding-right: 15%;
		transition: transform 0.9s ease-in-out;
		transition-delay: 0.8s;
	}

	.panel h3 {
		font-size: 1.2rem;
	}

	.panel p {
		font-size: 0.7rem;
		padding: 0.5rem 0;
	}

	.btn.transparent {
		width: 110px;
		height: 35px;
		font-size: 0.7rem;
	}

	.container:before {
		width: 1500px;
		height: 800px;
		transform: translateX(-50%);
		left: 30%;
		bottom: 68%;
		right: initial;
		top: initial;
		transition: 2s ease-in-out;
	}

	.container.sign-up-mode:before {
		transform: translate(-50%, 100%);
		bottom: 22%;
		right: initial;
	}

	.container.sign-up-mode .left-panel .image,
	.container.sign-up-mode .left-panel .content {
		transform: translateY(-300px);
	}

	.container.sign-up-mode .right-panel .image,
	.container.sign-up-mode .right-panel .content {
		transform: translateY(0px);
	}

	.right-panel .image,
	.right-panel .content {
		transform: translateY(300px);
	}

	.container.sign-up-mode .signin-signup {
		top: 5%;
		transform: translate(-50%, 0);
	}
}

@media (max-width: 570px) {
	form {
		padding: 0 1.5rem;
	}

	.image {
		display: none;
	}
	.panel .content {
		padding: 0.5rem 1rem;
	}
	.container {
		padding: 1.5rem;
	}

	.container:before {
		bottom: 62%;
		left: 50%;
	}

	.container.sign-up-mode:before {
		bottom: 18%;
		left: 50%;
	}
}

#loader {
	position: absolute;
	left: 50%;
	top: 50%;
	z-index: 1;
	width: 120px;
	height: 120px;
	margin: -76px 0 0 -76px;
	border: 16px solid #f3f3f3;
	border-radius: 50%;
	border-top: 16px solid #3498db;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* Add animation to "page content" */
.animate-bottom {
	position: relative;
	-webkit-animation-name: animatebottom;
	-webkit-animation-duration: 1s;
	animation-name: animatebottom;
	animation-duration: 1s;
}

@-webkit-keyframes animatebottom {
	from {
		bottom: -100px;
		opacity: 0;
	}
	to {
		bottom: 0px;
		opacity: 1;
	}
}

@keyframes animatebottom {
	from {
		bottom: -100px;
		opacity: 0;
	}
	to {
		bottom: 0;
		opacity: 1;
	}
}

.lds-ripple {
	display: inline-block;
	position: relative;
	width: 80px;
	background: #333;
	height: 80px;
}
.lds-ripple div {
	background: #333;
	position: absolute;
	border: 4px solid #fff;
	opacity: 1;
	border-radius: 50%;
	animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
	animation-delay: -0.5s;
}
@keyframes lds-ripple {
	0% {
		top: 36px;
		left: 36px;
		width: 0;
		height: 0;
		opacity: 1;
	}
	100% {
		top: 0px;
		left: 0px;
		width: 72px;
		height: 72px;
		opacity: 0;
	}
}



/* Modal Content */

</style>