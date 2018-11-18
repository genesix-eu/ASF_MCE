ASF Mass Config Editor is tool to edit same value in multiple json files for https://github.com/JustArchi/ArchiSteamFarm and also it alows you to send IPC commands start and stop to bots and get 2fa code.

You can select values which you want to change and you can also select bots (json files) which you want to ignore.

Download nwjs from https://nwjs.io/ and extract files from this repository and nwjs to same folder. Than create ASF folder and copy ASF program with your config to ASF folder.



How to use this app:

![how_to](_howto/how_to.png)

On the first row you select values which you want to change ( Enabled, Paused, SteamUserPermissions, GamesPlayedWhileIdlem, SteamMasterClanID, More); only selected (green) values will be changed in your config (bot.json) files.

Save button will save changes to config files. Ignore None and Ignore All toggles selection of bots. And ASF button will start ASF program.

Lower you can edit selected values. Simple values if true is clicked (green) it will be set to true if not (red) it will be set to false.

Other text or number values show the exaples for input.

In More field you can add any other settings stored in valid json code like this: {"HandleOfflineMessages":false,"DismissInventoryNotifications":true,"AutoDiscoveryQueue":true} and this keys and values will be added /or updated to selected bots.

And last you have your accounts (in this example there are five: g0, g1, g2, g3, g4)
You can select account which you DON'T WANT to edit by clicking on them (orange background color will be IGNORED) and account with green backrtound color will be SELECTED.  

Also you can see if loaded bots are Enabled, Paused or none of those (in bot.json file) by the color of the bots BORDER (red:Enabled=false; orange:Paused=true; green:Enabled=true,Paused=false)

To get 2fa code (you must have imported: https://github.com/JustArchi/ArchiSteamFarm/wiki/Escrow#import ) double click on bot name and code should be copied to clipboard (also it is shown at the top for 10 sec).

When you hover pover bot you can see for buttons:
1. Will open new window with current bot profile on steam and all cache data, session, cookies and passwords will be stored in  "./\_bot_browser_data/botname" so if you log in use name and pass for clicked account. If you CTRL+ click it will open new windos in chrome as App also with data stored in "./\_bot_browser_data/botname".

2. Will send IPC command to stop this bot.

3. Will send IPC command to start this bot.

4. If you CTRL + click this it will load steamID, avatarHash and steamLevel and save it to your config file. ASF is needed to be running this bot and ASF MCE need to be started or reloaded after ASF started this bot. You also need to add steam web api key in ./js/config.json for this to work. Later it shows bot level.

REMEMBER TO BACKUP YOUR CONFIG FOLDER TO SAVE LOCATION!

And this my first atempt to use git and github so Keep Calm and git gud!