<template>
	<div>
		<div id="myModalScorCandidat" class="modalScorCandidat">
			<!-- Modal content -->
			<div class="modal-contentScorCandidat">
				<span class="closeScorCandidat">&times;</span>
				<div id="myDiv"></div>
			
			</div>
		</div>

		<div id="myModalProgress" class="modalProgress">
			<!-- Modal content -->
			<div class="modal-contentProgress">
				<h1 id="titlu1ProgressFiltrare">Limba detectata este romana</h1>
				<h1 id="titlu2ProgressFiltrare">Filtrare CV Candidat...</h1>
				<div id="loader">
					<progress id="p" value="0" max="100"></progress>
					<output for="p"></output>
				</div>
			</div>
		</div>

		<div id="myModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="closeCandidat">&times;</span>
				<form enctype="multipart/form-data">
					<img src="../assets/candidate.png" />
					<div class="field" id="fieldNumeSiPrenume">
						<label class="label">Nume si Prenume</label>
						<div class="control">
							<input
								class="input is-info"
								type="text"
								placeholder="Nume si Prenume"
								id="inputNumeComplet"
							/>
						</div>
					</div>
					<div class="field" id="fieldMail">
						<label class="label">Email</label>
						<div class="control">
							<input
								class="input is-info"
								type="text"
								placeholder="Email"
								id="inputEmail"
							/>
						</div>
					</div>
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
						<div class="field">
							<button class="button is-info" @click="sendFile">Adauga</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<button class="button is-info is-light" id="btnInapoiJoburi" @click="back">
			<i class="fas fa-arrow-circle-left"></i> &nbsp;&nbsp;
			<span> &nbsp; </span>
			Inapoi la joburi
		</button>
		<button class="button" id="btnAlgoritm" @click="arataAlgoritm">
			<span class="icon is-small">
				<img src="../assets/algorithm.png" />
			</span>
			<span>Filtrare Engleza</span>
		</button>
		<button class="button" id="btnAlgoritmRomana" @click="arataAlgoritmRomana">
			<span class="icon is-small">
				<img src="../assets/algorithm.png" />
			</span>
			<span>Filtrare Romana</span>
		</button>
	
		<div id="myModalAlgoritm" class="modalAlgoritm">
			<!-- Modal content -->
			<div class="modal-contentAlgoritm">
				<span class="closeAlgoritm">&times;</span>
				<h1 id="titluFiltrare">Filtrare CV</h1>
				<div class="algoritm-content">
					<div
						class="content"
						v-for="(skill, index) in Object.keys(algoritm)"
						:key="index"
					>
						<input
							type="text"
							class="inputCheie"
							disabled
							:data-skill="skill"
							:value="skill"
						/>
						<textarea
							class="inputTermeni"
							disabled
							:data-skill="'textarea' + skill"
							:placeholder="algoritm[skill]"
						>
						</textarea>
						<input
							type="text"
							class="input is-primary inputCuvant"
							:data-skill="skill"
							disabled
						/>
						<button
							class="button is-primary is-light btnAdaugaCuvant"
							@click="adaugaCuvant"
							:data-skill="skill"
							disabled
						>
							Adauga Cuvant
						</button>
						<input
							type="text"
							class="input is-danger inputStergeCuvant"
							:data-skill="skill"
							disabled
						/>
						<button
							class="button is-danger is-light btnStergeCuvant"
							:data-skill="skill"
							disabled
							@click="stergeCuvant"
						>
							Sterge Cuvant
						</button>
					</div>
				</div>

				<div class="content" id="buttonGrup">
					<button @click="adaugaSkill" class="button is-success is-light">
						Adauga Skill
					</button>
					<button
						id="btnEditeazaAlgoritm"
						@click="editeazaAlgoritm"
						class="button is-info is-light"
					>
						Editeaza
					</button>
					<button
						class="button is-danger is-light"
						id="btnSalveazaAlgoritm"
						@click="salveazaAlgoritm"
					>
						Salveaza
					</button>
				</div>
			</div>
		</div>

		<div id="myModalAlgoritmRomana" class="modalAlgoritmRomana">
			<!-- Modal content -->
			<div class="modal-contentAlgoritmRomana">
				<span class="closeAlgoritmRomana">&times;</span>
				<h1 id="titluFiltrareAlgoritmRomana">Filtrare CV</h1>
				<div class="algoritm-contentAlgoritmRomana">
					<div
						class="contentAlgoritmRomana"
						v-for="(skill, index) in Object.keys(algoritm_romana)"
						:key="index"
					>
						<input
							type="text"
							class="inputCheieAlgoritmRomana"
							disabled
							:data-skill="skill"
							:value="skill"
						/>
						<textarea
							class="inputTermeniAlgoritmRomana"
							disabled
							:data-skill="'textareaAlgoritmRomana' + skill"
							:placeholder="algoritm_romana[skill]"
						>
						</textarea>
						<input
							type="text"
							class="input is-primary inputCuvantAlgoritmRomana"
							:data-skill="skill"
							disabled
						/>
						<button
							class="button is-primary is-light btnAdaugaCuvantAlgoritmRomana"
							@click="adaugaCuvantAlgoritmRomana"
							:data-skill="skill"
							disabled
						>
							Adauga Cuvant
						</button>
						<input
							type="text"
							class="input is-danger inputStergeCuvantAlgoritmRomana"
							:data-skill="skill"
							disabled
						/>
						<button
							class="button is-danger is-light btnStergeCuvantAlgoritmRomana"
							:data-skill="skill"
							disabled
							@click="stergeCuvantAlgoritmRomana"
						>
							Sterge Cuvant
						</button>
					</div>
				</div>

				<div class="content" id="buttonGrup">
					<button
						@click="adaugaSkillAlgoritmRomana"
						class="button is-success is-light"
					>
						Adauga Skill
					</button>
					<button
						id="btnEditeazaAlgoritm"
						@click="editeazaAlgoritmRomana"
						class="button is-info is-light"
					>
						Editeaza
					</button>
					<button
						class="button is-danger is-light"
						id="btnSalveazaAlgoritm"
						@click="salveazaAlgoritmRomana"
					>
						Salveaza
					</button>
				</div>
			</div>
		</div>
		<button
			@click="adaugaCandidat"
			class="button is-info"
			id="btnAdaugaCandidat"
		>
			<i class="fas fa-plus-circle"></i> &nbsp; <span> Adauga </span>
		</button>
		<div class="limiter">
			<div class="table">
				<div class="row header">
					<div class="cell">Nume Complet</div>
					<div class="cell">Email</div>
					<div class="cell">CV</div>

					<div class="cell">Scor</div>
					<div class="cell">Interviu</div>
				</div>

				<div class="row" v-for="(candidat, index) in candidati" :key="index">
					<div class="cell" data-title="Full Name">
						{{ candidat.Nume_Complet }}
					</div>
					<div class="cell" data-title="Email">{{ candidat.Email }}</div>

					<div class="cell" data-title="Job Title">
						<a :href="`/files/${candidat.Cv}`" :download="`${candidat.Cv}`">
							<img src="../assets/download.png"
						/></a>
					</div>

					<div class="cell" data-title="Location">
						<button @click="scor(candidat)">
							<img src="../assets/pie-chart.png" />
						</button>
					</div>
					<div class="cell" data-title="Location">
						<button @click="programareCandidat(candidat)">
							<img src="../assets/interview1.png" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import Plotly from "plotly.js-dist";
