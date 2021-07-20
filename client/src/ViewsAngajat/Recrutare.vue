<template>
	<div class="columns" id="mail-app">
		<div id="myModalEdit" class="modalEdit">
			<!-- Modal content -->
			<div class="modal-contentEdit">
				<span class="closeEdit" id="closeEdit">&times;</span>
				<div class="fieldEdit" style="display: table" id="fieldPozitieEdit">
					<label class="label" style="display: table-row">Pozitie</label>
					<div class="control has-icons-left" style="display: table-row">
						<input
							type="text"
							class="input is-info inputPozitieEdit"
							id="inputPozitieEdit"
						/>
					</div>
				</div>
				<div class="fieldEdit" style="display: table" id="fieldDepartamentEdit">
					<label class="label" style="display: table-row">Departament</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info is-focused" id="inputDepartamentEdit">
							<select id="selectDepartamentEdit" class="selectDepartamentEdit">
								<option value="Alegeti departament">Alegeti departament</option>
								<option value="Financiar">Financiar</option>
								<option value="Vanzari">Vanzari</option>
								<option value="IT">IT</option>
								<option value="Resurse umane">Resurse umane</option>
								<option value="Marketing">Marketing</option>
								<option value="Cercetare &amp; dezvoltare">
									Cercetare &amp; dezvoltare
								</option>
								<option value="Administrativ">Administrativ</option>
							</select>
						</div>
					</div>
				</div>
				<div class="fieldEdit" style="display: table" id="fieldLocatieEdit">
					<label class="label" style="display: table-row">Locatie</label>
					<div class="control has-icons-left" style="display: table-row">
						<input
							type="text"
							class="input is-info inputLocatieEdit"
							id="inputLocatieEdit"
						/>
					</div>
				</div>

				<br />
				<div class="fieldEdit" style="display: table" id="fieldNivelStudiiEdit">
					<label class="label" style="display: table-row">Nivel Studii</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info">
							<select
								id="selectNivelStudiiEdit"
								class="selectNivelStudiiEditEdit"
							>
								<option value="Alegeti nivelul de studii">
									Alegeti nivelul de studii
								</option>
								<option value="Necalificat">Necalificat</option>
								<option value="Calificat">Calificat</option>
								<option value="Student">Student</option>
								<option value="Absolvent">Absolvent</option>
							</select>
						</div>
					</div>
				</div>
				<div class="fieldEdit" style="display: table" id="fieldTipJobEdit">
					<label class="label" style="display: table-row">Tip Job</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info">
							<select id="selectTipJobEdit" class="selectTipJobEdit">
								<option id="Alegeti tipul de job">Alegeti tipul de job</option>
								<option id="Full-Time">Full Time</option>
								<option id="Internship">Internship</option>
								<option id="Part-Time">Part-Time</option>
							</select>
						</div>
					</div>
				</div>
				<div class="fieldEdit" style="display: table" id="fieldExperientaEdit">
					<label class="label" style="display: table-row">Experienta</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info">
							<select id="selectExperientaEdit" class="selectExperientaEdit">
								<option value="Alegeti nivelul de experienta">
									Alegeti nivelul de experienta
								</option>
								<option value="Fara Experienta">Fara experienta</option>
								<option value="Entry Level(<2 ani) ">
									Entry Level( &lt; 2 ani)
								</option>
								<option value="Mid-Level (2-5 Ani)">Mid-Level (2-5 Ani)</option>
								<option value="Senior-Level (> 5 Ani)">
									Senior-Level (> 5 Ani)
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="fieldEdit" style="display: table" id="fieldSalariuEdit">
					<label class="label" style="display: table-row">Salariu</label>
					<input
						type="number"
						class="input is-info inputSalariuEdit"
						id="inputSalariuEdit"
						min="1350"
						placeholder="1350"
					/>
				</div>
				<div
					class="fieldEdit"
					style="display: table"
					id="fieldPerioadaAplicareEdit"
				>
					<label class="label" style="display: table-row" id="labelPerioadaEdit"
						>Perioada aplicare</label
					>
					<div class="control has-icons-left">
						<input type="date" class="input" id="inputDateInceputEdit" />
						<span id="separatorPerioadaEdit">-</span>
						<input type="date" class="input" id="inputDateSfarsitEdit" />
					</div>

					<div class="control has-icons-left">
						<label
							class="label"
							style="display: table-row"
							id="labelDescriereEdit"
							>Descriere</label
						>
						<textarea
							type="text"
							class="input inputDescriereEdit"
							id="inputDescriereEdit"
						></textarea>
					</div>
					<div></div>
				</div>
				<button id="btnSalveazaEdit" class="button is-succes">Salveaza</button>
			</div>
		</div>

		<div id="myModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="close">&times;</span>
				<div class="field" style="display: table" id="fieldPozitie">
					<label class="label" style="display: table-row">Pozitie</label>
					<div class="control has-icons-left" style="display: table-row">
						<input type="text" class="input is-info" id="inputPozitie" />
					</div>
				</div>
				<div class="field" style="display: table" id="fieldDepartament">
					<label class="label" style="display: table-row">Departament</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info is-focused" id="inputDepartament">
							<select id="selectDepartament">
								<option id="Alegeti departament">Alegeti departament</option>
								<option id="Financiar">Financiar</option>
								<option id="Vanzari">Vanzari</option>
								<option id="IT">IT</option>
								<option id="Resurse umane">Resurse umane</option>
								<option id="Marketing">Marketing</option>
								<option id="Cercetare &amp; dezvoltare">
									Cercetare &amp; dezvoltare
								</option>
								<option id="Administrativ">Administrativ</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field" style="display: table" id="fieldLocatie">
					<label class="label" style="display: table-row">Locatie</label>
					<div class="control has-icons-left" style="display: table-row">
						<input type="text" class="input is-info" id="inputLocatie" />
					</div>
				</div>
				<div class="field" style="display: table" id="fieldCerinta">
					<label class="label" style="display: table-row">Cerinta</label>
					<div class="control has-icons-left" style="display: table-row">
						<input type="text" class="input is-info" id="inputCerinta" />
						<button class="button is-outlined" id="btnAdaugaCerinta">
							Adauga
						</button>
					</div>
				</div>

				<div class="field" style="display: table" id="fieldResponsabilitate">
					<label class="label" style="display: table-row"
						>Responsabilitate</label
					>
					<div class="control has-icons-left" style="display: table-row">
						<input
							type="text"
							class="input is-info"
							id="inputResponsabilitate"
						/>
						<button class="button is-outlined" id="btnAdaugaResponsabilitate">
							Adauga
						</button>
					</div>
				</div>
				<br />
				<div class="field" style="display: table" id="fieldNivelStudii">
					<label class="label" style="display: table-row">Nivel Studii</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info">
							<select id="selectNivelStudii">
								<option value="Alegeti nivelul de studii">
									Alegeti nivelul de studii
								</option>
								<option value="Necalificat">Necalificat</option>
								<option value="Calificat">Calificat</option>
								<option value="Student">Student</option>
								<option value="Absolvent">Absolvent</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field" style="display: table" id="fieldTipJob">
					<label class="label" style="display: table-row">Tip Job</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info">
							<select id="selectTipJob">
								<option id="Alegeti tipul de job">Alegeti tipul de job</option>
								<option id="Full-Time">Full Time</option>
								<option id="Internship">Internship</option>
								<option id="Part-Time">Part-Time</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field" style="display: table" id="fieldExperienta">
					<label class="label" style="display: table-row">Experienta</label>
					<div class="control has-icons-left" style="display: table-row">
						<div class="select is-info">
							<select id="selectExperienta">
								<option value="Alegeti nivelul de experienta">
									Alegeti nivelul de experienta
								</option>
								<option value="Fara Experienta">Fara experienta</option>
								<option value="Entry Level(<2 ani) ">
									Entry Level( &lt; 2 ani)
								</option>
								<option value="Mid-Level (2-5 Ani)">Mid-Level (2-5 Ani)</option>
								<option value="Senior-Level (> 5 Ani)">
									Senior-Level (> 5 Ani)
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field" style="display: table" id="fieldSalariu">
					<label class="label" style="display: table-row">Salariu</label>
					<input
						type="number"
						class="input is-info"
						id="inputSalariu"
						min="1350"
						placeholder="1350"
					/>
				</div>
				<div class="field" style="display: table" id="fieldPerioadaAplicare">
					<label class="label" style="display: table-row" id="labelPerioada"
						>Perioada aplicare</label
					>
					<div class="control has-icons-left">
						<input type="date" class="input" id="inputDateInceput" />
						<span id="separatorPerioada">-</span>
						<input type="date" class="input" id="inputDateSfarsit" />
					</div>

					<div class="control has-icons-left">
						<label class="label" style="display: table-row" id="labelDescriere"
							>Descriere</label
						>
						<textarea type="text" class="input" id="descriereJob"></textarea>
					</div>
					<div class="control has-icons-left">
						<button
							class="button is-outlined is-info"
							id="btnSendJob"
							@click="sendJob"
						>
							Adauga
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="column is-4 messages hero" id="message-feed">
			<div class="inbox-messages" id="inbox-messages">
				<button class="button is-info" id="btnAddJob" @click="adaugaJob">
					<span class="icon is-small">
						<i class="fas fa-plus"></i>
					</span>
					<span>Adauga Job</span>
				</button>
				

				<div
					v-for="(job, index) in joburi"
					class="card job-card-content"
					v-bind:id="'job-card-' + index"
					:key="index"
					v-bind:data-preview-id="index"
				>
					<div class="card-content">
						<div class="msg-header">
							<img
								src="../assets/IT.png"
								v-if="job.Departament == 'IT'"
								id="imgDepartament"
							/>
							<img
								src="../assets/human-resources.png"
								v-if="job.Departament == 'Resurse umane'"
								id="imgDepartament"
							/>
							<img
								src="../assets/research-and-development.png"
								v-if="job.Departament == 'Cercetare & dezvoltare'"
								id="imgDepartament"
							/>
							<img
								src="../assets/operation.png"
								v-if="job.Departament == 'Administrativ'"
								id="imgDepartament"
							/>
							<img
								src="../assets/social-media.png"
								v-if="job.Departament == 'Marketing'"
								id="imgDepartament"
							/>
							<img
								src="../assets/Vanzari.png"
								v-if="job.Departament == 'Vanzari'"
								id="imgDepartament"
							/>
							<img
								src="../assets/economics.png"
								v-if="job.Departament == 'Financiar'"
								id="imgDepartament"
							/>

							<a :id="'atitluJobPreview-' + index">
								<span id="titluJobPreview" @click="arataJob(job, index)">{{
									job.Titlu
								}}</span>
							</a>
							<span id="jobDepartament">{{ job.Departament }}</span>

							<img
								src="../assets/lock.png"
								id="imgExpirat"
								v-if="
									new Date(
										`${job.Perioada_Aplicare_Sfarsit.split('.')[2]}-${
											job.Perioada_Aplicare_Sfarsit.split('.')[1]
										}-${job.Perioada_Aplicare_Sfarsit.split('.')[0]}`
									).getTime() < today.getTime()
								"
							/>

							<img
								src="../assets/time.png"
								id="imgActiv"
								v-if="
									new Date(
										`${job.Perioada_Aplicare_Sfarsit.split('.')[2]}-${
											job.Perioada_Aplicare_Sfarsit.split('.')[1]
										}-${job.Perioada_Aplicare_Sfarsit.split('.')[0]}`
									).getTime() > today.getTime()
								"
							/>

							<span
								id="txtDisponibil"
								v-if="
									new Date(
										`${job.Perioada_Aplicare_Sfarsit.split('.')[2]}-${
											job.Perioada_Aplicare_Sfarsit.split('.')[1]
										}-${job.Perioada_Aplicare_Sfarsit.split('.')[0]}`
									).getTime() < today.getTime()
								"
								>Inactiv</span
							>
							<span
								id="txtDisponibil"
								v-if="
									new Date(
										`${job.Perioada_Aplicare_Sfarsit.split('.')[2]}-${
											job.Perioada_Aplicare_Sfarsit.split('.')[1]
										}-${job.Perioada_Aplicare_Sfarsit.split('.')[0]}`
									).getTime() > today.getTime()
								"
								>Activ</span
							>
						</div>

						<div class="msg-subject"></div>
						<div class="msg-snippet"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="column is-6 message hero is-hidden" id="message-pane">
			<div class="action-buttons">
				<div class="control is-grouped">
					<span id="titluJob"></span>
				</div>
				<div class="control is-grouped">
					<ul id="jobFull">
						<li id="txtDescriereJob">>Descriere job</li>
						<li id="txtocatie">
							Locatie:<span id="spanLocatie" style="font-weight: normal"></span>
						</li>
						<li id="titluResponsabilitati">
							<span id="spanTitluResponsabilitati">Responsabilitati</span>
							<ul
								id="listaResponsabilitati"
								v-if="joburi[indexJobSelectat] != undefined"
							>
								<li
									v-for="(responsabilitate, index) in joburi[indexJobSelectat]
										.Responsabilitati"
									:key="index"
								>
									<span id="spanResponsabil">
										<i class="fas fa-circle"></i> {{ responsabilitate }}
									</span>
								</li>
							</ul>
						</li>
						<li id="titluCerinte">
							<span id="spanTitluCerinte">Cerinte</span>
							<ul
								id="listaCerinte"
								v-if="joburi[indexJobSelectat] != undefined"
							>
								<li
									v-for="(cerinta, index) in joburi[indexJobSelectat].Cerinte"
									:key="index"
								>
									<span id="spanCerinta">
										<i class="fas fa-check"></i> {{ cerinta }}
									</span>
								</li>
							</ul>
						</li>
						<li>
							<div class="box message-preview">
								<ul id="listaNivelStudii">
									<li>
										<span id="spanTitluNivelStudii">Nivel Studii</span>
									</li>
									<li><span id="liNivelStudii"></span></li>
								</ul>
								<ul id="listaTipJob">
									<li>
										<span id="spanTitluTipJob">Tip Job</span>
									</li>
									<li><span id="liTipJob"></span></li>
								</ul>
								<ul id="listaSalariu">
									<li>
										<span id="spanTitluSalariu">Salariu</span>
									</li>
									<li><span id="liSalariu">1400</span></li>
								</ul>
								<ul id="listaExperienta">
									<li>
										<span id="spanTitluExperienta">Experienta</span>
									</li>
									<li><span id="liExperienta">2 ani</span></li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<p class="buttons" id="buttons-group">
					<button class="button" id="btnEditeazaJob">
						<span class="icon">
							<i class="fas fa-pencil-alt"></i>
						</span>
						<span>Editeaza</span>
					</button>

					<button class="button" id="btnStergeJob">
						<span class="icon is-small">
							<i class="fas fa-times"></i>
						</span>
						<span>Sterge</span>
					</button>

					<button class="button" id="btnCandidati">
						<span class="icon">
							<i class="fas fa-id-badge"></i>
						</span>
						<span>Candidati</span>
					</button>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "Recrutare",
	computed: {},

	data() {
		return {
			joburi: [],
			jobSelectat: "#job-card-0",
			iconSelectat: "#selectIcon-0",
			joburiDisponibile: [],
			linkSelectat: "#atitluJobPreview-0",
			today: new Date(),
			pozitie: "",
			departament: "",
			locatie: "",
			nivel_studii: "",
			tip_job: "",
			experienta: "",
			salariu: "",
			cerinte: [],
			responsabilitati: [],
			perioada_aplicare_inceput: "",
			perioada_aplicare_sfarsit: "",
			descriere: "",
			indexJobSelectat: -1,
			jobAlgoritmSelectat: {},
			algoritmSelectat: {},
		};
	},

	watch: {
		joburiDisponibile: function () {
			this.joburi = this.joburiDisponibile;
		},
	},
	mounted() {
		let btnAdaugaCerinta = document.getElementById("btnAdaugaCerinta");
		btnAdaugaCerinta.addEventListener("click", () => {
			let cerinta = document.getElementById("inputCerinta").value;
			if (cerinta == "") {
				alert("Camp obligatoriu");
			} else {
				this.cerinte.push(cerinta);
				document.getElementById("inputCerinta").value = "";
			}
		});

		document.querySelector("#closeEdit").addEventListener("click", () => {
			document.getElementById("myModalEdit").style.display = "none";
		});

		let btnAdaugaResponsabilitate = document.getElementById(
			"btnAdaugaResponsabilitate"
		);
		btnAdaugaResponsabilitate.addEventListener("click", () => {
			let responsabilitate = document.getElementById(
				"inputResponsabilitate"
			).value;
			if (responsabilitate == "") {
				alert("Camp obligatoriu");
			} else {
				this.responsabilitati.push(responsabilitate);
				document.getElementById("inputResponsabilitate").value = "";
			}
		});
		document
			.getElementsByClassName("close")[0]
			.addEventListener("click", () => {
				document.getElementById("myModal").style.display = "none";
				document.getElementById("inputPozitie").value = "";
				document.getElementById("inputLocatie").value = "";
				document.getElementById("selectDepartament").value =
					"Alegeti departament";
				document.getElementById("selectNivelStudii").value =
					"Alegeti nivelul de studii";
				document.getElementById("selectTipJob").value = "Alegeti tipul de job";
				document.getElementById("selectExperienta").value =
					"Alegeti nivelul de experienta";
				document.getElementById("inputSalariu").value = "";
				document.getElementById("inputCerinta").value = "";
				document.getElementById("inputResponsabilitate").value = "";
				document.getElementById("inputDateInceput").value = "";
				document.getElementById("inputDateSfarsit").value = "";
				this.descriere = document.getElementById("descriereJob").value = "";
			});
		var modal = document.getElementById("myModal");
		window.onclick = function (event) {
			if (event.target == modal) {
				document.getElementById("myModal").style.display = "none";
				document.getElementById("inputPozitie").value = "";
				document.getElementById("inputLocatie").value = "";
				document.getElementById("selectDepartament").value =
					"Alegeti departament";
				document.getElementById("selectNivelStudii").value =
					"Alegeti nivelul de studii";
				document.getElementById("selectTipJob").value = "Alegeti tipul de job";
				document.getElementById("selectExperienta").value =
					"Alegeti nivelul de experienta";
				document.getElementById("inputSalariu").value = "";
				document.getElementById("inputCerinta").value = "";
				document.getElementById("inputResponsabilitate").value = "";
				document.getElementById("inputDateInceput").value = "";
				document.getElementById("inputDateSfarsit").value = "";
				this.descriere = document.getElementById("descriereJob").value = "";
			}
		};
		axios.get("http://localhost:5000/joburi").then((response) => {
			this.joburi = response.data.joburi;
			this.joburiDisponibile = response.data.joburi;
		});
	},
	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth");
		}
	},
	methods: {
		programareInterviu() {
			this.$router.push("/programareInterviu")
		},
		afisezaCandidatiFiltrati() {
			this.$router.push("/candidatiFiltrati");
		},
		salveazaEdit(job, index) {
			console.log(job);
			console.log(index);
			//apelam ruta de editare a jobului

			var titluJob = document.querySelector("#inputPozitieEdit").value;
			var departament = document.querySelector("#selectDepartamentEdit").value;
			var locatie = document.querySelector("#inputLocatieEdit").value;
			var nivel_studii = document.querySelector("#selectNivelStudiiEdit").value;
			var tip_job = document.querySelector("#selectTipJobEdit").value;
			var experienta = document.querySelector("#selectExperientaEdit").value;
			var salariu = document.querySelector("#inputSalariuEdit").value;
			var perioada_aplicare_inceput = document.querySelector(
				"#inputDateInceputEdit"
			).value;
			var perioada_aplicare_sfarsit = document.querySelector(
				"#inputDateSfarsitEdit"
			).value;

			var perioada_aplicare_inceput_formatata =
				perioada_aplicare_inceput.split("-")[2] +
				"." +
				perioada_aplicare_inceput.split("-")[1] +
				"." +
				perioada_aplicare_inceput.split("-")[0];
			var perioada_aplicare_sfarsit_formatata =
				perioada_aplicare_sfarsit.split("-")[2] +
				"." +
				perioada_aplicare_sfarsit.split("-")[1] +
				"." +
				perioada_aplicare_sfarsit.split("-")[0];

			var descriere = document.querySelector("#inputDescriereEdit").value;
			let jobNou = {
				Departament: departament,
				Titlu: titluJob,
				Descriere: descriere,
				Nivel_Studii: nivel_studii,
				Locatie: locatie,
				Tip_Job: tip_job,
				Experienta: experienta,
				Salariu_Net: salariu,
				Perioada_Aplicare_Inceput: perioada_aplicare_inceput_formatata,
				Perioada_Aplicare_Sfarsit: perioada_aplicare_sfarsit_formatata,
			};
			axios
				.put("http://localhost:5000/joburi/" + job._id, jobNou)
				.then(() => {
					alert("Actualizare reusita");
					window.location.reload(true);
				})
				.catch((err) => console.log(err));
		},
		stergeJob(job, index) {
			console.log(job._id);
			axios
				.delete("http://localhost:5000/joburi/" + job._id)
				.then(() => {
					axios.get("http://localhost:5000/joburi").then((response) => {
						this.joburi = response.data.joburi;
						this.joburiDisponibile = response.data.joburi;

						console.log(index);
						window.location.reload(true);
					});
				})
				.catch((err) => console.log(err));
		},
		sendJob() {
			this.pozitie = document.getElementById("inputPozitie").value;
			this.locatie = document.getElementById("inputLocatie").value;
			this.departament = document.getElementById("selectDepartament").value;
			this.nivel_studii = document.getElementById("selectNivelStudii").value;
			this.tip_job = document.getElementById("selectTipJob").value;
			this.experienta = document.getElementById("selectExperienta").value;
			this.salariu = document.getElementById("inputSalariu").value;
			this.perioada_aplicare_inceput =
				document.getElementById("inputDateInceput").value;
			this.perioada_aplicare_sfarsit =
				document.getElementById("inputDateSfarsit").value;

			var perioada_aplicare_inceput_formatata =
				this.perioada_aplicare_inceput.split("-")[2] +
				"." +
				this.perioada_aplicare_inceput.split("-")[1] +
				"." +
				this.perioada_aplicare_inceput.split("-")[0];
			var perioada_aplicare_sfarsit_formatata =
				this.perioada_aplicare_sfarsit.split("-")[2] +
				"." +
				this.perioada_aplicare_sfarsit.split("-")[1] +
				"." +
				this.perioada_aplicare_sfarsit.split("-")[0];

			this.descriere = document.getElementById("descriereJob").value;

			//validari
			if (this.pozitie == "") {
				alert("Pozitia vacanta trebuie specificata");
				return;
			}

			if (this.departament == "Alegeti departament") {
				alert("Departamentul jobului corespunzator trebuie specificata");
				return;
			}
			if (this.locatie == "") {
				alert("Locatia jobului corespunzator trebuie specificata");
				return;
			}
			if (this.cerinte.length == 0) {
				alert("Jobul vacant trebuie sa aiba minim o cerinta!");
				return;
			}
			if (this.responsabilitati.length == 0) {
				alert(
					"Jobul vacant trebuie sa aiba asociata  minim o responsabilitate!"
				);
				return;
			}
			if (this.nivel_studii == "Alegeti nivelul de studii") {
				alert("Nivelul de studii trebuie specificat");
				return;
			}
			if (this.tip_job == "Alegeti tipul de job") {
				alert("Tipul jobului trebuie specificat");
				return;
			}
			if (this.experienta == "Alegeti nivelul de experienta") {
				alert("Experienta necesara trebuie specificata");
				return;
			}
			if (this.salariu == "") {
				alert("Salariul jobului corespunzator trebuie specificat");
				return;
			}
			if (this.perioada_aplicare_inceput == "") {
				alert("Inceputul perioada de aplicare trebuie specificat");
				return;
			}
			if (this.perioada_aplicare_sfarsit == "") {
				alert("Sfarsitul perioade de aplicare trebuie specificat");
				return;
			}

			if (this.experienta == "Alegeti nivelul de experienta") {
				alert("Experienta necesara trebuie specificata");
				return;
			}

			if (this.descriere == "") {
				alert("Descrierea jobului trebuie specificata");
				return;
			}
			//

			//---formatre data inainte de inserare////!!
			//..........
			//luare valuare din departament cu select
			let job = {
				Departament: this.departament,
				Titlu: this.pozitie,
				Descriere: this.descriere,
				Responsabilitati: this.responsabilitati,
				Cerinte: this.cerinte,
				Experienta: this.experienta,
				Locatie: this.locatie,
				Tip_Job: this.tip_job,
				Nivel_Studii: this.nivel_studii,
				Salariu_Net: this.salariu,
				Perioada_Aplicare_Inceput: perioada_aplicare_inceput_formatata,
				Perioada_Aplicare_Sfarsit: perioada_aplicare_sfarsit_formatata,
				Algoritm: {},
				Algoritm_Romana: {},
			};
			axios
				.post("http://localhost:5000/joburi", job)
				.then(() => {
					alert("Job adaugat");
					axios.get("http://localhost:5000/joburi").then((response) => {
						this.joburi = response.data.joburi;
						this.joburiDisponibile = response.data.joburi;
						document.getElementById("myModal").style.display = "none";
					});
				})
				.catch((err) => console.log(err));
		},
		adaugaJob() {
			this.responsabilitati = [];
			this.cerinte = [];
			document.getElementById("myModal").style.display = "block";
			document.getElementById("inputPozitie").value = "";
			document.getElementById("inputLocatie").value = "";
			document.getElementById("selectDepartament").value =
				"Alegeti departament";
			document.getElementById("selectNivelStudii").value =
				"Alegeti nivelul de studii";
			document.getElementById("selectTipJob").value = "Alegeti tipul de job";
			document.getElementById("selectExperienta").value =
				"Alegeti nivelul de experienta";
			document.getElementById("inputSalariu").value = "";
			document.getElementById("inputCerinta").value = "";
			document.getElementById("inputResponsabilitate").value = "";
			document.getElementById("inputDateInceput").value = "";
			document.getElementById("inputDateSfarsit").value = "";

			this.descriere = document.getElementById("descriereJob").value = "";
		},

		editeazaJob(job, index) {
			console.log(`Editeaza ${job} ${index}`);
			document.querySelector("#myModalEdit").style.display = "block";
			document.querySelector(".inputPozitieEdit").value = job.Titlu;
			document.querySelector(".selectDepartamentEdit").value = job.Departament;
			document.querySelector(".inputLocatieEdit").value = job.Locatie;
			document.querySelector("#selectNivelStudiiEdit").value = job.Nivel_Studii;
			document.querySelector("#selectTipJobEdit").value = job.Tip_Job;
			document.querySelector("#selectExperientaEdit").value = job.Experienta;
			document.querySelector("#inputSalariuEdit").value = job.Salariu_Net;
			document.querySelector("#inputDescriereEdit").value = job.Descriere;
			let Data_Aplicare_Inceput = job.Perioada_Aplicare_Inceput;
			let Data_Aplicare_Sfarsit = job.Perioada_Aplicare_Sfarsit;
			let Data_Aplicare_Inceput_Formatata =
				Data_Aplicare_Inceput.split(".")[2] +
				"-" +
				Data_Aplicare_Inceput.split(".")[1] +
				"-" +
				Data_Aplicare_Inceput.split(".")[0];
			let Data_Aplicare_Sfarsit_Formatata =
				Data_Aplicare_Sfarsit.split(".")[2] +
				"-" +
				Data_Aplicare_Sfarsit.split(".")[1] +
				"-" +
				Data_Aplicare_Sfarsit.split(".")[0];
			document.querySelector("#inputDateInceputEdit").value =
				Data_Aplicare_Inceput_Formatata;
			document.querySelector("#inputDateSfarsitEdit").value =
				Data_Aplicare_Sfarsit_Formatata;

			document
				.querySelector("#btnSalveazaEdit")
				.addEventListener("click", () => {
					this.salveazaEdit(job, index);
				});
		},

		arataJob(job, index) {
			//setez emoticonu
			if (this.indexJobSelectat == index) {
				return;
			}
			this.indexJobSelectat = index;
			//

			document.querySelector("#btnCandidati").addEventListener("click", () => {
				this.$router.push(`/candidati/${job._id}`);
			});
			document
				.querySelector("#btnEditeazaJob")
				.addEventListener("click", () => {
					this.editeazaJob(job, index);
				});
			document.querySelector("#btnStergeJob").addEventListener("click", () => {
				this.stergeJob(job, index);
			});

			document.querySelector(this.linkSelectat).classList.remove("linkActiv");

			document.querySelector("#message-pane").classList.remove("is-hidden");
			document.querySelector(".card").classList.remove("active");

			document.querySelector("#job-card-" + index).classList.add("active");

			document.querySelector("#titluJob").innerHTML = job.Titlu;
			document
				.querySelector("#atitluJobPreview-" + index)
				.classList.add("linkActiv");
			this.linkSelectat = `#atitluJobPreview-${index}`;
			document.querySelector("#spanLocatie").innerHTML = job.Locatie;
			document.querySelector("#txtDescriereJob").innerHTML = job.Descriere;
			this.jobSelectat = "#job-card-" + index;
			var listaCerinte = job.Cerinte;
			console.log("Lista Cerinte");
			console.log(listaCerinte);
			//potrivireCerinte
			console.log("joburi");
			console.log(this.joburi);

			console.log("index");
			console.log(this.joburi[this.indexJobSelectat]);
			//let ulListaCerinte = document.querySelector("#listaCerinte");

			// for (let i = 0; i < ulListaCerinte.childNodes.length; i++) {
			// 	ulListaCerinte.removeChild(ulListaCerinte.childNodes[i]);
			// }
			// for (let i = 0; i < job.Cerinte.length; i++) {
			// 	let li = document.createElement("li");
			// 	let span = document.createElement("span");

			// 	span.innerHTML = `<i class="fas fa-check"></i>${listaCerinte[i]}`;
			// 	li.appendChild(span);
			// 	ulListaCerinte.appendChild(li);
			// }

			//potrivireResponsabilitati
			// var listaResponsabilitati = job.Responsabilitati;
			// let ulListaResponsabilitati = document.querySelector(
			// 	"#listaResponsabilitati"
			// );

			// for (let i = 0; i < ulListaResponsabilitati.childNodes.length; i++) {
			// 	ulListaResponsabilitati.removeChild(
			// 		ulListaResponsabilitati.childNodes[i]
			// 	);
			// }
			// for (let i = 0; i < listaResponsabilitati.length; i++) {
			// 	let li = document.createElement("li");
			// 	let span = document.createElement("span");
			// 	span.id = "spanResponsabil";
			// 	span.innerHTML = `<i class="fas fa-circle"></i> ${listaResponsabilitati[i]}`;
			// 	li.appendChild(span);
			// 	ulListaResponsabilitati.appendChild(li);
			// }

			//potrivire nivel absolvent...nivel studii tip experienta salariu
			document.getElementById("liNivelStudii").innerText = job.Nivel_Studii;
			document.getElementById("liTipJob").innerText = job.Tip_Job;
			document.getElementById("liExperienta").innerText = job.Experienta;
			document.getElementById("liSalariu").innerText = job.Salariu_Net;
		},

		inchideCerere() {
			document.querySelector(".modal").classList.remove("is-active");
		},
		inchideModal() {
			document.querySelector("#myModal").style.display = "none";
		},
	},
};
</script>
<style scoped>
#message-pane {
	margin-top: 30px;
	width: 50vw;
	margin-left: 130px;
	max-width: 40vw;
	height: 92vh;
	overflow: auto;
	background: rgb(247, 240, 240);
}

