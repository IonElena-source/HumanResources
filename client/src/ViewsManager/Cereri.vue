<template>
	<div>
		<div id="myModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-header">
					<span class="close">&times;</span>
					<h2>Mesaj primit</h2>
				</div>
				<div class="modal-body">
					<p id="textContent">
						Nu aveti niciun mesaj pentru aceasta cerere de la angajat.
					</p>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="section">
				<div class="columns">
					<div class="column has-text-centered">
						<br />
					</div>
				</div>
				<div id="app" class="row columns is-multiline">
					<div
						v-for="(cerere, index) in cereriNeverificate"
						:key="index"
						class="column is-4"
					>
						<div class="card large" id="cardCerere">
							<div class="card-image">
								<figure class="image is-16by9" id="flag">
									<img
										:src="require(`../profiles/${cerere.Angajat.Poza_Profil}`)"
										id="imgAngajat"
									/>
								</figure>
							</div>
							<div class="card-content">
								<div class="media">
									<div class="media-left">
										<figure class="image is-48x48"></figure>
									</div>
									<div class="media-content card-content">
										<p class="title is-4 no-padding" id="titleAngajat">
											{{ cerere.Angajat.Nume }} {{ cerere.Angajat.Prenume }}
										</p>

										<p class="subtitle is-6"></p>
									</div>
								</div>
								<div class="content">
									<button style="display: none">Aproba</button>
									<span id="tipCerere">{{ cerere.Tip_Cerere }}</span>
									<button style="display: none">Respinge</button>
									<div class="background-icon">
										<span class="icon-twitter">
											<i class="fas fa-calendar-alt fa-lg"></i>
											{{ cerere.Data_Inceput.split("-")[0] }}/{{
												cerere.Data_Inceput.split("-")[1]
											}}/{{ cerere.Data_Inceput.split("-")[2] }}&nbsp; -
											&nbsp;&nbsp; {{ cerere.Data_Sfarsit.split("-")[0] }}/{{
												cerere.Data_Sfarsit.split("-")[1]
											}}/{{ cerere.Data_Sfarsit.split("-")[2] }}

											<i class="fas fa-calendar-alt fa-lg"></i
										></span>
									</div>
									<button
										class="button is-success is-light"
										style="margin-left: 10px"
										@click="aproba(cerere)"
									>
										<span class="icon is-small">
											<i class="fas fa-check"></i>
										</span>
										<span>Aproba</span>
									</button>
									<button
										class="button is-info is-light"
										@click="arataMesaj(cerere)"
									>
										<span class="icon is-small">
											<i class="fas fa-envelope"></i>
										</span>
										<span>Mesaj</span>
									</button>
									<button
										class="button is-danger is-light"
										@click="respinge(cerere)"
									>
										<span class="icon is-small">
											<i class="fas fa-times"></i>
										</span>
										<span>Respinge</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Cereri",
	data() {
		return {
			user: {},
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			angajat1: {},
			nr: 0,
		};
	},
	computed: {
		...mapGetters(["toateCererileNeverificate"]),

		cereriNeverificate: {
			get() {
				return this.toateCererileNeverificate;
			},
			set(cereriNeverificateNoi) {
				return cereriNeverificateNoi;
			},
		},
		nrCereriNeverificate: {
			get() {
				return this.toateCererileNeverificate.length;
			},
		},
	},
	watch: {
		cereriNeverificate: function () {
			if (this.nrCereriNeverificate > this.nr) {
				// this.nr = this.nrCereriNeverificate;
				// document.querySelector(".alert").classList.add("show");
				// document.querySelector(".alert").classList.add("showAlert");
				// document.querySelector(".alert").classList.remove("hide");
			}
		},
	},
	methods: {
		...mapActions(["getCereri"]),
		arataMesaj(cerere) {
			var modal = document.getElementById("myModal");
			if (cerere.Mesaj !== "") {
				document.getElementById("textContent").innerHTML = cerere.Mesaj;
			} else {
				document.getElementById("textContent").innerHTML =
					"Nu aveti nicun mesaj pentru aceasta cerere de la angajat";
			}

			modal.style.display = "block";
		},
		aproba(cerere) {
			axios
				.put("http://localhost:5000/cereri/aprobaCerere/" + cerere._id)
				.then(() => {
					this.getCereri();
				});
		},
		respinge(cerere) {
			axios
				.put("http://localhost:5000/cereri/respingeCerere/" + cerere._id)
				.then(() => {
					this.getCereri();
				});
		},
		test() {
			console.log(this.cereri !== 0);
			console.log(this.angajat1);
			console.log(typeof this.cereri[0].Angajat);
		},
		showUser() {
			console.log(this.user);
		},
	},
	created() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/manageri/auth");
		}
	},

	mounted() {
	
		//	this.cereri=this.$route.params.cereri
		var span = document.getElementsByClassName("close")[0];
		span.addEventListener("click", () => {
			var modal = document.getElementById("myModal");
			modal.style.display = "none";
		});
		window.onclick = function (event) {
			var modal = document.getElementById("myModal");
			if (event.target === modal) {
				modal.style.display = "none";
			}
		};
		this.nr = this.nrCereriNeverificate;
	},
	beforeMount() {
		window.addEventListener("beforeunload", (e) => {
			e.preventDefault();
		
		});
	},
};
</script>
<style scoped>
#imgAngajat {
	width: 100px;
	height: 100px;
	margin-top: 5px;
	margin-left: 150px;
}
#cardCerere {
	background-color: rgba(228, 224, 224, 0.664);
}

#flag {
	width: 820px;
	height: 56px;
	box-sizing: content-box;
	padding-top: 15px;
	position: relative;
	background: rgb(131, 167, 214);
	color: white;
	font-size: 11px;
	letter-spacing: 0.2em;
	text-align: center;
	text-transform: uppercase;
}
#flag:after {
	content: "";
	position: absolute;
	left: 20;
	right: 40;
	bottom: 0;
	width: 20px;
	height: 20px;
	border-bottom: 13px solid #eee;
	border-left: 55px solid transparent;
	border-right: 45px solid transparent;
}
#titleAngajat {
	margin-top: 20px;
	padding-bottom: 10px;
	margin-left: -50px;
}
#tipCerere {
	margin-top: -140px;
	padding-bottom: 10px;
	margin: 0 auto;
	font-size: 18px;
	font-style: italic;
	color: rgb(90, 96, 107);
}
.media-content {
	align-content: center;
	align-items: center;
}
.media-content h1 {
	text-align: center;
}
.content {
	margin-top: -50px;
}
.modal {
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
.modal-content {
	position: relative;
	background-color: #fefefe;
	margin: auto;
	margin-top: 140px;
	margin-left: 600px;
	padding: 0;
	border: 1px solid #888;
	width: 40%;
	height: 20%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-webkit-animation-name: animatetop;
	-webkit-animation-duration: 0.4s;
	animation-name: animatetop;
	animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
	from {
		top: -300px;
		opacity: 0;
	}
	to {
		top: 0;
		opacity: 1;
	}
}

@keyframes animatetop {
	from {
		top: -300px;
		opacity: 0;
	}
	to {
		top: 0;
		opacity: 1;
	}
}

/* The Close Button */
.close {
	color: white;
	float: right;
	margin-top: -10px;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

.modal-header {
	padding: 5px 16px;
	background-color: #5f85d8;
	color: white;
	font-size: 18px;
}

.modal-body {
	margin-top: 20px;
	padding: 2px 16px;
}

.modal-footer {
	padding: 2px 16px;
	background-color: #5cb8b8;
	color: white;
}
.background-icon {
	margin-top: 20px;
}

</style>