import LanguageDetect from "languagedetect";

export default {
	name: "Candidati",
	data() {
		return {
			job: {},
			file: "",
			publicPath: process.env.BASE_URL,
			id_job: this.$route.params.id_job,
			candidati: [],
			algoritm: {},
			algoritm_romana: {},
			icon: "../assets/skill.png",
		};
	},
	methods: {
		programareCandidat(candidat){
			this.$router.push("/programareInterviu/"+candidat._id)
		},
		respingeCandidat(candidat) {
			axios
				.patch("http://localhost:5000/candidati/trimiteMail", {})
				.then(() => {
					console.log("succes");
				});
			axios
				.delete(
					"http://localhost:5000/candidati/respingeCandidat/" + candidat._id
				)
				.then(() => {
					alert("Candidat respins");
					var modalCandidat = document.getElementById("myModalScorCandidat");
					modalCandidat.style.display = "none";
					window.location.reload(true);
				});
		},
		acceptaCandidat(candidat, labelSkilluri) {
			var scor = {};
			for (let i = 0; i < labelSkilluri.length; i++) {
				var skill = labelSkilluri[i].split("-")[0];
				var value = labelSkilluri[i].split("-")[1];
				scor[skill] = value.split("%")[0];
			}
			var body = {
				Scor: scor,
			};
			axios
				.patch(
					"http://localhost:5000/candidati/editCandidat/" + candidat._id,
					body
				)
				.then(() => {
					var modalCandidat = document.getElementById("myModalScorCandidat");
					modalCandidat.style.display = "none";
					window.location.reload(true);
					this.$router.push("/programareInterviu/"+candidat._id)
				});
		},
		adaugaSkillAlgoritmRomana() {
			let divContentAlgoritm = document.querySelector(
				".algoritm-contentAlgoritmRomana"
			);
			let divContent = document.createElement("div");
			divContent.classList.add("contentAlgoritmRomana");
			let inputCheie = document.createElement("input");
			inputCheie.type = "text";

			inputCheie.classList.add("inputCheieAlgoritmRomana");
			inputCheie.style.background = "#d0e7f3";
			inputCheie.style.color = "rgb(19, 3, 3)";
			inputCheie.style.width = "20vw";
			inputCheie.style.fontSize = "17px";
			inputCheie.style.position = "absolute";
			inputCheie.style.backgroundImage = `url(${this.icon})`;
			inputCheie.style.marginTop = "30px";
			inputCheie.style.height = "5vh";
			inputCheie.style.marginLeft = "-285px";
			let textarea = document.createElement("textarea");
			textarea.style.height = "35vh";
			textarea.disabled = false;
			textarea.style.width = "48vw";
			textarea.fontSize = "16px";
			textarea.style.marginLeft = "80px";
			textarea.disabled = true;
			textarea.classList.add("inputTermeniAlgoritmRomana");

			divContent.appendChild(inputCheie);
			divContent.appendChild(textarea);

			let inputCuvant = document.createElement("input");
			inputCuvant.type = "text";
			inputCuvant.classList.add("input");
			inputCuvant.classList.add("is-primary");
			inputCuvant.classList.add("inputCuvantAlgoritmRomana");
			inputCuvant.style.position = "absolute";
			inputCuvant.style.marginLeft = "20px";
			inputCuvant.style.width = "15vw";
			inputCuvant.style.marginTop = "30px";

			let buttonAdaugaCuvant = document.createElement("button");
			buttonAdaugaCuvant.classList.add("button");
			buttonAdaugaCuvant.classList.add("is-primary");
			buttonAdaugaCuvant.classList.add("is-light");
			buttonAdaugaCuvant.classList.add("btnAdaugaCuvantAlgoritmRomana");
			buttonAdaugaCuvant.style.position = "absolute";
			buttonAdaugaCuvant.innerHTML = "Adauga Cuvant";
			buttonAdaugaCuvant.style.marginLeft = "80px";
			buttonAdaugaCuvant.style.marginTop = "80px";
			buttonAdaugaCuvant.addEventListener(
				"click",
				this.adaugaCuvantAlgoritmRomana
			);

			//cream input pt sterge si btn pt stergere
			let inputStergeCuvant = document.createElement("input");
			inputStergeCuvant.classList.add("input");
			inputStergeCuvant.type = "text";
			inputStergeCuvant.classList.add("is-danger");
			inputStergeCuvant.classList.add("inputStergeCuvantAlgoritmRomana");
			inputStergeCuvant.style.position = "absolute";
			inputStergeCuvant.style.width = "15vw";
			inputStergeCuvant.style.marginLeft = "20px";
			inputStergeCuvant.style.marginTop = "150px";

			let buttonStergeCuvant = document.createElement("button");
			buttonStergeCuvant.style.position = "absolute";
			buttonStergeCuvant.style.marginLeft = "80px";
			buttonStergeCuvant.style.marginTop = "220px";
			buttonStergeCuvant.classList.add("button");
			buttonStergeCuvant.classList.add("is-danger");
			buttonStergeCuvant.classList.add("is-light");
			buttonStergeCuvant.classList.add("btnStergeCuvantAlgoritmRomana");
			buttonStergeCuvant.addEventListener(
				"click",
				this.stergeCuvantAlgoritmRomana
			);
			buttonStergeCuvant.innerHTML = "Sterge Cuvant";
			divContent.appendChild(inputCuvant);
			divContent.appendChild(buttonAdaugaCuvant);
			divContent.appendChild(inputStergeCuvant);
			divContent.appendChild(buttonStergeCuvant);

			divContentAlgoritm.appendChild(divContent);
		},
		salveazaAlgoritmRomana() {
			let algoritm = {};
			let i = 0;
			let classListInputCheie = document.getElementsByClassName(
				"inputCheieAlgoritmRomana"
			);
			let classListTextare = document.getElementsByClassName(
				"inputTermeniAlgoritmRomana"
			);

			while (i < classListInputCheie.length) {
				algoritm[classListInputCheie[i].value + ""] = (
					classListTextare[i].placeholder + ""
				).split(",");

				i++;
			}

			let body = {
				Algoritm_Romana: algoritm,
			};

			console.log("Algoritmul nou este ");
			console.log(body);
			//salvez noul algoritm corespunzator jobului
			axios
				.patch(
					`http://localhost:5000/joburi/algoritmRomana/${this.id_job}`,
					body
				)
				.then(() => {
					axios
						.get(`http://localhost:5000/joburi/findJob/${this.id_job}`)
						.then((res) => {
							console.log("Jobul pe care sunteti");
							this.job = res.data.job;
							this.algoritm = JSON.parse(this.job.Algoritm);
							this.algoritm_romana = JSON.parse(this.job.Algoritm_Romana);
							console.log(this.algoritm);

							alert("Actualizare Reusita");
						});
				})
				.catch((err) => console.log(err));
			window.location.reload(true);
		},
		editeazaAlgoritmRomana() {
			let classListInputCheie = document.getElementsByClassName(
				"inputCheieAlgoritmRomana"
			);
			for (let i = 0; i < classListInputCheie.length; i++) {
				let inputCheie = classListInputCheie[i];
				inputCheie.disabled = false;
			}

			let classListInputCuvant = document.getElementsByClassName(
				"inputCuvantAlgoritmRomana"
			);
			for (let i = 0; i < classListInputCheie.length; i++) {
				let inputCuvant = classListInputCuvant[i];
				inputCuvant.disabled = false;
			}

			let classListBtnAdauga = document.getElementsByClassName(
				"btnAdaugaCuvantAlgoritmRomana"
			);
			for (let i = 0; i < classListBtnAdauga.length; i++) {
				let buttonAdaugaCuvant = classListBtnAdauga[i];
				buttonAdaugaCuvant.disabled = false;
			}
			let classListStergeBtn = document.getElementsByClassName(
				"btnStergeCuvantAlgoritmRomana"
			);
			for (let i = 0; i < classListStergeBtn.length; i++) {
				let buttonAStergeCuvant = classListStergeBtn[i];
				buttonAStergeCuvant.disabled = false;
			}
			let classListInputStergeCuvant = document.getElementsByClassName(
				"inputStergeCuvantAlgoritmRomana"
			);
			for (let i = 0; i < classListInputStergeCuvant.length; i++) {
				let inputStergeCuvant = classListInputStergeCuvant[i];
				inputStergeCuvant.disabled = false;
			}
		},
		adaugaCuvantAlgoritmRomana(e) {
			let target = e.target;

			let divContent = target.parentElement;

			let inputTextarea = divContent.children[1];
			let inputCuvant = divContent.children[2];
			let cuvantDeAdaugat = inputCuvant.value;
			let cuvintePlaceholder = inputTextarea.placeholder;
			let cuvinteSplit = cuvintePlaceholder.split(",");
			let cuvinte = [];
			if (inputTextarea.placeholder !== "") {
				for (let i = 0; i < cuvinteSplit.length; i++) {
					cuvinte.push(cuvinteSplit[i]);
				}
			}

			if (cuvantDeAdaugat == "") {
				alert(
					"Trebuie sa introduceti un cuvant pentru a il putea adauga in domeniul de termeni"
				);
				return;
			}
			cuvinte.push(cuvantDeAdaugat);

			inputTextarea.placeholder = cuvinte;
			inputCuvant.value = "";
		},
		stergeCuvantAlgoritmRomana(e) {
			let target = e.target;

			let divContent = target.parentElement;

			let inputTextarea = divContent.children[1];
			let inputCuvant = divContent.children[4];
			let cuvantDeSters = inputCuvant.value;
			let cuvintePlaceholder = inputTextarea.placeholder;
			let cuvinteSplit = cuvintePlaceholder.split(",");
			let cuvinte = [];
			if (inputTextarea.placeholder !== "") {
				for (let i = 0; i < cuvinteSplit.length; i++) {
					cuvinte.push(cuvinteSplit[i]);
				}
			}

			if (cuvantDeSters == "") {
				alert(
					"Trebuie sa introduceti un cuvant pentru a il putea sterge in domeniul de termeni"
				);
				return;
			}
			let ok = 0;
			for (let i = 0; i < cuvinte.length; i++) {
				if (cuvinte[i] == cuvantDeSters) {
					ok = 1;
					cuvinte.splice(i, 1);
				}
			}
			if (ok == 0) {
				alert("Cuvantul nu se regaseste in lista de termeni pentru a fi sters");
				return;
			}

			inputTextarea.placeholder = cuvinte;
			inputCuvant.value = "";
		},
		arataAlgoritmRomana() {
			var modal = document.getElementById("myModalAlgoritmRomana");
			modal.style.display = "block";
		},

		scor(candidat) {
			axios
				.get(`http://localhost:5000/candidati/extractText/${candidat._id}`)
				.then((response) => {
					console.log(response.data.text);
					var textBrut = response.data.text;
					var textFaraSpatiiDuble = textBrut.replace(/\s{2,}/g, " ");

					var textNeformatat = textFaraSpatiiDuble.replace(/\s+/, " ");
					var text = textNeformatat.toLowerCase();

					const lngDetector = new LanguageDetect();
					var limba_detectata = lngDetector.detect(text)[0][0];
					console.log(limba_detectata);
					var skilluri = [];
					var scor = {};
					var suma = 0;
					var valuesCandidat = [];
					var labelSkilluri = [];
					if (limba_detectata == "romanian") {
						document.getElementById("titlu1ProgressFiltrare").innerHTML =
							"Limba detectata este romana";
						for (let skill in this.algoritm_romana) {
							console.log(skill);
							skilluri.push(skill);
							scor[skill] = 0;
							let termeniString = this.algoritm_romana[skill] + "";
							let termeni = termeniString.split(",");

							if (termeni.length > 0) {
								for (let i = 0; i < termeni.length; i++) {
									let termen = termeni[i];
									if (termen !== "") {
										if (text.includes(termen.toLowerCase())) {
											scor[skill]++;
										}
									}
								}
							}
						}
						for (let skill in scor) {
							valuesCandidat.push(scor[skill]);
							suma += scor[skill];
						}
						for (let skill in skilluri) {
							labelSkilluri.push(
								`${skilluri[skill]}-${Math.round(
									(valuesCandidat[skill] * 100) / suma
								)}%`
							);
						}
					} else {
						document.getElementById("titlu1ProgressFiltrare").innerHTML =
							"Limba detectata este engleza";
						for (let skill in this.algoritm) {
							console.log(skill);
							skilluri.push(skill);
							scor[skill] = 0;
							let termeniString = this.algoritm[skill] + "";
							let termeni = termeniString.split(",");

							if (termeni.length > 0) {
								for (let i = 0; i < termeni.length; i++) {
									let termen = termeni[i];
									if (termen !== "") {
										console.log("termen cu litera mica");
										console.log(termen.toLowerCase());
										if (text.includes(termen.toLowerCase())) {
											scor[skill]++;
										}
									}
								}
							}
						}

						for (let skill in scor) {
							valuesCandidat.push(scor[skill]);
							suma += scor[skill];
						}
						console.log(`values ${valuesCandidat}`);

						var scorCandidat = [];
						for (let skill in skilluri) {
							labelSkilluri.push(
								`${skilluri[skill]}-${Math.round(
									(valuesCandidat[skill] * 100) / suma
								)}%`
							);
						}
						for (let skill in skilluri) {
							scorCandidat.push(
								skilluri[skill] -
									Math.round((valuesCandidat[skill] * 100) / suma)
							);
						}
					}

					console.log("Labels for algoritmRomana");
					console.log(labelSkilluri);
					var data = [
						{
							values: valuesCandidat,
							labels: labelSkilluri,
							textinfo: "none",
							hoverinfo: "none",

							type: "pie",
						},
					];

					var layout = {
						height: 400,
						width: 700,

						font: {
							size: 20,
						},
					};
					const _PRG = document.getElementById("p"),
						_OUT = document.querySelector("[for=p]"),
						K = 1,
						TMAX = K * _PRG.max;

					function load(t = 0) {
						if (t <= TMAX) {
							if (t % K === 0) _OUT.value = _PRG.value = t / K;
							requestAnimationFrame(load.bind(this, t + (Math.random() > 0.3)));
						} else {
							var modalProgress = document.getElementById("myModalProgress");
							modalProgress.style.display = "none";
							var modalCandidat = document.getElementById(
								"myModalScorCandidat"
							);
							document.getElementsByClassName("surface")[0].width = "180px";
							modalCandidat.style.display = "block";
						}
					}
					load();
					var modalProgress = document.getElementById("myModalProgress");
					modalProgress.style.display = "block";

					Plotly.newPlot("myDiv", data, layout);
					

					
				});
		},
		adaugaCuvant(e) {
			let target = e.target;

			let divContent = target.parentElement;

			let inputTextarea = divContent.children[1];
			let inputCuvant = divContent.children[2];
			let cuvantDeAdaugat = inputCuvant.value;
			let cuvintePlaceholder = inputTextarea.placeholder;
			let cuvinteSplit = cuvintePlaceholder.split(",");
			let cuvinte = [];
			if (inputTextarea.placeholder !== "") {
				for (let i = 0; i < cuvinteSplit.length; i++) {
					cuvinte.push(cuvinteSplit[i]);
				}
			}

			if (cuvantDeAdaugat == "") {
				alert(
					"Trebuie sa introduceti un cuvant pentru a il putea adauga in domeniul de termeni"
				);
				return;
			}
			cuvinte.push(cuvantDeAdaugat);

			inputTextarea.placeholder = cuvinte;
			inputCuvant.value = "";
		},
		adaugaCuvant2(e) {
			let target = e.target;

			let divContent = target.parentElement;

			let inputTextarea = divContent.children[1];
			let inputCuvant = divContent.children[2];
			let cuvantDeAdaugat = inputCuvant.value;
			let cuvintePlaceholder = inputTextarea.placeholder;
			let cuvinteSplit = cuvintePlaceholder.split(",");
			let cuvinte = [];
			if (inputTextarea.placeholder !== "") {
				for (let i = 0; i < cuvinteSplit.length; i++) {
					cuvinte.push(cuvinteSplit[i]);
				}
			}

			if (cuvantDeAdaugat == "") {
				alert(
					"Trebuie sa introduceti un cuvant pentru a il putea adauga in domeniul de termeni"
				);
				return;
			}
			cuvinte.push(cuvantDeAdaugat);
			inputTextarea.placeholder = cuvinte;
			inputCuvant.value = "";
		},
		stergeCuvant(e) {
			let target = e.target;

			let divContent = target.parentElement;

			let inputTextarea = divContent.children[1];
			let inputCuvant = divContent.children[4];
			let cuvantDeSters = inputCuvant.value;
			let cuvintePlaceholder = inputTextarea.placeholder;
			let cuvinteSplit = cuvintePlaceholder.split(",");
			let cuvinte = [];
			if (inputTextarea.placeholder !== "") {
				for (let i = 0; i < cuvinteSplit.length; i++) {
					cuvinte.push(cuvinteSplit[i]);
				}
			}

			if (cuvantDeSters == "") {
				alert(
					"Trebuie sa introduceti un cuvant pentru a il putea sterge in domeniul de termeni"
				);
				return;
			}
			let ok = 0;
			for (let i = 0; i < cuvinte.length; i++) {
				if (cuvinte[i] == cuvantDeSters) {
					ok = 1;
					cuvinte.splice(i, 1);
				}
			}
			if (ok == 0) {
				alert("Cuvantul nu se regaseste in lista de termeni pentru a fi sters");
				return;
			}

			inputTextarea.placeholder = cuvinte;
			inputCuvant.value = "";
		},
		adaugaSkill() {
			let divContentAlgoritm = document.querySelector(".algoritm-content");
			let divContent = document.createElement("div");
			divContent.classList.add("content");
			let inputCheie = document.createElement("input");
			inputCheie.type = "text";

			inputCheie.classList.add("inputCheie");
			inputCheie.style.background = "#d0e7f3";
			inputCheie.style.color = "rgb(19, 3, 3)";
			inputCheie.style.width = "20vw";
			inputCheie.style.fontSize = "17px";
			inputCheie.style.position = "absolute";
			inputCheie.style.backgroundImage = `url(${this.icon})`;
			inputCheie.style.marginTop = "30px";
			inputCheie.style.height = "5vh";
			inputCheie.style.marginLeft = "-280px";
			let textarea = document.createElement("textarea");
			textarea.style.height = "35vh";
			textarea.disabled = false;
			textarea.style.width = "48vw";
			textarea.fontSize = "16px";
			textarea.style.marginLeft = "100px";
			textarea.classList.add("inputTermeni");

			divContent.appendChild(inputCheie);
			divContent.appendChild(textarea);

			let inputCuvant = document.createElement("input");
			inputCuvant.type = "text";
			inputCuvant.classList.add("input");
			inputCuvant.classList.add("is-primary");
			inputCuvant.classList.add("inputCuvant");
			inputCuvant.style.position = "absolute";
			inputCuvant.style.marginLeft = "20px";
			inputCuvant.style.width = "15vw";
			inputCuvant.style.marginTop = "30px";

			let buttonAdaugaCuvant = document.createElement("button");
			buttonAdaugaCuvant.classList.add("button");
			buttonAdaugaCuvant.classList.add("is-primary");
			buttonAdaugaCuvant.classList.add("is-light");
			buttonAdaugaCuvant.classList.add("btnAdaugaCuvant");
			buttonAdaugaCuvant.style.position = "absolute";
			buttonAdaugaCuvant.innerHTML = "Adauga Cuvant";
			buttonAdaugaCuvant.style.marginLeft = "80px";
			buttonAdaugaCuvant.style.marginTop = "80px";
			buttonAdaugaCuvant.addEventListener("click", this.adaugaCuvant2);

			//cream input pt sterge si btn pt stergere
			let inputStergeCuvant = document.createElement("input");
			inputStergeCuvant.classList.add("input");
			inputStergeCuvant.type = "text";
			inputStergeCuvant.classList.add("is-danger");
			inputStergeCuvant.classList.add("inputStergeCuvant");
			inputStergeCuvant.style.position = "absolute";
			inputStergeCuvant.style.width = "15vw";
			inputStergeCuvant.style.marginLeft = "20px";
			inputStergeCuvant.style.marginTop = "150px";

			let buttonStergeCuvant = document.createElement("button");
			buttonStergeCuvant.style.position = "absolute";
			buttonStergeCuvant.style.marginLeft = "80px";
			buttonStergeCuvant.style.marginTop = "220px";
			buttonStergeCuvant.classList.add("button");
			buttonStergeCuvant.classList.add("is-danger");
			buttonStergeCuvant.classList.add("is-light");
			buttonStergeCuvant.classList.add("btnStergeCuvant");
			buttonStergeCuvant.addEventListener("click", this.stergeCuvant);
			buttonStergeCuvant.innerHTML = "Sterge Cuvant";
			divContent.appendChild(inputCuvant);
			divContent.appendChild(buttonAdaugaCuvant);
			divContent.appendChild(inputStergeCuvant);
			divContent.appendChild(buttonStergeCuvant);

			divContentAlgoritm.appendChild(divContent);
		},
		salveazaAlgoritm() {
			let algoritm = {};
			let i = 0;
			let classListInputCheie = document.getElementsByClassName("inputCheie");
			let classListTextare = document.getElementsByClassName("inputTermeni");
			while (i < classListInputCheie.length) {
				algoritm[classListInputCheie[i].value + ""] = (
					classListTextare[i].placeholder + ""
				).split(",");
				i++;
			}

			let body = {
				Algoritm: algoritm,
			};
			//salvez noul algoritm corespunzator jobului
			axios
				.patch(`http://localhost:5000/joburi/${this.id_job}`, body)
				.then(() => {
					axios
						.get(`http://localhost:5000/joburi/findJob/${this.id_job}`)
						.then((res) => {
							console.log("Jobul pe care sunteti");
							this.job = res.data.job;
							this.algoritm = JSON.parse(this.job.Algoritm);
							console.log(this.algoritm);

							alert("Actualizare Reusita");
						});
				})
				.catch((err) => console.log(err));
			window.location.reload(true);
		},
		editeazaAlgoritm() {
			let classListInputCheie = document.getElementsByClassName("inputCheie");
			for (let i = 0; i < classListInputCheie.length; i++) {
				let inputCheie = classListInputCheie[i];
				inputCheie.disabled = false;
			}

			let classListInputCuvant = document.getElementsByClassName("inputCuvant");
			for (let i = 0; i < classListInputCheie.length; i++) {
				let inputCuvant = classListInputCuvant[i];
				inputCuvant.disabled = false;
			}

			let classListBtnAdauga =
				document.getElementsByClassName("btnAdaugaCuvant");
			for (let i = 0; i < classListBtnAdauga.length; i++) {
				let buttonAdaugaCuvant = classListBtnAdauga[i];
				buttonAdaugaCuvant.disabled = false;
			}
			let classListStergeBtn =
				document.getElementsByClassName("btnStergeCuvant");
			for (let i = 0; i < classListStergeBtn.length; i++) {
				let buttonAStergeCuvant = classListStergeBtn[i];
				buttonAStergeCuvant.disabled = false;
			}
			let classListInputStergeCuvant =
				document.getElementsByClassName("inputStergeCuvant");
			for (let i = 0; i < classListInputStergeCuvant.length; i++) {
				let inputStergeCuvant = classListInputStergeCuvant[i];
				inputStergeCuvant.disabled = false;
			}
		},
		arataAlgoritm() {
			var modal = document.getElementById("myModalAlgoritm");
			modal.style.display = "block";
		},
		back() {
			this.$router.push("/recrutare");
		},
		test() {
			console.log(this.algoritm_romana);
		},
		filtrare() {
			//let dataBuffer = fs.readFileSync("/files/designpatternscard.pdf");
		},
		selectFile() {
			this.file = this.$refs.file.files[0];
		},
		async sendFile() {
			const formData = new FormData();
			let nume = document.querySelector("#inputNumeComplet").value;
			let email = document.querySelector("#inputEmail").value;
			formData.append("file", this.file);
			formData.append("NumeComplet", nume);
			formData.append("Email", email);
			formData.append("Status", "In asteptare");
			try {
				await axios
					.post(`http://localhost:5000/candidati/${this.id_job}`, formData)
					.then(() => {
						alert("Candidat inserat");
					});
			} catch (err) {
				console.log(err);
			}
		},
		adaugaCandidat() {
			var modal = document.getElementById("myModal");
			modal.style.display = "block";
		},
	},
	mounted() {
		var spanAdaugaCandidat =
			document.getElementsByClassName("closeCandidat")[0];
		var modalAdaugaCandidat = document.getElementById("myModal");
		spanAdaugaCandidat.onclick = function () {
			modalAdaugaCandidat.style.display = "none";
		};

		var spanCandidat = document.getElementsByClassName("closeScorCandidat")[0];
		var modalCandidat = document.getElementById("myModalScorCandidat");
		spanCandidat.onclick = function () {
			modalCandidat.style.display = "none";
		};
		var spanAlgoritm = document.getElementsByClassName("closeAlgoritm")[0];
		spanAlgoritm.addEventListener("click", () => {
			var modalAlgoritm = document.getElementById("myModalAlgoritm");
			modalAlgoritm.style.display = "none";
		});

		var spanAlgoritmRomana = document.getElementsByClassName(
			"closeAlgoritmRomana"
		)[0];
		spanAlgoritmRomana.addEventListener("click", () => {
			var modalAlgoritmRomana = document.getElementById(
				"myModalAlgoritmRomana"
			);
			modalAlgoritmRomana.style.display = "none";
		});

		axios.get(`http://localhost:5000/candidati/${this.id_job}`).then((res) => {
			this.candidati = res.data.candidati;
			console.log("candidati");
			console.log(this.candidati);
		});

		axios
			.get(`http://localhost:5000/joburi/findJob/${this.id_job}`)
			.then((res) => {
				console.log("Jobul pe care sunteti");
				this.job = res.data.job;
				this.algoritm = JSON.parse(this.job.Algoritm);
				this.algoritm_romana = JSON.parse(this.job.Algoritm_Romana);
				console.log(this.algoritm);
			});
	},
};
</script>
<style scoped>
/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/
* {
}

