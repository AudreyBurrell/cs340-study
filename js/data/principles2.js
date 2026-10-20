/* Design principles part 2 */

BANK.topic({
  id: 'abstraction',
  group: 'principles',
  title: 'High-quality abstraction',
  notes: `
<p>Commandment 6: <strong>Thou shalt create high-quality abstractions through good naming, information hiding, and avoiding primitive obsession.</strong> High-quality abstractions are small and simple, obey SRP, are <strong>well named</strong>, and <strong>abstract all the way</strong>.</p>
<h4>Good naming</h4>
<ul>
  <li>Abstraction means taking something complicated, giving it a short descriptive name, and referring to it by that name. The identifier is the key tool.</li>
  <li>Names should clearly and accurately reflect what the thing does: <code>Printer</code>, <code>calculatePayrollTax</code>, <code>homeAddress</code>. Not <code>Thingy</code>, <code>doStuff</code>, <code>info</code>.</li>
  <li><strong>Class names are nouns; method names are verbs.</strong> Getters and setters are the common exception.</li>
</ul>
<h4>Abstract all the way: avoid primitive obsession</h4>
<p>When might a new class be better than a primitive (string or int)? This is an exam question; give at least two:</p>
<ol>
  <li><strong>Domain checking:</strong> validate in the constructor. A <code>PhoneNumber</code> class parses its string and throws if it's invalid. Most strings aren't valid phone numbers.</li>
  <li><strong>Additional operations:</strong> a home for related behavior. A <code>URL</code> class can parse its parts and resolve relative URLs.</li>
  <li><strong>Code readability:</strong> a variable, parameter or return type of <code>URL</code> says far more than <code>string</code>. Return values have no names, so the type has to carry the meaning.</li>
</ol>`,
  questions: [
    { t: 'sa', q: 'In situations where a primitive type (int or string, say) could be used to represent a concept, when might it be better to create a new class instead of using that primitive? Give at least two reasons.', k: ['Domain checking — validate values (e.g., PhoneNumber constructor throws on invalid input)', 'Additional operations — provides a home for related operations (e.g., URL parsing, resolving)', 'Code readability — type names like URL/PhoneNumber describe what the data is (especially return values)'], m: 'Any two (all three is best): (1) Domain checking: a class can validate its value, e.g. a PhoneNumber constructor parses the string and throws if it isn\'t a valid number, so invalid values can\'t exist. (2) Additional operations: the class is a natural home for operations on the value, such as a URL class that parses components or resolves relative URLs. (3) Readability: a parameter, variable or return type of URL or PhoneNumber tells the reader much more than string, which matters especially for return values since they have no names.' },
    { t: 'mc', q: 'What is "primitive obsession"?', o: ['Using built-in types (string, number) to represent domain concepts that deserve their own class', 'Using too many classes', 'Overusing generics', 'Optimizing code prematurely'], a: 0, e: '"Abstract all the way" is the cure.' },
    { t: 'mc', q: 'Which is the best reason to create an `EmailAddress` class instead of using `string`?', o: ['The constructor can validate the format, so invalid emails can\'t exist in the program', 'Strings use too much memory', 'TypeScript forbids string parameters', 'It avoids the need for tests'], a: 0, e: 'Domain checking.' },
    { t: 'tf', q: 'In general, class names should be nouns and method names should be verbs.', a: true, e: 'With exceptions such as getters and setters.' },
    { t: 'mc', q: 'Which is the best name for a method that computes payroll taxes?', o: ['calculatePayrollTax', 'doStuff', 'tax', 'PayrollTaxes'], a: 0, e: 'Verb phrase, clear and accurate. (PayrollTaxes reads like a class name.)' },
    { t: 'mc', q: 'The paper criticizes which names as conveying no information?', o: ['Thingy, doStuff, info', 'Printer, homeAddress', 'calculatePayrollTax, search', 'ClassRoll, URL'], a: 0, e: 'Meaningless names lose much of the benefit of abstraction.' },
    { t: 'code', q: 'Replace the primitive `string` phone numbers with a high-quality abstraction.', c: `function sendSms(phone: string, msg: string) {
  if (!/^\\d{3}-\\d{3}-\\d{4}$/.test(phone)) throw new Error("bad phone");
  // ...
}
function formatPhone(phone: string): string {
  return "(" + phone.slice(0, 3) + ") " + phone.slice(4);
}`, k: ['PhoneNumber class whose constructor validates and throws on invalid input', 'Operations like format()/toString() live in the class', 'sendSms takes a PhoneNumber (readability; no re-validation needed)'], mc: `class PhoneNumber {
  private readonly value: string;

  constructor(raw: string) {
    if (!/^\\d{3}-\\d{3}-\\d{4}$/.test(raw)) {
      throw new Error("Invalid phone number: " + raw);
    }
    this.value = raw;
  }

  format(): string {
    return "(" + this.value.slice(0, 3) + ") " + this.value.slice(4);
  }

  toString(): string {
    return this.value;
  }
}

function sendSms(phone: PhoneNumber, msg: string) {
  // phone is guaranteed valid
}` },
    { t: 'tf', q: 'Creating a class for a simple value like a URL is pointless because internally it still stores a string.', a: false, e: 'The class adds domain checking, a place for operations, and readability, even though the data inside is a string.' },
    { t: 'mc', q: 'The "Additional Operations" reason for creating a class is illustrated in the paper by…', o: ['A URL class providing parsing and resolving relative URLs', 'A PhoneNumber validating input', 'A Printer class name', 'A Digit class'], a: 0, e: 'Without a URL class, there\'s no natural home for URL-related operations.' },
    { t: 'mc', q: 'Why does the paper say readability gains from custom types matter especially for RETURN values?', o: ['Return values don\'t have names, so the type is the main clue to what they represent', 'Return values are faster', 'Return values can\'t be strings', 'Return values are always public'], a: 0, e: 'A parameter can be well named; a return value can only be described by its type (and the method name).' },
    { t: 'tf', q: 'High-quality abstractions should be sufficiently small and simple and obey the Single Responsibility Principle.', a: true, e: 'Stated at the start of the High-Quality Abstraction section.' },
    { t: 'mc', q: 'Which pair of principles does the paper say helps create high-quality abstractions (in addition to small size and SRP)?', o: ['Good naming and abstracting all the way', 'Generics and inheritance', 'Mocks and spies', 'YAGNI and DRY'], a: 0, e: 'Good naming and "Abstract All the Way" (avoid primitive obsession).' },
    { t: 'sa', q: 'Explain why good naming is called "one of the most important tools for achieving effective abstraction."', k: ['Abstraction = giving a complicated thing a short, descriptive name and referring to it by name', 'Names determine readability of code', 'A poorly named class (Thingy vs Printer) loses much of the benefit even if the class is right'], m: 'Abstraction means taking something complicated, giving it a short descriptive name, and then referring to it by that name, which lets complex ideas be expressed concisely. So the identifier carries the abstraction. A well-designed class named Thingy instead of Printer loses much of its value, because readers can\'t tell what it represents.' },
    { t: 'tf', q: 'A method named `getName` violates the "methods should be verbs" guideline.', a: false, e: 'get is a verb. Also, getters and setters are explicitly mentioned as acceptable exceptions; some styles even use a noun like name().' },
    { t: 'mc', q: 'Which is an example of primitive obsession?', o: ['function transfer(from: string, to: string, amountCents: number, currency: string)', 'function transfer(from: Account, to: Account, amount: Money)', 'class Money { constructor(cents: number, currency: Currency) }', 'class Account { id: AccountId }'], a: 0, e: 'Accounts, money and currency are all represented by primitives with no validation or meaning.' },
    { t: 'tf', q: 'Creating a class like PayGrade or Title to represent a simple concept is often the better choice compared to a raw string or integer.', a: true, e: '"Creating classes to represent relatively simple abstractions is often the better choice."' },
    { t: 'mc', q: 'Where should validation for a `PhoneNumber` class be performed, according to the paper?', o: ['Probably in the constructor', 'In every method that uses a phone number', 'In the database', 'Nowhere'], a: 0, e: 'Invalid strings make the constructor throw an exception.' },
    { t: 'mc', q: 'Which variable name is the best abstraction?', o: ['secondsUntilTimeout', 'x', 'data2', 'temp'], a: 0, e: 'It accurately describes what the variable holds, including its unit.' },
    { t: 'code', q: 'Improve the abstraction quality of this code (naming and primitive obsession).', c: `class Mgr {
  doIt(a: string, b: number): number {
    if (b < 0 || b > 100) throw new Error();
    return b >= 90 ? 4.0 : b >= 80 ? 3.0 : 2.0;
  }
}`, k: ['Meaningful class and method names (e.g., GradeCalculator.gradePointsFor)', 'Meaningful parameter names (studentId, percentage)', 'Possibly a Percentage/Score class that validates 0–100 in its constructor', 'Error message explains the problem'], mc: `class Percentage {
  constructor(readonly value: number) {
    if (value < 0 || value > 100) {
      throw new Error("Percentage must be 0–100, got " + value);
    }
  }
}

class GradeCalculator {
  gradePointsFor(score: Percentage): number {
    if (score.value >= 90) return 4.0;
    if (score.value >= 80) return 3.0;
    return 2.0;
  }
}` },
    { t: 'tf', q: 'Giving variables and parameters good names helps tell the reader what kind of data they represent, which partly reduces the readability benefit of custom types.', a: true, e: 'The paper acknowledges this, while noting return values have no names.' },
    { t: 'mc', q: 'Commandment #6 says create high-quality abstractions through…', o: ['Good naming, information hiding, and avoiding primitive obsession', 'Inheritance, generics, and mocks', 'Simplicity, duplication, and testing', 'Lambda, API Gateway, and S3'], a: 0, e: 'Ten Design Commandments #6.' },
    { t: 'sa', q: 'Give an example of a concept commonly stored as a primitive that would benefit from its own class, and explain which of the three reasons applies.', k: ['Names a plausible concept (e.g., Money, EmailAddress, Url, AccountId, Temperature, DateRange)', 'Connects it to domain checking, additional operations, and/or readability'], m: 'Example: Money stored as a number. A Money class can reject negative amounts or mismatched currencies (domain checking), provide add() and format() (additional operations), and makes signatures like charge(amount: Money) clearer than charge(amount: number) (readability).' },
    { t: 'mc', q: 'A function returns `string`. Which return type would most improve readability if the string is always a URL?', o: ['URL (a custom class or the built-in URL type)', 'any', 'object', 'unknown'], a: 0, e: 'The type documents what is returned.' },
    { t: 'tf', q: 'Abstraction lets complex ideas be expressed very concisely in code.', a: true, e: 'By naming them and referring to them by name.' },
    { t: 'mc', q: 'Taking "abstract all the way" too far (e.g., a Digit class) is an example of…', o: ['Hyper-decomposition', 'Information hiding', 'Orthogonality', 'Strategic closure'], a: 0, e: 'Balance is needed.' },
  ],
});

