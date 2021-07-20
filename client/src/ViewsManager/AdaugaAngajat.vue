<template>
	<div>
		<div class="row">
			<div class="column" id="form1">
				<h2>Column 1</h2>
				<p>Some text..</p>
			</div>
			<div class="column">
				<h2>Column 2</h2>
				<p>Some text..</p>
			</div>
		</div>

		<button @click="test">Test</button>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "AdaugaAngajat",
	data() {
		return {
			managerLogat: JSON.parse(localStorage.getItem("managerLogat")),

			publicPath: process.env.BASE_URL,
			angajati: [],
		};
	},
	methods: {
		adaugaAngajat() {},
		test() {
			console.log(this.angajati);
		},
	},
	mounted() {
		axios.get("http://localhost:5000/angajati").then((response) => {
			this.angajati = response.data.angajati;
		});
		console.log("Reloaded");

		// dom variables

		console.log("loaded");
	},
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
	float: left;
	width: 50%;
	padding: 10px;
	background-color: rgb(226, 233, 255);
	height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}
.row {
	margin-top: 50px;
	width: 85%;
	margin-left: 120px;
	background-color: wheat;
}
#form1{
    border-right: 1px solid black;
}
</style>