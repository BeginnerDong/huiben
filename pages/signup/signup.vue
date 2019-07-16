<template>
	<view class="danhongse_bg">
		<view class="sign_kk">
			<view class="user_intro clear">
				<img class="user_photo" :src="userData.headImgUrl" style="border-radius:50%"/>
				<view class="user_name">{{userData.nickname}}</view>
			</view>
			<view class="kid_mes">
				<view class="kid-name">
					真实姓名报名信息
				</view>
				<view class="sign_yh">
					坚持全勤打卡，作为奖励，我们将全额返还报名费
				</view>
				<view class="kid_sex_k clear">
					<view class="kid_age">
						宝贝性别
					</view>
					<view class="kid_age_txt">
						<picker @change="bindGenderChange" :value="genderIndex" :range="genderArray">
							<view class="uni-input">{{genderArray[genderIndex]?genderArray[genderIndex]:'请选择宝贝性别'}}</view>
						</picker>
					</view>
				</view>
				<view class="kid_age_k clear">
					<view class="kid_age">
						年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄
					</view>
					<view class="kid_age_txt">
						<picker @change="bindAgeChange" :value="ageIndex" :range="ageArray">
							<view class="uni-input">{{ageArray[ageIndex]?ageArray[ageIndex]:'请选择宝贝年龄'}}</view>
						</picker>

					</view>
				</view>
				<view class="kid_care">
					*务必真实填写，不同性别和年龄将匹配不同内容
				</view>
			</view>
			<view class="agreement">
				<img v-if="isAdmin" src="../../static/images/check_u1.png" style="vertical-align: middle;margin-right: 10px;"
				 @click="admin" />
				<img v-if="!isAdmin" src="../../static/images/check_u.png" style="vertical-align: middle;margin-right: 10px;"
				 @click="admin" />我同意并愿意遵守<span @click="webSelf.$Router.navigateTo({route:{path:'/pages/xxsc/xxsc?title=早教练习生服务协议'}})">《早教练习生服务协议》</span>和<span @click="webSelf.$Router.navigateTo({route:{path:'/pages/xxsc/xxsc?title=早教练习生隐私政策'}})">《早教练习生隐私政策》</span>
			</view>
			<view style="height: 60px;"></view>
		</view>

		<view class="sign_foot">
			<view class="sign_foot_left">
				限时特价￥{{mainData.price-couponData.discount}}<span style="text-decoration:line-through">原价￥{{mainData.price}}</span>
			</view>
			<view class="sign_foot_right" @click="webSelf.$Utils.stopMultiClick(addOrder)">
				<button style="border-radius:0">立即报名</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webSelf: this,
				submitData: {
					passage1: '',
					passage2: '',
				},
				userData:{},
				couponData:{},
				mainData: {},
				orderId: '',
				ageArray: ['0-3岁', '3-6岁'],
				genderArray: ['男孩', '女孩'],
				ageIndex: '',
				genderIndex: '',
				isAdmin: false
			}
		},

		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getUserData','getMainData', 'getCouponData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '60天幼儿能力提升计划'	
		},

		methods: {

			admin() {
				const self = this;
				self.isAdmin = !self.isAdmin;
			},

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
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.userGet(postData, callback);
			},

			getCouponData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.couponData = res.info.data[0]
					};
					self.$Utils.finishFunc('getCouponData');
				};
				self.$apis.userCouponGet(postData, callback);
			},

			bindAgeChange(e) {
				const self = this;
				console.log(e)
				self.ageIndex = e.detail.value;
				self.submitData.passage2 = self.ageArray[e.detail.value]
			},

			bindGenderChange(e) {
				const self = this;
				console.log(e)
				self.genderIndex = e.detail.value;
				self.submitData.passage1 = self.genderArray[e.detail.value]
			},

			getMainData() {
				const self = this;
				const postData = {
					thirdapp_id: 2
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					}
					console.log('res', res)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},

			addOrder(e) {
				const self = this;
				if (self.orderId != '') {
					self.pay();
					return
				};

				if (self.submitData.passage1 == '') {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择性别', 'none')
					return
				};
				if (self.submitData.passage2 == '') {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择年龄', 'none')
					return
				};
				if (!self.isAdmin) {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('未同意相关协议', 'none')
					return
				};
				var orderList = [];
				orderList.push({
					product: [{
						id: self.mainData.id,
						count: 1,
					}]
				});
				const postData = {
					tokenFuncName: 'getProjectToken',
					orderList: orderList,
					data: {
						passage1: self.submitData.passage1,
						passage2: self.submitData.passage2
					}
				};
				const callback = (res) => {

					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.pay(self.orderId)
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: '下单失败',
							duration: 2000
						});
					};
				};
				self.$apis.addOrder(postData, callback);
			},

			pay(order_id) {
				const self = this;
				const postData = {};
				postData.wxPay ={
					price: (self.mainData.price - self.couponData.discount).toFixed(2)
				};
				postData.coupon = [{
					id: self.couponData.id,
					price: self.couponData.discount,
				}];
				postData.tokenFuncName = 'getProjectToken',
					postData.searchItem = {
						id: self.orderId
					};
				postData.saveAfter = [{
					tableName: 'UserInfo',
					FuncName: 'update',
					data: {
						gender: self.submitData.passage1,
						age: self.submitData.passage2,
					},
					searchItem: {
						user_no: uni.getStorageSync('user_no'),
					}
				}]
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									uni.showToast({
										title: '支付成功',
										duration: 2000,
										success: function() {
											self.$Router.reLaunch({
												route: {
													path: '/pages/join/join'
												}
											})
										}
									});
								} else {
									uni.setStorageSync('canClick', true);
									uni.showToast({
										title: '支付失败',
										duration: 2000
									});
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							uni.setStorageSync('canClick', true);
							uni.showToast({
								title: '支付完成',
								duration: 2000,
								success: function() {
									self.$Router.reLaunch({
										route: {
											path: '/pages/join/join'
										}
									})
								}
							});

						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.pay(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/signup.css";

	uni-picker .uni-picker-action.uni-picker-action-confirm {
		color: rgb(54, 155, 145);
	}

	page {
		background: #f4f5f7;
	}
</style>
