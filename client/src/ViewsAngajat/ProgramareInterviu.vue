<template>
	<div id="contentProgramare">
		<h1 id="candidat">Programare candidat</h1>
		<div class="formularProgramareInterviu">
			<div class="input-container">
				<i class="fa fa-user icon"></i>
				<input
					class="input-field"
					type="text"
					id="inputNumeCandidat"
					disabled
					name="usrnm"
				/>
			</div>

			<div class="input-container">
				<i class="fa fa-envelope icon"></i>
				<input
					class="input-field"
					type="text"
					id="inputEmailCandidat"
					disabled
					placeholder="Email"
					name="email"
				/>
			</div>

			<div class="input-container">
				<i class="fas fa-calendar-alt icon"></i>
				<input
					class="input-field"
					type="date"
					placeholder="data"
					name="psw"
					id="inputData"
				/>
			</div>
			<div class="input-container">
				<i class="fas fa-clock icon"></i>
				<input
					class="input-field"
					type="time"
					placeholder="data"
					name="psw"
					id="oraInterviu"
				/>
			</div>
			<div class="wrapper">
				<input
					type="radio"
					name="select"
					id="option-1"
					value="Fizic"
					v-model="tipInterviu"
					@change="alegeFizic"
				/>
				<input
					type="radio"
					name="select"
					id="option-2"
					value="Online"
					v-model="tipInterviu"
					@change="alegeOnline"
				/>
				<label for="option-1" class="option option-1">
					<div class="dot"></div>
					<span>Fizic</span>
				</label>
				<label for="option-2" class="option option-2">
					<div class="dot"></div>
					<span>Online</span>
				</label>
			</div>
			<div class="input-container" id="containerTipInterviu">
				<i class="fas fa-map-marker icon" id="iconTipInterviu"></i>
				<input
					class="input-field inputTipInterviu"
					type="data"
					placeholder="Locatie"
					id="locatieInterviu"
					name="psw"
				/>
			</div>
		</div>

		<ul id="grafic">
			<li v-for="(skill, i) in skillSet" :key="i">
				<div :style="{ width: skill.initLevel + '%' }">
					<label id="skillArea">{{ skill.area }} </label>
					<span id="spanLevel">{{ skill.initLevel + "%" }}</span>
				</div>
			</li>
		</ul>

		<button
			@click="programareCandidat"
			class="button is-info is-light"
			id="btnProgramare"
		>
			Programeaza candidat
		</button>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "ProgramareInterviu",
	data() {
		return {
			user: {},
			id_candidat: this.$route.params.id_candidat,
			candidat: {},
			scor: {},
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			intervalID: "",
			increment: 1,
			skillSet: [],
			tipInterviu: "",
		};
	},
	computed: {
		userCurent: function () {
			return this.user;
		},
	},
	methods: {
		alegeFizic() {
			document.getElementsByClassName("inputTipInterviu")[0].placeholder =
				"Locatie";
			document.getElementById("iconTipInterviu").className =
				"fas fa-map-marker icon";
		},
		alegeOnline() {
			document.getElementsByClassName("inputTipInterviu")[0].placeholder =
				"Link Conectare";
			document.getElementById("iconTipInterviu").className = "fas fa-link icon";
		},
		programareCandidat() {
			let nume_candidat = document.getElementById("inputNumeCandidat").value;
			let email_candidat = document.getElementById("inputEmailCandidat").value;
			let data = document.getElementById("inputData").value;
			let ora = document.getElementById("oraInterviu").value;
			let tip_interviu = this.tipInterviu;
			let locatie = document.getElementById("locatieInterviu").value;
			let interviu={
				Nume_Candidat:nume_candidat,
				Email_Candidat:email_candidat,
				Data:data,
				Ora:ora,
				Tip_Interviu:tip_interviu,
				Locatie:locatie
			}
			axios.post("http://localhost:5000/interviuri/",interviu).then(()=>{
				alert("Interviu adaugat cu succes")
			})
		},
		showUser() {
			console.log(this.user);
		},
		showNotif() {},
		getLevelProgress: function (value) {
			this.skillSet.forEach((data) => {
				data.initLevel = Math.min(
					Math.floor(data.initLevel + value),
					data.level
				);
			});
		},
		beforeDestroy: function () {
			clearInterval(this.intervalID);
		},
	},
	created() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/manageri/auth");
		}
	},
	mounted() {
		// Skills Bars
		this.intervalID = setInterval(() => {
			this.getLevelProgress(this.increment);
		}, 10);
		axios
			.get("http://localhost:5000/candidati/findCandidat/" + this.id_candidat)
			.then((response) => {
				this.candidat = response.data.candidat;
				this.scor = JSON.parse(this.candidat.Scor);
				for (let s in this.scor) {
					let skill = {};
					skill.initLevel = 0;
					skill.area = s;
					skill.level = this.scor[s];
					this.skillSet.push(skill);
				}
				document.getElementById("inputNumeCandidat").value =
					this.candidat.Nume_Complet;
				document.getElementById("inputEmailCandidat").value =
					this.candidat.Email;
			});
	},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

