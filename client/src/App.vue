<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view v-bind:add="notify"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: "App",
	components: {},
	methods: {
		notify() {
			alert("Daa")
		},
	},
	mounted() {},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
body {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: translateX(-2em);
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease;
}
</style>
