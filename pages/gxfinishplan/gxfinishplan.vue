<template>
	<view class="danhongse_bg">
		<view class="wc_p">
			<view class="wc_jh">
				恭喜完成<br />
				60天幼儿能力提升计划
			</view>
			<view class="wc_card">
				<view class="wc_card_photo">
					<img :src="mainData.headImgUrl" />
				</view>
				<view class="wc_card_ts">
					完成了60天幼儿能力提升计划<br />
					获得了99元奖学金和3本图书
				</view>
			</view>
			<view class="wc_card_2 clear">
				<view class="wc_card_left">
					<view class="wc_1">
						和宝贝一共读了
					</view>
					<view class="wc_2">
						{{reportData.book_num}}本绘本
					</view>
				</view>
				<view class="wc_card_right">
					<view class="wc_1">
						坚持亲子阅读
					</view>
					<view class="wc_2">
						60天
					</view>
				</view>
			</view>
			<view class="fyfh_bg">
				<view class="fyfh_jc">
					坚持全勤打卡成功
				</view>
				<view class="fyfh_q">
					费用全额返还
				</view>
				<view class="fyfh_time">
					*费用将在7个工作日内返还至您的付款账户
				</view>
			</view>
			<view class="ljfxbtn">
				<button @click="webself.$Router.redirectTo({route:{path:'/pages/completeShare/completeShare'}})">立即分享</button>
			</view>
			<view class="wc_gxtk" v-if="is_show">

			</view>
			<view class="wc_gxtk_n" v-if="is_show">
				<view class="gxwc">
					恭喜完成<br />
					60天幼儿能力提升计划！
				</view>
				<view class="gxwc_kk">
					<view class="clear gxwctxt">
						<view class="gxwc_left">
							微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信
						</view>
						<view class="gxwc_right">
							<input type="text" placeholder="请输入微信号" v-model="submitData.wechat" />
						</view>
					</view>
					<view class="clear gxwctxt">
						<view class="gxwc_left">
							手机号码
						</view>
						<view class="gxwc_right">
							<input type="text" placeholder="请输入手机号码" v-model="submitData.phone" />
						</view>
					</view>
					<view class="clear gxwctxt">
						<view class="gxwc_left">
							详细地址
						</view>
						<view class="gxwc_right gxwc_r1">
							<textarea type="text" class="textarea" placeholder="请输入详细地址" v-model="submitData.address" />
							</textarea>
						</view>
					</view>
				</view>
				<view class="gxqtx">
					请认真填写联系方式及详细地址，以便寄送书籍给您
				</view>
				<button class="gxbtn" @click="submit">完成</button>
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
				submitData: {
					wechat: '',
					phone: '',
					address: ''
				},
				is_show:false,
				reportData:{}
			}
		},

		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		onShow() {
			const self = this;
			document.title = '完成亲子阅读计划'	
		},

		methods: {

			submit() {
				const self = this;

				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {

					address: self.submitData.address,
					phone: self.submitData.phone,
					wechat: self.submitData.wechat,
				};

				if (self.$Utils.checkComplete(self.submitData)) {
					const callback = (res) => {
						if (res.solely_code == 100000) {
							self.$Utils.showToast('提交成功', 'none');
							self.is_show = false;
						} else {
							self.$Utils.showToast(res.msg, 'none')

						}
					};

					self.$apis.userInfoUpdate(postData, callback);
				} else {
					self.$Utils.showToast('请补全信息', 'none')
				};
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no: uni.getStorageSync('user_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						if(self.mainData.info.address==''||self.mainData.info.phone==''||self.mainData.info.wechat==''){
							self.is_show = true;
						}
					};
					console.log(self.mainData.info.start_time)
					self.getReport();
				};
				self.$apis.userGet(postData, callback);
			},
			
			getReport() {
				const self = this;
				var end = Date.parse(new Date())/1000;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data ={
					start:self.mainData.info.challenge_time,
					end:end
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						self.reportData = res.info;
						
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.getReport(postData, callback);
			},
		}

	}
</script>

<style>
	@import "../../assets/style/gxfinishplan.css";
</style>
