<template>
	<view class="danhongse_bg">
		<view class="wc_p">
			<view class="wc_jh">
				60天幼儿能力提升计划已结束
			</view>
			<view class="wc_card">
				<view class="wc_card_photo">
					<img src="../../static/testimg/test12.jpg"/>
				</view>
				<view class="wc_card_ts">
					我和宝贝参与了60天幼儿能力提升计划
				</view>
			</view>
			<view class="wc_card_2 clear">
				<view class="wc_card_left">
					<view class="wc_1">
						和宝贝一共读了
					</view>
					<view class="wc_2">
						50本绘本
					</view>
				</view>
				<view class="wc_card_right">
					<view class="wc_1">
						坚持亲子阅读
					</view>
					<view class="wc_2">
						60天
					</view>
				</view>
			</view>
			<view class="ljfxbtn">
				<button @click="webself.$Router.redirectTo({route:{path:'/pages/fenxiang/fenxiang'}})">立即分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webself: this,
			}
		}
	}
</script>

<style>
	@import "../../assets/style/finishplan.css";
</style>