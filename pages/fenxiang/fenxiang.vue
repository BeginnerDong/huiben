<template>
	<view class="danhongse_bg">
		<view class="fx_p">
			<view class="fx_top">
				<view class="fx_photo">
					<img :src="userData.headImgUrl" style="width:100%;border-radius:50%"/>
				</view>
				<view class="fx_right">
					<view class="fx_name">
						{{userData.nickname}}
					</view>
					<view class="fx_r_f">
						<view class="top_jiao">
							<img src="../../static/images/topjiao.png"/>
						</view>
						每天再忙
						<br/>
						我依然能抽出时间陪孩子阅读绘本
					</view>
				</view>
			</view>
			<view style="box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.07);">
				<view class="fx_middle">
					<view class="fx_m_top">
						我和宝贝一起完成了亲子阅读
					</view>
					<view class="clear fx_m_m">
						<view class="book_fximg">
							<img :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''" />
						</view>
						<view class="fx_m_r">
							<view class="fx_bookname">
								{{mainData.title}}
							</view>
							<view class="fx_py">
								培养了宝贝的
							</view>
							<view class="fx_nl">
								<span v-for="item in mainData.label_array">{{item}}</span>
							</view>
						</view>
					</view>
				</view>
				<view class="fx_m_bg clear">
					<img class="fx_bgimg" src="../../static/images/good_green.png"/>
					<view class="fx_cg">
						超过{{percent}}%的孩子
					</view>
				</view>
			</view>
			<view class="fx_hds" style="font-weight: 700;">
				互动式的亲子阅读比起讲故事能让孩子智商提高6个点
			</view>
			
			<view style="position: relative;">
				<img src="../../static/images/card1.png" style="width: 100%;height:120px"/>
				<view style="font-size: 15px;color: rgb(54,155,145);text-align: center;padding: 18px 24px;font-weight: 700;position: absolute;top:15px">
					12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书
				</view>
			
			</view>
			<view class="fx_ewm">
				<img class="fx_wechat" src="../../static/images/qr.jpg"/>
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
				userData:{},
				show:false,
				time:'',
				percent:'',
				searchItem:{
					thirdapp_id:2
				},
				shareUrl:''
			}
		},
		
		onLoad(options) {
			const self = this;
		
			
			var options = self.$Utils.getHashParameters();
			self.id = options[0].id;
			console.log(options)
			if(options[0].user_no){
				self.searchItem.user_no = options[0].user_no;
				self.searchItem.user_type = 0;
				self.shareUrl = 'https://qinzi.koaladaka.com/wx/#/pages/fenxiang/fenxiang?user_no=' + options[0].user_no + '&id=' + self.id
			}else{
				self.searchItem.user_no = uni.getStorageSync('user_no');
				self.shareUrl = 'https://qinzi.koaladaka.com/wx/#/pages/fenxiang/fenxiang?user_no=' + uni.getStorageSync('user_no') + '&id=' + self.id
			};
			
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '分享页'	
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
					self.getMainData()
				};
				self.$apis.comUserGet(postData, callback);
			},
			
		
			getMainData(){
				const self = this;
				
				const postData = {};
				postData.searchItem = {
					type:1,
					on_shelf:1,
					id:self.id
				};
	
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					} 
					self.getRead()
					
				};
				self.$apis.articleGet(postData, callback);
			},
			
			getRead(){
				const self = this;
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.data ={
					art_id:self.id
				};
				console.log('postData', postData)
				const callback = (res) => {
					if(res.solely_code==100000){
						self.percent = ((100/res.info.student_num)*(res.info.student_num-1-res.info.read_num)).toFixed(2);
						if(self.percent<50){
							self.percent = 50
						}
					};
					
					self.wxJsSdk()
				};
				self.$apis.getRead(postData, callback);
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
						jsApiList: ['openLocation', 'updateAppMessageShareData','updateTimelineShareData','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
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
							title: self.userData.nickname+'和宝贝一起阅读了'+self.mainData.title, // 分享标题
							desc:  '12位学前教育专家提供阅读方案，限时免费还有机会获赠3本书', // 分享描述
							link: self.shareUrl,
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
	@import "../../assets/style/fenxiang.css";
</style>