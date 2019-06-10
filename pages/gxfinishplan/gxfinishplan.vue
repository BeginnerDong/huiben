<template>
	<view class="danhongse_bg">
		<view class="wc_p">
			<view class="wc_jh">
				恭喜完成<br/>
				30天幼儿能力提升计划已完成
			</view>
			<view class="wc_card">
				<view class="wc_card_photo">
					<img src="../../static/testimg/test12.jpg"/>
				</view>
				<view class="wc_card_ts">
					完成了60天幼儿能力提升计划<br/>
获得了99元奖学金和3本图书
				</view>
			</view>
			<view class="wc_card_2 clear">
				<view class="wc_card_left">
					<view class="wc_1">
						和宝贝一共读了
					</view>
					<view class="wc_2">
						50本绘本
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
				<button @click="webself.$Router.redirectTo({route:{path:'/pages/fenxiang/fenxiang'}})">立即分享</button>
			</view>
			<view class="wc_gxtk">
				
			</view>
			<view class="wc_gxtk_n">
				<view class="gxwc">
					恭喜完成<br/>
					60天幼儿能力提升计划！
				</view>
				<view class="gxwc_kk">
					<view class="clear gxwctxt">
						<view class="gxwc_left">
							微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信
						</view>
						<view class="gxwc_right">
							<input type="text" placeholder="请输入微信号"/>
						</view>
					</view>
					<view class="clear gxwctxt">
						<view class="gxwc_left">
							手机号码
						</view>
						<view class="gxwc_right">
							<input type="text" placeholder="请输入手机号码"/>
						</view>
					</view>
					<view class="clear gxwctxt">
						<view class="gxwc_left">
							详细地址
						</view>
						<view class="gxwc_right gxwc_r1">
							<textarea type="text" class="textarea" placeholder="请输入详细地址"/>
							</textarea>
						</view>
					</view>
				</view>
				<view class="gxqtx">
					请认真填写联系方式及详细地址，以便寄送书籍给您
				</view>
				<button class="gxbtn">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webself: this,
			}
		}
	}
</script>

<style>
	@import "../../assets/style/gxfinishplan.css";
</style>