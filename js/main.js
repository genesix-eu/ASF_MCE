var os = require('os');
var fs = require('fs');
var path = require('path');

var gui = require('nw.gui');
var win = gui.Window.get();
win.x=0;
win.y=0;


if (fs.existsSync(process.cwd()+"\\js\\config_personal.json")) {
  var user_config = require(process.cwd()+"\\js\\config_personal.json");
  // console.log("config_personal");
}else{
  var user_config = require(process.cwd()+"\\js\\config.json");
  // console.log("config");
}

if (fs.existsSync(process.cwd()+"\\ASF\\config\\")) {
  local_bot_config = true;
}else{
  local_bot_config = false;
  
}


//var user_config = require(process.cwd()+"\\js\\config.json");

var accounts = {};
var accounts_ASF = {};
var accounts_ASF_prev = {};
var exclude_list = [];
var include_list = [];
var local_bot_config = false;
var ipc_bot_config = false;
var sel_mode = "obo";

var ipc_valid_commands = ["2fa","2fano","2faok","addlicense","balance","exit","level","loot","loot@","loot^","nickname","pause","play","privacy","redeem","redeem^","restart","resume","stats","start","status","stop","transfer","transfer@","transfer^","unpack","update","version"];


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

  setTimeout(function(){ ignore_all(); }, 3000);

  setTimeout(function() {
    hide("warm");
  }, 4000);

















  setTimeout(function(){ get_ipc_bots(true); }, 4000);




  fs.readdir(config_dir, function (err, files) {
   if (err) {
    error(err);
    document.getElementById("lbc_l").style.display = "none";
    // console.log("ASF config folder with bots was not found!");
  }

  // setTimeout(function(){ error("ASF Config Files not Found in ./ASF/config/"); }, 3000);
  

  if (err) throw err;
  local_bot_config = true;
  files.forEach( function (file) {
    if (file != undefined){
     fs.lstat(config_dir+'\\'+file, function(err, stats) {

      var n = file.indexOf('.');
      var just_name = file.substring(0, n != -1 ? n : n.length);
      var ext = file.split('.').pop();
      if (ext=='json' && file != "example.json" &&  file != "minimal.json" && file != "ASF.json"){
        var temp_name = config_dir+"\\"+file;
        accounts[just_name] = require(temp_name);

      }
    });
   }
 });

  setTimeout(function(){   create_bots('local'); }, 500);
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


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("ipc_command"), ipc_valid_commands);




























$(document).on("click", ".level", function() {
  $(this).addClass("clicked").delay(4000).queue(function(next){
    $(this).removeClass("clicked");
    next();
  });
  if (event.ctrlKey){
    var bot_name = $(this).parent().attr('data-bot-name');
    var this_elem = $(this);
    // console.log(bot_name);
    let steamID;
    if(accounts[bot_name].steamID){
      steamID = accounts[bot_name].steamID.toString();
      accounts[bot_name].steamID = steamID;
    }
    else if(accounts_ASF[bot_name].s_SteamID){
      steamID = accounts_ASF[bot_name].s_SteamID;
      accounts[bot_name].steamID = steamID;
    }
    else
    {
      console.log("Can't get SteamID");
      return 0;
    }

    if (user_config.steamAPIKey && user_config.steamAPIKey !== "0000"){
     $.getJSON("http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + user_config.steamAPIKey + "&steamid="+steamID, function(result){
      accounts[bot_name].steamLevel = result.response.player_level;
      $(this_elem).text(result.response.player_level);

    });
   }
   if(accounts[bot_name].avatarHash){
    let avatarHash = accounts[bot_name].avatarHash;
    accounts[bot_name].avatarHash = avatarHash;
  }
  else if(accounts_ASF[bot_name].AvatarHash){
    let avatarHash = accounts_ASF[bot_name].AvatarHash;
    accounts[bot_name].avatarHash = avatarHash;
  }
  else
  {
    console.log("Can't get AvatarHash");

  }

  setTimeout(function(){
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

  }, 1000); 




}
});

$(document).on("click", ".start", function() {
  $(this).addClass("clicked").delay(4000).queue(function(next){
    $(this).removeClass("clicked");
    next();
  });
  event.preventDefault();
  let bot_name = $(this).parent().attr('data-bot-name');
  send_ipc_exec("start "+bot_name);
});

$(document).on("click", ".stop", function() {
  $(this).addClass("clicked").delay(4000).queue(function(next){
    $(this).removeClass("clicked");
    next();
  });
  let bot_name = $(this).parent().attr('data-bot-name');
  send_ipc_exec("stop "+bot_name);
});

