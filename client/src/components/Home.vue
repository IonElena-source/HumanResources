<template >
	<div id="home">
		<!-- <img
			src="../assets/hiring-animate.svg"
			width="450px"
			height="650px"
			id="animate"
		/> -->

		<router-link to="/angajat/auth">
			<button
				class="button is-link is-rounded is-medium"
				id="b1"
				v-on:click="removeUser"
			>
				Angajat
			</button></router-link
		>

		<router-link to="/manager/logRegister">
			<button
				class="button is-link is-rounded is-medium"
				id="b2"
				@click="removeUser"
			>
				Manager
			</button>
		</router-link>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "Home",
	components: {},
	methods: {
		...mapActions(["getCereri"]),
		removeUser() {
			if (localStorage.getItem("token") !== "") {
				console.log("A fost sters tokenul");
			}
		},
		regasesteCereri() {
			this.getCereri();
		},
	},
	mounted() {
		this.regasesteCereri();
	},
};
</script>

<style scoped>
#home {
	background: url("../assets/desk1.png") no-repeat center center fixed;
	background-size: 100%;
	background-color: black;
	width: 100vw;
	height: 100vh;
}
#b1 {
	margin-top: 320px;
	width: 260px;
	height: 70px;
	margin-left: -380px;
	font-weight: 56px;
	font-size: 30px;
	background-color: rgb(121, 151, 254);
}
#animate {
	margin-top: 250px;
	margin-left: -550px;
}
#b2 {
	margin-top: 320px;
	width: 260px;
	height: 70px;
	font-weight: 56px;
	font-size: 30px;
	background-color: rgb(121, 151, 254);
}
</style>
