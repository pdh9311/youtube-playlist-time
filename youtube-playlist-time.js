if (window.location.host === 'www.youtube.com') {
    let itemsTag = '';
    switch (window.location.pathname) {
        case '/playlist':
            itemsTag = 'ytd-playlist-video-renderer'; 
            break;
        case '/watch':
            itemsTag = 'ytd-playlist-panel-video-renderer'; 
            break;
    }

    const $playlistItems = document.querySelectorAll(itemsTag);

    function calculateForplaylistTime(start, end) {
        const totalTime = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        };

        for (let i = start - 1; i < end; i++) {
            const time = $playlistItems[i].querySelector('ytd-thumbnail-overlay-time-status-renderer > div > span');
            //console.log(i, $playlistItems[i], time);

            const timeData = time.textContent.trim().split(':');
            if (timeData.length === 3) {
                totalTime.hour = Number(totalTime.hour) + Number(timeData[0]);
                totalTime.minute = Number(totalTime.minute) + Number(timeData[1]);
                totalTime.second = Number(totalTime.second) + Number(timeData[2]);
            } else if (timeData.length === 2) {
                totalTime.minute = Number(totalTime.minute) + Number(timeData[0]);
                totalTime.second = Number(totalTime.second) + Number(timeData[1]);
            }        
        }

        const _totalTime = {...totalTime};

        const secondR = Number(totalTime.second) % Number(60);
        const secondQ = Math.floor(Number(totalTime.second) / Number(60));

        const minuteR = Number(Number(totalTime.minute) + Number(secondQ)) % Number(60);
        const minuteQ = Math.floor(Number(Number(totalTime.minute) + Number(secondQ)) / Number(60));

        const hourR = Number(Number(totalTime.hour) + Number(minuteQ)) % Number(24);
        const hourQ = Math.floor(Number(Number(totalTime.hour) + Number(minuteQ)) / Number(24));

        const day = Number(totalTime.day) + Number(hourQ);

        _totalTime.second = secondR;
        _totalTime.minute = minuteR;
        _totalTime.hour = hourR;
        _totalTime.day = day;
        
        console.log('● BETWEEN', start, 'AND', end);
        console.log('● time:', _totalTime);
    }

    let startNum = Number(prompt('시간을 계산할 시작 번호를 입력하세요.'));
    let endNum = Number(prompt('시간을 계산할 끝 번호를 입력하세요.'));
    if (startNum === 0) {
        startNum = 1;
    }
    if (endNum === 0) {
        endNum = $playlistItems.length;
    }
    calculateForplaylistTime(startNum, endNum);
}