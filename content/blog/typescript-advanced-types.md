---
title: "TypeScript 高级类型技巧：让代码更健壮"
date: "2026-05-05"
excerpt: "探索 TypeScript 中的高级类型用法，包括泛型约束、条件类型、映射类型、模板字面量类型等，帮助你写出更安全、更优雅的类型定义。"
tags: ["TypeScript", "编程语言", "前端开发"]
category: "编程语言"
author: "学习笔记作者"
readingTime: 10
---

## 为什么需要高级类型？

TypeScript 的基础类型（`string`、`number`、`boolean` 等）能覆盖大部分场景，但在复杂应用中，我们需要更强大的类型工具来保证类型安全。

## 泛型约束

使用 `extends` 关键字约束泛型参数：

```typescript
// 约束 T 必须有 length 属性
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");     // ✅ 5
getLength([1, 2, 3]);   // ✅ 3
// getLength(123);      // ❌ 编译错误
```

### keyof 与泛型约束

```typescript
// 安全地访问对象属性
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "张三", age: 25 };
getProperty(user, "name"); // ✅ "张三"
// getProperty(user, "email"); // ❌ 编译错误
```

## 条件类型

根据条件返回不同的类型：

```typescript
// 判断是否为字符串类型
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet() { return "Hello"; }
type GreetReturn = ReturnType<typeof greet>; // string
```

## 映射类型

基于已有类型创建新类型：

```typescript
// 将所有属性变为可选
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// 将所有属性变为只读
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 实际应用：API 响应包装
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

interface User {
  id: number;
  name: string;
}

type UserResponse = ApiResponse<User>;
// { data: User; status: number; message: string; }
```

## 模板字面量类型

TypeScript 4.1+ 支持模板字面量类型：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">;    // "onClick"
type ChangeEvent = EventName<"change">;  // "onChange"

// 实际应用：类型安全的事件系统
type EventHandler<Events extends string> = {
  [K in Events as `on${Capitalize<K>}`]: (e: K) => void;
};

type ButtonEvents = EventHandler<"click" | "hover" | "focus">;
// { onClick: (e: "click") => void; onHover: ...; onFocus: ...; }
```

## 实用工具类型

TypeScript 内置了丰富的工具类型：

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial - 所有属性可选
type PartialTodo = Partial<Todo>;

// Pick - 挑选指定属性
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - 排除指定属性
type TodoInfo = Omit<Todo, "completed">;

// Record - 构造对象类型
type PageInfo = Record<"home" | "about" | "contact", { title: string }>;

// Exclude / Extract - 联合类型操作
type T = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type U = Extract<"a" | "b" | "c", "a" | "b">;  // "a" | "b"
```

## 总结

TypeScript 的高级类型虽然学习曲线较陡，但掌握之后你会发现：
- 代码更健壮，运行时错误大幅减少
- IDE 智能提示更精准
- 代码即文档，类型定义就是最好的说明

> 💡 建议：在实际项目中逐步引入这些高级类型，从简单的泛型开始，慢慢过渡到条件类型和映射类型。
