<template>
	<view class="daka_bg">
		<view class="head_dk clear">
			<button @click="webself.$Router.redirectTo({route:{path:'/pages/rewards/rewards'}})">打卡得聪明豆</button>
		</view>
		<view class="daka_middle clear">
			<view class="daka_m_left">
				<img src="../../static/testimg/test8.jpg" />
			</view>
			<view class="daka_m_right">
				<view>
					<view class="daka_book">
						小红和小蓝读完了
					</view>
					<view class="daka_fx">
						赶紧点击右下角按钮打卡吧
					</view>
					<button class="dabtn">立即分享</button>
				</view>
			</view>
		</view>
		<view class="booklist_k">
			<view class="book_list clear">
				<view class="book_tj">
					<view>
						<img class="book_tj_img" src="../../static/testimg/test9.jpg" />
						<view class="book_tj_r">
							<view class="book__tj_name">小蓝和小黄</view>
							<button class="book_tj_type">情绪管理</button>
						</view>
					</view>
				</view>
				<view class="book_tj">
					<view>
						<img class="book_tj_img" src="../../static/testimg/test9.jpg" />
						<view class="book_tj_r">
							<view class="book__tj_name">小蓝和小黄</view>
							<button class="book_tj_type">情绪管理</button>
						</view>
					</view>
				</view><view class="book_tj">
					<view>
						<img class="book_tj_img" src="../../static/testimg/test9.jpg" />
						<view class="book_tj_r">
							<view class="book__tj_name">小蓝和小黄</view>
							<button class="book_tj_type">情绪管理</button>
						</view>
					</view>
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
	@import "../../assets/style/daka.css";
</style>
