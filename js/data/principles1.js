/* Design principles part 1: Simplicity, Duplication, Orthogonality, SRP, Minimize Dependencies, Decomposition */

BANK.topic({
  id: 'simplicity',
  group: 'principles',
  title: 'Simplicity',
  notes: `
<p><em>"Everything should be made as simple as possible, but not simpler."</em> (Einstein) Commandment 1: <strong>Thou shalt keep it simple.</strong></p>
<ul>
  <li>Software design is primarily about <strong>managing complexity</strong>. Human capacity to deal with complexity is limited.</li>
  <li>Keep the design as simple as possible <em>while still implementing the required functionality</em>.</li>
  <li>Avoid extra design features (classes, methods, parameters, levels of inheritance…) that are unnecessary now and exist only for future functionality that may never be built.</li>
  <li>Predictions about future needs are often wrong. When a new feature really arrives, refactor the design then. That work isn't speculative.</li>
  <li><strong>YAGNI: You Aren't Going to Need It.</strong></li>
</ul>
<h4>Goals of software design (paper)</h4>
<p>Software that works, is easy to read and understand, is easy to debug and maintain, is easy to extend and holds up under change, and is reusable in other projects.</p>`,
  questions: [
    { t: 'mc', q: 'What does the acronym YAGNI stand for?', o: ['You Aren\'t Going to Need It', 'Yet Another Generic Network Interface', 'You Always Generate New Instances', 'Your API Gets No Input'], a: 0, e: 'YAGNI captures the Simplicity principle: don\'t build for speculative future needs.' },
    { t: 'tf', q: 'According to the Principles of Software Design paper, software design is primarily about managing complexity.', a: true, e: 'The paper\'s opening claim. People are quickly overwhelmed by complexity, so design keeps systems organized.' },
    { t: 'sa', q: 'Explain the Simplicity principle and why it is acceptable to refactor later when new features are added.', k: ['Keep design as simple as possible while still implementing the required functionality', 'Avoid extra classes/methods/parameters/inheritance for speculative future needs', 'Future predictions are often wrong', 'Refactoring when a feature is actually added is not speculative work — you don\'t waste time on features that may never exist'], m: 'Keep the design as simple as possible while still delivering what is required now. Don\'t add classes, methods, parameters or inheritance levels for future features that may never be built, because predictions about the future are often wrong. When a new feature really is added you might have to refactor, and that is fine: the work isn\'t speculative, and you never spent time supporting functionality that didn\'t materialize (YAGNI).' },
    { t: 'mc', q: 'A developer adds a plugin system, three abstract factory layers and an unused `options` parameter to a function, "in case we need them later." Which principle is violated?', o: ['Simplicity (YAGNI)', 'Information hiding', 'Error handling', 'Isolated change'], a: 0, e: 'Speculative generality adds complexity for features that may never exist.' },
    { t: 'tf', q: 'The Simplicity principle says you should never think about future requirements at all.', a: false, e: 'The paper says it\'s good to "keep an eye to the future", but not to encumber the current design with features that aren\'t needed yet.' },
    { t: 'mc', q: 'Which quote opens the Simplicity section of the paper?', o: ['"Everything should be made as simple as possible, but not simpler."', '"Premature optimization is the root of all evil."', '"Don\'t repeat yourself."', '"Less is more."'], a: 0, e: 'Attributed to Albert Einstein. Note the "but not simpler": the design must still implement the required functionality.' },
    { t: 'mc', q: 'Which of these is NOT one of the goals of software design listed in the paper?', o: ['Software that works', 'Software that is easy to read and understand', 'Software that uses the newest framework', 'Software that is reusable in other projects'], a: 2, e: 'The goals: works; easy to read and understand; easy to debug and maintain; easy to extend and holds up under change; reusable.' },
    { t: 'tf', q: 'Simplicity means the design should implement less than the required functionality if that makes it simpler.', a: false, e: '"…but not simpler." The design must still implement the required functionality.' },
    { t: 'mc', q: 'What is the "antithesis of good software design" according to the paper?', o: ['Disorganization, or sloppiness', 'Inheritance', 'Dynamic typing', 'Testing'], a: 0, e: 'Like entropy, systems become disorganized over time unless we actively keep them organized.' },
    { t: 'sa', q: 'The paper compares software to the laws of physics. Explain the analogy and what it implies for maintaining software.', k: ['Universe tends toward disorder unless active steps are taken (entropy)', 'Software becomes tangled/disorganized as it is changed without care', 'Must actively preserve design integrity throughout the system\'s lifetime, carefully considering each change'], m: 'Physics teaches that the universe becomes more disorganized over time unless we work to keep it organized. Software is the same: as it is modified and upgraded without careful thought it turns into an incomprehensible mess, even if it started with a good design. So we have to keep preserving the design\'s integrity for the system\'s whole lifetime by thinking carefully about each change.' },
    { t: 'tf', q: 'Adding an extra level of inheritance "for flexibility", when only one subclass will exist, is an example of unnecessary complexity.', a: true, e: 'Levels of inheritance are explicitly listed among the extra design features to avoid when they\'re unnecessary.' },
    { t: 'code', q: 'Simplify this over-engineered code to follow the Simplicity principle (the app only ever greets in English).', c: `interface GreetingStrategy { greet(name: string): string; }
class EnglishGreetingStrategy implements GreetingStrategy {
  greet(name: string) { return "Hello, " + name; }
}
class GreetingStrategyFactory {
  static create(lang: string = "en"): GreetingStrategy {
    return new EnglishGreetingStrategy();
  }
}
class Greeter {
  greet(name: string, _futureOptions?: Record<string, unknown>) {
    return GreetingStrategyFactory.create().greet(name);
  }
}`, k: ['Remove the unnecessary strategy interface, factory, and unused parameter', 'A single simple function/class that returns "Hello, " + name', 'Mention: refactor later if multiple languages actually become a requirement'], mc: `function greet(name: string): string {
  return "Hello, " + name;
}
// If multiple languages become a real requirement,
// refactor then (e.g., introduce a strategy).` },
    { t: 'mc', q: 'Which situation best justifies adding an abstraction NOW rather than later?', o: ['A teammate guesses we might support Oracle someday', 'You are currently implementing a second payment provider and both must work this sprint', 'A blog post recommended it', 'It makes the class diagram look more professional'], a: 1, e: 'When the need is real and current, the abstraction isn\'t speculative.' },
    { t: 'tf', q: 'Simplicity and Isolated Change can pull in different directions: one says avoid speculative design, the other says isolate choices that are likely to change.', a: true, e: 'Both require judgment. Isolate choices that are reasonably likely to change, but don\'t build features for unknowable futures.' },
    { t: 'mc', q: 'Commandment #1 of the Ten Design Commandments is…', o: ['Thou shalt keep it simple', 'Thou shalt not repeat code', 'Thou shalt write testable code', 'Thou shalt minimize dependencies between modules'], a: 0, e: 'The ten commandments start with simplicity.' },
    { t: 'sa', q: 'Why are predictions about future functionality a poor basis for design decisions?', k: ['Predictions often turn out to be inaccurate', 'Unneeded features add complexity now (harder to read/maintain)', 'Time spent on features that never happen is wasted'], m: 'Predictions about future needs are often wrong. Building for them adds complexity today, which makes the code harder to understand and maintain, and spends time on support for features that may never exist. It\'s better to refactor when a requirement actually arrives.' },
    { t: 'tf', q: 'Human capacity to deal with complexity is quite limited, which is a major reason simplicity matters.', a: true, e: 'Stated in the Goals section of the paper.' },
    { t: 'mc', q: 'A function takes 9 parameters, 5 of which are always passed as `null` "for future use." Which principle is most directly violated?', o: ['Simplicity', 'Information hiding', 'Error handling', 'Depend on abstractions'], a: 0, e: 'Unused, speculative parameters are unnecessary design features.' },
    { t: 'tf', q: 'Even a system that starts with a good design must be actively maintained to preserve that design as it evolves.', a: true, e: '"Even if a system starts out with a good design, we must consistently strive to preserve the integrity of its design throughout its lifetime."' },
    { t: 'mc', q: 'Which change best follows the Simplicity principle when you first need to support two kinds of notifications (email and SMS)?', o: ['Build a generic notification framework supporting 12 channels', 'Introduce a small Notifier interface with EmailNotifier and SmsNotifier', 'Copy the email code and edit it for SMS', 'Add a global flag checked everywhere'], a: 1, e: 'Just enough abstraction for the current need: no speculative channels and no duplication.' },
    { t: 'tf', q: 'Simplicity applies only to class design, not to methods or parameters.', a: false, e: 'The paper lists classes, methods, parameters and levels of inheritance as design features to keep minimal.' },
    { t: 'mc', q: 'Which of these is the best one-sentence summary of YAGNI?', o: ['Don\'t implement something until it is actually needed', 'Always use generics', 'Never refactor', 'Make every class an interface'], a: 0, e: 'You Aren\'t Going to Need It: build for today\'s real requirements.' },
    { t: 'sa', q: 'How can "keep it simple" and "high-quality abstraction" (e.g., creating a PhoneNumber class instead of using a string) both be followed at the same time?', k: ['Abstractions that serve a current need (validation, operations, readability) reduce complexity', 'Simplicity forbids unnecessary/speculative features, not useful ones', 'Over-decomposition (e.g., Digit class) would violate simplicity'], m: 'Simplicity rules out unnecessary or speculative design features, not useful abstractions. A PhoneNumber class that validates input and makes the code more readable meets a current need and makes the code easier to understand. Going further, say a Digit class for each digit, would be hyper-decomposition and would violate simplicity.' },
    { t: 'tf', q: 'According to the paper, a good design makes software easy to extend and able to hold up well under changes.', a: true, e: 'One of the listed goals of software design.' },
    { t: 'mc', q: 'Which practice is most in line with the Simplicity principle?', o: ['Refactor the design when new functionality is actually added', 'Write all classes generic from day one', 'Add configuration options for every value', 'Use inheritance for every class'], a: 0, e: 'Refactoring at the moment of real need keeps the design simple and correct.' },
  ],
});

