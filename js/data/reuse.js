/* Code reuse, generics, Template Method, Open-Closed Principle */

window.TM_UML = `
<svg viewBox="0 0 600 330" class="uml" role="img" aria-label="UML class diagram of the Template Method pattern">
  <defs>
    <marker id="tri" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="14" markerHeight="14" orient="auto-start-reverse">
      <path d="M0,0 L12,6 L0,12 z" class="uml-tri"/>
    </marker>
  </defs>
  <!-- abstract class -->
  <rect x="150" y="10" width="230" height="122" class="uml-box"/>
  <text x="265" y="30" class="uml-stereo" text-anchor="middle">«abstract»</text>
  <text x="265" y="48" class="uml-name uml-italic" text-anchor="middle">AbstractClass</text>
  <line x1="150" y1="58" x2="380" y2="58" class="uml-line"/>
  <line x1="150" y1="66" x2="380" y2="66" class="uml-line"/>
  <text x="160" y="86" class="uml-member">+ templateMethod(): void</text>
  <text x="160" y="104" class="uml-member uml-italic"># primitiveOp1(): void {abstract}</text>
  <text x="160" y="122" class="uml-member uml-italic"># primitiveOp2(): void {abstract}</text>
  <!-- note -->
  <path d="M398 22 h182 l12 12 v80 h-194 z" class="uml-note"/>
  <text x="406" y="42" class="uml-member">templateMethod() {</text>
  <text x="414" y="60" class="uml-member">  step();</text>
  <text x="414" y="76" class="uml-member">  this.primitiveOp1();</text>
  <text x="414" y="92" class="uml-member">  this.primitiveOp2();</text>
  <text x="406" y="108" class="uml-member">}</text>
  <line x1="380" y1="86" x2="398" y2="64" class="uml-dash"/>
  <!-- concrete classes -->
  <rect x="40" y="220" width="210" height="96" class="uml-box"/>
  <text x="145" y="242" class="uml-name" text-anchor="middle">ConcreteClassA</text>
  <line x1="40" y1="252" x2="250" y2="252" class="uml-line"/>
  <line x1="40" y1="260" x2="250" y2="260" class="uml-line"/>
  <text x="50" y="282" class="uml-member"># primitiveOp1(): void</text>
  <text x="50" y="300" class="uml-member"># primitiveOp2(): void</text>
  <rect x="290" y="220" width="210" height="96" class="uml-box"/>
  <text x="395" y="242" class="uml-name" text-anchor="middle">ConcreteClassB</text>
  <line x1="290" y1="252" x2="500" y2="252" class="uml-line"/>
  <line x1="290" y1="260" x2="500" y2="260" class="uml-line"/>
  <text x="300" y="282" class="uml-member"># primitiveOp1(): void</text>
  <text x="300" y="300" class="uml-member"># primitiveOp2(): void</text>
  <!-- generalization arrows -->
  <polyline points="145,220 145,180 265,180 265,134" class="uml-line" fill="none" marker-end="url(#tri)"/>
  <polyline points="395,220 395,180 265,180" class="uml-line" fill="none"/>
</svg>`;

window.STATEMENT_UML = `
<svg viewBox="0 0 560 300" class="uml" role="img" aria-label="UML of Statement refactored with Template Method: Customer uses Statement; HtmlStatement and TextStatement extend Statement">
  <defs>
    <marker id="tri2" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="14" markerHeight="14" orient="auto-start-reverse">
      <path d="M0,0 L12,6 L0,12 z" class="uml-tri"/>
    </marker>
    <marker id="open2" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto">
      <path d="M0,0 L12,6 L0,12" class="uml-open"/>
    </marker>
  </defs>
  <rect x="10" y="40" width="150" height="80" class="uml-box"/>
  <text x="85" y="60" class="uml-name" text-anchor="middle">Customer</text>
  <line x1="10" y1="70" x2="160" y2="70" class="uml-line"/>
  <text x="20" y="92" class="uml-member">+ statement()</text>
  <text x="20" y="110" class="uml-member">+ htmlStatement()</text>
  <rect x="270" y="10" width="270" height="118" class="uml-box"/>
  <text x="405" y="30" class="uml-name uml-italic" text-anchor="middle">Statement</text>
  <line x1="270" y1="40" x2="540" y2="40" class="uml-line"/>
  <text x="280" y="60" class="uml-member">+ value(c: Customer): string</text>
  <text x="280" y="78" class="uml-member uml-italic"># headerString(c: Customer)</text>
  <text x="280" y="96" class="uml-member uml-italic"># eachRentalString(r: Rental)</text>
  <text x="280" y="114" class="uml-member uml-italic"># footerString(c: Customer)</text>
  <line x1="160" y1="80" x2="268" y2="80" class="uml-line" marker-end="url(#open2)"/>
  <rect x="230" y="200" width="150" height="90" class="uml-box"/>
  <text x="305" y="220" class="uml-name" text-anchor="middle">HtmlStatement</text>
  <line x1="230" y1="230" x2="380" y2="230" class="uml-line"/>
  <text x="238" y="248" class="uml-member"># headerString()</text>
  <text x="238" y="264" class="uml-member"># eachRentalString()</text>
  <text x="238" y="280" class="uml-member"># footerString()</text>
  <rect x="400" y="200" width="150" height="90" class="uml-box"/>
  <text x="475" y="220" class="uml-name" text-anchor="middle">TextStatement</text>
  <line x1="400" y1="230" x2="550" y2="230" class="uml-line"/>
  <text x="408" y="248" class="uml-member"># headerString()</text>
  <text x="408" y="264" class="uml-member"># eachRentalString()</text>
  <text x="408" y="280" class="uml-member"># footerString()</text>
  <polyline points="305,200 305,165 405,165 405,130" class="uml-line" fill="none" marker-end="url(#tri2)"/>
  <polyline points="475,200 475,165 405,165" class="uml-line" fill="none"/>
</svg>`;

