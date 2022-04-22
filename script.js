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
                displayOld.textContent = `${x}` + ' ' + `${operator}`;
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
            if(x != '' && y != '' && operator != undefined){
                x = Number(x);
                y = Number(y);
                if((x == 0 || y == 0) && operator == '÷'){
                    alert("Can't divide by zero!");
                    break;
                }
                displayOld.textContent += ` ${displayCurrent.textContent}`;
                displayCurrent.textContent = Math.round(operate(operator, x, y) * 100) / 100;
                x = displayCurrent.textContent;
                y = '';
                dot.disable = false;
                break;
            }
        default:
            break;
    }
    if(displayCurrent.textContent == ""){
        displayCurrent.textContent = "0";
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