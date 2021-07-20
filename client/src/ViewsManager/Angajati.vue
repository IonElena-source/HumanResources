<template>
	<div>
		<div class="modal modalOKR">
			<div class="modal-background modal-backgroundOKR"></div>
			<div class="modal-content modal-contentOKR">
				<button @click="displayObiective" class="button is-info is-light">
					Obiective
				</button>
				<button @click="displayFormObiectiv" class="button is-info is-light">
					Adauga Obiectiv
				</button>
				<div v-if="arataObiective">
					<div id="mount-point">
						<ul id="listaObiective">
							<li v-for="(obiectiv, index) in obiectiveAngajat" :key="index">
								{{ obiectiv.Nume }} -- {{ obiectiv.Medie }} %
							</li>
						</ul>
					</div>
				</div>
				<div v-if="addObiectiv">
					<h2 id="titluObiectiv">OBIECTIV</h2>
					<img src="../assets/target.png" id="imgObiectiv" />
					<div><input id="inputObiectiv" class="input is-info" /></div>
					<img src="../assets/date.png" id="imgDate" />
					<h2 id="dataTinta">TERMEN</h2>
					<input type="month" id="inputData" class="input is-info" />
					<img src="../assets/keyOKR.png" id="imgKey" />
					<h2 id="titluRezultateCheie">REZULTATE</h2>

					<button
						class="button is-info is-ligth"
						id="btnAdaugaRezultat"
						@click="adaugaRezultat"
					>
						<i class="fas fa-plus-circle" style="font-size: 22px"></i>
					</button>
					<hr />
					<table id="tableRezultate"></table>
					<button id="btnSalveaza" @click="salveazaObiectiv">Salveaza</button>
				</div>
			</div>
			<button
				class="modal-close is-large"
				aria-label="close"
				@click="inchideOKR"
			></button>
		</div>
		<!-- The Modal -->
		<div class="modal modalANG">
			<div class="modal-background modal-backgroundANG"></div>
			<div class="modal-content modal-contentANG">
				<label id="turaInceput">Tura Inceput - </label>
				<label id="inputTuraInceput">08:00</label
				><label id="turaSfarsit">Tura Sfarsit - </label>
				<label id="inputTuraSfarsit">08:00</label>
				<label id="norma">Norma : </label>
				<label id="inputNorma">8 ore</label>
				<label id="dataAngajare">Data Angajare</label>
				<label id="inputDataAngajare">12/08/2020</label>
				<label id="dataSalariu">Data Salariu</label>
				<label id="inputDataSalariu">12/08/2020</label>
			</div>
			<button
				class="modal-close is-large"
				aria-label="close"
				@click="inchideModal"
			></button>
		</div>
		<button
			@click="displayForm"
			:class="
				afiseazaForm == true
					? 'button is-info is-light is-active'
					: 'button is-info is-light'
			"
		>
			Adauga angajat
		</button>
		<button
			@click="displayAngajati"
			:class="
				afiseazaAngajati == true
					? 'button is-info is-light is-active'
					: 'button is-info is-light'
			"
		>
			Vezi angajati
		</button>
		<form-wizard
			@on-complete="salveaza"
			nextButtonText="Urmator"
			backButtonText="Anterior"
			finishButtonText="Salveaza"
			v-if="afiseazaForm"
			color="rgb(144, 180, 252)"
			id="formWizard"
			title=""
			subtitle=""
		>
			<tab-content
				title="Angajat"
				id="tabAngajat"
				:before-change="beforeTabSwitch"
			>
				<label id="labelNume" for="inputNume">Nume</label>
				<input type="text" id="inputNume" />
				<label id="labelPrenume" for="inputPrenume">Prenume</label>
				<input type="text" id="inputPrenume" />
				<label id="labelEmail" for="inputEmail">Email</label>
				<input type="text" id="inputEmail" />
				<label id="labelCNP" for="inputCNP">CNP</label>
				<input type="text" id="inputCNP" />
				<label id="labelTelefon" for="inputTelefon">Telefon</label>
				<input type="text" id="inputTelefon" />

				<label id="labelDataNastere" for="inputDataNastere">Data Nastere</label>
				<input type="date" id="inputDataNastere" />
				<label id="labelFunctie" for="inputFunctie">Functie</label>
				<input type="text" id="inputFunctie" />
				<label id="labelSalariu" for="inputSalariu">Salariu</label>
				<input type="number" id="inputSalariu" min="1350" />
				<label id="labelAdresa" for="inputAdresa">Adresa</label>
				<textarea id="inputAdresa"></textarea>
			</tab-content>
			<tab-content title="Contract" :before-change="beforeTabSwitchContract">
				<label id="labelTuraInceput" for="inputTuraInceput">Tura Inceput</label>
				<input type="time" id="inputTuraInceput" />
				<label id="labelTuraSfarsit" for="inputTuraSfarsit">Tura Sfarsit</label>
				<input type="time" id="inputTuraSfarsit" />
				<label id="labelNorma" for="inputNorma">Norma</label>
				<input type="number" id="inputNorma" />
				<label id="labelDataAngajare" for="inputDataAngajare"
					>Data Angajare</label
				>
				<input type="date" id="inputDataAngajare" />
				<label id="labelDataSalariu" for="inputDataSalariu">Data Salariu</label>
				<input type="date" id="inputDataSalariu" />
			</tab-content>
			<tab-content title="Cont">
				<label id="labelUtilizEmail" for="inputUtilizEmail">Email</label>
				<input type="text" id="inputUtilizEmail" />
				<label id="labelParola" for="inputUtilizEmail">Parola</label>
				<input type="password" id="inputUtilizParola" />
				<div class="field">
					<div class="file is-boxed is-primary is-light">
						<label class="file-label">
							<input
								type="file"
								ref="file"
								accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
								@change="selectFile"
								class="file-input"
							/>

							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label"> Incarca CV </span>
							</span>
							<span v-if="file" class="file-name">{{ file.name }}</span>
						</label>
					</div>
				</div>
			</tab-content>
		</form-wizard>
		<div class="container" v-if="afiseazaAngajati">
			<div class="card" v-for="(angajat, index) in angajati" :key="index">
				<div class="card_img">
					<img
						:src="require(`../profiles/${angajat.Poza_Profil}`)"
						alt=""
						id="imgAngajat"
					/>
					<h2 id="titluNumeAngajat">
						{{ angajat.Nume }} {{ angajat.Prenume }}
					</h2>
					<h2 id="angajatFunctie">{{ angajat.Functie }}</h2>
					<h2 id="emailAngajat">{{ angajat.Email }}</h2>
				</div>
				<div class="card_content">
					<h2 id="titluSalariu" style="visibility: hidden">Salariu</h2>
					<h2 id="salariuAngajat" style="visibility: hidden">
						{{ angajat.Salariu_Incadrare }} RON
					</h2>
					<h2 id="titluCnp">Telefon</h2>
					<h2 id="cnpAngajat">{{ angajat.Telefon }}</h2>
					<h2 id="titluAdresa">Adresa</h2>
					<h2 id="angajatAdresa">{{ angajat.Adresa }}</h2>
					<i
						class="fas fa-info-circle iconInfo"
						@click="afiseazaInfoAngajat(angajat)"
					></i>
					<button
						class="button is-info is-light"
						id="btnOKR"
						@click="deschideOKR(angajat)"
					>
						OKR
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import axios from "axios";
export default {
	name: "Angajati",
	components: {
		FormWizard,
		TabContent,
	},

	data() {
		return {
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),

			publicPath: process.env.BASE_URL,
			angajati: [],
			afiseazaAngajati: false,
			afiseazaForm: true,
			angajat: {},
			file: "",
			obiectiveAngajat: [],
			tipRezultat: "",
			angajatSelectat: {},
			addObiectiv: false,
			arataObiective: true,
		};
	},
	computed: {},
	watch: {},
	methods: {
		displayObiective() {
			this.addObiectiv = false;
			this.obiectiveAngajat=[]
			

			axios
				.get("http://localhost:5000/obiective/" + this.angajatSelectat._id)
				.then((response) => {
					let obiective = response.data.obiective;
					for (let i = 0; i < obiective.length; i++) {
						let rezultate = obiective[i].Rezultate;
						let suma = 0;
						for (let j = 0; j < rezultate.length; j++) {
							suma += parseInt(rezultate[j].Scor);
						}
						var medie = Math.round(suma / rezultate.length);
						let obiectiv = obiective[i];
						obiectiv.Medie = medie;
						this.obiectiveAngajat.push(obiectiv);
					}
				});

			this.arataObiective = true;
		},
		salveazaObiectiv() {
			let denumireObiectiv = document.getElementById("inputObiectiv").value;
			let data = document.getElementById("inputData").value;
			let rezultate = [];

			let tableRezultate = document.getElementById("tableRezultate");
			let trChildren = tableRezultate.children;
			for (let i = 0; i < trChildren.length; i++) {
				console.log(trChildren[i].children);
				let numeRezultat = trChildren[i].children[1].children[0].value;
				let rezultat = {
					Scor: 0,
					Denumire: numeRezultat,
				};
				rezultate.push(rezultat);
			}
			let obiectiv = {
				Id_Angajat: this.angajatSelectat._id,
				Nume: denumireObiectiv,
				Data: data,
				Rezultate: rezultate,
			};
			axios.post("http://localhost:5000/obiective", obiectiv).then(() => {
				alert("Obiectiv adaugat");
				document.getElementById("inputObiectiv").value = "";
				document.getElementById("inputData").value = "";
				let tableRezultate = document.getElementById("tableRezultate");
				let trChildren = tableRezultate.children;
				for (let i = 0; i < trChildren.length; i++) {
					trChildren[i].children[1].children[0].remove();
				}
				document
					.getElementsByClassName("modalOKR")[0]
					.classList.remove("is-active");
			});
		},
		displayFormObiectiv() {
			this.addObiectiv = true;
			this.arataObiective = false;
		},
		displayForm() {
			this.afiseazaAngajati = false;
			this.afiseazaForm = true;
		},
		adaugaRezultat() {
			let tabelRezultate = document.getElementById("tableRezultate");
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			td1.classList.add("iconCircle");
			td1.style.marginTop = "30px";
			td1.style.color = "rgb(134, 202, 251)";
			td1.style.fontSize = "20px";
			td1.style.width = "20px";
			td1.style.padding = "15px";
			let i = document.createElement("i");
			i.classList.add("far");
			i.classList.add("fa-circle");

			let td2 = document.createElement("td");
			td2.style.padding = "15px";
			let inputRezultat = document.createElement("input");
			inputRezultat.classList.add("input");
			inputRezultat.classList.add("is-info");
			inputRezultat.classList.add("inputRezultat");
			inputRezultat.style.width = "540px";
			inputRezultat.style.position = "absolute";
			td2.appendChild(inputRezultat);
			td1.appendChild(i);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tabelRezultate.appendChild(tr);
		},
		inchideOKR() {
			document
				.getElementsByClassName("modalOKR")[0]
				.classList.remove("is-active");
		},
		deschideOKR(angajat) {
			this.angajatSelectat = angajat;
			this.obiectiveAngajat=[]
			axios
				.get("http://localhost:5000/obiective/" + this.angajatSelectat._id)
				.then((response) => {
					let obiective = response.data.obiective;
					for (let i = 0; i < obiective.length; i++) {
						let obiectiv = obiective[i];
						let rezultate = obiective[i].Rezultate;
						let suma = 0;
						for (let j = 0; j < rezultate.length; j++) {
							suma += parseInt(rezultate[j].Scor);
						}

						var medie = Math.round(suma / rezultate.length);

						obiectiv.Medie = medie;
						this.obiectiveAngajat.push(obiectiv);
					}
				});
			document.getElementsByClassName("modalOKR")[0].classList.add("is-active");
		},
		inchideModal() {
			document
				.getElementsByClassName("modalANG")[0]
				.classList.remove("is-active");
		},
		afiseazaInfoAngajat(angajat) {
			console.log(angajat);
			axios
				.get("http://localhost:5000/angajati/contracte/" + angajat._id)
				.then((respose) => {
					console.log("Contract");
					var contract = respose.data.contractGasit;

					console.log(contract.Tura_Inceput);
					// document.getElementById("inputTuraInceput").innerHTML =
					// 	contract.Tura_Inceput;

					document
						.getElementsByClassName("modalANG")[0]
						.classList.add("is-active");
				})
				.catch((err) => console.log(err));
		},
		salveaza() {
			alert("da");
			const formData = new FormData();

			formData.append("file", this.file);

			try {
				axios
					.patch(`http://localhost:5000/angajati/${this.angajat._id}`, formData)
					.then(() => {
						let email = this.angajat.Email;
						let parola = "9963";
						let utilizator = {
							Email: email,
							Parola: parola,
						};
						axios
							.post("http://localhost:5000/angajati/register", utilizator)
							.then(() => {
								alert("daa");
							});
					});
			} catch (err) {
				console.log(err);
			}
		},
		selectFile() {
			this.file = this.$refs.file.files[0];
		},
		beforeTabSwitch() {
			let nume = document.getElementById("inputNume").value;
			if (nume == null || nume == "") {
				alert("Introduceti numele angajatului");
				return false;
			}

			let prenume = document.getElementById("inputPrenume").value;
			if (prenume == null || prenume == "") {
				alert("Introduceti prenumele angajatului");
				return false;
			}
			let email = document.getElementById("inputEmail").value;
			if (email == null || email == "") {
				alert("Introduceti email-ul angajatului");
				return false;
			}
			let cnp = document.getElementById("inputCNP").value;
			if (cnp == null || cnp == "") {
				alert("Introduceti cnp-ul angajatului");
				return false;
			}
			let telefon = document.getElementById("inputTelefon").value;
			if (telefon == null || telefon == "") {
				alert("Introduceti telefon-ul angajatului");
				return false;
			}
			let dataNastere = document.getElementById("inputDataNastere").value;
			if (dataNastere == null || dataNastere == "") {
				alert("Introduceti data de nastere a angajatului");
				return false;
			}
			let functie = document.getElementById("inputFunctie").value;
			if (functie == null || functie == "") {
				alert("Introduceti functia pe care o va ocupa angajatul");
				return false;
			}
			let salariu = document.getElementById("inputSalariu").value;
			if (salariu == null || salariu == "") {
				alert("Introduceti salariul pe care il va avea angajatul");
				return false;
			}
			let adresa = document.getElementById("inputAdresa").value;
			if (adresa == null || adresa == "") {
				alert("Introduceti adresa angajatului");
				return false;
			}

			this.angajat = {
				Nume: nume,
				Prenume: prenume,
				Adresa: adresa,
				Telefon: telefon,
				Sex: "M",
				CNP: cnp,
				Data_Nastere: dataNastere,
				Email: email,
				Functie: functie,
				Departament: "HR",
				Salariu_Incadrare: salariu,
				Poza_Profil: "",
				Semnatura: "",
			};

			axios
				.post("http://localhost:5000/angajati", this.angajat)
				.then((response) => {
					this.angajat = response.data.angajatInserat;
				});

			return true;
		},
		adaugaAngajat() {
			this.$router.push("/adaugaAngajat");
		},
		test() {
			console.log(this.angajati);
		},
		displayAngajati() {
			this.afiseazaAngajati = true;
			this.afiseazaForm = false;
		},

		beforeTabSwitchContract() {
			document.getElementById("inputUtilizEmail").value = this.angajat.Email;
			let norma = document.getElementById("inputNorma").value;
			let turaInceput = document.getElementById("inputTuraInceput").value;
			let turaSfarsit = document.getElementById("inputTuraSfarsit").value;
			let dataAngajare = document.getElementById("inputDataAngajare").value;
			let dataSalariu = document.getElementById("inputDataSalariu").value;
			let contract = {
				Id_Angajat: this.angajat._id,
				Norma: norma,
				Tura_Inceput: turaInceput,
				Tura_Sfarsit: turaSfarsit,
				Data_Salariu: dataSalariu,
				Data_Angajare: dataAngajare,
				Cod_Angajat_Acces: "",
			};
			axios
				.post("http://localhost:5000/angajati/contracte", contract)
				.then(() => {});
			return true;
		},
	},
	mounted() {
		axios.get("http://localhost:5000/angajati").then((response) => {
			this.angajati = response.data.angajati;
		});
	},
};
</script>
<style scoped>
#divInputExcel {
	margin-top: 50px;
	width: 180px;
	margin-left: 50px;
	height: 50px;
}
#inputExcel {
	width: 120px;
	height: 50px;
}
#imgAngajat {
	width: 120px;
	height: 130px;
}
.container {
	margin: 5em;
	display: grid;
	grid-template-columns: 350px 350px 350px;
	grid-gap: 5em;
}
.container .card {
	position: relative;
	border: 1px solid rgb(220, 213, 213);
	overflow: hidden;
}
.container .card_img {
	position: relative;
	z-index: 10;
	transition: all 400ms ease-out;
	right: 0;
	background-color: #e0e0e0;
	height: 500px;
}
.container .card_img img {
	height: 100%;
	object-fit: cover;
	filter: grayscale(0);
	opacity: 1;
	transition: all 400ms ease-out;
}
.container .card_content {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(255, 255, 255, 0.85);
	text-align: left;
	padding: 2em 2em 2em 4.5em;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.container .card_content .more {
	display: block;
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: #c1d8fd;
	color: #b5eef9;
	text-transform: uppercase;
	padding: 0.5em 1em;
	font-weight: 100;
	font-size: 0.75rem;
}
.container img {
	max-width: 100%;
	display: block;
}

h1,
h3,
h4,
p,
.more {
	font-family: "Montserrat", sans-serif;
	color: gray;
	margin: 0;
	padding: 0;
}

h3 {
	font-size: 1.5rem;
	margin-top: 1rem;
}

h4 {
	font-size: 0.8rem;
	text-transform: uppercase;
	font-weight: normal;
	margin-bottom: 1rem;
}

p {
	line-height: 1.6rem;
	font-weight: 100;
	font-size: 0.9rem;
	margin-bottom: 0.8rem;
}

.card:hover .card_img {
	right: 90%;
	cursor: pointer;
}
.card:hover .card_img img {
	filter: grayscale(1);
	box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3);
	opacity: 0.2;
}
.card {
	height: 180px;
}
.card_img {
}
#titluNumeAngajat {
	margin-top: -80px;
	margin-left: 120px;
	font-size: 22px;
	font-family: Arial, Helvetica, sans-serif;
}
#angajatFunctie {
	font-size: 19px;
	margin-left: 120px;
	font-style: italic;
}
#emailAngajat {
	margin-top: 30px;
	font-size: 18px;
	font-style: italic;
}