BANK.topic({
  id: 'code-reuse',
  group: 'reuse',
  title: 'Code reuse',
  notes: `
<p>Reuse means writing code once and using it in many places, which is also how you avoid duplication. The course names three primary ways to reuse code:</p>
<ul>
  <li><strong>Parameterization.</strong> Make one piece of code customizable by passing things in: ordinary parameters, <em>generic type parameters</em> (generic programming), algorithms (Strategy) or dependencies (dependency injection).</li>
  <li><strong>Implementation inheritance.</strong> Put the shared code in a superclass and have subclasses inherit it. Subclasses customize by overriding methods (Template Method) or adding new ones.</li>
  <li><strong>Composition / delegation (wrapping).</strong> An object holds a reference to another object and forwards (delegates) work to it. Adapter and Decorator are wrapping patterns.</li>
</ul>
<h4>Inheritance vs. composition</h4>
<ul>
  <li>Inheritance is static (fixed at compile time), exposes the parent's protected internals to subclasses ("white-box" reuse) and couples the subclass tightly to the parent. A TS class can extend only one class.</li>
  <li>Composition is "black-box" reuse through the other object's public interface. It can be changed at run time and keeps classes loosely coupled. The usual advice is to <em>favor composition over inheritance</em> unless there is a true "is-a" relationship.</li>
</ul>
<p>The common refactoring when two classes share code: <strong>composition</strong> puts the shared code in a method on a class both clients delegate to; <strong>inheritance</strong> puts it in a superclass and makes the clients subclasses.</p>
<p class="src">Sources: Open-Closed Principle slides, Template Method slides, Principles of Software Design.</p>`,
  questions: [
    { t: 'mc', q: 'Which of the following is NOT one of the three primary ways to achieve code reuse discussed in CS 340?', o: ['Parameterization (e.g., generic types)', 'Implementation inheritance', 'Composition / delegation (wrapping)', 'Copying and pasting the method into each class that needs it'], a: 3, e: 'Copy-paste creates duplication rather than reuse. The three primary techniques are parameterization, implementation inheritance, and composition/delegation.' },
    { t: 'sa', q: 'List the three primary ways to achieve code reuse and give a one-line example of each.', k: ['Parameterization: e.g., a generic class List<T> or passing a function/strategy in', 'Implementation inheritance: common code in a superclass that subclasses inherit (e.g., Template Method)', 'Composition/delegation: an object holds another object and forwards calls to it (e.g., wrapper, Decorator, Adapter)'], m: 'Parameterization: write one version that takes what varies as a parameter, e.g. class Stack<T> or sort(items, compareFn).\nImplementation inheritance: put shared code in a superclass, e.g. abstract class Game with playOneGame() that Chess and Monopoly inherit.\nComposition/delegation: wrap another object and forward calls, e.g. a LoggingRepository that holds a Repository and calls through to it.' },
    { t: 'tf', q: 'With composition, a class reuses another class by holding a reference to an instance of it and delegating calls to that instance.', a: true, e: 'That is the definition of composition/delegation (sometimes called "wrapping").' },
    { t: 'tf', q: 'Implementation inheritance is generally considered more loosely coupled than composition.', a: false, e: 'The reverse. A subclass depends on its parent\'s implementation details (and protected members), so inheritance creates tighter coupling than composition through a public interface.' },
    { t: 'mc', q: 'A TypeScript class needs reusable behavior from TWO existing classes. Which reuse technique works most naturally?', o: ['Implementation inheritance from both classes', 'Composition: hold an instance of each and delegate', 'Generic type parameters', 'Copy the methods in'], a: 1, e: 'TypeScript (like Java) allows a class to extend only one class, so you compose: keep a reference to each helper and delegate.' },
    { t: 'mc', q: 'Which statement best describes the relationship between "avoid code duplication" and "design reusable code"?', o: ['They are unrelated principles', 'To avoid duplication, you create one reusable copy of the code that can be customized for each need', 'Reusable code always introduces duplication', 'Avoiding duplication only applies within a single method'], a: 1, e: 'From the OCP slides: if the same or similar code is needed in several places, create one copy that can be customized. Avoiding duplication and designing for reuse go together.' },
    { t: 'tf', q: 'Passing a comparison function into a sort routine is an example of reuse through parameterization.', a: true, e: 'The algorithm that varies is passed in as a parameter (essentially the Strategy pattern), so one sort routine serves many orderings.' },
    { t: 'mc', q: 'The Decorator and Adapter patterns are examples of which reuse technique?', o: ['Generic programming', 'Implementation inheritance', 'Composition / wrapping', 'Template Method'], a: 2, e: 'Both wrap another object and delegate to it. The OCP slides list them under "Composition/Wrapping".' },
    { t: 'mc', q: 'Two classes contain an IDENTICAL helper method. Using composition, how would you remove the duplication?', o: ['Make one class extend the other', 'Move the method to a (possibly new) class that both clients hold a reference to and delegate to', 'Make the method generic', 'Mark the method static in both classes'], a: 1, e: 'Composition: put the common code in a method on a class that multiple clients delegate to. The inheritance alternative would be a common superclass.' },
    { t: 'tf', q: 'When the duplicated code in several places is SIMILAR rather than identical, the Template Method pattern is a good inheritance-based way to reuse it.', a: true, e: 'Straight from the Template Method slides: the common algorithm goes in the superclass and the steps that vary are delegated to subclasses.' },
    { t: 'mc', q: 'Which is a disadvantage of implementation inheritance compared to composition?', o: ['It cannot reuse any code', 'The relationship is fixed at compile time and subclasses can break when the parent\'s implementation changes', 'It requires generic types', 'It cannot override methods'], a: 1, e: 'Inheritance is static and creates the "fragile base class" problem: changes to the parent ripple into subclasses.' },
    { t: 'mc', q: 'Which is an advantage of composition over inheritance?', o: ['The delegate object can be swapped at run time (e.g., by passing a different implementation of an interface)', 'It gives access to the other class\'s private fields', 'It requires fewer objects', 'It is the only way to use polymorphism'], a: 0, e: 'Since the class depends on another object through a reference, you can supply a different object (dependency injection) at run time. Inheritance is fixed when the class is written.' },
    { t: 'tf', q: '"Favor composition over inheritance" means you should never use inheritance.', a: false, e: 'It is a default, not a ban. Inheritance is appropriate when there is a genuine "is-a" relationship and you want to reuse a skeleton, as in Template Method.' },
    { t: 'mc', q: 'In "white-box" reuse, the reusing class can see the internals of the reused code; in "black-box" reuse it only sees the public interface. Which pairing is correct?', o: ['Inheritance = black-box, composition = white-box', 'Inheritance = white-box, composition = black-box', 'Both are white-box', 'Both are black-box'], a: 1, e: 'Subclasses see protected internals of the parent (white-box). A composed object is used only through its public interface (black-box).' },
    { t: 'code', q: 'Two classes both log messages with a timestamp using the same duplicated code. Refactor using COMPOSITION so the formatting code exists in one place.', c: `class OrderService {
  placeOrder(id: string) {
    console.log(new Date().toISOString() + " [INFO] placed " + id);
  }
}
class UserService {
  createUser(name: string) {
    console.log(new Date().toISOString() + " [INFO] created " + name);
  }
}`, k: ['A new class (e.g., Logger) holds the shared formatting code', 'Each service holds a reference to a Logger (ideally passed in via constructor)', 'Services delegate to logger.info(...) instead of formatting themselves'], mc: `class Logger {
  info(msg: string): void {
    console.log(new Date().toISOString() + " [INFO] " + msg);
  }
}

class OrderService {
  constructor(private logger: Logger) {}
  placeOrder(id: string) {
    this.logger.info("placed " + id);
  }
}

class UserService {
  constructor(private logger: Logger) {}
  createUser(name: string) {
    this.logger.info("created " + name);
  }
}` },
    { t: 'sa', q: 'When would you choose implementation inheritance over composition for reuse? Give one situation where each is the better choice.', k: ['Inheritance: true "is-a" relationship and/or a shared algorithm skeleton with varying steps (Template Method)', 'Composition: behavior needs to change at run time, need reuse from multiple sources, or want low coupling / black-box reuse', 'Mention coupling or flexibility tradeoff'], m: 'Inheritance fits when the subclass truly "is a" kind of the parent and you want to reuse an algorithm skeleton while customizing steps, as with Game → Monopoly/Chess in Template Method. Composition fits when you want loose coupling, need to swap behavior at run time, or need behavior from more than one class (a class can only extend one parent), e.g. a service that delegates to an injected Logger or Repository.' },
    { t: 'tf', q: 'Generic types let you reuse one implementation of a data structure (like a stack) for many element types without duplicating code.', a: true, e: 'This is parameterization by type: Stack<T> is written once and used as Stack<number>, Stack<string>, etc.' },
    { t: 'mc', q: 'A class `CachedRepository` implements the `Repository` interface, holds another `Repository`, checks a cache first, and otherwise forwards the call. Which reuse technique is this?', o: ['Implementation inheritance', 'Composition / delegation (a decorator)', 'Generic programming', 'Copy-paste'], a: 1, e: 'It wraps another Repository and delegates to it while adding behavior — composition, specifically the Decorator pattern.' },
    { t: 'tf', q: 'Dependency injection (passing a class the objects it depends on) is a form of parameterization that makes the class reusable with different collaborators.', a: true, e: 'The OCP slides list "Pass-in Dependencies (Dependency Injection)" under parameterization.' },
    { t: 'mc', q: 'Which reuse technique is the Template Method pattern based on?', o: ['Composition', 'Implementation inheritance', 'Generic type parameters', 'Dependency injection'], a: 1, e: 'Template Method puts the algorithm skeleton in a superclass and lets subclasses override the varying steps — implementation inheritance.' },
    { t: 'mc', q: 'Which reuse technique is the Strategy pattern based on?', o: ['Composition (pass in an algorithm object)', 'Implementation inheritance', 'Code duplication', 'Static methods'], a: 0, e: 'Strategy passes an algorithm object in and delegates to it — parameterization via composition. Contrast with Template Method, which varies steps via subclassing.' },
    { t: 'sa', q: 'Contrast how Template Method and Strategy each let you vary part of an algorithm.', k: ['Template Method: varying steps are abstract methods overridden in subclasses (inheritance, fixed at compile time)', 'Strategy: the varying algorithm is a separate object passed in and delegated to (composition, can change at run time)', 'Both keep the common/invariant code in one place'], m: 'Template Method keeps the skeleton in a superclass method and leaves the varying steps as abstract (or hook) methods that subclasses override. The variation is chosen by which subclass you instantiate. Strategy puts the varying algorithm behind an interface; the context class holds a strategy object and delegates to it, so you can swap the algorithm at run time without subclassing. Both avoid duplicating the invariant code.' },
    { t: 'tf', q: 'A subclass that inherits from a superclass can add new methods and fields that the superclass does not have, as a way to extend it.', a: true, e: 'The OCP slides list both "override superclass methods" and "add new methods and fields in subclass" as inheritance-based extension.' },
    { t: 'mc', q: 'Your class `ReportPrinter extends ArrayList` just so it can store report lines. Why is this a questionable use of inheritance?', o: ['ArrayList is not generic', 'ReportPrinter is not really "a kind of list"; it exposes every list method to clients and couples itself to ArrayList. It should hold a list instead (composition).', 'Inheritance can never extend library classes', 'It causes duplicate code'], a: 1, e: 'Inheritance for convenience, when there is no real is-a relationship, leaks the parent\'s interface. Composition ("has-a list") is the better fit.' },
    { t: 'tf', q: 'Reusing code across different projects (not just within one project) is one of the goals of designing reusable classes and functions.', a: true, e: 'The OCP slides: design reusable code for use in multiple places in the same project AND in multiple different projects.' },
  ],
});

