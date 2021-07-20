<template>
	<div class="containerm">
		<div class="modal">
			<div class="modal-background"></div>
			<div class="modal-content">
				<span id="titluLocatie">
					<i class="fas fa-map-marker-alt"></i> Locatie
				</span>
				<span id="locatieIncident"
					>Locatie locatie locatie locatie locatie locatie</span
				>
				<span id="titluDetalii">
					<img src="../assets/loupe.png" id="imgDetalii" />Detalii
				</span>
				<span id="detaliiIncident"
					>Detaliiiiiiiiiiiiiiii
					DetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiii
					DetaliiiiiiiiiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiii
					Detaliiiiiiiiiiiiiiii DetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiii
					Detaliiiiiiiiiiiiiiii Detaliiiiiiiiiiiiiiii Detaliiiiiiiiiiiiiiii
					Detaliiiiiiiiiiiiiiii
				</span>
				<span id="titluMartori">
					<img src="../assets/witness.png" /> Martori</span
				>
				<span id="martoriIncident"></span>
				<span id="titluSugestii">Sugestii</span>
				<span id="sugestiiIncident"
					>Detaliiiiiiiiiiiiiiii
					DetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiii
					DetaliiiiiiiiiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiii
					Detaliiiiiiiiiiiiiiii DetaliiiiiiiiiiiiiiiiDetaliiiiiiiiiiiiiiii
					Detaliiiiiiiiiiiiiiii Detaliiiiiiiiiiiiiiii Detaliiiiiiiiiiiiiiii
					Detaliiiiiiiiiiiiiiii
				</span>
				<span id="titluComentarii">Comentarii</span>
				<span id="comentariiIncident">Comentariiiiiiii</span>
			</div>
			<button
				class="modal-close is-large"
				aria-label="close"
				@click="inchideIncident"
			></button>
		</div>
		<div class="columns">
			<div class="column is-9">
				<section class="info-tiles">
					<div class="tile is-ancestor has-text-centered cards">
						<div class="tile is-parent cutie">
							<article class="tile is-child box">
								<p class="title">
									<span class="loader title" v-if="numarAngajati == 0"></span>
									<span v-if="numarAngajati != 0">{{ numarAngajati }}</span>
								</p>
								<p class="subtitle">Angajati</p>
							</article>
						</div>
						<div class="tile is-parent cutie">
							<article class="tile is-child box">
								<p class="title">
									<span class="loader title" v-if="numarJoburi == 0"></span>
									<span v-if="numarJoburi != 0">{{ numarJoburi }}</span>
								</p>

								<p class="subtitle">Joburi disponibile</p>
							</article>
						</div>
						<div class="tile is-parent cutie">
							<article class="tile is-child box card">
								<p class="title">
									<span
										class="loader title"
										v-if="nrCereriNeverificate == 0"
									></span>
									<span v-if="nrCereriNeverificate != 0">{{
										nrCereriNeverificate
									}}</span>
								</p>
								<p class="subtitle">Cereri</p>
							</article>
						</div>
						<div class="tile is-parent cutie">
							<article class="tile is-child box card">
								<p class="title" id="evenimente"></p>
								<p class="subtitle">Evenimente</p>
							</article>
						</div>
					</div>
				</section>
				<div class="columns">
					<div class="column is-6" id="zileDeNastere">
						<div class="">
							<p class="card-header-title" style="font-size:18px">Incidente</p>

							<div class="">
								<div class="content">
									<table class="table tbodyTable">
										<tbody>
											<tr
												class="survey-item"
												v-for="(feedback, index) in feedbacks"
												:key="index"
											>
												<span>
													<span id="dataTitlu"
														><i
															class="fas fa-calendar-week"
															style="font-size: 20px"
														></i>
														Data
													</span>
													{{ feedback.Data_Incident }}
												</span>
												<br />
												<br />
												<span>
													<span id="oraTitlu"
														><i
															class="fas fa-clock"
															style="font-size: 20px"
														></i>
														Ora
													</span>
													{{ feedback.Ora_Incident }}</span
												>
												<br />
												<br />
												<span
													><span id="angajatTitlu"
														><i
															class="fas fa-user-alt"
															style="font-size: 20px"
														></i>
														&nbsp; Angajat
													</span>
													{{ feedback.Angajat.Nume }}
													{{ feedback.Angajat.Prenume }}</span
												>
												<i
													class="fas fa-info-circle"
													id="infoIcon"
													@click="arataIncident(feedback)"
												></i>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div id="chart">
						<apexchart
							type="line"
							:height="heightGrafic"
							:options="chartOptions"
							:series="series"
						></apexchart>
					</div>
				</div>
			</div>
		</div>
		<button @click="afiseazaSetari" id="btnSetari" class="button is-danger is-light"><i class="fas fa-cogs"></i> <span style="padding-left:10px"> Setari</span> </button>
	
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
	name: "General",
	data() {
		return {
			user: {},
			numarAngajati: 0,
			numarJoburi: 0,
			numarCereri: 0,
			xGrafic: [],
			yGrafic: [],
			dictGrafic: {},
			heightGrafic: 350,
			feedbacks: [],
			obiective: [],
			toateObiectivele: [],
			lunaCurenta: 0,
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			sarbatoriti: [],
			series: [
				{
					name: "Desktops",
					data: [],
				},
			],
			chartOptions: {
				chart: {
					height: 350,
					type: "line",
					zoom: {
						enabled: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: "straight",
				},
				title: {
					text: "OKR-ul companiei in ultimele 4 luni",
					align: "left",
				},
				grid: {
					row: {
						colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
						opacity: 0.5,
					},
				},
				xaxis: {
					categories: this.xGrafic,
				},
			},
		};
	},
	watch: {
		chartOptions: function () {},
		series: function () {},
		xGrafic: function () {},
		heightGrafic: function () {},
	},
	computed: {
		...mapGetters(["notifications"]),
		cNotifications() {
			return this.$store.state.notifications;
		},
		userCurent: function () {
			return this.user;
		},
		...mapGetters(["toateCererileNeverificate"]),

		nrCereriNeverificate: {
			get() {
				return this.toateCererileNeverificate.length;
			},
		},
	},
	methods: {
		inchideIncident() {
			document.getElementsByClassName("modal")[0].classList.remove("is-active");
		},
		afiseazaSetari() {
			this.$router.push("/setari");
		},
		showUser() {
			console.log(this.user);
		},
		showNotif() {
			console.log(this.xGrafic);
		},
		arataIncident(feedback) {
			document.getElementById("locatieIncident").innerHTML =
				feedback.Locatie_Incident;
			document.getElementById("sugestiiIncident").innerHTML = feedback.Sugestii;
			document.getElementById("martoriIncident").innerHTML =
				feedback.Martori_Incident;
			document.getElementById("detaliiIncident").innerHTML =
				feedback.Incident_Detalii;

			document.getElementById("comentariiIncident").innerHTML=feedback.Comentarii
			document.getElementsByClassName("modal")[0].classList.add("is-active");

			console.log(feedback);
		},
	},
	created() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/manageri/auth");
		}
	},
	mounted() {
		axios.get("http://localhost:5000/evenimente").then((response) => {
			document.getElementById("evenimente").innerHTML =
				response.data.evenimente.length;
		});
		//request pt numaru de angajati
		axios.get("http://localhost:5000/angajati").then((response) => {
			this.numarAngajati = response.data.angajati.length;
		});
		axios.get("http://localhost:5000/joburi").then((response) => {
			let listaJoburi = [];
			listaJoburi = response.data.joburi;
			let listaJoburiDisponibile = [];
			let today = new Date();
			for (let i = 0; i < listaJoburi.length; i++) {
				let job = listaJoburi[i];
				if (
					new Date(
						`${job.Perioada_Aplicare_Sfarsit.split(".")[2]}-${
							job.Perioada_Aplicare_Sfarsit.split(".")[1]
						}-${job.Perioada_Aplicare_Sfarsit.split(".")[0]}`
					).getTime() > today.getTime()
				) {
					listaJoburiDisponibile.push(job);
				}
			}
			this.numarJoburi = listaJoburiDisponibile.length;
		});

		axios
			.get("http://localhost:5000/cereri/regasesteCereriNeverificate")
			.then((response) => {
				this.numarCereri = response.data.cereri.length;
			});

		const dateObj = new Date();
		const monthCurrent = dateObj.getMonth() + 1;
		this.lunaCurenta = monthCurrent;
		this.dict = {
			"01": 0,
			"02": 0,
			"03": 0,
			"04": 0,
			"05": 0,
			"06": 0,
			"07": 0,
			"08": 0,
			"09": 0,
			10: 0,
			11: 0,
			12: 0,
		};
		axios.get("http://localhost:5000/obiective").then((response) => {
			console.log("obiective");
			console.log(response.data.obiective);

			for (let i = 0; i < response.data.obiective.length; i++) {
				let dataObiectiv = response.data.obiective[i].Data;

				let month = dataObiectiv.split("-")[1];
				var suma = 0;
				for (let j = 0; j < response.data.obiective[i].Rezultate.length; j++) {
					suma += parseInt(response.data.obiective[i].Rezultate[j].Scor);
					response.data.obiective[i].Medie = Math.round(
						suma / response.data.obiective[i].Rezultate.length
					);
				}
				this.toateObiectivele.push(response.data.obiective[i]);
				if (month >= 10) {
					if (month == monthCurrent) {
						this.obiective.push(response.data.obiective[i]);
					}
				} else {
					let luna = month.replace("0", "");
					if (luna == monthCurrent) {
						this.obiective.push(response.data.obiective[i]);
					}
				}
			}
			for (let key in this.dict) {
				console.log(key);
				var nr = 0;
				var sumaLuna = 0;
				for (let j = 0; j < this.toateObiectivele.length; j++) {
					if (this.toateObiectivele[j].Data.split("-")[1] == key) {
						nr++;
						sumaLuna += this.toateObiectivele[j].Medie;
					}
				}
				if (nr == 0) {
					this.dict[key] = 0;
				} else {
					this.dict[key] = Math.round(sumaLuna / nr);
				}

				this.dictGrafic = {};
				this.dictGrafic["Ian"] = this.dict["01"];
				this.dictGrafic["Febr"] = this.dict["02"];
				this.dictGrafic["Martie"] = this.dict["03"];
				this.dictGrafic["Apr"] = this.dict["04"];
				this.dictGrafic["Mai"] = this.dict["05"];
				this.dictGrafic["Iunie"] = this.dict["06"];
				this.dictGrafic["Iulie"] = this.dict["07"];
				this.dictGrafic["Aug"] = this.dict["08"];
				this.dictGrafic["Sept"] = this.dict["09"];
				this.dictGrafic["Oct"] = this.dict["10"];
				this.dictGrafic["Nov"] = this.dict["11"];
				this.dictGrafic["Dec"] = this.dict["12"];

				this.xGrafic = [];
				this.yGrafic = [];
				for (key in this.dictGrafic) {
					this.xGrafic.push(key);
					this.yGrafic.push(this.dictGrafic[key]);
				}

				this.xGrafic = this.xGrafic.slice(
					this.lunaCurenta - 5,
					this.lunaCurenta
				);
				this.yGrafic = this.yGrafic.slice(
					this.lunaCurenta - 5,
					this.lunaCurenta
				);
			}

			this.chartOptions = {
				...this.chartOptions,
				...{
					xaxis: {
						categories: this.xGrafic,
					},
				},
			};
			this.heightGrafic = 380.5;
			this.series[0].name = "OKR";
			this.series[0].data = this.yGrafic;
		});

		axios.get("http://localhost:5000/feedback").then((response) => {
			this.feedbacks = response.data.feedbacks;
			console.log(this.feedbacks);
		});
	},
};
</script>
<style scoped>
.containerm {
	margin-top: 10px;
	margin-left: 70px;
	overflow: hidden;
}
.title {
	color: #000;
}
.hero {
	width: 1380px;
	background: rgba(241, 241, 247, 0.918);

	text-align: left;
	color: rgb(182, 205, 255);
	margin-bottom: 50px;
}
.cards {
	margin-left: 70px;
	width: 70vw;
}
.cutie {
	margin-right: 60px;
}
#chart {
	margin-top: 110px;
	margin-left: -160px;
	width: 60vw;
	height: 60vh;
}
.columns {
	width: 72vw;
}
.content {
	width: 20vw;
}
.card-table {
	width: 40vw;
}
.loader {
	margin-left: 75px;
	color: black;
	border-top: 6px solid rgb(15, 16, 17);
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
#zileDeNastere {
	margin-top: 70px;
}

