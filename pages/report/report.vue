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
				reportData: {}
			}
		},

		onLoad(options) {
			const self = this;
			self.reportData = uni.getStorageSync('reportData');
			console.log(self.reportData);
			self.reportData.start_time = self.$Utils.timeto(self.reportData.start_time * 1000, 'ymd')
			self.reportData.end_time = self.$Utils.timeto(self.reportData.end_time * 1000, 'ymd')
			var options = self.$Utils.getHashParameters();
			console.log(options)
			if (options[0].user_no) {
				self.searchItem.user_no = options[0].user_no;
				self.searchItem.user_type = 0
			} else {
				self.searchItem.user_no = uni.getStorageSync('user_no')
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
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
					};
					self.wxJsSdk()
				};
				self.$apis.comUserGet(postData, callback);
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
							title: '我和宝贝一起完成了亲子阅读', // 分享标题
							desc: '12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书', // 分享描述
							link: 'https://qinzi.koaladaka.com/wx/#/pages/report/report?user_no=' + uni.getStorageSync(
								'user_no'),
							imgUrl: '', // 分享图标
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
