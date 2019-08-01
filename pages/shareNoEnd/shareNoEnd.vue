<template>
	<view class="danhongse_bg">
		<view class="wc_p">
			<view class="byzs_pk clear" style="position: relative;">
				<img src="../../static/images/certificate.png" style="width: 100%;height:100%;"/>
				<view class="byzs_left" style="position: absolute;top: 0;left: 0;">
					<view class="byzs_left_k">
						<view class="byzs_b">
							
							<img class="xsz_p" :src="mainData.headImgUrl"/>
							<view class="ndbb">
								{{mainData.nickname}}
							</view>
							
						</view>
					</view>
				</view>
				<view class="byzs_right" style="position: absolute;top: 0;right: 0;">
					<view class="byzs_right_k">
						<view class="byzs_b">
							<view class="byxh">
								学号
							</view>
							<view class="xhnumber">
								{{mainData.info?mainData.info.level:''}}
							</view>
							<view class="zx">
								主修
							</view>
							<view class="dyznyd">
								多元智能阅读
							</view>
							<view>
								<view class="zx">
									入学时间
								</view>
								<view class="dyznyd bytime">
									{{mainData.info.start_time}}
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="fx_hds" style="font-size:18px;font-weight: 700;">
				早教练习生携手国际多元智能阅读协会打造「多元智能亲子阅读法」
			</view>

			<view class="fx_zj_bg">
				<view class="fx_zj">
					限时获取奖学金并获赠3本绘本
				</view>
				<view class="fx_zj_xbg">
				</view>
			</view>
			<view class="fx_ewm">
				<img class="fx_wechat" src="../../static/images/qr.jpg" />
				<view class="fx_sm">
					扫码关注早教练习生公众号，立即加入60天幼儿能力提升计划
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
				mainData: {},
				submitData: {
					wechat: '',
					phone: '',
					address: ''
				},
				searchItem: {
					thirdapp_id: 2,
				},
				is_show: false,
				reportData:{}
			}
		},

		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			self.id = options[0].id;
			console.log(options)
			if(options[0].user_no){
				self.searchItem.user_no = options[0].user_no;
				self.searchItem.user_type = 0
			}else{
				self.searchItem.user_no = uni.getStorageSync('user_no')
			}
			self.$Utils.loadAll(['getMainData'], self)
		},

		onShow() {
			const self = this;
			document.title = '学习证'
		},

		methods: {


			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.mainData.info.start_time = self.$Utils.timeto(self.mainData.info.start_time*1000,'ymd')
					};
					
					self.getReport()
				};
				self.$apis.comUserGet(postData, callback);
			},

			getReport() {
				const self = this;
				var end = Date.parse(new Date())/1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data ={
					start:self.mainData.info.challenge_time,
					end:end
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.reportData = res.info;
						
					};
					self.wxJsSdk()
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

						if (self.mainData.mainImg[0]) {
							var shareImg = self.mainData.mainImg[0].url;
						} else {
							var shareImg = 'empty';
						};
						console.log('shareImg', shareImg)
						self.$jweixin.updateAppMessageShareData({
							title: '我和宝贝一起完成了亲子阅读', // 分享标题
							desc: '12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书', // 分享描述
							link: 'https://qinzi.koaladaka.com/wx/#?/pages/shareNoEnd/shareNoEnd?user_no=' + uni.getStorageSync(
								'user_no'),
							imgUrl: shareImg, // 分享图标
							success: function() {
								// 设置成功
								console.log('updateAppMessageShareData-ok')
							}
						})
					});
					self.$jweixin.error(function(res) {
						console.log('error', res)
					});
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.WxJssdk(postData, callback);
			},
		}

	}
</script>

<style>
	@import "../../assets/style/biyezhengshu.css";
	@import "../../assets/style/gxfinishplan.css";
</style>
