<template>
	<view class="danhongse_bg">
		<view class="sign_kk">
			<view class="user_intro clear">
				<img class="user_photo" src="../../static/testimg/test4.png"/>
				<view class="user_name">杨小姐</view>
			</view>
			<view class="kid_mes">
				<view class="kid-name">
					真实姓名报名信息
				</view>
				<view class="sign_yh">
					坚持全勤打卡，作为奖励，我们降全额返还报名费
				</view>
				<view class="kid_sex_k clear">
					<view class="kid_sex">
						宝贝性别
					</view>
					<view class="kid_sex_txt">
						<input placeholder="请输入宝贝性别"/>
					</view>
				</view>
				<view class="kid_age_k clear">
					<view class="kid_age">
						年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄
					</view>
					<view class="kid_age_txt">
						<input placeholder="请输入宝贝年龄"/>
					</view>
				</view>
				<view class="kid_care">
					*务必真实填写，不同性别和年龄将匹配不同内容
				</view>
			</view>
			<view class="agreement">
				<img src="../../static/images/check_u.png" style="vertical-align: middle;margin-right: 10px;"/>我同意并愿意遵守<span>《国青阅读服务协议》</span>和<span>《国青阅读隐私政策》</span>
			</view>
			<view style="height: 60px;"></view>
		</view>
		
		<view class="sign_foot">
			<view class="sign_foot_left">
				限时特价￥99<span>原价￥189</span>
			</view>
			<view class="sign_foot_right" @click="webSelf.$Router.redirectTo({route:{path:'/pages/join/join'}})">
				<button>立即报名</button>
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
	@import "../../assets/style/signup.css";
</style>
