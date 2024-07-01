export function InitWebSocket(token) {
    const socket = new WebSocket(`ws://157.15.202.251:8090`, token);

    socket.onopen = function () {
        console.log('WebSocket connection opened');
    };

    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log('Receiveddata:', data);
    };

    socket.onclose = function () {
        console.log('WebSocket connection closed');
    };

    socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };
}

