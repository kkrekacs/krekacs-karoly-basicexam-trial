// ide deklaráljátok a függvényeket.
function doAdvancedBubbleSortByKey(parameterArray, parameterKey) {
  var index = parameterArray.length;
  while (index > 1) {
    var switched = 0;
    for (var i = 0; i < index - 1; i++) {
      if (parseInt(parameterArray[i][parameterKey], 10) > parseInt(parameterArray[i + 1][parameterKey], 10)) {
        [parameterArray[i], parameterArray[i + 1]] = [parameterArray[i + 1], parameterArray[i]];
        switched = i;
      }
    }
    index = switched;
  }
}

function doRemoveConsumablesWithNull(parameterArray) {
  var endIndex = parameterArray.length;
  for (var i = 0; i < endIndex;  i++) {
    if (parameterArray[i].consumables === null) {
      parameterArray.splice(i, 1);
      i--;
      endIndex--;
    }
  }
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  /* 1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble) */
  doAdvancedBubbleSortByKey(userDatas, 'cost_in_credits');

  /* 2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL.
  Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!! */
  doRemoveConsumablesWithNull(userDatas);
  console.log(userDatas);
}
getData('/json/spaceships.json', successAjax);
