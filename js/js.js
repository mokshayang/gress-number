// Computer random number
var computerNum = [];
var computerGuessBase = [];
var baseIndex = 0;
var cptIndex = 1;
var userInputNum = [];
var inputIndex = 0;
var guessCount = 0;

function guessNumber() {
    // User input number
    var numberInputPan = document.getElementsByClassName("numberInputPan")[0];
    numberInputPan.onkeyup = function (e) {
        var target = e.srcElement;
        if (/\D/g.test(target.value)) {
            target.value = target.value.replace(/\D/g, '');
        } else {
            var hasSameNumber = false;
            for (var i = 0; i < inputIndex; i++) {
                if (userInputNum[i] == target.value) {
                    hasSameNumber = true;
                    break;
                }
            } // for

            // console.log("has same number: " + hasSameNumber);
            if (hasSameNumber) {
                target.value = target.value.replace(/\d/g, '');
                // console.log("target.value: " + target.value);
                alert("Do not input the same digit!");
            } else {
                userInputNum[inputIndex] = target.value;
                inputIndex++;
                var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                var myLength = target.value.length;
                if (myLength >= maxLength) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                        if (next == null) {
                            break;
                        }

                        if (next.tagName.toLowerCase() == "input") {
                            next.focus();
                            break;
                        }
                    } // while
                } // if myLength >= maxLength

                if (inputIndex == 4) {
                    // if user input 4 non-repeated digit, then auto compare
                    displayGuessingResult();
                } // if already input 4 digit
            } // if hasSameNumber
        } // if not a number
    };
}

function computerNumber() {
    do {
        var tempValue = Math.floor((Math.random() * 10) % 9) + 1;
        var isSameNum = false;
        for (var i = 0; i < computerNum.length; i++) {
            if (tempValue == computerNum[i]) {
                isSameNum = true;
                break;
            }
        }; // for

        if (!isSameNum) {
            computerNum[cptIndex] = tempValue;
            cptIndex++;
        }
    } while (cptIndex < 4);
}
// 解答
$('#sol').on('click', () => {
    $('#result').text(computerNum)

})

function displayGuessingResult() {
    console.log("Computer random number: " + computerNum.toString());
    //console.log("User input number: " + userInputNum.toString());
    guessCount++;
    var countA = 0;
    var countB = 0;
    for (var k = 0; k < 4; k++) {
        if (userInputNum[k] == computerNum[k]) {
            countA++;
        }
    } // for



    //console.log("both the number AND the postion are CORRECT: " + countA);

    for (var l = 0; l < 4; l++) {
        for (var m = 0; m < 4; m++) {
            if (l != m && userInputNum[l] == computerNum[m]) {
                countB++;
                break;
            }
        }
    } // for
    //console.log("the correct number BUT in the WRONG spot: " + countB);

    // process page
    var guessTable = document.getElementById("guessTable");
    var guessTableLastIndex = guessTable.rows.length;
    //console.log("guessTable Last Index: " + guessTableLastIndex);
    var row = guessTable.insertRow(guessTableLastIndex);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = userInputNum.toString();
    cell2.innerHTML = "  第 " + guessCount + " 次猜測 ";
    cell3.innerHTML = countA + "A" + countB + "B";

    if (countA == 4) {
        document.getElementById("answerDiv").innerHTML = "電腦數字是：" + computerNum.toString();
        showCngrtsUserPan();
    } else
        cleanUserInput();
}

function cleanUserInput() {
    for (var k = 0; k < 4; k++) {
        document.getElementById("num" + k).value = "";
    } // for
    userInputNum = [];
    inputIndex = 0;
    document.getElementById("num0").focus();
}

function cleanResultTable() {
    var guessTable = document.getElementById("guessTable");
    //console.log(guessTable.rows.length);
    for (var i = guessTable.rows.length; 0 < i; i--) {
        guessTable.deleteRow(i - 1);
    }
}

