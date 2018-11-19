var os = require('os');
var fs = require('fs');
var path = require('path');

var gui = require('nw.gui');
var win = gui.Window.get();
win.x=0;
win.y=0;

var user_config = require(process.cwd()+"\\js\\config.json");










var accounts = {};
var accounts_ASF = {};
var exclude_list = [];
var include_list = [];

var config_dir = process.cwd()+"\\ASF\\config";
var config_dir_new = process.cwd()+"\\ASF\\config";

jQuery.fn.sortDomElements = (function() {
    return function(comparator) {
        return Array.prototype.sort.call(this, comparator).each(function(i) {
              this.parentNode.appendChild(this);
        });
    };
})();


$(document).ready(function(){

if (user_config.no_warnings === true){
  hide("warm");
}

setTimeout(function(){ ignore_all(); }, 1000);

setTimeout(function() {
  hide("warm");
}, 4000);


 


function get_ipc_bots(warn){
	var xmlhttp = new XMLHttpRequest();
  // try{
	  xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(this.responseText);
			accounts_ASF = res.Result;
			console.log(accounts_ASF);
      for (var key in accounts_ASF) {
      if (accounts_ASF[key].IsConnectedAndLoggedOn === false &&  ( key !== "minimal" && key !== "example" )){$('div#content').append(
        '<span data-bot-name="'+key+'" data-bot-steamID="'+key.s_SteamID+'" class="file bot_dissabled" id="bot_'+key+'">'+
          '<span class="bot_name"> '+ key +' </span>'+
          '<span class="bot_sett"> &#x27B2; </span>'+
          '<span class="start"> &#9658; </span>'+
          '<span class="stop"> &#9724; </span>'+
          '<span class="level">' + "!" + '</span>'+
          

        '</span>');}
      else if (key !== "minimal" && key !== "example" ){$(
        'div#content').append('<span data-bot-name="'+key+'" data-bot-steamID="'+accounts_ASF[key].s_SteamID+'"  class="file bot_acctive" id="bot_'+key+'" style="' + "background-image: url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/" + accounts_ASF[key].AvatarHash + "_full.jpg'); " + '"">'+
          '<span class="bot_name"> '+ key +' </span>'+
          '<span class="bot_sett"> &#x27B2; </span>'+
          '<span class="start"> &#9658; </span>'+
          '<span class="stop"> &#9724; </span>'+
          '<span class="level">' +  "!" + '</span>'+

        '</span>');}
      }
        if ((isEmpty = Object.keys(accounts_ASF).length)){
        
        }else{
        setTimeout(function(){ get_ipc_bots(false); }, 60000);
        console.log("Again");
        }
		  }
	  };
    xmlhttp.onerror = function(e){
      if (warn===true) {error("ASF not running or ASF IPC is inaccessible!");}
      setTimeout(function(){ get_ipc_bots(false); }, 30000);
      console.log("Will check for ASF IPC in 30s");
    };
	  xmlhttp.open("GET", "http://127.0.0.1:1242/Api/Bot/ASF", true);
	  xmlhttp.send();

  // }catch(e){
  //   error("ASF not running or ASF IPC is inaccessible!");
  // };
}



get_ipc_bots(true);



