<template>
	<view class="book_kk">
		<img class="pullup" src="../../static/images/pullup.png" @click="webself.$Router.redirectTo({route:{path:'/pages/bookdetail2/bookdetail2'}})"/>
		<img class="bookcont" src="../../static/testimg/test6.jpg"/>
		<view class="dkbtn" @click="webself.$Router.redirectTo({route:{path:'/pages/daka/daka'}})"></view>
		<!-- <img class="pulldown" src="../../static/images/pulldown.png"/> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				webself:this,
			}
		}
	}
</script>

<style>
	@import "../../assets/style/bookdetail.css";
</style>
