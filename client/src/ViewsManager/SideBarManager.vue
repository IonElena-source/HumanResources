<template>
	<div class="sidebarr">
		<img
			class="titleImg"
			:src="require(`../profiles/${managerLogat._id}.png`)"
		/>
		<h2 id="hii">
			{{ this.managerLogat.Nume }} - {{ this.managerLogat.Prenume }}
		</h2>
		<h2>
			<br />
			<i class="fas fa-envelope fa-lg" style="padding-right: 20px"></i>
			<i class="fab fa-linkedin fa-lg" style="padding-right: 20px"> </i
			><i class="fab fa-facebook fa-lg"></i>
		</h2>

		<div class="sidebar">
			<hr class="new1" />
			<div class="menu-items">
				<router-link
					to="/generalManager"
					active-class="active"
					exact
					tag="button"
					class="side-btn grow btn rounded"
				>
					<div class="link-container">
						<span id="spanSVG">
							<svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"
								/>
							</svg>
						</span>
						<span id="spanMeniu">General</span>
					</div>
				</router-link>
					<router-link
					to="/angajati"
					exact
					active-class="active"
					tag="button"
					class="side-btn"
				>
					<div class="link-container containerSetari">
						<span id="spanI">
							<i class="fas fa-user" id="iconS"></i>
						</span>
						Angajati
					</div>
				</router-link>
				<router-link
					to="/rapoarte"
					exact
					active-class="active"
					tag="button"
					class="side-btn"
				>
					<div class="link-container containerSetari">
						<span id="spanI">
							<i class="fas fa-chart-line" id="iconS"></i>
						</span>
						Rapoarte
					</div>
				</router-link>
				<router-link
					to="/calendar"
					active-class="active"
					exact
					tag="button"
					class="side-btn grow btn rounded"
				>
					<div class="link-container">
						<span id="spanI">
							<i class="fas fa-calendar-alt" id="iconS"></i
						></span>

						Calendar
					</div></router-link
				>
				<router-link
					:to="{ name: 'CereriManager', params: { cereri: requests } }"
					exact
					active-class="active"
					tag="button"
					class="side-btn"
				>
					<div class="link-container">
						<span id="spanI">
							<i class="fas fa-envelope" id="iconS"></i>
						</span>

						Cereri
					</div>
				</router-link>
				
			
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "SideBarManager",
	props: ["pIsWoman", "pIsMan"],
	data() {
		return {
			isWomen: false,
			isMan: false,
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),
			requests: [],
		};
	},
	components: {},
	methods: {},
	created() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/manager/auth");
		}
	},
	mounted() {
		console.log("Manager logat");
		console.log(localStorage.getItem("managerLogat"));
	},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Artifika&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Artifika&family=Recursive:wght@700&display=swap");
#hii {
	font-family: Artifika;
	font-size: 25px;
}
.title1 {
	font-size: 18.7px;
}
#icon {
	margin-left: -52px;
	padding-right: 12px;
	padding-top: 5px;
}
#titleEmployee {
	font-family: "Recursive", sans-serif;
}

.title {
	color: white;
	font-size: 29px;
	margin-top: 8px;
}
.menu-items {
	display: flex;
	flex-direction: column;

	margin-top: 30px;
}
.menu-items > * {
	margin-left: 10px;
	margin-top: 32px;
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
	background-color: rgb(102, 139, 241);
}
.side-btn.active .link-container::after {
	position: absolute;
	bottom: -60px;
	right: 0;
	content: "";
	height: 60px;
	width: 60px;
	border-radius: 50%;
	background-color: rgb(102, 139, 241);
	z-index: 99;
}
hr.new1 {
	border-top: 1px solid rgb(255, 255, 255);
}
#iconS {
	width: 32px;
	height: 32px;
}
.titleImg {
	width: 120px;
	height: 120px;
}
.link-container {
	margin-left: 50px;
	text-align: justify;
	font-size: 22px;
}
#spanI {
	font-size: 20px;
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
.sidebar {
	margin-top: 15px;
}
</style>