BANK.topic({
  id: 'generics',
  group: 'reuse',
  title: 'Generic programming (TS generics)',
  notes: `
<p>Generics parameterize code by <em>type</em>, so one implementation works for many types while keeping compile-time type checking. Know how to write each of these from memory:</p>
<pre class="code">// generic function
function first&lt;T&gt;(items: T[]): T | undefined {
  return items[0];
}

// generic class
class Stack&lt;T&gt; {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size(): number { return this.items.length; }
}

// generic interface
interface Repository&lt;T, K&gt; {
  get(id: K): T | undefined;
  save(item: T): void;
}

// constraint: T must have a length
function longest&lt;T extends { length: number }&gt;(a: T, b: T): T {
  return a.length &gt;= b.length ? a : b;
}

// keyof constraint
function getProp&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

// multiple type params + default
class Pair&lt;A, B = A&gt; { constructor(public a: A, public b: B) {} }

// generic method inside a non-generic class
class Util { static wrap&lt;T&gt;(x: T): T[] { return [x]; } }</pre>
<ul>
  <li>Type arguments are usually <strong>inferred</strong>: <code>first([1,2])</code> infers <code>T = number</code>. You can be explicit: <code>first&lt;string&gt;([])</code>.</li>
  <li>Inside a generic you can only use members the constraint guarantees. With an unconstrained <code>T</code> you can't call <code>x.length</code>.</li>
  <li>Use generics instead of <code>any</code>. <code>any</code> turns off type checking, while generics keep the link between input and output types.</li>
  <li>Generic types are erased when TS compiles to JS (no runtime type info).</li>
</ul>`,
  questions: [
    { t: 'mc', q: 'Which is the correct TypeScript syntax for a generic function that returns its argument unchanged?', o: ['function identity<T>(arg: T): T { return arg; }', 'function identity(arg: <T>): <T> { return arg; }', 'function <T> identity(arg: T): T { return arg; }', 'function identity(arg: T): T<> { return arg; }'], a: 0, e: 'The type parameter list goes right after the function name: function name<T>(…).' },
    { t: 'mc', q: 'What is the main advantage of using a generic type parameter T instead of `any`?', o: ['Generics run faster at runtime', 'Generics preserve type information so the compiler can check that inputs and outputs match', 'any is not allowed in TypeScript', 'Generics allow multiple inheritance'], a: 1, e: 'any disables type checking. With T, identity<number> is known to return a number, so mistakes are caught at compile time.' },
    { t: 'tf', q: 'In TypeScript, a generic type argument can often be inferred from the arguments passed, so you do not always need to write it explicitly.', a: true, e: 'E.g. first([1, 2, 3]) infers T = number.' },
    { t: 'code', q: 'Write a generic class `Queue<T>` with `enqueue(item: T): void`, `dequeue(): T | undefined`, and a `size` getter.', k: ['Class declared as class Queue<T>', 'Private storage typed T[]', 'enqueue takes T; dequeue returns T | undefined (uses shift)', 'size getter returns number of items'], mc: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  get size(): number {
    return this.items.length;
  }
}

const q = new Queue<string>();
q.enqueue("a");` },
    { t: 'mc', q: 'What does the constraint in `function f<T extends { id: number }>(x: T)` mean?', o: ['T must be exactly the type { id: number }', 'T can be any type that has (at least) a numeric id property', 'T must be a number', 'T must extend a class named id'], a: 1, e: 'extends sets an upper bound. Any type that has id: number qualifies, even if it has more properties.' },
    { t: 'tf', q: 'Inside `function f<T>(x: T) { return x.length; }`, TypeScript reports an error because T is unconstrained.', a: true, e: 'Without a constraint, the compiler can\'t assume T has length. Fix: <T extends { length: number }>.' },
    { t: 'mc', q: 'Which declaration correctly defines a generic interface?', o: ['interface Box<T> { value: T; }', 'interface Box { value: <T>; }', 'generic interface Box(T) { value: T; }', 'interface <T>Box { value: T; }'], a: 0, e: 'Type parameters follow the interface name: interface Box<T> { … }.' },
    { t: 'code', q: 'Write a generic function `getProp` that takes an object and a key of that object and returns the property value with the correct type.', k: ['Two type params: T and K extends keyof T', 'Parameters (obj: T, key: K)', 'Return type T[K]'], mc: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Audrey", age: 20 };
const n = getProp(user, "name"); // string
// getProp(user, "email");        // compile error` },
    { t: 'tf', q: 'TypeScript generic type information is available at runtime, so you can write `if (x instanceof T)` inside a generic function.', a: false, e: 'Types are erased when compiling to JavaScript. T does not exist at runtime, so instanceof T is a compile error.' },
    { t: 'mc', q: 'Given `class Pair<K, V> { constructor(public key: K, public value: V) {} }`, what is the type of `new Pair("x", 5).value`?', o: ['string', 'number', 'any', 'K'], a: 1, e: 'K is inferred as string and V as number, so value is a number.' },
    { t: 'mc', q: 'Generic programming is a form of which code-reuse technique?', o: ['Parameterization', 'Implementation inheritance', 'Composition', 'Template Method'], a: 0, e: 'Generics parameterize code by type, so they fall under parameterization.' },
    { t: 'code', q: 'Write a generic function `filterItems<T>` that takes an array of T and a predicate `(item: T) => boolean`, and returns a new array of the items that satisfy the predicate (don\'t use Array.filter).', k: ['Signature: function filterItems<T>(items: T[], pred: (item: T) => boolean): T[]', 'Builds a new T[] result', 'Loops and pushes items where pred(item) is true'], mc: `function filterItems<T>(items: T[], pred: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (pred(item)) {
      result.push(item);
    }
  }
  return result;
}

const evens = filterItems([1, 2, 3, 4], (n) => n % 2 === 0); // number[]` },
    { t: 'tf', q: 'A class can have a generic method even if the class itself is not generic.', a: true, e: 'E.g. class Util { static wrap<T>(x: T): T[] { return [x]; } }.' },
    { t: 'mc', q: 'Which line correctly creates a Map from string keys to arrays of numbers?', o: ['const m = new Map<string, number[]>();', 'const m = new Map(string, number[]);', 'const m: Map = new Map<string>();', 'const m = Map<string -> number[]>();'], a: 0, e: 'Map takes two type arguments, <K, V>.' },
    { t: 'sa', q: 'Explain how generics help achieve the Open-Closed Principle.', k: ['A generic class/function can be used with new types without changing its source code (closed for modification)', 'Type parameter is the "extension point" (open for extension)', 'Avoids writing duplicate versions per type'], m: 'A generic class like Stack<T> is written and tested once. Supporting a new element type (Stack<Customer>) is extension through the type parameter, with no change to Stack\'s source code. So the class is open for extension and closed for modification, and you avoid a separate copy for each type.' },
    { t: 'mc', q: 'What does `class Container<T = string>` mean?', o: ['T is always string', 'T defaults to string if no type argument is given or inferred', 'T must extend string', 'Container cannot be instantiated'], a: 1, e: '= string is a default type argument.' },
    { t: 'code', q: 'Write a generic interface `Repository<T, K>` with methods `get(id: K): T | undefined`, `save(item: T): void`, and `getAll(): T[]`. Then write a class `InMemoryRepository<T extends { id: K }, K>` that implements it with a Map.', k: ['interface Repository<T, K> with the three methods', 'class InMemoryRepository<...> implements Repository<T, K>', 'Private Map<K, T>', 'save uses item.id as key (allowed because of constraint)'], mc: `interface Repository<T, K> {
  get(id: K): T | undefined;
  save(item: T): void;
  getAll(): T[];
}

class InMemoryRepository<T extends { id: K }, K> implements Repository<T, K> {
  private store = new Map<K, T>();

  get(id: K): T | undefined {
    return this.store.get(id);
  }

  save(item: T): void {
    this.store.set(item.id, item);
  }

  getAll(): T[] {
    return Array.from(this.store.values());
  }
}` },
    { t: 'tf', q: '`Array<number>` and `number[]` refer to the same type in TypeScript.', a: true, e: 'number[] is shorthand for the generic Array<number>.' },
    { t: 'mc', q: 'Which call produces a compile error, given `function longest<T extends { length: number }>(a: T, b: T): T`?', o: ['longest("abc", "de")', 'longest([1, 2], [3])', 'longest(10, 20)', 'longest({ length: 3 }, { length: 1 })'], a: 2, e: 'number has no length property, so it doesn\'t satisfy the constraint.' },
    { t: 'mc', q: 'Without generics, what would you typically have to do to make a Stack that works for numbers, strings, and Users?', o: ['Write three nearly identical classes (duplication) or use any and lose type safety', 'Nothing; TS infers it automatically', 'Use multiple inheritance', 'Use the Template Method pattern'], a: 0, e: 'Generics solve exactly this: one type-safe implementation instead of duplicated per-type classes or unsafe any.' },
    { t: 'tf', q: 'A generic class can implement a generic interface, e.g. `class ArrayList<T> implements List<T>`.', a: true, e: 'Type parameters can be passed through to the interface.' },
    { t: 'sa', q: 'What is a type parameter constraint and why would you use one? Give an example.', k: ['Constraint uses extends to limit which types T can be', 'Lets the generic code safely use members guaranteed by the constraint', 'Example such as T extends { length: number } or T extends Comparable<T> or K extends keyof T'], m: 'A constraint (T extends X) restricts the type arguments to types compatible with X. Then the generic code can safely use X\'s members. For example, function maxBy<T extends { score: number }>(items: T[]): T can read item.score, which an unconstrained T would not allow.' },
    { t: 'code', q: 'Write a generic class `Box<T>` that stores a value and has a method `map<U>(fn: (value: T) => U): Box<U>` returning a new Box with the transformed value.', k: ['class Box<T> with a private/readonly value: T set in constructor', 'Generic method map<U> with its own type parameter', 'Returns new Box<U>(fn(this.value))'], mc: `class Box<T> {
  constructor(private readonly value: T) {}

  get(): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): Box<U> {
    return new Box<U>(fn(this.value));
  }
}

const len = new Box("hello").map((s) => s.length); // Box<number>` },
    { t: 'mc', q: 'In `function wrap<T>(x: T): T[]`, what is the return type of `wrap(true)`?', o: ['T', 'boolean[]', 'any[]', 'true'], a: 1, e: 'Normally T is inferred as boolean, so the result is boolean[].' },
    { t: 'tf', q: 'You cannot use generics with arrow functions in TypeScript.', a: false, e: 'You can: const identity = <T>(x: T): T => x;' },
  ],
});

