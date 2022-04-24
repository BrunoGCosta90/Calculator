let operator;
let x;
let y = 0;
const displayOld = document.querySelector('.display-old');
const displayCurrent = document.querySelector('.display-current');
const dot = document.querySelector('.float');

const grabButton = document.querySelectorAll('button');
grabButton.forEach(button => 
    button.addEventListener('click', () => calculatorEngine(button.textContent))
);


document.addEventListener('keydown', keyPress);

function calculatorEngine(char){
    
    
    switch(char){
        case 'AC':
            displayOld.textContent = '';
            displayCurrent.textContent = '';
            operator = undefined;
            x = 0;
            y = 0;
            dot.disabled = false;
            break;
            
        case 'C':

            displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
            
            if(operator != undefined){
                y = displayCurrent.textContent;
            }
            if(displayCurrent.textContent == ''){
                displayCurrent.textContent = "0";
            }
            
            testForFloat(displayCurrent);
            break;
        case '9':
        case '8':
        case '7':
        case '6':
        case '5':
        case '4':
        case '3':
        case '2':
        case '1':
        case '0':
            if(displayCurrent.textContent == '0' && char != '0'){ displayCurrent.textContent = ''; }
            
            if(operator == undefined){
                if(displayCurrent.textContent.length < 15){
                    displayCurrent.textContent += char;
                }
            } else {
                displayOld.textContent = `${x} ${operator}`;
                if(displayCurrent.textContent.length < 15){
                    displayCurrent.textContent += char;
                    y = displayCurrent.textContent;
                }
            }
            break;
        case '÷':
        case '-':
        case '+':
        case '%':
        case '*':
            checkValidOperation();
            if(x != undefined && operator != undefined){
                checkValidOperation();
                displayOld.textContent = x + ` ${char}`;
                displayCurrent.textContent = 0;
                break;
            } 
            operator = char;
            x = displayCurrent.textContent;
            displayOld.textContent = displayCurrent.textContent + ` ${char}`;
            displayCurrent.textContent = 0;

            dot.disabled = false;
            break;        
        case '.':
            if(testForFloat(displayCurrent) == false){
                if(displayCurrent.textContent == ''){displayCurrent.textContent = '0';}
                displayCurrent.textContent += '.';
                dot.disabled = true;
            };
            break;
        case '=':
            checkValidOperation();
            break;
        default:
            break;
    }
    if(displayCurrent.textContent == ""){
        displayCurrent.textContent = "0";
    }
}

function checkValidOperation(){
    if(x != '' && y != '' && operator != undefined){
        x = Number(x);
        y = Number(y);
        if((x == 0 || y == 0) && operator == '÷'){
            alert("Can't divide by zero!");
           return ;
        }
        displayOld.textContent += ` ${displayCurrent.textContent}`;
        x = Math.round(operate(operator, x, y) * 100) / 100;
        if (x.toString().length > 15){
            displayCurrent.textContent = x.toPrecision(15);
        } else {
            displayCurrent.textContent = x;
        }
        //displayCurrent.textContent = x;
        y = 0;
        operator = undefined;
        dot.disable = false;
    }
}

function operate(operator, x, y){
  switch(operator){
      case '*':
          return multiply(x,y);
          break;
      case '%':
          return percentage(x,y);
          break;
      case '+':
          return add(x,y);
          break;
      case '-':
          return subtract(x,y);
          break;
      case '÷':
          return divide(x,y);
          break;      
      default:
          break;
  }
}

function add(x,y){
    return ((x * 100) + (y * 100))/ 100;
}

function multiply(x,y){
    return x * y;
}

function divide(x,y){
    return x / y;
}

function subtract(x,y){
    return x - y;
}

function percentage(x,y){
    return x * (y/100);
}

function testForFloat(text){

    for(let i in text.textContent){
        
        if(text.textContent[i] == '.'){
            dot.disable = true;
            return true;
        }
        
    }
    dot.disabled = false;
    return false;
    
}

function keyPress(e){
    switch(e.keyCode){
        case 8:
            calculatorEngine('C');
            break;
        case 46:
            calculatorEngine('AC');
            break;
        case 107:
            calculatorEngine('+');
            break;
        case 106:
            calculatorEngine('*');
            break;
        case 109:
            calculatorEngine('-');
            break;
        case 111:
            calculatorEngine('÷')
            break;
        case 16:
            calculatorEngine('%');
            break;
        case 110:
            calculatorEngine('.');
            break;
        case 48:
        case 96:
            calculatorEngine('0');
            break;
        case 49:
        case 97:
            calculatorEngine('1');
            break;
        case 50:
        case 98:
            calculatorEngine('2');
            break;
        case 51:
        case 99:
            calculatorEngine('3');
            break;
        case 52:
        case 100:
            calculatorEngine('4');
            break;
        case 53:
        case 101:
            calculatorEngine('5');
            break;
        case 54:
        case 102:
            calculatorEngine('6');
            break;
        case 55:
        case 103:
            calculatorEngine('7');
            break;
        case 56:
        case 104:
            calculatorEngine('8');
            break;
        case 57:
        case 105:
            calculatorEngine('9');
            break;
        case 13:
            calculatorEngine('=');
            break;
        default:
            break;
    }
}