#message-pane::-webkit-scrollbar {
	display: none; /* for Chrome, Safari, and Opera */
}
#message-feed::-webkit-scrollbar {
	display: none; /* for Chrome, Safari, and Opera */
}
#message-feed {
	margin-left: 35px;
	margin-top: 50px;
	width: 30vw;
	height: 82vh;
	overflow: auto;
}
#card-content {
	height: 50vh;
}
#mail-app {
	width: 60vw;
	height: 0vh;
}
.job-card-content {
	height: 12vh;
	margin-top: 10px;
	border: 1px solid rgb(147, 141, 236);
}
.active-back {
	background: rgb(219, 230, 248);
}
#titluJoburiVacante {
	font-size: 23px;
	width: 1360px;
	padding-top: -20px;
	margin-bottom: 30px;
	margin-top: -50px;
}
#btnAddJob {
	margin-top: -20px;
	margin-left: -30px;
}
#triangle-topleft {
	width: 0;
	height: 0;
	border-top: 200px solid rgb(239, 239, 252);
	border-right: 100px solid transparent;
}
#imgDepartament {
	position: absolute;
	margin-top: -12px;
	margin-left: -210px;
}
#titluJobPreview {
	position: absolute;
	margin-top: -20px;
	margin-left: -121px;
	font-weight: bold;
	padding-left: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-right: 50px;
	font-size: 20px;
}
#jobDepartament {
	position: absolute;
	font-style: italic;
	margin-top: 17.5px;
	margin-left: -50px;
}
#imgExpirat,
#imgActiv {
	position: absolute;
	margin-top: 42px;
	height: 27px;
	width: 30px;
	margin-left: -50px;
}
#txtDisponibil {
	position: absolute;
	color: rgba(0, 0, 0, 0.411);
	margin-left: -20px;
	margin-top: 45px;
}
#imgSearch {
	margin-top: 60px;
}
#msgNrCandidati {
	position: absolute;
	margin-top: 70px;
	font-size: 15px;
	font-style: italic;
	margin-left: -125px;
}
#titluJob {
	font-size: 25px;
	font-family: "Times New Roman", Times, serif;
	font-weight: bold;
}
#txtDescriereJob {
	text-align: justify;
	margin-bottom: 10px;
	margin-top: 10px;
	font-size: 18px;
}
#titluResponsabilitati {
	/* position: absolute; */
	font-weight: normal;
	margin-top: 20px;
	margin-left: -490px;
}
#spanTitluResponsabilitati {
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	border-bottom: 1px solid black;
}
#jobFull {
	list-style: none;
}
#listaResponsabilitati {
	position: relative;
	margin-top: 10px;
	box-sizing: border-box;
	margin-left: 520px;
	width: 25vw;
	font-style: normal;
	text-align: justify;
	list-style-type: none;
}
#txtocatie {
	margin-top: 5px;
	margin-left: -489px;
	font-size: 20px;
	font-weight: bold;
}
#listaResponsabilitati li {
	font-size: 14px;
	width: 530px;
	margin-left: 0px;

	text-align: justify;
	box-sizing: border-box;
	font-style: normal;
	max-width: 1326px;
	word-wrap: break-word;
}
#spanLocatie {
	font-size: 18px;
	font-weight: normal;
}