BANK.topic({
  id: 'info-hiding',
  group: 'principles',
  title: 'Information hiding',
  notes: `
<p>Related term: <em>data hiding</em>. Modules should hide their internal implementations so other modules <strong>can't depend on those details</strong>. That keeps you free to change the internals without breaking other classes. It exists to serve Minimize Dependencies.</p>
<h4>Four specific ways (exam: list 2)</h4>
<ol>
  <li><strong>Visibility:</strong> limit the visibility of classes, methods and variables with <code>private</code>/<code>protected</code>/<code>public</code>. Make things private whenever possible and rarely make variables public or protected. Nest classes and interfaces and limit their visibility.</li>
  <li><strong>Naming:</strong> choose names that don't reveal implementation details. <code>search</code> instead of <code>binarySearch</code>, <code>ClassRoll</code> instead of <code>StudentLinkedList</code>. Exception: a class inherently tied to its implementation, like <code>HashTable</code>.</li>
  <li><strong>Separate interface from implementation:</strong> C++ .h/.cpp files, Java/TS interfaces.</li>
  <li><strong>Data hiding:</strong> internal data structures are private and accessed only through the public method interface.</li>
</ol>
<h4>Benefits of data hiding (encapsulation)</h4>
<ol>
  <li>Freedom to change data structure choices without affecting client code.</li>
  <li>Clients get a convenient method interface for working with the data.</li>
  <li>Data integrity is protected, since clients can't change the data in illegal ways.</li>
  <li>Internal optimizations become possible (e.g. internal indexes for fast lookups).</li>
</ol>`,
  questions: [
    { t: 'sa', q: 'List 2 specific ways to achieve information hiding.', k: ['Visibility — make members private/protected as much as possible', 'Naming — names that don\'t reveal implementation (search vs binarySearch)', 'Separate interface from implementation (interfaces, .h/.cpp)', 'Data hiding — private data accessed only through public methods'], m: 'Any two of the four: (1) Visibility: make variables and methods private whenever possible and only make methods public when necessary. (2) Naming: pick names that don\'t reveal the implementation, e.g. search instead of binarySearch, or ClassRoll instead of StudentLinkedList. (3) Separate interface from implementation, e.g. a TS/Java interface or C++ header files. (4) Data hiding: keep internal data structures private and expose them only through the class\'s methods.' },
    { t: 'mc', q: 'Why is `binarySearch` a worse method name than `search`, from an information-hiding perspective?', o: ['It reveals the implementation, binding the method to that algorithm forever', 'It is too long', 'Binary search is slow', 'Method names must be one word'], a: 0, e: 'Callers would be misled if you switched to a hash lookup. search keeps that freedom.' },
    { t: 'mc', q: 'Which class name best follows information hiding for a grade-keeping program\'s list of students?', o: ['ClassRoll', 'StudentLinkedList', 'StudentArrayWrapper', 'LinkedListOfStudentObjects'], a: 0, e: 'ClassRoll hides that students are stored in a linked list.' },
    { t: 'tf', q: 'It is appropriate to name a class `HashTable` if its sole purpose is to implement a hash table.', a: true, e: 'Its implementation is inherent to its existence. Clients of HashTable, however, shouldn\'t reveal that they use one.' },
    { t: 'mc', q: 'Which is NOT one of the four benefits of data hiding listed in the paper?', o: ['Freedom to change data structure choices without affecting client code', 'Protects data integrity', 'Allows internal optimizations such as indexes', 'Makes the class run without any memory'], a: 3, e: 'The four: freedom to change, a nice method interface, data integrity, internal optimizations.' },
    { t: 'tf', q: 'According to the paper, class variables should rarely be made public or protected.', a: true, e: '"Rarely make variables public or protected, opting to have data accessed through appropriate method calls."' },
    { t: 'mc', q: 'Information hiding primarily serves which other principle?', o: ['Minimize dependencies', 'Algorithm selection', 'YAGNI', 'Error handling'], a: 0, e: '"In order to minimize dependencies, modules should hide their internal implementations…"' },
    { t: 'code', q: 'Apply information hiding to this class.', c: `class BankAccount {
  public balance: number = 0;
  public transactions: number[] = [];
}

// client code
acct.balance -= 500;          // no checks!
acct.transactions.push(-500);`, k: ['Make balance and transactions private', 'Expose methods like deposit(amount)/withdraw(amount) that validate (protect integrity)', 'Provide a read-only getter for balance (and maybe a copy of transactions)', 'Client no longer manipulates internals directly'], mc: `class BankAccount {
  private balance = 0;
  private transactions: number[] = [];

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
    this.transactions.push(amount);
  }

  withdraw(amount: number): void {
    if (amount <= 0 || amount > this.balance) {
      throw new Error("Invalid withdrawal");
    }
    this.balance -= amount;
    this.transactions.push(-amount);
  }

  getBalance(): number {
    return this.balance;
  }

  getTransactions(): readonly number[] {
    return [...this.transactions];
  }
}` },
    { t: 'tf', q: 'Information hiding means hiding source code from other developers on the team.', a: false, e: 'It means hiding implementation details from other modules (code), so they can\'t depend on them.' },
    { t: 'mc', q: 'A class exposes `getItems(): Item[]` that returns its internal array directly. What information-hiding problem can this cause?', o: ['Clients can mutate the internal array, bypassing the class\'s rules', 'It is too slow', 'It violates SRP', 'It won\'t compile'], a: 0, e: 'Return a copy or a readonly view to protect integrity.' },
    { t: 'mc', q: 'Which TypeScript feature directly supports "separate interface from implementation"?', o: ['interface declarations', 'var', 'any', 'console.log'], a: 0, e: 'Clients depend on the interface; implementations can vary.' },
    { t: 'sa', q: 'Explain how information hiding preserves our ability to change a class.', k: ['If internals are private, other classes cannot depend on them', 'So internal implementation can change (data structures, algorithms) without breaking clients', 'Only the public interface is a contract'], m: 'When a class keeps its variables and helper methods private, other classes can only use its public interface and can\'t depend on how it works inside. So we can change the internal data structures or algorithms, for example switching from a list to a map, and as long as the public interface behaves the same, no client breaks.' },
    { t: 'tf', q: 'Nesting classes or interfaces inside other classes, and limiting their visibility, is a way to achieve information hiding.', a: true, e: 'Listed under Visibility.' },
    { t: 'mc', q: 'Which code violates information hiding?', o: ['presenter.view.rootElement.children[2].innerText = "Hi"', 'presenter.displayGreeting("Hi")', 'service.getUser(alias)', 'account.getBalance()'], a: 0, e: 'It reaches through the view\'s internal DOM structure.' },
    { t: 'tf', q: 'Data hiding allows a class to make internal optimizations, such as creating indexes to make lookups fast, without clients knowing.', a: true, e: 'Benefit #4 of data hiding.' },
    { t: 'mc', q: 'A `UserCache` class is named `UserCacheUsingLocalStorage`. What is the main issue?', o: ['The name reveals an implementation detail that might change (e.g., to IndexedDB)', 'The name is too short', 'It should be an interface', 'Nothing'], a: 0, e: 'Naming that ties clients to an implementation.' },
    { t: 'tf', q: 'Making a field `protected` hides it completely from all other classes.', a: false, e: 'Subclasses can still see and depend on protected members, so it\'s only partial hiding.' },
    { t: 'mc', q: 'Data hiding "gives clients a nice method interface." Which is an example?', o: ['A Stack offering push/pop/peek instead of exposing its array', 'A Stack exposing a public items array', 'A Stack with no methods', 'A Stack extending Array'], a: 0, e: 'Convenient, intention-revealing operations.' },
    { t: 'sa', q: 'Give two benefits of data hiding (encapsulation) from the paper.', k: ['Freedom to change data structures without affecting clients', 'Nice method interface for manipulating data', 'Protects data integrity (no illegal changes)', 'Allows internal optimizations (indexes)'], m: 'Any two: freedom to change data-structure choices without affecting clients; a convenient method interface for clients; protection of data integrity, since clients can\'t make illegal changes; and room for internal optimizations like indexes.' },
    { t: 'code', q: 'This class leaks its internal representation through its name and its public field. Fix both.', c: `class StudentArrayList {
  public arr: Student[] = [];
  binarySearchById(id: string): Student | undefined { /* ... */ return undefined; }
}`, k: ['Rename class to describe the concept (e.g., ClassRoll / Roster)', 'Make the array private', 'Rename binarySearchById to find/findById (hide algorithm)', 'Add methods like add(student) and list access as needed'], mc: `class ClassRoll {
  private students: Student[] = [];

  add(student: Student): void {
    this.students.push(student);
  }

  findById(id: string): Student | undefined {
    return this.students.find((s) => s.id === id);
  }

  size(): number {
    return this.students.length;
  }
}` },
    { t: 'tf', q: 'Information hiding is commandment #6 territory ("…through good naming, information hiding…") and supports commandment #4 (minimize dependencies).', a: true, e: 'Both connections hold.' },
    { t: 'mc', q: 'Which practice best follows the Visibility guidance?', o: ['Make methods public only when other classes actually need them', 'Make everything public for convenience', 'Make all fields protected', 'Avoid using private'], a: 0, e: 'Private by default, public only when necessary.' },
    { t: 'tf', q: 'Using TypeScript `readonly` on a public field fully achieves data hiding.', a: false, e: 'readonly prevents reassignment, but clients still depend on the field and on its representation (and can mutate an object or array stored in it).' },
    { t: 'mc', q: 'Which statement about information hiding is TRUE?', o: ['It lets you change a class\'s internals without breaking other classes', 'It requires inheritance', 'It makes testing impossible', 'It means not writing comments'], a: 0, e: 'That freedom to change is the whole point.' },
  ],
});