function userGuesspPlayAgain() {
    $('#result').text('');
    cleanUserInput();
    cleanResultTable();
    // reset data
    cptIndex = 1;
    guessCount = 0;
    computerNum = [];
    computerNum[0] = Math.floor((Math.random() * 10) % 9) + 1;
    computerNumber();
    hideCngrtsUserPan();
    hideChangeToUserBtn();
    showChangeToComputerBtn();
    guessNumber();

    const element = document.querySelectorAll('.bi');
    element.forEach(function (e, index) {
        e.className = `bi bi-${index + 1}-square-fill`; // 将类名还原为初始状态
    });
}

function userGuessMode() {
    cleanUserInput();
    cleanResultTable();
    showUseInputPan();
    hideComputerGuessingPan();
    hideComputerRightPan();

    userGuesspPlayAgain();
}

function computerGuessMode() {
    cleanUserRespond();
    cleanResultTable();
    hideUseInputPan();
    hideCngrtsUserPan();
    showComputerGuessingPan();

    computerGuessPlayAgain();

}

function computerGuessPlayAgain() {

    cleanUserRespond();
    cleanResultTable();

    cptIndex = 1;
    guessCount = 0;
    computerNum = [];
    computerNum[0] = Math.floor((Math.random() * 10) % 9) + 1;
    computerGuessBase = [];
    baseIndex = 0;
    hideComputerRightPan();
    showChangeToUserBtn();
    hideChangeToComputerBtn();
    computerNumber();
    displayComputerGuess();
}

function cleanUserRespond() {
    document.getElementById("inputCountA").value = '';
    document.getElementById("inputCountB").value = '';
    document.getElementById("inputCountA").focus();
}

function displayComputerGuess() {
    document.getElementById("cpNum0").innerHTML = computerNum[0];
    document.getElementById("cpNum1").innerHTML = computerNum[1];
    document.getElementById("cpNum2").innerHTML = computerNum[2];
    document.getElementById("cpNum3").innerHTML = computerNum[3];
    document.getElementById("inputCountA").focus();
    guessCount++;
}

function inputCountFocus() {
    var countA = document.getElementById("inputCountA");
    //console.log("inputCountA:" + countA.value);
    if (/\D/g.test(countA.value)) {
        countA.value = '';
    } else {
        if (/[0-4]/g.test(countA.value)) {
            document.getElementById("inputCountB").focus();
        } else {
            countA.value = '';
        }
    }
}

