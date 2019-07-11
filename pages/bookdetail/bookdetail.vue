<template>
	<view>
		<swiper  :style="'height:'+screenHeight+'px'" :indicator-dots="false" :vertical="true" :autoplay="false"
		 :interval="3000" :duration="500" :circular="false" @change="change">
			<swiper-item  v-for="(item,index) in mainData"  :v-if="userData.hasOrder&&userData.hasOrder.length==0?index<7:''">
				<view class="book_kk" >
					<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" style="width:100%;height:100%">
					<view class="pullup" :style="styleInfo" style="display: flex;">
						<view  style="color: #fff;border-right:1px solid #fff;padding: 10px 14px;overflow: scroll;" :style="'width:'+screenHeight/2+'px'">
							<view class="title" style="display: flex;">
							   <view style="width:4px;height:20px;background: rgb(54,155,145);"></view>
							   <view style="margin-left: 5px;font-size:15px">解读</view>
							</view>
							<view class="content" style="font-size:12px;margin-top: 10px;width: 100%;margin: 4px auto;">
								<view class="content ql-editor" style="padding: 0;" v-html="item.content">
								</view>
							</view>
						</view>
						<view  style="color: #fff;padding: 10px;overflow: scroll;" :style="'width:'+screenHeight/2+'px'">
							<view class="title" style="display: flex;">
							   <view style="width:4px;height:20px;background: rgb(54,155,145);"></view>
							   <view style="margin-left: 5px;font-size:15px">亲子互动指引</view>
							</view>
							<view class="content" style="font-size:12px;margin-top: 10px;width: 100%;margin: 4px auto;">
								<view class="content ql-editor" style="padding: 0;" v-html="item.description">
								</view>
							</view>
						</view>
					</view>
				</view>	
				<view style="position:absolute;z-index: 999;transform: rotate(90deg);transform-origin:50% 50%;" :style="'left:'+pullLeft+'px;top:'+pullTop+'px'" @click="isShow"><image style="width:50px;height:25px;" :src="pullUrl"></image></view>
			</swiper-item>
			<swiper-item :style="'height:'+screenHeight+'px'" v-if="userData.hasOrder&&userData.hasOrder.length>0">
			<!-- <swiper-item :style="'height:'+screenHeight+'px'" > -->
				<view class="daka_bg" :style="'width:'+screenHeight+'px;left:'+(-screenHeight+screenWidth)/2 +'px;top:'+(screenHeight-screenWidth)/2+'px'">
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
							<view class="ljbm_book" v-for="(item,index) in allData" v-if="index<3" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/bookdetail/bookdetail?id='+$event.currentTarget.dataset.id}})">
								<view class="ljbm_book_k">
									<view class="ljbm_bookimg">
										<img :src="item.mainImg&&item.mainImg[0]&&item.mainImg[0].url?item.mainImg[0].url:''" />
									</view>
									<view class="ljbm_bookname">
										<view class="bookname1 avoidOverflow">
											{{item.title}}
										</view>
										<view class="booktab"  v-for="(c_item,c_index) in item.label_array"  v-if="c_index==0">
											{{c_item}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					

				</view>
			</swiper-item>
			<swiper-item :style="'height:'+screenHeight+'px'" v-if="userData.hasOrder&&userData.hasOrder.length==0">
				
				<view class="ljbm_kk" :style="'width:'+screenHeight+'px;height:'+screenWidth+'px;left:'+(-screenHeight+screenWidth)/2 +'px;top:'+(screenHeight-screenWidth)/2+'px'">
					<view class="ljbm_top clear" style="margin-top: 50px;">
						<view class="ljbm_top_left" style="text-align: center;">
							
							
							<img style="position: relative;"  :style="'width:'+screenWidth/2+'px'" :src="mainData&&mainData[8]&&mainData[8].mainImg&&mainData[8].mainImg[0]?mainData[8].mainImg&&mainData[8].mainImg[0].url:''" />
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
							<view class="ljbm_book" v-for="(item,index) in allData" v-if="index<3" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/bookdetail/bookdetail?id='+$event.currentTarget.dataset.id}})">
								<view class="ljbm_book_k">
									<view class="ljbm_bookimg">
										<img :src="item.mainImg&&item.mainImg[0]&&item.mainImg[0].url?item.mainImg[0].url:''" />
									</view>
									<view class="ljbm_bookname avoidOverflow">
										<view class="bookname1 avoidOverflow">
											{{item.title}}
										</view>
										<view class="booktab avoidOverflow" v-for="(c_item,c_index) in item.label_array"  v-if="c_index==0">
											{{c_item}}
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
				userData:{},
				screenHeight:0,
				screenWidth:0,
				realheight:0,
				pullTop:0,
				pullLeft:0,
				styleInfo:'',
				OriginStyle:'',
				pullUrl:'/static/images/pulldown.png'
				
			}
		},

		onLoad(options) {
			const self = this;
			console.log('uni.getSystemInfoSync()',uni.getSystemInfoSync());
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			this.screenWidth = uni.getSystemInfoSync().windowWidth;
			this.realheight = this.screenWidth/3;
			this.pullTop = this.screenHeight/2 - 11;
			this.pullLeft = -16;
			this.styleInfo = 'width:'+this.screenHeight+'px;height:'+this.realheight+'px;top:'+(this.screenHeight/2-this.realheight/2)+'px;left:-'+(this.screenHeight/2-this.realheight/2)+'px';
			this.OriginStyle = self.$Utils.cloneForm(self.styleInfo) ;
			console.log('this.styleInfo',this.styleInfo)
			console.log('this.screenHeight', this.screenHeight)
			self.id = options.id;
			self.$Utils.loadAll(['getUserData','getAllData'], self)
		},

		methods: {
			
			
			isShow(){
				
				console.log('isShow')
				const self = this;
				if(this.styleInfo==this.OriginStyle){
					this.styleInfo = 'width:'+this.screenHeight+'px;height:'+this.realheight+'px;top:'+(this.screenHeight/2-this.realheight/2)+'px;left:-'+(this.screenHeight/2+this.realheight)+'px';
					this.pullUrl = '/static/images/pullup.png';
				}else{
					this.styleInfo = self.$Utils.cloneForm(self.OriginStyle);
					this.pullUrl = '/static/images/pulldown.png';
				};
			},

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
