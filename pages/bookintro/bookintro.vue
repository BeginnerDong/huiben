<template>
	<view class="huise_bg clear" :style="'height:'+screenHeight+'px'">
		<view style="width: 100%;">
			<view class="book_search_kk">
				<view class="search_kk" style="height:40px">
					<view class="sear_kk_0 clear" style="display: flex;padding: 0;height: 100%;">
						<view class="search_book">
							<span class="searchiocn_l" @click="search"></span>
					
								<input class="search_txt_b" style="color: #000000;width:80%"   v-model="searchTitle" confirm-type="search" type="text" @confirm="search"/>
						
						</view>
						<view class="all_book" style="display: flex;align-items: center;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/testread/testread'}})">
							<view style="width: 100%;">全部绘本</view>
						</view>
					</view>
				</view>
			</view>
			<swiper class="swiper-box"  :indicator-dots="false" :autoplay="false" :interval="3000" :duration="500" :circular="true"
			 @change="change" previous-margin="30px" next-margin="30px" :current="currIndex">
				<swiper-item   v-for="(item,index) in mainData" :key="index" @click="item.src?webSelf.$Router.redirectTo({route:{path:item.src}}):''">
					<view class="swiper-item" style="height: 90%;">
							<view class="book_intro_middle" :class="{'active':index===currIndex}" style="margin:auto">
								<view class="book_intro_img">
									<view style="width:40%">
										<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" style="width:100%;height: 150px;">
									</view>
								</view>
								<view class="book_name">{{item.title}}</view>
								<view class="book_copy">{{item.description}}</view>
								<view class="book_type"><span>{{item.label_array&&item.label_array[0]?item.label_array[0]:''}}</span></view>
								<view class="book_intro">
									<view class="content ql-editor" style="padding: 0;" v-html="item.content">
									</view>
								</view>
								<view class="open_book">
									<button :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/bookdetail/bookdetail?id='+$event.currentTarget.dataset.id}})">开始阅读</button>
								</view>
							</view>
					</view>
				</swiper-item>
			</swiper>
			<view style="height: 60px;"></view>
			<view class="foot_book">
				<view class="foot_book_kk">
					<view class="foot_book_btn"  @click="webSelf.$Router.redirectTo({route:{path:'/pages/todayread/todayread'}})">
						<img class="foot_iocn" src="../../static/images/index_u.png"/>
						<view style="font-size: 11px;">今日阅读</view>
					</view>
					<view class="foot_book_btn" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
						<img class="foot_iocn" src="../../static/images/book_s.png"/>
						<view style="font-size: 11px;">所有绘本</view>
					</view>
					<view class="foot_book_btn" @click="webSelf.$Router.redirectTo({route:{path:'/pages/game/game?id='+mainData[currIndex].id}})">
						<img class="foot_iocn" src="../../static/images/game_u.png"/>
						<view style="font-size: 11px;">游戏</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue"
	export default{
		components: {
			cSwiper,
		},
		data(){
			return{
				webSelf: this,
				mainData:[],
				searchTitle:'',
				currIndex:0,
				screenHeight:0
			}
		},
		
		onLoad(options) {
			const self = this;
			this.screenHeight = document.body.clientHeight;
			if(options.id){
				self.id = options.id;
			};
			
			self.$Utils.loadAll(['getMainData'], self);
			

			
		},
		
		onShow() {
			const self = this;
			document.title = '所有绘本'	
		},
		
		
		methods:{
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type:1,
					on_shelf:1
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData,res.info.data)
						if(self.id){
							for (var i = 0; i < self.mainData.length; i++) {
								if(self.mainData[i].id==self.id){
									self.currIndex = i
								}
							}
						}
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
			
			search(){
				const self = this;
				if(self.searchTitle!=''){
					self.$Router.navigateTo({route:{path:'/pages/searchsuccess/searchsuccess?title='+self.searchTitle}})
				}
			},
			
			change(e){
				console.log(e)
				const self =  this;
				self.currIndex = e.detail.current;
				console.log(self.currIndex)
			}
		}
	}
</script>

<style>
	@import "../../assets/style/bookintro.css";
	page{
		background: #f4f5f7;
	}
	.swiper-box {
		width: 100%;
		height: 80%;
	}
	
	.swiper-item {
		width: 95%;
		height: 95%;
		margin: 0 auto;
	}
	.active{
		
	}
</style>
