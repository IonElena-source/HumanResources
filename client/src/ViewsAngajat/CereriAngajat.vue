<template>
	<div style="position: static">
		<h1></h1>

		<div>
			<div class="add">
				<div id="divFilter">
					<label>
						<input
							type="radio"
							class="option-input radio"
							name="example"
							value="Toate"
							v-model="statusSelectat"
							v-on:change="filtreaza"
						/>
						Toate
					</label>
					<label>
						<input
							type="radio"
							class="option-input radio"
							name="example"
							checked
							value="In asteptare"
							v-on:change="filtreaza"
							v-model="statusSelectat"
						/>
						In asteptare
					</label>
					<label>
						<input
							type="radio"
							class="option-input radio"
							name="example"
							value="Aprobata"
							v-model="statusSelectat"
							v-on:change="filtreaza"
						/>
						Aprobata
					</label>
					<label>
						<input
							type="radio"
							class="option-input radio"
							name="example"
							value="Respinsa"
							v-model="statusSelectat"
							v-on:change="filtreaza"
						/>
						Respinsa
					</label>
				</div>
				<div class="select is-info" id="divSelectAddRequest">
					<select id="addTypeRequest" v-model="tipCerereSelectat">
						Selecteaza
						<option disabled selected>Alege tipul cererii</option>
						<option v-for="(tip, index) in this.tipuriCerere" :key="index">
							{{ tip }}
						</option>
					</select>
				</div>

				<button class="button is-info is-outlined btnAdd" @click="showModal">
					Adauga cerere
				</button>
				<table>
					<tr id="header">
						<th>Tip Cerere</th>
						<th>Data Inceput</th>
						<th>Data Sfarsit</th>
						<th>Status</th>
					</tr>
					<tbody>
						<tr v-for="(cerere, index) in cererileMele" :key="index">
							<td id="trCerere">
								{{ cerere.Tip_Cerere }}
							</td>
							<td id="trCerere">{{ cerere.Data_Inceput }}</td>
							<td id="trCerere">{{ cerere.Data_Sfarsit }}</td>
							<td
								id="trCerere"
								class="notification is-warning is-light"
								v-if="cerere.Status === `In asteptare`"
							>
								{{ cerere.Status }}
							</td>
							<td
								id="trCerere"
								class="notification is-success is-light"
								v-if="cerere.Status === `Aprobata`"
							>
								{{ cerere.Status }}
							</td>
							<td
								id="trCerere"
								class="notification is-danger is-light"
								v-if="cerere.Status === `Respinsa`"
							>
								{{ cerere.Status }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="myModalConcediuMedical" class="modal">
				<!-- Modal content -->

				<div class="modal-content">
					<span class="close" @click="inchideModal">&times;</span>
					<form class="form-style-9">
						<h1 id="title">{{ this.tipCerereSelectat }}</h1>

						<ul id="contentModal">
							<li class="first-field-style">
								<label for="dataInceput" id="labelConcediuMedical"
									>Cauza Concediu*</label
								>

								<div class="select is-info">
									<select id="addTypeRequest" v-model="tipBoalaConcediuMedical">
										Selecteaza
										<option selected>Alege tipul cererii</option>
										<option
											v-for="(tip, index) in this.tipuriBoala"
											:key="index"
										>
											{{ tip }}
										</option>
									</select>
								</div>
							</li>
							<li>
								<label id="labelDataInceputConcediuMedical" for=""
									>Data Inceput*</label
								>
								<input
									type="date"
									id="inputDataInceputConcediuMedical"
									name="field3"
									class="field-style field-split align-left input"
									placeholder="dd/mm/yyyy"
								/>
							</li>
							<li>
								<label id="labelDataSfarsitConcediuMedical" for=""
									>Data Sfarsit*</label
								>
								<input
									type="date"
									id="inputDataSfarsitConcediuMedical"
									name="field3"
									class="field-style field-split align-left input"
									required
									pattern="\d{4}-\d{2}-\d{2}"
								/>
							</li>
							<li>
								<label id="labelMesajConcediuMedical" for="">Mesaj</label>
								<textarea
									name="field5"
									id="MesajConcediuMedical"
									class="field-style input"
									placeholder=""
								></textarea>
							</li>

							<li>
								<button class="button" @click="trimiteCerere">
									Trimite cerere
								</button>
							</li>
						</ul>
					</form>
				</div>
			</div>

			<div id="myModalCerere" class="modal">
				<!-- Modal content -->

				<div class="modal-content">
					<span class="close" @click="inchideModal">&times;</span>
					<form class="form-style-9" id="formCerereNormala">
						<h1 id="titleConcediuNormal">{{ this.tipCerereSelectat }}</h1>

						<ul id="contentModal">
							<li>
								<label id="labelDataInceputCerereNormala" for=""
									>Data Inceput*</label
								>
								<input
									type="date"
									id="inputDataInceputCerereNormala"
									name="field3"
									class="field-style field-split align-left input"
									placeholder="dd/mm/yyyy"
								/>
							</li>
							<li>
								<label id="labalDataSfarsitCerereNormala" for=""
									>Data Sfarsit*</label
								>
								<input
									type="date"
									id="inputDataSfarsitCerereNormala"
									name="field3"
									class="field-style field-split align-left input"
									required
									pattern="\d{4}-\d{2}-\d{2}"
								/>
							</li>
							<li>
								<label id="labelMesajCerereNormala" for="">Mesaj</label>
								<textarea
									name="field5"
									id="MesajCerereNormala"
									class="field-style input"
									placeholder=""
								></textarea>
							</li>

							<li>
								<button class="button" @click="trimiteCerere">
									Trimite cerere
								</button>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "CereriAngajat",
	data() {
		return {
			user: {},
			today: new Date(),
			statusSelectat: "",
			tipuriCerere: [
				"Concediu Odihna",
				"Concediu Medical",
				"Delegatie",
				"Absenta nemotivata",
				"Concediu fara plata",
				"Invoire",
				"Recuperare",
			],
			angajatLogat: JSON.parse(localStorage.getItem("angajatLogat")),
			tipCerereSelectat: "",
			count: localStorage.getItem("test") ? localStorage.getItem("test") : 0,
			contractAngajatLogat: {},
			tipBoalaConcediuMedical: "",
			tipuriBoala: [
				"Boala obisnuita",
				"Accident",
				"Carantina",
				"Maternitate",
				"Risc Maternal",
				"Urgență medico-chirurgicală",
			],
			cereriAngajat: [],
			cererileMele: [],
		};
	},
	watch: {
		cereriAngajat: function () {
			this.cererileMele = this.cereriAngajat;
		},
	},

	methods: {
		filtreaza() {
			console.log(this.statusSelectat);
			if (this.statusSelectat === "Toate") {
				axios
					.get(
						"http://localhost:5000/cereri/regasesteCereri/" +
							this.angajatLogat._id
					)
					.then((response) => {
						this.cereriAngajat = response.data.cereri;
						this.cererileMele = response.data.cereri;
					});
			} else {
				axios
					.get(
						"http://localhost:5000/cereri/filtrareCereri/" +
							this.angajatLogat._id +
							"/" +
							this.statusSelectat
					)
					.then((response) => {
						if (response.data.cereri.length == 0) {
							this.cereriAngajat = [];
							this.cererileMele = [];
						} else {
							this.cereriAngajat = response.data.cereri;
							this.cererileMele = response.data.cereri;
						}
					});
			}
		},
		elibereaza(cerere) {
			console.log(cerere);
		},
		test() {
			console.log(this.cererileMele);
		},
		showUser() {
			console.log(this.user);
		},
		showModal() {
			///sa modific count-ul doar daca cererea a fost inserata cu succes in tabela

			if (this.tipCerereSelectat === "Concediu Medical") {
				document.querySelector("#myModalConcediuMedical").style.display =
					"block";
			} else {
				document.querySelector("#myModalCerere").style.display = "block";
			}

			var ddToday = String(this.today.getDate()).padStart(2, "0");
			var mm = String(this.today.getMonth() + 1).padStart(2, "0");
			var yyyy = this.today.getFullYear();

			let dataAzi = ddToday + "/" + mm + "/" + yyyy;
			console.log(dataAzi);
		},
		inchideModal() {
			document.querySelector("#myModalConcediuMedical").style.display = "none";
			document.querySelector("#myModalCerere").style.display = "none";
		},
		trimiteCerere(e) {
			e.preventDefault();

			
			//let Tip_Cerere=this.tipCerereSelectat;
			if (this.tipCerereSelectat === "Concediu Medical") {
				let cauza_Concediu = this.tipBoalaConcediuMedical;

				let data_Inceput = document.getElementById(
					"inputDataInceputConcediuMedical"
				).value;
				let data_Sfarsit = document.getElementById(
					"inputDataSfarsitConcediuMedical"
				).value;
				let splitDataInceput = data_Inceput.split("-");
				let data_inceput_formatata =
					splitDataInceput[2] +
					"-" +
					splitDataInceput[1] +
					"-" +
					splitDataInceput[0];

				let splitDataSfarsit = data_Sfarsit.split("-");
				let data_sfarsit_formatata =
					splitDataSfarsit[2] +
					"-" +
					splitDataSfarsit[1] +
					"-" +
					splitDataSfarsit[0];

				let mesaj = document.getElementById("MesajConcediuMedical").value;
				var ddToday = String(this.today.getDate()).padStart(2, "0");
				var mm = String(this.today.getMonth() + 1).padStart(2, "0");
				var yyyy = this.today.getFullYear();

				let dataAzi = ddToday + "-" + mm + "-" + yyyy;
				let cerereConcediuMedical = {
					Tip_Cerere: this.tipCerereSelectat,
					Angajat: this.angajatLogat._id,
					Data_Inceput: data_inceput_formatata,
					Data_Sfarsit: data_sfarsit_formatata,
					Data_Trimitere: dataAzi,
					Cauza_Concediu: cauza_Concediu,
					Mesaj: mesaj,
					Status: "In asteptare",
				};
				axios
					.post(
						"http://localhost:5000/cereri/adaugaCerere",
						cerereConcediuMedical
					)
					.then(() => {
						this.inchideModal();
						alert("Cererea a fost inregistrata cu succes");
						document.getElementById("inputDataInceputConcediuMedical").value =
							"";
						document.getElementById("inputDataSfarsitConcediuMedical").value =
							"";
						document.getElementById("MesajConcediuMedical").value = "";

						axios
							.get(
								"http://localhost:5000/cereri/regasesteCereri/" +
									this.angajatLogat._id
							)
							.then((response) => {
								this.cereriAngajat = response.data.cereri;
							});
					})
					.catch((err) => alert(err));
			} else {
				let data_Inceput = document.getElementById(
					"inputDataInceputCerereNormala"
				).value;
				let data_Sfarsit = document.getElementById(
					"inputDataSfarsitCerereNormala"
				).value;
				let splitDataInceput = data_Inceput.split("-");
				let data_inceput_formatata =
					splitDataInceput[2] +
					"-" +
					splitDataInceput[1] +
					"-" +
					splitDataInceput[0];

				let splitDataSfarsit = data_Sfarsit.split("-");
				let data_sfarsit_formatata =
					splitDataSfarsit[2] +
					"-" +
					splitDataSfarsit[1] +
					"-" +
					splitDataSfarsit[0];

				let mesaj = document.getElementById("MesajCerereNormala").value;
				var ddTodayNormal = String(this.today.getDate()).padStart(2, "0");
				var mmNormal = String(this.today.getMonth() + 1).padStart(2, "0");
				var yyyyNormal = this.today.getFullYear();

				let dataAzi = ddTodayNormal + "-" + mmNormal + "-" + yyyyNormal;
				let cerereNormala = {
					Tip_Cerere: this.tipCerereSelectat,
					Angajat: this.angajatLogat._id,
					Data_Inceput: data_inceput_formatata,
					Data_Sfarsit: data_sfarsit_formatata,
					Data_Trimitere: dataAzi,
					Mesaj: mesaj,
					Status: "In asteptare",
				};
				axios
					.post("http://localhost:5000/cereri/adaugaCerere", cerereNormala)
					.then(() => {
						this.inchideModal();
						alert("Cererea a fost inregistrata cu succes");

						document.getElementById("inputDataInceputCerereNormala").value = "";
						document.getElementById("inputDataSfarsitCerereNormala").value = "";
						document.getElementById("MesajCerereNormala").value = "";

						axios
							.get(
								"http://localhost:5000/cereri/regasesteCereri/" +
									this.angajatLogat._id
							)
							.then((response) => {
								this.cereriAngajat = response.data.cereri;
							});
					})
					.catch((err) => alert(err));
			}
		},
	},

	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth");
		}
	},
	mounted() {
		console.log("count angaajat ");
		console.log(this.count);
		axios
			.get("http://localhost:5000/angajati/contracte/" + this.angajatLogat._id)
			.then((respose) => {
				console.log(respose.data.contractGasit);
				this.contractAngajatLogat = respose.data.contractGasit;
			})
			.catch((err) => console.log(err));

		axios
			.get(
				"http://localhost:5000/cereri/regasesteCereri/" + this.angajatLogat._id
			)
			.then((response) => {
				this.cereriAngajat = response.data.cereri;
				this.cererileMele = response.data.cereri;
			});

		console.log(`Cererile mele sunt ${this.cereriAngajat.length}`);
	},
};
</script>
<style scoped>
tbody {
	height: 60vh;
	width: 75em;
	max-height: 250px;
	overflow: scroll;
}
#trCerere {
	width: 50em;
	padding-top: 20px;
}
#labelMesajConcediuMedical {
	position: absolute;
	margin-left: -120px;
}
#labelConcediuMedical {
	position: absolute;
	font-size: 18px;
	margin-left: -150px;
}
#labelDataInceputConcediuMedical {
	position: absolute;
	font-size: 18px;
	margin-left: -270px;
	height: 40px;
}
#labelDataSfarsitConcediuMedical {
	position: absolute;
	margin-left: -270px;
	font-size: 18px;
}
#inputDataSfarsitConcediuMedical {
	width: 240px;
}
#inputDataInceputConcediuMedical {
	position: absolute;
	width: 240px;
	margin-left: -120px;
}
.first-field-style {
	margin-top: 40px;
}
.btnAdd i {
	margin-right: 1px;
	padding-right: 5px;
	padding-left: 5px;
}
form {
	display: flex;
}
#addTypeRequest {
	width: 240px;
}
.add {
	margin-left: 880px;
}
select {
	-webkit-appearance: none;
	-moz-appearance: none;
	text-indent: 1px;
	text-overflow: "";
}
input[type="text"] {
	flex: 10;
	padding: 8px;
	border: 1px solid #41b883;
	outline: 0;
}
.modal {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	left: 0;
	top: 0;
	height: 82vh;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
	margin-top: 120px;
	margin-left: 570px; /* 15% from the top and centered */
	padding: 20px;
	height: 82%;

	width: 40%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}
