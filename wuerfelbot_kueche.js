// ------ wuerfelbot_<RaumNAme>.js --------
// ------------------------------ javascript ------------------------------
'use strict';

//author: (C) 2021 Joerg Liszkowski
 

// ------- constanten -------
var RaumName='kueche'
// ---  timerReqGameData: sonst nichts los => alle 333ms bei Server nachfragen ---
var timerReqGameData = 0 ; // 10 * 30 frames/s = 333ms
var commitZahlerstandWuerfel = 0;

/*
// --------------------------------------------------------------------- 
//  Server nach neuen Daten fragen  --- hier kommen die Antworten an
// --------------------------------------------------------------------- 
// === Anfrage: ===  
// Commit Zähler
// === Antwort ist: ===
// Commit Zählerstand ; Würfelstring ; Würfelstring ; Würfelstring
// mit: Würfel String: "Fstring" mit F=Farbe, dann Ergebnis als String 
var reqGameData = new XMLHttpRequest();
reqGameData.addEventListener('load', reqGameData_callback);
function reqGameData_callback() {
	if (reqGameData.status >= 200 && reqGameData.status < 300) {
		console.log(reqGameData.responseText);
		var stSplit = reqGameData.responseText.split(";");
		if(stSplit.length==4  ) {
			if(stSplit[0]>0) { // Würfel Daten erhalten (sont ist der Commitzäher == 0
				commitZahlerstandWuerfel = stSplit[0];
				//console.log(stSplit[4]) // stSplit[4] // Daten Würfel
				console.log(stSplit[1]) // stSplit[4] // Daten Würfel
				console.log(stSplit[2]) // stSplit[4] // Daten Würfel
				console.log(stSplit[3]) // stSplit[4] // Daten Würfel
			}
		}
	} else {
		console.warn(reqGameData.statusText, reqGameData.responseText);
	}
};
//  Server nach neuen Daten fragen
var daten = commitZahlerstandWuerfel; //  +";";
reqGameData.open("POST","reqWuerfelBot_kueche.php"); // PHP Version
reqGameData.send(daten);
// Antwort in Callback Funktion
*/

// --------------------------------------------------------------------- 
// returns a random number between min and max (both included):
// --------------------------------------------------------------------- 
function getRndInteger( max) {
	var min = 1
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// ---------------------------------------------------------------------
//   MAIN 
// ---------------------------------------------------------------------


// ------- willkommentext in Chat schrieben -------

WA.sendChatMessage('Willkommen', 'Würfelbot_Küche');
WA.sendChatMessage('schrieb im Chat >>#1w20<< oder >>#3w6<<', 'Würfelbot_Küche');

// ---------------------------------------------------------------------
// ------- Callback um den in Chat mitzulesen -------
// ---------------------------------------------------------------------
WA.onChatMessage((message => {
    console.log('The user typed a message', message);
    
	var wuerfelAnz =0;
	var wuerfelArt =0;
	var wurfsumme=0; var wurf=0;
	// --- Nutzer Fragen ---
	var antwMitW = message.split('W',2);
	var antwMitw = message.split('w',2);
	var antwMitD = message.split('D',2);
	var antwMitd = message.split('d',2);
	if(antwMitW.length==2) {
		 wuerfelAnz = antwMitW[0] ; wuerfelArt = antwMitW[1];
	}
	if(antwMitw.length==2) {
		 wuerfelAnz = antwMitw[0] ; wuerfelArt = antwMitw[1];
	}
	if(antwMitD.length==2) {
		 wuerfelAnz = antwMitD[0] ; wuerfelArt = antwMitD[1];
	}
	if(antwMitd.length==2) {
		 wuerfelAnz = antwMitd[0] ; wuerfelArt = antwMitd[1];
	}
	// --- hier wird gewürfelt ---
	if (wuerfelArt>0 && wuerfelArt<101 && wuerfelAnz>0 && wuerfelAnz<21 ) {
		// Würfelart und Anzahl ist OK
		wuerfelstr = wuerfelstr + wuerfelAnz +'w'+ wuerfelArt +':';
		for (var i=0;i<wuerfelAnz;i++) {
			wurf=getRndInteger(wuerfelArt);
			wurfsumme=wurfsumme+wurf;
			wuerfelstr = wuerfelstr + ', '+ wurf;
		};
		wuerfelstr = wuerfelstr + ' = '+ wurfsumme;
		// echo
		WA.sendChatMessage( wuerfelstr, 'Würfelbot_Küche');

/*
		// ------- Daten an den Server senden ------- 
		var daten = 'd;'+ wuerfelstr  // Type "d" + Würfel string versenden
		setGameData.open("POST","webRPG_setGameData.php"); // PHP Version
		// setGameData.open("POST","../setGameData"); // GOlang Version
		setGameData.send(daten);
*/
	} //endif (wuerfelArt>0 && wuerfelArt<101 && wuerfelAnz>0 && wuerfelAnz<21 ) 
	// --- Fatewürfel "f" oder "F"
	if ( (wuerfelArt=="f" || wuerfelArt=="F") && wuerfelAnz>0 && wuerfelAnz<21 ) {
		// Würfelart und Anzahl ist OK
		wuerfelstr = wuerfelstr + wuerfelAnz +'wF:';
		for (var i=0;i<wuerfelAnz;i++) {
			wurf=getRndInteger(3);
			wurfsumme=wurfsumme+wurf-2;
			if(wurf==1) { wuerfelstr = wuerfelstr + ', -'; }
			if(wurf==2) { wuerfelstr = wuerfelstr + ', o'; }
			if(wurf==3) { wuerfelstr = wuerfelstr + ', +'; }
		};
		wuerfelstr = wuerfelstr + ' = '+ wurfsumme;
		// echo
		WA.sendChatMessage( wuerfelstr, 'Würfelbot_Küche');
/*
		// ------- Daten an den Server senden ------- 
		var daten = 'd;'+ wuerfelstr  // Type "d" + Würfel string versenden
		setGameData.open("POST","webRPG_setGameData.php"); // PHP Version
		// setGameData.open("POST","../setGameData"); // GOlang Version
		setGameData.send(daten);
*/
	} //endif Fatewürfel
} //endif (antwort != null) 
};

    
})); // Ende Callback "WA.onChatMessage((message => {"


