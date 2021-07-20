<template>
	<div>
		<div id="myModalParticipanti" class="modalParticipanti">
			<!-- Modal content -->
			<div class="modal-contentParticipanti">
				<span class="closeParticipanti">&times;</span>
				<h1 id="titluParticipanti">Participanti</h1>
				<table class="rwd-table">
					<tr>
						<th>Nume</th>
						<th>Prenume</th>
					</tr>
				</table>
			</div>
		</div>
		<div id="myModalEveniment" class="modalEveniment">
			<!-- Modal content -->
			<div class="modal-contentEveniment">
				<span class="closeEveniment">&times;</span>

				<div id="divSelect">
					<input
						type="text"
						id="inputSelectTipEveniment"
						class="input is-info"
						placeholder="Alegeti tipul de eveniment"
						v-model="tip_eveniment"
					/>
				</div>

				<div class="divTitluEveniment">
					<i class="fas fa-map-marker-alt icon"></i>
					<label
						for="titluEveniment"
						id="inputLocatieEveniment"
						class="labelTitluEveniment"
						>Locatie
					</label>
					<input
						class="input is-info inputLocatieEveniment"
						type="text"
						id="inputTitluEveniment"
						name="locatieEveniment"
					/>
				</div>
				<div class="divTitluEveniment">
					<i class="far fa-calendar-alt iconDate"></i>
					<label
						for="titluEveniment"
						id="labelDataEveniment"
						class="labelTitluEveniment"
						>Data
					</label>
					<input
						class="input is-info"
						type="date"
						id="inputDataEveniment"
						name="locatieEveniment"
					/>
				</div>
				<div class="divTitluEveniment divOra">
					<i class="fas fa-clock iconOra"></i>
					<label for="titluEveniment" id="" class="labelOraEveniment"
						>Ora
					</label>
					<input
						class="input is-info"
						type="time"
						id="inputOraEveniment"
						name="locatieEveniment"
					/>
				</div>
				<div class="divTitluEveniment divDescriereEveniment">
					<i class="fas fa-align-justify iconDescriere"></i>
					<label
						for="titluEveniment"
						id="labelDescriereEveniment"
						class="labelTitluEveniment"
					>
					</label>
					<textarea
						class="input is-info"
						type="text"
						id="inputDescriereEveniment"
						placeholder="Descriere eveniment"
						name="locatieEveniment"
					></textarea>
				</div>
				<button class="button is-primary" @click="sendEvent" id="sendEvent">
					<span class="icon">
						<i class="fas fa-check iconSendEvent"></i>
					</span>
					<span>Salveaza</span>
				</button>
			</div>
		</div>
		<div id="myModalInterviu" class="modalInterviu">
			<!-- Modal content -->
			<div class="modal-contentInterviu">
				<span class="closeInterviu">&times;</span>

				<h2>Register Form</h2>
				<div class="input-container">
					<i class="fa fa-user icon"></i>
					<input
						class="input-field"
						type="text"
						placeholder="Username"
						name="usrnm"
					/>
				</div>

				<div class="input-container">
					<i class="fa fa-envelope icon"></i>
					<input
						class="input-field"
						type="text"
						placeholder="Email"
						name="email"
					/>
				</div>

				<div class="input-container">
					<i class="fa fa-key icon"></i>
					<input
						class="input-field"
						type="password"
						placeholder="Password"
						name="psw"
					/>
				</div>

				<button type="submit" class="btn">Register</button>
			</div>
		</div>

		<div></div>
		<vue-event-calendar :events="demoEvents" class="calendar">
			<template slot-scope="props" class="template info-timeline">
				<div
					class="event-item timeline-grid__card start-1100 end-1150"
					v-for="(event, index) in props.showEvents"
					:key="index"
				>
					<div class="timeline-grid__card-indicator">
						<div class="timeline-grid__card-indicator-pointer"></div>
					</div>
					<div v-if="event.title == 'Eveniment'">
						<div class="clock">
							<span
								class="hours"
								v-bind:style="{ transform: rotateOre(event) }"
							></span>
							<span
								class="minutes"
								v-bind:style="{ transform: rotateMinute(event) }"
							></span>
						</div>
						<h2 id="h2Ora">{{ event.Ora }}</h2>
						<h2 id="h2TipEveniment">{{ event.Tip_Eveniment }}</h2>
						<!-- <h2 id="">{{ event.Locatie }}</h2> -->
						<div class="tooltip">
							<i class="fas fa-info-circle iconTooltip"></i>
							<span class="tooltiptext">{{ event.Descriere }}</span>
						</div>
						<i class="fas fa-map-pin iconLocatie"></i>
						<span id="spanLocatie">{{ event.Locatie }}</span>
						<i
							class="fas fa-address-book iconParticipanti"
							@click="afiseazaParticipanti(event)"
						>
						</i>
					</div>
					<div v-if="event.title == 'Interviu'">
						<div class="clock">
							<span
								class="hours"
								v-bind:style="{ transform: rotateOre(event) }"
							></span>
							<span
								class="minutes"
								v-bind:style="{ transform: rotateMinute(event) }"
							></span>
						</div>
						<i class="fas fa-address-book"></i>
						<i class="fas fa-map-pin iconLocatie"></i>
						<span id="spanLocatie">{{ event.Locatie }}</span>
					</div>
				</div>
			</template>
		</vue-event-calendar>
		<button class="button is-primary" @click="adaugaEveniment" id="btnAdauga">
			<span class="icon">
				<i class="fas fa-plus-circle"></i>
			</span>
			<span>Adauga Eveniment</span>
		</button>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "Calendar",
	data() {
		let today = new Date();
		return {
			interviuri: [],
			evenimente: [],
			tip_eveniment: "",
			s: today.getSeconds() * 6,
			demoEvents: [
				{
					date: `${today.getFullYear()}/${today.getMonth() + 1}/${
						today.getDay
					}`,
					title: "Eveniment",
					desc: "longlonglong description",
					Tip_Eveniment: "Team Building",
					Locatie: "Strada Mihai Eminescu  Nr. 10 ",
					Ora: "14:50",
					Descriere: "Nu exista descriere pentru acest eveniment.",
					Participanti: [],
				},
			],
		};
	},
	methods: {
		inchideParticipanti() {
			var modalParticipanti = document.getElementById("myModalParticipanti");
			alert(modalParticipanti);
			modalParticipanti.style.display = "none";
			alert(modalParticipanti.style.display);
		},
		afiseazaDescriere() {
			var popup = document.getElementById("myPopup");
			popup.classList.toggle("show");
		},
		handleDayChanged(data) {
			console.log("date-changed", data);
			alert("da");
		},
		rotateMinute(event) {
			return `rotate(${event.Ora.split(":")[1] * 6 + this.s / 60}deg)`;
		},
		rotateOre(event) {
			var h =
				((event.Ora.split(":")[0] % 12) / 12) * 360 +
				event.Ora.split(":")[1] / 12;
			return `rotate(${h}deg)`;
		},
		handleMonthChanged(data) {
			console.log("month-changed", data);
		},
		programareCandidat() {
			var modalInterviu = document.getElementById("myModalInterviu");
			modalInterviu.style.display = "block";
		},
		adaugaEveniment() {
			var modal = document.getElementById("myModalEveniment");
			modal.style.display = "block";
			console.log(this.evenimente);
			let eventAzi =
				document.getElementsByClassName("cal-events")[0].children[0];
			let divTitle = eventAzi.children[1];
			if (!divTitle) {
				console.log(divTitle);
			} else {
				console.log("nu");
			}
		},
		afiseazaParticipanti(event) {
			var tableVechi = document.getElementsByClassName("rwd-table")[0];
			tableVechi.remove();

			// for (let i = 1; i < table.children.length; i++) {

			// 	table.children[i].remove();
			// }
			var table = document.createElement("table");
			table.style.border = "1px solid black";
			table.classList.add("rwd-table");
			table.style.marginTop = "30px";
			table.style.marginLeft = "140px";
			table.style.width = "350px";

			let tr = document.createElement("tr");
			let th1 = document.createElement("th");
			th1.style.width = "100px";
			th1.style.border = "1px solid black";
			th1.style.fontSize = "18px";
			let th2 = document.createElement("th");
			th1.innerText = "Nume";

			th2.style.width = "100px";
			th2.style.border = "1px solid black";
			th2.innerText = "Prenume";
			tr.appendChild(th1);
			tr.appendChild(th2);
			tr.style.backgroundColor="rgb(182, 209, 250)"
			table.appendChild(tr);

			for (let i = 0; i < event.Participanti.length; i++) {
				let tr = document.createElement("tr");
				let tdNume = document.createElement("td");
				tdNume.innerHTML = event.Participanti[i].Nume;
				let tdPrenume = document.createElement("td");
				tdNume.style.borderRight = "1px solid black";
				tdPrenume.style.borderRight = "1px solid black";
				tdPrenume.innerHTML = event.Participanti[i].Prenume;
				tr.appendChild(tdNume);
				tr.appendChild(tdPrenume);
				tr.style.border = "1px solid black";
				table.appendChild(tr);
			}
			document
				.getElementsByClassName("modal-contentParticipanti")[0]
				.appendChild(table);

			var modalParticipanti = document.getElementById("myModalParticipanti");
			modalParticipanti.style.display = "block";
		},
		sendEvent() {
			let locatie = document.getElementsByClassName("inputLocatieEveniment")[0]
				.value;
			let data = document.getElementById("inputDataEveniment").value;
			let ora = document.getElementById("inputOraEveniment").value;
			let descriere = document.getElementById("inputDescriereEveniment").value;
			if (!locatie) {
				alert("Introduceti locatia evenimentului");
				return;
			}
			if (!data) {
				alert("Introduceti data evenimentului");
				return;
			}
			if (!ora) {
				alert("Introduceti ora evenimentului");
				return;
			}
			if (!descriere) {
				descriere = "Nu exista descriere";
			}
			//trimit evenimentul pt a fi inserat
			var eveniment = {
				Tip_Eveniment: this.tip_eveniment,
				Locatie: locatie,
				Data: data,
				Ora: ora,
				Descriere: descriere,
				Participanti: [],
			};
			axios.post("http://localhost:5000/evenimente", eveniment).then(() => {
				alert("Eveniment adaugat");
				axios.get("http://localhost:5000/evenimente").then((response) => {
					this.evenimente = response.data.evenimente;

					let evenimentNou = {
						date:
							eveniment.Data.split("-")[0] +
							"/" +
							eveniment.Data.split("-")[1] +
							"/" +
							eveniment.Data.split("-")[2],
						title: "Eveniment",
						desc: "longlonglong description",
						Tip_Eveniment: eveniment.tip_eveniment,
						Locatie: eveniment.locatie,
						Data: eveniment.data,
						Ora: eveniment.ora,
						Descriere: eveniment.descriere,
						Participanti: eveniment.Participanti,
					};
					this.demoEvents.push(evenimentNou);

					setTimeout(() => {
						let colectie = document.getElementsByClassName("is-event");
						for (let i = 0; i < colectie.length; i++) {
							colectie[i].style.borderColor = "rgba(107, 164, 250)";
						}
					}, 200);
				});
				location.reload();
				var modalEveniment = document.getElementById("myModalEveniment");
				modalEveniment.style.display = "none";
			});
		},
	},
	watch: {
		evenimente: function () {},
	},
	mounted() {
		var spanParticipanti =
			document.getElementsByClassName("closeParticipanti")[0];
		var modalParticipanti = document.getElementById("myModalParticipanti");

		spanParticipanti.onclick = function () {
			modalParticipanti.style.display = "none";
		};
		axios.get("http://localhost:5000/evenimente").then((response) => {
			this.evenimente = response.data.evenimente;
			this.demoEvents.pop();
			for (let i = 0; i < this.evenimente.length; i++) {
				var eveniment = {
					date:
						this.evenimente[i].Data.split("-")[0] +
						"/" +
						this.evenimente[i].Data.split("-")[1] +
						"/" +
						this.evenimente[i].Data.split("-")[2],
					title: "Eveniment",
					desc: "longlonglong description",

					Tip_Eveniment: this.evenimente[i].Tip_Eveniment,
					Locatie: this.evenimente[i].Locatie,

					Ora: this.evenimente[i].Ora,
					Descriere: this.evenimente[i].Descriere,
					Participanti: this.evenimente[i].Participanti,
				};
				this.demoEvents.push(eveniment);
			}
			setTimeout(() => {
				let colectie = document.getElementsByClassName("is-event");
				for (let i = 0; i < colectie.length; i++) {
					colectie[i].style.borderColor = "rgba(107, 164, 250)";
				}
			}, 200);
		});
		document.getElementById("inputSelectTipEveniment").value =
			"Alege tipul de eveniment";

		var modalEveniment = document.getElementById("myModalEveniment");
		var spanEveniment = document.getElementsByClassName("closeEveniment")[0];
		spanEveniment.onclick = function () {
			modalEveniment.style.display = "none";
		};

		var modalInterviu = document.getElementById("myModalInterviu");
		var spanInterviu = document.getElementsByClassName("closeInterviu")[0];
		spanInterviu.onclick = function () {
			modalInterviu.style.display = "none";
		};
		document.getElementsByClassName("events-wrapper")[0].style.background =
			"rgba(115, 151, 255,0.9)";

		// document.getElementsByClassName("is-event")[0].style.background = "blue";
		// document.getElementsByClassName("is-event")[0].style.backgroundCcolor =
		// 	"rgba(131, 190, 252)";
		// document.getElementsByClassName("is-event")[0].style.borderColor =
		// 	"rgba(131, 190, 252)";

		console.log(this.demoEvents[0]);

		//regasire interviuri
		// axios.get("http://localhost:5000/interviuri").then((response) => {
		// 	this.interviuri = response.data.interviuri;
		// 	for (let i = 0; i < this.interviuri.length; i++) {
		// 		var dataInterviu =
		// 			this.interviuri[i].Data.split("-")[0] +
		// 			"/" +
		// 			"6" +
		// 			"/" +
		// 			this.interviuri[i].Data.split("-")[2];
		// 		var interviuEvent = {
		// 			date: dataInterviu,
		// 			title: "Interviu",
		// 			desc: "longlonglong description",
		// 			Nume_Candidat: this.interviuri[i].Nume_Candidat,
		// 			Ora: this.interviuri[i].Ora,
		// 			Locatie: this.interviuri[i].Locatie,
		// 		};

		// 		this.demoEvents.push(interviuEvent);
		// 	}

		// 	setTimeout(() => {
		// 		let colectie = document.getElementsByClassName("is-event");
		// 		for (let i = 0; i < colectie.length; i++) {
		// 			colectie[i].style.borderColor = "rgba(107, 164, 250)";
		// 		}
		// 	}, 200);
		// });
	},
	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth");
		}
	},
};
</script>
<style scoped>
.calendar {
	background: rgba(251, 251, 255, 0.993);
	margin-top: 70px;
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
h1,
h2,
h3 {
	font-weight: normal;
	margin: 0;
	padding: 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.t-center {
	text-align: center;
	margin: 20px;
}
.mt150 {
	margin-top: 150px;
}
.event-item {
	background-color: blue;
	background: rgb(171, 171, 230);
}
.event-item:first-child {
	margin-top: 30px;
}
.template {
	background: blue;
	background-color: blue;
	width: 100px;
}
.events-wrapper {
	background: blue;
	background-color: blue;
}
.is-event {
	background-color: blue;
	background: rgb(131, 190, 252);
}
.selected-day {
	background-color: rgb(131, 190, 252);
	background: rgb(131, 190, 252);
}

.modalInterviu {
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
.modal-contentInterviu {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

/* The Close Button */
.closeInterviu {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeInterviu:hover,
.closeInterviu:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
.modal-contentInterviu {
	margin-left: 1040px;
	width: 30vw;
	height: 60vh;
}
body {
	font-family: Arial, Helvetica, sans-serif;
}
* {
	box-sizing: border-box;
}

.input-container {
	display: -ms-flexbox; /* IE10 */
	display: flex;
	width: 100%;
	margin-bottom: 15px;
}

.icon {
	padding: 10px;
	background: dodgerblue;
	color: white;
	min-width: 50px;
	text-align: center;
}

.input-field {
	width: 100%;
	padding: 10px;
	outline: none;
}

.input-field:focus {
	border: 2px solid dodgerblue;
}

/* Set a style for the submit button */
.btn {
	background-color: dodgerblue;
	color: white;
	padding: 15px 20px;
	border: none;
	cursor: pointer;
	width: 100%;
	opacity: 0.9;
}

.btn:hover {
	opacity: 1;
}
#btnProgramare {
	margin-left: 550px;
}
.is-event {
	background-color: brown;
}
@import "//fonts.googleapis.com/css?family=Muli:300";

@import url(https://fonts.googleapis.com/css?family=Merriweather:400,700,900);
body {
	font-size: 100%;
	line-height: 1.6;
}

.block-content {
	min-height: 100vh;
}

block-content p {
	font-size: 1.1em;
	line-height: 1.5;
	-webkit-font-smoothing: antialiased;
	margin: 0 auto 1em auto;
}

.block-content h2 {
	text-align: center;
	margin: 1em 0 0 0;
	font-size: 2.5em;
	line-height: 1;
	letter-spacing: 0.02em;
}
@media all and (min-width: 40em) {
	.block-content h2 {
		font-size: 4.75em;
	}
}

.subtitle {
	font-family: "Merriweather", sans-serif;
	font-weight: 300;
	text-transform: uppercase;
	text-align: center;
	font-size: 1em;
	margin: 0.5em 0;
}

.heading-group {
	margin: 0 0 3em 0;
}

.content h3 {
	font-size: 1.2em;
	line-height: 1.2;
	letter-spacing: 0.02em;
	color: #fff;
}
@media all and (min-width: 40em) {
	.content h3 {
		font-size: 2.5em;
	}
}

h1,
h2,
h3 {
	font-family: "Merriweather", sans-serif;
	font-weight: 900;
}

p {
	font-family: "Merriweather", sans-serif;
	line-height: 1.5;
}

.l-block-spacing {
	min-height: 80vh;
	padding: 2em 0 4em 0;
}

.l-contained {
	max-width: 1000px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1em;
	padding-right: 1em;
}
@media all and (min-width: 40em) {
	.l-contained {
		padding-left: 2em;
		padding-right: 2em;
	}
}

.timeline-grid__card {
	position: relative;
	background-color: #fcfcfc;
	width: 480px;

	margin: 62px 0 0;
	height: 105px;
	border: 2px solid #474f69;
	border-radius: 3px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	margin-left: 10px;
	margin-top: 80px;
}
.timeline-grid__card h2 {
	color: #474f69;
	padding: 14px 0 0 24px;
	margin: 0;
	font-size: 12pt;
	font-weight: 900;
}
.timeline-grid__card h3 {
	color: #474f69;
	padding: 6px 0 0 26px;
	margin: 0;
	font-size: 14pt;
	font-weight: 900;
}
.timeline-grid__card-indicator {
	position: absolute;
	background-color: #1f3c9a;
	height: 96%;
	width: 15px;
	margin-left: -20px;
}
.timeline-grid__card-indicator-pointer {
	border-bottom: solid 17px #1f3c9a;
	border-right: solid 16px #1f3c9a;
	border-left: solid 19px transparent;
	border-top: solid 17px transparent;
	transform: rotate(-88deg);
	margin: -7px 0 -9px -20px;
}

.start-1000 {
	grid-row-start: time-1000;
}

.end-1030 {
	grid-row-end: time-1030;
}

.start-1100 {
	grid-row-start: time-1100;
}

.end-1150 {
	grid-row-end: time-1150;
}

.start-1300 {
	grid-row-start: time-1300;
}

.end-1330 {
	grid-row-end: time-1330;
}

body {
	background-color: #fcfcfc;
	min-width: 700px;
}

h1 {
	color: #474f69;
	padding: 50px 0 0 100px;
}

h2 {
	color: #474f69;
	padding: 0 0 10px 106px;
	font-size: 14pt;
	font-weight: 400;
	margin-top: -10px;
}

/* The Modal (background) */
.modalEveniment {
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
.modal-contentEveniment {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 40%;
	height: 90%;
	margin-top: -30px;
	margin-left: 980px;
}

/* The Close Button */
.closeEveniment {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeEveniment:hover,
.closeEveniment:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
#tipEveniment {
	margin-top: 20px;
	margin-left: -490px;
	font-size: 19px;
}
#inputSelectTipEveniment {
	font-size: 16px;
}
#divSelect {
	position: absolute;
	margin-top: 20px;
	margin-left: -115px;
}
.divTitluEveniment {
	margin-top: 82px;
	margin-left: -210px;
}
.labelTitluEveniment {
	margin-top: 33px;
	font-size: 18px;
}
#inputTitluEveniment {
	margin-right: 10px;
	margin-left: 30px;
	width: 290px;
}
#labelDataEveniment {
	position: absolute;
	font-size: 22px;
	margin-top: -3px;
	margin-left: -169px;
}
.icon {
	font-size: 20px;
	color: black;
	background-color: transparent;
}
.iconDate {
	position: absolute;
	font-size: 24px;
	color: black;
	background-color: transparent;
	margin-left: -203px;
}
#inputDataEveniment {
	position: absolute;
	margin-left: -78px;
	width: 290px;
}
.divOra {
	margin-top: 194px;
}
.iconOra {
	font-size: 22px;
	position: absolute;
	margin-left: -205px;
}
.labelOraEveniment {
	position: absolute;
	font-size: 22px;
	margin-left: -170px;
	margin-top: -5px;
}
#inputOraEveniment {
	position: absolute;
	margin-left: -78px;
	width: 290px;
}

