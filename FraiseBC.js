// ==UserScript==
// @name FraiseBC
// @namespace https://www.bondageprojects.com/
// @version 2.3.1
// @description A various silly scripts that Fraise makes
// @author MaJaNamesuu
// @match http://localhost:*/*
// @match https://bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match https://bondageprojects.com/*
// @match https://www.bondageprojects.com/*
// @grant none
// @run-at document-end
// ==/UserScript==

const FrBCver = "2.3";
const FrBCver0 = "2.2";

var F_DataStore_FraiseKey = "fraise_datastore_";
var F_DataStore_scriptOn = false;

let fitemsOn;
let finteractionOn;
let fireignoreOn;
let fmaxzoomValue;
let fcheatkeyOn;
let spudfOn;
let fautostruggleOn;


function F_DataStore_initControls() {
	var datas = JSON.parse(localStorage.getItem(F_DataStore_FraiseKey + "_" + Player.MemberNumber));
	if (datas == null || datas == undefined) {
		fitemsOn = false;
		finteractionOn = false;
		fireignoreOn = false;
		fcheatkeyOn = false;
		spudfOn = false;
    fautostruggleOn = false;
		fmaxzoomValue = "";
	} else {
		fitemsOn = datas.fitemsOn;
		finteractionOn = datas.finteractionOn;
		fireignoreOn = datas.fireignoreOn;
		fcheatkeyOn = datas.fcheatkeyOn;
		spudfOn = datas.spudfOn;
		fmaxzoomValue = datas.fmaxzoomValue;
    fautostruggleOn = datas.fautostruggleOn;
	}
}

function F_DataStore_saveControls() {
	var controls = {
		"fitemsOn": fitemsOn,
		"finteractionOn": finteractionOn,
		"fireignoreOn": fireignoreOn,
		"fcheatkeyOn": fcheatkeyOn,
		"spudfOn": spudfOn,
		"fmaxzoomValue": fmaxzoomValue,
    "fautostruggleOn": fautostruggleOn
	};
	localStorage.setItem(F_DataStore_FraiseKey + "_" + Player.MemberNumber, JSON.stringify(controls));
}

function F_DataStore_deleteControls() {
	kp = 1;
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (key.startsWith(F_DataStore_FraiseKey) && key.endsWith(Player.MemberNumber)) {
			localStorage.removeItem(key);
		}
	}
}

let FDataStoreIsLoaded;

FDataStoreLoginListener();

async function FDataStoreLoginListener() {
	while (!FDataStoreIsLoaded) {
		try {
			while ((!window.CurrentScreen || window.CurrentScreen == "Login") && !FDataStoreIsLoaded) {
				//console.log("search for isLoaded");
				//console.log("window.CurrentScreen="+window.CurrentScreen);
				await new Promise(r => setTimeout(r, 2000));
			}
			//console.log("window.CurrentScreen="+window.CurrentScreen);
			//console.log("FDataStoreIsLoaded found");
			FDataStoreIsLoaded = true;
			F_DataStore_initControls();
			Player.FrBC = FrBCver;
			console.log("FraiseBC loaded: Version " + FrBCver + ":thumbsup:");
			Player.OnlineSharedSettings.FrBC = FrBCver;
			ServerAccountUpdate.QueueData({
				OnlineSharedSettings: Player.OnlineSharedSettings
			});
			if (fitemsOn == null || fitemsOn == undefined) {
				fitemsOn = false;
				F_DataStore_saveControls();
			}
			if (finteractionOn == null || finteractionOn == undefined) {
				finteractionOn = false;
				F_DataStore_saveControls();
			}
			if (fireignoreOn == null || fireignoreOn == undefined) {
				fireignoreOn = false;
				F_DataStore_saveControls();
			}
			if (fcheatkeyOn == null || fcheatkeyOn == undefined) {
				fcheatkeyOn = false;
				F_DataStore_saveControls();
			}
			if (spudfOn == null || spudfOn == undefined) {
				spudfOn = false;
				F_DataStore_saveControls();
			}
			if (fmaxzoomValue == null || fmaxzoomValue == undefined || fmaxzoomValue == "") {
				fmaxzoomValue = 7;
				F_DataStore_saveControls();
			}
      if (fautostruggleOn == null || fautostruggleOn == undefined) {
				fautostruggleOn = false;
				F_DataStore_saveControls();
			}
			ini = 1;
			FraiseCommandToggles();
		} catch (err) {
			console.log(err);
		}
		await new Promise(r => setTimeout(r, 2000));
	}
}