.form-style-9 {
	max-width: 1250px;
	background: #fafafa;

	height: 52vh;
	margin: 50px auto;
	box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.35);
	border-radius: 10px;
	border: 6px solid #7274e9;
}
.form-style-9 ul {
	padding: 0;
	margin: 0;
	list-style: none;
}
.form-style-9 ul li {
	margin-bottom: 10px;
	min-height: 35px;
}
.form-style-9 ul li .field-style {
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	padding: 8px;
	outline: none;
	border: 1px solid #b0cfe0;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
}
.form-style-9 ul li .field-style:focus {
	box-shadow: 0 0 5px #b0cfe0;
	border: 1px solid #b0cfe0;
}
.form-style-9 ul li .field-split {
	width: 49%;
}
.form-style-9 ul li .field-full {
	width: 100%;
}
.form-style-9 ul li input.align-left {
	float: left;
}
.form-style-9 ul li input.align-right {
	float: right;
}
.form-style-9 ul li textarea {
	width: 100%;
	height: 100px;
}
.form-style-9 ul li input[type="button"],
.form-style-9 ul li input[type="submit"] {
	-moz-box-shadow: inset 0px 1px 0px 0px #3985b1;
	-webkit-box-shadow: inset 0px 1px 0px 0px #3985b1;
	box-shadow: inset 0px 1px 0px 0px #3985b1;
	background-color: #216288;
	border: 1px solid #17445e;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	margin-left: 10px;
	text-decoration: none;
	font: 12px Arial, Helvetica, sans-serif;
}
.form-style-9 ul li input[type="button"]:hover,
.form-style-9 ul li input[type="submit"]:hover {
	background: linear-gradient(to bottom, #2d77a2 5%, #337da8 100%);
	background-color: #28739e;
}
#title {
	position: absolute;
	margin-left: 240px;
	margin-top: 20px;
	margin-bottom: 30px;
	font-size: 20px;
	text-align: center;
}
#contentModal {
	margin-left: 240px;
	margin-top: 30px;
}
tr {
	width: 120px;
}
table {
	left: 50%;
	top: 50%;
	position: static;
	margin-bottom: 30px;
	width: 1200px;
	margin-top: 60px;
	margin-left: -820px;
	height: 40px;
	border: 1px solid #bdc3c7;
	box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
}

