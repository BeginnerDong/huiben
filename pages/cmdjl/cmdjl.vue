<template>
	<view class="cmd_bg">
		<view class="cmd_p">
			<view class="cmd_top clear">
				<img class="cmdimg" src="../../static/images/search.png" @click="webself.$Router.redirectTo({route:{path:'/pages/testread/testread'}})"/>
					<input class="cmd_txt" type="text" placeholder="小黄和小蓝"/>
			</view>
			<view class="cmd_byzs">
				<view class="cmdbyzs_k">
					<span class="cmdbyzsimg">
					</span>
					
					毕业证书
					<view class="cmdjiantou">></view>
				</view>
			</view>
			<view class="cmd_dq_k">
				<view class="cmdtitle">
					当前聪明豆
					<view class="cmdgz"  @click="webself.$Router.redirectTo({route:{path:'/pages/cmdgz/cmdgz'}})">聪明豆规则</view>
				</view>
				<view class="cmdsum">2</view>
				<view class="cmdtk">
					距离全额退款并领取3本书还有58个聪明豆
				</view>
				<view class="cmdjdt">
					<view class="cmdsct"></view>
					<view class="cmd0">0</view>
					<view class="cmd1"><span class="cmdcion"></span>20</view>
					<view class="cmd2">60</view>
				</view>
			</view>
			<view class="cmdlist_k">
				<view class="cmdlist">
					<view class="cmdlisttitle">
						聪明豆记录
					</view>
					<view class="cmdlistdetail">
						<view class="cmd_bookname">
							《小蓝和小黄》
							<span class="cmd_time">2019/04/25 周一</span>
							<view class="addcmd">
							+1
						</view>
						</view>
					</view>
					<view class="cmdlistdetail">
						<view class="cmd_bookname">
							《小蓝和小黄》
							<span class="cmd_time">2019/04/25 周一</span>
							<view class="addcmd">
							+1
						</view>
						</view>
					</view>
					<view class="cmdlistdetail">
						<view class="cmd_bookname">
							《小蓝和小黄》
							<span class="cmd_time">2019/04/25 周一</span>
							<view class="addcmd">
							+1
						</view>
						</view>
					</view>
					<view class="cmdlistdetail">
						<view class="cmd_bookname">
							《小蓝和小黄》
							<span class="cmd_time">2019/04/25 周一</span>
							<view class="addcmd">
							+1
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
			}
		}
	}
</script>

<style>
	@import "../../assets/style/cmdjl.css";
</style>