/* ------------------------------------ */
a {
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
	-o-transition: all 0.4s;
	-moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
}

/* ------------------------------------ */

/* ------------------------------------ */

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Table ]*/

.limiter {
	margin: 0 auto;
}

.wrap-table100 {
	border-radius: 10px;
	overflow: hidden;

	width: 40vh;
}

.table {
	position: absolute;
	margin-top: 120px;
	margin-left: 185px;
	width: 40vh;
	height: 70vh;
	overflow: auto;
}

@media screen and (max-width: 768px) {
	.table {
	}
}

.row {
	display: table-row;
	background: #fff;
}

.row.header {
	color: #ffffff;
	background: #96b6df;
}

@media screen and (max-width: 768px) {
	.row {
		display: block;
	}

	.row.header {
		padding: 0;
		height: 0px;
	}

	.row.header .cell {
		display: none;
	}

	.row .cell:before {
		font-family: Poppins-Bold;
		font-size: 12px;
		color: #808080;
		line-height: 1.2;
		text-transform: uppercase;
		font-weight: unset !important;

		margin-bottom: 13px;
		content: attr(data-title);
		min-width: 58px;
		display: block;
	}
}

.cell {
	display: table-cell;
}

@media screen and (max-width: 768px) {
	.cell {
		display: block;
	}
}

