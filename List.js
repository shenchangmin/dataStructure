/**
 * Created by shenchangmin on 16/9/20.
 */
/**
 * 一个简单的列表
 * @constructor
 */
var List = function () {
    this.listSize = 0;
    this.pos = 0;
    this.dataSource = [];//初始化一个数组来保存列表元素
};
List.prototype = (function () {
    return {
        clear: clear,
        find: find,
        toString: toString,
        insert: insert,
        append: append,
        remove: remove,
        front: front,
        end: end,
        prev: prev,
        next: next,
        hasNext: hasNext,
        hasPrev: hasPrev,
        length: length,
        currPos: currPos,
        moveTo: moveTo,
        getElement: getElement
    };
    /**
     * 给列表最后添加元素的时候，列表元素个数+1
     * @param element
     */
    function append(element) {
        this.listSize++;
        this.dataSource.push(element);
    }

    /**
     * @param element 如果传入的是对象，需要判断是否是对象以及两个对象是否相等
     * @returns {number} 如果找到，返回位置，否则-1
     */
    function find(element) {
        for (var i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i] === element) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 返回列表元素的个数
     * @returns {number}
     */
    function length() {
        return this.listSize;
    }

    /**
     * 删除元素成功，元素个数-1
     * @param element
     * @returns {boolean}
     */
    function remove(element) {
        var removeIndex = this.find(element);
        if (removeIndex !== -1) {
            this.dataSource.splice(removeIndex, 1);
            this.listSize--;
            return true;
        }
        return false;
    }

    /**
     * 返回要展示的列表
     * @returns {string}
     */
    function toString() {
        return this.dataSource.toString();
    }

    /**
     * 插入某个元素
     * @param element 要插入的元素
     * @param afterElement 列表中的元素之后
     * @returns {boolean}
     */
    function insert(element, afterElement) {
        var insertIndex = this.find(afterElement);
        if (insertIndex !== -1) {
            this.dataSource.splice(insertIndex + 1, 0, element);
            this.listSize++;
            return true;
        }
        return false;
    }

    /**
     * 清空列表中的所有元素
     */
    function clear() {
        delete this.dataSource;
        this.dataSource = [];
        this.listSize = this.pos = 0;
    }

    /**
     * 将列表的当前位置移动到第一个元素
     */
    function front() {
        this.pos = 0;
    }

    /**
     * 将列表的当前位置移动到最后一个元素
     */
    function end() {
        this.pos = this.listSize - 1;
    }

    /**
     * 返回当前位置的元素
     * @returns {*}
     */
    function getElement() {
        return this.dataSource[this.pos];
    }

    /**
     * 将当前位置向前移动一位
     */
    function prev() {
        --this.pos;
    }

    /**
     * 将当前位置向后移动一位
     */
    function next() {
        ++this.pos;
    }

    /**
     * 返回列表的当前位置
     * @returns {number|*}
     */
    function currPos() {
        return this.pos;
    }

    /**
     * 移动到指定位置
     * @param position
     */
    function moveTo(position) {
        this.pos = position;
    }

    /**
     * 判断是否有后一位
     * @returns {boolean}
     */
    function hasNext() {
        return this.pos < this.listSize;
    }

    /**
     * 判断是否有前一位
     * @returns {boolean}
     */
    function hasPrev() {
        return this.pos >= 0;
    }
}());
/**
 * 用户对象
 * @param name 用户姓名
 * @param movie 用户拿走的影碟
 * @constructor
 */
var Customer = function (name, movie) {
    this.name = name;
    this.movie = movie;
};
/**
 * 读取数据，返回数组
 * @param file
 * @returns {Array|*}
 */
function createMovies(file) {
    var arr = fs.readFileSync(file, 'utf-8').split("\n");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
}
/**
 * 用户拿走影碟
 * @param name 用户的名字
 * @param movie 影碟的名字
 * @param movieList 所有影碟列表
 * @param customerList 用户列表
 */
function checkOut(name, movie, movieList, customerList) {
    if (movieList.find(movie) !== -1) {
        var user = new Customer(name, movie);
        customerList.append(user);//用户拿掉影碟，讲用户加入customerList
        movieList.remove(movie);//从movieList中删除掉被拿掉的影碟
    } else {
        console.log('没有该电影');
    }
}
function displayList(list) {
    for (list.front(); list.currPos() < list.length(); list.next()) {
        if (list.getElement() instanceof Customer) {
            console.log(list.getElement()['name'] + ',' + list.getElement()['movie']);
        } else {
            console.log(list.getElement());
        }
    }
}
var fs = require('fs');
var movies = createMovies('films.txt');
var movieList = new List();
var customers = new List();
for (var i = 0; i < movies.length; i++) {
    movieList.append(movies[i]);
}
checkOut('Jane', '肖申克的救赎', movieList, customers);
displayList(customers);
console.log('分割线-----------------');
displayList(movieList);