BANK.topic({
  id: 'template-method',
  group: 'reuse',
  title: 'Template Method pattern',
  notes: `
<p><strong>Intent (GoF):</strong> define the skeleton of an algorithm in an operation and defer some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.</p>
<p><strong>Problem it solves:</strong> an algorithm is duplicated in several places, and the copies are <em>similar</em> rather than identical.</p>
<h4>Structure</h4>
<div class="uml-wrap">${window.TM_UML}</div>
<ul>
  <li><strong>AbstractClass:</strong> implements the <em>template method</em> (public, usually not overridden) that calls the steps in order. It declares the varying steps as abstract <em>primitive operations</em> (protected), and may supply <em>hook</em> operations with a default (often empty) body.</li>
  <li><strong>ConcreteClass:</strong> overrides the primitive operations (and optionally the hooks) to carry out the subclass-specific steps.</li>
  <li>UML: an abstract class name in <em>italics</em> or marked «abstract»; abstract methods in italics/{abstract}; <code>+</code> public, <code>#</code> protected, <code>-</code> private; a hollow-triangle arrow from subclass up to superclass (generalization).</li>
  <li>Control is inverted, the "Hollywood principle": <em>don't call us, we'll call you</em>. The parent calls the subclass's methods.</li>
</ul>
<h4>Refactoring steps (from the slides)</h4>
<ol>
  <li>Make the similar code as similar as possible in the classes that duplicate it.</li>
  <li>Create a common base class for all classes with similar code.</li>
  <li>Put one copy of the similar method in the parent. It becomes the template method.</li>
  <li>Identify the code that varies by subclass, create abstract methods for it, and replace it in the template method with calls to those abstract methods.</li>
  <li>Override the abstract methods in the subclasses with their version of the varying code.</li>
</ol>
<h4>Classic example (slides)</h4>
<pre class="code">export abstract class Game {
  public playOneGame(playersCount: number): void {   // template method
    this.initializeGame();
    let current = 0;
    while (!this.endOfGame()) {
      this.makePlay(current);
      current = (current + 1) % playersCount;
    }
    this.printWinner();
  }
  protected abstract initializeGame(): void;
  protected abstract makePlay(playerIndex: number): void;
  protected abstract endOfGame(): boolean;
  protected abstract printWinner(): void;
}

export class Monopoly extends Game {
  protected initializeGame(): void { /* players, money */ }
  protected makePlay(i: number): void { /* one turn */ }
  protected endOfGame(): boolean { return false; }
  protected printWinner(): void { /* who won */ }
}</pre>
<p>The slides also refactor Fowler's <code>statement()</code> and <code>htmlStatement()</code> into a <code>Statement</code> class with template method <code>value(customer)</code> and abstract <code>headerString</code>, <code>eachRentalString</code> and <code>footerString</code>, implemented by <code>TextStatement</code> and <code>HtmlStatement</code>:</p>
<div class="uml-wrap">${window.STATEMENT_UML}</div>
<p><strong>Benefits:</strong> no duplication of the invariant algorithm, a single place to fix bugs, an easy way to add a new variant (a new subclass, which is OCP), and the parent controls exactly which steps subclasses may customize.</p>`,
  questions: [
    { t: 'sa', q: 'State the intent of the Template Method pattern (what design problem does it solve?).', k: ['Defines the skeleton of an algorithm in a (superclass) method', 'Defers/delegates some steps to subclasses', 'Subclasses redefine steps without changing the algorithm\'s overall structure', 'Problem: similar (not identical) algorithm duplicated in multiple classes'], m: 'Template Method defines the skeleton of an algorithm in a superclass operation and defers some of the steps to subclasses. Subclasses can redefine those steps without changing the algorithm\'s structure. It removes duplication when several classes contain algorithms that are similar but not identical.' },
    { t: 'draw', q: 'Draw the UML class diagram for the Template Method pattern. Label the abstract class, the template method, the primitive operations, and at least two concrete subclasses. Use correct visibility markers and arrows.', k: ['Abstract class shown in italics or marked «abstract»', 'Public template method in the abstract class', 'Abstract primitive operations (italic/{abstract}), typically protected (#)', 'Two or more concrete subclasses that override the primitive operations', 'Generalization arrows with hollow triangles pointing UP to the abstract class', 'Optional: a note showing the template method calling the primitive operations'], svg: window.TM_UML, m: 'An abstract class with a public templateMethod() and protected abstract primitive operations, plus concrete subclasses that override those operations. Inheritance arrows with hollow triangles point from each subclass to the abstract class.' },
    { t: 'draw', q: 'The slides refactor Fowler\'s duplicated `statement()` and `htmlStatement()` methods with Template Method. Draw the resulting UML: Customer, the abstract Statement class (with its template method and three abstract steps), and its two subclasses.', k: ['Customer with statement() and htmlStatement(), associated with (uses) Statement', 'Abstract Statement (italic name) with value(Customer) as the template method', 'Abstract headerString(Customer), eachRentalString(Rental), footerString(Customer)', 'TextStatement and HtmlStatement subclasses that implement the three steps', 'Hollow-triangle generalization arrows pointing to Statement'], svg: window.STATEMENT_UML, m: 'Customer delegates to Statement. Statement is abstract, with template method value(aCustomer) and abstract headerString, eachRentalString and footerString. TextStatement and HtmlStatement extend Statement and implement the three steps.' },
    { t: 'draw', q: 'Draw a UML class diagram for the slides\' Game example: abstract class `Game` with template method `playOneGame(playersCount)` and its four abstract steps, plus concrete subclasses `Monopoly` and `Chess`.', k: ['Game marked abstract (italics or «abstract»)', '+ playOneGame(playersCount: number): void (public, concrete)', '# initializeGame(), # makePlay(playerIndex), # endOfGame(): boolean, # printWinner() — abstract (italic/{abstract})', 'Monopoly and Chess list the four overridden steps', 'Generalization arrows (solid line, hollow triangle) from Monopoly and Chess to Game'], svg: window.TM_UML.replace(/AbstractClass/g, 'Game').replace('+ templateMethod(): void', '+ playOneGame(count): void').replace('# primitiveOp1(): void {abstract}', '# initializeGame() / makePlay(i)').replace('# primitiveOp2(): void {abstract}', '# endOfGame() / printWinner()').replace(/ConcreteClassA/g, 'Monopoly').replace(/ConcreteClassB/g, 'Chess').replace(/# primitiveOp1\(\): void/g, '# initializeGame(), makePlay()').replace(/# primitiveOp2\(\): void/g, '# endOfGame(), printWinner()').replace('templateMethod() {', 'playOneGame() {').replace('  step();', '  initializeGame();').replace('  this.primitiveOp1();', '  while (!endOfGame())').replace('  this.primitiveOp2();', '    makePlay(i); …'), m: 'Game (abstract): + playOneGame(playersCount: number): void; # initializeGame() {abstract}; # makePlay(playerIndex: number) {abstract}; # endOfGame(): boolean {abstract}; # printWinner() {abstract}. Monopoly and Chess each extend Game and implement the four protected methods. Hollow-triangle arrows point from Monopoly and Chess up to Game.' },
    { t: 'mc', q: 'In the Template Method pattern, where is the overall algorithm (the sequence of steps) defined?', o: ['In each concrete subclass', 'In a method of the abstract superclass', 'In a separate strategy object', 'In the client code'], a: 1, e: 'The superclass\'s template method fixes the order of steps. Subclasses fill in only the varying steps.' },
    { t: 'tf', q: 'In Template Method, concrete subclasses are expected to override the template method itself to customize the algorithm.', a: false, e: 'Subclasses override the primitive operations (the steps). The template method itself is normally left alone. In Java it would be final; TS has no final keyword, but the intent is the same.' },
    { t: 'mc', q: 'What visibility is most appropriate for the abstract primitive operations in a TypeScript Template Method implementation?', o: ['public', 'protected', 'private', 'static'], a: 1, e: 'Protected: subclasses must be able to override them, but outside clients shouldn\'t call the steps directly. (Private can\'t be overridden, and abstract methods can\'t be private.)' },
    { t: 'mc', q: 'The "Hollywood principle" ("Don\'t call us, we\'ll call you") describes Template Method because…', o: ['Subclasses call the parent\'s template method repeatedly', 'The parent class\'s template method calls the subclass\'s overridden operations', 'Clients must never call the template method', 'The pattern relies on callbacks passed into constructors'], a: 1, e: 'Control is inverted: the superclass drives the algorithm and calls down into subclass implementations.' },
    { t: 'tf', q: 'A "hook" operation in Template Method is a method in the superclass with a default (often empty) implementation that subclasses MAY override.', a: true, e: 'Abstract primitive operations MUST be overridden; hooks are optional extension points.' },
    { t: 'mc', q: 'In the UML for Template Method, the arrow from a concrete class to the abstract class is drawn as…', o: ['A solid line with a hollow triangle pointing to the abstract class', 'A dashed line with an open arrowhead pointing to the concrete class', 'A solid line with a filled diamond', 'A dashed line with a hollow triangle pointing to the concrete class'], a: 0, e: 'Generalization (inheritance) is a solid line with a hollow triangle at the superclass end. A dashed line with a hollow triangle means interface realization.' },
    { t: 'mc', q: 'Which UML convention indicates that a class or method is abstract?', o: ['Underlined name', 'Italic name or «abstract» / {abstract}', 'A # prefix', 'A filled diamond'], a: 1, e: 'Italics (or the «abstract» stereotype / {abstract} property) mark abstract elements. Underline means static; # means protected.' },
    { t: 'sa', q: 'List the steps for refactoring duplicated code using the Template Method pattern.', k: ['Make the similar code as similar as possible', 'Create a common base (super) class', 'Put one copy of the similar method in the base class (the template method)', 'Extract the varying code into abstract methods called from the template method', 'Override those abstract methods in each subclass'], m: '1) Make the similar code in the classes as similar as possible. 2) Create a common base class. 3) Move one copy of the similar method into the base class; this becomes the template method. 4) Identify the code that varies by subclass, create abstract methods for it, and replace it in the template method with calls to those methods. 5) Override the abstract methods in each subclass with its version of the varying code.' },
    { t: 'code', q: 'Refactor these two classes using the Template Method pattern to eliminate the duplication.', c: `class CsvExporter {
  export(rows: string[][]): string {
    let out = "";
    out += "name,score\\n";            // header
    for (const r of rows) {
      out += r.join(",") + "\\n";      // row
    }
    out += "# end\\n";                 // footer
    return out;
  }
}

class HtmlExporter {
  export(rows: string[][]): string {
    let out = "";
    out += "<table><tr><th>name</th><th>score</th></tr>\\n";
    for (const r of rows) {
      out += "<tr><td>" + r.join("</td><td>") + "</td></tr>\\n";
    }
    out += "</table>\\n";
    return out;
  }
}`, k: ['abstract class (e.g., Exporter) with a public export() template method containing the shared loop', 'Protected abstract header(), formatRow(row), footer() methods', 'CsvExporter and HtmlExporter extend the base class and only implement the three steps', 'No duplicated loop / structure remains in the subclasses'], mc: `abstract class Exporter {
  public export(rows: string[][]): string {   // template method
    let out = this.header();
    for (const r of rows) {
      out += this.formatRow(r);
    }
    out += this.footer();
    return out;
  }

  protected abstract header(): string;
  protected abstract formatRow(row: string[]): string;
  protected abstract footer(): string;
}

class CsvExporter extends Exporter {
  protected header() { return "name,score\\n"; }
  protected formatRow(r: string[]) { return r.join(",") + "\\n"; }
  protected footer() { return "# end\\n"; }
}

class HtmlExporter extends Exporter {
  protected header() { return "<table><tr><th>name</th><th>score</th></tr>\\n"; }
  protected formatRow(r: string[]) {
    return "<tr><td>" + r.join("</td><td>") + "</td></tr>\\n";
  }
  protected footer() { return "</table>\\n"; }
}` },
    { t: 'mc', q: 'In the slides\' Game example, which method is the template method?', o: ['initializeGame()', 'makePlay(playerIndex)', 'playOneGame(playersCount)', 'printWinner()'], a: 2, e: 'playOneGame() fixes the algorithm (initialize, loop over turns until the game ends, print the winner) and calls the abstract steps.' },
    { t: 'tf', q: 'In the slides\' Game example, `Monopoly` overrides `initializeGame`, `makePlay`, `endOfGame`, and `printWinner`.', a: true, e: 'Those four are the abstract primitive operations Game declares.' },
    { t: 'mc', q: 'When the slides refactor Fowler\'s `statement()` and `htmlStatement()`, which methods become abstract in `Statement`?', o: ['value(), statement(), htmlStatement()', 'headerString(), eachRentalString(), footerString()', 'getCharge(), getTitle(), getName()', 'Only value()'], a: 1, e: 'value(customer) is the template method; headerString, eachRentalString and footerString are the varying steps implemented by TextStatement and HtmlStatement.' },
    { t: 'tf', q: 'Template Method is most useful when the duplicated algorithms are IDENTICAL; if they are only similar you should use plain inheritance.', a: false, e: 'Reversed. Identical code can be moved into one shared method (composition or a superclass method). Template Method is for SIMILAR algorithms whose steps vary.' },
    { t: 'mc', q: 'How does Template Method support the Open-Closed Principle?', o: ['New variants of the algorithm are added by writing new subclasses, without modifying the superclass\'s template method', 'It prevents any subclassing', 'It uses generics to avoid modification', 'It modifies the base class for each new variant'], a: 0, e: 'The skeleton is closed for modification; new behavior comes from new subclasses (open for extension).' },
    { t: 'sa', q: 'Give two benefits of applying the Template Method pattern.', k: ['Eliminates duplication of the invariant parts of the algorithm (one place to change/fix bugs)', 'Easy to add new variations by subclassing (OCP)', 'Superclass controls which steps can vary / enforces algorithm structure', 'Improves consistency/maintainability'], m: 'The invariant part of the algorithm exists in only one place, so changes and bug fixes happen once. New variations are added by writing a subclass without touching the existing code (OCP). The superclass also controls the order of steps and decides which steps subclasses may customize.' },
    { t: 'mc', q: 'Which TypeScript keyword declares a step that subclasses MUST implement?', o: ['virtual', 'abstract', 'override', 'interface'], a: 1, e: 'protected abstract step(): void; forces concrete subclasses to implement it. (override is optional TS syntax used on the implementing side.)' },
    { t: 'tf', q: 'An abstract class in TypeScript can contain both implemented (concrete) methods and abstract methods.', a: true, e: 'That\'s exactly what Template Method needs: a concrete template method plus abstract steps.' },
    { t: 'tf', q: 'You can instantiate an abstract class directly with `new` in TypeScript.', a: false, e: 'new AbstractClass() is a compile error. You must instantiate a concrete subclass.' },
    { t: 'code', q: 'Write an abstract class `DataProcessor` with a template method `process(): void` that calls `readData()`, `transform(data)`, then `save(result)`. Include a hook `beforeSave()` with an empty default implementation. Then write one concrete subclass.', k: ['abstract class with public process() calling steps in order', 'protected abstract readData(): T / transform(...) / save(...)', 'protected beforeSave(): void {} hook with default empty body, called before save', 'A concrete subclass overriding the abstract steps (and optionally the hook)'], mc: `abstract class DataProcessor {
  public process(): void {          // template method
    const data = this.readData();
    const result = this.transform(data);
    this.beforeSave();              // hook
    this.save(result);
  }

  protected abstract readData(): string[];
  protected abstract transform(data: string[]): string[];
  protected abstract save(result: string[]): void;

  protected beforeSave(): void {}    // optional hook
}

class UppercaseProcessor extends DataProcessor {
  protected readData() { return ["a", "b"]; }
  protected transform(d: string[]) { return d.map((s) => s.toUpperCase()); }
  protected save(r: string[]) { console.log(r.join(",")); }
  protected beforeSave() { console.log("saving..."); }
}` },
    { t: 'mc', q: 'Template Method relies on which language mechanism to call the subclass-specific step?', o: ['Generics', 'Polymorphism / dynamic dispatch of overridden methods', 'Static methods', 'Closures'], a: 1, e: 'this.step() inside the superclass dispatches to the subclass\'s override at runtime.' },
    { t: 'tf', q: 'GoF recommends keeping the number of primitive operations a subclass must override to a minimum.', a: true, e: 'The more steps that must be overridden, the more tedious it is to write a new subclass.' },
    { t: 'mc', q: 'In the Template Method UML, what does the `#` symbol before `primitiveOp1()` mean?', o: ['public', 'private', 'protected', 'static'], a: 2, e: '+ public, - private, # protected, ~ package.' },
    { t: 'sa', q: 'Give an example (other than games or statements) where you might use Template Method, and name the template method and at least two steps.', k: ['A plausible algorithm with a fixed sequence and varying steps', 'Names a template method in an abstract class', 'Names at least two primitive operations implemented differently by subclasses'], m: 'Example: an abstract class ReportGenerator with template method generate() that calls fetchData(), formatBody() and writeOutput(). PdfReport and CsvReport subclasses implement formatBody() and writeOutput() differently, while the fetch/format/write sequence stays in one place. (Other good answers: a Tweeter presenter base class whose template method loads items and calls an abstract getItemDescription() or service call; a test fixture with setUp/run/tearDown; a data parser.)' },
    { t: 'mc', q: 'Your two presenters, `FollowersPresenter` and `FolloweesPresenter`, each have a `loadMoreItems()` method that is identical except for which service method they call and the error message text. Best refactoring?', o: ['Merge them into one class with a boolean flag', 'Create an abstract base presenter with a template loadMoreItems() and abstract getMoreItems() / getItemDescription() steps', 'Copy one method into a static utility class with a big if-statement', 'Leave the duplication'], a: 1, e: 'This is the textbook Template Method case (and what the Tweeter milestone does): the shared flow lives in the base class and the varying service call and message are abstract steps.' },
  ],
});

BANK.topic({
  id: 'ocp',
  group: 'reuse',
  title: 'Open-Closed Principle',
  notes: `
<p><strong>Software entities (classes, functions, libraries, etc.) should be open for extension but closed for modification.</strong></p>
<ul>
  <li><strong>Open:</strong> the <em>behavior</em> of the entity can be extended or customized to meet new requirements.</li>
  <li><strong>Closed:</strong> the <em>source code</em> of the entity is not modified to do so. (Martin: the source and binary stay untouched.)</li>
</ul>
<h4>Why avoid changing working code? (slides)</h4>
<ul>
  <li>You might introduce bugs into working code.</li>
  <li>You might break code that depends on what you changed (ripple effects).</li>
  <li>You might not even have the source, because it's part of an external library or framework.</li>
</ul>
<h4>Ways to implement OCP (slides)</h4>
<ul>
  <li><strong>Parameterize</strong> the class or function: generic type parameters (generic programming), passed-in algorithms (Strategy), passed-in dependencies (Dependency Injection).</li>
  <li><strong>Class inheritance:</strong> override superclass methods in a subclass (Template Method), or add new methods and fields in a subclass.</li>
  <li><strong>Composition / wrapping:</strong> Adapter and Decorator patterns.</li>
</ul>
<h4>From Martin (Agile Principles, Patterns, and Practices)</h4>
<ul>
  <li><strong>Abstraction is the key.</strong> Clients depend on a fixed abstraction (interface or abstract class), and new behavior comes from new derived classes.</li>
  <li>Classic violation: <code>drawAllShapes()</code> with a <code>switch</code> on shape type. Every new shape forces you to edit the function (rigidity, fragility). The fix is an abstract <code>Shape</code> with <code>draw()</code>, so adding a <code>Triangle</code> means adding a class without editing the loop.</li>
  <li><strong>Strategic closure:</strong> no non-trivial program is 100% closed. You choose which kinds of change to close against, based on experience and on the changes that actually happen.</li>
  <li>"Fool me once…": don't add abstractions speculatively (YAGNI). When a change first hits you, refactor so that kind of change is easy the next time.</li>
  <li>Symptoms of OCP violations are <em>rigidity</em> (one change cascades), <em>fragility</em> (changes break unrelated things) and <em>immobility</em> (hard to reuse).</li>
</ul>`,
  questions: [
    { t: 'sa', q: 'State the Open-Closed Principle. What should be open, and what should be closed?', k: ['Software entities should be open for extension but closed for modification', 'OPEN: the behavior/functionality can be extended or customized', 'CLOSED: the existing source code is not modified to make the change'], m: 'Software entities (classes, functions, modules, libraries) should be open for extension but closed for modification. The behavior should be open: you can extend or customize what the entity does to meet new needs. The source code should be closed: you get the new behavior without editing the existing, working code.' },
    { t: 'mc', q: 'Under OCP, what exactly is "closed"?', o: ['The class\'s public interface can never be used', 'The entity\'s source code should not need to be modified to add new behavior', 'The class cannot be subclassed', 'The class\'s data is private'], a: 1, e: 'Closed for modification means you don\'t edit the existing source. You extend it instead.' },
    { t: 'sa', q: 'Give three reasons, from the slides, why changing a class\'s or function\'s source code to customize its behavior is undesirable.', k: ['Might introduce bugs into working code', 'Might break code that depends on it (ripple effects)', 'Might not have the source because it\'s part of an external library/framework'], m: '1) You might introduce bugs into code that already works. 2) You might break other code that depends on the class or function (ripple effects). 3) You might not have the source code at all, for example because it comes from an external library or framework.' },
    { t: 'mc', q: 'Which of the following is NOT listed in the slides as a way to implement OCP?', o: ['Generic type parameters', 'Passing in algorithms (Strategy)', 'Overriding superclass methods (Template Method)', 'Editing the switch statement every time a new type is added'], a: 3, e: 'Editing existing code for each new case is exactly what OCP tries to avoid.' },
    { t: 'mc', q: 'Which code most clearly VIOLATES the Open-Closed Principle?', c: `function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.r ** 2;
    case "square": return shape.side ** 2;
    // add a case here for every new shape...
  }
}`, o: ['It uses Math.PI', 'Adding a new shape requires modifying area()\'s source code', 'It returns a number', 'It uses a parameter'], a: 1, e: 'Every new shape forces you to edit area(). Fix: give each shape class its own area() method behind a Shape interface.' },
    { t: 'code', q: 'Refactor this `area` function so that it follows OCP: adding a Triangle should not require modifying existing code.', c: `function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.r ** 2;
    case "square": return shape.side ** 2;
    // add a case here for every new shape...
  }
}`, k: ['Shape interface or abstract class with area(): number', 'Circle and Square classes each implement area()', 'Client code calls shape.area() polymorphically, no switch', 'New shapes are added as new classes only'], mc: `interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private r: number) {}
  area(): number { return Math.PI * this.r ** 2; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area(): number { return this.side ** 2; }
}

// Adding a shape = adding a class. Nothing above changes.
class Triangle implements Shape {
  constructor(private b: number, private h: number) {}
  area(): number { return 0.5 * this.b * this.h; }
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}` },
    { t: 'tf', q: 'According to Robert Martin, abstraction (interfaces / abstract base classes) is the key to achieving OCP.', a: true, e: 'Clients depend on a fixed abstraction; new behavior comes from new implementations of it.' },
    { t: 'tf', q: 'A well-designed, non-trivial program can be made 100% closed against all possible changes.', a: false, e: 'Martin: closure can\'t be complete. Designers must strategically choose which kinds of changes to close the design against.' },
    { t: 'mc', q: 'What does "strategic closure" mean?', o: ['Closing every class with the final keyword', 'Choosing which kinds of change to protect against, based on the changes most likely to happen', 'Never modifying code after the first release', 'Closing database connections strategically'], a: 1, e: 'Since you can\'t close against everything, you anticipate (or learn from) the most likely changes and add abstractions there.' },
    { t: 'mc', q: 'The Decorator and Adapter patterns implement OCP through…', o: ['Generic types', 'Class inheritance', 'Composition / wrapping', 'Copying code'], a: 2, e: 'They wrap an existing object to add or adapt behavior without modifying the wrapped class.' },
    { t: 'tf', q: 'Template Method helps achieve OCP because new variations are added by writing new subclasses rather than editing the template method.', a: true, e: 'The template method is closed; subclasses provide the extension.' },
    { t: 'mc', q: 'A `ReportService` class does `if (format === "pdf") {...} else if (format === "csv") {...}`. A product manager now wants XML. What is the OCP-friendly change?', o: ['Add another else-if for XML', 'Introduce a ReportFormatter interface, inject it into ReportService, and add an XmlFormatter class', 'Copy ReportService into XmlReportService', 'Make format a global variable'], a: 1, e: 'Strategy plus dependency injection: ReportService is closed, and new formats are new classes.' },
    { t: 'mc', q: 'Passing a dependency into a class\'s constructor (dependency injection) supports OCP because…', o: ['The class can be given new behavior by passing in a different implementation without changing the class', 'It makes all fields public', 'It removes the need for interfaces', 'It speeds up the constructor'], a: 0, e: 'Inject a different implementation of the interface and the class behaves differently, with no edit to its source.' },
    { t: 'tf', q: 'OCP says you should add as many extension points and abstractions as possible up front, in case they are needed in the future.', a: false, e: 'That violates Simplicity / YAGNI. Martin\'s advice: "Fool me once…" Add the abstraction when a change of that kind actually happens, then protect against future ones.' },
    { t: 'mc', q: 'What are symptoms of a design that violates OCP?', o: ['Rigidity, fragility, immobility', 'High cohesion and low coupling', 'Fast compile times', 'Too many interfaces'], a: 0, e: 'A single change cascades into many modules (rigidity), changes break other things (fragility), and modules are hard to reuse (immobility).' },
    { t: 'sa', q: 'How are "avoid code duplication" and the Open-Closed Principle related?', k: ['To avoid duplication you create one reusable copy of code', 'That copy must be customizable for each use without editing it — which is OCP', 'Techniques like generics, Template Method, Strategy serve both goals'], m: 'If similar code is needed in several places, you avoid duplication by writing one reusable copy. For that one copy to serve each place\'s particular needs, it has to be customizable without changing its source, which is exactly what OCP asks. Generics, inheritance (Template Method) and composition (Strategy, Decorator) serve both goals.' },
    { t: 'tf', q: 'A generic `List<T>` class illustrates OCP: it can be used with new element types without modifying its source.', a: true, e: 'The type parameter is the extension point.' },
    { t: 'mc', q: 'Which is the best example of a class being "open for extension"?', o: ['A class with all public fields', 'A sorting function that accepts a comparator, so new orderings need no change to the sort function', 'A class that reads a config value and branches on it in every method', 'A class marked final'], a: 1, e: 'The comparator parameter lets callers extend the behavior (Strategy) while the sort stays closed.' },
    { t: 'code', q: 'This `Logger` writes only to the console. Refactor it so new destinations (file, network, etc.) can be added without modifying `Logger`.', c: `class Logger {
  log(msg: string) {
    console.log("[" + new Date().toISOString() + "] " + msg);
  }
}`, k: ['LogSink / Destination interface with write(line: string)', 'Logger takes a sink (or sinks) via constructor (DI)', 'ConsoleSink implementation; new sinks are new classes', 'Logger itself no longer changes for new destinations'], mc: `interface LogSink {
  write(line: string): void;
}

class ConsoleSink implements LogSink {
  write(line: string) { console.log(line); }
}

class Logger {
  constructor(private sinks: LogSink[]) {}

  log(msg: string) {
    const line = "[" + new Date().toISOString() + "] " + msg;
    for (const s of this.sinks) s.write(line);
  }
}

// Extension without modification:
class MemorySink implements LogSink {
  lines: string[] = [];
  write(line: string) { this.lines.push(line); }
}` },
    { t: 'tf', q: 'Adding a brand-new method to a subclass (without overriding anything) is one form of extension via inheritance listed in the slides.', a: true, e: 'The slides list "Add new methods and fields in subclass" under class inheritance.' },
    { t: 'mc', q: 'Which design pattern lets you pass in an algorithm to customize behavior, supporting OCP through parameterization?', o: ['Strategy', 'Singleton', 'Template Method', 'Observer'], a: 0, e: 'Strategy: pass in the algorithm. (Template Method gets a similar result through inheritance.)' },
    { t: 'tf', q: 'Fixing a bug in a class violates the Open-Closed Principle.', a: false, e: 'OCP is about adding new behavior or features through extension. Fixing defects in existing code is normal maintenance.' },
    { t: 'sa', q: 'Name the three general categories of techniques for implementing OCP from the slides, with one specific technique or pattern for each.', k: ['Parameterization — generics, Strategy (pass-in algorithm), or dependency injection', 'Inheritance — override methods (Template Method) or add methods/fields in subclass', 'Composition/wrapping — Adapter or Decorator'], m: 'Parameterization: generic type parameters, passing in algorithms (Strategy) or passing in dependencies (DI). Class inheritance: overriding superclass methods (Template Method) or adding new methods/fields in a subclass. Composition/wrapping: Adapter or Decorator.' },
    { t: 'mc', q: 'You use a third-party `HttpClient` class from npm and need it to also log every request. You can\'t edit its source. Which OCP technique fits best?', o: ['Edit node_modules directly', 'Wrap it in a LoggingHttpClient that delegates to the real client (Decorator)', 'Copy the library into your project and modify it', 'Use a global variable'], a: 1, e: 'Wrapping/Decorator extends behavior without modifying code you don\'t own.' },
    { t: 'tf', q: 'OCP applies to functions as well as classes.', a: true, e: '"Software entities (classes, functions, libraries, etc.)" — a function that takes a callback is open for extension, for example.' },
  ],
});