#salariuAngajat {
	margin-top: -28px;
	margin-left: 120px;
}
#titluSalariu {
	margin-top: -70px;
	font-size: 18px;
	font-style: bold;
	font-family: monospace;
	font-weight: 200;
	font-synthesis: weight;
}
#salariuAngajat {
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 19px;
}
#titluCnp {
	font-style: bold;
	font-family: monospace;
	font-size: 18px;
	font-weight: 200;
	font-synthesis: weight;
	margin-top: 10px;
}
#cnpAngajat {
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 19px;
	margin-top: -28px;
	margin-left: 120px;
}
#titluAdresaAngajat {
	font-style: bold;
	font-family: monospace;
	font-size: 18px;
	font-weight: 200;
	font-synthesis: weight;
	margin-top: 10px;
	margin-left: 70px;
}
#angajatAdresaAngajat {
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 19px;
}
.modalAngajat {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-contentAngajat {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

/* The Close Button */
.closeAngajat {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeAngajat:hover,
.closeAngajat:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
/* Create two equal columns that floats next to each other */
.column {
	float: left;
	width: 50%;
	padding: 10px;
	background-color: rgb(226, 233, 255);
	height: 600px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}
.row {
	margin-top: 50px;
	width: 85%;
	margin-left: 120px;
	background-color: wheat;
}
#form1 {
	border-right: 1px solid black;
}

.rowNumeSiPrenume,
.rowEmailSiTelefon,
.rowDataNastere,
.rowDepartamentSiFunctie,
.rowSalariuSiCnp,
.rowAdresa {
	background: transparent;

	margin-top: 30px;
	overflow: hidden;
	padding: 10px;
}
.col {
	float: left;
	font-size: 18px;
	font-family: sans-serif;
	width: 50%;
}
.rowDataNastere {
	background: transparent;

	margin-top: 30px;
	overflow: hidden;
	padding: 10px;
	margin-left: 160px;
	width: 450px;
	font-size: 22px;
}

.colPrenume {
}
* {
	box-sizing: border-box;
}

body {
	background-color: #f1f1f1;
}

#regForm {
	background-color: #ffffff;
	margin: 100px auto;
	font-family: Raleway;
	padding: 40px;
	width: 70%;
	min-width: 300px;
}

h1 {
	text-align: center;
}

input {
	padding: 10px;
	width: 100%;
	font-size: 17px;
	font-family: Raleway;
	border: 1px solid #aaaaaa;
}

/* Mark input boxes that gets an error on validation: */
input.invalid {
	background-color: #ffdddd;
}

/* Hide all steps by default: */
.tab {
	display: none;
}

button {
	background-color: #04aa6d;
	color: #ffffff;
	border: none;
	padding: 10px 20px;
	font-size: 17px;
	font-family: Raleway;
	cursor: pointer;
}

button:hover {
	opacity: 0.8;
}

#prevBtn {
	background-color: #bbbbbb;
}

