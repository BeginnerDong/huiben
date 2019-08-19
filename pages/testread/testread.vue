<template>
	<view class="huise_bg read_head">
		<view class="">
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
				<!--热门搜索标签-->
				<view class="hot_kk">
					<view class="hot_title0">热门搜索</view>
					<view class="hot_tablist">
						<span class="hot_tab" v-for="item in labelData" @click="searchTwo" :data-title="item.title">{{item.title}}</span>
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
	export default{
		data(){
			
			return{
				webSelf: this,
				mainData:[],
				labelData:[],
				labelDataTwo:[],
				searchTitle:''
			}
		},
		
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData','getLabelData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '搜索绘本'	
		},
		
		methods:{
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					parentid:['in',[3,4,5,6]]
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						for (var i = 0; i < res.info.data.length; i++) {
							self.labelData.push(res.info.data[i]);
						};			
					};		
	
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			/* getLabelDataTwo() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					parentid:['in',self.labelData]
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelDataTwo.push.apply(self.labelDataTwo,res.info.data)				
					};		
					console.log('self.labelDataTwo',self.labelDataTwo)
					self.$Utils.finishFunc('getLabelDataTwo');
				};
				self.$apis.labelGet(postData, callback);
			}, */
			
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
						for (var i = 0; i < res.info.data.length; i++) {
							if(self.mainData.length>0){
								var hasone = false;
								for(var j =0;j<self.mainData.length;j++){
									if(res.info.data[i].label[res.info.data[i].menu_id].title==self.mainData[j].menu){
										self.mainData[j].data.push(res.info.data[i]);
										hasone = true;
									};
								};
								if(!hasone){
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
			
			searchTwo(e){
				const self = this;
				console.log(e)
				var menu_title = e.currentTarget.dataset.title;
				if(menu_title!=''){
					self.$Router.navigateTo({route:{path:'/pages/searchsuccess/searchsuccess?menu_title='+menu_title}})
				}
			},
		}
	}
</script>

<style>
	
	@import "../../assets/style/testread.css";
	
</style>