fs.readdir(config_dir, function (err, files) {
	if (err) {error(err)}
  console.log("ASF config folder with bots was not found!");
  if (err) throw err;
	files.forEach( function (file) {
		if (file != undefined){
			fs.lstat(config_dir+'\\'+file, function(err, stats) {

					var n = file.indexOf('.');
					var just_name = file.substring(0, n != -1 ? n : n.length);
					var ext = file.split('.').pop();
  					if (ext=='json' && file != "example.json" &&  file != "minimal.json" && file != "ASF.json"){
              var temp_name = config_dir+"\\"+file;
              accounts[just_name] = require(temp_name);
              if (accounts[just_name].Enabled === false){$('div#content').append('<span data-bot-name="'+just_name+'" data-bot-steamID="'+accounts[just_name].steamID+'" class="file '+ ext +' bot_dissabled" id="bot_'+just_name+'" style='+ '"' + "background-image: url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/" + (accounts[just_name].avatarHash || accounts_ASF[just_name].AvatarHash) + "_full.jpg'); background-repeat: no-repeat; background-position: left top; background-size: auto 100% ;" + '""><span class="level">' + (accounts[just_name].steamLevel || "!") + '</span><span class="bot_name"> '+ just_name +' </span><span class="start"> &#9658; </span><span class="stop"> &#9724; </span><span class="bot_sett"> &#x27B2; </span></span>');}
              else if (accounts[just_name].Paused === true ){$('div#content').append('<span data-bot-name="'+just_name+'" data-bot-steamID="'+accounts[just_name].steamID+'"  class="file '+ ext +' bot_paused" id="bot_'+just_name+'" style='+ '"' + "background-image: url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/" + (accounts[just_name].avatarHash || accounts_ASF[just_name].AvatarHash) + "_full.jpg'); background-repeat: no-repeat; background-position: left top; background-size: auto 100% ;" + '""><span class="level">' + (accounts[just_name].steamLevel || "!") + '</span><span class="bot_name"> '+ just_name +' </span><span class="start"> &#9658; </span><span class="stop"> &#9724; </span><span class="bot_sett"> &#x27B2; </span></span>');}
              else{$('div#content').append('<span data-bot-name="'+just_name+'" data-bot-steamID="'+accounts[just_name].steamID+'"  class="file '+ ext +' bot_acctive" id="bot_'+just_name+'" style='+ '"' + "background-image: url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/" + (accounts[just_name].avatarHash || accounts_ASF[just_name].AvatarHash) + "_full.jpg'); background-repeat: no-repeat; background-position: left top; background-size: auto 100% ;" + '""><span class="level">' + (accounts[just_name].steamLevel || "!") + '</span><span class="bot_name"> '+ just_name +' </span><span class="start"> &#9658; </span><span class="stop"> &#9724; </span><span class="bot_sett"> &#x27B2; </span></span>');}
            }


      });
		}
  });
});






//setTimeout(reorder, 1500)



//console.log(accounts);

$(document).on("click", "label", function() {

  var my_value = '';
  var contrl_itm = $(this).children(":first").attr('id');

  var status = false;
  status = document.getElementById(contrl_itm).checked;


if ( status === true && (contrl_itm === "sel" || contrl_itm === "lbc" || contrl_itm === "Enabled" || contrl_itm === "Paused" || contrl_itm === "IsBotAccount" || contrl_itm === "SteamUserPermissions" || contrl_itm === "GamesPlayedWhileIdle" || contrl_itm === "SteamMasterClanID" || contrl_itm === "More" || contrl_itm === "ICP" || contrl_itm === "c2fa")){document.getElementById(contrl_itm+'_form').style.display = "none";}
else if ( status === false && (contrl_itm === "sel" || contrl_itm === "lbc" || contrl_itm === "Enabled" || contrl_itm === "Paused" || contrl_itm === "IsBotAccount")) {document.getElementById(contrl_itm+'_form').style.display = "inline-block";}
else if ( status === false && (contrl_itm === "SteamUserPermissions" || contrl_itm === "GamesPlayedWhileIdle" || contrl_itm === "SteamMasterClanID" || contrl_itm === "More" || contrl_itm === "ICP" || contrl_itm === "c2fa")) {document.getElementById(contrl_itm+'_form').style.display = "block";}


});


// $('.file').click(function() {
//     $(this).addClass("exclude"); 
// });



// $(document).on("click", ".file", function() {


// 	if (event.shiftKey) {
// 		let bot_name = $(this).attr('data-bot-name');
// 		let steamID = accounts[bot_name].steamID.toString() || accounts_ASF[bot_name].s_SteamID;
// 		console.log(bot_name);
// 		// console.log(accounts[bot_name]);
// 		console.log(steamID);
// 		if (user_config.steamAPIKey === "0000") {alert("Change Steam Web Api Key in ./js/config.json")};
// 		$.getJSON("http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + user_config.steamAPIKey + "&steamid="+steamID, function(result){
			
// 			console.log(result.response.player_level);




// 			accounts[bot_name].steamLevel = result.response.player_level;

// 			var file = bot_name+'.json';
// 			var filePath = path.join(config_dir_new, file);

// 			var temp_holder = JSON.stringify(accounts[bot_name], null, "\t");
// 			fs.writeFile(filePath, temp_holder, function (err) {
// 				if (err) {
// 					console.info("There was an error attempting to save");
// 					console.warn(err.message);
// 					alert("There was an error attempting to save");
// 					return;
// 				} else if (callback) {
// 					callback();
// 				}
// 			});

