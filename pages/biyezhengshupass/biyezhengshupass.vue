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
								234334
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
								2019-09-09
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="xsz_middle clear">
				<view class="xsz_left" @click="webself.$Router.redirectTo({route:{path:'/pages/cmdjl/cmdjl'}})">
					<view class="xsznum">0</view>
					<view class="xsz_jj">
						聪明豆
					</view>
				</view>
				<view class="xsz_right">
					<view class="xsznum">99元+3本书</view>
					<view class="xsz_jj">
						现金奖学金
					</view>
				</view>
			</view>
			<view class="xsz_foot">
				<view class="hb_h" @click="webself.$Router.redirectTo({route:{path:'/pages/myhb/myhb'}})">
					<span class="hbcion"></span><span class="myhb">我的红包</span>
					<view class="hbright">x个红包未使用</view>
				</view>
				<view class="hb_h1" @click="webself.$Router.redirectTo({route:{path:'/pages/xxsc/xxsc'}})">
					<span class="xxcion"></span><span class="myhb">学习手册</span>
					<view class="xxright">></view>
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
	@import "../../assets/style/biyezhengshu.css";
</style>