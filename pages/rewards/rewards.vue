<template>
	<view class="re_bg">
		<view class="re_kk">
			<view class="head_re">
				<view class="re_photo" style="width:78px;height:78px">
					<img :src="userData.headImgUrl" style="width:100%"/>
				</view>
				<view class="re_read">
					我和宝贝一起完成亲子阅读
				</view>
				<view class="re_bookimg" style="height:150px;display: flex;align-items: center;justify-content: center;">
					<view style="width:35%;display: flex;align-items: center;justify-content: center;">
						<img :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''" />
					</view>
				</view>
				<view class="re_bookname">{{mainData.title}}</view>
				<view class="re_yd">
					<view class="re_title">培养了宝贝的：</view>
					<view class="re_tablist">
						<span>情绪管理</span>
						<span>色彩与表达</span>
						<span>想象力</span>
					</view>
				</view>
				<view class="re_jg">
					<view class="clear">
						<img class="re_jgimg" src="../../static/images/good_green.png" />
						<view class="re_jg_con">超过了{{percent}}%的孩子</view>
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;margin-bottom: 20px;">
			<button class="ljdakabtn" @click="clockIn">立即打卡</button>
			<view class="re_num">今日已有{{randomNum}}位家长完成打卡</view>
		</view>
		<view class="dakaxvzhi">
			<view class="">
				<view class="xvzgi_title">打卡须知</view>
				<view class="xvzhi_cont" style="line-height: 25px;">
					1. 每天读书打卡，即可获得1个聪明豆；聪明豆累计60个，可获得99元奖学金和3本书。<br />
					2. 如何打卡：每本书阅读完后会出现一个“打卡得聪明豆”按钮，点击后即有打卡成功的提示。<br />
					3.
					打卡不能中断，如某天打卡中断，之前的聪明豆将归0，重新从第一天开始计算。自参加计划起的60天之内重新开始打卡，满60个聪明豆依然可以返还费用且获得书（这时候可能超出了60天，但只要在60天之前开始重新打卡的都算）60天后计划结束，累计聪明豆也不能返还。聪明豆不能兑换现金。但所有书本和内容永久可使用。<br />
					4. 当天重复打卡不会累计聪明豆。<br />
					5. 若不打卡也不影响正常学习，打卡是为了鼓励家长坚持。"
				</view>
			</view>
		</view>
		<view class="daka_s_kk" v-if="show">
			<view class="daka_s">
				<img class="finishicon" src="../../static/images/finish.png" />
				<view class="daka_text">
					恭喜你打卡成功！
				</view>
				<view class="dakajl">
					获得 1 聪明豆
				</view>
				<view class="dakajc">
					坚持亲子阅读，让孩子赢在起跑线
				</view>
				<button class="dakaljfx"  @click="webself.$Router.redirectTo({route:{path:'/pages/fenxiang/fenxiang?id='+self.id}})">立即分享</button>
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
				userData:{},
				show:false,
				time:'',
				percent:'',
				randomNum:''
			}
		},
		
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.randomNum = parseInt(Math.floor(Math.random()*(89999))+10001);
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		methods: {
			
			getUserData() {
				const self = this;
				var time = new Date(new Date().toLocaleDateString()).getTime()/1000
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no:uni.getStorageSync('user_no')
				};
				postData.getAfter = {
					hasLog: {
						tableName: 'Log',
						middleKey: 'user_no',
						key: 'user_no',
						condition: '=',
						searchItem: {
							status: 1,
							create_time:['between',[time-(86400+14400),time-14400]]
						}
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
						if(self.time>self.userData.end_time){
							self.isEnd = true
						}
					};
					self.getMainData()
				};
				self.$apis.userGet(postData, callback);
			},
			
			clockIn(){
				const self = this;
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.data ={
					art_id:self.id
				};
				console.log('postData', postData)
				const callback = (res) => {
					/* if(res.info.type==1){
						self.show = true
					}else if(res.info.type==2){
						self.$Router.redirectTo({route:{path:'/pages/date/date'}})
					}else if(res.info.type==3){
						self.$Router.redirectTo({route:{path:'/pages/xxbg/xxbg'}})
					}else if(res.info.type==4){
						self.$Router.redirectTo({route:{path:'/pages/gxfinishplan/gxfinishplan'}})
					}else if(res.info.type==5){
						self.$Router.redirectTo({route:{path:'/pages/finishplan/finishplan'}})
					}	 */
					self.$Router.redirectTo({route:{path:'/pages/gxfinishplan/gxfinishplan'}})
				};
				self.$apis.clockIn(postData, callback);
			},
			
			getRead(){
				const self = this;
				const postData = {};
				postData.tokenFuncName ='getProjectToken';
				postData.data ={
					art_id:self.id
				};
				console.log('postData', postData)
				const callback = (res) => {
					if(res.solely_code==100000){
						self.percent = ((res.info.student_num-1-res.info.read_num)/10)*100;
						if(self.percent<50){
							self.percent = 50
						}
					};
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.getRead(postData, callback);
			},
		
			getMainData(){
				const self = this;
				const postData = {};
				postData.searchItem = {
					type:1,
					on_shelf:1,
					id:self.id
				};
				postData.order = {
					update_time:'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					} 
					self.getRead()
				};
				self.$apis.articleGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/rewards.css";
</style>