// 		});
// 	}
// 	else if (event.ctrlKey) {
// 		let bot_name = $(this).attr('data-bot-name');
// 		let index = accounts_ASF.findIndex(x => x.BotName===bot_name);
// 		let avatarHash = accounts_ASF[index].AvatarHash;

// 		accounts[bot_name].avatarHash = avatarHash
// 		console.log(bot_name + ' ' + avatarHash + ' ' + index);

// 		var file = bot_name+'.json';
// 		var filePath = path.join(config_dir_new, file);

// 		var temp_holder = JSON.stringify(accounts[bot_name], null, "\t");
// 		fs.writeFile(filePath, temp_holder, function (err) {
// 			if (err) {
// 				console.info("There was an error attempting to save for "+k);
// 				console.warn(err.message);
// 				alert("There was an error attempting to save for "+k);
// 				return;
// 			} else if (callback) {
// 				callback();
// 			}
// 		});




// 	}
// 	else if (event.altKey){
// 		let adress = "https://github.com";
// 		new_window_cache($(this).attr('title'));

// 	}







	// else {

 //    let contrl_itm = $(this).attr('data-bot-name');

 //    if ($( this ).hasClass( "exclude" )){

 //    	var index = exclude_list.indexOf(contrl_itm);
 //    	exclude_list.splice(index, 1);
 //    	$(this).removeClass("exclude");  

 //    }else{

 //    	exclude_list.push(contrl_itm);
 //    	$(this).addClass("exclude");  
 //    }
 //  }






// });



$(document).on("click", ".level", function() {
if (event.ctrlKey){
	var bot_name = $(this).parent().attr('data-bot-name');
	console.log(bot_name);
	let steamID = ( accounts_ASF[bot_name].s_SteamID || accounts[bot_name].steamID.toString() );
	$.getJSON("http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + user_config.steamAPIKey + "&steamid="+steamID, function(result){

		accounts[bot_name].steamLevel = result.response.player_level;

		console.log(bot_name)
		//let index = accounts_ASF.prototype.findIndex(x => x.BotName===bot_name);
		let avatarHash = accounts_ASF[bot_name].AvatarHash;

		accounts[bot_name].avatarHash = avatarHash;
		accounts[bot_name].steamID = accounts_ASF[bot_name].s_SteamID;
		let file = bot_name+'.json';
		let filePath = path.join(config_dir_new, file);

		let temp_holder = JSON.stringify(accounts[bot_name], null, "\t");
		fs.writeFile(filePath, temp_holder, function (err) {
			if (err) {
				console.info("There was an error attempting to save");
				console.warn(err.message);
				alert("There was an error attempting to save");
				return;
			} else if (callback) {
				callback();
			}
		});

	});
}
});

$(document).on("click", ".start", function() {
	event.preventDefault();
	let bot_name = $(this).parent().attr('data-bot-name');
	$.post("http://127.0.0.1:1242/Api/Command/start "+bot_name, function(data, status){
		if (data.Message === "OK"){

	}
});
});

$(document).on("click", ".stop", function() {
	let bot_name = $(this).parent().attr('data-bot-name');
		$.post("http://127.0.0.1:1242/Api/Command/stop "+bot_name, function(data, status){
			if (data.Message === "OK"){

	}
	});
});

$(document).on("click", ".bot_sett", function() {
	if (event.ctrlKey) {
		let bot_name = $(this).parent().attr('data-bot-name');
		let bot_steamID = $(this).parent().attr('data-bot-steamID') || accounts_ASF[bot_name].s_SteamID;
		start_bot_sett( '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" --user-data-dir=' + gui.process.cwd()+"\\_data_bots\\" +  bot_name  +" --window-size=1000,1000 --app=https://steamcommunity.com/profiles/"+bot_steamID);
	}
	else{
		let bot_name = $(this).parent().attr('data-bot-name');
		let bot_steamID = $(this).parent().attr('data-bot-steamID') || accounts_ASF[bot_name].s_SteamID;
		start_bot_sett( gui.process.execPath + " --user-data-dir=" + gui.process.cwd()+"\\_data_bots\\" +  bot_name  +" --url=https://steamcommunity.com/profiles/"+bot_steamID);
	}
});

