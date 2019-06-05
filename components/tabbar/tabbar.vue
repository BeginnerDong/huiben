<template>
	<view class="navbar" >
    <view class="navbar_item flex">
      <view style="width:100%;text-align: center;">
        <view class="nav_img">
          <image src="/static/images/navbar1-a.png"></image>
        </view>
        <view class="text this-text">首页</view>
      </view>
    </view>
    <view class="navbar_item flex" @click="this.$Router.navigateTo({route:{path:'/pages/entrance/case/case'},query: {id: 1}})">
      <view style="width:100%;text-align: center;">
        <view class="nav_img">
           <image src="/static/images/navbar2.png"></image>
        </view>
        <view class="text">行业案例</view>
      </view>
    </view>
    <view class="navbar_item flex"    data-path="/pages/entrance/information/information">
      <view style="width:100%;text-align: center;">
        <view class="nav_img">
           <image src="/static/images/navbar3.png"></image>
        </view>
        <view class="text">资讯中心</view>
      </view>
    </view>
    <view class="navbar_item flex" @click="this.$Router.redirectTo({route:{path:'/pages/entrance/user/user'}})">
      <view style="width:100%;text-align: center;">
        <view class="nav_img">
            <image src="/static/images/navbar4.png"></image>
        </view>
        <view class="text">个人中心</view>
      </view>
    </view>
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
			};
		},
		methods: {
			change(s) {
				this.currIndex = s.detail.current;
			}
		}
	}
</script>

<style >
	@import "../../assets/style/common.css";
</style>
