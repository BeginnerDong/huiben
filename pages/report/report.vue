<template>
	<view class="report" style="position: relative;">
		<img src="../../static/images/report_pic.jpg" style="width: 100%;height:100%;" />
		<img :src="userData.headImgUrl" style="position: absolute;top:21%;left:42%;border-radius:50%;width:110rpx;height:110rpx" />
		<view class="report-name">{{userData.nickname}}</view>
		<view class="repo">
			<view class="repo-left">
				<view class="left-name">已阅读绘本</view>
				<view class="left-title">{{reportData.book_num}}本</view>

			</view>
			<view class="repo-right">
				<view class="right-name">学习了</view>
				<view class="right-title">
					<span v-for="(item,index) in reportData.study" v-if="index<2" style="margin-right: 5px;">{{item}}</span>
				</view>
				<view class="right-title">{{reportData.expression}}个语言表达方式</view>
			</view>
		</view>
		<view class="report-data">{{reportData.start_time}}-{{reportData.end_time}}</view>
		<img class="fx_wechat" src="../../static/images/qr.jpg" style="position: absolute;width:100px;height:100px;top:75%;left:37%" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webself: this,
				mainData: {},
				userData: {},
				show: false,
				time: '',
				percent: '',
				searchItem: {},
				reportData: {},
				shareUrl:''
			}
		},

		onLoad(options) {
			const self = this;
			
			console.log(self.reportData);
			
			var options = self.$Utils.getHashParameters();
			console.log(options)
			self.start = options[0].start_time;
			self.end = options[0].end_time;
			console.log(options)
			if (options[0].user_no) {
				self.searchItem.user_no = options[0].user_no;
				self.searchItem.user_type = 0;
				self.shareUrl = 'https://qinzi.koaladaka.com/wx/#/pages/report/report?user_no=' + options[0].user_no+'&start_time='+self.start+'&end_time='+self.end
			} else {
				self.searchItem.user_no = uni.getStorageSync('user_no');
				self.shareUrl = 'https://qinzi.koaladaka.com/wx/#/pages/report/report?user_no=' + uni.getStorageSync('user_no')+'&start_time='+self.start+'&end_time='+self.end
			}
			self.$Utils.loadAll(['getUserData'], self)
			console.log(self.shareUrl)
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
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
					};
					self.getReport()
				};
				self.$apis.comUserGet(postData, callback);
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
						
						self.reportData.start_time = self.$Utils.timeto(self.reportData.start_time*1000,'ymd')
						self.reportData.end_time = self.$Utils.timeto(self.reportData.end_time*1000,'ymd')
					};
					self.wxJsSdk();
				};
				self.$apis.getReport(postData, callback);
			},



			wxJsSdk() {
				const self = this;
				const postData = {
					thirdapp_id: 2,
					url: location.href.split('#')[0]
				};
				const callback = (res) => {
					console.log('maindata', self.mainData)
					self.$jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.appId, // 必填，公众号的唯一标识
						timestamp: res.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.nonceStr, // 必填，生成签名的随机串
						signature: res.signature, // 必填，签名
						jsApiList: ['openLocation', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline',
							'onMenuShareAppMessage'
						] // 必填，需要使用的JS接口列表
					});
					self.$jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用		
						
						self.$jweixin.updateAppMessageShareData({
							title: self.userData.nickname+'一周学习报告', // 分享标题
							desc: '学习课程：多元智能阅读', // 分享描述
							link: self.shareUrl,
							imgUrl:'empty', // 分享图标
							success: function() {
								// 设置成功
								console.log('updateAppMessageShareData-ok')
							}
						})
					});
					self.$jweixin.error(function(res) {
						console.log('error', res)
					});
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.WxJssdk(postData, callback);
			},
		}
	}
</script>



<style>
	@import "../../assets/style/report.css";
</style>
