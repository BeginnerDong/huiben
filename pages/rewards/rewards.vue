<template>
	<view class="re_bg">
		<view class="re_kk">
			<view class="head_re">
				<view class="re_photo">
					<img src="../../static/testimg/test10.jpg" />
				</view>
				<view class="re_read">
					我和宝贝一起完成亲子阅读
				</view>
				<view class="re_bookimg">
					<img src="../../static/testimg/test11.jpg" />
				</view>
				<view class="re_bookname">小黄和小蓝</view>
				<view class="re_yd">
					<view class="re_title">培养了宝贝的：</view>
					<view class="re_tablist">
						<span>情绪管理</span>
						<span>色彩与表达</span>
						<span>想象力</span>
					</view>
				</view>
				<view class="re_jg">
					<view class="clear">
						<img class="re_jgimg" src="../../static/images/good_green.png" />
						<view class="re_jg_con">超过了92%的孩子</view>
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;">
			<button class="ljdakabtn">立即打卡</button>
			<view class="re_num">今日已有244353位家长完成打卡</view>
		</view>
		<view class="dakaxvzhi">
			<view class="">
				<view class="xvzgi_title">打卡须知</view>
				<view class="xvzhi_cont">
					1. 每天读书打卡，即可获得1个聪明豆；聪明豆累计60个，可获得99元奖学金和3本书。<br/>
2. 如何打卡：每本书阅读完后会出现一个“打卡得聪明豆”按钮，点击后即有打卡成功的提示。<br/>
3. 打卡不能中断，如某天打卡中断，之前的聪明豆将归0，重新从第一天开始计算。自参加计划起的60天之内重新开始打卡，满60个聪明豆依然可以返还费用且获得书（这时候可能超出了60天，但只要在60天之前开始重新打卡的都算）60天后计划结束，累计聪明豆也不能返还。聪明豆不能兑换现金。但所有书本和内容永久可使用。<br/>
4. 当天重复打卡不会累计聪明豆。<br/>
5. 若不打卡也不影响正常学习，打卡是为了鼓励家长坚持。"
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
		}
	}
</script>

<style>
	@import "../../assets/style/rewards.css";
</style>
