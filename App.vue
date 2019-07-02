<script>
	import token from "./common/token.js"
	export default {
		onLaunch: function() {	
			
			if(location.search){
				var searchArr = location.search.substr(1).split('&');
			};
			if(location.hash&&location.hash .split('?')[1]){
				var hashArr = location.hash .split('?')[1].split('&');
				var hash = location.hash .split('?')[0]
			};
			var arr = [];
			if(searchArr){
				arr = arr.concat(searchArr)
			};
			if(hashArr){
				arr = arr.concat(hashArr)
			};
			var params = {};
			for (var i = 0; i < arr.length; i++) {
				var data = arr[i].split('=')
				if (data.length === 2) {
				  params[data[0]] = data[1]
				};
			};
			if(params.parent_no){
				uni.setStorageSync('url_parent_no',params.parent_no)
			};
			token.getProjectToken();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/assets/style/public.css";
	/* @import "/assets/style/quill.css"; */
	/*每个页面公共css */
	@import "/assets/style/quill.css";
	
</style>
