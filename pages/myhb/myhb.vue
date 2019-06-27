<template>
	<view class="myhb_bg">
		<view class="myhb">
			<view class="hblist clear" @click="showDetail" v-for="item in mainData">
				<span class="hbimg">
				</span>
				<view class="hb_qk" style="margin-top: 0;line-height: 70px;">
					<span class="hb_price">100元</span><br/>
				</view>
			</view>
		</view>
		<view class="hbdetali_tc" v-if="show">
			<img src="../../static/images/coupon_bigpic.png" @click="webSelf.$Router.reLaunch({route:{path:'/pages/signup/signup'}})"/>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				webself: this,
				mainData:[],
				show:false
			}
		},
	
	
	onLoad(options){
		const self = this;
		self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
		self.$Utils.loadAll(['getMainData'], self)
	},
	
	onReachBottom() {	
		const self = this;
		if (!self.isLoadAll&&uni.getStorageSync('canClick')) {
			self.paginate.currentPage++;
			self.getMainData()
		};
	},
	
	methods: {
		
		showDetail(){
			const self = this;
			self.show = !self.show;
		},
	
		getMainData(isNew) {
			const self = this;
			if(isNew){
				self.$Utils.clearPageIndex(self)
			};
			const postData = {};		
			postData.paginate = self.$Utils.cloneForm(self.paginate);
			postData.tokenFuncName = 'getProjectToken';
			postData.searchItem = {
				use_step:1
			};
			const callback = (res) => {
				if (res.info.data.length > 0) {
					self.mainData.push.apply(self.mainData,res.info.data)
				}else{
					self.isLoadALL = true
				}
				self.$Utils.finishFunc('getMainData');
			};
			self.$apis.userCouponGet(postData, callback);
		},
	
	}
}
</script>
<style>
	@import "../../assets/style/myhb.css";
</style>