BANK.topic({
  id: 'depend-abstractions',
  group: 'principles',
  title: 'Depend on abstractions',
  notes: `
<p>Commandment 7: <strong>Thou shalt depend on abstract interfaces rather than concrete types.</strong></p>
<ul>
  <li>When a dependency is necessary, depend on <strong>abstract types</strong> (interfaces, abstract classes) rather than concrete classes.</li>
  <li>A concrete dependency is inflexible. A parameter of type <code>ArrayList</code> can't accept a <code>LinkedList</code>. Use <code>List</code> unless the method really needs an ArrayList.</li>
  <li>This is what polymorphism is for. It makes testing and modifying the program much easier.</li>
</ul>
<h4>Other concrete dependencies</h4>
<ol>
  <li><strong>Calling <code>new</code></strong> names a concrete type. Delegate creation to <strong>factories</strong> or use <strong>dependency injection</strong>.</li>
  <li><strong>Calling a static method</strong> on another class is a concrete dependency that can't be redirected.</li>
</ol>
<h4>Testability</h4>
<p>Unit testing means isolating the class under test. If it depends on abstractions, you can pass in <strong>fake/mock</strong> objects. If it depends on concrete types, you can't.</p>
<h4>The exam's example</h4>
<pre class="code">void f(ArrayList&lt;String&gt; names) {
  for (int i = 0; i &lt; names.size(); i++) {
    names.set(i, names.get(i).toUpperCase());
  }
}</pre>
<p><strong>Violates:</strong> Depend on Abstractions, Not Concretions. The parameter is the concrete <code>ArrayList</code>, so callers can't pass a <code>LinkedList</code> or another <code>List</code>, and the method doesn't need anything ArrayList-specific. <strong>Fix:</strong> declare the parameter as the interface <code>List&lt;String&gt;</code>. In TS that's an interface or <code>string[]</code>, or with a for-of a <code>ListIterator</code>/<code>ReplaceAll</code>.</p>`,
  questions: [
    { t: 'sa', q: 'In the following method which design principle is violated? How would you fix it?', c: `void f(ArrayList<String> names) {
    for (int i = 0; i < names.size(); i++) {
        names.set(i, names.get(i).toUpperCase());
    }
}`, k: ['Violates "Depend on abstractions, not concretions" (depend on abstract interfaces rather than concrete types)', 'Parameter type ArrayList is a concrete class — can\'t pass LinkedList or other List implementations', 'Method doesn\'t need anything ArrayList-specific', 'Fix: change the parameter type to the List<String> interface'], m: 'It violates Depend on Abstractions (Commandment 7). The parameter is declared as the concrete class ArrayList<String>, so the method only accepts ArrayLists even though it uses nothing ArrayList-specific (size/get/set are all on List). Callers can\'t pass a LinkedList or another List, and it\'s harder to substitute a test double. Fix: declare the parameter as the abstract interface, void f(List<String> names). (Bonus: names (and f) could be renamed for clarity, e.g. toUpperCaseAll.)' },
    { t: 'mc', q: 'Why is declaring a parameter as `ArrayList` instead of `List` inflexible?', o: ['You cannot pass a LinkedList or any other List implementation', 'ArrayList is slower', 'ArrayList cannot hold strings', 'It violates YAGNI'], a: 0, e: 'Concrete type dependencies are hard-coded to one class.' },
    { t: 'tf', q: 'Calling `new` to create an object is a concrete dependency.', a: true, e: '"Calling new … requires that we specify the concrete type of the object."' },
    { t: 'mc', q: 'What does the paper recommend instead of calling `new` inside a class?', o: ['Delegate object creation to factory classes or use dependency injection', 'Use global variables', 'Use static methods', 'Use inheritance'], a: 0, e: 'Factories and DI decouple a class from concrete types.' },
    { t: 'tf', q: 'Calling a static method on another class is a flexible, abstract dependency.', a: false, e: 'Static calls are concrete dependencies that can\'t be redirected to a different class.' },
    { t: 'mc', q: 'Depending on abstractions is especially important for which activity?', o: ['Writing testable code (passing fakes/mocks)', 'Writing CSS', 'Choosing algorithms', 'Naming variables'], a: 0, e: 'Abstract dependencies let tests substitute mock objects.' },
    { t: 'code', q: 'Refactor so `UserPresenter` depends on an abstraction and can be unit-tested with a mock service.', c: `class UserPresenter {
  private service = new DynamoUserService();

  async load(alias: string) {
    const user = await this.service.getUser(alias);
    return user.name;
  }
}`, k: ['Define a UserService interface (getUser)', 'DynamoUserService implements it', 'Presenter receives UserService via constructor (dependency injection) instead of calling new', 'Test can pass instance(mock<UserService>())'], mc: `interface UserService {
  getUser(alias: string): Promise<User>;
}

class DynamoUserService implements UserService {
  async getUser(alias: string): Promise<User> { /* ... */ }
}

class UserPresenter {
  constructor(private service: UserService) {}

  async load(alias: string) {
    const user = await this.service.getUser(alias);
    return user.name;
  }
}

// production
new UserPresenter(new DynamoUserService());
// test
const mockService = mock<UserService>();
new UserPresenter(instance(mockService));` },
    { t: 'mc', q: 'Which TypeScript parameter type best follows "depend on abstractions" for a function that only iterates over items?', o: ['Iterable<T> (or readonly T[])', 'Array<T> created by a specific factory', 'MyConcreteLinkedList<T>', 'any'], a: 0, e: 'Ask for the least specific type that supports what you actually need.' },
    { t: 'tf', q: 'Commandment #7 is "Thou shalt depend on abstract interfaces rather than concrete types."', a: true, e: 'Ten Design Commandments #7.' },
    { t: 'mc', q: 'An abstract class and an interface are both examples of…', o: ['Abstract data types you can depend on instead of concrete classes', 'Concrete dependencies', 'Static dependencies', 'Factories'], a: 0, e: 'The paper: "depend on abstract data types (i.e., interfaces and abstract classes)."' },
    { t: 'sa', q: 'Name two kinds of concrete dependencies (besides declaring a concrete parameter/variable type) and how to avoid each.', k: ['Calling new — avoid with factories or dependency injection', 'Calling static methods on another class — avoid by depending on an instance through an interface (injected)'], m: '(1) Calling new to create an object hard-codes its concrete class. Avoid it by delegating creation to a factory or injecting the object. (2) Calling a static method on another class hard-codes that class and can\'t be redirected. Avoid it by calling an instance method through an interface whose implementation is injected.' },
    { t: 'tf', q: 'If a method genuinely requires an ArrayList-specific feature, it is acceptable to declare the parameter as ArrayList.', a: true, e: '"This is alright if the method really requires an ArrayList…"' },
    { t: 'mc', q: 'Which code depends on a concretion in a way that makes it hard to unit test?', o: ['const now = DateUtils.currentTime(); (static call)', 'constructor(private clock: Clock) {}', 'function f(items: Iterable<string>)', 'class A implements Runnable'], a: 0, e: 'A static call can\'t be replaced with a fake clock in tests.' },
    { t: 'tf', q: 'Depending on abstractions is how polymorphism gives "tremendous flexibility" for testing and modifying a program.', a: true, e: 'Different objects can be substituted where the abstract type is expected.' },
    { t: 'code', q: 'Translate the exam\'s Java `f(ArrayList<String> names)` into TypeScript that depends on an abstraction. Assume you want to mutate the list in place.', k: ['Parameter typed with an abstract type (e.g., string[] or a custom StringList interface), not a specific concrete class', 'Loop uppercases each element', 'Better name for the function/parameter is a plus'], mc: `interface MutableList<T> {
  size(): number;
  get(i: number): T;
  set(i: number, value: T): void;
}

function toUpperCaseAll(names: MutableList<string>): void {
  for (let i = 0; i < names.size(); i++) {
    names.set(i, names.get(i).toUpperCase());
  }
}

// Idiomatic TS alternative: arrays are already the abstraction
function toUpperCaseAllArr(names: string[]): void {
  for (let i = 0; i < names.length; i++) {
    names[i] = names[i].toUpperCase();
  }
}` },
    { t: 'mc', q: 'Dependency injection means…', o: ['A class receives the objects it depends on (often through its constructor) rather than creating them itself', 'Injecting SQL into a database', 'Calling new inside every method', 'Using static factories everywhere'], a: 0, e: 'DI lets callers choose the concrete implementation.' },
    { t: 'tf', q: 'Depending on abstractions helps achieve the Open-Closed Principle.', a: true, e: 'New implementations of the abstraction extend behavior without modifying the client.' },
    { t: 'mc', q: 'Which is the best fix for `class ReportService { private db = new MySqlDatabase(); }`?', o: ['Define a Database interface and inject it: constructor(private db: Database)', 'Make db public', 'Make MySqlDatabase static', 'Copy MySqlDatabase\'s code into ReportService'], a: 0, e: 'Abstraction plus injection.' },
    { t: 'sa', q: 'Explain how depending on abstractions makes a class easier to unit test.', k: ['Unit tests isolate the class under test from its dependencies', 'If it depends on interfaces, tests can pass fake/mock objects implementing them', 'Mocks can return canned results, throw errors, verify calls', 'Concrete dependencies (new, static calls) can\'t be substituted'], m: 'A unit test has to isolate the class under test from the real objects it depends on, such as a database or network. If the class depends on interfaces (ideally injected), the test can pass in fake or mock objects that return canned values, simulate errors and record calls. If the class calls new or static methods on concrete classes, the test can\'t swap them out, so it\'s stuck with the real dependencies.' },
    { t: 'tf', q: 'In TypeScript, you can only depend on abstractions using the `interface` keyword; abstract classes do not count.', a: false, e: 'Both interfaces and abstract classes are abstractions.' },
    { t: 'mc', q: 'Which variable declaration best follows depend-on-abstractions (Java-style)?', o: ['List<String> names = new ArrayList<>();', 'ArrayList<String> names = new ArrayList<>();', 'LinkedList<String> names = new LinkedList<>();', 'Object names = new ArrayList<>();'], a: 0, e: 'Declare with the interface type. Object is too abstract to be useful.' },
    { t: 'tf', q: 'A factory class centralizes calls to `new` so that most of the code depends only on abstract types.', a: true, e: 'Clients ask the factory for an abstract type.' },
    { t: 'mc', q: 'In the Tweeter project, why do presenters depend on a View interface instead of a React component?', o: ['So presenters can be tested with mock views and remain independent of React', 'Because React components can\'t be imported', 'To use static methods', 'To make the code longer'], a: 0, e: 'Abstraction makes presenters testable and orthogonal to the UI technology.' },
    { t: 'tf', q: 'Depend on abstractions applies to variable types, parameter types, and return types.', a: true, e: 'Any place a type is declared can be abstract.' },
  ],
});

