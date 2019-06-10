<template>
	<view class="cmdgz_bg">
		<view class="cmdgz">
			1.每天只能打卡一次，每打卡一次获得一个聪明豆；
			<br/>
			2.打卡不能中断，如果中途中断了打卡，则所有聪明豆归0，第二天可以重新开始打卡，累计聪明豆；
			<br/>
			3.如果用户从购买之日算起的60天后，重新开始打卡，则不再获取聪明豆。
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
	@import "../../assets/style/cmdgz.css";
</style>