.divDescriereEveniment {
	margin-top: 110px;
}
.iconDescriere {
	position: absolute;
	font-size: 20px;
	margin-top: 90px;
	margin-left: 9px;
	margin-right: 210px;
}
#inputDescriereEveniment {
	margin-left: 128px;
	margin-top: 80px;
	width: 290px;
	height: 150px;
}
#eventOra {
	background-color: brown;
	width: 50px;
	box-sizing: border-box;
	padding-left: 0;
	margin-left: 50px;
	margin-top: -40px;
	height: 10px;
}
time {
	position: absolute;
	background: #94b8ff;
	width: 80px;
	height: 30px;
	top: -15px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 2px;
}
h2 .date {
	position: absolute;
	margin-bottom: 60px;
}
:root {
	--primary-light: #8abdff;
	--primary: #6d5dfc;
	--primary-dark: #5b0eeb;

	--white: #ffffff;
	--greyLight-1: #e4ebf5;
	--greyLight-2: #c8d0e7;
	--greyLight-3: #bec8e4;
	--greyDark: #9baacf;
}

*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}

.container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Poppins", sans-serif;
	background: var(--greyLight-1);
}

.components {
	width: 75rem;
	height: 40rem;
	border-radius: 3rem;
	box-shadow: 0.8rem 0.8rem 1.4rem var(--greyLight-2),
		-0.2rem -0.2rem 1.8rem var(--white);
	padding: 4rem;
	display: grid;
	grid-template-columns: 17.6rem 19rem 20.4rem;
	grid-template-rows: repeat(autofit, min-content);
	grid-column-gap: 5rem;
	grid-row-gap: 2.5rem;
	align-items: center;
}
/* #imgClock {
	margin-left: -335px;
} */
.clock {
	background-color: #1f3c9a;
	border: 0.6em solid white;
	border-radius: 100%;
	height: 4.5em;
	margin-top: -5px;
	position: relative;
	width: 4.5em;
}
.clock span {
	background: white;
	bottom: 50%;
	display: block;
	left: 50%;
	position: absolute;
	transform-origin: bottom center;
}
.clock .hours {
	height: 30%;
	width: 0.2em;
}
.clock .minutes {
	height: 45%;
	width: 0.2em;
}
#h2Ora {
	margin-top: -20px;
	font-size: 18px;
	margin-left: -390px;
}
#h2TipEveniment {
	position: relative;
	margin-top: -100px;
	/* margin-left: 120px; */
	font-size: 18px;
	font-style: italic;
	text-align: center;
}
.tooltip {
	position: relative;
	display: inline-block;
}

