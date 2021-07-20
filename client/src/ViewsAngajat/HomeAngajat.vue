<template>
	<div class="HomeAngajat">
		<SideBarAngajat
			v-bind:pIsWoman="this.isWomen"
			v-bind:pIsMan="this.isMan"
		></SideBarAngajat>
		<div class="contentm">
			<div class="alert hide">
				<span class="fas fa-exclamation-circle"></span>
				<span class="msg">Ati primit un raspuns!</span>
				<div class="close-btn" @click="inchideNotificare">
					<span class="fas fa-times"></span>
				</div>
			</div>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
		
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import SideBarAngajat from "./SideBarAngajat";
export default {
	name: "HomeAngajat",
	components: { SideBarAngajat },
	data() {
		return {
			user: {},
			angajatLogat: JSON.parse(localStorage.getItem("angajatLogat")),
			isWomen: false,
			isMan: false,
			nrCereriAprobate: 0,
			nrCereriRespinse: 0,
		};
	},

	computed: {
		...mapGetters(["cereriAsteptare"]),

		toateCereriAsteptare: {
			get() {
				return this.cereriAsteptare;
			},
			set(cereriAsteptareNoi) {
				return cereriAsteptareNoi;
			},
		},
	},
	methods: {
		inchideNotificare(){
			document.querySelector(".alert").classList.remove("show");
			document.querySelector(".alert").classList.add("hide");
		},
		...mapActions(["getCereriAsteptare"]),
		showUser() {
			console.log(this.user);
		},
	},
	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth");
		}
	},
	watch: {
		toateCereriAsteptare: function () {
			axios
				.get(
					"http://localhost:5000/cereri/filtrareCereri/" +
						this.angajatLogat._id +
						"/" +
						"Respinsa"
				)
				.then((response) => {
					if (response.data.cereri.length > this.nrCereriRespinse) {
						document.querySelector(".alert").classList.add("show");
						document.querySelector(".msg").innerHTML = "Ati primit un refuz";
						document.querySelector(".alert").classList.add("showAlert");
						document.querySelector(".alert").style.color="red"
						
						document.querySelector(".alert").classList.remove("hide");
						this.nrCereriRespinse = response.data.cereri.length;
					}
				});

			axios
				.get(
					"http://localhost:5000/cereri/filtrareCereri/" +
						this.angajatLogat._id +
						"/" +
						"Aprobata"
				)
				.then((response) => {
					if (response.data.cereri.length > this.nrCereriAprobate) {
						document.querySelector(".alert").classList.add("show");
						document.querySelector(".alert").classList.add("alertaprobare")
						document.querySelector(".msg").innerHTML = "Ati primit o aprobare";
						document.querySelector(".alert").classList.add("showAlert");
						document.querySelector(".alert").classList.remove("hide");
						this.nrCereriAprobate = response.data.cereri.length;
					}
				});
			////------//////////////
			console.log(`Cereri in asteptare pt ion ${this.toateCereriAsteptare}`);

			console.log(
				`this.toateCereriAsteptare ${this.toateCereriAsteptare.length}`
			);
			console.log(`this.nrCereriAsteptare ${this.nrCereriInAsteptare}`);
			if (this.nrCereriInAsteptare - this.toateCereriAsteptare.length == 1) {
				this.nrCereriInAsteptare = this.toateCereriAsteptare.length;
			}
			
		},
	},

	mounted() {
		this.getCereriAsteptare(this.angajatLogat._id);
		this.angajatLogat = JSON.parse(localStorage.getItem("angajatLogat"));
		console.log("AngajatLogat in Home");
		//luam numarul de cereri respinse
		axios
			.get(
				"http://localhost:5000/cereri/filtrareCereri/" +
					this.angajatLogat._id +
					"/" +
					"Respinsa"
			)
			.then((response) => {
				if (response.data.cereri.length == 0) {
					this.nrCereriRespinse = 0;
				} else {
					this.nrCereriRespinse = response.data.cereri.length;
				}
			});
		axios
			.get(
				"http://localhost:5000/cereri/filtrareCereri/" +
					this.angajatLogat._id +
					"/" +
					"Aprobata"
			)
			.then((response) => {
				if (response.data.cereri.length == 0) {
					this.nrCereriAprobate = 0;
				} else {
					this.nrCereriAprobate = response.data.cereri.length;
				}
			});

		console.log(this.angajatLogat);
		if (this.angajatLogat.Sex === "F") {
			this.isWomen = true;
			this.isMan = false;
		} else {
			if (this.angajatLogat.Sex === "M") {
				this.isWomen = false;
				this.isMan = true;
			}
		}

		console.log("cereri in asteptare");
		console.log(this.nrCereriInAsteptare);
	},
};
</script>
<style scoped>
.HomeAngajat {
	display: grid;
	grid-template-columns: 1fr 5fr;
	background-color: rgb(58, 138, 238);
	height: 100vh;
	width: 100vw;
}
.content {
	background-color: white;
	border-radius: 10px;
	width: 81.5vw;
	height: 96.5vh;
	overflow: auto;
	margin: 6px 0px 3px;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: translateX(-2em);
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}
.contentm {
	background-color: white;
	border-radius: 20px;
	width: 81.5vw;
	height: 97vh;
	overflow: auto;
	margin: 6px 0px 3px;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: translateX(-2em);
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}