BANK.topic({
  id: 'isolated-change',
  group: 'principles',
  title: 'Isolated change principle',
  notes: `
<p>Commandment 8: <strong>Thou shalt isolate the implementation of thy design choices, making it easier to repent of those choices in the future.</strong> Related term: <em>avoid shotgun surgery</em>.</p>
<ul>
  <li>SRP: a <em>class</em> should implement one <em>responsibility</em>. Isolated Change goes the opposite direction: a <em>responsibility</em> should be implemented by one <em>class</em>, or more realistically have the smallest possible footprint in the source code.</li>
  <li>Centralize the code for a responsibility or design choice in one place (one class, method or package). If you change your mind, you don't have to change code scattered all over the program.</li>
  <li><strong>Serialization example:</strong> switching from XML to JSON should touch one or a few classes, while the rest of the system doesn't know the format.</li>
  <li><strong>Database example:</strong> put all database code in one package of data access classes (DAOs). No other code should know which database you use.</li>
  <li>When making a design choice, consider how likely it is to change. Isolate the ones that are even somewhat likely to change, and remember the future is hard to predict.</li>
</ul>
<p><strong>Shotgun surgery</strong> is the opposite: one change forces many small edits across many classes.</p>`,
  questions: [
    { t: 'sa', q: 'Explain the Isolated Change Principle and how it relates to the Single Responsibility Principle.', k: ['A responsibility/design choice should be implemented in as few places as possible (one class/method/package)', 'So that changing that choice requires changing only a small part of the code', 'SRP: one class → one responsibility; Isolated Change: one responsibility → one class (opposite direction)', 'Related: avoid shotgun surgery'], m: 'The Isolated Change Principle says the implementation of a responsibility or design choice should have the smallest possible footprint, ideally one class, method or package. If we later change our mind, for example switching XML to JSON or one database to another, we only change that small area. It\'s the mirror image of SRP: SRP says a class should implement one responsibility, while Isolated Change says a responsibility should be implemented by one class. It\'s the cure for shotgun surgery.' },
    { t: 'mc', q: 'Which code smell is the Isolated Change Principle designed to avoid?', o: ['Shotgun surgery', 'Primitive obsession', 'Long parameter list', 'Dead code'], a: 0, e: 'Shotgun surgery: one change requires many edits scattered across the code.' },
    { t: 'mc', q: 'Your app uses XML to serialize objects, and XML-building code is in 30 classes. Switching to JSON now requires editing all 30. Which principle was violated?', o: ['Isolated Change', 'Simplicity', 'Algorithm selection', 'Orthogonality only'], a: 0, e: 'The paper\'s exact example: the serialization format should be isolated in one or a few classes.' },
    { t: 'tf', q: 'According to the paper, all database code should be centralized in a single package of data access classes so that no other code knows which database is used.', a: true, e: 'Then moving to a different database affects very little code.' },
    { t: 'mc', q: 'The Isolated Change Principle and SRP are described as going in "opposite directions". Which statement is correct?', o: ['SRP: a class implements one responsibility. Isolated Change: a responsibility is implemented by one class.', 'SRP: a responsibility is implemented by many classes. Isolated Change: a class implements many responsibilities.', 'They are identical', 'SRP is about methods; Isolated Change is about packages'], a: 0, e: 'Both directions aim for a clean one-to-one mapping.' },
    { t: 'tf', q: 'You should isolate a design choice when it is even somewhat likely to change in the future.', a: true, e: '"For choices that are even somewhat likely to change, you should create a design that isolates the implementation of the choice."' },
    { t: 'code', q: 'The choice of storage (localStorage) is scattered across the app. Isolate it.', c: `// in LoginPage.ts
localStorage.setItem("token", token);
// in Header.ts
const t = localStorage.getItem("token");
// in Logout.ts
localStorage.removeItem("token");`, k: ['Create one class/module (e.g., TokenStore / AuthStorage) that wraps localStorage', 'Expose save/get/clear methods', 'All other code calls the wrapper; only it knows about localStorage', 'Ideally behind an interface so storage can be swapped'], mc: `interface TokenStore {
  save(token: string): void;
  get(): string | null;
  clear(): void;
}

class LocalStorageTokenStore implements TokenStore {
  private static KEY = "token";
  save(token: string) { localStorage.setItem(LocalStorageTokenStore.KEY, token); }
  get() { return localStorage.getItem(LocalStorageTokenStore.KEY); }
  clear() { localStorage.removeItem(LocalStorageTokenStore.KEY); }
}

// LoginPage: tokenStore.save(token)
// Header:    tokenStore.get()
// Logout:    tokenStore.clear()` },
    { t: 'mc', q: 'Commandment #8 says isolate the implementation of design choices to make it easier to…', o: ['"repent of those choices in the future"', '"write tests"', '"reuse code"', '"handle errors"'], a: 0, e: '"…making it easier to repent of those choices in the future."' },
    { t: 'tf', q: 'The Isolated Change principle says you can always predict which design choices will change, so you only need to isolate those.', a: false, e: '"Remember, the future is very difficult to predict." Isolate anything reasonably likely to change.' },
    { t: 'mc', q: 'In the Tweeter project, which design best follows Isolated Change for talking to the server?', o: ['A single ServerFacade class that contains all HTTP calls', 'Each presenter calls fetch() with hard-coded URLs', 'Each React component builds its own request', 'URLs duplicated in every file'], a: 0, e: 'If the API base URL or protocol changes, only ServerFacade changes.' },
    { t: 'sa', q: 'Give an example of a design choice that should be isolated, and describe how you would isolate it.', k: ['Names a choice likely to change (database, serialization format, external API, logging library, auth mechanism, config)', 'Describes centralizing it in one class/package, often behind an interface (DAO, facade, adapter)', 'Rest of the code is unaware of the choice'], m: 'Example: which database to use (DynamoDB vs. MySQL). I would put all database access in a DAO package behind interfaces like UserDAO and FollowDAO. Services depend only on the interfaces, so switching databases means writing new DAO implementations without touching the rest of the system. (A factory can choose which DAO implementation to create.)' },
    { t: 'tf', q: 'Duplicating a magic constant like the API base URL in 15 files violates the Isolated Change principle (and DRY).', a: true, e: 'Changing the URL requires shotgun surgery.' },
    { t: 'mc', q: 'Which approach best isolates the choice of email provider (SES today, maybe something else later)?', o: ['An EmailSender interface with an SesEmailSender implementation used everywhere', 'Calling the SES SDK directly from every Lambda', 'Hard-coding SES settings in each function', 'Using a global SES client in every file'], a: 0, e: 'Only one class knows about SES.' },
    { t: 'tf', q: 'Isolated Change complements information hiding: hiding a design choice behind an interface keeps the rest of the code from depending on it.', a: true, e: 'Hidden choices are isolated choices.' },
    { t: 'mc', q: 'Which is the clearest symptom that a design choice is NOT isolated?', o: ['Changing it requires edits in many unrelated files', 'It is implemented in one class', 'It is behind an interface', 'It has unit tests'], a: 0, e: 'Shotgun surgery.' },
    { t: 'code', q: 'Date formatting is done inline in many components with the same format string. Isolate the formatting choice.', c: `// ProfilePage
const s = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
// StatusItem
const s2 = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
// Feed
const s3 = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();`, k: ['One function/class (e.g., DateFormatter.format(d)) contains the format', 'All components call it', 'Changing to a different format (e.g., ISO, locale-based) changes one place'], mc: `export class DateFormatter {
  static format(d: Date): string {
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }
}

// ProfilePage / StatusItem / Feed
const s = DateFormatter.format(d);

// Later switching formats only changes DateFormatter:
// return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });` },
    { t: 'tf', q: 'The Isolated Change principle applies to responsibilities at the class, method, and package level.', a: true, e: '"…isolated (i.e., centralized) in one place - one class, one method, or one package."' },
    { t: 'mc', q: 'Isolating database code in a DAO layer is an application of which TWO principles together?', o: ['Isolated Change and Information Hiding', 'YAGNI and Algorithm Selection', 'Template Method and Generics', 'Error Handling and Simplicity'], a: 0, e: 'The DAO centralizes the choice and hides it from the rest of the system.' },
    { t: 'tf', q: 'SRP and Isolated Change can both be satisfied at the same time.', a: true, e: 'Ideally each class has one responsibility, and each responsibility lives in one class.' },
    { t: 'sa', q: 'What is "shotgun surgery," and which principle prevents it?', k: ['A single change requires many small edits spread across many classes/files', 'Prevented by the Isolated Change Principle (centralize implementation of each responsibility/choice)'], m: 'Shotgun surgery is when making one conceptual change, like switching serialization formats, forces many small edits scattered across many classes. The Isolated Change Principle prevents it by centralizing each responsibility or design choice in one class, method or package.' },
    { t: 'mc', q: 'Which statement would a designer following Isolated Change ask about each design choice?', o: ['"How likely is it that this choice might need to change in the future?"', '"How many classes can I spread this across?"', '"Can I make this public?"', '"Can I avoid writing tests?"'], a: 0, e: 'The paper recommends considering the likelihood of change.' },
    { t: 'tf', q: 'Using a third-party logging library directly in 200 files, rather than through your own Logger wrapper, is a risk to isolated change.', a: true, e: 'Replacing the library would mean editing 200 files.' },
    { t: 'mc', q: 'The Isolated Change principle is commandment number…', o: ['8', '2', '5', '10'], a: 0, e: '8: isolate the implementation of thy design choices.' },
    { t: 'tf', q: 'If a change in requirements forces modifications in only one class, that\'s evidence the design follows Isolated Change well.', a: true, e: 'Small footprint for the change.' },
  ],
});