BANK.topic({
  id: 'duplication',
  group: 'principles',
  title: 'Avoid code duplication',
  notes: `
<p>Commandment 2: <strong>Thou shalt not repeat code.</strong> <strong>DRY: Don't Repeat Yourself.</strong></p>
<h4>Disadvantages of duplication</h4>
<ul>
  <li>If duplicated code needs to change, you must remember to change all N copies, and change them correctly.</li>
  <li>If duplicated code contains a bug, the bug is replicated N times.</li>
  <li>Duplication makes the program longer, which decreases maintainability.</li>
  <li>At a deeper level, duplicated code usually represents a <strong>missing abstraction</strong> (a class or method). Removing it usually produces a more elegant design.</li>
</ul>
<p><strong>"Name another benefit besides maintainability":</strong> you only fix a bug once (no bug replicated N times), you discover the missing abstraction so the design is more elegant and easier to understand, the program is shorter, and the shared code becomes reusable.</p>
<h4>How to remove it</h4>
<ul>
  <li>All N copies in the same class: factor them into a <strong>private method</strong>.</li>
  <li>Copies in different classes: put the shared code on one of the clients, on another (possibly new) class that is a logical home, or in a <strong>superclass</strong> the clients extend.</li>
  <li>If only the types differ, use a <strong>generic</strong> type or method.</li>
  <li>If the copies are similar but not identical, use <strong>Template Method</strong>.</li>
</ul>`,
  questions: [
    { t: 'sa', q: 'In addition to making code more maintainable, name another benefit of avoiding code duplication.', k: ['A bug only exists (and is fixed) in one place instead of being replicated N times', 'OR: removing duplication reveals a missing abstraction, leading to a more elegant design', 'OR: shorter program / code is reusable'], m: 'Bugs aren\'t replicated: a defect in the shared code exists, and gets fixed, in one place instead of N. Removing duplication also tends to uncover a missing abstraction (a class or method), which leaves a more elegant and understandable design. The program gets shorter too.' },
    { t: 'mc', q: 'What does DRY stand for?', o: ['Don\'t Repeat Yourself', 'Do Refactor Yearly', 'Data Retrieval Yield', 'Design Reuse Yields'], a: 0, e: 'DRY is the acronym for avoiding duplication.' },
    { t: 'tf', q: 'According to the paper, duplicated code often indicates an abstraction (class or method) that is missing from the design.', a: true, e: '"At a deeper level, if a section of code is duplicated multiple times, this code probably represents an abstraction … that is missing from our design."' },
    { t: 'mc', q: 'Duplicated code exists in three methods of the SAME class. What is the simplest fix?', o: ['Create a superclass', 'Factor the code into a private method on that class', 'Create a generic type', 'Use the Template Method pattern'], a: 1, e: 'Paper: "If all N copies are in the same class, the duplicated code can be factored out into a private method on that class."' },
    { t: 'mc', q: 'Which is NOT a listed disadvantage of code duplication?', o: ['All N copies must be changed correctly when modified', 'A bug is replicated N times', 'The program is longer, which decreases maintainability', 'The program will not compile'], a: 3, e: 'Duplicated code compiles fine. The problems are maintenance, bug replication, and length.' },
    { t: 'sa', q: 'List the options the paper gives for where to place shared code when duplicates are in DIFFERENT classes.', k: ['On one of the client classes', 'On another (possibly new) class that is a logical home for the code', 'In a superclass that the client classes extend', 'As a generic type or method if the language supports generics'], m: 'Put the shared copy on one of the client classes, or on another (possibly new) class that is a logical home for it. Or put it in a superclass and make each client a subclass. If the copies differ only by type, a generic type or method may work best.' },
    { t: 'code', q: 'Remove the duplication in this class.', c: `class Report {
  printDaily(sales: number[]) {
    let total = 0;
    for (const s of sales) total += s;
    console.log("Daily total: $" + total.toFixed(2));
  }
  printWeekly(sales: number[]) {
    let total = 0;
    for (const s of sales) total += s;
    console.log("Weekly total: $" + total.toFixed(2));
  }
}`, k: ['Extract a private helper (e.g., printTotal(label, sales) or sum(sales))', 'Both public methods delegate to the helper', 'Summation and formatting each appear once'], mc: `class Report {
  printDaily(sales: number[]) {
    this.printTotal("Daily", sales);
  }
  printWeekly(sales: number[]) {
    this.printTotal("Weekly", sales);
  }

  private printTotal(label: string, sales: number[]) {
    const total = sales.reduce((sum, s) => sum + s, 0);
    console.log(label + " total: $" + total.toFixed(2));
  }
}` },
    { t: 'tf', q: 'Avoiding duplication only matters for large blocks of code; duplicating a one-line date-formatting expression in 40 places is fine.', a: false, e: 'The paper\'s own example is date/time formatting duplicated throughout a program. If the format changes, all 40 copies must be changed.' },
    { t: 'mc', q: 'Two classes share an algorithm that is SIMILAR but differs in a few steps. Which technique is designed for this?', o: ['Private helper method', 'Template Method pattern', 'Global variable', 'Copy and modify'], a: 1, e: 'Template Method handles similar-but-not-identical algorithms.' },
    { t: 'mc', q: 'Two functions are identical except one works on `number[]` and the other on `string[]`. Best fix?', o: ['Make one generic function with a type parameter T', 'Use any and cast everywhere', 'Keep both', 'Use inheritance'], a: 0, e: 'The paper notes generics as a good implementation choice for shared code that varies only by type.' },
    { t: 'tf', q: 'Commandment #2 is "Thou shalt not repeat code."', a: true, e: 'Ten Design Commandments #2.' },
    { t: 'mc', q: 'The paper\'s examples of commonly duplicated code include…', o: ['Searching an array for a value, and formatting date/time values for display', 'Database schemas and CSS', 'HTTP headers and cookies', 'Unit tests and mocks'], a: 0, e: 'Both are given as common duplicated operations.' },
    { t: 'code', q: 'Two presenter classes duplicate this error-handling wrapper. Remove the duplication with a shared base class (or helper) so each presenter only supplies the operation and the description.', c: `class LoginPresenter {
  async login(alias: string, pw: string) {
    try {
      await this.service.login(alias, pw);
    } catch (e) {
      this.view.displayError("Failed to log in because of exception: " + (e as Error).message);
    }
  }
}
class RegisterPresenter {
  async register(alias: string, pw: string) {
    try {
      await this.service.register(alias, pw);
    } catch (e) {
      this.view.displayError("Failed to register because of exception: " + (e as Error).message);
    }
  }
}`, k: ['Shared method (e.g., doFailureReportingOperation(operation, description)) in a base Presenter class or helper', 'Takes an async function and a description string', 'try/catch and message formatting appear once', 'Each presenter calls the shared method'], mc: `abstract class Presenter {
  constructor(protected view: { displayError(msg: string): void }) {}

  protected async doFailureReportingOperation(
    operation: () => Promise<void>,
    description: string
  ): Promise<void> {
    try {
      await operation();
    } catch (e) {
      this.view.displayError(
        "Failed to " + description + " because of exception: " + (e as Error).message
      );
    }
  }
}

class LoginPresenter extends Presenter {
  async login(alias: string, pw: string) {
    await this.doFailureReportingOperation(
      () => this.service.login(alias, pw), "log in");
  }
}` },
    { t: 'tf', q: 'If duplicated code has a bug, fixing it in one copy automatically fixes it everywhere.', a: false, e: 'That\'s the problem: you must find and fix all N copies.' },
    { t: 'mc', q: 'Removing duplication by putting shared code in a superclass uses which reuse technique?', o: ['Composition', 'Implementation inheritance', 'Parameterization', 'Information hiding'], a: 1, e: 'Clients become subclasses and inherit the common code.' },
    { t: 'sa', q: 'Explain why removing duplication usually leads to a better (more elegant) design, not just less code.', k: ['Duplicated code represents a missing abstraction', 'Extracting it creates a well-named class/method that captures the concept', 'The design becomes easier to understand and change'], m: 'Repeated code usually stands for a concept the design hasn\'t named yet. When you extract it into a well-named method or class, the concept gets one home. The design is easier to understand, changes to that concept happen in one place, and the new abstraction can be reused.' },
    { t: 'tf', q: 'Avoiding duplication and the Isolated Change principle are related: centralizing code in one place means a change to it is made once.', a: true, e: 'Both push toward one home for each piece of logic.' },
    { t: 'mc', q: 'Which is the most likely result of duplicated validation logic in five different controllers?', o: ['Eventually some copies get updated and others don\'t, so validation becomes inconsistent', 'Faster performance', 'Better information hiding', 'Lower coupling'], a: 0, e: 'Copies diverge over time, which is why the Template Method slides say to make similar code as similar as possible first.' },
    { t: 'tf', q: 'Copy-pasting a method and slightly editing it is a quick way to achieve code reuse.', a: false, e: 'That\'s duplication, not reuse. Reuse means one copy that serves many clients.' },
    { t: 'mc', q: 'Which code smell is directly about duplication?', o: ['Shotgun surgery', 'Duplicated code / copy-paste', 'Primitive obsession', 'Feature envy'], a: 1, e: 'Shotgun surgery relates to isolated change; primitive obsession to abstraction.' },
    { t: 'sa', q: 'You find 6 places that format a user\'s full name as `last + ", " + first`. Describe two different ways to remove this duplication.', k: ['Add a method to the User class (e.g., getDisplayName()) — logical home', 'Or a shared utility/helper method or class used by all six places', 'Or a value class (e.g., PersonName) with a format method'], m: 'Option 1: add a getDisplayName() method to the User class, which is the logical home, and call it from all six places. Option 2: create a small PersonName value class (or a shared NameFormatter helper) with a format() method that every client delegates to.' },
    { t: 'tf', q: 'The disadvantages of code duplication include that the program becomes longer, decreasing maintainability.', a: true, e: 'Listed as the third disadvantage in the paper.' },
    { t: 'mc', q: 'In the Template Method exercise, what was added to eliminate duplication between the two given classes?', o: ['A new parent class containing the duplicated code', 'A new interface with no methods', 'A global helper file', 'A second copy of each class'], a: 0, e: 'The exercise: refactor the two similar classes with Template Method, adding a parent class with the duplicated code.' },
    { t: 'tf', q: 'Duplicated test setup code in many test cases can be removed with Jest\'s beforeEach.', a: true, e: 'beforeEach runs shared setup before each test, so the setup isn\'t copied into every test.' },
    { t: 'mc', q: 'Which principle\'s name literally means "write each piece of knowledge once"?', o: ['DRY', 'YAGNI', 'SRP', 'OCP'], a: 0, e: 'Don\'t Repeat Yourself.' },
  ],
});

