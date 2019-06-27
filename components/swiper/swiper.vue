<template>
	<view>
		<swiper class="swiper-box"  :indicator-dots="false" :autoplay="false" :interval="3000" :duration="500" :circular="true"
		 @change="change" previous-margin="15px" next-margin="15px">
			<swiper-item  v-for="(item,index) in list" :key="index" @click="item.src?webSelf.$Router.redirectTo({route:{path:item.src}}):''">
				<view class="swiper-item" >
				
						<view class="book_intro_middle" :class="{'active':index===currIndex}">
							<view class="book_intro_img">
								<view style="width:35%">
									<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" style="width:100%">
								</view>
							</view>
							<view class="book_name">{{item.title}}</view>
							<view class="book_copy">{{item.description}}</view>
							<view class="book_type"><span>情绪管理</span></view>
							<view class="book_intro">
								{{item.small_title}}
							</view>
							<view class="open_book">
								<button @click="webself.$Router.redirectTo({route:{path:'/pages/bookdetail/bookdetail'}})">开始阅读</button>
							</view>
						</view>
					
				</view>
			</swiper-item>
		</swiper>
		<!-- dots -->
<!-- 		<view class="dtos">
			<view class="dto" :class="{'dto-active':index===currIndex}" v-for="(item,index) in list" :key="index"></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				currIndex: 0,
				webself: this
			};
		},
		methods: {
			change(s) {
				this.currIndex = s.detail.current;
			}
		}
	}
</script>

<style>
	@import "../../assets/style/bookintro.css";
	.swiper-box {
		width: 100%;
		height: 930upx;
	}



	.swiper-item {
		width: 87%;
		height: 930upx;
	}
	.active{
		
	}

	.dtos {
		display: flex;
		justify-content: center;
		margin-top: 22upx;




	}

	.dto {
		width: 14upx;
		height: 14upx;
		border-radius: 500upx;
		background: #e5e5e5;
		margin: 0 7upx;
		transition: width 0.5s;
	}

	.dto-active {
		background: #c2c2c2;
		width: 26upx;
	}
</style>
