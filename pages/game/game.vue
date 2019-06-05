<template>
	<view class="huise_bg">
		<!-- <view> -->
			<view class="game_kk">
				<view class="gameintro_k clear">
					<view class="game_img"><img src="../../static/testimg/test3.jpg"/></view>
					<view class="game_intro">《小黄和小蓝》游戏</view>
				</view>
				<view class="gameintro_k clear">
					<view class="game_img"><img src="../../static/testimg/test3.jpg"/></view>
					<view class="game_intro">《小黄和小蓝》游戏</view>
				</view>
				<view class="gameintro_k clear">
					<view class="game_img"><img src="../../static/testimg/test3.jpg"/></view>
					<view class="game_intro">《小黄和小蓝》游戏</view>
				</view>
				<view class="gameintro_k game_yh">
					报名加入计划查看全部<br/>
					坚持打卡还能退还全部报名费用，并获赠3本图书
				</view>
				<view>
					<button class="gamebtn">立即报名</button>
				</view>
			</view>
			<view style="height: 60px;"></view>
			<view class="foot_book">
				<view class="foot_book_kk">
					<view class="foot_book_btn"  @click="webself.$Router.redirectTo({route:{path:'/pages/todayread/todayread'}})">
						<img class="foot_iocn" src="../../static/images/index_u.png"/>
						<view style="font-size: 11px;">今日阅读</view>
					</view>
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
						<img class="foot_iocn" src="../../static/images/book_u.png"/>
						<view style="font-size: 11px;">所有绘本</view>
					</view>
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/game/game'}})">
						<img class="foot_iocn" src="../../static/images/game_s.png"/>
						<view style="font-size: 11px;">游戏</view>
					</view>
				</view>
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
	export default{
		data() {
			return {
				webself: this,
			}
		},
	}
</script>

<style>
	@import "../../assets/style/game.css";
</style>
