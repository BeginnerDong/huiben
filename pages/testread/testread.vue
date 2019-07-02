<template>
	<view class="huise_bg read_head">
		<view class="">
			<view class="read_kk">
				<!--搜索框-->
				<view class="search_kk">
					<div>
						<view class="search_icon"></view>
						<input class="search_txt" placeholder="搜索绘本" v-model="searchTitle" confirm-type="search" type="text" @confirm="search"/>
					</div>
				</view>
				<!--热门搜索标签-->
				<view class="hot_kk">
					<view class="hot_title0">热门搜索</view>
					<view class="hot_tablist">
						<span class="hot_tab">生活习惯</span>
						<span class="hot_tab">自理能力</span>
						<span class="hot_tab">规则意识</span>
						<span class="hot_tab">安全意识</span>
						<span class="hot_tab">情绪疏导</span>
						<span class="hot_tab">亲子关系/安全感</span>
						<span class="hot_tab">面对挫折</span>
						<span class="hot_tab">生命教育</span>
						<span class="hot_tab">好奇心/想象力</span>
						<span class="hot_tab">科学素养/思维方式</span>
						<span class="hot_tab">自我意识</span>
						<span class="hot_tab">如何和他们相处并合作</span>
					</view>
				</view>

			</view>
			<!--推荐主题-->
			<view class="recommend__kk">
				<view class="recommend_title">推荐主题</view>
				<view class="recommend_type">
					<!--儿童行为心理习惯-->
					<view v-for="item in mainData">
						<view class="recommend_title"><span>{{item.menu}}</span></view>
						<view class="recommend_imglist clear">
							<view class="recommend_img"  v-for="c_item in item.data">
								<view class="recommend_div" @click="webSelf.$Router.navigateTo({route:{path:'/pages/bookintro/bookintro'}})">
									<img :src="c_item.mainImg&&c_item.mainImg[0]?c_item.mainImg[0].url:''" style="width:60px;height:70px"/>
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
	export default{
		data(){
			
			return{
				webSelf: this,
				mainData:[],
				searchTitle:''
			}
		},
		
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		methods:{
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type:1
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						for (var i = 0; i < res.info.data.length; i++) {
							if(self.mainData.length>0){
								if(res.info.data[i].label[res.info.data[i].menu_id].title==self.mainData[self.mainData.length-1].menu){
									self.mainData[self.mainData.length-1].data.push(res.info.data[i]);
								}else{
									self.mainData.push({
										menu: res.info.data[i].label[res.info.data[i].menu_id].title,
										data:[res.info.data[i]]
									});
								};
							}else{
								self.mainData.push({
									menu: res.info.data[i].label[res.info.data[i].menu_id].title,
									data:[res.info.data[i]]
								})
							};
						};
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
		}
	}
</script>

<style>
	
	@import "../../assets/style/testread.css";
	
</style>
