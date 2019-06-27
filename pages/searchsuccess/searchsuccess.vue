<template>
	<view class="huise_bg read_head">
		<view class="search_big_k">
			<view class="read_kk">
				<!--搜索框-->
				<view class="search_kk">
					<div style="width: 100%;">
						<view class="search_icon"></view>
						<input class="search_txt" placeholder="搜索绘本" v-model="searchTitle" confirm-type="search" type="text" @confirm="search"/>
					</div>
				</view>
			</view>
			<view class="search_title" v-if="mainData.length>0">搜索结果</view>
			<view class="search_list" v-if="mainData.length>0" v-for="item in mainData">
				<view class="search_cont_list">
					<view class="search_deatil clear">
						<view class="search_left">
							<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
						</view>
						<view class="search_right">
							<view class="contact_title">{{item.title}}</view>
							<view class="cont_tab">色彩与表达</view>
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
						<view class="recommend_imglist clear" v-for="c_item in item.data">
							<view class="recommend_img">
								<view class="recommend_div" @click="webSelf.$Router.redirectTo({route:{path:'/pages/bookintro/bookintro'}})">
									<img :src="c_item.mainImg&&c_item.mainImg[0]?c_item.mainImg[0].url:''" />
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
				self.searchTitle = options.title
			};
			self.$Utils.loadAll(['getMainData'], self)
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
					title: ['LIKE', ['%' + self.title + '%']]
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