$(document).on("click", ".bot_sett", function() {
	if (event.ctrlKey) {
		let bot_name = $(this).parent().attr('data-bot-name');
		let bot_steamID = $(this).parent().attr('data-bot-steamID') || accounts_ASF[bot_name].s_SteamID;
		start_bot_sett( '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" --user-data-dir=' + gui.process.cwd()+"\\_data_bots\\" +  bot_name  +" --window-size=1000,1000 --url=https://steamcommunity.com/profiles/"+bot_steamID);
	}
	else{
    $(this).addClass("clicked").delay(4000).queue(function(next){
      $(this).removeClass("clicked");
      next();
    });
    let bot_name = $(this).parent().attr('data-bot-name');
    let bot_steamID = $(this).parent().attr('data-bot-steamID') || accounts_ASF[bot_name].s_SteamID;
    start_bot_sett( '"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" --user-data-dir=' + gui.process.cwd()+"\\_data_bots\\" +  bot_name  +" --window-size=1000,1000 steamcommunity.com/profiles/"+bot_steamID);
  }
});


$(document).on("click", ".own_games", function() {
  let bot_name = $(this).parent().attr('data-bot-name');
  let bot_steamID = $(this).parent().attr('data-bot-steamID');
  $(this).addClass("clicked").delay(4000).queue(function(next){
    $(this).removeClass("clicked");
    next();
  });

  nw.Shell.openExternal('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key='+user_config.steamAPIKey+'&steamid='+bot_steamID);
});



$(document).on("click", ".privacy", function() {
  $(this).addClass("clicked").delay(4000).queue(function(next){
    $(this).removeClass("clicked");
    next();
  });
  let bot_name = $(this).parent().attr('data-bot-name');
  send_ipc_exec("privacy "+bot_name +" 3,3,1,1,3,3,1");
});


$(document).on("dblclick", ".bot", function() {
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
  let ipc_bots_inp = document.getElementById("ipc_bots_inp");
  let contrl_itm = $(this).parent().attr('data-bot-name');
  if ($( this ).parent().hasClass( "exclude" )){
   var index = exclude_list.indexOf(contrl_itm);
   exclude_list.splice(index, 1);
   if(sel_mode === "obo"){
    if(ipc_bots_inp.value.length == 0)
      {ipc_bots_inp.value = contrl_itm;}
    else{
      ipc_bots_inp.value = ipc_bots_inp.value +","+contrl_itm;
    }

  }else if(sel_mode==="range"){
    let ipc_bots_bef_aff = ipc_bots_inp.value.split("..");
    if(ipc_bots_inp.value.length === 0)
      {ipc_bots_inp.value = contrl_itm;

      }else if(ipc_bots_bef_aff[1]){
        ignore_all("all");
        ipc_bots_inp.value = contrl_itm;
        
      }else{
        ipc_bots_inp.value = ipc_bots_inp.value +".."+contrl_itm;
        
      }
    }
    $(this).parent().removeClass("exclude");  
  }else{
    let ipc_bots_inp_all = ipc_bots_inp.value;
    if (sel_mode==="obo"){


// let ipc_bots_before = ipc_bots_inp_all.substring(0, str.indexOf(contrl_itm));
let ipc_bots_bef_aff = ipc_bots_inp_all.split(contrl_itm);
let last_ch = ipc_bots_bef_aff[0].slice(-1);
let first_ch = ipc_bots_bef_aff[1].slice(0, 1);
// console.log("last was "+last_ch);
// console.log("first was" +first_ch);
if (last_ch === "," && first_ch===","){
  ipc_bots_inp.value =   ipc_bots_inp_all.replace(","+contrl_itm, "");
  // console.log(",x,");
}else if(last_ch === ","){
  ipc_bots_inp.value =   ipc_bots_inp_all.replace(","+contrl_itm, "");
  // console.log(",x");
}else if(first_ch === ","){
  ipc_bots_inp.value =   ipc_bots_inp_all.replace(contrl_itm+",", "");
  // console.log("x,");
}else{
  ipc_bots_inp.value =   ipc_bots_inp_all.replace(contrl_itm, "");
  // console.log("x");
}
}else if(sel_mode==="range"){
  let separ = ipc_bots_inp_all.indexOf("..");
  let ipc_bots_bef_aff = ipc_bots_inp_all.split("..");
  if (ipc_bots_bef_aff[0]===contrl_itm && separ > 0) {
    let new_bot_selc = ipc_bots_inp_all.replace(contrl_itm+"..", '');
    ipc_bots_inp.value = new_bot_selc;

  }else if (separ > 0){
    let new_bot_selc = ipc_bots_inp_all.replace(".."+contrl_itm, '');
    ipc_bots_inp.value = new_bot_selc;

  }else{
    ipc_bots_inp.value = "";

  }
}



exclude_list.push(contrl_itm);
$(this).parent().addClass("exclude");  
}
});





//END OF DOCUMENT READY
});



