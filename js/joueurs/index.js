const init = () => {
    initWebSocket();
    retrieveAllRooms();
};

const initWebSocket = () => {
    WEBSOCKET_CLIENT = new WebSocketClient(SERVEUR_URL + "ws", { "Room" : ROOM_ID });
};

const retrieveAllRooms = () => {
    $.ajax({
        url: SERVEUR_URL + "rooms",
        type: "GET",
        success: (rooms) => {
            $("#configuration_select").html("<option value=''>Choisir une salle</option>");
            rooms.forEach(room => {
                $("#configuration_select").append(`
                    <option value="${ room.id }" ${ room.id === ROOM_ID && "selected" }>${ room.name }</option>
                `)
            });
        },
        error: (xmlHttpRequest, textStatus, errorThrown) => {
            console.error("Status: " + textStatus);
            console.error("Error: " + errorThrown);
        }
    });
};

const chooseRoom = (value) => {
    ROOM_ID = parseInt(value);
    WEBSOCKET_CLIENT.headers = { "Room" : ROOM_ID };
    localStorage.setItem("roomId", ROOM_ID);

    WEBSOCKET_CLIENT.disconnect(initWebSocket);
};