.row .cell {
	font-family: Poppins-Regular;
	font-size: 18px;
	color: #666666;
	line-height: 1.2;

	padding-top: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #f2f2f2;
}

.row.header .cell {
	font-family: Poppins-Regular;
	font-size: 18px;
	color: #fff;
	line-height: 1.2;
	font-weight: unset !important;

	padding-top: 19px;
	padding-bottom: 19px;
}

.row .cell:nth-child(1) {
	width: 360px;
	padding-left: 10px;
}

.row .cell:nth-child(2) {
	width: 160px;
}

.row .cell:nth-child(3) {
	width: 250px;
}

.row .cell:nth-child(4) {
	width: 90px;
}
.row .cell:nth-child(5) {
	width: 90px;
}

.table,
.row {
	width: 70% !important;
}

.row:hover {
	background-color: #ececff;
	cursor: pointer;
}

@media (max-width: 768px) {
	.row {
		border-bottom: 1px solid #f2f2f2;
		padding-bottom: 18px;
		padding-top: 30px;
		padding-right: 10px;
		margin: 0;
	}

	.row .cell {
		border: none;
		padding-left: 10px;
		padding-top: 16px;
		padding-bottom: 16px;
	}
	.row .cell:nth-child(1) {
		padding-left: 10px;
	}

	.row .cell {
		font-family: Poppins-Regular;
		font-size: 18px;
		color: #555555;
		line-height: 1.2;
		font-weight: unset !important;
	}
}
.header:hover {
	color: black;

	background: black;
}
.header {
	position: static;
	height: 20px;
}
#btnInapoiJoburi {
	position: absolute;
	margin-left: -600px;
	margin-right: 10px;
}
.modal {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 20;
	top: 0;

	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
	background-color: #fefefe;
	margin: auto;
	margin-left: 650px;
	padding: 20px;
	border: 1px solid #888;
	width: 30%;
}