.alert {
	background: #fca8a8;
	padding: 20px 40px;
	min-width: 420px;
	position: absolute;
	right: 0;
	top: 10px;
	border-radius: 4px;
	border-left: 8px solid #964047;
	overflow: hidden;
	opacity: 0;
	pointer-events: none;
}
.alert.showAlert {
	opacity: 1;
	pointer-events: auto;
}
.alert.show {
	animation: show_slide 1s ease forwards;
}
@keyframes show_slide {
	0% {
		transform: translateX(100%);
	}
	40% {
		transform: translateX(-10%);
	}
	80% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-10px);
	}
}
.alert.hide {
	animation: hide_slide 1s ease forwards;
}
@keyframes hide_slide {
	0% {
		transform: translateX(-10px);
	}
	40% {
		transform: translateX(0%);
	}
	80% {
		transform: translateX(-10%);
	}
	100% {
		transform: translateX(100%);
	}
}
.alert .fa-exclamation-circle {
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
	color: #881720;
	font-size: 30px;
}
.alert .msg {
	padding: 0 20px;
	font-size: 18px;
	color: #750f2ee8;
}
.alert .close-btn {
	position: absolute;
	right: 0px;
	top: 50%;
	transform: translateY(-50%);
	background: #630808;
	padding: 20px 18px;
	cursor: pointer;
}
.alert .close-btn:hover {
	background: #52050e;
}
.alert .close-btn .fas {
	color: #a11435;
	font-size: 22px;
	line-height: 40px;
}



.alertaprobare {
	background: #a1f1a1;
	padding: 20px 40px;
	min-width: 420px;
	position: absolute;
	right: 0;
	top: 10px;
	border-radius: 4px;
	border-left: 8px solid #0e851e;
	overflow: hidden;
	opacity: 0;
	pointer-events: none;
}
.alertaprobare.showAlert {
	opacity: 1;
	pointer-events: auto;
}
.alertaprobare.show {
	animation: show_slide 1s ease forwards;
}@keyframes show_slide {
	0% {
		transform: translateX(100%);
	}
	40% {
		transform: translateX(-10%);
	}
	80% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-10px);
	}
}
.alertaprobare.hide {
	animation: hide_slide 1s ease forwards;
}
@keyframes hide_slide {
	0% {
		transform: translateX(-10px);
	}
	40% {
		transform: translateX(0%);
	}
	80% {
		transform: translateX(-10%);
	}
	100% {
		transform: translateX(100%);
	}
}
.alertaprobare .fa-exclamation-circle {
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
	color: #216613;
	font-size: 30px;
}
.alertaprobare .msg {
	padding: 0 20px;
	font-size: 18px;
	color: #0b4224e8;
}
.alertaprobare .close-btn {
	position: absolute;
	right: 0px;
	top: 50%;
	transform: translateY(-50%);
	background: #55c571;
	padding: 20px 18px;
	cursor: pointer;
}
.alertaprobare .close-btn:hover {
	background: #43c232;
}
.alertaprobare .close-btn .fas {
	color: #025c11;
	font-size: 22px;
	line-height: 40px;
}

</style>