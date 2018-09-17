class SmartCalculator {
  constructor(initialValue) {

    this.value = 0;
    this.stack = [];
    this.stack.push(initialValue)
    this.operators = '_';
    this.priority = '_';
  }

  calculate() {
    
    for(var i = 3; i > 0; i--){

      while( this.priority.indexOf( '' + i ) != -1 ){

        var index = this.priority.lastIndexOf('' + i);

        switch( this.operators.charAt(index) ) {

          case '^': 
            this.stack[index - 1] = Math.pow( this.stack[index - 1],  this.stack[index] );
            break;

          case '*':
            this.stack[index - 1] = this.stack[index - 1] * this.stack[index];
            break;

          case '/':
            this.stack[index - 1] = this.stack[index - 1] / this.stack[index];
            break;

          case '+':
            if(this.operators.charAt(index - 1) == '-'){
              this.stack[index - 1] = this.stack[index - 1] - this.stack[index];
              break;
            }

            this.stack[index - 1] = this.stack[index - 1] + this.stack[index];
            break;

          case '-':
            if(this.operators.charAt(index - 1) == '-'){
              this.stack[index - 1] = this.stack[index - 1] + this.stack[index];
              break;
            }
            
            this.stack[index - 1] = this.stack[index - 1] - this.stack[index];
            break;
        }

        // Отрезаем использованное
        this.stack.splice(index, 1);
        this.operators = this.operators.slice(0, index) + this.operators.slice(index + 1); 
        this.priority = this.priority.slice(0, index) + this.priority.slice(index + 1); 
      }
    }

    this.value = this.stack[0];
  }

  toString() {
    this.calculate();

    return this.value; 
  }

  add(number) {
    this.stack.push(number);
    this.operators += '+';
    this.priority += '1';

    return this;
  }
  
  subtract(number) {
    this.stack.push(number);
    this.operators += '-';
    this.priority += '1';

    return this;
  }

  multiply(number) {
    this.stack.push(number);
    this.operators += '*';
    this.priority += '2';

    return this;
  }

  devide(number) {
    this.stack.push(number);
    this.operators += '/';
    this.priority += '2';

    return this;
  }

  pow(number) {
    this.stack.push(number);
    this.operators += '^';
    this.priority += '3';

    return this;
  }
}

module.exports = SmartCalculator;