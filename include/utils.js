//
////  Datoteka vsebuje dodatne funkcije
//

// Funkcija ki vrne ali je nek niz veljaven EMSO
function isEMSO(inputEMSO)
{
    if(inputEMSO.length !== "DDMMLLLRRZZZK".length || inputEMSO === "7777777777777")
    {
        return false;
    }
    // DDMMLLLRRZZZK
    // 765432765432
    var n = 7;
    var sum = 0;
    for (var i = 0; i < 12; i++)
    {
        var EMSOdigit = parseInt(inputEMSO.substring(i, i + 1));
        if(isNaN(EMSOdigit))
        {
            return false;
        }
        sum += n * EMSOdigit;
        n--;
        if(n < 2)
        {
            n = 7;
        }
    }
    var ostanek = sum % 11;
    var kontrola = 11 - ostanek;
    if (kontrola.toString() === inputEMSO.substring(12, 12 + 1))
    {
        return true;
    }
    return false;
}

// Funkcija emsoMatchesData primerja zbrane podatke z veljavno EMSO stevilko in vrne ujemanje
// register
//10-19 - Bosna in Hercegovina
//20-29 - Crna gora
//30-39 - Hrvaska 
//40-49 - Makedonija
//50-59 - Slovenija
//60-69 - (ni v uporabi)
//70-79 - Srbija 
//80-89 - Vojvodina
//90-99 - Kosovo
function emsoMatchesData(inputEMSO, day, month, year) // TO BE IMPLEMENTED , register, spol)
{
    if(isEMSO(inputEMSO) === false)
    {
        return false;
    }
    if 
    (
        inputEMSO.substring(0, 0 + 2) === day.toString() == false ||
        inputEMSO.substring(2, 2 + 2) === month.toString() == false ||
        inputEMSO.substring(4, 4 + 3) === year.toString().substring(1, 1 + 3) == false
    )
    {
        return false;
    }

    return true;
}

//
////  TEST SECTION
//

/*
var emso1 = "2902932505526";
// Test funkcije isEMSO
console.log("Veljavnost EMSO: " + isEMSO(emso1));

// Test funkcije emsoMatchesData
console.log("Se ujema: " + emsoMatchesData(emso1, 29, 2, 1933, 50, 0));
*/

/*
{
    0 student
    1 referntka
    2 skrbnik
}*/