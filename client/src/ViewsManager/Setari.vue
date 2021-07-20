<template>
	<div>
		<div class="field has-addons" id="buttons">
			<p class="control">
				<button
					@click="schimbaInSetariCompanie"
					class="button is-ghost is-link is-light"
				>
					<span class="icon is-small">
						<i class="fas fa-building"></i>
					</span>
					<span>Setari Companie</span>
				</button>
			</p>
			<p class="control">
				<button
					@click="schimbaInSetariProfil"
					class="button is-ghost is-link is-light"
				>
					<span class="icon is-small">
						<i class="far fa-user"></i>
					</span>
					<span>Setari Profil</span>
				</button>
			</p>
		</div>

		<div id="content-settings">
			<SetariCompanie v-if="arataSetariCompanie"></SetariCompanie>
			<SetariProfil v-if="arataSetariProfil"></SetariProfil>
		</div>
	</div>
</template>
<script>
import SetariCompanie from "./SetariCompanie";
import SetariProfil from "./SetariProfil.vue";
export default {
	name: "Setari",
	components: { SetariCompanie, SetariProfil },
	data() {
		return {
			user: {},
			arataSetariCompanie: true,
			arataSetariProfil: false,
		};
	},
	computed: {
		userCurent: function () {
			return this.user;
		},
	},
	methods: {
		showUser() {
			console.log(this.user);
		},
		schimbaInSetariCompanie() {
			this.arataSetariCompanie = true;
			this.arataSetariProfil = false;
		},
		schimbaInSetariProfil() {
			this.arataSetariCompanie = false;
			this.arataSetariProfil = true;
		},
	},
	created() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/manageri/auth");
		}
	},
	mounted() {
		
	},
};
</script>
<style scoped>
#buttons {
	margin-top: 10px;
	margin-left: 10px;
}
#btnSetariCompanie {
	margin-left: -690px;
	margin-top: 20px;
	width: 150px;
}
#btnSetariProfil {
	margin-left: -620px;
	margin-top: 20px;
	width: 150px;
}
#content-settings {
	margin-top: 20px;
	
}
</style>