$(document).on("dblclick", ".file", function() {
	var bot_name = $(this).attr('data-bot-name');
	$.post("http://127.0.0.1:1242/Api/Command/2fa "+bot_name, function(data, status){
		let t_2fa = data.Result.split(" 2FA Token: ");
		document.getElementById("warm2fa").style.display = "block";
		document.getElementById("who2fa").textContent = t_2fa[0];
		document.getElementById("code2fa").value = t_2fa[1];

		let copy2fa = document.getElementById("code2fa");
		copy2fa.select();
		document.execCommand("Copy");


		setTimeout(function(){ document.getElementById("warm2fa").style.display = "none"; }, 10000);
	});

});


$(document).on("click", ".bot_name", function() {
    let contrl_itm = $(this).parent().attr('data-bot-name');
    if ($( this ).parent().hasClass( "exclude" )){
    	var index = exclude_list.indexOf(contrl_itm);
    	exclude_list.splice(index, 1);
    	$(this).parent().removeClass("exclude");  
    }else{
    	exclude_list.push(contrl_itm);
    	$(this).parent().addClass("exclude");  
    }
});





//END OF DOCUMENT READY
});



function error(message){
  document.getElementById("warm").style.display = "block";
  document.getElementById("warm_mess").textContent = message;
  setTimeout(function(){ document.getElementById("warm").style.display = "none"; }, 7000);
}


function reorder(){
  
  $("#content").children().sortDomElements(function(a,b){

    akey = $(a).attr("title");
    bkey = $(b).attr("title");
    if (akey == bkey) return 0;
    if (akey < bkey) return -1;
    if (akey > bkey) return 1;
  })
}

function ignore_all(){

	if (exclude_list.length === Object.keys(accounts).length){
		exclude_list.length = 0;
		for (var k in accounts){
			$("#bot_"+k).removeClass("exclude");
		}
    document.getElementById("ignore").innerHTML = "Ignore All";
  }
  else{
    document.getElementById("ignore").innerHTML = "Ignore None";

    for (var k in accounts){
     if (accounts.hasOwnProperty(k) && exclude_list.indexOf(k) < 0) {
      exclude_list.push(k);
      $("#bot_"+k).addClass("exclude");  
    }
  }
}
}



function show(id, how){
  document.getElementById(id).style.display = how;
}

function hide(id){
  document.getElementById(id).style.display = "none";
}




