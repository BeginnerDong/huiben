<template>
	<view class="danhongse_bg">
		<view class="wc_p">
			<view class="wc_jh">
				60天幼儿能力提升计划已结束
			</view>
			<view class="wc_card">
				<view class="wc_card_photo">
					<img :src="userData.headImgUrl"/>
				</view>
				<view class="wc_card_ts">
					我和宝贝参与了60天幼儿能力提升计划
				</view>
			</view>
			<view class="wc_card_2 clear">
				<view class="wc_card_left">
					<view class="wc_1">
						和宝贝一共读了
					</view>
					<view class="wc_2">
						{{reportData.book_num}}本绘本
					</view>
				</view>
				<view class="wc_card_right">
					<view class="wc_1">
						坚持亲子阅读
					</view>
					<view class="wc_2">
						{{userData.log?userData.log.length:''}}天
					</view>
				</view>
			</view>
			<view class="ljfxbtn">
				<button v-if="isMe" @click="goShare">立即分享</button>
			</view>
			<view v-if="!isMe">
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
					<img class="fx_wechat" src="../../static/images/qr.jpg" />
					<view class="fx_sm">
						扫码关注早教练习生公众号，立即加入60天幼儿能力提升计划
					</view>
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
				searchItem:{},
				userData:{},
				reportData:{},
				id:'',
				shareUrl:'',
				isMe:true
			}
		},
		
		
		
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			
			console.log(options)
			if(options[0].user_no){
				self.searchItem.user_no = options[0].user_no;
				self.searchItem.user_type = 0;
				self.isMe = false;
				self.shareUrl = 'https://qinzi.koaladaka.com/wx/#/pages/finishplan/finishplan?user_no=' + options[0].user_no
			}else{
				self.searchItem.user_no = uni.getStorageSync('user_no');
				self.shareUrl = 'https://qinzi.koaladaka.com/wx/#/pages/finishplan/finishplan?user_no=' +uni.getStorageSync('user_no')
			}
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '60天科学亲子阅读计划已结束'	
		},
		
		methods: {
			
			goShare(){
				const self = this;
				self.isMe = false
			},
			
			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.getAfter = {
					log:{
						tableName:'Log',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
						},
						condition:'=',
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
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
					start:self.userData.info.challenge_time,
					end:end
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.reportData = res.info;
						
					};
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.getReport(postData, callback);
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
						jsApiList: ['openLocation', 'updateAppMessageShareData','updateTimelineShareData','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
					});
					self.$jweixin.ready(function() { //需在用户可能点击分享按钮前就先调用		
						
						self.$jweixin.updateAppMessageShareData({
							title: '我和宝贝一起完成了亲子阅读', // 分享标题
							desc: '12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书', // 分享描述
							link: self.shareUrl,
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
	@import "../../assets/style/finishplan.css";
	@import "../../assets/style/gxfinishplan.css";
</style>