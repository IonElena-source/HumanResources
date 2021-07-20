<template>
	<div>
		<div id="myModalDescriereEveniment" class="modalDescriereEveniment">
			<!-- Modal content -->
			<div class="modal-contentDescriereEveniment">
				<span class="closeDescriereEveniment">&times;</span>
				<p id="pDescriereEvent">.</p>
			</div>
		</div>
		<div id="myModalEveniment" class="modalEveniment">
			<!-- Modal content -->
			<div class="modal-contentEveniment">
				<span class="closeEveniment">&times;</span>

				<div class="select is-rounded" id="divSelect">
					<select
						id="inputSelectTipEveniment"
						class="select is-rounded"
						v-model="tip_eveniment"
					>
						<option disabled value="Alege tipul de eveniment">
							Alege tipul de eveniment
						</option>
						<option>Întâlnire de afaceri</option>
						<option>Lansare de produs</option>
						<option>Training intern pentru angajați</option>
						<option>Târguri și expoziții</option>
						<option>Team Building</option>
						<option>Petrecere aniversară</option>
						<option>Conferință anuală</option>
					</select>
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
					class="
						event-item
						timeline-grid__card
						start-1100
						flip-card-3D-wrapper
						end-1150
					"
					v-for="(event, index) in props.showEvents.filter(
						(event) => event.title == 'Eveniment'
					)"
					:key="index"
				>
					<div
						v-bind:id="'flip-card' + index"
						class="flip-card"
						v-if="(event.title = 'Eveniment')"
					>
						<div class="flip-card-front" id="">
							<img
								src="../assets/reply.png"
								id="btnFlipBack"
								@click="flipFront(index)"
							/>

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

							<i class="fas fa-map-pin iconLocatie"></i>
							<span id="spanLocatie">{{ event.Locatie }}</span>
						</div>
						<div class="flip-card-back">
							<h2 id="titluParticipare">Participati la acest eveniment?</h2>
							<img
								src="../assets/check-mark.png"
								id="imgAccept"
								@click="participaEveniment(event, index)"
							/>
							<img
								src="../assets/info.png"
								id="imgInfo"
								@click="afiseazaDescriere(event)"
							/>
							<img src="../assets/cancel.png" id="imgClose" />
							<img
								src="../assets/reply.png"
								id="btnFlipFront"
								@click="flipBack(index)"
							/>
						</div>
					</div>
				</div>
				<div
					class="
						event-item
						timeline-grid__card
						start-1100
						cardInterviu
						end-1150
					"
					v-for="event in props.showEvents.filter(
						(event) => event.title == 'Interviu'
					)"
					:key="event._id"
					style="background: transparent"
				>
					<div>
						<div id="divCard">
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
							<h2 id="h2TipEveniment">Interviu</h2>
							<!-- <h2 id="">{{ event.Locatie }}</h2> -->
							<h2 id="h2numeCandidat">Candidat: {{event.Nume_Candidat}}</h2>
							<i class="fas fa-map-pin iconLocatie"></i>
							<span id="spanLocatie">{{ event.Locatie }}</span>
						</div>
					</div>
				</div>
			</template>
		</vue-event-calendar>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "Evenimente",
	data() {
		let today = new Date();
		return {
			interviuri: [],
			evenimente: [],
			angajatLogat: JSON.parse(localStorage.getItem("angajatLogat")),
			tip_eveniment: "Alege tipul de eveniment",
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
		test() {
			console.log(this.demoEvents);
		},
		flipFront(index) {
			document.getElementById("flip-card" + index).classList.toggle("do-flip");
		},
		flipBack(index) {
			document.getElementById("flip-card" + index).classList.toggle("do-flip");
		},
		afiseazaDescriere(event) {
			console.log(event.Descriere);
			document.getElementById("pDescriereEvent").innerHTML = event.Descriere;
			var modal = document.getElementById("myModalDescriereEveniment");
			modal.style.display = "block";
			console.log(this.angajatLogat);
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
		participaEveniment(event, index) {
			// console.log(event+"index"+index)
			// console.log(this.demoEvents)
			//il sterg din evenimentele mele
			for (let i = 0; i < this.demoEvents.length; i++) {
				if (this.demoEvents[i].date == event.date) {
					this.demoEvents.splice(i, 1);
					document
						.getElementById("flip-card" + index)
						.classList.toggle("do-flip");
				}
			}
			var participantiVechi = event.Participanti;
			participantiVechi.push(this.angajatLogat);
			var body = {
				Tip_Eveniment: event.Tip_Eveniment,
				Locatie: event.Locatie,
				Data: event.Data,
				Ora: event.Ora,
				Descriere: event.Descriere,
				Participanti: participantiVechi,
			};
			axios
				.put("http://localhost:5000/evenimente/" + event._id, body)
				.then((result) => {
					alert("Ati raspuns cu succes");
					console.log(result);
				});
		},
		aRaspunsLaEveniment(event) {
			for (let i = 0; i < event.Participanti.length; i++) {
				if (event.Participanti[i]._id == this.angajatLogat._id) {
					return true;
				}
			}
			return false;
		},
	},
	watch: {
		demoEvents: function () {
			////
		},
	},
	mounted() {
		this.demoEvents.pop();
		var modalDescriereEveniment = document.getElementById(
			"myModalDescriereEveniment"
		);
		var spanDescriereEveniment = document.getElementsByClassName(
			"closeDescriereEveniment"
		)[0];
		spanDescriereEveniment.onclick = function () {
			modalDescriereEveniment.style.display = "none";
		};

		axios.get("http://localhost:5000/evenimente").then((response) => {
			this.evenimente = response.data.evenimente;

			for (let i = 0; i < this.evenimente.length; i++) {
				var eveniment = {
					date:
						this.evenimente[i].Data.split("-")[0] +
						"/" +
						this.evenimente[i].Data.split("-")[1] +
						"/" +
						this.evenimente[i].Data.split("-")[2],
					title: "Eveniment",
					_id: this.evenimente[i]._id,
					desc: "longlonglong description",

					Tip_Eveniment: this.evenimente[i].Tip_Eveniment,
					Locatie: this.evenimente[i].Locatie,
					Data: this.evenimente[i].Data,
					Ora: this.evenimente[i].Ora,
					Descriere: this.evenimente[i].Descriere,
					Participanti: this.evenimente[i].Participanti,
				};
				if (!this.aRaspunsLaEveniment(eveniment)) {
					this.demoEvents.push(eveniment);
				}
			}
			setTimeout(() => {
				let colectie = document.getElementsByClassName("is-event");
				for (let i = 0; i < colectie.length; i++) {
					colectie[i].style.borderColor = "rgba(107, 164, 250)";
				}
				var items = document.getElementsByClassName("timeline-grid__card ");
				for (let i = 0; i < items.length; i++) {
					items[i].style.background = "transparent";
				}
			}, 200);
		});

		// regasire interviuri
		axios.get("http://localhost:5000/interviuri").then((response) => {
			this.interviuri = response.data.interviuri;
			for (let i = 0; i < this.interviuri.length; i++) {
				var dataInterviu =
					this.interviuri[i].Data.split("-")[0] +
					"/" +
					"6" +
					"/" +
					this.interviuri[i].Data.split("-")[2];
				var interviuEvent = {
					date: dataInterviu,
					title: "Interviu",
					desc: "longlonglong description",
					Nume_Candidat: this.interviuri[i].Nume_Candidat,
					Ora: this.interviuri[i].Ora,
					Locatie: this.interviuri[i].Locatie,
				};

				this.demoEvents.push(interviuEvent);
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
		var items = document.getElementsByClassName("timeline-grid__card ");
		for (let i = 0; i < items.length; i++) {
			items[i].style.background = "transparent";
		}
		//regasire interviuri
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
	margin-left: 129px;
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
	/* background-color: #fcfcfc;
	width: 480px; */

	margin: 62px 0 0;
	height: 105px;
	/* border: 2px solid #474f69; */
	border-radius: 3px;
	/* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
	margin-left: 10px;
	height: 30px;
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
	border: 0.6em solid rgb(245, 238, 238);
	border-radius: 100%;
	height: 4.5em;
	margin-top: 15px;
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
	font-size: 19px;
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

@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,600");
html * {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
*,
*:after,
*:before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
html,
.flip-card-3D-wrapper {
	width: 90%;
	height: 25%;

	position: relative;
	-o-perspective: 900px;
	-webkit-perspective: 900px;
	-ms-perspective: 900px;
	perspective: 900px;
	margin: 0 auto;
}
.flip-card {
	width: 99.7%;
	height: 99%;
	text-align: center;
	margin: 50px auto;
	position: absolute;
	-o-transition: all 1s ease-in-out;
	-webkit-transition: all 1s ease-in-out;
	-ms-transition: all 1s ease-in-out;
	transition: all 1s ease-in-out;
	-o-transform-style: preserve-3d;
	-webkit-transform-style: preserve-3d;
	-ms-transform-style: preserve-3d;
	transform-style: preserve-3d;
	margin-top: -4px;
	margin-left: -20px;
}
.do-flip {
	-o-transform: rotateY(-180deg);
	-webkit-transform: rotateY(-180deg);
	-ms-transform: rotateY(-180deg);
	transform: rotateY(-180deg);
}
#flip-card-btn-turn-to-back,
#flip-card-btn-turn-to-front {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 40px;
	height: 40px;
	background: white;
	cursor: pointer;

	font-family: "Open Sans", sans-serif;
	font-weight: 600;
	font-size: 0.7em;
	padding: 0;
	color: grey;
	border: 1px solid grey;
}
.flip-card .flip-card-front,
.flip-card .flip-card-back {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	-o-backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	backface-visibility: hidden;
	z-index: 2;
	-webkit-box-shadow: 5px 6px 32px 2px rgba(133, 133, 133, 0.71);
	-moz-box-shadow: 5px 6px 32px 2px rgba(133, 133, 133, 0.71);
	box-shadow: 5px 6px 32px 2px rgba(133, 133, 133, 0.71);
}
.flip-card .flip-card-front {
	background: rgb(225, 229, 233);
	border: 1px solid grey;
}
.flip-card .flip-card-back {
	background: rgb(245, 250, 251);
	border: 1px solid grey;
	-o-transform: rotateY(180deg);
	-webkit-transform: rotateY(180deg);
	-ms-transform: rotateY(180deg);
	transform: rotateY(180deg);
}
.flip-card .flip-card-front p,
.flip-card .flip-card-back p {
	color: grey;
	display: block;
	position: absolute;

	top: 30%;
	width: 100%;
}
#flip-card-btn-turn-to-back {
	visibility: initial;
	margin-top: 30px;
}
#btnFlipBack {
	margin-top: 70px;
	position: absolute;
	font-size: 28px;
	color: rgb(158, 201, 238);
	margin-left: 180px;
	cursor: pointer;
	width: 30px;
}
#imgClose {
	position: absolute;
	width: 45px;
	margin-top: 20px;
	margin-left: 100px;
	cursor: pointer;
}
#imgAccept {
	position: absolute;
	width: 45px;
	margin-top: 20px;
	margin-left: -120px;
	cursor: pointer;
}
#titluParticipare {
	font-size: 18px;
}
#imgInfo {
	position: absolute;
	width: 45px;
	margin-top: 20px;
	margin-left: -10px;
	cursor: pointer;
}
#btnFlipFront {
	position: absolute;
	cursor: pointer;
	margin-top: -30px;
	margin-left: 180px;
}

.modalDescriereEveniment {
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
.modal-contentDescriereEveniment {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 30%;
	margin-left: 1080px;
	height: 60%;
}

/* The Close Button */
.closeDescriereEveniment {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeDescriereEveniment:hover,
.closeDescriereEveniment:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
.cardInterviu {
	height: 140px;
}
#divCard {
	margin-top: -18px;
	background: white;
	height: 130px;
	box-shadow: 0 0 5px 5px rgba(31, 73, 125, 0.8);
}
#h2numeCandidat{
	font-size: 18px;
}
</style>