function save_btn_pressed(){

  var to_do_Enabled = false;
  var to_do_Paused = false;
  var to_do_IsBotAccount = false;
  var to_do_SteamUserPermissions = false;
  var to_do_GamesPlayedWhileIdle = false;
  var to_do_SteamMasterClanID = false;
  var to_do_More = false;

  var value_Enabled = false;
  var value_Paused = false;
  var value_IsBotAccount = false;





  var value_SteamUserPermissions = [];
  var value_SteamUserPermissions_final = {};

  var value_GamesPlayedWhileIdle = [];

  var value_SteamMasterClanID = "";

  var value_More = "";






  if($("#Enabled").is(':checked')){ 
    to_do_Enabled = true;
    console.log("Enabled will be set!");
    if($("#Enabled_true").is(':checked')){ value_Enabled = true; } else { value_Enabled = false; }
  }

  if($("#Paused").is(':checked')){
    to_do_Paused = true;
    console.log("Paused will be set!");
    if($("#Paused_true").is(':checked')){ value_Paused = true; } else { value_Paused = false; }
  }


  if($("#IsBotAccount").is(':checked')){
    to_do_IsBotAccount = true; 
    console.log("IsBotAccount will be set!"); 
    if($("#IsBotAccount_true").is(':checked')){ value_IsBotAccount = true;  } else { value_IsBotAccount = false; }
  }


  if($("#SteamUserPermissions").is(':checked')){
    to_do_SteamUserPermissions = true;
    console.log("SteamUserPermissions will be set!");
    var supi_text = document.getElementById('SteamUserPermissions_input').value;
    var supi_text = supi_text.replace(/\s/g,'')

    if(supi_text.indexOf(";")>=0){
      var supi_arr = supi_text.split(';');

      var supi_arr_corrected = {};

      
      for (j = 0; j < supi_arr.length; j++) {
        var temp10 = supi_arr[j].split(':');

        var temp_name3 = temp10[0];
        var temp_value3 = temp10[1];
        var temp_arr3 = {};
        temp_arr3[temp_name3]=temp_value3;

        supi_arr_corrected[temp_name3]=Number(temp_value3);

        value_SteamUserPermissions_final=supi_arr_corrected;
      }

    }else if(supi_text.indexOf(",")>=0){
      var supi_arr = supi_text.split(',');

      var supi_arr_corrected = {};

      
      for (j = 0; j < supi_arr.length; j++) {
        var temp10 = supi_arr[j].split(':');

        var temp_name3 = temp10[0];
        var temp_value3 = temp10[1];
        var temp_arr3 = {};
        temp_arr3[temp_name3]=temp_value3;

        supi_arr_corrected[temp_name3]=Number(temp_value3);

        value_SteamUserPermissions_final=supi_arr_corrected;
      }

    }

    else{

      var supi_arr_corrected_one = supi_text.split(':');

      for (i = 0; i < supi_arr_corrected_one.length; i=i+2) {

        

        var temp_name2 = supi_arr_corrected_one[0];
        var temp_value2 = supi_arr_corrected_one[1];
        var temp_arr1 = {};
        temp_arr1[temp_name2] = Number(temp_value2);
      // console.log(temp_arr1);
      value_SteamUserPermissions.push(temp_arr1);
      value_SteamUserPermissions_final = value_SteamUserPermissions[0];
    }
  }


}







//TODO Not sure if output should be array or string?!
if($("#GamesPlayedWhileIdle").is(':checked')){
  to_do_GamesPlayedWhileIdle = true;
  console.log("GamesPlayedWhileIdle will be set!");
  let temp1 = document.getElementById('GamesPlayedWhileIdle_input').value;
  var value_GamesPlayedWhileIdle = JSON.parse("[" + temp1 + "]"); 
}




if($("#SteamMasterClanID").is(':checked')){
  to_do_SteamMasterClanID = true;
  console.log("SteamMasterClanID will be set!");

  var value_SteamMasterClanID = document.getElementById('SteamMasterClanID_input').value;
// console.log(value_SteamMasterClanID);
}



if($("#More").is(':checked')){
	to_do_More = true;
	console.log("More will be set!");

  let temp2 = document.getElementById('More_input').value;
  var value_More = JSON.parse(temp2);
// console.log(value_SteamMasterClanID);
}









for (var i = 0; i < exclude_list.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.
    var temp_val = exclude_list[i];
    delete accounts[temp_val];
  }





  for (var k in accounts){
    if (accounts.hasOwnProperty(k)) {
      if (to_do_Enabled === true){ accounts[k].Enabled = value_Enabled;}
      if (to_do_Paused === true){ accounts[k].Paused = value_Paused;}
      if (to_do_IsBotAccount === true){ accounts[k].IsBotAccount = value_IsBotAccount;}
      if (to_do_SteamUserPermissions === true){ accounts[k].SteamUserPermissions = value_SteamUserPermissions_final;}
      if (to_do_GamesPlayedWhileIdle === true){ accounts[k].GamesPlayedWhileIdle = value_GamesPlayedWhileIdle;}
      if (to_do_SteamMasterClanID === true){ accounts[k].SteamMasterClanID = value_SteamMasterClanID;}
      if (to_do_More === true){ Object.assign(accounts[k], value_More); }
      // console.log("Key is " + k + ", value is" + k);

      var file = k+'.json';
      var filePath = path.join(config_dir_new, file);

      var temp_holder = JSON.stringify(accounts[k], null, "\t");
      fs.writeFile(filePath, temp_holder, function (err) {
        if (err) {
          console.info("There was an error attempting to save for "+k);
          console.warn(err.message);
          alert("There was an error attempting to save for "+k);
          return;
        } else if (callback) {
          callback();
        }
      });













    }
  }

  alert("Done")

  win.reload();




}



// saveSettings(mySettings, function () {
//     console.log('Settings for '++' saved');
// });






function saveSettings (settings, file_name, callback) {
  var file = 'my-settings-file.json';
  var filePath = path.join(nw.App.dataPath, file);
  fs.writeFile(filePath, settings, function (err) {
    if (err) {
      console.info("There was an error attempting to save your data.");
      console.warn(err.message);
      return;
    } else if (callback) {
      callback();
    }
  });
}

