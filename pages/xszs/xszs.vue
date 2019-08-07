<template>
	<view class="byzs_kk">
		<view class="byzs_p">
			<view class="byzs_pk clear" style="position: relative;">
				<img src="../../static/images/certificate.png" style="width: 100%;height:100%;"/>
				<view class="byzs_left" style="position: absolute;top: 0;left: 0;">
					<view class="byzs_left_k">
						<view class="byzs_b">
							
							<img class="xsz_p" :src="mainData.headImgUrl"/>
							<view class="ndbb">
								{{mainData.nickname}}
							</view>
							<view class="fx" @click="webself.$Router.navigateTo({route:{path:'/pages/shareNoEnd/shareNoEnd'}})" v-if="mainData.info&&mainData.info.switch>0&&mainData.info&&mainData.info.finish==0" >
								<span class="fxcion" style="margin-right: 5px;"></span>分享学习证
							</view>
							<view class="fx" @click="webself.$Router.navigateTo({route:{path:'/pages/byzs/byzs'}})" v-if="mainData.info&&mainData.info.switch>0&&mainData.info&&mainData.info.finish==1" >
								<span class="fxcion" style="margin-right: 5px;"></span>分享学习证
							</view>
						</view>
					</view>
				</view>
				<view class="byzs_right" style="position: absolute;top: 0;right: 0;">
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
							<view v-if="mainData.info&&mainData.info.switch>0">
								<view class="zx">
									入学时间
								</view>
								<view class="dyznyd bytime">
									{{mainData.info.start_time}}
								</view>
							</view>
							<view class="ljrx" v-if="mainData.info&&mainData.info.switch==0" 
							@click="webself.$Router.navigateTo({route:{path:'/pages/index/index'}})">
								立即入学
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
		
		onShow() {
			const self = this;
			document.title = '学业证书'	
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
