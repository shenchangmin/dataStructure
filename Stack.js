/**
 * Created by shenchangmin on 16/9/23.
 */
/**
 * 栈
 * @constructor
 */
function Stack() {
    this.dataSource = [];
    this.top = 0;
}
Stack.prototype = (function () {
    return {
        push: push,
        pop: pop,
        peek: peek,
        clear: clear,
        length: length
    };
    function push(element) {
        this.top++;
        this.dataSource.push(element);
    }

    function pop() {
        return this.dataSource[--this.top];
    }

    function peek() {
        return this.dataSource[this.top - 1];
    }

    function clear() {
        this.top = 0;
    }

    function length() {
        return this.top;
    }
}());
var s = new Stack();
s.push('David');
s.push('Raymond');
s.push('Bryan');
console.log('length:' + s.length());
s.pop();
console.log('length:' + s.length());
console.log(s);