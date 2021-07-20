<template>
	<div class="sidebar">
		<img
			class="title"
			id="imgProfile"
			:src="require(`../profiles/${angajatLogat._id}.png`)"
		/>

		<h2 id="titleEmployee" class="title1">
			{{ this.angajatLogat.Nume }}-{{ this.angajatLogat.Prenume }}
		</h2>
		<h2 id="titleEmployee">
			{{ this.angajatLogat.Functie }}
		</h2>
		<hr class="new1" />
		<div class="menu-items">
			<router-link
				to="/general"
				active-class="active"
				exact
				tag="button"
				class="side-btn grow"
			>
				<div class="link-container">
					<span id="spanSVG" class="spanSVGGeneral">
						<svg style="width: 24px; height: 24px" viewBox="0 0 24 24" >
								<path
									fill="currentColor"
									d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
								/>
							</svg>
					</span>
					<span style="visibility:hidden">|||</span>
					<span id="spanMeniu" class="spanGeneral">  &nbsp;     General</span>
				</div>
			</router-link>
			<router-link
				to="/recrutare"
				exact
				active-class="active"
				tag="button"
				class="side-btn"
			>
				<div class="link-container">
					<span>
						<svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M2,20V18C2,15.88 5.31,14.14 9.5,14C9.18,14.78 9,15.62 9,16.5C9,17.79 9.38,19 10,20H2Z"
							/>
						</svg>
					</span>
					<span id="spanMeniu">Recrutare</span>
				</div>
			</router-link>
			<router-link
				to="/cereriAngajat"
				exact
				active-class="active"
				tag="button"
				class="side-btn"
			>
				<div class="link-container">
					<i class="fas fa-envelope"></i>
					<span id="spanMeniu">Cereri</span>
				</div>
			</router-link>
			<router-link
				to="/feedback"
				exact
				active-class="active"
				tag="button"
				class="side-btn"
			>

				<div class="link-container">
					<i class="fas fa-star"></i>
					<span id="spanMeniu">Incident</span></div>
			</router-link>
			
			<router-link
				to="/evenimente"
				exact
				active-class="active"
				tag="button"
				class="side-btn"
			>
				<div class="link-container">
					<i class="fas fa-sticky-note"></i>
					<span id="spanMeniu">Evenimente</span>
					</div>
			</router-link>
		</div>
	</div>
</template>
<script>
export default {
	name: "SideBarAngajat",
	props: ["pIsWoman", "pIsMan", "angajat"],
	data() {
		return {
			isWomen: false,
			filename: "a",
			isMan: false,
			angajatLogat: JSON.parse(localStorage.getItem("angajatLogat")),
		};
	},
	components: {},

	created() {
		if (localStorage.getItem("tokenAngajat") === null) {
			this.$router.push("/angajat/auth");
		}
	},
	mounted() {},
	methods: {
		getDataURL(img) {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			// Set width and height
			canvas.width = img.width;
			canvas.height = img.height;
			// Draw the image
			ctx.drawImage(img, 0, 0);
			return canvas.toDataURL("image/jpeg");
		},
		show() {
			console.log(`Angajat logat ${this.angajatLogat.Telefon}`);
		},
		test() {
			console.log(this.angajatLogat.Poza_Profil);
		},
	},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Artifika&family=Recursive:wght@700&display=swap");
.title1 {
	font-size: 18.7px;
}
#icon {
	margin-left: -52px;
	padding-right: 2px;
	padding-top: 5px;
}
#titleEmployee {
	font-family: "Recursive", sans-serif;
}

.title {
	color: white;
	font-size: 29px;
	margin-top: 10px;
}
.menu-items {
	display: flex;
	flex-direction: column;

	margin-top: 7px;
}
.menu-items > * {
	margin-top: 37px;
}
.side-btn:focus {
	outline: none;
}
.side-btn.active {
	position: relative;
	background-color: white;
	color: rgb(102, 139, 241);
	margin-left: 10px;
	font-weight: 700;
	box-shadow: 5px 0px 0px rgb(192, 191, 191) inset;
	border-radius: 15px 0 0 15px;
}
.side-btn.active::before {
	position: absolute;
	top: -30px;
	content: "";
	right: 0;
	position: fixed;
	height: 30px;
	width: 30px;
	background-color: white;
}
.side-btn.active::after {
	position: absolute;
	bottom: -30px;
	content: "";
	right: 0;
	height: 30px;
	width: 30px;
	background-color: white;
}
.side-btn {
	border: none;
	padding: 13px 0px;
	cursor: pointer;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 19px;
	background-color: transparent;
	transform: scale(1);
}
.side-btn.active .link-container::before {
	position: absolute;
	top: -60px;
	right: 0;
	content: "";
	height: 60px;
	width: 60px;
	border-radius: 50%;
	background-color: rgb(58, 138, 238);
}
.side-btn.active .link-container::after {
	position: absolute;
	bottom: -60px;
	right: 0;
	content: "";
	height: 60px;
	width: 60px;
	border-radius: 50%;
	background-color: rgb(58, 138, 238);
	z-index: 99;
}
hr.new1 {
	border-top: 1px solid rgb(255, 255, 255);
}
#imgProfile {
	width: 120px;
	height: 120px;
}
#imgDashboard {
	position: absolute;
	margin-top: -1px;
	margin-left: -40px;
}
.link-container {
	font-size: 22px;
	margin-left: 50px;
	text-align: justify;
}
#imgFeedback {
	position: absolute;
	margin-left: -50px;
}
#spanI {
	font-size: 22px;
}
#spanSVG {
	position: absolute;
	margin-right: 10px;
	width: 60px;
	font-size: 22px;
}
#spanMeniu {
	margin-left: 40px;
}
.spanGeneral{
	
	margin-left: 150px;
}
.spanSVGGeneral{
	position: absolute;
	margin-right: 30px;
}
</style>