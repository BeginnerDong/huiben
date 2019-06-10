<template>
	<view class="ljbm_kk">
		<view class="ljbm_top clear">
			<view class="ljbm_top_left">
				<img src="../../static/testimg/test13.png" />
			</view>
			<view class="ljbm_top_right">
				<view class="ljbm_tt">
					解锁畅阅60本指引解析，可立即报名：
				</view>
				<view class="ljbmbtn" @click="webself.$Router.redirectTo({route:{path:'/pages/signup/signup'}})">
					<view class="ljbm_zk">红包折扣￥100<span>👉仅需￥99</span></view>
					<button class="ljbm_btn">立即报名</button>
				</view>
				<view class="lj_price">
					原价￥199
				</view>
				<view class="lj_daka">
					坚持打卡返还￥99+3本书
				</view>
			</view>
		</view>
		<view class="ljbm_foot">
			<view class="clear">
				<view class="ljbm_book">
					<view class="ljbm_book_k">
						<view class="ljbm_bookimg">
							<img src="../../static/testimg/test14.jpg" />
						</view>
						<view class="ljbm_bookname">
							<view class="bookname1">
								小蓝和小黄
							</view>
							<view class="booktab">
								情绪管理
							</view>
						</view>
					</view>
				</view>
				<view class="ljbm_book">
					<view class="ljbm_book_k">
						<view class="ljbm_bookimg">
							<img src="../../static/testimg/test14.jpg" />
						</view>
						<view class="ljbm_bookname">
							<view class="bookname1">
								小蓝和小黄
							</view>
							<view class="booktab">
								情绪管理
							</view>
						</view>
					</view>
				</view>
				<view class="ljbm_book">
					<view class="ljbm_book_k">
						<view class="ljbm_bookimg">
							<img src="../../static/testimg/test14.jpg" />
						</view>
						<view class="ljbm_bookname">
							<view class="bookname1">
								小蓝和小黄
							</view>
							<view class="booktab">
								情绪管理
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
	@import "../../assets/style/ljbm.css";
</style>
