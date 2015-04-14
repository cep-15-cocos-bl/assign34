var res = {
    player_png : "res/player.png",
    ground_png : "res/ground.png",
    platform_png: "res/platform.png",
    jump_png: "res/jumping.png",
    jump_plist: "res/jumping.plist",
    walk_png:"res/walking.png",
    walk_plist:"res/walking.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}