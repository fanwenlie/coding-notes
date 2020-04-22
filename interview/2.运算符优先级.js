/**
 * 这道题主要考运算符优先级：
 * 涉及知识点有："."，函数调用，new无参数列表，new有参数列表的运算符优先级，变量和函数声明提升，this指向
 * [MDN运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
 * 
 * 请在浏览器中运行，node中运行会报错
 */

// output -> 5; var getName和function getName声明提升，var getName的声明被function getName声明覆盖
getName()
function Foo() {
	getName = function () { console.log(1); };
	return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}
 //请写出以下输出结果：

// output -> 2;  .和函数调用()的优先级一样，所以从左到右执行
Foo.getName(); 

// output -> 4; 函数声明的getName被函数表达式覆盖
getName(); 

// output -> 1; .和函数调用()的优先级一样，所以从左到右执行, Foo()执行，getName被重新赋值，this指向window
Foo().getName(); 

// output -> 1; 上一步getName已经为window.getName
getName();

// output -> 2; new Foo表示情况是new无参数列表，其优先级小于.，所以先执行.
new Foo.getName();

// output -> 3; new Foo()表示情况是new有参数列表，其优先级等于.和函数调用的优先级，所以从左到右执行
new Foo().getName();

// output -> 3; 第一个new是new无参数列表，优先级小于第二个new是new有参数列表，也小于.的优先级，所以先执行new Foo(), 在找到原型上的getName，最后new ...()
new new Foo().getName();