tr {
	transition: all 0.2s ease-in;
	cursor: pointer;
}

th,
td {
	padding: 12px;
	text-align: left;
	border-bottom: 1px solid #ddd;
}

#header {
	background-color: #5d95eb;
	height: 10px;
	color: #fff;
}

tr:hover {
	background-color: #f5f5f5;
	transform: scale(1.02);
	box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 768px) {
	table {
		width: 90%;
	}
}
#header {
	height: 2%;
}
#header th {
	height: 1%;
}

#infoCerere:hover .tooltiptext {
}
.tooltip:hover .tooltiptext {
	visibility: visible;
}

* {
	font-family: "Roboto", sans-serif;
}

@keyframes click-wave {
	0% {
		height: 40px;
		width: 40px;
		opacity: 0.35;
		position: relative;
	}
	100% {
		height: 200px;
		width: 200px;
		margin-left: -80px;
		margin-top: -80px;
		opacity: 0;
	}
}

.option-input {
	-webkit-appearance: none;
	-moz-appearance: none;
	-ms-appearance: none;
	-o-appearance: none;
	appearance: none;
	position: relative;
	top: 3.33333px;
	right: 0;
	bottom: 0;
	left: 0;
	height: 20px;
	width: 30px;
	transition: all 0.15s ease-out 0s;
	background: #cbd1d8;
	border: none;
	color: #fff;
	cursor: pointer;
	padding-top: -5px;
	display: inline-block;
	margin-right: 0.5rem;
	outline: none;
	position: relative;
	z-index: 1000;
}
.option-input:hover {
	background: #9faab7;
}
.option-input:checked {
	background: #3678f3;
}
.option-input:checked::before {
	height: 40px;
	width: 40px;
	position: absolute;
	content: "✔";
	display: inline-block;
	font-size: 22.66667px;

	line-height: 20px;
}
.option-input:checked::after {
	-webkit-animation: click-wave 0.65s;
	-moz-animation: click-wave 0.65s;
	animation: click-wave 0.65s;
	background: #40e0d0;
	content: "";
	display: block;
	position: relative;
	z-index: 100;
}
.option-input.radio {
	border-radius: 50%;
}
.option-input.radio::after {
	border-radius: 50%;
}
#divFilter {
	margin-top: 50px;
	margin-left: -1630px;
}

#titleConcediuNormal {
	position: absolute;
	margin-bottom: 120px;
	margin-left: 220px;
	font-size: 20px;
}
#labelDataInceputCerereNormala {
	position: absolute;
	margin-top: 20px;
	margin-left: -260px;
}
#inputDataInceputCerereNormala {
	margin-left: -120px;
	width: 250px;
	position: absolute;
	margin-top: 20px;
}
#labalDataSfarsitCerereNormala {
	position: absolute;
	margin-top: 30px;
	margin-left: -260px;
}
#inputDataSfarsitCerereNormala {
	position: absolute;
	width: 250px;
	margin-top: 25px;
	margin-left: -120px;
}
#labelMesajCerereNormala {
	position: absolute;
	margin-left: -130px;
	margin-top: 60px;
}
#MesajCerereNormala {
	margin-top: 45px;

	width: 250px;
}
.btnAdd {
	margin-top: -1px;
}
</style>