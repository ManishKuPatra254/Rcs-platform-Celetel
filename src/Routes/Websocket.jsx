
export function InitWebSocket(setProgress) {
    const socket = new WebSocket('wss://157.15.202.251/ws');

    socket.onopen = function () {
        console.log('WebSocket connection opened');
    };


    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);

        if (data.processedCount !== undefined && data.totalNumbers !== undefined) {
            console.log(data.processedCount, "dataprocess")
            // Calculate progress as a percentage
            const progress = (data.processedCount / data.totalNumbers) * 100;
            console.log('Calculated progress:', progress);
            setProgress(progress);
        }
    };




    socket.onclose = function () {
        console.log('WebSocket connection closed');
    };

    socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };
}
