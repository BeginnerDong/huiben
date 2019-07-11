<template>
	<view class="cmd_bg">
		<view class="cmd_p">
			<view class="cmd_top clear">
				<img class="cmdimg" src="../../static/images/search.png"  />
				<input class="cmd_txt"  placeholder="小黄和小蓝" v-model="searchTitle" confirm-type="search" type="text" @confirm="search"/>
			</view>
			<view class="cmd_byzs" @click="toCertificate">
				<view class="cmdbyzs_k" style="display: flex;">
					<view class="cmdbyzsimg">
					</view>
					<view style="width:70%;line-height: 65px;">毕业证书</view>
					
					<view class="cmdjiantou" style="display: flex;align-items: center;height:65px;justify-content: flex-end;width: 10%;">
    
						<img src="../../static/images/right.png"  style="width:10px;height:15px"/>
					</view>
				</view>
			</view>
			<view class="cmd_dq_k">
				<view class="cmdtitle">
					当前聪明豆
					<view class="cmdgz" @click="webself.$Router.navigateTo({route:{path:'/pages/cmdgz/cmdgz'}})">聪明豆规则</view>
				</view>
				<view class="cmdsum">{{userData&&userData.info?userData.info.score:''}}</view>
				<view class="cmdtk" v-if="userData.hasOrder&&userData.hasOrder.length>0">
					距离全额退款并领取3本书还有{{lessScore}}个聪明豆
				</view>
				<view class="cmdtk" v-if="userData.hasOrder&&userData.hasOrder.length==0">
					距离获得99元奖学金＋3本书还有60个聪明豆
				</view>
				<view class="cmdtk" style="height:15px" v-if="userData.hasOrder&&userData.hasOrder.length==0">
					<span style="text-decoration:underline;color: rgb(54,155,145);" >立即报名</span>
				</view>
				<view class="cmdjdt">
					<!-- <view class=""></view> -->
					<view>
						<progress :percent="percent1" activeColor="#2fc899" active stroke-width="12" style='border-radius:100px;overflow:hidden'/>
					</view>
					<view class="cmd1" :style="{left:left1}"><span class="cmdcion"></span>{{userData&&userData.info?userData.info.score:''}}</view>
					<view class="cmd2">60</view>
				</view>
			</view>
			<view class="cmdlist_k">
				<view class="cmdlist">
					<view class="cmdlisttitle">
						{{userData.hasOrder&&userData.hasOrder.length==0?'其他用户的':''}}聪明豆记录
					</view>
					<view class="cmdlistdetail" style="display: flex;" v-for="item in mainData">
						<view style="margin-right: 5px;" v-if="userData.hasOrder&&userData.hasOrder.length==0">
							<image :src="item.user?item.user.headImgUrl:''" style="width:40px;height:40px;border-radius:50%"></image>
						</view>
						<view class="cmd_bookname" :style="userData.hasOrder&&userData.hasOrder.length==0?'width:83%':'width:100%'">
							《{{item.book?item.book.title:''}}》
							<span class="cmd_time">{{item.create_time}} {{item.week}}</span>
							<view class="addcmd">
								+1
							</view>
						</view>
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
				userData: {},
				lessScore:'',
				mainData:[],
				searchTitle:'',
				percent1:'',
				left1:''
			}
		},


		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getUserData'], self)
		},

		methods: {
			
			toCertificate(){
				const self = this;
				if(parseInt(self.userData.score)>=60){
					self.$Router.navigateTo({route:{path:'/pages/byzs/byzs'}})
				}else{
					self.$Router.navigateTo({route:{path:'/pages/xszs/xszs'}})
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
						self.userData.info.score = parseInt(self.userData.info.score);
						self.lessScore = 60-self.userData.info.score;
						self.percent1 = self.userData.info.score/60;
						self.left1 = uni.upx2px(600*(self.percent1/100)) + 'px';
					};
					self.getMainData();
					
					console.log('left1',self.left1)
				};
				self.$apis.userGet(postData, callback);
			},


			getMainData(isNew) {
				const self = this;
				if(isNew){
					self.$Utils.clearPageIndex(self)
				};
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					
				};
				if(self.userData.hasOrder.length==0){
					postData.searchItem.user_type = 0
					/* postData.searchItem.user_no = ['not in',uni.getStorageSync('user_no')] */
				}else{
					postData.searchItem.user_no = uni.getStorageSync('user_no')
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
						condition:'=',
						info:['title']
					},
					user:{
						tableName:'User',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
						},
						condition:'=',
						info:['headImgUrl']
					},
				}
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							self.mainData[i].create_time = self.mainData[i].create_time.substring(0, 10);
							self.mainData[i].week = self.$Utils.getWeek(self.mainData[i].create_time.substring(0, 10))
						}
					} else {
						self.isLoadALL = true
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.logGet(postData, callback);
			},
			
			search(){
				const self = this;
				if(self.searchTitle!=''){
					self.$Router.navigateTo({route:{path:'/pages/searchsuccess/searchsuccess?title='+self.searchTitle}})
				}
			},
		}
	}
</script>

<style>
	@import "../../assets/style/cmdjl.css";
	page {
		background: #f4f5f7;
	}
</style>