.tooltip .tooltiptext {
	visibility: hidden;
	width: 120px;
	background-color: black;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 5px 0;

	/* Position the tooltip */
	position: absolute;
	z-index: 1;
}

.tooltip:hover .tooltiptext {
	visibility: visible;
}
.tooltip {
	position: absolute;
	margin-top: 39.5px;
}
.iconTooltip {
	margin-left: 180px;
	font-size: 22px;
	color: rgb(3, 3, 126);
}
.tooltiptext {
	width: 20px;
}
.tooltip .tooltiptext {
	width: 220px;

	overflow-wrap: break-word;
	top: 100%;
	left: 40%;
	margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
}
.iconLocatie {
	position: absolute;
	font-size: 28px;
	margin-left: -113px;
	margin-top: 10px;
}
#spanLocatie {
	position: absolute;
	margin-top: 10px;
	text-align: left;
	margin-left: -88px;
	font-size: 18px;
}
#btnAdauga {
	margin-left: -590px;
	position: absolute;
	margin-top: -20px;
	background-color: #5d97fcaf;
	text-align: left;
	width: 270px;
}
#sendEvent {
	margin-left: 420px;
	margin-top: -20px;
	width: 140px;
	color: white;
	font-size: 18px;
}
.iconSendEvent {
	color: white;
	margin-right: -20px;
}
#divSelect {
	margin-left: 130px;
	width: 290px;
}
.iconParticipanti {
	position: absolute;
	margin-top: -20px;
	margin-left: 180px;
	color: rgb(23, 23, 130);
	font-size: 23px;
	cursor: pointer;
}

