<template>
	<view class="danhongse_bg">
		<view class="wc_p">
			<view class="wc_card">
				<view class="wc_card_photo">
					<img :src="mainData.headImgUrl" />
				</view>
				<view class="wc_card_ts">
					完成了60天幼儿能力提升计划<br />
					获得了99元奖学金和3本图书
				</view>
			</view>
			<view class="wc_card_2 clear">
				<view class="wc_card_left">
					<view class="wc_1">
						和宝贝一共读了
					</view>
					<view class="wc_2">
						50本绘本
					</view>
				</view>
				<view class="wc_card_right">
					<view class="wc_1">
						坚持亲子阅读
					</view>
					<view class="wc_2">
						60天
					</view>
				</view>
			</view>
			<view class="fx_hds">
				互动式的亲子阅读比起讲故事能让孩子智商提高6个点
			</view>
			
			<view class="fx_zj_bg">
				<view class="fx_zj">
					12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书
				</view>
				<view class="fx_zj_xbg">
				</view>
			</view>
			<view class="fx_ewm">
				<img class="fx_wechat" src=""/>
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
				mainData:{},
				submitData: {
					wechat: '',
					phone: '',
					address: ''
				},
				is_show:false
			}
		},

		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)
		},

		methods: {

			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no: uni.getStorageSync('user_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						if(self.mainData.info.address==''||self.mainData.info.phone==''||self.mainData.info.wechat==''){
							self.is_show = true;
						}
					};
					console.log(self.mainData.info.start_time)
					self.wxJsSdk()
				};
				self.$apis.userGet(postData, callback);
			},
			
			wxJsSdk() {
				const self = this;
				const postData = {
					thirdapp_id: 2,
					url: window.location.href
				};
				const callback = (res) => {
					console.log('maindata', self.mainData)
					self.$jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: res.appId, // 必填，公众号的唯一标识
						timestamp: res.timestamp, // 必填，生成签名的时间戳
						nonceStr: res.nonceStr, // 必填，生成签名的随机串
						signature: res.signature, // 必填，签名
						jsApiList: ['openLocation', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
					});
					self.$jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用		
						console.log('maindata-ready', self.mainData)
						if (self.mainData.mainImg[0]) {
							var shareImg = self.mainData.mainImg[0].url;
						} else {
							var shareImg = 'empty';
						};
						console.log('shareImg', shareImg)
						self.$jweixin.updateAppMessageShareData({
							title: '我和宝贝一起完成了亲子阅读', // 分享标题
							desc: '12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书', // 分享描述
							link: 'https://qinzi.koaladaka.com/wx/#/pages/fengxiang/fengxiang?user_no=' + uni.getStorageSync(
								'user_no') + '&id=' + self.mainData.id,
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
	@import "../../assets/style/gxfinishplan.css";
</style>