function wv_go (my_url){


        // var x = document.getElementsByTagName("webview")[0].getAttribute("src"); //get current domain

        document.getElementById("icpwv").setAttribute("src",my_url);


      }





      function log_wv(who){
        let icpwv = document.getElementById('icpwv').contentWindow.document.body.innerText;
        let wv_json = JSON.parse(icpwv);
        let wvresult = wv_json.Result;
// console.log(wvresult);
// console.log(typeof( wvresult ));

//wvresult = wvresult.textContent;
wvresult = wvresult.replace(/</g, 'z1337z--');
wvresult = wvresult.replace(/>/g, '--');
wvresult = wvresult.replace(/z1337z/g, '<br>');

// console.log(wvresult);
// console.log(typeof( wvresult ));

var table = document.getElementById("icp_log");
var row = table.insertRow();
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);


var currentdate = new Date(); 
var twoDigitMonth=((currentdate.getMonth()+1)>=10)? (currentdate.getMonth()+1) : '0' + (currentdate.getMonth()+1);  
var twoDigitDate=((currentdate.getDate())>=10)? (currentdate.getDate()) : '0' + (currentdate.getDate());


var datetime = currentdate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

cell1.innerHTML = datetime;
cell2.innerHTML = who;
cell3.innerHTML = wvresult;


var elem = document.getElementById('table_restrain');
elem.scrollTop = elem.scrollHeight;

// setTimeout(function(){

// }, 333);



}


function log_me(who, what){

  console.log(what);


  var table = document.getElementById("icp_log");
  var row = table.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);


  var currentdate = new Date();

  var twoDigitMonth=((currentdate.getMonth()+1)>=10)? (currentdate.getMonth()+1) : '0' + (currentdate.getMonth()+1);  
  var twoDigitDate=((currentdate.getDate())>=10)? (currentdate.getDate()) : '0' + (currentdate.getDate());


  var datetime = currentdate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

  cell1.innerHTML = datetime;
  cell2.innerHTML = who;
  cell3.innerHTML = what;

  var elem = document.getElementById('table_restrain');
  elem.scrollTop = elem.scrollHeight;
}


function do_this(command, in_id){
  include_list.length = 0;  
  for (var k in accounts){
    if (accounts.hasOwnProperty(k) && exclude_list.indexOf( String(k)) === -1) {
      //console.log( String(k));
      include_list.push(String(k));
    }
  }

  let include_note = "";
  include_note = include_list.toString();

  if (in_id){
    let third_arg = document.getElementById( in_id ).value;

    console.log(command+": "+include_note + " " + third_arg);
    wv_go('http://127.0.0.1:1242/Api/Command/'+ command + " "  + include_note + " " + third_arg);
    log_me("req", command + " " + include_note + " " + third_arg);

  }else{

    console.log(command+": "+include_note);
    wv_go('http://127.0.0.1:1242/Api/Command/'+ command + " "  + include_note);
    log_me("req", command + " " + include_note);

  }
}

function do_this_range(command, in_id){
  include_list.length = 0;  
  for (var k in accounts){
    if (accounts.hasOwnProperty(k) && exclude_list.indexOf( String(k)) === -1) {
    	//console.log( String(k));
    	include_list.push(String(k));
    }
  }

  let include_note = "";
  include_note = include_list[0] + ".." + include_list[include_list.length - 1];

  if (in_id){
    let third_arg = document.getElementById( in_id ).value;

    console.log(command+": "+include_note + " " + third_arg);
    wv_go('http://127.0.0.1:1242/Api/Command/'+ command + " "  + include_note + " " + third_arg);
    log_me("req", command + " " + include_note + " " + third_arg);

  }else{

    console.log(command+": "+include_note);
    wv_go('http://127.0.0.1:1242/Api/Command/'+ command + " "  + include_note);
    log_me("req", command + " " + include_note);

  }
}




function returnvalue(in_id){
  let third_arg = document.getElementById(in_id).value;
  return third_arg;
}

function start_asf(){
	gui.Shell.openItem(gui.process.cwd()+'\\ASF\\ArchiSteamFarm.exe');
}


function start_bot_sett(command){
		
	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;

	child = exec(command, function (error, stdout, stderr) {
  		if (error !== null) {
  			console.log('exec error: ' + error);
  		}
	});
}

function new_window_cache(folder_name, my_url){


// let command = nw.process.execPath + " --user-data-dir='./data/temp" + folder_name + "' https://store.steampowered.com/";
let command = '"c:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"' + " --user-data-dir=" + gui.process.cwd() + "\\data\\temp" + folder_name + " --app=https://store.steampowered.com/";

var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec(command, function (error, stdout, stderr) {
  //sys.print('stdout: ' + stdout);
  //sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});


}