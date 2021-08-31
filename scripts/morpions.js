var cases = new Array();
var joueurAc = 1;
var isGagne = 0;

$(document).ready(function() {
    nouvellePartie();
    
    $("#plateau td").click(function() {
        var imgId = $(this).children("img").attr("id");
        var x = parseInt(imgId.replace("case", "").substring(0,1));
        var y = parseInt(imgId.replace("case", "").substring(1));
        
        jouerCase(x,y);        
    });
});

function nouvellePartie() {
    cases = new Array(3);

    for (var i = 0; i < cases.length; i++) {
        cases[i] = new Array(0, 0, 0);
    }

    joueurAc = 1;
    isGagne = 0;
    initPlateau();
}

function initPlateau() {
    $("#plateau img[id^='case']").each(function() {        
        changeImage($(this).attr('id'), "images/joueur0.gif");
    });
}

function jouerCase(x, y) {
    if (isGagne == 1) {
        return recommence();
    }

    if (cases[x][y] != 0) {
        return rejouer();
    }

    cases[x][y] = joueurAc;
    placeSymbole(x, y, joueurAc);

    if (testGagne(x, y)) {
        return gagne();
    }

    joueurAc *= -1;
    testNul();
}

function recommence() {    
    alert("Veuillez cliquer sur nouvelle partie pour recommencer.", '');
}

function rejouer() {
    alert("Cette case n'est pas vide.  Veuillez en sélectionner une autre", '');
}

function placeSymbole(x, y, joueur) {
    changeImage("case" + x + y, "images/joueur" + joueur + ".gif");
}

function gagne() {
    isGagne = 1;
    gagneMessage();
}

function gagneMessage() {
    alert("Bravo !!",'');
}

function testNul() {
    for (var i = 0; i < cases.length; i++) {
        for (var j = 0; j < cases[i].length; j++) {
            if (cases[i][j] == 0) {
                return;
            }
        }
    }

    isGagne = 1;
    nul();
}

function nul() {
    $.alert("Match nul !", '');
}

function testGagne(x, y) {
    if ((testV(x, y) == 3) || (testH(x, y) == 3) || (testD1(x, y) == 3) || (testD2(x, y) == 3)) {
        return true;
    }
    else {
        return false;
    }
}

function testH(x, y) {
    return testHPos(x, y) + testHNeg(x, y) + 1;
}

function testHPos(x, y) {
    if (x > cases.length - 2) {
        return 0;
    }
    if (cases[x + 1][y] == joueurAc) {
        return (testHPos(x + 1, y) + 1);
    }
    else {
        return 0;
    }
}

function testHNeg(x, y) {
    if (x < 1) {
        return 0;
    }

    if (cases[x - 1][y] == joueurAc) {
        return (testHNeg(x - 1, y) + 1);
    }
    else {
        return 0;
    }
}

function testV(x, y) {
    return (testVPos(x, y) + testVNeg(x, y) + 1);
}

function testVPos(x, y) {
    if (y > cases[x].length - 2) {
        return 0;
    }

    if (cases[x][y + 1] == joueurAc) {
        return (testVPos(x, y + 1) + 1);
    }
    else {
        return 0;
    }
}

function testVNeg(x, y) {
    if (y < 1) {
        return 0;
    }

    if (cases[x][y - 1] == joueurAc) {
        return (testVNeg(x, y - 1) + 1);
    }
    else {
        return 0;
    }
}

function testD1(x, y) {
    return (testD1Pos(x, y) + testD1Neg(x, y) + 1);
}

function testD1Pos(x, y) {
    if (y > cases[x].length - 2 || (x > cases.length - 2)) {
        return 0;
    }

    if (cases[x + 1][y + 1] == joueurAc) {
        return (testD1Pos(x + 1, y + 1) + 1);
    }
    else {
        return 0;
    }
}

function testD1Neg(x, y) {
    if ((y < 1) || (x < 1)) {
        return 0;
    }

    if (cases[x - 1][y - 1] == joueurAc) {
        return (testD1Neg(x - 1, y - 1) + 1);
    }
    else {
        return 0;
    }
}

function testD2(x, y) {
    return (testD2Pos(x, y) + testD2Neg(x, y) + 1);
}

function testD2Pos(x, y) {
    if ((y < 1) || (x > cases.length - 2)) {
        return 0;
    }

    if (cases[x + 1][y - 1] == joueurAc) {
        return (testD2Pos(x + 1, y - 1) + 1);
    }
    else {
        return 0;
    }
}

function testD2Neg(x, y) {
    if ((y > cases[x].length - 2) || (x < 1)) {
        return 0;
    }

    if (cases[x - 1][y + 1] == joueurAc) {
        return (testD2Neg(x - 1, y + 1) + 1);
    }
    else {
        return 0;
    }
}
