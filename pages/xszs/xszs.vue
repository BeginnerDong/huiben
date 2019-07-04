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
								{{mainData&&mainData.info?mainData.info.level:''}}
							</view>
							<view class="zx">
								主修
							</view>
							<view class="dyznyd">
								多元智能阅读
							</view>
							<view class="zx">
								入学时间
							</view>
							<view class="dyznyd bytime">
								{{mainData&&mainData.info?mainData.info.start_time:''}}
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
				webself: this,
				mainData: {},

			}
		},


		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self)
		},

		methods: {
			


			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no:uni.getStorageSync('user_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.mainData.info.start_time = self.$Utils.timeto(self.mainData.info.start_time*1000,'ymd')
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.userGet(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/biyezhengshu.css";
</style>
