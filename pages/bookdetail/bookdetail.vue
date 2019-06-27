<template>
	<view>
		<swiper  :style="'height:'+screenHeight+'px'" :indicator-dots="false" :vertical="true" :autoplay="false"
		 :interval="3000" :duration="500" :circular="false" @change="change">
			<swiper-item  v-for="(item,index) in mainData" :key="index" :v-if="userData.hasOrder&&userData.hasOrder.length==0?index<8:''">
				<view class="book_kk" :style="'width:'+screenHeight+'px'">
					<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" style="width:100%;height:100%">
					<view class="pullup" :style="'width:'+screenHeight+'px'" style="display: flex;">
						<view  style="color: #fff;border-right:1px solid #fff;padding: 10px;" :style="'width:'+screenHeight/2+'px'">
							<view class="title" style="display: flex;">
							   <view style="width:4px;height:20px;background: rgb(54,155,145);"></view>
							   <view style="margin-left: 5px;font-size:15px">解读</view>
							</view>
							<view class="content" style="font-size:12px;margin-top: 10px;">相比第一个画面。。。。。撒旦撒旦撒大萨达撒多撒旦撒打算撒旦撒打算多撒旦撒打算奥术大师多
							相比第一个画面。。。。。撒旦撒旦撒大萨达撒多撒旦撒打算撒旦撒打算多撒旦撒打算奥术大师多相比第一个画面。。。。。
							撒旦撒旦撒大萨达撒多撒旦撒打算撒旦撒打算多撒旦撒打算奥术大师多</view>
						</view>
						<view  style="color: #fff;padding: 10px;" :style="'width:'+screenHeight/2+'px'">
							<view class="title" style="display: flex;">
							   <view style="width:4px;height:20px;background: rgb(54,155,145);"></view>
							   <view style="margin-left: 5px;font-size:15px">亲子互动指引</view>
							</view>
							<view class="content" style="font-size:12px;margin-top: 10px;">相比第一个画面。。。。。撒旦撒旦撒大萨达撒多撒旦撒打算撒旦撒打算多撒旦撒打算奥术大师多
							相比第一个画面。。。。。撒旦撒旦撒大萨达撒多撒旦撒打算撒旦撒打算多撒旦撒打算奥术大师多相比第一个画面。。。。。
							撒旦撒旦撒大萨达撒多撒旦撒打算撒旦撒打算多撒旦撒打算奥术大师多</view>
						</view>
					</view>
				</view>			
			</swiper-item>
			<swiper-item :style="'height:'+screenHeight+'px'" v-if="userData.hasOrder&&userData.hasOrder.length>0">
				<view class="daka_bg" :style="'width:'+screenHeight+'px'">
					<view class="head_dk clear">
						<button @click="webSelf.$Router.navigateTo({route:{path:'/pages/rewards/rewards?id='+id}})">打卡得聪明豆</button>
					</view>
					<view class="daka_middle clear" style="height:180px">
						<view class="daka_m_left" style="height:100%">
							<img :src="mainData&&mainData[0]&&mainData[0].article&&mainData[0].article[0]&&mainData[0].article[0].mainImg&&mainData[0].article[0].mainImg[0]?
							mainData[0].article[0].mainImg[0].url:''" style="height:100%"/>
						</view>
						<view class="daka_m_right">
							<view>
								<view class="daka_book">
									{{mainData&&mainData[0]&&mainData[0].article&&mainData[0].article[0]?mainData[0].article[0].title:''}}读完了
								</view>
								<view class="daka_fx">
									赶紧点击右下角按钮打卡吧
								</view>
								<button class="dabtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/fenxiang/fenxiang?id='+id}})">立即分享</button>
							</view>
						</view>
					</view>
					<view class="ljbm_foot" style="margin-top: 20px;">
						<view class="clear">
							<view class="ljbm_book" v-for="item in allData">
								<view class="ljbm_book_k">
									<view class="ljbm_bookimg">
										<img :src="item.mainImg&&item.mainImg[0]&&item.mainImg[0].url?item.mainImg[0].url:''" />
									</view>
									<view class="ljbm_bookname">
										<view class="bookname1">
											{{item.title}}
										</view>
										<view class="booktab">
											情绪管理
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item :style="'height:'+screenHeight+'px'" v-if="userData.hasOrder&&userData.hasOrder.length==0">
				<view class="ljbm_kk" :style="'width:'+screenHeight+'px'">
					<view class="ljbm_top clear" style="margin-top: 50px;">
						<view class="ljbm_top_left">
							<img :src="mainData&&mainData[8]&&mainData[8].mainImg&&mainData[8].mainImg[0]?mainData[8].mainImg&&mainData[8].mainImg[0].url:''" />
						</view>
						<view class="ljbm_top_right">
							<view class="ljbm_tt">
								解锁畅阅60本指引解析，可立即报名：
							</view>
							<view class="ljbmbtn" @click="webSelf.$Router.navigateTo({route:{path:'/pages/signup/signup'}})">
								<view class="ljbm_zk">红包折扣￥100<span>👉仅需￥99</span></view>
								<button class="ljbm_btn">立即报名</button>
							</view>
							<view class="lj_price">
								原价￥199
							</view>
							<view class="lj_daka">
								坚持打卡返还￥99+3本书
							</view>
						</view>
					</view>
					<view class="ljbm_foot">
						<view class="clear">
							<view class="ljbm_book" v-for="item in allData">
								<view class="ljbm_book_k">
									<view class="ljbm_bookimg">
										<img :src="item.mainImg&&item.mainImg[0]&&item.mainImg[0].url?item.mainImg[0].url:''" />
									</view>
									<view class="ljbm_bookname">
										<view class="bookname1">
											{{item.title}}
										</view>
										<view class="booktab">
											情绪管理
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue"
	export default {
		components: {
			cSwiper,
		},
		data() {
			return {
				webSelf: this,
				mainData: [],
				searchTitle: '',
				currIndex: 0,
				id: '',
				allData:[],
				userData:{}
			}
		},

		onLoad(options) {
			const self = this;
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			console.log('this.screenHeight', this.screenHeight)
			self.id = options.id;
			self.$Utils.loadAll(['getUserData','getAllData'], self)
		},

		methods: {

			getUserData() {
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
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
					};
					self.getMainData();
				};
				self.$apis.userGet(postData, callback);
			},

			getAllData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					type: 1,
					on_shelf: 1
				};
				postData.order = {
					update_time: 'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.allData.push.apply(self.allData, res.info.data)
					}
					self.$Utils.finishFunc('getAllData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 1,
					art_id: self.id
				};
				postData.order = {
					page: 'asc'
				};
				postData.getAfter = {
					article:{
						tableName:'Article',
						middleKey:'art_id',
						key:'id',
						searchItem:{
							status:1
						},
						condition:'='
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data)
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.articleDetailGet(postData, callback);
			},

			change(e) {
				console.log(e)
				const self = this;
				self.currIndex = e.detail.current;
				/* if(self.currIndex+1==self.mainData.length){
					self.$Router.navigateTo({route:{path:'/pages/daka/daka?id='+self.id}})
				} */
			}

		}
	}
</script>


<style>
	@import "../../assets/style/bookdetail.css";

	.re {
		transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		/* Internet Explorer 9*/
		-moz-transform: rotate(90deg);
		/* Firefox */
		-webkit-transform: rotate(90deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(90deg);
		/* Opera */
		filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
	}
</style>
