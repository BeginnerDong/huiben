<template>
	<view class="huise_bg">
		<view class="td_read_kk">
			<view class="td_read_k">
				<view class="book_intro_img">
					<img src="../../static/testimg/test2.jpg">
				</view>
				<view class="book_name">小蓝和小黄</view>
				<view class="book_copy">中信出版社</view>
				<view class="book_type"><span>情绪管理</span></view>
				<view class="book_intro">
					《小蓝和小黄》非常出名。很多3岁以下的小
					朋友疯狂地喜欢这本书，这是本有可能1岁小
					孩都能看懂的书。更重要的是，这
					不可多得的教育绘本。
				</view>
				<view class="book_tab">
					<view>“孩子的社交启蒙”</view>
				</view>
				<view class="clear bookbtn">
					<button class="ayerbtn" @click="webself.$Router.redirectTo({route:{path:'/pages/bookdetail/bookdetail'}})">读昨日书</button>
					<button class="open_book" @click="webself.$Router.redirectTo({route:{path:'/pages/bookdetail/bookdetail'}})">读昨日书</button>
				</view>
			</view>
			<view style="height: 60px;"></view>
		</view>
			<view class="foot_book">
				<view class="foot_book_kk">
					<view class="foot_book_btn"  @click="webself.$Router.redirectTo({route:{path:'/pages/todayread/todayread'}})">
						<img class="foot_iocn" src="../../static/images/index_s.png"/>
						<view style="font-size: 11px;">今日阅读</view>
					</view>
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
						<img class="foot_iocn" src="../../static/images/book_u.png"/>
						<view style="font-size: 11px;">所有绘本</view>
					</view>
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/game/game'}})">
						<img class="foot_iocn" src="../../static/images/game_u.png"/>
						<view style="font-size: 11px;">游戏</view>
					</view>
				</view>
			</view>
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
	@import "../../assets/style/todayread.css";
</style>