BANK.topic({
  id: 'error-handling',
  group: 'principles',
  title: 'Error handling',
  notes: `
<p>Commandment 10: <strong>Thou shalt properly report and handle errors in thy code and not silently ignore them.</strong></p>
<p>Errors happen even in perfectly written programs. The method that detects an error must do one of three things:</p>
<ol>
  <li><strong>Recover</strong> from the error and continue execution.</li>
  <li><strong>Return the error to its caller</strong> (throw or rethrow, or return an error result).</li>
  <li><strong>Log</strong> the error.</li>
</ol>
<ul>
  <li><strong>Never ignore an error.</strong> An empty <code>catch</code> block is unacceptable, because if that error ever happens there's no way to diagnose it.</li>
  <li>A method that might return errors to its caller should <strong>document</strong> what those errors are so callers can handle them.</li>
</ul>
<p>Related course material: <code>fetch</code> does <em>not</em> reject on HTTP 4xx/5xx, so check <code>response.ok</code>. Axios <em>does</em> reject on non-2xx (use <code>axios.isAxiosError</code>). In Lambda behind API Gateway, a thrown error can be mapped to a 4xx/5xx status with regex on the message.</p>`,
  questions: [
    { t: 'sa', q: 'According to the paper, what three things can a method do when it detects an error? What must it never do?', k: ['Recover from the error and continue', 'Return the error to its caller (throw/propagate)', 'Log the error', 'Never silently ignore it (e.g., empty catch block)'], m: 'It should (1) recover from the error and continue, (2) return the error to its caller, e.g. by throwing, or (3) log the error. It must never ignore the error by doing none of these, as with an empty catch block, because then there\'s no way to diagnose the problem when it happens.' },
    { t: 'mc', q: 'What is wrong with this code?', c: `try {
  await this.userService.follow(alias);
} catch (e) {
}`, o: ['It silently ignores the error, so failures can\'t be diagnosed', 'It uses await', 'try/catch is not allowed in TypeScript', 'Nothing'], a: 0, e: 'An empty catch block violates Commandment 10.' },
    { t: 'code', q: 'Fix the error handling in this presenter method so the error is properly handled.', c: `async loadFeed() {
  try {
    const items = await this.service.loadFeed(this.user);
    this.view.addItems(items);
  } catch (e) {
  }
}`, k: ['Catch block does something: report to user (view.displayErrorMessage), log, and/or rethrow', 'Includes useful info (error message)', 'Does not silently swallow the exception'], mc: `async loadFeed() {
  try {
    const items = await this.service.loadFeed(this.user);
    this.view.addItems(items);
  } catch (e) {
    const msg = (e as Error).message;
    console.error("loadFeed failed:", e);              // log
    this.view.displayErrorMessage(
      "Failed to load feed because of exception: " + msg // report
    );
  }
}` },
    { t: 'tf', q: 'A method that might return errors to its caller should document what those errors are.', a: true, e: 'So callers can handle them appropriately.' },
    { t: 'mc', q: 'Which is NOT one of the three acceptable responses to an error in the paper?', o: ['Recover and continue', 'Return the error to the caller', 'Log the error', 'Catch it and do nothing so the user isn\'t bothered'], a: 3, e: 'Doing nothing is exactly what\'s forbidden.' },
    { t: 'tf', q: 'Errors only occur in poorly written programs.', a: false, e: '"Errors will occur during the execution of even perfectly-written programs" (network failures, bad input, etc.).' },
    { t: 'mc', q: 'Using the Fetch API, what happens when the server responds with HTTP 404?', o: ['The promise resolves normally; you must check response.ok / response.status', 'The promise rejects automatically', 'The browser shows an alert', 'fetch retries forever'], a: 0, e: 'fetch only rejects on network failure. That\'s why the slides check if (!response.ok).' },
    { t: 'mc', q: 'Using Axios, what happens when the server responds with HTTP 403?', o: ['The promise rejects; the error has error.response.status === 403', 'It resolves normally like fetch', 'It returns null', 'It throws a syntax error'], a: 0, e: 'Axios rejects on non-2xx statuses by default. The slides use axios.isAxiosError(error) && error.response?.status === 403.' },
    { t: 'code', q: 'Write an async TypeScript function `getUser(alias: string)` using fetch that GETs `/api/users/{alias}`, throws an Error containing the status if the response is not OK, and otherwise returns the parsed JSON.', k: ['await fetch(url)', 'if (!response.ok) throw new Error(...status...)', 'return await response.json()', 'Does not swallow errors (lets caller handle, or logs + rethrows)'], mc: `async function getUser(alias: string): Promise<User> {
  const response = await fetch("/api/users/" + encodeURIComponent(alias));

  if (!response.ok) {
    throw new Error("Failed to get user. Status: " + response.status);
  }

  return (await response.json()) as User;
}` },
    { t: 'tf', q: 'Logging an error is an acceptable way to handle it, according to the paper.', a: true, e: 'Logging is one of the three options.' },
    { t: 'mc', q: 'Why is a catch block that does nothing "unacceptable"?', o: ['If the error ever occurs, there will be no way to diagnose what\'s going on', 'It uses too much memory', 'TypeScript will not compile it', 'It makes the code too long'], a: 0, e: 'Silent failures are very hard to debug.' },
    { t: 'sa', q: 'Give an example of recovering from an error vs. returning it to the caller, and when you might choose each.', k: ['Recover: e.g., retry, use a default/cached value, skip a bad record — when the method can reasonably fix it', 'Return/propagate: throw or rethrow (possibly wrapped) when the caller has the context to decide', 'Shows understanding that the choice depends on which level can handle it'], m: 'Recover: if loading a user\'s optional avatar fails, show a default image and keep going. The method can sensibly fix the problem itself. Return to the caller: if a DAO\'s database write fails, it should throw (maybe wrapped in a meaningful error), because the service or presenter knows whether to retry, show a message, or return a 500. Choose whichever level has the context to handle the error well.' },
    { t: 'tf', q: 'In API Gateway, an exception thrown by a Lambda can be mapped to a specific HTTP status code using regular expressions on the error message.', a: true, e: 'From the API Gateway slides: e.g., messages containing "[Bad Request]" → 400 and "[Internal Server Error]" → 500.' },
    { t: 'mc', q: 'Which is the best practice in a Lambda handler when input is invalid?', o: ['Throw an error with a recognizable message (e.g., "[Bad Request] missing alias") so API Gateway can map it to 400', 'Return an empty object and hope the client notices', 'Silently continue', 'Call process.exit()'], a: 0, e: 'Report the error so it can be turned into an appropriate HTTP response.' },
    { t: 'tf', q: 'Re-throwing an exception after adding context (e.g., wrapping it in a more meaningful error) is a valid way to "return the error to the caller."', a: true, e: 'It propagates the error with better information.' },
    { t: 'mc', q: 'Commandment #10 says…', o: ['Thou shalt properly report and handle errors in thy code and not silently ignore them', 'Thou shalt write testable code', 'Thou shalt keep it simple', 'Thou shalt not repeat code'], a: 0, e: 'Ten Design Commandments #10.' },
    { t: 'code', q: 'This function returns `-1` on error with no documentation and callers ignore it. Improve the error handling.', c: `function parseAge(input: string): number {
  const n = parseInt(input);
  if (isNaN(n) || n < 0) return -1;
  return n;
}
const age = parseAge(form.age); // -1 sneaks into the database`, k: ['Throw a descriptive error (or return a typed Result) instead of a magic -1', 'Document the error (JSDoc @throws)', 'Caller handles it (try/catch → show message / recover)'], mc: `/**
 * Parses a non-negative integer age.
 * @throws Error if input is not a valid non-negative integer.
 */
function parseAge(input: string): number {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Invalid age: '" + input + "'");
  }
  return n;
}

try {
  const age = parseAge(form.age);
  save(age);
} catch (e) {
  view.displayError((e as Error).message);
}` },
    { t: 'tf', q: 'console.log inside a Lambda function writes to CloudWatch Logs, which is one way to log errors in serverless code.', a: true, e: 'Lambda sends stdout/stderr to CloudWatch Logs automatically (if the role allows it).' },
    { t: 'mc', q: 'In the HTTP Client slides\' fetch error-handling example, what happens when `response.ok` is false and the status is NOT 403?', o: ['It throws new Error(`Status: ${response.status}`), which is caught and logged', 'It returns silently', 'It retries', 'It parses the JSON anyway'], a: 0, e: '403 gets special handling; other failures throw and are logged by the catch block.' },
    { t: 'tf', q: 'Catching an exception, logging it, and continuing is always better than letting it propagate.', a: false, e: 'Sometimes the caller needs to know about the failure. Choose the level that can actually handle it.' },
    { t: 'mc', q: 'Which catch block is the WORST?', o: ['catch (e) { }', 'catch (e) { console.error(e); throw e; }', 'catch (e) { view.displayError(e.message); }', 'catch (e) { return defaultValue; } // documented fallback'], a: 0, e: 'The empty block hides the failure completely.' },
    { t: 'sa', q: 'In a Tweeter-style app, describe how an error in the server (e.g., DynamoDB failure) should flow all the way to the user.', k: ['DAO/service throws (doesn\'t swallow) — maybe logs', 'Lambda throws/returns an error that API Gateway maps to a status code (e.g., 500)', 'Client ServerFacade checks the response and throws', 'Presenter catches and tells the view to display an error message'], m: 'The DAO throws an error (possibly logged to CloudWatch). The service and Lambda handler let it propagate or rethrow it with a recognizable message, and API Gateway maps it to an HTTP status like 500 with an error body. On the client, the ServerFacade sees the non-OK response and throws. The presenter catches that and calls view.displayErrorMessage(...) so the user sees what happened. No layer silently ignores it.' },
    { t: 'tf', q: 'Returning `null` on failure, with no documentation, is a clear and well-handled way to report errors.', a: false, e: 'Undocumented sentinel values are easy for callers to ignore. If you return error values, document them.' },
    { t: 'mc', q: 'Which is the best example of "recover from the error and continue"?', o: ['If a config file is missing, fall back to documented defaults and log a warning', 'Swallow every exception silently', 'Crash the whole program on any error', 'Throw a generic Error("oops")'], a: 0, e: 'A reasonable fallback, and the issue still gets logged.' },
    { t: 'tf', q: 'Error handling is listed as one of the Ten Design Commandments.', a: true, e: '#10.' },
  ],
});

