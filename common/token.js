// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
import config from "@/config/index.config.js";
import $Utils from "./utils.js";

class Token {
    g_params={};
		
    constructor(params) {
        this.g_params = params;
    }
	
    verify() { 
        var token = uni.getStorageSync('token');
        if (!token) {
            this.getUserInfo();
        };
    }
	
	getProjectToken(callback,postData) { 
		
		return uni.getStorageSync('user_token');
	    if((postData&&postData.refreshToken)||!uni.getStorageSync('user_token')){
	        var params = {
	            thirdapp_id:2,
				refreshToken:true
	        };
			if(callback){
				this.getWeixinToken(params,callback);
			}else{
				this.getWeixinToken(params);
			};    
	    }else{
	        return uni.getStorageSync('user_token');
	    }
		
	}
	
	getWeixinToken(params,callback){
		
		var href =  window.location.origin + window.location.pathname;
		//var href = 'http://test.solelycloud.com/gouxuanweb/'
        var param = $Utils.getHashParameters()[0];
        var hash = $Utils.getHashParameters()[1]; 
		
		if(JSON.stringify(param)!='{}'){
			href = href +'?';
			Object.keys(param).forEach(function(key){
				 if(key!='code'){
				 	href = href + key + '=' + param[key] + '&'
				 };
			});
			href = href.substr(0, href.length - 1);  
		};

        if(param.code){
			if(param.sub_appid&&param.sub_appsecret&&!param.sub_code){
				href = href + '?sub_code=' + param.code  + hash; 	
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5a6b34e74e18e46b&redirect_uri='+
				encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
				return;
			};
            var postData = {
                thirdapp_id:2,
                code:param.code,
            };	
			if(param.parent_no){
				postData.parent_no = param.parent_no
			};
			if(param.sub_appid&&param.sub_code){
				postData.sub_appid = param.sub_appid;
				postData.sub_code = param.sub_code;
			};
            var c_callback = (res)=>{
                console.log('c_callback-res',res)    
                if(res.token){
                    uni.setStorageSync('user_token',res.token);
                    uni.setStorageSync('user_no',res.info.user_no);
                    uni.setStorageSync('user_info',res.info);
                    callback&&callback();
                }else{
                    alert('获取token失败')
                };
            };  
			uni.request({
			    url: config.baseUrl+'/Wxauth',
			    method:'POST',
			    data:postData,
			    success:function(res){

			        if(res.data&&res.data.solely_code==100000){  
			            if(c_callback){
			                c_callback && c_callback(res.data);
			            };      
			        }else if(res.data&&res.data.solely_code==300000){
						href =  href + hash;
						if(param.sub_appid&&param.sub_appsecret){
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ param.sub_appid +'&redirect_uri='+
							encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
						}else{
							window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5a6b34e74e18e46b&redirect_uri='+
							encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
						}; 
					}else{
			            uni.showToast({
			                title: '获取token回调失败',
			                icon: 'fail',
			                duration: 1000,
			                mask:true
			            });
						alert(postData.code+'//'+postData.thirdapp_id+'//'+res.data+'//'+res.status)
			        };
			        
			    }
			})
        }else if(uni.getStorageSync('user_token')&&!params.refreshToken){
            callback&&callback();
        }else{
           
			href =  href + hash;
			if(param.sub_appid&&param.sub_appsecret){
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ param.sub_appid +'&redirect_uri='+
				encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
			}else{
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5a6b34e74e18e46b&redirect_uri='+
				encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
			};   
			 
        };
        
    } 
	
