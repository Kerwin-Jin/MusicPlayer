/*
分析：
1.获取图片的index
2.更换背景图片
3.更换播放器图片，文本
4.更换播放按钮及title为暂停
5.图片旋转
6.播放歌曲

其他：
1.暂停、播放
2.上一首、下一首
3.播放器可以显示和隐藏

*/

var flag = false;
var p_index = 0;
$(function(){
	$("#audio").prop("src","./music/1.mp3");
	
	$("#banner ul li").on("click",function(){
		var index = $(this).index();
		changeBg(index+1);
		playMusic(flag,$(this).index()+1);
		changeImgandText(index+1);
		
		p_index = index;
	})
	
	$(".m_btn a").eq(1).on("click",function(){
		
		changeBg(p_index+1);
		if(flag){
			play();
			$("#audio").get(0).pause();
			$("#banner ul li").children().removeClass("img_rotate");
		}else{
			pause();
			$("#audio").get(0).play();
			console.log(p_index);
			$("#banner ul li img").eq(p_index).addClass("img_rotate");
			$("#banner ul li").eq(p_index).siblings().children().removeClass("img_rotate");
		}
		flag = !flag;
	})
	
})


//上一首
$(".m_pre").on("click",function(){
	p_index--;
	playMusic(flag,$(this).index()+1);
})



// 播放音乐
function playMusic(isPlay,index){
	if(!isPlay){
		$("#audio").prop("src","./music/"+index+".mp3");
		$("#audio").get(0).play();
		$("#banner ul li").eq(index-1).children().addClass("img_rotate");
		$("#banner ul li").eq(index-1).siblings().children().removeClass("img_rotate");
		pause();
	}else{
		$("#audio").get(0).pause();
		$("#banner ul li").eq(index-1).children().removeClass("img_rotate");
		play();
	}
	flag = !flag;
}

//更换背景图片
function changeBg(index){
	$("body").css({
		"background":"url('./img/"+index+".jpg') no-repeat",
		"background-size": "cover",
		"background-position": "center"
	})
}

//更换album图片及标题
function changeImgandText(index){
	var titles = ['Beautiful Now','Victory','后来','有何不可','最美的太阳'];
	$("#music .m_img img").attr("src","./img/"+index+".jpg");
	$("#music .m_text").text($("#banner ul li img").eq(index-1).attr("title"));
}

//控制播放与暂停按钮
function pause(){
	//添加暂停样式
	$(".m_btn a").eq(1).removeClass("m_play").addClass("m_pause");
	$(".m_btn a").eq(1).attr("title","暂停");
}

function play(){
	$(".m_btn a").eq(1).removeClass("m_pause").addClass("m_play");
	$(".m_btn a").eq(1).attr("title","播放");
}
