let ROOMS = [];
let RIDDLES = [];
let RIDDLES_DATAS = [];

const showTab = (tab) => {
    $("#content > nav button").removeClass("selected");
    $("#content > nav button[tab=" + tab + "]").addClass("selected");

    $(".tab").hide();
    $("#" + tab).show();
};

$("#content > nav button").click(function() {
    showTab($(this).attr("tab"));
});


const initWebSocket = () => {
    WEBSOCKET_CLIENT = new WebSocketClient(SERVEUR_URL + "ws", {}, initWebSocket);
    subscribeAll();
};

const subscribeAll = () => {
    subscribeRooms();
};