function showfitemsStatus() {
	let msg;
	if (fitemsOn) {
		msg = "/fitems is ++on++.";
	} else {
		msg = "/fitems is --off--.";
	}
	F_DataStore_sendMessageToWearer(msg);
}
function showfinteractionStatus() {
	let msg;
	if (finteractionOn) {
		msg = "/finteraction is ++on++.";
	} else {
		msg = "/finteraction is --off--.";
	}
	F_DataStore_sendMessageToWearer(msg);
}
function showfireignoreStatus() {
	let msg;
	if (fireignoreOn) {
		msg = "/fireignore is ++on++.";
	} else {
		msg = "/fireignore is --off--.";
	}
	F_DataStore_sendMessageToWearer(msg);
}
function showfcheatkeyStatus() {
	let msg;
	if (fcheatkeyOn) {
		msg = "/fcheatkey is ++on++.";
	} else {
		msg = "/fcheatkey is --off--";
	}
	F_DataStore_sendMessageToWearer(msg);
}
function showspudfStatus() {
	let msg;
	if (spudfOn) {
		msg = "/sasauspermanentundeafen is ++on++.";
	} else {
		msg = "/sasauspermanentundeafen is --off--.";
	}
	F_DataStore_sendMessageToWearer(msg);
}
function showfautostruggleStatus() {
  if (fautostruggleOn) {
		msg = "/fautostruggle is ++on++.";
	} else {
		msg = "/fautostruggle is --off--";
	}
	F_DataStore_sendMessageToWearer(msg);
}
function showfmaxzoomStatus() {
	let msg;
	if (fmaxzoomValue == null && fmaxzoomValue == undefined) {
		msg = "Zoom limit is set to 7";
	} else {
		msg = "Zoom limit is set to " + fmaxzoomValue;
	}
	F_DataStore_sendMessageToWearer(msg);
}


function F_DataStore_sendMessageToWearer(msg) {
	ServerSend("ChatRoomChat", {
		Type: "Action",
		Content: "gag",
		Target: Player.MemberNumber,
		Dictionary: [{
			Tag: "gag",
			Text: msg
		}],
	});
}


CommandCombine([{
	Tag: 'fitems',
	Description: ": allows to equip restraints under other restraints.",
	Action: () => {
		if (fitemsOn === true) {
			fitemsOn = false;
			F_DataStore_saveControls();
            ChatRoomSendLocal(
			"<p style='background-color:#884571'><b>FraiseBC</b>: You can no longer equip restraints under other restraints.</p>"
            );
		} else {
			fitemsOn = true;
			F_DataStore_saveControls();
            ChatRoomSendLocal(
			"<p style='background-color:#884571'><b>FraiseBC</b>: You can now equip restraints under other restraints.</p>"
            );
		}
		FraiseCommandToggles();
	}
}])

CommandCombine([{
	Tag: 'fireignore',
	Description: ": allows to ignore item-specific restrictions",
	Action: () => {
		if (fireignoreOn === true) {
			fireignoreOn = false;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: You now ignore item-specific restrictions.</p>"
			);
		} else {
			fireignoreOn = true;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: You no longer ignore item-specific restrictions.</p>"
			);
		}
		FraiseCommandToggles();
	}
}])

CommandCombine([{
	Tag: 'fmaxzoom',
	Description: "(number): allows to change max zoom on map rooms.",
	Action: (args) => {
		var plx = args
		if ((args > -1) && (args < 51)) {
			fmaxzoomValue = plx;
			F_DataStore_saveControls();
			FraiseCommandToggles();
			ChatRoomSendLocal(
				`<p style='background-color:#884571'><b>FraiseBC</b>: Max map zoom is set to ${plx}.</p>`
			);
		} else {
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: Max map zoom must be a value between 0 and 50.</p>"
			);
		}
	}
}])

