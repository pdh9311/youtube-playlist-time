const $playlistItems = document.querySelectorAll('ytd-playlist-panel-video-renderer');

function calculateForplaylistTime(start, end) {
    const totalTime = {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    };

    for (let i = start - 1; i < end; i++) {
        const idx = $playlistItems[i].querySelector('#index');
        const time = $playlistItems[i].querySelector('#text');
        //console.log(idx.textContent, time.textContent.trim());
        const timeData = time.textContent.trim().split(':');
        if (timeData.length === 3) {
            totalTime.hour = Number(totalTime.hour) + Number(timeData[0]);
            totalTime.minute = Number(totalTime.minute) + Number(timeData[1]);
            totalTime.second = Number(totalTime.second) + Number(timeData[2]);
        } else if (timeData.length === 2) {
            totalTime.minute = Number(totalTime.minute) + Number(timeData[0]);
            totalTime.second = Number(totalTime.second) + Number(timeData[1]);
        }
        //console.log('timeData', timeData);
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

    console.log(_totalTime);
}

const startNum = prompt('시간을 계산할 시작 번호를 입력하세요.');
calculateForplaylistTime(startNum, $playlistItems.length);