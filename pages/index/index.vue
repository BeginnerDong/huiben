<template>
	<view class="index_con" v-if="is_show">
		<view class="head_tab clear">
			<view class="head_tab_left " @click="menuChange('0')" :class="num==0?'head_tab_boder':''">
				<div>计划介绍</div>
			</view>
			<view class="head_tab_right" @click="menuChange('1')" :class="num==1?'head_tab_boder':''">
				<div>绘本书单</div>
			</view>
		</view>
		<view style="width:100%" v-if="num==0">
			<view class="content ql-editor" v-html="articleOneData.content">
			</view>
		</view>
		<view style="width:100%" v-if="num==1">
			<view class="content ql-editor" v-html="articleTwoData.content">
			</view>
		</view>
		<view class="redpack_c" ref="redtc" v-if="mainData.hasCoupon&&mainData.hasCoupon.length==0&&!is_open">
			<view class="redpack_img">
				<img src="../../static/images/redpack_k.jpg" @click="isOpen" />
			</view>
		</view>
		<view class="redpack_c" ref="redtc" v-if="mainData.hasCoupon&&mainData.hasCoupon.length==0&&is_open">
			<view class="redpack_img" style="width:100%;top:53%">
				<img src="../../static/images/coupon_open1.png" style="width:100%" @click="webSelf.$Utils.stopMultiClick(couponAdd)" />
			</view>
		</view>
		<view class="index_foot clear" v-if="mainData.hasCoupon&&mainData.hasCoupon.length==0">
			<view class="foot_left" @click="webSelf.$Router.navigateTo({route:{path:'/pages/testread/testread'}})"><span class="book_icon"></span>试读</view>
			<view class="foot_right" @click="webSelf.$Router.navigateTo({route:{path:'/pages/openredpack/openredpack'}})">立即报名</view>
		</view>

		<view class="foot_note clear" v-if="mainData.hasCoupon&&mainData.hasCoupon.length>0">
			<img :src="messageData[0]&&messageData[0].mainImg&&messageData[0].mainImg[0]?messageData[0].mainImg[0].url:''" style="width:30px;height:30px"/>
			<view>{{messageData[0]?messageData[0].description:''}}</view>
		</view>
		<view style="width:100%;height:120px"></view>
		<view class="index_foot clear" v-if="mainData.hasCoupon&&mainData.hasCoupon.length>0">
			<view class="foot_left1" @click="webSelf.$Router.navigateTo({route:{path:'/pages/testread/testread'}})"><span class="book_icon"></span>试读</view>
			<view class="foot_right2 clear">
				<view class="foot_right_k">
					<view class="signleft">
						<view>
							<view>原价￥199</view>
							<view>红包折扣￥100</view>
						</view>
					</view>
					<button class="signbtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/signup/signup'}})">立即报名</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				mainData: {},
				is_open: false,
				is_show: false,
				articleOneData: {},
				articleTwoData: {},
				num: 0,
				messageData:[]
			}
		},

		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData', 'getArticleOneData', 'getArticleTwoData','getMessageData','tokenGet'], self)
		},

		methods: {

			isOpen() {
				const self = this;
				self.is_open = true;
				console.log("self.is_open", self.is_open)
			},

			menuChange(num) {
				const self = this;
				self.num = num;
			},

			tokenGet() {
				const self = this;
				const postData = {
					searchItem: {
						user_no: 'U624690926122965'
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('user_token', res.token);
						uni.setStorageSync('user_no', res.info.user_no);
						uni.setStorageSync('user_info', res.info);
					}
					console.log('res', res)
					self.$Utils.finishFunc('tokenGet');
				};
				self.$apis.tokenGet(postData, callback);
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no:uni.getStorageSync('user_no')
				};
				postData.getAfter = {
					hasOrder: {
						tableName: 'Order',
						middleKey: 'user_no',
						key: 'user_no',
						condition: '=',
						searchItem: {
							status: 1,
							pay_status: 1
						}
					},
					hasCoupon: {
						tableName: 'UserCoupon',
						middleKey: 'user_no',
						key: 'user_no',
						condition: '=',
						searchItem: {
							status: 1,
							use_step:1
						}
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						if (self.mainData.hasOrder.length == 0) {
							self.is_show = true;
							if (self.mainData.hasCoupon.length == 0) {
								self.getCouponData()
							};
						} else {
							self.$Router.redirectTo({
								route: {
									path: '/pages/todayread/todayread'
								}
							})
						}
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userGet(postData, callback);
			},

			getArticleOneData() {
				const self = this;
				const postData = {
					searchItem: {
						title: '计划介绍'
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.articleOneData = res.info.data[0]
					};
					self.$Utils.finishFunc('getArticleOneData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getArticleTwoData() {
				const self = this;
				const postData = {
					searchItem: {
						title: '绘本书单'
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.articleTwoData = res.info.data[0]
					};
					self.$Utils.finishFunc('getArticleTwoData');
				};
				self.$apis.articleGet(postData, callback);
			},


			getMessageData() {
				const self = this;
				const postData = {
					
					searchItem: {
						type: 1,
				
					}
				};
				const callback = (res) => {
					if(res.solely_code==100000){
						if (res.info.data.length > 0) {
							self.messageData.push.apply(self.messageData,res.info.data)
						}
					};	
					self.$Utils.finishFunc('getMessageData');
				};
				self.$apis.messageGet(postData, callback);
			},

			getCouponData() {
				const self = this;
				const postData = {};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.couponData = res.info.data[0]
					};
				};
				self.$apis.couponGet(postData, callback);
			},

			couponAdd() {
				const self = this;

				const postData = {
					tokenFuncName: 'getProjectToken',
					coupon_id: self.couponData.id,
					data: {
						pay_status: 1,
					},
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.$Utils.showToast('领取成功', 'none', 2000)
						self.mainData.hasCoupon.push({
							status: 1
						})
					} else {
						self.$Utils.showToast(res.msg, 'none')
					}
				};
				self.$apis.couponAdd(postData, callback);
			},


		}
	}
</script>

<style>
	@import "../../assets/style/index.css";
</style>