/* The Close Button */
.close {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
#fieldNumeSiPrenume {
	margin-top: 10px;
	font-size: 17px;
}
.label {
	text-align: left;
	font-size: 19px;
}
#btnAdaugaCandidat {
	position: absolute;
	margin-left: -420px;
	margin-bottom: 10px;
}
i {
	padding-right: 10px;
}

.modal-contentAlgoritm,
.modal-contentAlgoritmRomana {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

/* The Close Button */
.closeAlgoritm,
.closeAlgoritmRomana {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeAlgoritm:hover,
.closeAlgoritm:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
.modal-contentAlgoritm,
.modal-contentAlgoritmRomana {
	position: absolute;
	width: 90vw;
	background: rgb(239, 241, 243);
	margin-left: 100px;
}
.inputTermeni,
.inputTermeniAlgoritmRomana {
	height: 35vh;
	width: 28vw;
	font-size: 16px;
	margin-top: 20px;
	margin-left: 100px;
}
.inputCheie,
.inputCheieAlgoritmRomana {
	background-color: #d0e7f3;
	color: rgb(19, 3, 3);
	width: 20vw;
	padding-left: 50px;
	font-size: 17px;
	position: absolute;
	background-image: url("../assets/skill.png");
	background-position: 10px 3px;
	background-repeat: no-repeat;
	margin-top: 120px;
	height: 5vh;
	margin-left: -280px;
}
#titluFiltrare {
	font-size: 24px;
}
.modalAlgoritm,
.modalAlgoritmRomana {
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
#btnAlgoritm {
}
.inputCuvant,
.inputCuvantAlgoritmRomana {
	position: absolute;
	margin-left: 20px;
	width: 15vw;
	margin-top: 30px;
}
#buttonGrup {
	margin-top: 30px;
}
.btnAdaugaCuvant,
.btnAdaugaCuvantAlgoritmRomana {
	position: absolute;
	margin-left: 80px;
	margin-top: 80px;
}
.inputStergeCuvant,
.inputStergeCuvant {
	position: absolute;
	width: 15vw;
	margin-left: 20px;
	margin-top: 150px;
}
.btnStergeCuvant,
.btnStergeCuvantAlgoritmRomana {
	position: absolute;
	margin-left: 80px;
	margin-top: 220px;
}
#btnFiltrare {
	position: absolute;
	margin-top: 50px;
}

