<template>
	<view class="danhongse_bg">
		<view class="joinsuccess_kk">
			<view class="joinsuccess_k">
				<img src="../../static/images/good_green.png"/>
				<view class="join_gx">
					恭喜你加入
				</view>
				<view class="join_day">
					60天幼儿能力提升计划
				</view>
				<view class="join_huoqu">
					请前往【早教练习生】公众号获取计划内容
				</view>
			</view>
			<view class="join_wchat">
				<view class="join_ca">
					长按识别二维码关注公众号
				</view>
				<view class="join_gzh">
					<img src="../../static/images/qr.jpg"/>
				</view>
				<view class="join_wb">
					请务必关注否则将无法进行阅读
				</view>
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
		},
		
		onShow() {
			const self = this;
			document.title = '关注早教练习生'	
		},
	}
</script>

<style>
	@import "../../assets/style/join.css";
	page{
		background: #f4f5f7;
	}
</style>
