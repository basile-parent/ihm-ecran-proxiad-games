const init = () => {
	$("#message").hide();
	initWebSocket();
	retrieveAllRooms().then(updateCurrentRoomData);
};

const initWebSocket = () => {
    WEBSOCKET_CLIENT = new WebSocketClient(SERVEUR_URL + "ws", { "Room" : ROOM_ID }, initWebSocket);
    subscribeAll();
};

const subscribeAll = () => {
    WEBSOCKET_CLIENT.subscribe("/topic/room/" + ROOM_ID + "/start", () => {
        COMPTEUR.initTimer();
        COMPTEUR.startTime();
        WEBSOCKET_CLIENT.send("/room/startTimer", { id : ROOM_ID });
    });
    WEBSOCKET_CLIENT.subscribe("/topic/room/" + ROOM_ID + "/message", (messageDto) => {
		incomingMessage(messageDto.message);
    });
	WEBSOCKET_CLIENT.subscribe("/topic/room/" + ROOM_ID + "/pause", () => {
		COMPTEUR.pauseTime();
	});
};