<template>
	<view class="book_kk">
		<img class="pullup" src="../../static/images/pullup.png"/>
		<img class="bookcont" src="../../static/testimg/test7.jpg"/>
		<img class="pulldown" src="../../static/images/pulldown.png" @click="webself.$Router.redirectTo({route:{path:'/pages/bookdetail2/bookdetail2'}})"/>
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
