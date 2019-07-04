<template>
	<view class="huise_bg">
		<!-- <view> -->
		<view class="game_kk">
			<view class="gameintro_k clear" v-for="item in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/gameDetail/gameDetail?id='+$event.currentTarget.dataset.id}})">
				<view class="game_img"><img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" style="width:100%;height:100%" /></view>
				<view class="game_intro">《{{item.title}}》游戏</view>
			</view>
			<view class="gameintro_k game_yh" v-if="userData.hasOrder.length==0">
				报名加入计划查看全部<br />
				坚持打卡还能退还全部报名费用，并获赠3本图书
			</view>
			<view v-if="userData.hasOrder.length==0" @click="webSelf.$Router.navigateTo({route:{path:'/pages/signup/signup'}})">
				<button class="gamebtn">立即报名</button>
			</view>
		</view>
		<view style="height: 60px;"></view>
		<view class="foot_book">
			<view class="foot_book_kk">
				<view class="foot_book_btn" @click="webSelf.$Router.redirectTo({route:{path:'/pages/todayread/todayread'}})">
					<img class="foot_iocn" src="../../static/images/index_u.png" />
					<view style="font-size: 11px;">今日阅读</view>
				</view>
				<view class="foot_book_btn" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
					<img class="foot_iocn" src="../../static/images/book_u.png" />
					<view style="font-size: 11px;">所有绘本</view>
				</view>
				<view class="foot_book_btn">
					<img class="foot_iocn" src="../../static/images/game_s.png" />
					<view style="font-size: 11px;">游戏</view>
				</view>
			</view>
		</view>
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {

			return {
				webSelf: this,
				mainData: [],
				userData: {},
				id: '',
				paginate:''
			}
		},

		onLoad(options) {
			const self = this;
			if (options.id) {
				self.id = options.id
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		onReachBottom() {	
			const self = this;
			if (!self.isLoadAll&&uni.getStorageSync('canClick')) {
				console.log('11',self.paginate.currentPage);
				self.paginate.currentPage++;
				console.log('22',self.paginate.currentPage);
				self.getMainData()
			};
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
					self.getMainData()
				
				};
				self.$apis.userGet(postData, callback);
			},

			getMainData(isNew) {
				const self = this;
				if(isNew){
					self.$Utils.clearPageIndex(self)
				};
				const postData = {};
				
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 2,
					art_id:self.id
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						if(self.userData.hasOrder.length==0){
							if(res.info.data.length>3){
								res.info.data = res.info.data.splice(0,3)
							}
						};
						self.mainData.push.apply(self.mainData, res.info.data)
					}else{
						self.isLoadALL = true
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.articleDetailGet(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/game.css";

	page {
		background: #f4f5f7;
	}
</style>
