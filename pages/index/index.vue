<template>
	<view class="index_con">
		<view class="head_tab clear">
			<view class="head_tab_left head_tab_boder"><div>计划介绍</div></view><view class="head_tab_right"><div>绘本书单</div></view>
		</view>
		<view class="index_foot clear">
			<view class="foot_left" @click="webSelf.$Router.redirectTo({route:{path:'/pages/testread/testread'}})"><span class="book_icon"></span>试读</view>
			<view class="foot_right">立即报名</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
		return{
			webSelf: this,
		}},
		methods:{
			
		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
</style>