BANK.topic({
  id: 'orthogonality',
  group: 'principles',
  title: 'Orthogonality',
  notes: `
<p>The term is borrowed from geometry: two lines are orthogonal if they meet at right angles. Move along one and your position projected onto the other doesn't change.</p>
<p><strong>In software, two or more things are orthogonal if changes in one do not affect any of the others.</strong> It is a kind of independence or decoupling. Example: database code is orthogonal to the UI, so you can change the interface without affecting the database, and swap databases without changing the interface.</p>
<ul>
  <li>The non-orthogonal example is helicopter controls: every input has secondary effects on all the others, so there's "no such thing as a local fix."</li>
  <li>Goal: aspects of a system that are unrelated should be implemented so they can be modified and evolved without affecting each other. <em>Eliminate effects between unrelated things.</em></li>
</ul>
<h4>How to achieve it (exam question)</h4>
<p>The paper names two principles:</p>
<ol>
  <li><strong>Single Responsibility Principle</strong>: keep unrelated things separate in the code.</li>
  <li><strong>Minimize Dependencies</strong>: unnecessary dependencies cause unnecessary ripple effects.</li>
</ol>
<p>Information hiding, depending on abstractions and isolated change also support orthogonality, since each one reduces how much one module knows about another.</p>
<p class="src">Material quoted from <em>The Pragmatic Programmer</em> in the paper.</p>`,
  questions: [
    { t: 'sa', q: 'In the context of software design, what is the principle of "Orthogonality"? What design principles discussed in this course can help us achieve orthogonality in our designs?', k: ['Things are orthogonal if changes in one do not affect the others (independence/decoupling)', 'Unrelated aspects should be modifiable without affecting each other', 'Achieved by the Single Responsibility Principle', 'Achieved by Minimizing Dependencies (low coupling)', '(Bonus) information hiding / depend on abstractions / isolated change'], m: 'Orthogonality means independence: two parts of a system are orthogonal if changing one doesn\'t affect the other. For example, you can change the UI without touching the database code, and swap databases without changing the UI. Unrelated aspects should be implemented so they can evolve separately. The paper says we achieve it by applying the Single Responsibility Principle (keep unrelated things separate) and Minimizing Dependencies (fewer, simpler couplings means fewer ripple effects). Information hiding and depending on abstractions help too.' },
    { t: 'mc', q: 'Which two principles does the paper say are used to achieve orthogonality?', o: ['Single Responsibility Principle and Minimize Dependencies', 'Simplicity and Error Handling', 'Open-Closed and Template Method', 'Algorithm selection and Decomposition'], a: 0, e: '"Orthogonality is achieved by applying two other design principles … 1. The Single Responsibility Principle 2. Minimize Dependencies."' },
    { t: 'tf', q: 'Two components are orthogonal if a change in one does not affect the other.', a: true, e: 'The definition.' },
    { t: 'mc', q: 'The paper uses which example to illustrate a NON-orthogonal system?', o: ['Helicopter controls', 'A car steering wheel', 'A TV remote', 'A chess board'], a: 0, e: 'Every helicopter control input has secondary effects that require compensating with the others.' },
    { t: 'mc', q: 'In an orthogonal system, which is true about the user interface and the database code?', o: ['Changing the UI requires changing the DB schema', 'You can change the UI without affecting the database, and swap databases without changing the UI', 'They must be in the same class', 'They share global variables'], a: 1, e: 'The paper\'s example of orthogonal components.' },
    { t: 'tf', q: 'Orthogonality is a term borrowed from geometry, where two lines are orthogonal if they meet at right angles.', a: true, e: 'Moving along one line doesn\'t change your position projected onto the other.' },
    { t: 'mc', q: 'What does the phrase "there is no such thing as a local fix" describe?', o: ['A highly interdependent, non-orthogonal system', 'An orthogonal system', 'A system with good information hiding', 'A system using Template Method'], a: 0, e: 'When components are highly interdependent, every change ripples to others.' },
    { t: 'mc', q: 'Which code is LEAST orthogonal?', o: ['A Presenter that talks to a View interface and a Service interface', 'A UserService that builds HTML strings, writes SQL, and sends emails inside one method', 'A Logger that writes to an injected sink', 'A DAO that hides all database code'], a: 1, e: 'Mixing UI, persistence and notification means a change to any one can break the others.' },
    { t: 'tf', q: 'Minimizing dependencies is essential to orthogonality because unnecessary dependencies cause unnecessary ripple effects when changes are made.', a: true, e: 'Stated directly at the end of the Minimize Dependencies section.' },
    { t: 'sa', q: 'Explain the helicopter analogy and what it teaches about software design.', k: ['Each helicopter control has secondary effects on others, requiring compensating changes', 'Interacting controls create huge complexity/workload', 'In software, interdependent components mean changes cascade; there\'s no local fix', 'Lesson: unrelated aspects should be independent (orthogonal)'], m: 'In a helicopter, lowering the collective drops the nose and spins the craft, so you have to compensate with the other controls, and each of those adjustments affects the rest again. The pilot is constantly juggling interacting forces. Software with highly interdependent components works the same way: every change ripples into other parts, and there\'s no local fix. So unrelated aspects should be built to change independently.' },
    { t: 'mc', q: 'Changing the date format on the profile page unexpectedly breaks the CSV export. This indicates a lack of…', o: ['Orthogonality', 'Generics', 'Mocks', 'Inheritance'], a: 0, e: 'Unrelated features affect each other, a sign they share code or dependencies they shouldn\'t.' },
    { t: 'tf', q: 'Orthogonality means modules should have zero dependencies on each other.', a: false, e: 'A system with no dependencies does nothing. The goal is that UNRELATED things don\'t affect each other, with dependencies minimized, not removed.' },
    { t: 'mc', q: 'Which design choice most directly IMPROVES orthogonality?', o: ['Separating data-access code into its own package that no other code depends on for DB details', 'Using a global mutable config object read by every class', 'Putting all logic in a single Main class', 'Making every field public'], a: 0, e: 'Isolating database concerns lets the database change without affecting the rest.' },
    { t: 'sa', q: 'Besides SRP and Minimize Dependencies, name one other design principle from the course that supports orthogonality and explain how.', k: ['Names a valid principle: information hiding, depend on abstractions, or isolated change', 'Explains how it reduces the effect one part\'s changes have on others'], m: 'Information hiding: if a class keeps its implementation private, other classes can\'t depend on those details, so the implementation can change without affecting them. (Depending on abstractions works similarly, since clients rely on an interface rather than a concrete class. Isolated change keeps each design choice in one place, so changing it doesn\'t ripple.)' },
    { t: 'tf', q: 'SRP helps orthogonality because it keeps unrelated things separate in the code.', a: true, e: '"The Single Responsibility Principle requires us to keep unrelated things separate in the code, which is necessary for achieving orthogonality."' },
    { t: 'mc', q: 'In vector terms, two orthogonal lines are…', o: ['Independent', 'Parallel', 'Identical', 'Intersecting at 45°'], a: 0, e: 'The paper: "In vector terms, the two lines are independent."' },
    { t: 'mc', q: 'Which pair of components is most likely to be orthogonal in a well-designed Tweeter app?', o: ['The React login component and the DynamoDB table schema', 'A presenter and its view interface', 'A class and its own private helper method', 'A subclass and its abstract parent'], a: 0, e: 'The UI and the database storage format should be able to change independently.' },
    { t: 'tf', q: 'Two classes that both read and write the same global data structure are more orthogonal than two classes that communicate through method calls.', a: false, e: 'Shared global data is a hidden dependency that reduces independence.' },
    { t: 'mc', q: 'The orthogonality material in the paper is quoted from which book?', o: ['The Pragmatic Programmer', 'Design Patterns (GoF)', 'Clean Code', 'Code Complete'], a: 0, e: 'By Andrew Hunt and David Thomas.' },
    { t: 'code', q: 'This function mixes computing a total with formatting it for the UI. Refactor to make calculation and presentation orthogonal.', c: `function checkout(items: { price: number; qty: number }[]): string {
  let total = 0;
  for (const i of items) total += i.price * i.qty;
  if (total > 100) total *= 0.9;
  return "<div class='total'>Total: $" + total.toFixed(2) + "</div>";
}`, k: ['Separate function/class computes total (with discount) and returns a number', 'Separate function/class formats/renders the value', 'Changing the HTML no longer touches pricing logic and vice versa'], mc: `function computeTotal(items: { price: number; qty: number }[]): number {
  let total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (total > 100) total *= 0.9;
  return total;
}

function renderTotal(total: number): string {
  return "<div class='total'>Total: $" + total.toFixed(2) + "</div>";
}

const html = renderTotal(computeTotal(cart));` },
    { t: 'tf', q: 'A system where every class depends on every other class has very poor orthogonality.', a: true, e: 'Any change potentially impacts every other class.' },
    { t: 'mc', q: 'Which statement best describes the goal of orthogonality?', o: ['Eliminate effects between unrelated things', 'Maximize the number of classes', 'Make every method static', 'Use the same data structure everywhere'], a: 0, e: 'Paper: "we should eliminate effects between unrelated things."' },
    { t: 'tf', q: 'Following the MVP pattern (separating view, presenter and model) is a way to make UI code orthogonal to business logic.', a: true, e: 'Separating responsibilities lets the view change without rewriting the logic.' },
    { t: 'mc', q: 'Which change would REDUCE orthogonality?', o: ['Moving SQL out of UI event handlers into a DAO', 'Having the view directly modify the model\'s private fields', 'Injecting a service through an interface', 'Making helper methods private'], a: 1, e: 'Reaching into another component\'s internals couples them.' },
    { t: 'sa', q: 'Why are non-orthogonal systems harder to change and debug?', k: ['Components are interdependent, so a change in one part ripples into others', 'You must consider impact on many components for each change', 'Defects in one area show up elsewhere, making their source hard to find'], m: 'When components are interdependent, changing one means considering and often changing many others, so there\'s no local fix. A defect in one component can show up as misbehavior in others, which makes it hard to track down where the bug actually is.' },
  ],
});

