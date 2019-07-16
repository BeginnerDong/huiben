<template>
	<view class="myhb_bg">
		<view class="myhb">
			<view class="hblist clear" v-for="item in mainData" @click="showDetail" v-if="item.use_step==1">
				<span class="hbimg">
				</span>
				<view class="hb_qk" style="margin-top: 0">
					<span class="hb_price">{{item.discount}}元</span><br/>
					<span class="hb_price" style="font-size:15px" v-if="item.use_step==2">已使用</span>
				</view>
			</view>
			<view class="hblist clear" v-for="item in mainData" v-if="item.use_step==2">
				<span class="hbimg">
				</span>
				<view class="hb_qk" style="margin-top: 0">
					<span class="hb_price">{{item.discount}}元</span><br/>
					<span class="hb_price" style="font-size:15px" v-if="item.use_step==2">已使用</span>
				</view>
			</view>
		</view>
		<view class="hbdetali_tc" v-if="show">
			<img src="../../static/images/coupon_bigpic.png" @click="webself.$Router.reLaunch({route:{path:'/pages/index/index'}})"/>
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
	
	onShow() {
		const self = this;
		document.title = '我的红包'	
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
			console.log(111)
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
		/* 	postData.searchItem = {
				use_step:1
			}; */
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
