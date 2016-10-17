window.onload = function () {
	var audio = document.getElementById('audio'); // 音乐
	var sourceList = audio.getElementsByTagName('source'); // 音乐列表
	var play = document.getElementById('play'); // 播放按钮
	var prev = document.getElementById('prev'); // 上一曲
	var next = document.getElementById('next'); // 下一曲
	var jingyin = document.getElementById('jingyin'); // 静音
	var voiceBar = document.getElementById('voice-bar'); // 音量调节
	var musicBar = document.getElementById('music-bar'); // 播放进度控制
	var playedBar = document.getElementById('played-bar'); // 已播放进度条
	var voicedBar = document.getElementById('voiced-bar'); // 已播放进度条
	var musicTitle = document.getElementById('title'); // 音乐标题
	var currentSrcIndex = 0;


	// 是否循环播放 
	audio.loop = true;

	// 自动播放
	audio.autoplay = true;

	// 设置音量
	audio.volume = 0.5;
	var voicedBarWidth = (audio.volume / 1) * voiceBar.clientWidth;
	voicedBar.style.width = voicedBarWidth + 'px';

	// 缓冲加载
	audio.autobuffer = false;

	// 播放 暂停
	play.onclick = function () {
		if (audio.paused) {
			audio.play();
			this.innerHTML = 'Pause';
		} else {
			audio.pause();
			this.innerHTML = 'Play';
		}

		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
		
		var fen = parseInt(audio.duration / 60);
		var miao = parseInt(audio.duration % 60);
		console.log(fen + ':' + miao); // 播放文件总时长 以3:46的形式显示
		console.log(audio.currentSrc);
	};

	// 下一曲
	next.onclick = function () {
		++ currentSrcIndex > sourceList.length - 1 && (currentSrcIndex = 0);
		currentSrc = sourceList[currentSrcIndex].getAttribute('src');
		audio.setAttribute('src', currentSrc);
		audio.play();
		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
	};

	// 上一曲
	prev.onclick = function () {
		-- currentSrcIndex < 0 && (currentSrcIndex = sourceList.length -1);
		currentSrc = sourceList[currentSrcIndex].getAttribute('src');
		audio.setAttribute('src', currentSrc);
		audio.play();
		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
	};

	// 音量调节（增加黄色现在音量显示）
	voiceBar.onclick = function (event) {
		var voiceBarWidth = voiceBar.clientWidth;
		var newVolume = (event.offsetX / voiceBarWidth);
		audio.volume = newVolume;

		// 音量大小更新
		var voicedBarWidth = (audio.volume / 1) * voiceBarWidth;
		voicedBar.style.width = voicedBarWidth + 'px';
		
	};

	// 播放进度控制
	musicBar.onclick = function (event) {
		var musicBarWidth = musicBar.clientWidth;
		var newCurrentTime = (event.offsetX / musicBarWidth) * audio.duration;
		audio.currentTime = newCurrentTime;
		var playedBarWidth = (audio.currentTime / audio.duration) * musicBarWidth;
		playedBar.style.width = playedBarWidth + 'px';
	};

	// 播放进度实时更新(修改为歌曲播放时开启定时器，暂停和页面load时清除定时器)

	setInterval(function updatePlayedBar (){
		console.log('执行了');
		var musicBarWidth = musicBar.clientWidth;
		var playedBarWidth = (audio.currentTime / audio.duration) * musicBarWidth;
		playedBar.style.width = playedBarWidth + 'px';
	}, 1000);



	// pause.onclick = function () {
	// 	audio.pause();
	// 	console.log(parseInt(audio.currentTime)); // 返回从开始播放到现在所用的时间
	// 	console.log(audio.paused);
	// }

	// 静音
	jingyin.onclick = function () {
		console.log('点击了静音');
		if (!audio.muted) {
			audio.muted = true;
		}else {
			audio.muted = false;
		}
	}
};