BANK.topic({
  id: 'algorithms',
  group: 'principles',
  title: 'Algorithm & data structure selection',
  notes: `
<p>A major part of software design is choosing appropriate <strong>algorithms and data structures</strong> for the problem at hand.</p>
<ul>
  <li>An O(n³) algorithm on data sets that become very large will almost certainly be too slow, however well the problem is decomposed and abstracted.</li>
  <li>Storing values in unsorted linear lists will be too slow if the data set is large and searched often.</li>
  <li>Choose (or invent) algorithms and data structures with good performance for the intended use, considering both <strong>running time and memory</strong>.</li>
  <li><strong>"No amount of decomposition or abstraction will hide a fundamentally flawed selection of algorithm or data structure."</strong></li>
</ul>
<h4>Quick reference</h4>
<ul>
  <li>Array or list lookup by value: O(n). Sorted array plus binary search: O(log n). Hash map or set lookup: O(1) average.</li>
  <li>Nested loops over the same data: O(n²). A <code>Set</code> or <code>Map</code> often reduces that to O(n).</li>
  <li>Insert or remove at the front of an array: O(n). A queue or linked list makes it O(1).</li>
  <li>DynamoDB connection: a <em>query</em> on a key is efficient, while a <em>scan</em> reads the whole table. Picking the right keys and indexes is the same idea applied to databases.</li>
</ul>
<p>This interacts with information hiding: if the data structure is hidden behind a good interface, you can swap a slow choice for a fast one without changing clients.</p>`,
  questions: [
    { t: 'sa', q: 'Why does the paper say algorithm and data-structure selection is a fundamental design skill?', k: ['Poor choices (e.g., O(n³) on large data, unsorted lists searched often) make software far too slow', 'Must consider running time AND memory consumption for the intended application', 'No amount of decomposition or abstraction can hide a fundamentally flawed choice'], m: 'Even a well-decomposed, well-abstracted design fails if its core algorithms or data structures are a bad fit, such as an O(n³) algorithm on huge data or frequent searches through large unsorted lists. Designers have to choose (or invent) algorithms and structures with good running time and memory use for the actual application, because no amount of decomposition or abstraction hides a fundamentally flawed choice.' },
    { t: 'tf', q: 'According to the paper, good decomposition and abstraction can compensate for a fundamentally flawed choice of algorithm.', a: false, e: '"No amount of decomposition or abstraction will hide a fundamentally flawed selection of algorithm or data structure."' },
    { t: 'mc', q: 'You need to check frequently whether a username is already taken among 1,000,000 users held in memory. Best data structure?', o: ['Set<string> (hash set)', 'Unsorted array with linear search', 'Linked list', 'Stack'], a: 0, e: 'O(1) average membership tests vs O(n).' },
    { t: 'code', q: 'This function is O(n²). Rewrite it to run in O(n).', c: `function hasDuplicate(ids: string[]): boolean {
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      if (ids[i] === ids[j]) return true;
    }
  }
  return false;
}`, k: ['Use a Set to track seen values', 'Single pass over the array', 'Return true when a value is already in the set'], mc: `function hasDuplicate(ids: string[]): boolean {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) return true;
    seen.add(id);
  }
  return false;
}
// or: return new Set(ids).size !== ids.length;` },
    { t: 'mc', q: 'What is the time complexity of searching for a value in an unsorted array of n elements?', o: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], a: 0, e: 'You might have to look at every element.' },
    { t: 'mc', q: 'What is the average time complexity of looking up a key in a hash map?', o: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], a: 0, e: 'Constant on average.' },
    { t: 'tf', q: 'Selecting good algorithms involves considering memory consumption as well as running time.', a: true, e: '"…good performance characteristics (including running time and memory consumption)…"' },
    { t: 'mc', q: 'The paper warns that storing data as ______ will be far too slow if the data set is large and searched frequently.', o: ['unsorted, linear lists', 'hash tables', 'balanced trees', 'sorted arrays'], a: 0, e: 'Linear search on large lists is O(n) per search.' },
    { t: 'mc', q: 'Searching a SORTED array with binary search takes…', o: ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'], a: 0, e: 'Halve the search space each step.' },
    { t: 'tf', q: 'Algorithm choice only matters for small data sets.', a: false, e: 'The opposite: poor choices hurt most as data sets become very large.' },
    { t: 'mc', q: 'You need to repeatedly remove the item with the highest priority from a large collection. Best data structure?', o: ['Priority queue (heap)', 'Unsorted array scanned each time', 'Stack', 'Set'], a: 0, e: 'A heap gives O(log n) removal of the max vs O(n) scanning.' },
    { t: 'sa', q: 'How does information hiding make it easier to fix a bad data-structure choice later?', k: ['If the data structure is private behind a method interface, clients don\'t depend on it', 'You can swap (e.g., list → hash map) inside the class without changing client code', 'Naming that hides the implementation (search vs linearSearch) helps too'], m: 'If the data structure is private and clients only use methods like find(id) or add(item), you can replace it, say an array with a Map, inside the class without changing any client code. Names that don\'t reveal the implementation (search instead of linearSearch) keep that freedom too.' },
    { t: 'tf', q: 'An O(n³) algorithm on data sets that become very large will almost certainly be far too slow.', a: true, e: 'Paper example.' },
    { t: 'mc', q: 'Which operation is O(n) on a JavaScript array?', o: ['arr.shift() (remove from front)', 'arr.push(x) (amortized)', 'arr[i] (index access)', 'arr.length'], a: 0, e: 'shift moves every remaining element.' },
    { t: 'code', q: 'This code looks up each order\'s customer by scanning an array (O(n·m)). Improve it.', c: `function attachCustomers(orders: Order[], customers: Customer[]) {
  for (const o of orders) {
    o.customer = customers.find((c) => c.id === o.customerId);
  }
}`, k: ['Build a Map from customer id → customer once (O(m))', 'Look up each order in O(1)', 'Overall O(n + m)'], mc: `function attachCustomers(orders: Order[], customers: Customer[]) {
  const byId = new Map<string, Customer>();
  for (const c of customers) byId.set(c.id, c);

  for (const o of orders) {
    o.customer = byId.get(o.customerId);
  }
}` },
    { t: 'mc', q: 'In DynamoDB, which is generally more efficient for retrieving items by partition key?', o: ['Query', 'Scan', 'They are always equal', 'Neither can filter by key'], a: 0, e: 'A scan reads the whole table. Data-structure selection applies to databases too.' },
    { t: 'tf', q: 'Picking a data structure that matches how data is accessed (e.g., frequent lookups by key) is part of software design, not just "optimization at the end."', a: true, e: 'The paper puts it among the core design principles.' },
    { t: 'mc', q: 'Which structure gives O(1) add/remove at BOTH ends?', o: ['Deque (double-ended queue) / doubly linked list', 'Plain array', 'Binary search tree', 'Hash set'], a: 0, e: 'Arrays are O(n) at the front.' },
    { t: 'mc', q: 'Your feed must show the newest 10 statuses from 5,000 followees. Which approach shows good algorithm/data structure selection?', o: ['Keep a precomputed feed per user sorted by timestamp (or query an index sorted by time) and read the first page', 'Load every status ever posted and sort them all on each request', 'Linear search through all users', 'Generate random statuses'], a: 0, e: 'Choose structures that match the access pattern (paged, sorted reads).' },
    { t: 'tf', q: 'Simplicity says always use the simplest data structure (e.g., a plain array) even if it will make the program far too slow.', a: false, e: 'Simplicity never overrides meeting requirements, and performance is a requirement. The design must still work.' },
    { t: 'sa', q: 'Give an example of a fundamentally flawed algorithm or data-structure choice and a better alternative.', k: ['Describes a poor choice tied to scale (e.g., nested loops O(n²), linear search on huge list, re-sorting on every insert)', 'Gives a better structure/algorithm with complexity (hash map, binary search, heap, index)'], m: 'Example: checking each new tweet\'s hashtags against a 1M-element array of banned words with includes() costs O(n) per word. A Set makes each check O(1) on average. Another: re-sorting the entire list after every insert costs O(n log n) per insert, while a heap or balanced tree keeps it O(log n).' },
    { t: 'mc', q: 'Which complexity grows the fastest as n increases?', o: ['O(n³)', 'O(n log n)', 'O(n)', 'O(log n)'], a: 0, e: 'Cubic is the paper\'s "far too slow" example.' },
    { t: 'tf', q: 'Inventing a new algorithm when no existing one fits is part of the algorithm-selection design skill.', a: true, e: '"Selecting (or inventing) algorithms and data structures…"' },
    { t: 'mc', q: 'Paging (returning 10 items at a time) in the Tweeter feed is mainly a choice about…', o: ['Performance and memory for large data sets', 'Information hiding', 'Error handling', 'Naming'], a: 0, e: 'You avoid loading and transmitting huge result sets.' },
    { t: 'tf', q: 'A design can be well-decomposed and well-named but still unusable because of poor algorithm choices.', a: true, e: 'Exactly the paper\'s warning.' },
  ],
});