#titluCerinte {
	margin-top: 10px;
}
#spanTitluCerinte {
	font-size: 20px;
	font-weight: bold;
	border-bottom: 1px solid black;
	margin-left: -571px;
}
#listaCerinte {
	position: relative;
	margin-top: 10px;
	box-sizing: border-box;
	margin-left: 30px;
	width: 25vw;
	font-style: bold;
	text-align: justify;
	list-style-type: none;
}
#listaCerinte li {
	font-size: 14px;
	width: 530px;
	margin-left: 0px;
	font-weight: normal;
	text-align: justify;
	box-sizing: border-box;
	max-width: 1326px;
	word-wrap: break-word;
}
.selectIcon {
	margin-left: 230px;
	padding-left: 10px;
	margin-top: -10px;
}
#listaNivelStudii {
	margin-top: 2px;
}
#spanTitluNivelStudii {
	margin-top: 5px;
	margin-left: -531px;
	font-size: 19px;
	font-weight: bold;
}
.box {
	position: relative;
	margin-top: 15px;
}
#liNivelStudii {
	margin-top: -40px;
	font-size: 17px;
	margin-left: -541px;
}
#listaTipJob {
	margin-top: -50px;
	font-size: 18px;
	margin-left: 491px;
}
#spanTitluTipJob {
	font-size: 19px;
	font-weight: bold;
}
#listaSalariu {
	margin-top: 10px;
	font-size: 18px;
	margin-left: -538px;
}
#spanTitluSalariu {
	font-size: 19px;
	font-weight: bold;
}
#listaExperienta {
	margin-top: -54px;
	margin-left: 490px;
}
#spanTitluExperienta {
	font-size: 19px;
	font-weight: bold;
}
.linkActiv {
	color: rgb(187, 205, 221);
}

