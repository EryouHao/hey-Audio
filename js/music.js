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
	var loadBar = document.getElementById('load-bar'); // 加载进度条
	var currentTime = document.getElementById('current-time'); // 当前音乐时间
	var totalTime = document.getElementById('total-time'); // 当前音乐时间
	var musicImg = document.getElementById('music-img');
	var currentSrcIndex = 0;


	// 是否循环播放 
	audio.loop = true;

	// 自动播放
	audio.autoplay = false;

	// 设置音量
	audio.volume = 0.5;
	var voicedBarWidth = (audio.volume / 1) * voiceBar.clientWidth;
	voicedBar.style.width = voicedBarWidth + 'px';

	// 缓冲加载
	audio.autobuffer = false;

	// 显示时长
	(function () {
		var fen = parseInt(audio.duration / 60);
		var miao = parseInt(audio.duration % 60);
		if (miao < 10) {
			miao = '0'+miao;
		}
		totalTime.innerHTML = fen + ':' + miao;
	})();
	

	// 播放 暂停
	play.onclick = function () {
		if (audio.paused) {
			audio.play();
			this.innerHTML = 'Pause';
			musicImg.style.animation = 'xuanzhuan 3s linear infinite';

		} else {
			audio.pause();
			this.innerHTML = 'Play';
			musicImg.removeAttribute('style');
		}

		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
		musicTime();
	};

	// 下一曲
	next.onclick = function () {
		++ currentSrcIndex > sourceList.length - 1 && (currentSrcIndex = 0);
		currentSrc = sourceList[currentSrcIndex].getAttribute('src');
		audio.setAttribute('src', currentSrc);
		audio.play();
		play.innerHTML = 'Pause';
		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
		musicTime();
	};

	// 上一曲
	prev.onclick = function () {
		-- currentSrcIndex < 0 && (currentSrcIndex = sourceList.length -1);
		currentSrc = sourceList[currentSrcIndex].getAttribute('src');
		audio.setAttribute('src', currentSrc);
		audio.play();
		play.innerHTML = 'Pause';
		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
		musicTime();
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
		if (audio.currentTime % 60 < 10) {
			currentTime.innerHTML = parseInt(audio.currentTime / 60) + ':0' + parseInt(audio.currentTime % 60);
		} else {
			currentTime.innerHTML = parseInt(audio.currentTime / 60) + ':' + parseInt(audio.currentTime % 60);
		}
	}, 1000);

	// 静音
	jingyin.onclick = function () {
		console.log('点击了静音');
		if (!audio.muted) {
			audio.muted = true;
		}else {
			audio.muted = false;
		}
	};

	// 判断文件缓冲进度
	setInterval(function updateCache () {
		var buffered, percent;
		console.log('执行缓冲');
		// 已缓冲部分
		audio.readyState == 4 && (buffered = audio.buffered.end(0));

		// 已缓冲百分百
		audio.readyState == 4 && (percent = Math.round(buffered / audio.duration * 100) + '%');
		loadBar.style.width = (Math.round(buffered / audio.duration * 100) * musicBar.clientWidth * 0.01) + 'px';
		console.log(Math.round(buffered / audio.duration * 100));
		console.log(percent);
	}, 1000);

	// 计算音乐时间

	function musicTime() {
		// 播放时间显示
		audio.addEventListener("canplay", function(){
			var sc=audio.duration;

			var fen = parseInt(sc / 60);
			var miao = parseInt(sc % 60);
			console.log('秒为====' + miao);
			if (miao < 10) {
				totalTime.innerHTML = fen + ':0' + miao;
			}else {
				totalTime.innerHTML = fen + ':' + miao;
			}
		});
	};

};













