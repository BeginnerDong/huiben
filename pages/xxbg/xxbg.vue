<template>
	<view class="xxbg_bg">
		<view class="xxbg_k">
			<view class="xxbg_mes_k" style="position: relative;">
				<img src="../../static/images/report_web.png" style="width: 100%;height:100%;"/>
				<view class="xxbg_mes_left" style="position: absolute;top: 76px;left: 0;">
					<view class="xxbg_mes">
						<view class="xxbg_left_t">多元智能阅读课程学习证</view>		
							<img class="xxbgimg" :src="userData.headImgUrl"/>
							<view class="xxbgname">
								{{userData.nickname}}
							</view>
							<view class="xxbgtime">
								2019.05.14-2019.09.21
							</view>
					</view>
				</view>
				<view class="xxbg_mes_right" style="position: absolute;top: 76px;right: 0;">
					<view class="xxbg_mes xxbg_mes1">
						<view class="xxbg_yyd">
							已阅读绘本
						</view>
						<view class="xxbgsum">
							23本
						</view>
						<view class="xxbg_yyd">
							学习了
						</view>
						<view class="xxbgsum">
							<span>情绪心理</span>
							<span>智力开发</span>
							<span>6个语言表达方式</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fxxxbtn" @click="webself.$Router.navigateTo({route:{path:'/pages/report/report'}})">
			分享学习报告
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData:{},
				webself:this
			}
		},
		
		onLoad(options){
			const self = this;
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		methods: {
			
			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no:uni.getStorageSync('user_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
					
					};
					self.getReport()
				};
				self.$apis.userGet(postData, callback);
			},		
			
			getReport(){
				const self = this;
				var end = new Date(new Date().toLocaleDateString()).getTime()/1000;
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.data ={
					start:self.userData.info.challenge_time,
					end:end
				};
				console.log('postData', postData)
				const callback = (res) => {
					if(res.solely_code==100000){
						
					};
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.getReport(postData, callback);
			},
			
		}
	}
</script>


<style>
	@import "../../assets/style/xxbg.css";
	page {
		background: #f4f5f7;
	}
</style>
