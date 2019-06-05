<template>
	<view class="huise_bg read_head">
		<view class="search_big_k">
			<view class="read_kk">
				<!--搜索框-->
				<view class="search_kk">
					<div style="width: 100%;">
						<view class="search_icon"></view>
						<input class="search_txt" placeholder="搜索绘本" value="菲菲生气了"/>
					</div>
				</view>
			</view>
			<view class="search_list">
				<view class="search_title">搜索结果</view>
				<view class="search_cont_list">
					<view class="search_deatil clear">
						<view class="search_left">
							<img src="../../static/testimg/test1.jpg">
						</view>
						<view class="search_right">
							<view class="contact_title">菲菲生气了</view>
							<view class="cont_tab">色彩与表达</view>
						</view>
					</view>
					
						<view class="none_cont">找不到相关的内容澳</view>
					
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
	</view>
</template>

<script>
	export default{
		data(){
			return{
				webSelf:this,
			}
		}
	}
</script>

<style>
	@import "../../assets/style/searchsuccess.css";
</style>