BANK.topic({
  id: 'srp',
  group: 'principles',
  title: 'Single Responsibility Principle',
  notes: `
<p>Commandment 3: <strong>Thou shalt obey the Single Responsibility Principle.</strong> Related terms: <em>cohesion, separation of responsibility</em>.</p>
<ul>
  <li>Every class should be responsible for a single part of the software's functionality, and that responsibility should be entirely encapsulated by the class.</li>
  <li>Robert C. Martin: <strong>"A class should have only one reason to change."</strong></li>
  <li>Every class represents one well-defined concept, and all its operations are highly related to that concept.</li>
  <li>Code that changes at different times for different reasons belongs in different classes.</li>
  <li>SRP applies to <strong>methods</strong> too: each method should do one well-defined task.</li>
  <li>SRP keeps unrelated things separate, which is necessary for <strong>orthogonality</strong>. It is also the first test for whether something is decomposed enough.</li>
</ul>
<p>Spotting violations: names with "And", "Manager", "Util" or "Helper" doing everything; one class that does UI, persistence and business rules; a method with sections separated by comments ("// validate… // save… // email…").</p>`,
  questions: [
    { t: 'mc', q: 'Robert C. Martin expresses the Single Responsibility Principle as…', o: ['"A class should have only one reason to change."', '"A class should have only one method."', '"A class should depend on one other class."', '"Each module should be written by one person."'], a: 0, e: 'One reason to change = one responsibility.' },
    { t: 'tf', q: 'SRP applies to methods/functions as well as classes.', a: true, e: '"Every method or function should perform one well-defined task."' },
    { t: 'mc', q: 'Which term is most closely related to SRP?', o: ['Cohesion', 'Coupling', 'Polymorphism', 'Latency'], a: 0, e: 'Related terms: cohesion, separation of responsibility. Coupling relates to Minimize Dependencies.' },
    { t: 'mc', q: 'Which class most clearly violates SRP?', c: `class Employee {
  calculatePay(): number { /* payroll rules */ return 0; }
  saveToDatabase(): void { /* SQL */ }
  generatePerformanceReportHtml(): string { return ""; }
}`, o: ['It violates SRP: payroll rules, persistence and report formatting change for different reasons', 'It is fine; all methods are about an employee', 'It violates OCP only', 'It violates error handling only'], a: 0, e: 'Three reasons to change (accounting, DBA, reporting team). Split into PayCalculator, EmployeeRepository and EmployeeReportFormatter.' },
    { t: 'code', q: 'Refactor the `Employee` class above so each class has a single responsibility.', k: ['Employee keeps only employee data/core concept', 'Separate classes for pay calculation, persistence (repository/DAO), and report formatting', 'Each new class has a single reason to change'], mc: `class Employee {
  constructor(public id: string, public name: string, public hourlyRate: number) {}
}

class PayCalculator {
  calculatePay(e: Employee, hours: number): number {
    return e.hourlyRate * hours;
  }
}

class EmployeeRepository {
  save(e: Employee): void { /* SQL / DynamoDB */ }
}

class PerformanceReportFormatter {
  toHtml(e: Employee): string {
    return "<h1>" + e.name + "</h1>";
  }
}` },
    { t: 'tf', q: 'A class with high cohesion has operations that are all closely related to a single concept.', a: true, e: 'That\'s what SRP aims for.' },
    { t: 'mc', q: 'According to the paper, code that changes at different times for different reasons should be…', o: ['Placed in different classes', 'Placed in the same method', 'Duplicated', 'Made static'], a: 0, e: 'Separate reasons to change, separate classes.' },
    { t: 'sa', q: 'Explain the Single Responsibility Principle and give one benefit of following it.', k: ['Each class represents one well-defined concept / has one reason to change', 'All operations highly related to that concept; methods do one task', 'Benefit: easier to understand, change, test, or reuse; supports orthogonality / fewer ripple effects'], m: 'SRP says each class should own one well-defined part of the functionality, with all its operations closely related to that concept, so it has only one reason to change. Each method should do one well-defined task. Benefits: classes are easier to understand and test, a change to one responsibility doesn\'t risk breaking unrelated ones (orthogonality), and focused classes are easier to reuse.' },
    { t: 'mc', q: 'Which method name is the strongest hint of an SRP violation?', o: ['validateAndSaveAndEmailUser()', 'calculateTax()', 'getName()', 'render()'], a: 0, e: '"And" in a name usually means multiple responsibilities.' },
    { t: 'tf', q: 'A class that implements an entire application is highly cohesive because it "does one thing."', a: false, e: 'The paper calls that argument out: a one-class application is an egregious violation of SRP.' },
    { t: 'code', q: 'This method does three jobs. Decompose it to follow SRP at the method level.', c: `async function registerUser(email: string, password: string) {
  // validate
  if (!email.includes("@")) throw new Error("bad email");
  if (password.length < 8) throw new Error("weak password");
  // save
  const user = { email, hash: hash(password) };
  await db.put("users", user);
  // notify
  await mailer.send(email, "Welcome!", "Thanks for registering");
}`, k: ['Separate functions: validate (e.g., validateRegistration), save (e.g., saveUser), notify (e.g., sendWelcomeEmail)', 'registerUser becomes a short driver that calls the three', 'Each function performs one well-defined task'], mc: `async function registerUser(email: string, password: string) {
  validateRegistration(email, password);
  await saveUser(email, password);
  await sendWelcomeEmail(email);
}

function validateRegistration(email: string, password: string) {
  if (!email.includes("@")) throw new Error("bad email");
  if (password.length < 8) throw new Error("weak password");
}

async function saveUser(email: string, password: string) {
  await db.put("users", { email, hash: hash(password) });
}

async function sendWelcomeEmail(email: string) {
  await mailer.send(email, "Welcome!", "Thanks for registering");
}` },
    { t: 'mc', q: 'SRP is the FIRST of three principles the paper gives for deciding…', o: ['When something has been decomposed far enough', 'Which database to use', 'When to write tests', 'How to name variables'], a: 0, e: 'The three: SRP, size/length metrics, complexity metrics.' },
    { t: 'tf', q: 'The Isolated Change Principle is the "opposite direction" of SRP: SRP says a class should implement one responsibility; Isolated Change says a responsibility should be implemented by one class.', a: true, e: 'The paper frames them exactly this way.' },
    { t: 'mc', q: 'A React component fetches data from the server, transforms it, and renders it. Which split best follows SRP (as in the Tweeter MVP design)?', o: ['View renders, Presenter coordinates/handles logic, Service talks to the server', 'Put everything in the component', 'Put fetching in the CSS', 'Make the component extend the service'], a: 0, e: 'Each layer has one reason to change.' },
    { t: 'tf', q: 'Following SRP usually produces more classes that are each smaller and simpler.', a: true, e: 'Taken too far that becomes hyper-decomposition, but generally SRP means small, focused classes.' },
    { t: 'mc', q: 'Which question helps you detect an SRP violation?', o: ['"How many different people/requirements could force this class to change?"', '"Does it have a constructor?"', '"Is it generic?"', '"Is it more than 10 lines?"'], a: 0, e: 'More than one source of change suggests more than one responsibility.' },
    { t: 'sa', q: 'Why is SRP necessary for achieving orthogonality?', k: ['SRP keeps unrelated things separate in the code', 'If unrelated responsibilities share a class, changing one can affect the other', 'Separating them lets each change independently'], m: 'Orthogonality requires that changes to one aspect don\'t affect unrelated aspects. If unrelated responsibilities live in the same class or method, editing one risks breaking the other. SRP puts them in separate units so they can change independently.' },
    { t: 'tf', q: 'All of a class\'s services should be narrowly aligned with its single responsibility.', a: true, e: 'From the Wikipedia definition quoted in the paper.' },
    { t: 'mc', q: 'A `StringUtils` class contains `capitalize()`, `sendHttpRequest()`, and `parseCsv()`. The main problem is…', o: ['Low cohesion — unrelated operations in one class (SRP violation)', 'Too few methods', 'It isn\'t generic', 'It uses strings'], a: 0, e: 'sendHttpRequest has nothing to do with string utilities.' },
    { t: 'tf', q: 'SRP means a class may only have one public method.', a: false, e: 'A class can have many methods as long as they all relate to one concept or responsibility.' },
    { t: 'mc', q: 'Which design best follows SRP for an `Invoice` feature?', o: ['Invoice (data + totals), InvoicePrinter (formatting), InvoiceRepository (persistence)', 'Invoice with print(), save(), email(), calculateTotal()', 'One InvoiceManager doing everything', 'Global functions in one file'], a: 0, e: 'Each class has one reason to change.' },
    { t: 'sa', q: 'Give two signs in code that a class or method may be violating SRP.', k: ['Name contains "And"/"Manager"/vague catch-all', 'Methods unrelated to each other / low cohesion', 'Class is very long, many fields/methods', 'Method has comment-separated sections doing different tasks', 'Class changes for many different reasons'], m: 'For example: (1) the name is vague or compound (UserManager, validateAndSave), (2) the class has methods unrelated to each other, such as UI rendering plus SQL, (3) it\'s very long with many fields, or (4) a method has comment-separated sections that each do a different task.' },
    { t: 'mc', q: 'The Ten Design Commandments list SRP as commandment number…', o: ['1', '3', '5', '9'], a: 1, e: '1 simplicity, 2 no repetition, 3 SRP.' },
    { t: 'tf', q: 'When a class represents a large, complex concept, its functionality should be decomposed into smaller classes that do the actual work, with the main class acting as a driver/delegator.', a: true, e: 'From the Hypo/Hyper-decomposition section (e.g., a WebBrowser class delegating to subsystems).' },
    { t: 'mc', q: 'Which is the best fix for a `Game` class that handles game rules, renders the board to the terminal and saves games to disk?', o: ['Split into GameRules, BoardRenderer and GameSaver; Game coordinates them', 'Add more comments', 'Make all methods static', 'Rename the class to GameManager'], a: 0, e: 'Separate the three responsibilities.' },
  ],
});