main {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 350px;
	overflow: hidden;
}

h1 {
	color: #292929;
}

li {
	margin: 0.5em 0 0.5em;
	border: 0.1em solid #bfc8ee;
	border-radius: 3px;
	background: #dfedfb;
	list-style: none;
	overflow: hidden;
}
li div {
	position: relative;
	height: 1.4em;
	background: #b6cbf3;
	font-size: 1.2em;
}
li div label:first-child {
	position: absolute;
	left: 8px;
}
li div label:last-child {
	position: absolute;
	right: 8px;
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
	margin-top: 15px;

	background: transparent;
	width: 70px;
	color: rgb(88, 110, 236);
	margin-left: 50px;
	height: 30px;
	font-size: 22px;
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
#candidat {
	margin-top: 10px;
	font-size: 22px;
}
.formularProgramareInterviu {
	margin-top: 100px;
	margin-left: -19px;
	width: 30vw;
	height: 60vh;
	overflow: hidden;
}
/* SKILLS */

#skills {
	background: #1c3553;
	padding: 20px 15px 75px 15px;
	color: #fff;
}

.skills-text {
	max-width: 1080px;
	margin-left: auto;
	margin-right: auto;
	background: #1c3553;
	font-size: 20px;
}

.skills-title {
	display: block;
	margin-bottom: 2rem;
}

.skills-title.underline:before {
	width: 80px;
}

.skills-list {
	overflow: hidden;
	position: relative;
	z-index: 10;
}

.skill-name:after {
	background-color: #999797;
	content: "";
	display: block;
	height: 1rem;
	position: relative;
	top: 3px;
	/*top: 1rem;*/
	width: 100%;
}

.skill-percent {
	font-size: 0;
	height: 1rem;
	position: relative;
	top: -0.8rem;
	transition: 3s linear;
	width: 0;
}

/* SKILL BAR COLORS */

/* Heading Underline */

.underline {
	display: inline-block;
	position: relative;
}

.underline:before {
	background-color: #fff;
	bottom: -15px;
	content: "";
	height: 2px;
	left: 0;
	position: absolute;
	width: 110%;
}
.container {
	width: 100%;
	background-color: #ddd;
}

.skills {
	text-align: right;
	padding-top: 10px;
	padding-bottom: 10px;
	color: white;
}
#btnProgramare {
	margin-top: 390px;
}
#skillArea {
}
#spanLevel {
	margin-left: 650px;
}
#grafic {
	margin-top: -470px;
	margin-left: 520px;

	width: 50vw;
	overflow: hidden;
}
#contentProgramare::-webkit-scrollbar {
	display: none; /* for Chrome, Safari, and Opera */
}
@import url("https://fonts.googleapis.com/css?family=Lato:400,500,600,700&display=swap");
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Lato", sans-serif;
}
html,
body {
	display: grid;
	height: 100%;
	place-items: center;
	background: #0069d9;
	font-family: "Lato", sans-serif;
}
.wrapper {
	display: inline-flex;
	background: #fff;
	height: 50px;
	width: 400px;
	align-items: center;
	justify-content: space-evenly;
	border-radius: 5px;
	padding: 20px 15px;
	box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
	margin-left: 97px;
}
.wrapper .option {
	background: #fff;
	height: 300%;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 0 10px;
	border-radius: 5px;
	cursor: pointer;
	padding: 0 10px;
	border: 2px solid lightgrey;
	transition: all 0.3s ease;
}
.wrapper .option .dot {
	height: 20px;
	width: 20px;
	background: #d9d9d9;
	border-radius: 50%;
	position: relative;
}
.wrapper .option .dot::before {
	position: absolute;
	content: "";
	top: 4px;
	left: 4px;
	width: 12px;
	height: 12px;
	background: #0069d9;
	border-radius: 50%;
	opacity: 0;
	transform: scale(1.5);
	transition: all 0.3s ease;
}
input[type="radio"] {
	display: none;
}
#option-1:checked:checked ~ .option-1,
#option-2:checked:checked ~ .option-2 {
	border-color: #0069d9;
	background: #0069d9;
}
#option-1:checked:checked ~ .option-1 .dot,
#option-2:checked:checked ~ .option-2 .dot {
	background: #fff;
}
#option-1:checked:checked ~ .option-1 .dot::before,
#option-2:checked:checked ~ .option-2 .dot::before {
	opacity: 1;
	transform: scale(1);
}
.wrapper .option span {
	font-size: 20px;
	color: #808080;
}
#option-1:checked:checked ~ .option-1 span,
#option-2:checked:checked ~ .option-2 span {
	color: #fff;
}
#containerTipInterviu {
	margin-top: 30px;
}
</style>