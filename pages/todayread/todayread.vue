<template>
	<view class="huise_bg">
		<view class="td_read_kk">
			<view class="td_read_k">
				<view class="book_intro_img" style="height:150px">
					<view style="width:35%">
					<img :src="allData[0]&&allData[0].mainImg&&allData[0].mainImg[0]?allData[0].mainImg[0].url:''">
					</view>
				</view>
				<view class="book_name">{{allData[0]?allData[0].title:''}}</view>
				<view class="book_copy">{{allData[0]?allData[0].description:''}}</view>
				<view class="book_type"><span>情绪管理</span></view>
				<view class="book_intro" style="height:48px">
					
					<view class="content ql-editor" style="padding: 0;" v-html="allData[0]?allData[0].content:''">
					</view>
				</view>
				<view class="book_tab">
					<view>“{{allData[0]?allData[0].small_title:''}}”</view>
				</view>
				<view class="clear bookbtn">
					<button class="ayerbtn" style="background: #fff;" 
					@click="yesterdayOrAll">
					{{canYesterday?'读昨日书':'看看其他'}}</button>
					<button class="open_book" @click="webself.$Router.navigateTo({route:{path:'/pages/bookdetail/bookdetail?id='+allData[0].id}})">开始阅读</button>
				</view>
			</view>
			<view style="height: 60px;"></view>
		</view>
			<view class="foot_book">
				<view class="foot_book_kk">
					<view class="foot_book_btn">
						<img class="foot_iocn" src="../../static/images/index_s.png"/>
						<view style="font-size: 11px;">今日阅读</view>
					</view>
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
						<img class="foot_iocn" src="../../static/images/book_u.png"/>
						<view style="font-size: 11px;">所有绘本</view>
					</view>
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/game/game?id='+allData[0].id}})">
						<img class="foot_iocn" src="../../static/images/game_u.png"/>
						<view style="font-size: 11px;">游戏</view>
					</view>
				</view>
			</view>
				<button style="position: fixed;top:20%" @click="webself.$Router.navigateTo({route:{path:'/pages/user/user'}})">我的</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				webself: this,
				userData: {},
				lessScore:'',
				allData:[],
				id:'',
				week:'',
				canYesterday:false
			}
		},


		onLoad(options) {
			const self = this;
			self.week = new Date().getDay();  
			if(self.week==2||self.week==4||self.week==6){
				self.canYesterday = true
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData'], self)
		},

		methods: {
			
			yesterdayOrAll(){
				const self = this;
				if(self.canYesterday){
					self.$Router.navigateTo({route:{path:'/pages/bookdetail/bookdetail?id='+self.id}})
				}else{
					self.$Router.navigateTo({route:{path:'/pages/bookintro/bookintro'}})
				}
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
					self.getAllData()
				};
				self.$apis.userGet(postData, callback);
			},
			
			getAllData(){
				const self = this;
				const postData = {};
				postData.searchItem = {
					type:1,
					on_shelf:1
				};
				postData.order = {
					update_time:'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.allData.push.apply(self.allData,res.info.data)
					} 
					self.getMainData()
				};
				self.$apis.articleGet(postData, callback);
			},
			
			

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.searchItem = {
					type:1,
				};
				postData.getAfter = {
					book:{
						tableName:'Article',
						middleKey:'order_no',
						key:'id',
						searchItem:{
							status:1,
							type:1
						},
						condition:'='
					},
				}
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.id = res.info.data[0].book[0].id
					} else {
						var num = parseInt(Math.random()*self.allData.length,10);
						self.id = self.allData[num].id;
						console.log(self.id)
					}
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.logGet(postData, callback);
			},
			

		}
	}
</script>


<style>
	@import "../../assets/style/todayread.css";
</style>