BANK.topic({
  id: 'dependencies',
  group: 'principles',
  title: 'Minimize dependencies',
  notes: `
<p>Commandment 4: <strong>Thou shalt minimize dependencies between modules.</strong> Related term: <em>low coupling</em>.</p>
<h4>Class A depends on class B if A…</h4>
<ul><li>invokes a method on B</li><li>accesses B's internal state</li><li>inherits from B</li><li>has a method parameter of type B</li><li>shares a global data structure or file with B</li></ul>
<h4>Benefits of few dependencies</h4>
<ul>
  <li><strong>Easier to understand.</strong> Dependencies increase a class's complexity.</li>
  <li><strong>Less prone to ripple effects</strong> from changes or defects in other classes, so it's easier to modify and debug.</li>
  <li><strong>Easier to reuse</strong> in a different program. Dependencies discourage reuse.</li>
</ul>
<ul>
  <li>The goal is to minimize the number and <em>strength</em> of dependencies, not eliminate them. A system with zero dependencies does nothing.</li>
  <li>The ideal interaction is a <strong>simple method call</strong> with a good name and easy-to-understand parameters and return value. Avoid indirect channels like shared global data, which hide the dependency.</li>
  <li><strong>"Shy code"</strong> knows about and talks to as few other modules as possible.</li>
  <li><strong>Pragmatic Programmer example:</strong> <code>plotDate(aDate, aSelection)</code> digs through <code>aSelection.getRecorder().getLocation().getTimeZone()</code>, which couples it to three classes. Better: <code>plotDate(aDate, aTz)</code> and ask for what you need directly (<code>someSelection.getTimeZone()</code>). This is the Law of Demeter idea: don't talk to strangers or chain through object graphs.</li>
</ul>`,
  questions: [
    { t: 'mc', q: 'Which of the following does NOT create a dependency of class A on class B (per the paper)?', o: ['A invokes a method on B', 'A inherits from B', 'A has a method parameter of type B', 'A and B are in files with similar names'], a: 3, e: 'Listed dependencies: method call, accessing internal state, inheritance, parameter type, shared global data/file.' },
    { t: 'sa', q: 'Give three benefits of minimizing dependencies between classes.', k: ['Easier to understand (dependencies add complexity)', 'Less prone to ripple effects from changes/defects elsewhere — easier to modify and debug', 'Easier to reuse in another program'], m: '1) A class with few dependencies is easier to understand, since each dependency adds complexity. 2) It is less exposed to ripple effects from changes or defects in other classes, so it\'s easier to modify and debug. 3) It is easier to reuse in another program, because it doesn\'t drag a web of other classes with it.' },
    { t: 'tf', q: 'The goal of the Minimize Dependencies principle is to eliminate all dependencies between classes.', a: false, e: 'With no dependencies, the software doesn\'t do anything. The goal is to minimize the number and strength of dependencies.' },
    { t: 'mc', q: 'What is the paper\'s "ideal" form of interaction between two classes?', o: ['Simple method calls with good names and easy-to-understand parameters/return values', 'Shared global variables', 'Reading each other\'s private fields', 'Writing to a shared file'], a: 0, e: 'Direct and obvious in the code, unlike hidden channels.' },
    { t: 'mc', q: 'What is wrong with `plotDate(aDate, aSelection)` that calls `aSelection.getRecorder().getLocation().getTimeZone()`?', o: ['It couples the plotting routine to Selection, Recorder, AND Location unnecessarily', 'It is too short', 'It uses a Date', 'It is not generic'], a: 0, e: 'If Location stops containing a TimeZone, plotDate must change. Better: plotDate(aDate, aTz).' },
    { t: 'code', q: 'Reduce the dependencies in this code (the Pragmatic Programmer example, in TS).', c: `class Plotter {
  plotDate(aDate: Date, aSelection: Selection): void {
    const tz = aSelection.getRecorder().getLocation().getTimeZone();
    // ... plot using tz
  }
}`, k: ['plotDate takes only what it needs: (aDate: Date, tz: TimeZone)', 'Caller supplies the time zone, e.g. someSelection.getTimeZone()', 'Selection (and Recorder) get getTimeZone() methods that delegate, so no chaining'], mc: `class Plotter {
  plotDate(aDate: Date, tz: TimeZone): void {
    // ... plot using tz
  }
}

class Selection {
  constructor(private recorder: Recorder) {}
  getTimeZone(): TimeZone { return this.recorder.getTimeZone(); }
}

class Recorder {
  constructor(private location: Location) {}
  getTimeZone(): TimeZone { return this.location.getTimeZone(); }
}

plotter.plotDate(someDate, someSelection.getTimeZone());` },
    { t: 'tf', q: 'Two classes that both read and write the same global data structure have a dependency on each other, even if neither calls the other\'s methods.', a: true, e: 'Shared global data is listed as a dependency, and an especially hidden one.' },
    { t: 'mc', q: 'Minimizing dependencies is sometimes called writing ______ code.', o: ['shy', 'clean', 'lazy', 'pure'], a: 0, e: '"Shy code": a module should know about or talk to as few other modules as possible.' },
    { t: 'mc', q: 'Which term is the "related term" for Minimize Dependencies?', o: ['Low coupling', 'High cohesion', 'Encapsulation', 'Polymorphism'], a: 0, e: 'Coupling measures dependency strength. SRP relates to cohesion.' },
    { t: 'tf', q: 'Indirect communication (like shared global data) makes dependencies less explicit and harder to detect and comprehend.', a: true, e: 'Which is why explicit method interfaces are preferred.' },
    { t: 'sa', q: 'Imagine a system where every class depends on every other class. Describe two problems this causes.', k: ['Any change requires considering impact on all other classes', 'A defect in one class can affect all others, making the source hard to track down', 'Hard to understand/reuse'], m: 'Every change to any class forces you to consider its effect on every other class, which is very confusing. And a defect in one class can show up in all the others, so it\'s hard to find where the bug really lives.' },
    { t: 'mc', q: 'Which line of code has the MOST dependencies (the "train wreck")?', o: ['order.getCustomer().getAddress().getCity().getName()', 'order.getTotal()', 'customer.getName()', 'city.toString()'], a: 0, e: 'Chaining through objects couples the caller to Order, Customer, Address and City.' },
    { t: 'tf', q: 'Inheritance creates a dependency from the subclass to the superclass.', a: true, e: '"Class A inherits from class B" is on the list.' },
    { t: 'mc', q: 'Why does the paper say "traversing relationships between objects directly" is dangerous?', o: ['It can lead to a combinatorial explosion of dependency relationships', 'It is slow', 'It uses too much memory', 'TypeScript doesn\'t allow it'], a: 0, e: 'Each hop adds another class you depend on.' },
    { t: 'mc', q: 'A class has dependencies on 25 other classes. What is the most likely consequence?', o: ['It is hard to understand, easily broken by changes elsewhere, and hard to reuse', 'It runs faster', 'It is easier to test', 'It has better information hiding'], a: 0, e: 'All three benefits of minimizing dependencies are lost.' },
    { t: 'tf', q: 'Minimizing dependencies applies only to classes, not to functions, methods or packages.', a: false, e: '"More generally, the same principle applies to any kind of software module, including classes, functions and methods, packages, etc."' },
    { t: 'code', q: 'This function depends on a mutable global. Refactor it so the dependency is explicit and minimal.', c: `let currentUserRole = "guest";

function canDelete(postOwnerId: string, userId: string): boolean {
  return currentUserRole === "admin" || postOwnerId === userId;
}`, k: ['Remove reliance on the global variable', 'Pass the role (or user object) as a parameter', 'Function now depends only on its inputs (easier to test)'], mc: `function canDelete(
  postOwnerId: string,
  userId: string,
  userRole: string
): boolean {
  return userRole === "admin" || postOwnerId === userId;
}

canDelete(post.ownerId, user.id, user.role);` },
    { t: 'mc', q: 'Which principle is MOST directly supported by Minimize Dependencies?', o: ['Orthogonality', 'Algorithm selection', 'Simplicity only', 'Error handling'], a: 0, e: 'Orthogonality is achieved through SRP + Minimize Dependencies.' },
    { t: 'tf', q: 'Depending on an interface instead of a concrete class reduces the strength of a dependency.', a: true, e: 'You depend on a stable abstraction, not one specific implementation.' },
    { t: 'mc', q: 'Which is the WEAKEST (most desirable) kind of dependency?', o: ['Calling a well-named method on an interface with simple parameters', 'Accessing another class\'s internal fields', 'Sharing a global mutable object', 'Inheriting from a concrete class to reuse one method'], a: 0, e: 'Explicit, simple, abstract.' },
    { t: 'sa', q: 'Explain what "ask for what you need directly" means in the plotDate example, and why it is better.', k: ['Instead of passing a Selection and digging out the TimeZone, pass the TimeZone itself', 'Plotting routine no longer depends on Selection/Recorder/Location', 'Changes to how TimeZone is stored (e.g., Location no longer has it) don\'t affect plotDate'], m: 'Rather than passing a Selection and having plotDate dig out selection.getRecorder().getLocation().getTimeZone(), pass the TimeZone itself: plotDate(aDate, aTz). Then plotDate depends only on TimeZone and not on Selection, Recorder or Location. If someone changes where the time zone is stored, plotDate doesn\'t change. Each object just asks its neighbor for the time zone.' },
    { t: 'tf', q: 'A method parameter of type B creates a dependency on B.', a: true, e: 'Listed in the paper.' },
    { t: 'mc', q: 'Which refactoring REDUCES coupling between a Presenter and the network layer?', o: ['Presenter depends on a UserService interface that hides HTTP details', 'Presenter builds fetch() requests itself', 'Presenter reads the server response headers directly', 'Presenter imports axios'], a: 0, e: 'The service encapsulates the network details.' },
    { t: 'tf', q: 'A class with few dependencies is generally easier to reuse in a different program.', a: true, e: 'Dependencies discourage reuse.' },
    { t: 'mc', q: 'The Law of Demeter ("only talk to your immediate friends") is most closely aligned with which principle?', o: ['Minimize Dependencies', 'Template Method', 'Algorithm selection', 'YAGNI'], a: 0, e: 'The plotDate example is a Demeter-style refactoring.' },
  ],
});