.modal,
.modalEdit {
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
.modal-content,
.modal-contentEdit {
	background-color: #e9f2ff;
	margin: auto;
	padding: 20px;
	margin-left: 260px;
	height: 80vh;
	width: 20vw;
	border: 1px solid #888;
	width: 80%;
}

/* The Close Button */
.close,
.closeEdit {
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
.closeEdit:hover,
.closeEdit:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}
#fieldDepartament,
#fieldDepartamentEdit {
	margin-top: -77px;
	margin-left: 470px;
}
#fieldDepartamentEdit {
	margin-top: -65px;
}
#fieldLocatie,
#fieldLocatieEdit {
	margin-top: -76px;
	margin-left: 770px;
}
#fieldLocatieEdit {
	margin-top: -65px;
}
#fieldPozitie,
#fieldPozitieEdit {
	margin-left: 170px;
}
#fieldCerinta {
	margin-top: 25px;
	width: 50vh;
	margin-left: 100px;
}
#btnAdaugaCerinta {
	position: absolute;
	margin-top: -3px;
	margin-left: 10px;
}
#fieldResponsabilitate {
	margin-top: -78px;
	margin-left: 640px;
	width: 50vh;
}
#btnAdaugaResponsabilitate {
	position: absolute;
	margin-bottom: 20px;
	margin-left: 10px;
	margin-top: -2px;
}
#fieldNivelStudii,
#fieldNivelStudiiEdit {
	margin-top: 10px;
	padding-top: 10px;
	margin-left: 160px;
}
#fieldTipJob,
#fieldTipJobEdit {
	margin-top: -77px;
	font-size: 18px;
	margin-left: 420px;
}
#fieldTipJobEdit {
	margin-top: -65px;
}
#fieldExperienta,
#fieldExperientaEdit {
	margin-top: -77px;
	margin-left: 660px;
}
#fieldExperientaEdit {
	margin-top: -66px;
}
#fieldSalariu,
#fieldSalariuEdit {
	margin-top: -77px;
	margin-left: 950px;
}
#fieldSalariuEdit {
	margin-top: -65px;
}
#labelPerioada,
#labelPerioadaEdit {
	position: absolute;
	margin-top: 45px;
	font-size: 18px;
	margin-left: 545px;
}