	getWxauthToken(param,callback) {
  
        
		uni.request({
		    url: config.baseUrl+'/Wxauth',
		    method:'POST',
		    data:param,
		    success:function(res){
		        console.log(res)
		        if(res.data&&res.data.solely_code==100000){  
		            if(callback){
		                callback && callback(res.data.token);
		            };      
		        }else{
		            uni.showToast({
		                title: '获取token失败',
		                icon: 'fail',
		                duration: 1000,
		                mask:true
		            });
		        };
		        
		        
		    }
		})
        
    }
    


    



 
    getMerchantToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('merchant_token')){
            uni.removeStorageSync('merchant_token');
            uni.removeStorageSync('merchant_info');
            uni.redirectTo({
              url: '/pages/login/login'
            });
        }else{
            return uni.getStorageSync('merchant_token');
        }
    }
   


    getUserInfo(params,callback){
        var self = this;
        var wxUserInfo = {};
        if(uni.canIUse('button.open-type.getUserInfo')){
            uni.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) { 
                        uni.getUserInfo({
                            success: function(res) {                  
                                wxUserInfo = res.userInfo;
                                self.getTokenFromServer(wxUserInfo,params,callback);                              
                            }
                        });
                    }else{
                        self.getTokenFromServer(wxUserInfo,params,callback);                        
                    };
                },
                fail: res=>{
                    uni.showToast({
                        title:'拉取微信失败',
                        icon:'fail',
                        duration:2000,
                        mask:true
                    })
                }
            });
        }else{
            uni.getUserInfo({
                success: function(res) {
                    wxUserInfo = res.userInfo;
                    self.getTokenFromServer(wxUserInfo,params,callback)                  
                }
            });
        };
        console.log(wxUserInfo)
    }


    getTokenFromServer(wxUserInfo,params,callback) {
        var self  = this;
        console.log('params',params);
        console.log('wxUserInfo',params);
        uni.login({
            success: function (res) {
                console.log(res)
                var postData = {};
                postData.thirdapp_id = params.thirdapp_id;  
                
                postData.code = res.code;
                if(wxUserInfo.nickName&&wxUserInfo.avatarUrl){
                    postData.nickname = wxUserInfo.nickName;
                    postData.headImgUrl = wxUserInfo.avatarUrl;
                };
                if(self.g_params&&self.g_params.parent_no){
                    postData.parent_no = self.g_params.parent_no;
                    console.log(self.g_params)
                };
                if(self.g_params&&self.g_params.relation_user){
                    postData.relation_user = self.g_params.relation_user;
                    console.log(self.g_params)
                };
                if(uni.getStorageSync('openidP')){
                    postData.openid = uni.getStorageSync('openidP');
                };
                console.log('postData',postData)
                uni.request({
                    url: config.baseUrl+'/Base/ProgramToken/get',
                    method:'POST',
                    data:postData,
                    success:function(res){
                        console.log(res)
                        if(res.data&&res.data.solely_code==100000){
                            uni.setStorageSync(params.info_name,res.data.info);
                            uni.setStorageSync(params.token_name, res.data.token);
                            
                            if(callback){
                                callback && callback(res.data.token);
                            };      
                        }else{
                            uni.showToast({
                                title: '获取token失败',
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            });
                        };
                        
                        
                    }
                })
                
            }
        })
        
    }


    getToken(callback,params){

        if(uni.getStorageSync('login').login_name&&uni.getStorageSync('login').password){
            var postData = {
                login_name:uni.getStorageSync('login').login_name,
                password:uni.getStorageSync('login').password,
            }
            uni.request({
                url: config.baseUrl+'/Func/Common/loginByUp',
                method:'POST',
                data:postData,
                success:function(res){
                    console.log(res)
                    if(res.data&&res.data.token){
                        uni.setStorageSync('employeeToken', res.data.token);
                        var login = uni.getStorageSync('login');   
                        uni.setStorageSync('login',login);
                        if(params&&callback){  
                            params.data.token = res.data.token;
                             
                            callback && callback(params);
                        }else if(callback){
                            callback && callback(res);
                        };

                        
                    }else{
                        setTimeout(function(){
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            });
                        },500);

                       
                        uni.removeStorageSync('token');
                        uni.removeStorageSync('login');

                    }
                    
                    
                }
            })
        }else{
            uni.redirectTo({
              url: '/pages/Index/index'
            });
        };
        

    }
}


export default new Token()