BANK.topic({
  id: 'decomposition',
  group: 'principles',
  title: 'Decomposition',
  notes: `
<p>Commandment 5: <strong>Thou shalt properly decompose thy programs.</strong> This is <em>divide and conquer</em>: break a problem into smaller sub-problems, recursively, until the leaves are simple enough to solve directly. You end up with a <em>tree</em> of problems, and each solution is abstracted as a class or method. Many of the design's abstractions are discovered or invented during decomposition.</p>
<h4>Levels of design (top-down)</h4>
<p>System → Subsystems → Packages → Classes → Methods. Web browser example: subsystems like Network Protocols, File Viewers, History, Favorites and Printing; the File Viewers subsystem has a package per format (HTML, PDF, XML); each package has classes; each class has methods.</p>
<h4>Hypo- vs. hyper-decomposition</h4>
<ul>
  <li><strong>Hypo-decomposition</strong> (deficient) is the common mistake: not decomposing far enough. The extreme is the whole program in one class, an egregious SRP violation. The main class should be a <em>driver/delegator</em>.</li>
  <li><strong>Hyper-decomposition</strong> (excessive) is rarer: decomposing too far, like a <code>Digit</code> class for each digit in a <code>CreditCardNumber</code>.</li>
</ul>
<h4>Three ways to tell you've decomposed far enough (exam question: name two)</h4>
<ol>
  <li><strong>Single Responsibility Principle:</strong> multiple responsibilities mean decomposing into multiple classes or methods.</li>
  <li><strong>Size/length metrics:</strong> e.g. classes over ~2000 lines, ~50 methods or ~25 variables; methods over ~50 lines (often much less); ~10 parameters.</li>
  <li><strong>Complexity metrics:</strong> deep nesting, lots of branching and complex expressions. Two 100-line methods can differ hugely in complexity.</li>
</ol>`,
  questions: [
    { t: 'sa', q: 'The reading suggests three specific ways to determine whether a module has been decomposed sufficiently. Name two of them.', k: ['Single Responsibility Principle (multiple responsibilities → decompose further)', 'Size/length metrics (too many lines/methods/variables/parameters)', 'Complexity metrics (nesting, branching, complex expressions)'], m: 'Any two of: (1) the Single Responsibility Principle: if a class or method has multiple responsibilities, split it; (2) size/length metrics: very long classes (e.g. 2000 lines, 50 methods, 25 variables) or long methods (more than ~50 lines, or ~10 parameters) should be decomposed further; (3) complexity metrics: deeply nested loops, heavy branching or complex arithmetic call for breaking a method into sub-methods.' },
    { t: 'mc', q: 'Which is NOT one of the three principles the paper gives for deciding whether decomposition is sufficient?', o: ['Single Responsibility Principle', 'Size/length metrics', 'Complexity metrics', 'Number of developers on the team'], a: 3, e: 'The three are SRP, size/length metrics, and complexity metrics.' },
    { t: 'mc', q: 'What does "hypo-decomposition" mean?', o: ['Not decomposing far enough', 'Decomposing too far', 'Decomposing bottom-up', 'Using inheritance instead of composition'], a: 0, e: 'Hypo = deficient. It\'s the more common mistake, especially among beginners.' },
    { t: 'mc', q: 'Which is the paper\'s example of HYPER-decomposition?', o: ['Storing a credit card number as an array of Digit objects', 'A WebBrowser class implementing everything', 'A 500-line method', 'Using a String for a credit card number'], a: 0, e: 'Creating a Digit class for each digit is overkill.' },
    { t: 'tf', q: 'Hyper-decomposition is a more common mistake than hypo-decomposition.', a: false, e: 'The paper says hyper-decomposition is "harder to make and far more rare". Most beginners under-decompose.' },
    { t: 'mc', q: 'What are the levels of design, from top to bottom?', o: ['System → Subsystems → Packages → Classes → Methods', 'Methods → Classes → Packages → System', 'System → Classes → Packages → Methods', 'Packages → System → Classes → Methods'], a: 0, e: 'Decomposition is inherently top-down.' },
    { t: 'tf', q: 'Decomposition is inherently a top-down process.', a: true, e: 'Stated in the paper: start with the entire system and divide.' },
    { t: 'mc', q: 'Two methods are each 100 lines. One is straight-line println statements; the other has deeply nested loops and branching. Which metric distinguishes them?', o: ['Complexity metrics', 'Size/length metrics', 'SRP', 'Naming'], a: 0, e: 'Same length, very different complexity. The second "almost demands" decomposition.' },
    { t: 'tf', q: 'According to the paper, methods that are sufficiently decomposed are often less than 50 lines, and in many cases 50 is still too long.', a: true, e: 'Sufficiently decomposed methods tend to be short, often very short.' },
    { t: 'mc', q: 'A method requires 10 parameters. What does the paper suggest?', o: ['It might be doing too much and require further decomposition', 'It is ideal', 'Make all parameters optional', 'Convert it to a global function'], a: 0, e: 'A large number of parameters is a size metric red flag.' },
    { t: 'sa', q: 'Describe the decomposition process and what it produces.', k: ['Divide a problem into smaller sub-problems (divide and conquer)', 'Repeat recursively until sub-problems are simple enough to implement directly', 'Produces a tree of problems; each solution abstracted as a class or method', 'Higher levels invoke abstractions of lower levels; reveals/invents abstractions'], m: 'Decomposition (divide and conquer) splits a complex problem into smaller, simpler sub-problems, and keeps splitting until each leaf is simple enough to implement directly. The result is a tree of problems. Each solution is abstracted as a class or method, and higher-level solutions call the abstractions below them, so you can ignore details for a while. Many of the design\'s classes and methods are discovered this way.' },
    { t: 'mc', q: 'In the paper\'s web-browser example, which is a SUBSYSTEM?', o: ['File Viewers', 'The HTML viewer class', 'A method that parses a tag', 'The PDF package'], a: 0, e: 'Subsystems: Network Protocols, File Viewers, History, Favorites, Printing. The PDF/HTML viewers are packages inside File Viewers.' },
    { t: 'tf', q: 'In a properly decomposed program, the main application class should mostly act as a delegator ("driver"), doing little work itself.', a: true, e: 'It delegates to lower-level classes that implement the functionality.' },
    { t: 'code', q: 'Decompose this method into well-named sub-methods.', c: `function processOrder(order: Order): void {
  // validate
  if (order.items.length === 0) throw new Error("empty");
  for (const i of order.items) if (i.qty <= 0) throw new Error("bad qty");
  // compute total
  let total = 0;
  for (const i of order.items) total += i.price * i.qty;
  if (order.coupon === "SAVE10") total *= 0.9;
  total += total * 0.0725;
  // print receipt
  console.log("Order " + order.id);
  for (const i of order.items) console.log(i.name + " x" + i.qty);
  console.log("Total: " + total.toFixed(2));
}`, k: ['processOrder becomes a short driver', 'Separate methods like validateOrder, computeTotal (maybe applyDiscount/addTax), printReceipt', 'Each sub-method does one task; names describe what they do'], mc: `function processOrder(order: Order): void {
  validateOrder(order);
  const total = computeTotal(order);
  printReceipt(order, total);
}

function validateOrder(order: Order): void {
  if (order.items.length === 0) throw new Error("empty");
  for (const i of order.items) if (i.qty <= 0) throw new Error("bad qty");
}

function computeTotal(order: Order): number {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  return addTax(applyCoupon(subtotal, order.coupon));
}

function applyCoupon(amount: number, coupon?: string): number {
  return coupon === "SAVE10" ? amount * 0.9 : amount;
}

function addTax(amount: number): number {
  return amount * 1.0725;
}

function printReceipt(order: Order, total: number): void {
  console.log("Order " + order.id);
  for (const i of order.items) console.log(i.name + " x" + i.qty);
  console.log("Total: " + total.toFixed(2));
}` },
    { t: 'mc', q: 'Classes with roughly how many methods are flagged by the paper as "probably doing the work of several classes"?', o: ['50', '5', '10', '500'], a: 0, e: 'The paper\'s examples: ~2000 lines, ~50 methods, ~25 variables.' },
    { t: 'tf', q: 'Through the decomposition process, many of the necessary abstractions (classes, methods) are discovered or invented.', a: true, e: 'Decomposition and abstraction go together.' },
    { t: 'mc', q: 'An entire Chess program implemented in a single class is an example of…', o: ['Hypo-decomposition and an egregious SRP violation', 'Hyper-decomposition', 'Good cohesion', 'The Template Method pattern'], a: 0, e: 'One class doing everything is the extreme hypo-decomposition example.' },
    { t: 'sa', q: 'Why is "decomposed until simple enough to implement directly" a subjective stopping point, and what helps make it more objective?', k: ['Everyone has a different sense of when something is "simple enough"', 'SRP, size/length metrics, and complexity metrics provide guidance', 'Common sense also applies'], m: 'People differ in what they consider "simple enough to implement directly", so the stopping point is subjective. Beyond common sense, the paper gives three guides: SRP (one responsibility each), size/length metrics (lines, methods, variables, parameters) and complexity metrics (nesting, branching, complicated expressions).' },
    { t: 'tf', q: 'Methods containing complex arithmetic expressions, deeply nested structures, and lots of branching should be broken into sub-methods.', a: true, e: 'Complexity metrics guidance.' },
    { t: 'mc', q: 'Why does decomposing a problem reduce cognitive burden?', o: ['The solution to the larger problem invokes abstractions, letting you temporarily ignore sub-problem details', 'It reduces the number of lines of code to zero', 'It removes all dependencies', 'It makes code run faster'], a: 0, e: 'You think about one level at a time.' },
    { t: 'tf', q: 'A class with 25 instance variables is probably fine and needs no further decomposition.', a: false, e: '25 variables is the paper\'s example of a class that probably violates SRP.' },
    { t: 'mc', q: 'Which situation is the BEST candidate for further decomposition?', o: ['A 30-line method with 5 levels of nested if/for and 12 branches', 'A 3-line getter', 'A class with 4 related methods', 'A constructor that assigns 3 fields'], a: 0, e: 'High complexity even at moderate length.' },
    { t: 'tf', q: 'Decomposition and SRP are related: if a class implements multiple responsibilities, you should decompose it into multiple classes.', a: true, e: 'SRP is the first decomposition test.' },
    { t: 'mc', q: '"Divide and conquer" is another name for…', o: ['Decomposition', 'Orthogonality', 'Information hiding', 'Isolated change'], a: 0, e: 'Break the problem into smaller sub-problems.' },
    { t: 'sa', q: 'Define hypo-decomposition and hyper-decomposition and give an example of each.', k: ['Hypo: not decomposing far enough (deficient) — e.g., entire program in one class, 500-line method', 'Hyper: decomposing too far (excessive) — e.g., Digit class in CreditCardNumber', 'Hypo is far more common'], m: 'Hypo-decomposition is not decomposing far enough, for example implementing a whole application in one class or writing a 500-line method. It\'s the common mistake. Hyper-decomposition is decomposing too far, for example storing a CreditCardNumber as an array of Digit objects when a validated string would do. It\'s much rarer.' },
  ],
});