/* Make circles that indicate the steps of the form: */
.step {
	height: 15px;
	width: 15px;
	margin: 0 2px;
	background-color: #bbbbbb;
	border: none;
	border-radius: 50%;
	display: inline-block;
	opacity: 0.5;
}

.step.active {
	opacity: 1;
}

/* Mark the steps that are finished and valid: */
.step.finish {
	background-color: #04aa6d;
}
#formWizard {
	margin-left: 120px;
	margin-top: 20px;
}
#inputNume {
	width: 250px;
}
#labelNume,
#labelTuraInceput {
	position: absolute;
	margin-top: 120px;

	margin-left: -650px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#inputNume,
#inputTuraInceput {
	position: absolute;
	margin-top: 120px;
	width: 250px;
	margin-left: -580px;
}
#tabAngajat {
	background-color: wheat;
}
#inputPrenume {
	position: absolute;
	width: 250px;
	margin-top: 120px;
	margin-left: -160px;
}
#labelPrenume {
	position: absolute;
	margin-top: 120px;
	margin-left: -270px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#labelEmail {
	position: absolute;
	margin-left: 160px;
	margin-top: 120px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#inputEmail {
	position: absolute;
	width: 240px;
	margin-left: 240px;
	margin-top: 120px;
}
#labelCNP {
	position: absolute;
	margin-top: 210px;
	margin-left: -650px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#inputCNP {
	position: absolute;
	width: 255px;
	margin-top: 210px;
	margin-left: -580px;
}
#labelTelefon {
	position: absolute;
	margin-top: 201px;
	margin-left: -260px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#inputTelefon {
	position: absolute;
	width: 255px;
	margin-top: 210px;
	margin-left: -157px;
}
#labelDataNastere {
	position: absolute;
	margin-top: 300px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-left: 147px;
}
#inputDataNastere {
	position: absolute;
	width: 255px;
	margin-top: 300px;
	margin-left: 287px;
}
#labelFunctie {
	position: absolute;
	margin-top: 300px;
	font-size: 24px;
	margin-left: -677px;
}
#inputFunctie {
	position: absolute;
	width: 255px;
	margin-top: 300px;
	margin-left: -577px;
}
#labelSalariu {
	position: absolute;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-left: -257px;
	margin-top: 300px;
	font-style: bold;
	font-size: 24px;
}
#inputSalariu {
	position: absolute;
	width: 255px;
	margin-top: 300px;
	margin-left: -157px;
}
#labelAdresa {
	position: absolute;
	margin-top: 370px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	font-size: 24px;
	margin-left: -670px;
	color: black;
}
#inputAdresa {
	position: absolute;
	margin-top: 380px;
	margin-left: -580px;
	width: 290px;
	height: 130px;
}
#labelTuraInceput {
	position: absolute;
	margin-left: -720px;
}
#labelTuraSfarsit {
	position: absolute;
	margin-top: 120px;
	margin-left: -270px;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#inputTuraSfarsit {
	position: absolute;
	width: 250px;
	margin-top: 120px;
	margin-left: -140px;
}
#labelNorma {
	position: absolute;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-top: 120px;
	margin-left: 180px;
}
#inputNorma {
	position: absolute;
	width: 290px;
	margin-top: 120px;
	margin-left: 280px;
}
#labelDataAngajare {
	position: absolute;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-top: 230px;
	margin-left: -720px;
}
#inputDataAngajare {
	position: absolute;
	width: 290px;
	margin-top: 230px;
	margin-left: -560px;
}
#labelDataSalariu {
	position: absolute;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-top: 230px;
	margin-left: -220px;
}
#inputDataSalariu {
	position: absolute;
	width: 290px;
	margin-top: 230px;
	margin-left: -70px;
}
#labelUtilizEmail {
	position: absolute;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-top: 130px;
	margin-left: -320px;
}
#inputUtilizEmail {
	position: absolute;
	width: 290px;
	margin-top: 130px;
	margin-left: -210px;
}
#labelParola {
	position: absolute;
	font-size: 24px;
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	margin-top: 230px;
	margin-left: -320px;
}
#inputUtilizParola {
	position: absolute;
	width: 290px;
	margin-top: 230px;
	margin-left: -210px;
}
.iconInfo {
	position: absolute;
	margin-top: 130px;
	font-size: 28px;
	cursor: pointer;
	color: rgb(130, 129, 133);
}
.modal-contentANG {
	background-color: white;
	height: 40vh;
	overflow: hidden;
}
#modalTuraInceput {
	position: absolute;
	margin-left: -120px;
	font-size: 22px;
}
#btnOKR {
	position: absolute;
	margin-top: 130px;
	margin-left: 70px;
	width: 80px;
	color: rgb(88, 66, 66);
}
.modal-contentOKR {
	height: 700px;
	background: white;
	margin-top: -50px;
}
#titluObiectiv {
	position: absolute;
	margin-top: 20px;
	font-size: 23px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	margin-left: 50px;
}
#imgObiectiv {
	position: absolute;
	margin-top: 20px;
	font-size: 23px;
	margin-left: -310px;
}
#inputObiectiv {
	margin-top: 60px;
	width: 620px;
}
#imgKey {
	position: absolute;
	margin-top: 100px;
	margin-left: -120px;
}
#dataTinta {
	font-size: 23px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	position: absolute;
	margin-top: 20px;
	margin-left: 50px;
}
#imgDate {
	position: absolute;
	margin-top: 20px;
	margin-left: -310px;
}
#inputData {
	position: absolute;
	margin-top: 20px;
	margin-left: -110px;
	width: 190px;
}
#titluRezultateCheie {
	margin-top: 105px;
	font-size: 22px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	margin-left: -10px;
}
#divSelect {
	position: absolute;
	margin-top: -35px;
	margin-left: -110px;
}
#btnAdaugaRezultat {
	position: absolute;
	width: 100px;
	margin-top: -40px;
	margin-left: 120px;
}
.iconCircle {
	margin-top: 30px;
	color: rgb(134, 202, 251);
	font-size: 20px;
	width: 20px;
}