/* The Modal (background) */
.modalParticipanti {
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
.modal-contentParticipanti {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 40%;
	margin-left: 960px;
}

/* The Close Button */
.closeParticipanti {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeParticipanti:hover,
.closeParticipanti:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
.rwd-table {
	margin: 1em 0;
	min-width: 300px;
}
.rwd-table tr {
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
}
.rwd-table th {
	display: none;
}
.rwd-table td {
	display: block;
}
.rwd-table td:first-child {
	padding-top: 0.5em;
}
.rwd-table td:last-child {
	padding-bottom: 0.5em;
}
.rwd-table td:before {
	content: attr(data-th) ": ";
	font-weight: bold;
	width: 6.5em;
	display: inline-block;
}
@media (min-width: 480px) {
	.rwd-table td:before {
		display: none;
	}
}
.rwd-table th,
.rwd-table td {
	text-align: left;
}
@media (min-width: 480px) {
	.rwd-table th,
	.rwd-table td {
		display: table-cell;
		padding: 0.25em 0.5em;
	}
	.rwd-table th:first-child,
	.rwd-table td:first-child {
		padding-left: 0;
	}
	.rwd-table th:last-child,
	.rwd-table td:last-child {
		padding-right: 0;
	}
}

body {
	padding: 0 2em;
	font-family: Montserrat, sans-serif;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
	color: #444;
	background: #eee;
}

h1 {
	font-weight: normal;
	letter-spacing: -1px;
	color: #34495e;
}

.rwd-table {
	background: #34495e;
	color: #fff;
	border-radius: 0.4em;
	overflow: hidden;
}
.rwd-table tr {
	border-color: #46637f;
}
.rwd-table th,
.rwd-table td {
	margin: 0.5em 1em;
}
@media (min-width: 480px) {
	.rwd-table th,
	.rwd-table td {
		padding: 1em !important;
	}
}
.rwd-table th,
.rwd-table td:before {
	color: #dd5;
}
#titluParticipanti {
	margin-left: -120px;
	text-align: center;
	margin-top: -50px;
	font-size: 20px;
}
</style>