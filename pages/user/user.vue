<template>
	<view class="byzs_kk">
		<view class="byzs_p">
			<view class="byzs_pk clear">
				<view class="byzs_left">
					<view class="byzs_left_k">
						<view class="byzs_b">
							<view class="xsz">
								学习证
							</view>
							<img class="xsz_p" :src="mainData.headImgUrl"/>
							<view class="ndbb">
								{{mainData.nickname}}
							</view>
							<view class="fx">
								<span class="fxcion"></span>分享学习证
							</view>
						</view>
					</view>
				</view>
				<view class="byzs_right">
					<view class="byzs_right_k">
						<view class="byzs_b">
							<view class="byxh">
								学号
							</view>
							<view class="xhnumber">
								{{mainData.info?mainData.info.level:''}}
							</view>
							<view class="zx">
								主修
							</view>
							<view class="dyznyd">
								多元智能阅读
							</view>
							<view v-if="mainData.hasOrder&&mainData.hasOrder.length>0">
								<view class="zx">
									入学时间
								</view>
								<view class="dyznyd bytime">
									{{mainData.info.start_time}}
								</view>
							</view>
							<view class="ljrx" v-if="mainData.hasOrder&&mainData.hasOrder.length==0" 
							@click="webSelf.$Router.navigateTo({route:{path:'/pages/signup/signup'}})">
								立即入学
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="xsz_middle clear">
				<view class="xsz_left" @click="webself.$Router.navigateTo({route:{path:'/pages/cmdjl/cmdjl'}})">
					<view class="xsznum">0</view>
					<view class="xsz_jj">
						聪明豆
					</view>
				</view>
				<view class="xsz_right" @click="webself.$Router.navigateTo({route:{path:'/pages/xxsc/xxsc'}})">
					<view class="xsznum" style="font-size: 20px;">99元+3本书</view>
					<view class="xsz_jj">
						现金奖学金
					</view>
				</view>
			</view>
			<view class="xsz_foot">
				<view class="hb_h" @click="webself.$Router.navigateTo({route:{path:'/pages/myhb/myhb'}})">
					<span class="hbcion"></span><span class="myhb">我的红包</span>
					<view class="hbright">{{couponData.length}}个红包未使用</view>
				</view>
				<view class="hb_h1" @click="webself.$Router.navigateTo({route:{path:'/pages/xxsc/xxsc'}})">
					<span class="xxcion"></span><span class="myhb">学习手册</span>
					<view class="xxright">> </view>
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
				mainData:{},
				couponData:[]
			}
		},
	
	
	onLoad(options){
		const self = this;
		self.$Utils.loadAll(['getMainData','getCouponData'], self)
	},
	
	methods: {
	
		getCouponData() {
			const self = this;
			const postData = {};
			postData.tokenFuncName = 'getProjectToken';
			postData.searchItem = {
				use_step:1
			};
			const callback = (res) => {
				if (res.info.data.length > 0) {
					self.couponData.push.apply(self.couponData,res.info.data)
				};
				self.$Utils.finishFunc('getCouponData');
			};
			self.$apis.userCouponGet(postData, callback);
		},
	
		getMainData() {
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
					self.mainData = res.info.data[0];
					self.mainData.info.start_time = self.$Utils.timeto(self.mainData.info.start_time*1000,'ymd')
				};
				console.log(self.mainData.info.start_time)
				self.$Utils.finishFunc('getMainData');
			};
			self.$apis.userGet(postData, callback);
		}
	}
}
</script>

<style>
	@import "../../assets/style/biyezhengshu.css";
	page {
		background: #f4f5f7;
	}
</style>