.inputRezultat {
	width: 540px;
	position: absolute;
}
table,
td,
th {
	text-align: left;
}

table {
	border-collapse: collapse;
	width: 100%;
}

th,
td {
	padding: 15px;
}
#btnSalveaza {
	margin-top: 20px;
}
#mount-point {
	padding: 60px;
	max-width: 800px;
	margin: auto;
}
#mount-point input {
	line-height: 2;
	font-size: 18px;
	height: auto;
	padding-left: 20px;
}
#mount-point ul {
	margin: 0;
}
#mount-point ul li {
	list-style: none;
	border: 1px solid #ccc;
	margin-top: -1px;
	line-height: 2;
	padding: 5px 20px;
	background: white;
}
#turaInceput {
	position: absolute;
	font-size: 20px;
	margin-top: 50px;
	margin-left: -250px;
}
#inputTuraInceput {
	position: absolute;
	margin-top: 50px;
	margin-left: -215px;
	font-size: 20px;
}
#turaSfarsit {
	position: absolute;
	margin-top: 50px;
	font-size: 20px;
	margin-left: 30px;
}
#inputTuraSfarsit {
	font-size: 20px;
	position: absolute;
	margin-top: 50px;
	margin-left: 70px;
}
#norma {
	position: absolute;
	font-size: 20px;
	margin-top: 120px;
	margin-left: -80px;
}
#inputNorma {
	position: absolute;
	font-size: 20px;
	margin-left: -120px;
}
#dataAngajare {
	position: absolute;
	font-size: 20px;
	margin-top: 200px;
	margin-left: -250px;
}
#inputDataAngajare {
	position: absolute;
	font-size: 20px;
	margin-top: 200px;
	margin-left: -210px;
}
#dataSalariu {
	position: absolute;
	font-size: 20px;
	margin-top: 200px;
	margin-left: 40px;
}
#inputDataSalariu {
	position: absolute;
	font-size: 20px;
	margin-top: 200px;
	overflow: hidden;
	margin-left: 60px;
}
</style>