CommandCombine([{
	Tag: 'fhelp',
	Description: "displays the FraiseBC commands.",
	Action: () => {
		ChatRoomSendLocal(
			"<p style='background-color:#884571'><b>FraiseBC</b>: The help is organized so you do not forget them commands! List of commands:\n" +
			"<b>froom</b> = gives infos about FrBC users in current chat room\n" +
			"<b>fitems</b> = allows to equip restraints under other restraints.\n" +
			"<b>fireignore</b> = allows to ignore item-specific restrictions.\n" +
			"<b>fmaxzoom</b> (number) = allows to change max zoom on map rooms.\n" +
			"<b>finteraction</b> = allows to interact regardless of equipped restraints.\n" +
			"<b>fcheatkey</b> = allows allows to unlock (almost) any lock.\n" +
			"<b>fstatus</b> = displays status of FraiseBC settings.\n" +
			"<b>fenall</b> = enables all toggleable scripts On and Off</p>"
		);
	}
}])


CommandCombine([{
	Tag: 'finteraction',
	Description: ": allows to interact regardless of equipped restraints.",
	Action: () => {
		if (finteractionOn === true) {
			finteractionOn = false;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: You can no longer interact with restraints while being restrained.</p>"
			);
		} else {
			finteractionOn = true;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: You can now interact with restraints while being restrained.</p>"
			);
		}
		FraiseCommandToggles();
	}
}])

CommandCombine([{
	Tag: 'fcheatkey',
	Description: ": allows to unlock (almost) any lock.",
	Action: () => {
		if (fcheatkeyOn === true) {
			fcheatkeyOn = false;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: fcheatkey is no longer active.</p>"
			);
		} else {
			fcheatkeyOn = true;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: fcheatkey is now active.</p>"
			);
		}
		FraiseCommandToggles();
	}
}])

CommandCombine([{
	Tag: 'fstatus',
	Description: ": displays status of FraiseBC settings.",
	Action: () => {
		showfitemsStatus();
		showfinteractionStatus();
		showfireignoreStatus();
		showfcheatkeyStatus();
		//sasaus permanent undeafen
		showspudfStatus();
    showfautostruggleStatus();
		showfmaxzoomStatus();
	}
}])

CommandCombine([{
	Tag: 'sasauspermanentundeafen',
	Description: ": as per request.",
	Action: () => {
		if (spudfOn === true) {
			spudfOn = false;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#81031b'><b>FraiseBC</b>: You are now back to defaults when it comes to hearing</p>"
			)
		} else {
			spudfOn = true;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#81031b'><b>FraiseBC</b>: You now 100% ignore all deafening effects.</p>"
			)
		}
		FraiseCommandToggles();
	}
}])

CommandCombine([{
	Tag: 'fenall',
	Description: ": enables all toggles from FraiseBC.",
	Action: () => {
		if (fitemsOn === true && fireignoreOn === true && finteractionOn === true && fcheatkeyOn === true) {
			fitemsOn = false;
			finteractionOn = false;
			fireignoreOn = false;
			fcheatkeyOn = false;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#81031b'><b>FraiseBC</b>: Every toggle is set to <b><i>--OFF--</i></b></p>"
			)
		} else {
			fitemsOn = true;
			finteractionOn = true;
			fireignoreOn = true;
			fcheatkeyOn = true;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#81031b'><b>FraiseBC</b>: Every toggle is set to <b><i>++ON++</i></b></p>"
			)
		}
		FraiseCommandToggles();
	}
}])

CommandCombine([{
	Tag: 'froom',
	Description: ": gives infos about FrBC users in current chat room.",
	Action: () => {
		let pl = 0;
		while (pl < ChatRoomCharacter.length) {
			if ((ChatRoomCharacter[pl].Nickname == '') || (ChatRoomCharacter[pl].Nickname == undefined)) {
				var name = ChatRoomCharacter[pl].Name;
				var aka = "";
			} else {
				var name = ChatRoomCharacter[pl].Nickname;
				var aka = ChatRoomCharacter[pl].Name;
			}
			var number = ChatRoomCharacter[pl].MemberNumber;
			if ((ChatRoomCharacter[pl].OnlineSharedSettings.FrBC == FrBCver) || (ChatRoomCharacter[pl].OnlineSharedSettings.FrBC == FrBCver0)) {
				var mes1 = "<u><b>Is a FraiseBC user.</b></u>";
				ChatRoomSendLocal(name + " (" + aka + ") - " + number);
				ChatRoomSendLocal(mes1);
				ChatRoomSendLocal(" ");
			}
			pl++;
		}
	}
}])

