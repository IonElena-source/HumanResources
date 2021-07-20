<template>
	<div class="testbox">
		<div class="form">
			<h1>HR Complaint Form</h1>

			<div class="item" style="visibility:hidden">
				<p>Department:</p>
				<input type="text" name="name" />
			</div>
			<div class="item" style="visibility:hidden">
				<p>Phone:</p>
				<input type="text" name="name" />
			</div>
			<div class="item">
				<p>Data Incidentului:</p>
				<input type="date" name="name" id="inputData" />
				<i class="fas fa-calendar-alt"></i>
			</div>
			<div class="item">
				<p>Ora incidentului:</p>
				<input type="time" name="name" id="inputOra" />
			</div>
			<div class="item">
				<p>Locatia incidentului:</p>
				<textarea rows="3" id="inputLocatie"></textarea>
			</div>
			<div class="item">
				<p>Detalii despre incident:</p>
				<textarea rows="5" id="inputDetalii"></textarea>
			</div>
			<div class="item">
				<p>Martori, daca este cazul</p>
				<textarea rows="5" id="inputMartori"></textarea>
			</div>
			<div class="item">
				<p>Sugestii:</p>
				<textarea rows="5" id="inputSugestii"></textarea>
			</div>
			<div class="item">
				<p>Comentarii aditionale</p>
				<textarea rows="5" id="inputComentarii"></textarea>
			</div>
			<div class="btn-block">
				<button @click="adaugaFeedback">Trimite feedback</button>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "Feedback",
	data() {
		return {
			angajatLogat: JSON.parse(localStorage.getItem("angajatLogat")),
		};
	},

	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth");
		}
	},
	methods: {
		adaugaFeedback() {
			let dataIncident = document.getElementById("inputData").value;
			let oraIncident = document.getElementById("inputOra").value;
			let locatie = document.getElementById("inputLocatie").value;
			let detalii = document.getElementById("inputDetalii").value;
			let Martori = document.getElementById("inputMartori").value;
			let sugestii = document.getElementById("inputSugestii").value;
			let comentarii = document.getElementById("inputComentarii").value;

			let feedback = {
				Data_Incident: dataIncident,
				Ora_Incident: oraIncident,
				Locatie_Incident: locatie,
				Incident_Detalii: detalii,
				Martori_Incident: Martori,
				Sugestii: sugestii,
				Comentarii: comentarii,
				Angajat: this.angajatLogat._id,
			};
			//
			axios
				.post("http://localhost:5000/feedback/adaugaFeedback", feedback)
				.then(() => {
					alert("Feedback adaugat");
					document.getElementById("inputData").value=""
					document.getElementById("inputOra").value=""
					document.getElementById("inputLocatie").value=""
					document.getElementById("inputDetalii").value=""
					document.getElementById("inputMartori").value=""
					document.getElementById("inputSugestii").value=""
					document.getElementById("inputComentarii").value=""
				});
			console.log(feedback);
		},
	},
};
</script>
<style scoped>
.testbox {
	min-height: 60%;
}
body,
div,
.form,
input,
select,
textarea,
p {
	padding: 0;
	margin: 0;
	outline: none;
	font-family: Roboto, Arial, sans-serif;
	font-size: 17px;
	color: rgb(25, 23, 23);
	line-height: 22px;
}
h1 {
	margin: 15px 0;
	font-weight: 400;
}
.testbox {
	display: flex;
	justify-content: center;
	align-items: center;
	height: inherit;
	padding: 3px;
}
.form {
	width: 60%;
	padding: 20px;
	background: #fff;
	box-shadow: 0 2px 5px #ccc;
}
input,
select,
textarea {
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 3px;
}
input:hover,
select:hover,
textarea:hover {
	outline: none;
	box-shadow: 0 0 5px 0 #095484;
}
input {
	width: calc(100% - 10px);
	padding: 5px;
}
select {
	width: 100%;
	padding: 7px 0;
	background: transparent;
}
textarea {
	width: calc(100% - 2px);
	paddung: 5px;
}
.item {
	position: relative;
	margin: 10px 0;
}
.item:hover p,
.item:hover i {
	color: #095484;
}
input:hover,
select:hover,
textarea:hover {
	box-shadow: 0 0 5px 0 #095484;
}
.status:hover input {
	box-shadow: none;
}
.status label:hover input {
	box-shadow: 0 0 5px 0 #095484;
}
.status-item input,
.status-item span {
	width: auto;
	vertical-align: middle;
}
.status-item input {
	margin: 0;
}
.status-item span {
	margin: 0 20px 0 5px;
}
input[type="date"]::-webkit-inner-spin-button {
	display: none;
}
input[type="time"]::-webkit-inner-spin-button {
	margin: 2px 22px 0 0;
}
.item i,
input[type="date"]::-webkit-calendar-picker-indicator {
	position: absolute;
	font-size: 20px;
	color: #a9a9a9;
}
.item i {
	right: 1%;
	top: 30px;
	z-index: 1;
}
[type="date"]::-webkit-calendar-picker-indicator {
	right: 0;
	z-index: 2;
	opacity: 0;
	cursor: pointer;
}
.btn-block {
	margin-top: 20px;
	text-align: center;
}
button {
	width: auto;
	padding: 10px;
	border: none;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	background-color: #095484;
	font-size: 16px;
	color: #fff;
	cursor: pointer;
}
button:hover {
	background-color: #0666a3;
}
@media (min-width: 568px) {
	.name-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.name-item input {
		width: calc(50% - 20px);
	}
}
</style>