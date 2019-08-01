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
								{{reportData.start_time}}-{{reportData.end_time}}
							</view>
					</view>
				</view>
				<view class="xxbg_mes_right" style="position: absolute;top: 76px;right: 0;">
					<view class="xxbg_mes xxbg_mes1">
						<view class="xxbg_yyd">
							已阅读绘本
						</view>
						<view class="xxbgsum">
							{{reportData.book_num}}本
						</view>
						<view class="xxbg_yyd">
							学习了
						</view>
						<view class="xxbgsum">
							<span v-for="(item,index) in reportData.study" v-if="index<2" style="margin-right: 5px;">{{item}}</span>
							
						</view>
						<view class="xxbgsum">
							<span>{{reportData.expression}}个语言表达方式</span>
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
				reportData:{},
				webself:this,
				start:'',
				end:''
			}
		},
		
		onLoad(options){
			const self = this;
			var options = self.$Utils.getHashParameters();
			if(options[0].start){
				self.start = options[0].start,
				self.end = options[0].end
			}
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '学习报告'	
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
				
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.data ={
					start:self.start,
					end:self.end
				};
				/* postData.data ={
					start:self.userData.info.challenge_time,
					end:end
				}; */
				console.log('postData', postData)
				const callback = (res) => {
					if(res.solely_code==100000){
						self.reportData = res.info;
						console.log(self.reportData)
						uni.setStorageSync('reportData',self.reportData)
						self.reportData.start_time = self.$Utils.timeto(self.reportData.start_time*1000,'ymd')
						self.reportData.end_time = self.$Utils.timeto(self.reportData.end_time*1000,'ymd')
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
