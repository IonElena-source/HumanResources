<template>
	<div>
			<label class="switch">
						<input type="checkbox" disabled class="inputSwitch"  @change="schimbaRestrictia" v-model="checked"/>
						<span class="slider"></span>
					</label>
		<div id="infoSetari">
			<p class="notification is-danger is-light" id="pInfoNotificari">
				Adeverinta de angajator emisa pentru fiecare angajat pentru a putea
				circula pe perioada restrictiilor va fii enuntata conform setarilor.
			</p>
		</div>

		<div id="container">
			<div class="field">
				<label class="label" id="labelNumeCompanie"> Companie</label>

				<div class="control" style="display: inline-block">
					<input
						class="input is-info"
						type="text"
						disabled
						placeholder=""
						id="inputNumeCompanie"
					/>
					<div>
						<label class="labelSemnatura label" style="display: none"
							>Semantura</label
						>
						<canvas
							id="uid"
							class="canvas"
							data-uid="uid"
							style="
								border: 1px solid black;
								display: table-cell;
								visibility: hidden;
							"
						></canvas>
					</div>
				</div>
			</div>
			<button
				class="button is-danger"
				id="btnSterge"
				disabled
				@click="stergeSemantura"
				style="visibility: hidden"
			>
				Sterge Sematura
			</button>
			<div class="field">
				<label class="label" id="labelLocDesfasurare"
					>Locul de desfășurare al activității
				</label>
				<div class="control">
					<input
						class="input is-info"
						type="text"
						disabled
						placeholder=""
						id="inputLocatie"
					/>
				</div>
			</div>
			<div class="field">
				<label class="label" id="labelAdresa">Adresa </label>
				<span id="iconLocatie" class="icon has-text-info"
					><i class="fas fa-map-marker-alt fa-lg"></i
				></span>
				<div class="control">
					<input
						class="input is-info"
						type="text"
						disabled
						placeholder=""
						id="inputAdresa"
					/>
				</div>
			</div>
			<!-- <p class="notification is-danger is-light" id="pStrict">Setari stricte corespunzatoare restrictiilor</p> -->
			<div class="field">
				<label class="label" id="labelMijlocDeplasare">Mijloc Deplasare </label>
				<div class="control">
					<input
						class="input is-info"
						type="text"
						disabled
						placeholder=""
						id="inputMijloc"
					/>
				</div>
			</div>
			<div class="field">
				<label class="label" id="labelInterval"
					>Intervalul orar restrictionat
				</label>
				<div class="control" id="containerInterval">
					<input
						class="input is-info"
						type="time"
						disabled
						placeholder=""
						id="inputOraInceput"
					/>
					
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -

					<input
						class="input is-info"
						type="time"
						disabled
						placeholder=""
						id="inputOraSfarsit"
					/>
				</div>
			</div>
		</div>
	
		<span id="iconCompanie" class="icon has-text-info"
			><i class="fas fa-briefcase fa-lg"></i
		></span>
		<span id="iconAdress" class="icon has-text-info"
			><i class="fas fa-map-pin fa-lg"></i
		></span>
		<span id="iconTransport" class="icon has-text-info"
			><i class="fas fa-car-side fa-lg"></i
		></span>
		<button class="button is-info" @click="editeaza" id="btnEditeaza">
			<span class="icon is-small">
				<i class="fas fa-pen"></i>
			</span>
			<span>Editeaza</span>
		</button>
		<button
			class="button is-success"
			disabled
			@click="salveaza"
			id="btnSalveaza"
		>
			<span class="icon is-small">
				<i class="fas fa-check"></i>
			</span>
			<span>Salveaza</span>
		</button>

		<button
			class="button is-danger"
			disabled
			@click="anuleaza"
			id="btnAnuleaza"
		>
			<span class="icon is-small">
				<i class="fas fa-times"></i>
			</span>
			<span>Anuleaza</span>
		</button>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "SetariCompanie",
	data() {
		return {
			signaturePad: {},
			dataURL: "",
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			checked:"",
			motiv:false,
			companie: {},
		};
	},
	mounted() {
		axios.get("http://localhost:5000/companie").then((response) => {
			this.companie = response.data.istoric[response.data.istoric.length - 1];
			document.getElementById("inputNumeCompanie").value =
				this.companie.NumeCompanie;

			document.getElementById("inputLocatie").value = this.companie.Locatie;

			document.getElementById("inputAdresa").value = this.companie.Adresa;

			document.getElementById("inputMijloc").value =
				this.companie.MijlocTransport;

			document.getElementById("inputOraInceput").value =
				this.companie.Ora_Inceput_Restrictie;

			document.getElementById("inputOraSfarsit").value =
				this.companie.Ora_Sfarsit_Restrictie;

			if(this.companie.Motiv){
				document.getElementsByClassName("inputSwitch")[0].checked=true
			}	
			else{
				document.getElementsByClassName("inputSwitch")[0].checked=false
			}
		});
	},
	methods: {
		schimbaRestrictia(){
			if(this.checked){
				//inseamna ca avem o restrictie de ore activa 
				this.motiv=true
			}else{
				this.motiv=false
			}
		},
		editeaza() {
			document.getElementById("inputNumeCompanie").disabled = false;
			document.getElementById("inputLocatie").disabled = false;
			document.getElementById("inputAdresa").disabled = false;
			document.getElementById("inputMijloc").disabled = false;
			document.getElementById("inputOraInceput").disabled = false;
			document.getElementById("inputOraSfarsit").disabled = false;
			document.getElementById("btnSalveaza").disabled = false;
			document.getElementById("btnAnuleaza").disabled = false;
			document.getElementById("btnSterge").disabled = false;
			document.getElementsByClassName("inputSwitch")[0].disabled=false;
		},
		stergeSemantura() {
			this.signaturePad.clear();
		},
		salveaza() {
			let numeCompanie = document.getElementById("inputNumeCompanie").value;

			let adresa = document.getElementById("inputAdresa").value;

			let locatie = document.getElementById("inputLocatie").value;

			let mijloc = document.getElementById("inputMijloc").value;

			let oraInceput = document.getElementById("inputOraInceput").value + "";

			let oraSfarsit = document.getElementById("inputOraSfarsit").value + "";

			let companie = {
				NumeCompanie: numeCompanie,
				MijlocTransport: mijloc,
				Locatie: locatie,
				Adresa: adresa,
				Ora_Inceput_Restrictie: oraInceput,
				Ora_Sfarsit_Restrictie: oraSfarsit,
				Motiv:this.motiv
			};
			axios.post("http://localhost:5000/companie", companie).then(() => {
				alert("Actualizare reusita");
			});

			console.log(this.dataURL);
		},
		anuleaza() {
			document.getElementById("inputNumeCompanie").disabled = true;
			document.getElementById("inputLocatie").disabled = true;
			document.getElementById("inputAdresa").disabled = true;
			document.getElementById("inputMijloc").disabled = true;
			document.getElementById("inputOraInceput").disabled = true;
			document.getElementById("inputOraSfarsit").disabled = true;
			document.getElementById("btnSalveaza").disabled = true;
		},
	},
};
</script>
<style>
#title {
	font-size: 29px;
	font-weight: 300;
}

