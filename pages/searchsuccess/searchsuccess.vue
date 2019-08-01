<template>
	<view class="huise_bg read_head">
		<view class="search_big_k">
			<view class="read_kk">
				<!--搜索框-->
				<view class="search_kk" style="height: 40px;padding: 0;display: flex;">
					
					<view style="width: 10%;display: flex;align-items: center;justify-content: center;height: 100%;">
						<img src="../../static/images/search2.png" style="width: 16px;height: 16px;"/>
					</view>
					<div style="width: 90%;height: 100%;display: flex;align-items: center;">
						<input class="search_txt" style="color: #000000;width: 100%;margin-left: 5px;" placeholder="搜索绘本" v-model="searchTitle" confirm-type="search" type="text" @confirm="search"/>
					</div>
				</view>
			</view>
			<view class="search_title" v-if="mainData.length>0">搜索结果</view>
			<view class="search_list" v-if="mainData.length>0" v-for="item in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/bookintro/bookintro?id='+$event.currentTarget.dataset.id}})">
				<view class="search_cont_list">
					<view class="search_deatil clear">
						<view class="search_left">
							<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
						</view>
						<view class="search_right">
							<view class="contact_title">{{item.title}}</view>
							<view style="width:100%;display: flex;">
								<view class="cont_tab" style="padding: 0 10px;">{{item.label_array?item.label_array[0]:''}}</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view class="none_cont" v-if="mainData.length==0">找不到相关的内容喔~</view>
			<!--推荐主题-->

			<view class="recommend__kk" v-if="mainData.length==0">
				<view class="recommend_title">推荐主题</view>
				<view class="recommend_type">
					<!--儿童行为心理习惯-->
					<view v-for="item in articleData">
						<view class="recommend_title"><span>{{item.menu}}</span></view>
						<view class="recommend_imglist clear">
							<view class="recommend_img"  v-for="c_item in item.data">
								<view class="recommend_div" :data-id="c_item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/bookintro/bookintro?id='+$event.currentTarget.dataset.id}})">
									<img :src="c_item.mainImg&&c_item.mainImg[0]?c_item.mainImg[0].url:''" style="width:60px;height:75px"/>
									<view class="re_img_title">{{c_item.title}}</view>
								</view>
							</view>
							<view class="recommend_img">
								<view class="recommend_div">
									<div class="re_update">
									持续更新中...
									</div>
								</view>
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
				webSelf: this,
				articleData:[],
				mainData: [],
				searchTitle: '',
				title: ''
			}
		},

		onLoad(options) {
			const self = this;
			if (options.title) {
				self.title = options.title,
				self.searchTitle = options.title;
			};
			if(options.menu_title){
				self.menu_title = options.menu_title
			}
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '搜索绘本'	
		},

		methods: {

			getArticleData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 1
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						for (var i = 0; i < res.info.data.length; i++) {
							if (self.articleData.length > 0) {
								if (res.info.data[i].label[res.info.data[i].menu_id].title == self.articleData[self.articleData.length - 1].menu) {
									self.articleData[self.articleData.length - 1].data.push(res.info.data[i]);
								} else {
									self.articleData.push({
										menu: res.info.data[i].label[res.info.data[i].menu_id].title,
										data: [res.info.data[i]]
									});
								};
							} else {
								self.articleData.push({
									menu: res.info.data[i].label[res.info.data[i].menu_id].title,
									data: [res.info.data[i]]
								})
							};
						};
					};
				};
				self.$apis.articleGet(postData, callback);
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 1,
				};
				if(self.title){
					postData.searchItem.title = ['LIKE', ['%' + self.title + '%']]
				};
				if(self.menu_title){
					postData.searchItem.label_array = ['LIKE', ['%' + self.menu_title + '%']]
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data)
					}else{
						self.getArticleData()
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},


			search() {
				const self = this;
				if (self.searchTitle != '') {
					self.title = self.searchTitle;
					self.mainData = [];
					self.getMainData()
				}
			},
		}
	}
</script>

<style>
	
	@import "../../assets/style/searchsuccess.css";
	page{
		background: #f4f5f7;
	}
</style>
