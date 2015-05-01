var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
	jump_png: "res/jumping.png",
    jump_plist: "res/jumping.plist",
    walk_png:"res/walking.png",
    walk_plist:"res/walking.plist",
	background_png:"res/background-blue.png", // remove "-blue" for the red version
	token_png:"res/token.png",
	token_plist:"res/token.plist",
	player_png : "res/player.png",
    enemy_png : "res/enemy.png",
    ground_png: "res/ground.png",
    plat1_png: "res/platform1.png",
    plat2_png: "res/platform2.png",
    plat3_png: "res/platform3.png",
    plat4_png: "res/platform4.png",
    wall_png: "res/wall.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
