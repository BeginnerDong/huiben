<template>
	<view class="huise_bg read_head">
		<view class="">
			<view class="read_kk">
				<!--搜索框-->
				<view class="search_kk">
					<div>
						<view class="search_icon"  @click="webSelf.$Router.redirectTo({route:{path:'/pages/searchsuccess/searchsuccess'}})"></view>
						<input class="search_txt" placeholder="搜索绘本" />
					</div>
				</view>
				<!--热门搜索标签-->
				<view class="hot_kk">
					<view class="hot_title0">热门搜索</view>
					<view class="hot_tablist">
						<span class="hot_tab">生活习惯</span>
						<span class="hot_tab">自理能力</span>
						<span class="hot_tab">规则意识</span>
						<span class="hot_tab">安全意识</span>
						<span class="hot_tab">情绪疏导</span>
						<span class="hot_tab">亲子关系/安全感</span>
						<span class="hot_tab">面对挫折</span>
						<span class="hot_tab">生命教育</span>
						<span class="hot_tab">好奇心/想象力</span>
						<span class="hot_tab">科学素养/思维方式</span>
						<span class="hot_tab">自我意识</span>
						<span class="hot_tab">如何和他们相处并合作</span>
					</view>
				</view>

			</view>
			<!--推荐主题-->
			<view class="recommend__kk">
				<view class="recommend_title">推荐主题</view>
				<view class="recommend_type">
					<!--儿童行为心理习惯-->
					<view class="recommend_title"><span>儿童行为心理习惯</span></view>
					<view class="recommend_imglist clear">
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div">
								<div class="re_update">
								持续更新中...
								</div>
							</view>
						</view>
					</view>
					<!--情绪心理-->
					<view class="recommend_title"><span>情绪心理</span></view>
					<view class="recommend_imglist clear">
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
								<img src="../../static/testimg/test0.jpg" />
								<view class="re_img_title">小蓝和小黄</view>
							</view>
						</view>
						<view class="recommend_img">
							<view class="recommend_div">
								<div class="select_gd">
									查看更多
								</div>
							</view>
						</view>
					</view>
				</view>
			</view>
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
	@import "../../assets/style/testread.css";
</style>
