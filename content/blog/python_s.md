---
title: "Python学习"
date: "2026-08-03"
excerpt: "Python学习"
tags: ["Python"]
category: "Python"
author: "FLY"
readingTime: 
---
## 1.Python面向对象
### 1.定义类和创建对象  
 example:
 ```python
 class MyClass:
    """一个简单的类实例"""
    i = 12345
    def f(self):
        return 'hello world'
x = MyClass()
```
### 2.类的属性和方法
在类的内部，使用 def 关键字来定义一个方法，与一般函数定义不同，类方法必须包含参数 self, 且为第一个参数，self 代表的是类的实例。
类的私有属性  
__private_attrs：两个下划线开头，声明该属性为私有，不能在类的外部被使用或直接访问。在类内部的方法中使用时 self.__private_attrs。
### 3.类的继承
子类（派生类 DerivedClassName）会继承父类（基类 BaseClassName）的属性和方法。

BaseClassName（实例中的基类名）必须与派生类定义在一个作用域内。除了类，还可以用表达式，基类定义在另一个模块中时这一点非常有用:
```python
class DerivedClassName(BaseClassName):
```
### 4.格式化字符串
```python
x=10
print(f'hello world {x}')##直接打印变量
```