function error(message){
  // console.log(message);
  if (user_config.no_warnings === false){
    document.getElementById("warm").style.display = "block";
    document.getElementById("warm_mess").textContent = message;
    setTimeout(function(){ document.getElementById("warm").style.display = "none"; }, 7000);
  }
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


function ignore_all(how){
  if (local_bot_config === false && ipc_bot_config === true){
    // console.log(exclude_list.length +" - "+Object.keys(accounts_ASF).length);
    if (exclude_list.length === Object.keys(accounts_ASF).length){
      exclude_list.length = 0;
      for (var k in accounts_ASF){
       $("#bot_"+k).removeClass("exclude");
     }
     document.getElementById("ignore").innerHTML = "Ignore All";
   }
   else if (how === "all")
   {
    document.getElementById("ignore").innerHTML = "Ignore None";
    exclude_list=[];
    for (var k in accounts_ASF){
     if (accounts_ASF.hasOwnProperty(k) && exclude_list.indexOf(k) < 0) {
      exclude_list.push(k);
      $("#bot_"+k).addClass("exclude"); 
      console.log(k + "" + (exclude_list.indexOf(k) < 0));
    }
  }
}
else
{
  document.getElementById("ignore").innerHTML = "Ignore None";
  for (var k in accounts_ASF){
   if (accounts_ASF.hasOwnProperty(k) && exclude_list.indexOf(k) < 0) {
    exclude_list.push(k);
    $("#bot_"+k).addClass("exclude"); 
    // console.log(k + "" + (exclude_list.indexOf(k) < 0));
  }
}
}
}else{
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

function change_value_of_input(id, value){
  document.getElementById(id).value=value;
}

function send_ipc_req(){
  let ipc_command = document.getElementById("ipc_command").value;
  let ipc_bots_inp = document.getElementById("ipc_bots_inp").value;
  let ipc_bots_inp2 = document.getElementById("ipc_bots_inp");
  let ipc_arg = document.getElementById("ipc_arg").value;
  let ipc_full_command = "";
  if (ipc_command){ipc_full_command += ipc_command;}
  if (ipc_bots_inp){ipc_full_command += " " + ipc_bots_inp;}
  if (ipc_arg){ipc_full_command += " " + ipc_arg;}
  
  if (ipc_full_command){send_ipc_exec(ipc_full_command);}
  ignore_all();
  ipc_bots_inp2.value = "";
}

function send_ipc_exec(command){
  $("#ipc_log").find('tbody').append( "<tr><td>req</td><td>"+ (new Date().toLocaleString()) + "</td><td>"+command+"</td></tr>" );


  $.post("http://127.0.0.1:1242/Api/Command/"+command, function(data, status){
    $("#ipc_log").find('tbody').append( "<tr><td>res</td><td>"+ (new Date().toLocaleString()) + "</td><td>"+JSON.stringify(data)+"</td></tr>" );
  });

  $("#log_form").scrollTop($("#log_form")[0].scrollHeight);
  setTimeout(function() {
    $("#log_form").scrollTop($("#log_form")[0].scrollHeight);
  }, 2000);
  

}

function sel_type(){
  let ipc_bots_inp = document.getElementById("ipc_bots_inp");
  if (sel_mode === "obo"){
    let ipc_command = document.getElementById("sel_type").innerText = "Range";
    sel_mode = "range";

  }else{
    let ipc_command = document.getElementById("sel_type").innerText = "One by One";
    sel_mode = "obo";

  }

  if (  ipc_bots_inp.value ){
    // console.log();
    ignore_all();
    ipc_bots_inp.value = "";
  }


}


function create_bots( loaded_from ){


  if (loaded_from === "local"){
    for (var key in accounts) {
      let steamID =  Object.is(accounts[key].steamID, undefined) ? "" : accounts[key].steamID;
      let avatarHash =  Object.is(accounts[key].avatarHash, undefined) ? "" : "url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/"+accounts[key].avatarHash + "_full.jpg')";
      let steamLevel =  Object.is(accounts[key].steamLevel, undefined) ? "!" : accounts[key].steamLevel;

      if (accounts[key].Enabled === false){$('div#content').append('<span data-bot-name="'+key+'" data-bot-steamID="'+ steamID+'" class="bot bot_dissabled" id="bot_'+key+'" style='+ '"' + "background-image: " + avatarHash + ";" + '"">'+
        '<span class="bot_name"> '+ key +' </span>'+
        '<span class="bot_sett bot_action"> &#x27B2; </span>'+
        '<span class="start bot_action"> &#9658; </span>'+
        '<span class="stop bot_action"> &#9724; </span>'+
        '<span class="level bot_action">' + steamLevel + '</span>'+
        '<span class="privacy bot_action"> P </span>'+
        '<span class="own_games bot_action"> G </span>'+
        '</span>');}
      else if (accounts[key].Paused === true ){$('div#content').append('<span data-bot-name="'+key+'" data-bot-steamID="'+steamID+'"  class="bot bot_paused" id="bot_'+key+'" style='+ '"' + "background-image: " + avatarHash + ";" + '"">'+
        '<span class="bot_name"> '+ key +' </span>'+
        '<span class="bot_sett bot_action"> &#x27B2; </span>'+
        '<span class="start bot_action"> &#9658; </span>'+
        '<span class="stop bot_action"> &#9724; </span>'+
        '<span class="level bot_action">' + steamLevel + '</span>'+
        '<span class="privacy bot_action"> P </span>'+
        '<span class="own_games bot_action"> G </span>'+
        '</span>');}
      else{$('div#content').append('<span data-bot-name="'+key+'" data-bot-steamID="'+steamID+'"  class="bot bot_acctive" id="bot_'+key+'" style='+ '"' + "background-image: " + avatarHash + ";" + '"">'+
        '<span class="bot_name"> '+ key +' </span>'+
        '<span class="bot_sett bot_action"> &#x27B2; </span>'+
        '<span class="start bot_action"> &#9658; </span>'+
        '<span class="stop bot_action"> &#9724; </span>'+
        '<span class="level bot_action">' + steamLevel + '</span>'+
        '<span class="privacy bot_action"> P </span>'+
        '<span class="own_games bot_action"> G </span>'+
        '</span>');}
    }
  }
}


function get_ipc_bots(warn, update){
 var xmlhttp = new XMLHttpRequest();
  // try{
   xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var res = JSON.parse(this.responseText);
     ipc_bot_config = true;
     accounts_ASF_prev = accounts_ASF;
     accounts_ASF = res.Result;
     
     delete accounts_ASF.minimal;
     delete accounts_ASF.example;
     // console.log(accounts_ASF);
     document.getElementById("asf_app").style.display = "none";
     if (local_bot_config || update){
      for (var key in accounts_ASF) {
        if (accounts_ASF[key].IsConnectedAndLoggedOn === true &&  ( key !== "minimal" && key !== "example" )){
          if(!$("#bot_" + key).hasClass("bot_ready")){
            var element = document.getElementById("bot_" + key);
            element.classList.add("bot_ready");
            element.style.backgroundImage = "url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/" + accounts_ASF[key].AvatarHash + "_full.jpg')"
          }
        }else{
          var element = document.getElementById("bot_" + key);
          element.classList.remove("bot_ready");
        }

      }
      // console.log("UPDATE BOTS!");
      // console.log("Will check for ASF IPC changes in 15s");
      setTimeout(function(){ get_ipc_bots(false, true); }, 15000);

    }
    else{
      for (var key in accounts_ASF) {
        if (accounts_ASF[key].IsConnectedAndLoggedOn === false &&  ( key !== "minimal" && key !== "example" )){$('div#content').append(
          '<span data-bot-name="'+key+'" data-bot-steamID="'+key.s_SteamID+'" class="bot bot_dissabled" id="bot_'+key+'">'+
          '<span class="bot_name"> '+ key +' </span>'+
          '<span class="bot_sett bot_action"> &#x27B2; </span>'+
          '<span class="start bot_action"> &#9658; </span>'+
          '<span class="stop bot_action"> &#9724; </span>'+
          '<span class="level bot_action">' + "!" + '</span>'+
          


          '</span>');}
          else if (key !== "minimal" && key !== "example" ){$(
            'div#content').append('<span data-bot-name="'+key+'" data-bot-steamID="'+accounts_ASF[key].s_SteamID+'"  class="bot bot_ready" id="bot_'+key+'" style="' + "background-image: url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/" + accounts_ASF[key].AvatarHash + "_full.jpg'); " + '"">'+
            '<span class="bot_name"> '+ key +' </span>'+
            '<span class="bot_sett bot_action"> &#x27B2; </span>'+
            '<span class="start bot_action"> &#9658; </span>'+
            '<span class="stop bot_action"> &#9724; </span>'+
            '<span class="level bot_action">' +  "!" + '</span>'+

            '</span>');}
          }
          setTimeout(function(){ get_ipc_bots(false,true); }, 15000);
        }

      }
    };
    xmlhttp.onerror = function(e){
      if (warn===true) {error("ASF not running or ASF IPC is inaccessible!");}
      setTimeout(function(){ get_ipc_bots(false); }, 30000);
      console.log("Will check for ASF IPC in 30s");
      ipc_bot_config = false;
    };
    xmlhttp.open("GET", "http://127.0.0.1:1242/Api/Bot/ASF", true);
    xmlhttp.send();

  }


  function mini_full(){
    let my_id = document.getElementById("after_css");
        if ( my_id.href.indexOf('css/blank.css') >= 0 ){
      my_id.href = "./css/mini.css";
    }else{
      my_id.href = "./css/blank.css";
    }

  }