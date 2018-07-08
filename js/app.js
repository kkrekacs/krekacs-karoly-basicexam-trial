// ide deklaráljátok a függvényeket.
function getIntegerValue(parameterObjectProperty) {
  if (typeof parameterObjectProperty === 'object') {
    return 0;
  }
  return parseInt(parameterObjectProperty, 10);
}

function doAdvancedBubbleSortByKey(parameterArray, parameterKey) {
  var index = parameterArray.length - 1;
  var switched;
  while (index > 0) {
    switched = 0;
    for (var i = 0; i < index; i++) {
      if (getIntegerValue(parameterArray[i][parameterKey]) > getIntegerValue(parameterArray[i + 1][parameterKey])) {
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

function doChangeNullPropertiesToUnknown(parameterArray) {
  var objectKeys = Object.keys(parameterArray[0]);
  for (var i = 0; i < parameterArray.length; i++) {
    for (var j = 0; j < objectKeys.length; j++) {
      if (typeof parameterArray[i][objectKeys[j]] === 'object') {
        parameterArray[i][objectKeys[j]] = 'unknown';
      }
    }
  }
}

function doObjectArrayToString(parameterArray) {
  var output = 'A hajók listája:\n\n';
  var objectKeys = Object.keys(parameterArray[0]);
  for (var i = 0; i < parameterArray.length; i++) {
    for (var j = 0; j < objectKeys.length; j++) {
      output += `${objectKeys[j]}: ${parameterArray[i][objectKeys[j]]}\n`;
    }
    output += '\n';
  }

  return output;
}

function doCountShipsWithSingleCrew(parameterArray) {
  var shipCount = 0;
  for (var i = 1; i < parameterArray.length; i++) {
    if (parameterArray[i].crew === '1') {
      shipCount++;
    }
  }

  return shipCount;
}

function getBiggestCargoShip(parameterArray) {
  var biggestCargo = parseInt(parameterArray[0].cargo_capacity, 10);
  var index = 0;
  for (var i = 1; i < parameterArray.length; i++) {
    if (biggestCargo < parseInt(parameterArray[i].cargo_capacity, 10)) {
      biggestCargo = parameterArray[i].cargo_capacity;
      index = i;
    }
  }

  return parameterArray[index].model;
}

function getTotalPAssengerCount(parameterArray) {
  var totalPassengers = 0;
  for (var i = 0; i < parameterArray.length; i++) {
    if (!isNaN(parseInt(parameterArray[i].passengers, 10))) {
      totalPassengers += parseInt(parameterArray[i].passengers, 10);
    }
  }

  return totalPassengers;
}

function getLongestShipImgName(parameterArray) {
  var index = 0;
  var longestShip = parseInt(parameterArray[0].lengthiness, 10);
  for (var i = 1; i < parameterArray.length; i++) {
    if (longestShip < parseInt(parameterArray[i].lengthiness, 10)) {
      longestShip = parseInt(parameterArray[i].lengthiness, 10);
      index = i;
    }
  }

  return parameterArray[index].image;
}

function getObjectToString(parameterObject) {
  var objectKeys = Object.keys(parameterObject);
  var output = '';
  for (var i = 0; i < objectKeys.length; i++) {
    output += `${objectKeys[i]}: ${parameterObject[objectKeys[i]]}\n`;
  }

  return output;
}

function getShipByName(parameterArray, parameterName) {
  for (var i = 0; i < parameterArray.length; i++) {
    if (parameterArray[i].model.toUpperCase().indexOf(parameterName.toUpperCase()) > -1) {
      return parameterArray[i];
    }
  }

  return {value: 'A keresett űrhajó nem található'};
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

  /* 3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra */
  doChangeNullPropertiesToUnknown(userDatas);

  /* 4. Írasd ki így kapott hajók adatait. */
  console.log(doObjectArrayToString(userDatas));

  /* 5. Készítened kell egy statisztikát, mely kiírja a következő statisztikai adatokat:
  * Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
  * A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
  * Az összes hajó utasainak (passengers) összesített száma
  * A leghosszabb(lengthiness) hajó képének a neve */
  console.log(`Egy fős legénységgel rendelkező hajók darabszáma: ${doCountShipsWithSingleCrew(userDatas)}`);
  console.log(`A legnagyobb cargo_capacity-vel rendelkező hajó neve: ${getBiggestCargoShip(userDatas)}`);
  console.log(`Az összes hajó utasainak összesített száma: ${getTotalPAssengerCount(userDatas)}`);
  console.log(`A leghosszabb hajó képének a neve: ${getLongestShipImgName(userDatas)}`);

  /* 6. Legyen lehetőség a hajókra rákeresni _model_ szerint. (logaritmikus/binary sort)
  * A keresett nevet paraméterként kapja a függvényed.
  * A keresés nem case sensitive
  * Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
  * Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
  * Írasd ki a hajó adatait. */
  console.log('A keresett űrhajó:');
  console.log(getObjectToString(getShipByName(userDatas, 'X-W')));
}
getData('/json/spaceships.json', successAjax);
