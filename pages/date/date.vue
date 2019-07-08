<template>
	<view class="da-h">
		<view class="da-he">
			<view class="da-le">
				<h5>连续阅读</h5>
				<span><label>{{userData&&userData.info?userData.info.days:''}}</label>天</span>
			</view>
				<span class='line'></span>
			<view class="da-ri">
				<h5>累计聪明豆</h5>
				<span><label>{{userData&&userData.info?userData.info.score:''}}</label>个</span>
			</view>
		</view>
		<view class="da-da">
				<view class="da-da-he">
					<span class='xiao' @click="goLastMonth"><</span>
					<span class='data'>{{curYear}}年{{curMonth+1}}月</span>
					<span class='da' @click="goNextMonth">></span>
				</view>
				<view class="da-mou">
					<ul class="mou">
						<li v-for="item in moudy">{{item}}</li>
					</ul>
					<ul class="data-da" style=" padding-inline-start: 29px">
						<li   v-for="item in dateData" class="origin"  :class="item.hasItem?'add':(item.isGray?'noadd':'')">{{item.sDay}}</li>
					</ul>
				</view>
				<!-- <view class="ka">
					<label class="radio" checked="checked"><radio>已打卡</radio></label>
					<label class="radio" checked="checked"><radio>未打卡</radio></label>
				</view> -->
		</view>
		<view class="wen">
			<view class="">
				<view class="data_title">打卡须知</view>
				<view class="data_cont" style="line-height: 25px;">
					1. 每天读书打卡，即可获得1个聪明豆；聪明豆累计60个，可获得99元奖学金和3本书。<br />
					2. 如何打卡：每本书阅读完后会出现一个“打卡得聪明豆”按钮，点击后即有打卡成功的提示。<br />
					3.
					打卡不能中断，如某天打卡中断，之前的聪明豆将归0，重新从第一天开始计算。自参加计划起的60天之内重新开始打卡，满60个聪明豆依然可以返还费用且获得书（这时候可能超出了60天，但只要在60天之前开始重新打卡的都算）60天后计划结束，累计聪明豆也不能返还。聪明豆不能兑换现金。但所有书本和内容永久可使用。<br />
					4. 当天重复打卡不会累计聪明豆。<br />
					5. 若不打卡也不影响正常学习，打卡是为了鼓励家长坚持。"
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData:{},
				dateData:[],
				moudy:["一","二","三","四","五","六","日"],
				data:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
				curYear:'',
				curMonth:'',
				curYear:''
			}
		},
		
		onLoad(options){
			const self = this;
			self.$Utils.loadAll(['getUserData'], self)
		},
		
		methods: {
			
			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					user_no:uni.getStorageSync('user_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData = res.info.data[0];
						self.userData.info.score = parseInt(self.userData.info.score);
	
					};
					self.calenderInit();
					self.$Utils.finishFunc('getUserData');
				};
				self.$apis.userGet(postData, callback);
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					day_time:['between',self.monthArray],
					user_no:uni.getStorageSync('user_no')
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						if (res.info.data.length > 0) {
							for (var o = 0; o < res.info.data.length; o++) {
								for (var p = 0; p < self.dateData.length; p++) {
									
									if(self.dateData[p].timeStamp>self.userData.info.challenge_time&&self.dateData[p].timeStamp+86400<(new Date()).getTime()/1000){
										self.dateData[p].isGray = true;
									};
									
									if (self.dateData[p].sDay == new Date(res.info.data[o].day_time*1000).getDate()) {
										console.log('111',new Date(res.info.data[o].day_time))
										var newValue = {
											hasItem: 1,
											log: res.info.data[o],
											sDay: self.dateData[p].sDay
										};
										if(self.dateData[p].isGray){
											newValue.isGray = true;
										};
										self.dateData.splice(p, 1, newValue)
									};
								};
							};
						};
					};
					self.$Utils.finishFunc('getMainData');
					console.log('getMainData',self.dateData)
				};
				self.$apis.logGet(postData, callback);
			},
			
			
			calenderInit() {
				const self = this;
				var curDate = new Date();
				self.curMonth = curDate.getMonth();
				self.curYear = curDate.getFullYear();
				self.curDay = curDate.getDate();
				self.refreshPageData(self.curYear, self.curMonth, self.curDay);		
				self.getMainData()
			},
			
			//刷新全部数据
			refreshPageData(year, month, day) {
				const self = this;
				console.log(111)
				self.signData = [];
				self.dateData = [];
				self.getOffset(self.curYear, self.curMonth);
				self.monthArray = [new Date(self.curYear, self.curMonth, 1).getTime()/1000, new Date(self.curYear, self.curMonth + 1, 1)
					.getTime()/1000
				];
			
				var offset = self.getOffset(self.curYear, self.curMonth);
				for (var i = 0; i < offset; ++i) {
					self.dateData.push({
						isEmpty: true
					});
				};
				var dayCount = self.getDayCount(self.curYear, self.curMonth);
				for (var i = 0; i < dayCount; ++i) {
					if (self.todayDay == i + 1) {
						self.dateData.push({
							sDay: i + 1,
							isToday: true,
							timeStamp:new Date(self.curYear, self.curMonth, i + 1).getTime()/1000
						});
					} else {
						self.dateData.push({
							sDay: i + 1,
							timeStamp:new Date(self.curYear, self.curMonth, i + 1).getTime()/1000
						});
					};
				};
				console.log('self.dateData', self.dateData)
				self.$Utils.finishFunc('calenderInit');
			},
			
			//获取此月第一天相对视图显示的偏移
			getOffset(curYear, curMonth) {
				const self = this;
				var offset = new Date(curYear, curMonth, 1).getDay();
				offset = offset == 0 ? 6 : offset - 1;
				//注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
				console.log('offset', offset)
				return offset;
			},
			isLeapYear(year) {
				if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
					return 1
				else
					return 0
			},
			
			getDayCount(year, month) {
				var DAY_OF_MONTH = [
					[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
					[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
				];
				return DAY_OF_MONTH[this.isLeapYear(year)][month];
			},
			
			goLastMonth(e) {
				const self = this;
				if (0 == self.curMonth) {
					self.curMonth = 11;
					self.curYear--;
				} else {
					self.curMonth--;
				};
				self.refreshPageData(self.curYear, self.curMonth, 1);
				self.getMainData()
			
			},
			
			goNextMonth(e) {
				const self = this;
				if (self.curMonth == 11) {
					self.curMonth = 0;
					self.curYear++
				} else {
					self.curMonth++;
				}
				self.refreshPageData(self.curYear, self.curMonth, 1);
				self.getMainData()
				
			},
			
		}
	}
</script>

<style>
	@import "../../assets/style/date.css";
	page {
		background: #f4f5f7;
	}
	ul{
		padding-inline-start: 40px;
	}
	.noadd{
		    width: 30px;
			height: 30px;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			text-align: center;
			line-height: 30px;
			background: gray;
			display: inline-block;
			color: #fff;
	}
</style>
