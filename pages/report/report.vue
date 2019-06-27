<template>
	<view class="re">
		<view class="re-o">
		<span class='o'>多元智能阅读课程学习证</span>
		<view class="re-ba">
			<img class='img' :src="userData.headImgUrl"></img>
			<h5 class='name'>{{userData.nickname}}</h5>
		</view>
		<view class="re-tw">
			<view class="re-le"> 
				<h5>已阅读绘本</h5>
				<h6>23本</h6>
				<h5>已阅读</h5>
				<h6>65小时</h6>
			</view>
			<view class="re-ri">
				<h5>学习了</h5>
				<h6>情绪心里 智力开发</h6>
				<h6>6个语言表达方式</h6>
			</view>
		</view>
		<span class='date'>2019.05.14-2019.09.21</span>
		</view>
		<view class="re-bg">
			<view class="re_zj">
				12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书
			</view>
			<view class="re_xbg">
			</view>
		</view>
		<view class="re_ewm">
			<img class="re_wechat" src=""/>
			<view class="re_sm">
				<h6>参与阅读计划	</h6>
				<h6>请长按图片识别二维码</h6>
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
				userData:{},
				show:false,
				time:'',
				percent:''
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			if(options.user_no){
				self.searchItem.user_no = options.user_no;
				self.searchItem.user_type=0
			}else{
				self.searchItem.user_no = uni.getStorageSync('user_no')
			}
			self.$Utils.loadAll(['getUserData'], self)
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
							link: 'https://qinzi.koaladaka.com/wx/#/pages/report/report?user_no=' + uni.getStorageSync(
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