CommandCombine([{
	Tag: 'fautostruggle',
	Description: ": allows to essentially bypass struggling(sets difficulty to 6 regardless of restraint).",
	Action: () => {
		if (fautostruggleOn === true) {
			fautostruggleOn = false;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: Struggling is set back to how it was</p>"
			)
		} else {
			fautostruggleOn = true;
			F_DataStore_saveControls();
			ChatRoomSendLocal(
				"<p style='background-color:#884571'><b>FraiseBC</b>: Difficulty of removing restraints is now 6.</p>"
			)
		}
		FraiseCommandToggles();
	}
}])

function FraiseCommandToggles() {
	if (fitemsOn) {
	 InventoryGroupIsBlocked = function(C, GroupName) {
			return false;
		}
	} else {
		InventoryGroupIsBlocked = function(C, GroupName, Activity) {

		  // Checks for regular blocks
		  if (InventoryGroupIsBlockedForCharacter(C, GroupName, Activity)) return true;

		  // Check for map range
		  if (InventoryIsBlockedByDistance(C)) return true;

		  // If the player is enclosed, all groups for another character are blocked
		  if ((!C.IsPlayer()) && Player.IsEnclose()) return true;

		  // Checks if there's an owner rule that blocks the group
		  if (InventoryGroupIsBlockedByOwnerRule(C, GroupName)) return true;

		  // Nothing is preventing the group from being used
		  return false;
		}
	}
	if (finteractionOn) {
		Player.CanInteract = function() {
			return true;
		}
	} else {
		Player.CanInteract = function () {
			return !this.HasEffect("Block");
		}
	}
  if (fautostruggleOn) {
      StruggleStrengthGetDifficulty = function(C, PrevItem, NextItem) {
      var S = 0;
      if (PrevItem != null) {
        S = S + PrevItem.Difficulty-6;
        if (PrevItem.Difficulty != null) S = S - PrevItem.Difficulty;
        if ((PrevItem.Property != null) && (PrevItem.Property.Difficulty != null)) S = S - PrevItem.Property.Difficulty;
      }

      var Timer = 0;
      if ((PrevItem != null) && (PrevItem.Asset != null) && (PrevItem.Asset.RemoveTime != null)) Timer = Timer + PrevItem.Asset.RemoveTime;
      if ((NextItem != null) && (NextItem.Asset != null) && (NextItem.Asset.WearTime != null)) Timer = Timer + NextItem.Asset.WearTime;
      if (Player.IsBlind() || Player.IsSuspended()) Timer = Timer * 2;
      if (InventoryCraftPropertyIs(PrevItem, "Malleable") || InventoryCraftPropertyIs(NextItem, "Malleable")) Timer = Timer * 0.5;
      if (InventoryCraftPropertyIs(PrevItem, "Rigid") || InventoryCraftPropertyIs(NextItem, "Rigid")) Timer = Timer * 2;
      if (Timer < 1) Timer = 1;

      if ((PrevItem != null) && (NextItem == null) && InventoryItemHasEffect(PrevItem, "Lock", true) && DialogCanUnlock(C, PrevItem)) {
        var Lock = InventoryGetLock(PrevItem);
        if ((Lock != null) && (Lock.Asset != null) && (Lock.Asset.RemoveTime != null)) Timer = Timer + Lock.Asset.RemoveTime;
      }

      return {
        difficulty: S,
        auto: TimerRunInterval * (0.22 + (((S <= -10) ? -9 : S) * 0.11)) / (Timer * CheatFactor("DoubleItemSpeed", 0.5)),
        timer: Timer
      }
    }
    DialogStruggleStart = function(C, Action, PrevItem, NextItem) {
      if (ChatRoomStruggleData != null) StruggleChatRoomStop();
      ChatRoomStatusUpdate("Struggle");

      DialogStruggleAction = Action;
      DialogStruggleSelectMinigame = false;
      StruggleMinigameStart(C, "Strength", PrevItem, NextItem, DialogStruggleStop);
      DialogChangeMode("struggle");
      DialogMenuButtonBuild(C);
    }
  } else {
      StruggleStrengthGetDifficulty = function(C, PrevItem, NextItem) {
      var S = 0;
      if ((PrevItem != null) && (C.IsPlayer())) {
        S = S + SkillGetWithRatio(Player, "Evasion"); // Add the player evasion level (modified by the effectiveness ratio)
        if (PrevItem.Difficulty != null) S = S - PrevItem.Difficulty; // Subtract the item difficulty (regular difficulty + player that restrained difficulty)
        if ((PrevItem.Property != null) && (PrevItem.Property.Difficulty != null)) S = S - PrevItem.Property.Difficulty; // Subtract the additional item difficulty for expanded items only
      }
      if ((!C.IsPlayer()) || ((C.IsPlayer()) && (PrevItem == null))) S = S + SkillGetLevel(Player, "Bondage"); // Adds the bondage skill if no previous item or playing with another player
      if (Player.IsEnclose() || Player.IsMounted()) S = S - 2; // A little harder if there's an enclosing or mounting item
      if (InventoryItemHasEffect(PrevItem, "Lock", true) && !DialogCanUnlock(C, PrevItem)) S = S - 4; // Harder to struggle from a locked item

      // When struggling to remove or swap an item while being blocked from interacting
      if ((C.IsPlayer()) && !C.CanInteract() && (PrevItem != null)) {
        if (!InventoryItemHasEffect(PrevItem, "Block", true)) S = S - 4; // Non-blocking items become harder to struggle out when already blocked
        if ((PrevItem.Asset.Group.Name != "ItemArms") && InventoryItemHasEffect(InventoryGet(C, "ItemArms"), "Block", true)) S = S - 4; // Harder If we don't target the arms while arms are restrained
        if ((PrevItem.Asset.Group.Name != "ItemHands") && InventoryItemHasEffect(InventoryGet(C, "ItemHands"), "Block", true)) S = S - 4; // Harder If we don't target the hands while hands are restrained
        if ((PrevItem.Asset.Group.Name != "ItemMouth") && (PrevItem.Asset.Group.Name != "ItemMouth2") && (PrevItem.Asset.Group.Name != "ItemMouth3") && (PrevItem.Asset.Group.Name != "ItemHead") && (PrevItem.Asset.Group.Name != "ItemHood") && !C.CanTalk()) S = S - 2; // A little harder if we don't target the head while gagged
        if ((ChatRoomStruggleAssistTimer >= CurrentTime) && (ChatRoomStruggleAssistBonus >= 1) && (ChatRoomStruggleAssistBonus <= 6)) S = S + ChatRoomStruggleAssistBonus; // If assisted by another player, the player can get a bonus to struggle out
      }

      // Gets the standard time to do the operation
      var Timer = 0;
      if ((PrevItem != null) && (PrevItem.Asset != null) && (PrevItem.Asset.RemoveTime != null)) Timer = Timer + PrevItem.Asset.RemoveTime; // Adds the time to remove the previous item
      if ((NextItem != null) && (NextItem.Asset != null) && (NextItem.Asset.WearTime != null)) Timer = Timer + NextItem.Asset.WearTime; // Adds the time to add the new item
      if (Player.IsBlind() || Player.IsSuspended()) Timer = Timer * 2; // Double the time if suspended from the ceiling or blind
      if (InventoryCraftPropertyIs(PrevItem, "Malleable") || InventoryCraftPropertyIs(NextItem, "Malleable")) Timer = Timer * 0.5; // Half the time if the crafted item is malleable
      if (InventoryCraftPropertyIs(PrevItem, "Rigid") || InventoryCraftPropertyIs(NextItem, "Rigid")) Timer = Timer * 2; // Double the time if the crafted item is rigid
      if (Timer < 1) Timer = 1; // Nothing shorter than 1 second

      // If there's a locking item, we add the time of that lock
      if ((PrevItem != null) && (NextItem == null) && InventoryItemHasEffect(PrevItem, "Lock", true) && DialogCanUnlock(C, PrevItem)) {
        var Lock = InventoryGetLock(PrevItem);
        if ((Lock != null) && (Lock.Asset != null) && (Lock.Asset.RemoveTime != null)) Timer = Timer + Lock.Asset.RemoveTime;
      }

      return {
        difficulty: S,
        auto: TimerRunInterval * (0.22 + (((S <= -10) ? -9 : S) * 0.11)) / (Timer * CheatFactor("DoubleItemSpeed", 0.5)),
        timer: Timer
      }
    }
    DialogStruggleStart = function(C, Action, PrevItem, NextItem) {
      if (ChatRoomStruggleData != null) StruggleChatRoomStop();
      ChatRoomStatusUpdate("Struggle");
      const autoStruggle = (C != Player || PrevItem == null || ((PrevItem != null)
        && (!InventoryItemHasEffect(PrevItem, "Lock", true) || DialogCanUnlock(C, PrevItem))
        && ((Player.CanInteract() && !InventoryItemHasEffect(PrevItem, "Mounted", true))
          || StruggleStrengthGetDifficulty(C, PrevItem, NextItem).auto >= 0)));
      if (autoStruggle) {
        DialogStruggleAction = Action;
        DialogStruggleSelectMinigame = false;
        StruggleMinigameStart(C, "Strength", PrevItem, NextItem, DialogStruggleStop);
      } else {
        DialogStruggleAction = Action;
        DialogStrugglePrevItem = PrevItem;
        DialogStruggleNextItem = NextItem;
        DialogStruggleSelectMinigame = true;
      }
      DialogChangeMode("struggle");
      DialogMenuButtonBuild(C);
    }
  }
	if (fireignoreOn) {
		InventoryAllow = function(C, asset, prerequisites = asset.Prerequisite, setDialog = true, allowActivePose = asset.AllowActivePose) {
			return true;
		}
	} else {
		InventoryAllow = function(C, asset, prerequisites = asset.Prerequisite, setDialog = true, allowActivePose = asset.AllowActivePose) {
			// Prerequisite can be a string
			if (typeof prerequisites === "string") {
				prerequisites = [prerequisites];
			}

			// If prerequisite isn't a valid array, return true
			if (!CommonIsArray(prerequisites)) {
				return true;
			}

			// Create/load a simple character for prerequisite checking
			const checkCharacter = CharacterLoadSimple("InventoryAllow");
			checkCharacter.Appearance = C.Appearance.filter((item) => item.Asset.Group.Name !== asset.Group.Name);
			CharacterLoadEffect(checkCharacter);
			PoseRefresh(checkCharacter);

			let Msg = "";
			const posePrereq = /** @type {PosePrerequisite[]} */(prerequisites.filter(p => p.slice(3) in PoseRecord));
			if (posePrereq.length === 0) {
				prerequisites.some(prereq => (Msg = InventoryPrerequisiteMessage(checkCharacter, prereq, asset)));
			} else {
				// In the case of poses the `SetPose`-based prerequisite can fall back to any `AllowActivePose` member of the same category
				const poseMapping = PoseToMapping.Array(allowActivePose, "Assset.AllowActivePose");
				for (const prereq of prerequisites) {
					if (CommonIncludes(posePrereq, prereq)) {
						const setPose = PoseRecord[/** @type {AssetPoseName} */(prereq.slice(3))];
						const allowedActivePoses = [...(poseMapping[setPose.Category] || [setPose.Name]), ...(poseMapping.BodyFull || [])];
						const messages = allowedActivePoses.map(p => InventoryPrerequisiteMessage(checkCharacter, `Can${p}`, asset));
						if (messages.every(Boolean)) {
							Msg = messages[0];
						}
					} else {
						Msg = InventoryPrerequisiteMessage(checkCharacter, prereq, asset);
					}
					if (Msg) {
						break;
					}
				}
			}

			// If no error message was found, we return TRUE, if a message was found, we can show it in the dialog
			if (Msg && setDialog) DialogSetStatus(InterfaceTextGet(`Prerequisite${Msg}`), DialogTextDefaultDuration);
			return !Msg;
		}
	}
	if (fcheatkeyOn) {
		DialogHasKey = function(C, Item) {
			return true
		}
        DialogCanUnlock = function(C, Item) {
            return true
        }
	} else {
		DialogHasKey = function(C, Item) {
			if (InventoryGetItemProperty(Item, "SelfUnlock") == false && (!Player.CanInteract() || C.IsPlayer())) return false;
			if (C.IsOwnedByPlayer() && InventoryAvailable(Player, "OwnerPadlockKey", "ItemMisc") && Item.Asset.Enable) return true;
			const lock = InventoryGetLock(Item);
			if (lock && lock.Asset.FamilyOnly && Item.Asset.Enable && LogQuery("BlockFamilyKey", "OwnerRule") && Player.IsFullyOwned()) return false;
			if (C.IsLoverOfPlayer() && InventoryAvailable(Player, "LoversPadlockKey", "ItemMisc") && Item.Asset.Enable && Item.Property && Item.Property.LockedBy && !Item.Property.LockedBy.startsWith("Owner")) return true;
			if (lock && lock.Asset.ExclusiveUnlock) {
				// Locks with exclusive access (intricate, high-sec)
				const allowedMembers = CommonConvertStringToArray(Item.Property.MemberNumberListKeys);
				// High-sec, check if we're in the keyholder list
				if (Item.Property.MemberNumberListKeys != null) return allowedMembers.includes(Player.MemberNumber);
				// Intricate, check that we added that lock
				if (Item.Property.LockMemberNumber == Player.MemberNumber) return true;
			}
			let UnlockName = /** @type {EffectName} */("Unlock" + Item.Asset.Name);
			if ((Item.Property != null) && (Item.Property.LockedBy != null))
				UnlockName = /** @type {EffectName} */("Unlock" + Item.Property.LockedBy);
			for (let I = 0; I < Player.Inventory.length; I++)
				if (InventoryItemHasEffect(Player.Inventory[I], UnlockName)) {
					if (lock != null) {
						if (lock.Asset.LoverOnly && !C.IsLoverOfPlayer()) return false;
						if (lock.Asset.OwnerOnly && !C.IsOwnedByPlayer()) return false;
						if (lock.Asset.FamilyOnly && !C.IsFamilyOfPlayer()) return false;
						return true;
					} else return true;
				}
			return false;
		}
        DialogCanUnlock = function(C, Item) {
            if ((!C.IsPlayer()) && !Player.CanInteract()) return false;
            if ((Item != null) && (Item.Property != null) && (Item.Property.LockedBy === "ExclusivePadlock")) return (!C.IsPlayer());
            if (LogQuery("KeyDeposit", "Cell")) return false;
            if ((Item != null) && (Item.Asset != null) && (Item.Asset.OwnerOnly == true)) return Item.Asset.Enable && C.IsOwnedByPlayer();
            if ((Item != null) && (Item.Asset != null) && (Item.Asset.LoverOnly == true)) return Item.Asset.Enable && C.IsLoverOfPlayer();
            if ((Item != null) && (Item.Asset != null) && (Item.Asset.FamilyOnly == true)) return Item.Asset.Enable && C.IsFamilyOfPlayer();
            return DialogHasKey(C, Item);
        }

	}
	if (spudfOn) {
		function GetDeafLevel0() {
			let deafLevel = 0;
			return deafLevel;
		}
		GetDeafLevel0();
		Player.GetDeafLevel = GetDeafLevel0;
	} else {
		function GetDeafLevel0() {
            let deafLevel = 0;
            for (const item of Player.Appearance) {
                for (const [effect, level] of CharacterDeafLevels.entries()) {
                    if (InventoryItemHasEffect(item, effect)) {
                        deafLevel += level;
                        break; // Only count the highest deafness level defined on the item
                    }
                }
            }
            return deafLevel;
        }
    GetDeafLevel0();
	Player.GetDeafLevel = GetDeafLevel0;
	}
	if (fmaxzoomValue != null && fmaxzoomValue != undefined && fmaxzoomValue != "") {
		var plx = fmaxzoomValue;
		if ((plx > -1) && (plx < 51)) {
			ChatRoomMapViewPerceptionRangeMax = plx;
		}
	} else {
		var plx = 7;
		if ((plx > -1) && (plx < 51)) {
			ChatRoomMapViewPerceptionRangeMax = plx;
		}
	}
}
