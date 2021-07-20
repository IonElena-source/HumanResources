<template>
	<div class="HomeManager">
		<SideBarManager
			v-bind:pIsWoman="this.isWomen"
			v-bind:pIsMan="this.isMan"
		></SideBarManager>

		<div class="contentm">
			<div class="alert hide">
				<span class="fas fa-exclamation-circle"></span>
				<span class="msg">Ati primit o cerere!</span>
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
import SideBarManager from "./SideBarManager";

import { mapGetters, mapActions } from "vuex";

export default {
	name: "HomeManager",
	components: { SideBarManager },
	data() {
		return {
			user: {},
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			isWomen: false,
			isMan: false,
			notificationList: [],
			nr: 0,

			count: localStorage.getItem("test") ? localStorage.getItem("test") : 0,
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
			if (this.nr != 0) {
				if (this.nrCereriNeverificate > this.nr) {
					
					
					this.nr = this.nrCereriNeverificate;

					document.querySelector(".alert").classList.add("show");
					document.querySelector(".alert").classList.add("showAlert");
					document.querySelector(".alert").classList.remove("hide");
				}
			}

			this.getCereri();
			this.nr = this.nrCereriNeverificate;
		},
	},
	created() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/manager/auth");
		}
		// window.addEventListener("storage", (e) => {
		// 	if (e.storageArea.test !== this.count) {
		// 		//cand se declanseaza acest eveniment sa afisez o notificare cu cate cereri in asteptare sunt=>cererile pe care trebuie sa se uite
		// 		//alert(e.storageArea.test)
		// 		this.getCereri()
		// 		document.querySelector(".alert").classList.add("show");
		// 		document.querySelector(".alert").classList.add("showAlert");
		// 		document.querySelector(".alert").classList.remove("hide");
		// 	}
		// });
	},
	beforeMount() {},
	mounted() {
		console.log("count");
		console.log(this.count);
		this.getCereri();
		this.nr = this.nrCereriNeverificate;

		this.managerLogat = JSON.parse(localStorage.getItem("managerLogat"));
		console.log("Manager logat in homeManager");
		console.log(this.managerLogat);
		if (this.managerLogat.Sex === "F") {
			this.isWomen = true;
			this.isMan = false;
		} else {
			if (this.managerLogat.Sex === "M") {
				this.isWomen = false;
				this.isMan = true;
			}
		}
		window.addEventListener("myEvent", () => {
		
		});
		
	},
	methods: {
		...mapActions(["getCereri"]),

		inchideNotificare() {
			document.querySelector(".alert").classList.remove("show");
			document.querySelector(".alert").classList.add("hide");
		},
	},
};
</script>
<style scoped>
.HomeManager {
	display: grid;
	grid-template-columns: 1fr 5fr;
	background-color: rgb(102, 139, 241);
	height: 100vh;
	width: 100vw;
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
</style>