function computerGuessNumber() {
    var testB = document.getElementById("inputCountB");
    //console.log("inputCountB:" + testB.value);
    if (/\D/g.test(testB.value)) {
        testB.value = '';
    } else {
        if (/[0-4]/g.test(testB.value)) {
            var countA = document.getElementById("inputCountA").value;
            //console.log("inputCountA:" + countA);
            var countB = testB.value;

            // 處理 guessTable
            var guessTable = document.getElementById("guessTable");
            var guessTableLastIndex = guessTable.rows.length;
            //console.log("guessTable Last Index: " + guessTableLastIndex);
            var row = guessTable.insertRow(guessTableLastIndex);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = computerNum.toString();
            cell2.innerHTML = " 第 " + guessCount + " 次猜測 ";
            cell3.innerHTML = countA + "A" + countB + "B";

            if (countA == 4) {
                showComputerRightPan();
            } else {
                cleanUserRespond();
                // console.log("guessCount: " + guessCount);
                if (guessCount == 1) {
                    // 電腦第一次猜測，根據使用者的回應，準備合乎的數字組合
                    for (var i = 1; i < 10; i++) {
                        var tempSet = [];
                        tempSet[0] = i;

                        for (var j = 1; j < 10; j++) {
                            if (i != j) {
                                tempSet[1] = j;
                                for (var k = 1; k < 10; k++) {
                                    if (i != k && j != k) {
                                        tempSet[2] = k;
                                        for (var l = 1; l < 10; l++) {
                                            if (i != l && j != l && k != l) {
                                                tempSet[3] = l;

                                                var testCountA = 0;
                                                for (var m = 0; m < 4; m++) {
                                                    if (computerNum[m] == tempSet[m]) {
                                                        testCountA++;
                                                    }
                                                } // for

                                                if (testCountA == countA) {
                                                    var testCountB = 0;
                                                    for (var n = 0; n < 4; n++) {
                                                        for (var o = 0; o < 4; o++) {
                                                            if (n != o && tempSet[n] == computerNum[o]) {
                                                                testCountB++;
                                                                break;
                                                            }
                                                        }
                                                    } // for

                                                    if (testCountB == countB) {
                                                        computerGuessBase[baseIndex] = [tempSet[0], tempSet[1], tempSet[2], tempSet[3]];
                                                        baseIndex++;
                                                        // console.log("candidate set: " + tempSet.toString());
                                                    }
                                                } // if testCountA == countA
                                            } // 完成一個數字組合
                                        } // for
                                    } // if
                                } // for
                            } // if
                        } // for
                    } // for
                } else {
                    // 根據使用者的回應，刪除不合乎的數字組合
                    // 不影響 array 的順序，從後面開始刪除
                    for (var i = (baseIndex - 1); i >= 0; i--) {
                        var tempSet = computerGuessBase[i];
                        console.log("candidate set: " + computerGuessBase[i]);
                        var testCountA = 0;
                        for (var m = 0; m < 4; m++) {
                            if (computerNum[m] == tempSet[m]) {
                                testCountA++;
                            }
                        } // for

                        if (testCountA == countA) {
                            var testCountB = 0;
                            for (var n = 0; n < 4; n++) {
                                for (var o = 0; o < 4; o++) {
                                    if (n != o && tempSet[n] == computerNum[o]) {
                                        testCountB++;
                                        break;
                                    }
                                }
                            } // for

                            if (testCountB != countB) {
                                computerGuessBase.splice(i, 1);
                            }
                        } else { // if testCountA == countA
                            computerGuessBase.splice(i, 1);
                        }
                    } // for 符合上次猜測的組合

                    baseIndex = computerGuessBase.length;
                } // if-else 

                // 從數字組合中選出一組來猜
                console.log("baseIndex: " + baseIndex);
                var guessIndex = Math.floor((Math.random() * 1000) % baseIndex);
                computerNum = computerGuessBase[guessIndex];
                displayComputerGuess();
            } // 還沒猜對
        } else {
            testB.value = '';
        } // 若不是 0-4 的數字
    } // 若不是數字



}

function init() {
    userGuesspPlayAgain();
    guessNumber();
}
window.onload = init;

function showRulePan() {
    document.getElementById("rulePanel").style.display = "block";
}

function hideRulePan() {
    document.getElementById("rulePanel").style.display = "none";
}

function showCngrtsUserPan() {
    document.getElementById("congratsUserPanel").style.display = "block";
}

function hideCngrtsUserPan() {
    document.getElementById("congratsUserPanel").style.display = "none";
}

function showChangeToUserBtn() {
    document.getElementById("changeToUserGuess").style.display = "block";
}

function hideChangeToUserBtn() {
    document.getElementById("changeToUserGuess").style.display = "none";
}

function showChangeToComputerBtn() {
    document.getElementById("changeToComputerGuess").style.display = "block";
}

function hideChangeToComputerBtn() {
    document.getElementById("changeToComputerGuess").style.display = "none";
}

function showUseInputPan() {
    document.getElementById("userInputNumberPanel").style.display = "block";
    document.getElementById("userTitle").style.float = "left";
    document.getElementById("cpTitle").style.float = "right";
}

function hideUseInputPan() {
    document.getElementById("userInputNumberPanel").style.display = "none";
}

function showComputerGuessingPan() {
    document.getElementById("computerGuessingPanel").style.display = "block";
    document.getElementById("userTitle").style.float = "right";
    document.getElementById("cpTitle").style.float = "left";
}

function hideComputerGuessingPan() {
    document.getElementById("computerGuessingPanel").style.display = "none";
}

function showComputerRightPan() {
    document.getElementById("computerRightPanel").style.display = "block";
}

function hideComputerRightPan() {
    document.getElementById("computerRightPanel").style.display = "none";
}