#field {
	border-left: 1px solid #000;
	width: 100px;
}
#labelNumeCompanie {
	margin-left: -55px;
	text-align: center;
	align-content: center;
	color: rgb(64, 78, 158);
	font-size: 20px;
}
#inputNumeCompanie {
	margin-left: 15px;
	padding-left: 50px;
	width: 350px;
	margin-bottom: 10px;
}
#iconCompanie {
	position: absolute;
	margin-top: -426px;
	margin-left: -390px;
}
#iconCompanieI {
	width: 40px;
	height: 70px;
}
#container {
	width: 500px;
	margin-top: 20px;
	margin-left: 20px;
}
#labelLocDesfasurare {
	margin-left: -20px;
	margin-top: -192px;
	color: rgb(64, 78, 158);
	font-size: 20px;
}
#iconLocatie {
	position: absolute;
	margin-left: -152px;

	margin-top: -85px;
}
#inputLocatie {
	width: 350px;
	padding-left: 50px;
	margin-left: 15px;
}
#labelAdresa {
	color: rgb(64, 78, 158);
	font-size: 20px;
	margin-left: -70px;
}
#infoSetari {
	margin-left: 10px;
	margin-right: 10px;
}

#pInfoNotificari {
	text-align: left;
}
#containerInterval {
	display: table;
	margin-left: 120px;
}
#inputOraInceput,
#inputOraSfarsit {
	display: table-cell;
	width: 110px;
	margin-right: 10px;
	text-align: center;
	height: 10px;
}
#inputAdresa {
	width: 350px;
	margin-left: 15px;
	padding-left: 50px;
	margin-bottom: 20px;
}
#pStrict {
	text-align: left;
	padding-top: 5px;
	height: 20px;
}
#labelMijlocDeplasare {
	margin-left: -13px;
	color: rgb(64, 78, 158);
	font-size: 20px;
}
#inputMijloc {
	padding-left: 50px;
	width: 350px;
	margin-left: 15px;
}
#labelInterval {
	color: rgb(64, 78, 158);
	font-size: 20px;
	margin-left: 20px;
}
#containerInterval {
	margin-left: 150px;
}
.canvas {
	float: right;
	margin-right: -720px;
	width: 250px;
}
.labelSemnatura {
	position: absolute;
	color: rgb(64, 78, 158);
	font-size: 20px;
	margin-left: 860px;
	margin-top: -46px;
	margin-bottom: 170px;
}
#iconAdress {
	position: absolute;
	margin-top: -240px;
	margin-left: -390px;
}
#iconTransport {
	position: absolute;
	margin-top: -129px;
	margin-left: -390px;
}
.button {
	margin-top: 20px;
	margin-right: 10px;
}
#btnSterge {
	margin-left: 950px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.switch{
	position: absolute;
	margin-top: 520px;
	margin-left: -620px;
}

</style>