#inputDateInceput,
#inputDateInceputEdit {
	margin-top: 90px;
	height: 50px;
	width: 250px;
	margin-left: 280px;
}
#separatorPerioada,
#separatorPerioadaEdit {
	position: absolute;
	font-size: 94px;

	margin-top: 30px;
	margin-left: 68px;
}
#inputDateSfarsit,
#inputDateSfarsitEdit {
	margin-top: 90px;
	height: 50px;
	width: 250px;
	margin-left: 170px;
}
#descriereJob,
#labelDescriereEdit {
	height: 140px;
	margin-left: 290px;
	margin-top: 90px;
	width: 470px;
}

#labelDescriere,
#labelDescriereEdit {
	font-size: 18px;
	position: absolute;
	margin-left: 580px;
	margin-top: 50px;
}
#labelDescriereEdit {
	position: absolute;
	margin-left: 380px;
}
#inputDescriereEdit {
	margin-top: 90px;
	width: 25vw;
	height: 28vh;
	margin-left: 280px;
}
#btnSendJob {
	margin-left: 280px;
}
.message-preview {
	margin-top: 180px;
}
#buttons-group {
	margin-left: 117px;
}
#spanResponsabil {
	position: relative;
	width: 38px;
	font-size: 18px;
	font-weight: normal;
	font-style: normal;
	text-align: justify;
}
#selectExperienta {
	margin-left: -10px;
}
#btnSalveazaEdit {
	position: absolute;
	margin-top: -20px;
	margin-left: 350px;
}
#myModalEdit {
	margin-top: -20px;
}
.modal-contentEdit {
	height: 85vh;
}
#mail-app {
}
#spanCerinta {
	font-size: 18px;
}
#btnCandidatiFiltrati {
	margin-top: -20px;
	margin-left: -390px;
}
</style>