// ---------------------------------------------------------------------
// ------- 333ms timer um auf dem Server nach neuen Würfelwürfen nachzusehen -------

// ---------------------------------------------------------------------
// ------- Callback um auf dem Server nach neuen Würfelwürfen nachzusehen -------
// ---------------------------------------------------------------------


	
	// -----------------------------------------------------------------
	// --------------------- paint() -----------------
	// -----------------------------------------------------------------
				


/*
	
// --------------------------------------------------------------------- 
//  Komunikation mit dem Server --- aktuelle Position oder Würfelwert setzen
// --------------------------------------------------------------------- 
// Datenformat:
// 1.Ziele: "f" oder "d" je nachdem ob Figur oder Würfeldaten gesendet werden
// wenn "d": 2. Zeile: Sting der Würfeldaten
// Wenn "f": 2. Zeile: figurNr  Welche Figur wurde bewegt
// Wenn "f": 3. Zeile: Daten der Figur im Format zzXXXyyy : zz=Zoom ; xxx & yyy Position in Pixeln
var setGameData = new XMLHttpRequest();
setGameData.addEventListener('load', setGameData_callback);
function setGameData_callback() {
	if (setGameData.status >= 200 && setGameData.status < 300) {
			// console.log(setGameData.responseText);
	} else {
		console.warn(setGameData.statusText, setGameData.responseText);
	}
};
	

// --------------------------------------------------------------------- 
//  Würfelbot
// --------------------------------------------------------------------- 
function wuerfelBecher(wuerfel) {
	var wuerfelstr = wuerfel.farbe;
// ---------------------------------------------------------
function wuerfelDatenServer2Browser(wuerfel, wuerfelstr) {
// ---------------------------------------------------------
		var farbStr= 'style="color:'; // "background-color" oder "color"
		switch(wuerfelstr.substring(0,1) ) {
			case 'b': farbStr= farbStr+'#00F"'; wuerfelstr=wuerfelstr.substring(1); break; // blau
			case 'g': farbStr= farbStr+'#0D0"'; wuerfelstr=wuerfelstr.substring(1); break; // grün
			case 'r': farbStr= farbStr+'#D00"'; wuerfelstr=wuerfelstr.substring(1); break; // rot
			case 'y': farbStr= farbStr+'#DD0"'; wuerfelstr=wuerfelstr.substring(1); break; 
			case 'm': farbStr= farbStr+'#F0F"'; wuerfelstr=wuerfelstr.substring(1); break; 
			case 'c': farbStr= farbStr+'#0DD"'; wuerfelstr=wuerfelstr.substring(1); break; 
			case 'x': farbStr= farbStr+'#888"'; wuerfelstr=wuerfelstr.substring(1); break; // grau 
			case 'k': farbStr= farbStr+'#000"'; wuerfelstr=wuerfelstr.substring(1); break; // grau 
			default : farbStr= farbStr+'#000"'; break; // schwarz
		}
		// --- ausgabe ---
		var historie = wuerfel.dom.innerHTML;
		var historieNeu= '';
		var hist = historie.split('</div>');
		var histLen = 0;
		if (hist.length>0) { // System um jeweils nur 8 Zeilen auszugeben
			if(hist.length>8) { histLen=1; }; 
			for (var i=histLen; i<hist.length;i++) {
				historieNeu = historieNeu + hist[i] +'</div>';
			};
			// neuen Wert anfügen
			wuerfel.dom.innerHTML = historieNeu+'<div class="wuerfel" ' +farbStr+ '>' + wuerfelstr + '<br></div>';
		} else {
			wuerfel.dom.innerHTML = '<div class="wuerfel" ' +farbStr+' >' + wuerfelstr + '<br></div>';
		};
};

*/
