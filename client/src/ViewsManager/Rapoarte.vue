<template>
	<div>
		<!-- <button @click="test2">test2</button>
		<button @click="test">test</button> -->
		<button
			@click="deschideModalRaport"
			id="btnAdaugaRaport"
			class="button is-success is-light"
		>
			Adauga raport anual
		</button>

		<h2 id="h2Titlu">Alege anul raportului</h2>
		<div class="select is-info" id="divSelectAn">
			<select id="selectAnRaport" @change="analizeazaRaport"></select>
		</div>
		<a :href="`./files/${raport_Selectat}`" :download="`${raport_Selectat}`">
			<i class="fas fa-cloud-download-alt" id="downloadIcon"></i>
		</a>

		<div class="modal">
			<div class="modal-background"></div>
			<div class="modal-content" id="modalRaport">
				<div class="select is-link" id="divSelect">
					<select
						name="yearpicker"
						id="yearpicker"
						v-model="an"
						class="select is-multiple"
					></select>
				</div>

				<div class="field" id="divInputExcel">
					<div class="file is-boxed is-primary is-light">
						<label class="file-label">
							<input
								id="inputExcel"
								type="file"
								ref="file"
								accept=".xlsx,.xls"
								@change="selectFile"
								class="file-input"
							/>

							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label"> Incarca rapoart </span>
							</span>
							<span v-if="file" class="file-name">{{ file.name }}</span>
						</label>
					</div>
					<div class="field">
						<button
							class="button is-success"
							@click="sendFile"
							id="btnSalveaza"
						>
							Salveaza
						</button>
					</div>
					<!-- <div class="field">
						<button class="button is-info" @click="analizeaza">
							Previziune
						</button>
					</div> -->
				</div>
			</div>
			<button
				class="modal-close is-large"
				aria-label="close"
				@click="inchideModal"
			></button>
		</div>

		<div id="divHistograme">

			<button
				@click="arataAnaliza"
				id="btnAnaliza"
				class="button is-info is-light"
			>
				Analiza
			</button>
			<button @click="arataRapoarte" class="button is-info is-light">
				Rapoarte
			</button>
			<h2 v-if="displayAnaliza" id="titluInfluenta">Impactul caracteristicilor angajatilor asupra plecarii acestora din companie</h2>
			<img :src="`/files/hr_histogram_plots${srcPoza}.png`" id="imgHistograme" v-if="displayRapoarte" />
			<img :src="`/files/analiza${srcPoza}.png`" id="" v-if="displayAnaliza" />
			<img
				
				
				:src="`/files/salariuBarChart${srcPoza}.png`"
				id="imgHistograme"
				v-if="displayRapoarte"
			/>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "Rapoarte",
	data() {
		return {
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			file: "",
			publicPath: process.env.BASE_URL,
			an: 0,
			rapoarte: [],
			rapoarteAni: [],
			numeFisierSelectat: "",
			raportAnaliza: "",
			displayAnaliza: true,
			displayRapoarte: false,
			raport_Selectat: "",
			srcPoza: `/files/hr_histogram_plots.png`,
			dateGrafic: [],
			srcAnaliza:`/files/analiza.png`,
			labelsGrafic: [],
			series: [
				{
					data: [],
				},
			],
			chartOptions: {
				chart: {
					type: "bar",
					height: 350,
				},
				plotOptions: {
					bar: {
						borderRadius: 4,
						horizontal: true,
					},
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					categories: [
						"Nivel satisfactie",
						"Ultima evaluare",
						"Timp în companie(în ani)",
						"Incidente la munca",
						"Promovat",
						"Salariu_mare",
						"Salariu_mic",
					],
				},
			},
		};
	},
	methods: {
		getRaportSelectat() {
			let anSelectat = document.getElementById("selectAnRaport").value;
			axios
				.get("http://localhost:5000/rapoarte/gasesteDupaAn/" + anSelectat)
				.then((response) => {
					var raportGasit = response.data.raportGasit;
					this.raport_Selectat = raportGasit.Denumire_Raport;
				});
		},
		arataAnaliza() {
			this.displayAnaliza = true;
			this.displayRapoarte = false;
		},
		arataRapoarte() {
			this.displayAnaliza = false;
			this.displayRapoarte = true;
		},
		test2() {
			console.log(this.dateGrafic);
		},
		test() {
			let anSelectat = document.getElementById("selectAnRaport").value;

			//gasesc fisierul dupa anul selectat
			axios
				.get("http://localhost:5000/rapoarte/gasesteDupaAn/" + anSelectat)
				.then((response) => {
					var raportGasit = response.data.raportGasit;
					console.log("Raport pt anul " + anSelectat);
					console.log(raportGasit);
					let numeFisier = raportGasit.Denumire_Raport;
					console.log(numeFisier);
					//trimit pentru previziune fisierul gasit
					axios
						.get(`http://localhost:5000/previziune/` + numeFisier)
						.then((response) => {
							console.log("Previziune");
							//aici primesc ce imi intoarce scriptul de py, cele 5 caracteristici care vor infleunta
							console.log(response.data);

							// var raport = response.data.split(",");
							// var dictGrafic = {
							// 	"Nivel satisfactie": 30,
							// 	"Ultima evaluare": 20,
							// 	"Timp în companie(în ani)": 60,
							// 	"Incidente la munca": 30,
							// 	Promovat: 30,
							// 	Salariu_mare: 70,
							// 	Salariu_mic: 10,
							// };

							// for (let key in dictGrafic) {
							// 	this.dateGrafic.push(dictGrafic[key]);
							// }

							// console.log(this.dateGrafic);
							// this.series[0].data = this.dateGrafic;
							// console.log(raport[0]);
						});
				});
		},
		inchideModal() {
			document.getElementsByClassName("modal")[0].classList.remove("is-active");
		},
		deschideModalRaport() {
			document.getElementsByClassName("modal")[0].classList.add("is-active");
		},
		selectFile() {
			this.file = this.$refs.file.files[0];
		},
		analizeazaRaport() {
			let anSelectat = document.getElementById("selectAnRaport").value;
			this.srcPoza=anSelectat

	
			//gasesc fisierul dupa anul selectat
			axios
				.get("http://localhost:5000/rapoarte/gasesteDupaAn/" + anSelectat)
				.then((response) => {
					var raportGasit = response.data.raportGasit;
					this.raport_Selectat = raportGasit.Denumire_Raport;
					

				});
		},
		analizeaza() {},
		async sendFile() {
			const formData = new FormData();

			formData.append("file", this.file);
			formData.append("Denumire_Raport", this.file.name);
			formData.append("An", this.an);
			let An = this.an;
			try {
				await axios
					.post(`http://localhost:5000/rapoarte/adaugaRaport/${An}`, formData)
					.then(() => {
						alert("Raport adaugat");
						
						axios
							.get("http://localhost:5000/rapoarte/gasesteDupaAn/" + An)
							.then((response) => {
								var raportGasit = response.data.raportGasit;
								console.log("Raport pt anul " + An);
								console.log(raportGasit);
								let numeFisier = raportGasit.Denumire_Raport;
								console.log(numeFisier);
								//trimit pentru previziune fisierul gasit
								axios
									.get(`http://localhost:5000/previziune/` + numeFisier)
									.then((response) => {
										console.log("Previziune");
										//aici primesc ce imi intoarce scriptul de py, cele 5 caracteristici care vor infleunta
										console.log(response.data);

										// var raport = response.data.split(",");
										// var dictGrafic = {
										// 	"Nivel satisfactie": 30,
										// 	"Ultima evaluare": 20,
										// 	"Timp în companie(în ani)": 60,
										// 	"Incidente la munca": 30,
										// 	Promovat: 30,
										// 	Salariu_mare: 70,
										// 	Salariu_mic: 10,
										// };

										// for (let key in dictGrafic) {
										// 	this.dateGrafic.push(dictGrafic[key]);
										// }

										// console.log(this.dateGrafic);
										// this.series[0].data = this.dateGrafic;
										// console.log(raport[0]);
									});
							});
					});
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		let startYear = 2000;
		let endYear = new Date().getFullYear();
		for (let i = endYear; i > startYear; i--) {
			let optiune = document.createElement("option");
			optiune.value = i;
			optiune.innerHTML = i;
			document.getElementById("yearpicker").appendChild(optiune);
		}

		axios.get("http://localhost:5000/rapoarte").then((response) => {
			this.rapoarte = response.data.rapoarte;
			for (let i = 0; i < this.rapoarte.length; i++) {
				let an = this.rapoarte[i].An;

				this.rapoarteAni.push(an);
				this.rapoarteAni.sort(function (a, b) {
					return a - b;
				});

				//trb sa pun de fiecare data denumirea de la primul raport la raport select
			}
			let primAn = this.rapoarteAni[this.rapoarteAni.length - 1];
			for (let i = 0; i < this.rapoarte.length; i++) {
				if (this.rapoarte[i].An == primAn) {
					this.raport_Selectat = this.rapoarte[i].Denumire_Raport;
				}
			}
			this.srcPoza=primAn
			//ruta ce gaseste contractul pt prim an

			for (let i = this.rapoarteAni.length - 1; i >= 0; i--) {
				let optiune = document.createElement("option");
				optiune.value = this.rapoarteAni[i];
				optiune.innerHTML = this.rapoarteAni[i];
				document.getElementById("selectAnRaport").appendChild(optiune);
			}
		});
	},
};
</script>
<style scoped>
#divInputExcel {
	position: absolute;
	margin-top: 120px;
	width: 180px;
	margin-left: 50px;
	height: 30px;
}
#inputExcel {
	width: 120px;
	height: 30px;
}
#modalRaport {
	background: white;
	width: 30vw;
	height: 50vh;
	margin-left: 620px;
}
#divSelect {
	position: absolute;
	margin-top: 50px;
	margin-left: -210px;
	text-align: center;
	width: 180px;
}
#yearpicker {
	width: 180px;
	text-align: center;
}
#btnSalveaza {
	position: absolute;
	margin-top: 50px;
	margin-left: 180px;
}
#divSelectAn {
	position: absolute;
	margin-top: -79px;
	width: 140px;

	margin-left: -380px;
}
#selectAnRaport {
	position: absolute;
	width: 140px;

	text-align: center;
}
#downloadIcon {
	position: absolute;
	font-size: 35px;
	cursor: pointer;
	color: rgb(137, 190, 255);
	margin-left: -220px;
	margin-top: -80px;
	margin-bottom: 90px;
}
#h2Titlu {
	position: absolute;
	margin-top: -80px;
	margin-left: 80px;
	font-size: 23px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#divHistograme {
	margin-top: 120px;
	padding-top: 20px;
	height: 80vh;
	width: 76vw;
	overflow: scroll;
	margin-left: 22px;
}
#btnAdaugaRaport {
	position: absolute;
	margin-top: -80px;
	margin-left: 350px;
}
#divHistograme::-webkit-scrollbar {
	display: none;
}
#titluInfluenta{
	font-size: 16px;
	margin-top: 10px;
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>