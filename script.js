class Calculator{
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement=previousTextElement
        this.currentTextElement=currentTextElement
      this.clear()
    }

    clear(){
        this.currentOperand=''
        this.previousOperand=''   
        this.operation=undefined        
    }

    inputNumber(number){
       
        if(number ==='.' && this.currentOperand.includes('.')) return
        this.currentOperand= this.currentOperand.toString() + number.toString()      
    }
   
    delete(){
        this.currentOperand =this.currentOperand.toString().slice(0, -1)
    }

    compute(){
        let computation;
        const prev =parseFloat(this.previousOperand)
        const current =parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
            computation= prev + current
             break
             case '-':
             computation= prev - current
             break
             case '*':
             computation= prev * current
             break
             case '÷':
            computation= prev / current
             break
             default :
             return 
        }
        this.currentOperand =computation
        this.operation= undefined
        this.previousOperand =''

    }

    getDisplayNumber(number){
        const stringNumber= number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits =stringNumber.split('.')[1]

        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay =''
        } else {
            integerDisplay= integerDigits.toLocaleString('en',{
                maximumFractionDigits : 0 })
        }
       
      if(decimalDigits != null){
          return `${integerDisplay}.${decimalDigits}`
      } else{
          return integerDisplay
      }
    }

    inputUpdate(){
       
        this.currentTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        
        if(this.operation !== undefined){       
        this.previousTextElement.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
              
      } else {
            this.previousTextElement.innerText=''
        }


    }

    inputOperation(operation){
        if(this.currentOperand ==='') return 
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''

    }
}


const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButton= document.querySelector('[data-equals]')
const deleteButton= document.querySelector('[data-delete]')
const clearButton= document.querySelector('[data-all-clear]')
const previousTextElement= document.querySelector('[data-previous-operand]')
const currentTextElement= document.querySelector('[data-current-operand]')

const  calculator= new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.inputNumber(button.innerText)
        calculator.inputUpdate()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.inputOperation(button.innerText)
        calculator.inputUpdate()
    })
})

equalsButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.inputUpdate()
})

clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.inputUpdate()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.inputUpdate()
})


