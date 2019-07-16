<template>
	<view class="xxsc_bg">
		<view class="xxsc">
			<view class="content ql-editor" v-html="mainData.content">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webself: this,
				mainData:{}
			}
		},
		
		onLoad(options){
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '游戏介绍'	
		},
		
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {
					searchItem: {
						id: self.id
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleDetailGet(postData, callback);
			},
		}
	}
	
	
</script>

<style>
	@import "../../assets/style/xxsc.css";
	page {
		background: #f4f5f7;
	}
</style>
