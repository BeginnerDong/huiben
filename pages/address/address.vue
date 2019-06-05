<template>
	<view>

		<div class="bg1" v-for="(item,index) in mainData"  :style="choosedIndex==index?'border-bottom:1px solid #F98A48':''">
			<div style="height: 41px; border-bottom: solid 1px #EAEAEA;line-height: 41pxx; " @click="choose(index)">
				<div class="color5 ilblock">{{item.name}}</div>
				<div class="ilblock color2 font13">{{item.city+item.detail}}</div>
			</div>
			<div style="height: 42px;line-height: 42px; ">
				<!-- <img src="../../static/images/icon-3.png" style="width: 15px; margin-left: 18px;" /> -->
				<div class="color1 font11 ilblock" :style="item.isdefault==1?'color:#FF895A':''" style="margin-left:20px;" 
				:data-id="item.id" @click="updateAddress($event.currentTarget.dataset.id)">{{item.isdefault==1?'默认地址':'选为默认地址'}}</div>
				<div :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/address-save/address-save?id='+$event.currentTarget.dataset.id}})" class="p_bjblock0 ilblock color1 font11"><img src="../../static/images/icon-1.png" style="width: 14px;" />
					编辑</div>
				<div class="ilblock color1 font11 p_bjblock1" :data-id="item.id" @click="deleteAddress($event.currentTarget.dataset.id)" style=""><img src="../../static/images/icon-2.png" style="width: 14px;" />
					删除</div>
			</div>
		</div>
		<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/address-save/address-save'}})">
			<button class="radiu20 color5 font15 ">新增地址</button>
		</div>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData:[],
				webSelf: this,
				choosedIndex:-1
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)

		},
		methods: {
			choose(index){
				const self = this;
				self.choosedIndex = index;
				uni.setStorageSync('choosedAddressData',self.mainData[index]);
				console.log('choosedIndex',self.choosedIndex);
				uni.navigateBack({
					delta: 1
				});
			},
			
			getMainData() {
				const self = this;

				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					} else {
						self.$Utils.showToast('没有更多了','none');
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.addressGet(postData, callback);
			},





			deleteAddress(id) {
				const self = this;
				const postData = {};
				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res) {
						self.mainData = [];
						self.getMainData();
					}
				};
				self.$apis.addressDelete(postData, callback)
			},


			updateAddress(id) {
				const self = this;
				const postData = {};

				postData.tokenFuncName = 'getProjectToken';

				postData.searchItem = {};
				postData.searchItem.id = id;
				postData.data = {
					isdefault: 1
				}
				const callback = (res) => {
					if (res) {
						self.mainData = [];
						self.getMainData();
					}
				};
				self.$apis.addressUpdate(postData, callback);
			},




		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/address.css";

	button {
		width: 92%;
		height: 40px;
		background: #F98A48;
		margin: 200px auto;
	}
	.bg1 {
		width: 92%;
		height: 83px;
		border-radius: 5px;
		margin: 10px auto;
	}
	.bg1 .color5 {
		background: #F98A48;
		padding: 4px 12px;
		border-radius: 20px;
		margin: 5px 5px 5px 15px;
	}
	.p_bjblock0{
			margin-left: 150px;
	}
	.p_bjblock1{
		margin-left: 25px;
	}
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
	@media screen and (max-width: 360px){
		.p_bjblock1{
			margin-left: 12px !important;
		}
	}
	@media screen and (max-width: 320px){
		.p_bjblock0{
			margin-left: 65px !important;
		}
		.p_bjblock1{
			margin-left: 12px !important;
		}
	}
</style>
