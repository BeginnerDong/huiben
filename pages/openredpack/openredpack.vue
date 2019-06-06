<template>
	<view class="index_con">
		<view class="head_tab clear">
			<view class="head_tab_left head_tab_boder">
				<div>计划介绍</div>
			</view>
			<view class="head_tab_right">
				<div>绘本书单</div>
			</view>
		</view>
		<view class="foot_note clear">
			<img src="../../static/testimg/test5.jpg"/><view>章子* 2秒前报名了阅读计划</view>
		</view>
		<view class="index_foot clear">
			<view class="foot_left" @click="webSelf.$Router.redirectTo({route:{path:'/pages/testread/testread'}})"><span class="book_icon"></span>试读</view>
			<view class="foot_right clear">
				<view class="foot_right_k">
					<view class="signleft">
						<view>
							<view>原价￥199</view>
							<view>红包折扣￥100</view>
						</view>
					</view>
					<button class="signbtn" @click="webSelf.$Router.redirectTo({route:{path:'/pages/signup/signup'}})">立即报名</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import "../../assets/style/openredpack.css";
</style>