.survey-item {
	display: block;
	margin-top: 10px;
	padding: 30px;
	border: 1px solid black;
	border-radius: 2px;
	width: 340px;
	background: white;
	box-shadow: 10 2px 1px rgba(170, 170, 170, 0.25);
	padding-top: 10px;
}
.tbodyTable {
	display: block;

	height: 400px;
	overflow: auto;
}
.tbodyTable::-webkit-scrollbar {
	display: none;
}
#dataTitlu {
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	margin-left: -180px;
	padding-top: 10px;
	margin-top: 25px;
}
#oraTitlu {
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	margin-left: -230px;
	margin-top: 25px;
}
#angajatTitlu {
	margin-top: 25px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	margin-left: -120px;
}
#infoIcon {
	position: absolute;
	margin-top: 25px;
	font-size: 23px;
	cursor: pointer;
	margin-left: 60px;
}
.modal-content {
	background-color: white;
	height: 70vh;
	width: 40vw;
}
#titluDataIncident {
	position: absolute;
	font-size: 20px;
	margin-top: 30px;
	margin-left: -260px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#dataIncident {
	position: absolute;
	font-size: 20px;
	margin-top: 30px;
	margin-left: -190px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#titluLocatie {
	display: block;
	font-size: 20px;
	margin-top: 30px;
	text-align: center;
	font-style: italic;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#locatieIncident {
	display: block;
	font-size: 20px;
	margin-top: 10px;
	text-align: center;
	font-family: Arial, Helvetica, sans-serif;
}
#titluDetalii {
	display: block;
	font-size: 20px;
	margin-top: 30px;
	text-align: center;
	font-style: italic;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#imgDetalii {
	font-size: 20px;
	margin-top: 10px;
	margin-left: -15px;
	margin-right: 10px;
}
#titluMartori {
	display: block;
	font-size: 20px;
	margin-top: 40px;
	text-align: center;
	font-style: italic;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#chat {
	position: absolute;
	font-size: 20px;
	margin-top: 55px;
	margin-left: -115px;
	margin-right: 10px;
}
#titluSugestii {
	display: block;
	font-size: 20px;
	margin-top: 27px;
	margin-left: -5px;
	text-align: center;
	font-style: italic;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#sugestiiIncident {
}
#comentariu {
	position: absolute;
	font-size: 20px;
	margin-top: 55px;
	margin-left: -120px;
	margin-right: 10px;
}
#titluComentarii{
	display: block;
	font-size: 20px;
	margin-top: 27px;
	margin-left: 5px;
	text-align: center;
	font-style: italic;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
}
#btnSetari{
	margin-top: -30px;
	margin-left: 820px;
}
</style>