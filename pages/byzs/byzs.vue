<template>
	<view class="byzs_bg">
		<view class="byzs_n">
			<view class="byzs_photo">
				<img :src="mainData.headImgUrl" />
			</view>
			<view class="byzs_name">
				{{mainData.nickname}}
			</view>
			<view class="bymes">
				<view class="">
					<span class="row_1">学号</span><span class="row_2">{{mainData.info?mainData.info.level:''}}</span>
				</view>
				<view class="">
					<span class="row_1">主修</span><span class="row_2">多元智能阅读</span>
				</view>
				<view class="">
					<view class="row_1">
						获得技能
					</view>
					<view class="bytablist">
						<span v-for="(item,index) in reportData.study"  style="margin-right: 5px;">{{item}}</span>
						
					</view>
				</view>
				<view class="">
					<view class="row_1">
						入学日期
					</view>
					<view class="rxtime">
						{{mainData.info.start_time}}-{{mainData.info.end_time}}
					</view>
				</view>
			</view>
		</view>
		<view class="byfx" v-if="isMe" @click="goShare">
			分享
		</view>
		<view class="bywechat" v-if="!isMe">
			<img src="../../static/images/qr.jpg" style="width: 100%;height: 100%;"/>
		</view>
		<view class="bysm" v-if="!isMe">
			扫码关注早教练习生公众号，立即加入<br/>
			60天幼儿能力提升计划
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
				reportData:{},
				isMe:true
			}
		},

		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			self.id = options[0].id;
			console.log(options)
			if(options[0].user_no){
				self.searchItem.user_no = options[0].user_no;
				self.searchItem.user_type = 0,
				self.isMe = false
			}else{
				self.searchItem.user_no = uni.getStorageSync('user_no')
			}
			self.$Utils.loadAll(['getMainData'], self)
		},

		onShow() {
			const self = this;
			document.title = '毕业证书'
		},

		methods: {
			
			goShare(){
				const self = this;
				self.isMe = false
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.mainData.info.start_time = self.$Utils.timeto(self.mainData.info.start_time*1000,'ymd')
						self.mainData.info.end_time = self.$Utils.timeto(self.mainData.info.end_time*1000,'ymd')
					};
					
					self.getReport()
				};
				self.$apis.comUserGet(postData, callback);
			},

			getReport() {
				const self = this;
				
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data ={
					start:self.mainData.info.challenge_time,
					end:self.mainData.info.finish_time,
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
							link: 'https://qinzi.koaladaka.com/wx/#?/pages/byzs/byzs?user_no=' + uni.getStorageSync(
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
	@import "../../assets/style/byzs.css";
</style>
