<template>
	<view class="cmdgz_bg">
		<view class="cmdgz">
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
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		methods: {
			
			getMainData() {
				const self = this;
				const postData = {
					searchItem: {
						title: '聪明豆规则'
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
		}
	}
	
	
</script>


<style>
	@import "../../assets/style/cmdgz.css";
</style>
