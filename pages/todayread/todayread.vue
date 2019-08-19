<template>
	<view class="huise_bg" style="margin-top: 5%;"  >
		<view class="td_read_kk">
			<view class="td_read_k" >
				<view style="width: 100%;height:30upx;"></view>
				<view class="book_intro_img" style="height:170px">
					<view style="width:42%">
					<img :src="todayBook&&todayBook.mainImg&&todayBook.mainImg[0]?todayBook.mainImg[0].url:''" style="width: 100%;height: 150px;">
					</view>
				</view>
				<view class="book_name">{{todayBook?todayBook.title:''}}</view>
				<view class="book_copy">{{todayBook?todayBook.description:''}}</view>
				<view class="book_type"><span>{{todayBook&&todayBook.label_array?todayBook.label_array[0]:''}}</span></view>
				<view class="book_intro" style="height:48px">
					
					<view class="content ql-editor" style="padding: 0;" v-html="todayBook?todayBook.content:''">
					</view>
				</view>
				<view class="book_tab">
					<view style="width:80%;height:100%;overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">“{{todayBook?todayBook.small_title:''}}”</view>
				</view>
				<view class="clear bookbtn" style="height: 80px;margin-top: 0;">
					<button class="ayerbtn" style="background: #fff;margin-top: 20px;" 
					@click="yesterdayOrAll">
					{{canYesterday?'读昨日书':'看看其他'}}</button>
					<button class="open_book" style="margin-top: 20px;"  @click="webself.$Router.navigateTo({route:{path:'/pages/bookdetail/bookdetail?id='+todayBook.id}})">开始阅读</button>
				</view>
			</view>
			<view style="width: 100%;height:60px"></view>
			
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
					<view class="foot_book_btn" @click="webself.$Router.redirectTo({route:{path:'/pages/game/game?id='+todayBook.id}})">
						<img class="foot_iocn" src="../../static/images/game_u.png"/>
						<view style="font-size: 11px;">游戏</view>
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
				userData: {},
				lessScore:'',
				allData:[],
				id:'',
				week:'',
				canYesterday:false,
				todayBook:'',
				lastBook:''
			}
		},


		onLoad(options) {
			const self = this;
			this.screenHeight = document.body.clientHeight;
			self.week = new Date().getDay();  
			if(self.week==2||self.week==4||self.week==6){
				self.canYesterday = true
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '今日阅读'	
		},

		methods: {
			
			yesterdayOrAll(){
				const self = this;
				if(self.lastBook&&JSON.stringify(self.lastBook)!='{}'){
					self.$Router.navigateTo({route:{path:'/pages/bookintro/bookintro?id='+self.lastBook.id}})
				}else if(self.canYesterday){
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
					update_time:'asc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						console.log('res.info.data',res.info.data)
						self.allData.push.apply(self.allData,res.info.data);
						var timeStamp = new Date(new Date().toLocaleDateString()).getTime();
						var lastBook = uni.getStorageSync('lastBook');
						var todayBook = uni.getStorageSync('todayBook');
						if(todayBook&&todayBook.timeStamp!=timeStamp){
							self.lastBook = todayBook;
							var todayIndex = -1;
							for(var i=0;i<self.allData.length;i++){
								if(self.allData[i].id==todayBook.id){
									if(i==self.allData.length-1){
										todayIndex = 0
									}else{
										todayIndex = i + 1;
									};
								};
								if(i==todayIndex){
									self.todayBook = self.allData[i];
									self.todayBook.timeStamp = timeStamp;
									break;
								}
							};
							uni.setStorageSync('lastBook',self.lastBook);
							uni.setStorageSync('todayBook',self.todayBook);
						}else if(!todayBook){
							self.todayBook = self.allData[0];
							self.todayBook.timeStamp = timeStamp;
							uni.setStorageSync('lastBook',self.lastBook);
							uni.setStorageSync('todayBook',self.todayBook);
						}else{
							self.todayBook = todayBook;
							self.lastBook = lastBook;
						};
					};
					console.log('todayBook',self.todayBook)
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
					user_no:uni.getStorageSync('user_no')
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
					if (res.info.data.length > 0&&res.info.data[0].book.length>0) {
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
	page {
		background: #f4f5f7;
	}
</style>