.modalScorCandidat {
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
.modal-contentScorCandidat {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	margin-left: 470px;
	margin-top: 50px;
	border: 1px solid #888;
	height: 59vh;
	font-size: 16px;
	width: 50%;
}

/* The Close Button */
.closeScorCandidat {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeScorCandidat:hover,
.closeScorCandidat:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

/* Modal Algoritm Romana */

.modal-contentAlgoritmRomana {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

/* The Close Button */
.closeAlgoritmRomana {
	color: #aaaaaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.closeAlgoritmRomana:hover,
.closeAlgoritmRomana:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
.modal-contentAlgoritmRomana {
	position: absolute;
	width: 90vw;
	background: rgb(239, 241, 243);
	margin-left: 100px;
}
.inputTermeniAlgoritmRomana {
	height: 35vh;
	width: 48vw;
	font-size: 16px;
	margin-top: 20px;
	margin-left: 100px;
}
.inputCheieAlgoritmRomana {
	background-color: #d0e7f3;
	color: rgb(19, 3, 3);
	width: 20vw;
	padding-left: 50px;
	font-size: 17px;
	position: absolute;
	background-image: url("../assets/skill.png");
	background-position: 10px 3px;
	background-repeat: no-repeat;
	margin-top: 120px;
	height: 5vh;
	margin-left: -280px;
}
#titluFiltrareAlgoritmRomana {
	font-size: 24px;
}
.modalAlgoritmRomana {
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
#btnAlgoritm {
	position: absolute;
	margin-left: 430px;
}
.inputCuvantAlgoritmRomana {
	position: absolute;
	margin-left: 20px;
	width: 15vw;
	margin-top: 30px;
}
#buttonGrupAlgoritmRomana {
	margin-top: 30px;
}
.btnAdaugaCuvantAlgoritmRomana {
	position: absolute;
	margin-left: 80px;
	margin-top: 80px;
}
.inputStergeCuvantAlgoritmRomana {
	position: absolute;
	width: 15vw;
	margin-left: 20px;
	margin-top: 150px;
}
.btnStergeCuvantAlgoritmRomana {
	position: absolute;
	margin-left: 80px;
	margin-top: 220px;
}

.modalProgress {
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
.modal-contentProgress {
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	margin-top: 50px;
	margin-left: 450px;
	border: 1px solid #888;
	width: 50%;
}

body,
#loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
body {
	height: 100vh;
}
#loader {
	flex-direction: column-reverse;
	color: #8aaaff;
	font: 2.5em sans-serif;
}
progress[value] {
	width: 12.5em;
	height: 0.25em;
	border: none;
	border-radius: 0.125em;
	background: #e6eeff;
}
progress[value]::-webkit-progress-bar {
	border: none;
	border-radius: 0.125em;
	background: #e6eeff;
}
progress[value]::-webkit-progress-value {
	border: none;
	border-radius: inherit;
	background: linear-gradient(90deg, #8aaaff, #fa8cff);
}
progress[value]::-moz-progress-bar {
	border: none;
	border-radius: inherit;
	background: linear-gradient(90deg, #8aaaff, #fa8cff);
}
progress[value]::-ms-fill {
	border: none;
	border-radius: inherit;
	background: linear-gradient(90deg, #8aaaff, #fa8cff);
}
output:not(:empty) {
	padding-bottom: 1em;
}
output:not(:empty):after {
	content: "%";
}
#titlu1ProgressFiltrare {
	font-weight: 15px;
	font-size: 24px;
}
#titlu2ProgressFiltrare {
	font-weight: 15px;
	font-size: 24px;
	color: rebeccapurple;
}
.closeCandidat {
	color: #000;

	text-decoration: none;
	font-weight: bold;
	font-size: 22px;
	margin-left: 450px;
	cursor: pointer;
}
#btnAlgoritmRomana {
	position: absolute;
	margin-top: 70px;
	margin-left: 430px;
}
#titluJobH2 {
	position: absolute;
	top: 65px;
	font-size: 23px;
	font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	text-align: center;
	left: 100px;
	right: 0;
	
  width: 100%; 
	/* position: absolute;
	z-index: 100;
	color: black;
	text-align: center;
	font-size: 28px; */
	font-family: "Mr Dafoe", cursive;
}
</style>