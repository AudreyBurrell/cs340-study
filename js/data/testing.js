/* Testing: Jest + React Testing Library, Mocks & Spies (ts-mockito) */

BANK.topic({
  id: 'jest-rtl',
  group: 'testing',
  title: 'Jest & React Testing Library',
  notes: `
<p>Tweeter's testing tools: <strong>jest</strong> (unit testing framework for JS/TS, like JUnit), <strong>ts-mockito</strong> (mocks and spies) and <strong>@testing-library</strong> (React component testing). Run them with <code>npm run test</code>. Tests live in <code>src/tests/…</code> and mirror the source folders (<code>components/</code>, <code>model/</code>, <code>presenter/</code>) as <code>*.test.ts(x)</code>.</p>
<h4>Jest basics</h4>
<pre class="code">test(name, fn, timeout)   // alias: it(...)
expect(value).matcher(...)
expect(x).not.toBe(y)     // .not negates
describe("group", () =&gt; { test(...); test(...); })   // can nest</pre>
<ul>
  <li><code>.toBe</code> is shallow equality (===). <code>.toEqual</code> is deep (recursive) equality. <code>.toHaveLength</code>, <code>.toContain</code> / <code>.toContainEqual</code>, <code>.toMatch(regex|string)</code>, <code>.toHaveProperty</code>, <code>.toBeCloseTo</code> (floats), <code>.toBeDefined/Undefined/Null/NaN</code>, <code>.toBeTruthy/Falsy</code>, <code>.toBeGreaterThan/LessThan</code>, <code>.toThrow</code>.</li>
  <li><code>beforeAll</code> / <code>afterAll</code> run once per file (or per describe block). <code>beforeEach</code> / <code>afterEach</code> run around every test. Nested in a <code>describe</code>, they apply only to that block.</li>
  <li>Parameterized tests: <code>test.each([[1,1,2],[1,2,3]])('.add(%i, %i)', (a,b,expected) =&gt; …)</code> and <code>describe.each</code>.</li>
  <li>Async tests: return a promise or use <code>async</code>/<code>await</code>.</li>
  <li>Jest mock functions: <code>const fn = jest.fn()</code>, <code>fn.mockReturnValueOnce(10).mockReturnValue(true)</code>, <code>expect(fn).toHaveBeenCalled()</code>, <code>.toHaveBeenCalledWith(a,b)</code>, <code>.toHaveBeenLastCalledWith(…)</code>, <code>.toHaveBeenCalledTimes(n)</code>.</li>
</ul>
<h4>React Testing Library</h4>
<p>Verify that a component <strong>renders correctly</strong> (updates the DOM properly), <strong>updates state correctly</strong> and <strong>fires events correctly</strong>.</p>
<pre class="code">render(&lt;MemoryRouter&gt;&lt;MyComponent page="…"/&gt;&lt;/MemoryRouter&gt;);
const btn = await screen.findByText(/Press Me/);
expect(btn).toBeEnabled();              // jest-dom matcher
const user = userEvent.setup();
await user.click(btn);
expect(onButtonClick).toHaveBeenCalledTimes(1);</pre>
<ul>
  <li><code>getBy…</code> is synchronous: it returns the element and <em>throws</em> if there's no match (or more than one).</li>
  <li><code>queryBy…</code> is synchronous: it returns <em>null</em> if there's no match. Use it to assert something is <em>not</em> present.</li>
  <li><code>findBy…</code> is <em>async</em>: it returns a Promise and retries until the element appears (default 1s timeout), then rejects. Use it for elements that show up after async work.</li>
  <li><code>…AllBy</code> variants return arrays.</li>
  <li><code>@testing-library/jest-dom</code> adds DOM matchers: <code>toBeEnabled</code>, <code>toHaveAttribute</code>, <code>toContainHTML</code>, <code>toBeInTheDocument</code>…</li>
  <li><code>MemoryRouter</code> wraps components that use react-router. <code>data-testid</code> plus <code>findByTestId</code> locates elements.</li>
</ul>`,
  questions: [
    { t: 'mc', q: 'What is the difference between `.toBe()` and `.toEqual()` in Jest?', o: ['toBe checks shallow/reference equality (===); toEqual recursively checks deep equality of values', 'They are identical', 'toEqual checks references; toBe checks deep equality', 'toBe is only for strings'], a: 0, e: 'expect({a:1}).toEqual({a:1}) passes; expect({a:1}).toBe({a:1}) fails (different objects).' },
    { t: 'tf', q: '`it()` is an alias for `test()` in Jest.', a: true, e: 'Both define a test case.' },
    { t: 'mc', q: 'Which Jest hook runs a function before EACH test in its scope?', o: ['beforeEach', 'beforeAll', 'afterAll', 'describe'], a: 0, e: 'beforeAll runs once before all tests in the file or describe block.' },
    { t: 'mc', q: 'Which query should you use to assert an element is NOT on the page?', o: ['queryBy… (returns null when not found)', 'getBy… (throws when not found)', 'findBy… (rejects after timeout)', 'getAllBy…'], a: 0, e: 'expect(screen.queryByText("Error")).toBeNull().' },
    { t: 'mc', q: 'Which query is asynchronous and retries until the element appears?', o: ['findBy…', 'getBy…', 'queryBy…', 'querySelector'], a: 0, e: 'findBy returns a Promise (default timeout 1s).' },
    { t: 'tf', q: '`getByText` returns null if no element matches.', a: false, e: 'getBy throws if there\'s no match (or more than one). queryBy returns null.' },
    { t: 'mc', q: 'What does `describe` do?', o: ['Groups related tests into a block (which can be nested)', 'Runs a test asynchronously', 'Creates a mock', 'Prints a description of the test result'], a: 0, e: 'describe(name, fn) groups tests; hooks inside apply only to that block.' },
    { t: 'code', q: 'Write a Jest test suite for a `Calculator` class with an `add(a, b)` method. Use `describe`, a `beforeEach` that creates a fresh calculator, and two tests (one normal, one using `.not`).', k: ['describe("Calculator", ...) wrapping tests', 'let calc; beforeEach(() => { calc = new Calculator(); })', 'test(... expect(calc.add(2, 3)).toBe(5))', 'A test using .not (e.g., .not.toBe(6))'], mc: `import { Calculator } from "../../src/model/Calculator";

describe("Calculator", () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  test("adds two numbers", () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test("does not add incorrectly", () => {
    expect(calc.add(2, 3)).not.toBe(6);
  });
});` },
    { t: 'mc', q: 'Which matcher should you use to compare floating-point results like `0.1 + 0.2`?', o: ['toBeCloseTo', 'toBe', 'toEqual', 'toMatch'], a: 0, e: 'Floating-point rounding makes 0.1 + 0.2 !== 0.3. Use expect(0.1 + 0.2).toBeCloseTo(0.3).' },
    { t: 'mc', q: 'Which matcher checks that a function throws?', o: ['expect(() => fn()).toThrow()', 'expect(fn()).toThrow()', 'expect(fn).toBeFalsy()', 'expect(fn).toBeNull()'], a: 0, e: 'Wrap the call in a function so Jest can catch the exception. Calling fn() directly would throw before expect runs.' },
    { t: 'code', q: 'Write a parameterized Jest test using `test.each` that checks `add(a, b)` for the inputs (1,1,2), (1,2,3), and (2,1,3).', k: ['test.each([[1,1,2],[1,2,3],[2,1,3]])', 'Name template like \'.add(%i, %i)\'', 'Callback (a, b, expected) => expect(add(a, b)).toBe(expected)'], mc: `test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])(".add(%i, %i)", (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});` },
    { t: 'mc', q: 'What does this print?', c: `const myMock = jest.fn();
myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);
console.log(myMock(), myMock(), myMock(), myMock());`, o: ['10, "x", true, true', '10, "x", undefined, undefined', 'true, true, true, true', '10, 10, 10, 10'], a: 0, e: 'The "once" values are used first, then the default return value from then on.' },
    { t: 'tf', q: 'A jest.fn() mock function with nothing configured returns undefined when called.', a: true, e: 'From the slides: console.log(myMock()) prints undefined.' },
    { t: 'mc', q: 'Which assertion checks that a jest mock was called with specific arguments at least once?', o: ['expect(mockFn).toHaveBeenCalledWith(arg1, arg2)', 'expect(mockFn).toBe(arg1, arg2)', 'verify(mockFn(arg1, arg2)).called()', 'expect(mockFn).toEqual(arg1)'], a: 0, e: 'verify(...) is ts-mockito syntax, not Jest.' },
    { t: 'sa', q: 'The slides say React component tests should verify three things. What are they?', k: ['Renders correctly (updates the DOM properly)', 'Updates state correctly', 'Fires events correctly'], m: 'That the component (1) renders correctly, meaning it updates the DOM properly, (2) updates its state correctly, and (3) fires events correctly, e.g. calls an onClick prop when its button is clicked.' },
    { t: 'code', q: 'Write a React Testing Library test that renders `MyComponent` (from the slides) with a jest mock `onButtonClick` prop, clicks the "Press Me" button twice, and asserts the handler was called twice.', k: ['const onButtonClick = jest.fn()', 'render(<MemoryRouter><MyComponent ... onButtonClick={onButtonClick} /></MemoryRouter>)', 'const user = userEvent.setup(); find button with screen.findByText(/Press Me/)', 'await user.click(button) twice (inside act if desired)', 'expect(onButtonClick).toHaveBeenCalledTimes(2)'], mc: `import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import MyComponent from "../../components/MyComponent";

test("fires onButtonClick events", async () => {
  const onButtonClick = jest.fn();
  render(
    <MemoryRouter>
      <MyComponent page="http://www.facebook.com" onButtonClick={onButtonClick}>
        Facebook
      </MyComponent>
    </MemoryRouter>
  );

  const user = userEvent.setup();
  const button = await screen.findByText(/Press Me/);
  expect(button).toBeEnabled();

  await user.click(button);
  await user.click(button);

  expect(onButtonClick).toHaveBeenCalledTimes(2);
});` },
    { t: 'mc', q: 'Why does the slides\' component test wrap `MyComponent` in `<MemoryRouter>`?', o: ['The component (or its children) uses react-router features that need a router context', 'MemoryRouter speeds up tests', 'It is required for every Jest test', 'It mocks fetch'], a: 0, e: 'MemoryRouter provides router context in memory without a real browser URL.' },
    { t: 'tf', q: '`@testing-library/jest-dom` adds DOM-specific matchers like `toBeEnabled()` and `toHaveAttribute()`.', a: true, e: 'Import "@testing-library/jest-dom" to use them.' },
    { t: 'mc', q: 'How does the slides\' test find the anchor element?', o: ['await screen.findByTestId("my-anchor") using a data-testid attribute', 'document.getElementById', 'screen.getByRole("anchor")', 'container.querySelector("a")'], a: 0, e: 'The component sets data-testid="my-anchor".' },
    { t: 'tf', q: '`afterAll` runs once after all tests in its file (or describe block) have completed.', a: true, e: 'Useful for cleanup such as closing database connections.' },
    { t: 'mc', q: 'What command runs the Tweeter tests per the slides?', o: ['npm run test', 'npm start', 'jest --watch only', 'tsc'], a: 0, e: 'npm run test (or npm test).' },
    { t: 'mc', q: 'Which matcher checks deep membership of an object in an array?', o: ['toContainEqual', 'toContain', 'toBe', 'toHaveLength'], a: 0, e: 'toContain uses ===; toContainEqual compares structurally.' },
    { t: 'tf', q: 'Jest will wait for a Promise returned from beforeAll/beforeEach to resolve before running the tests.', a: true, e: 'The slides\' database setup example relies on this.' },
    { t: 'mc', q: 'In the slides\' text-input event test, why are user events wrapped in `act(async () => { ... })`?', o: ['To make sure React finishes processing state updates/effects before assertions', 'To mock the input', 'To speed up the test', 'act creates the component'], a: 0, e: 'act flushes React updates so assertions see the final DOM.' },
    { t: 'sa', q: 'Explain when to use `getBy`, `queryBy`, and `findBy` queries.', k: ['getBy: synchronous, element must be present now; throws if not found or multiple', 'queryBy: synchronous, returns null if not found — use to assert absence', 'findBy: async (Promise), retries until element appears (default ~1s) — for elements appearing after async work'], m: 'getBy: synchronous. Use it when the element should already be there; it throws if there\'s no match or more than one. queryBy: synchronous and returns null instead of throwing, so use it to assert something is not present. findBy: asynchronous. It returns a Promise and retries until the element appears (default timeout 1s), so use it for elements that show up after async work like fetching data. The AllBy variants return arrays.' },
  ],
});

BANK.topic({
  id: 'mocks-spies',
  group: 'testing',
  title: 'Mocks & spies (ts-mockito)',
  notes: `
<h4>Why fake objects?</h4>
<p>Unit tests isolate the code under test from its dependencies. "Fake" (mock) objects stand in for real collaborators that are slow (a database), nondeterministic (the time, the network), hard to put into certain states (errors, timeouts), not written yet, or have side effects (sending email). <em>Wikipedia:</em> mocks simulate the behavior of real objects in controlled ways.</p>
<h4>What can fake objects do? (slides)</h4>
<ul>
  <li>Do nothing</li><li>Validate method inputs</li><li>Validate method call sequence (including parameter values)</li><li>Send a message to a log</li><li>Return a hard-coded answer regardless of input</li><li>Select an answer from a pool of hard-coded answers (cycle through it or pick randomly)</li><li>Randomly generate an answer</li><li>Prompt the user for the answer</li><li>Act as a simple implementation that is slower, less accurate or less capable than the real module</li><li>Pause to simulate the time the real module takes</li><li>Generate errors (throw exceptions) that are hard to produce for real</li>
</ul>
<h4>Mocks vs. spies</h4>
<ul>
  <li><strong>Mock:</strong> implements a type's public interface. By default its methods <em>do nothing</em> (unstubbed calls return null) and properties are undefined. You program it to return values, throw, and so on.</li>
  <li><strong>Spy:</strong> <em>wraps a real object</em> and mirrors its interface. By default its methods <em>delegate to the real object</em>. You can override specific methods and verify calls.</li>
</ul>
<h4>when vs. verify</h4>
<ul>
  <li><code>when(...)</code> <strong>stubs</strong> behavior <em>before</em> the code runs: <code>.thenReturn</code>, <code>.thenThrow</code>, <code>.thenCall</code>, <code>.thenResolve</code>, <code>.thenReject</code>.</li>
  <li><code>verify(...)</code> <strong>asserts</strong> <em>after</em> the code runs that methods were called: <code>.called()</code>, <code>.once()</code>, <code>.twice()</code>, <code>.thrice()</code>, <code>.times(n)</code>, <code>.atLeast(n)</code>, <code>.atMost(n)</code>, <code>.never()</code>, <code>.calledBefore()</code>/<code>.calledAfter()</code>.</li>
</ul>
<pre class="code">const mockedFoo: Foo = mock(Foo);          // or mock&lt;FooInterface&gt;()
when(mockedFoo.getBar(3)).thenReturn("three");
const foo: Foo = instance(mockedFoo);      // pass THIS to the code under test
foo.getBar(3);                             // "three"
foo.getBar(999);                           // null (not stubbed)
verify(mockedFoo.getBar(3)).once();        // verify on the MOCK, not the instance

// spy
const real = new Foo();
const spied = spy(real);
when(spied.getBar(3)).thenReturn("one");
real.getBar(3);      // "one"
real.getBaz();       // real method runs
verify(spied.getBaz()).once();

// capture
const [a, b] = capture(mockedFoo.sumTwoNumbers).last();

// reset
resetCalls(mockedFoo);  // clears call counts, keeps stubs
reset(mockedFoo);       // clears call counts AND stubs</pre>
<p>Matchers: <code>anything()</code>, <code>anyNumber()</code>, <code>anyString()</code>, <code>between(a,b)</code>, <code>deepEqual(obj)</code>. You can mock classes, interfaces (<code>mock&lt;I&gt;()</code>), abstract classes and generic classes. <code>thenReturn('one','two','three')</code> returns those in sequence and then repeats the last one forever.</p>`,
  questions: [
    { t: 'sa', q: 'What is the role of "fake" objects in unit and integration testing? What useful things can "fake" objects do in test cases?', k: ['Role: stand in for the real dependencies so code under test can be isolated (and tested deterministically, quickly)', 'Useful when real objects are slow, nondeterministic, hard to put in states, unavailable, or have side effects', 'Can: do nothing; return hard-coded/canned answers (or from a pool/random)', 'Can: validate inputs and call sequences (verify calls)', 'Can: throw errors that are hard to produce for real; log; simulate delays; simple/less capable implementation'], m: 'Fake objects (mocks, stubs, spies) replace the real collaborators of the code under test, so the unit can be tested in isolation, quickly and deterministically. That matters when the real dependency is slow (a database), nondeterministic (time, network), hard to put into a particular state (a server error), not built yet, or has side effects (sending email). Fakes can: do nothing; return a hard-coded answer, or pick one from a pool, cycle or randomize; validate the inputs passed to them; validate the sequence of calls and parameters; log messages; throw errors that are hard to produce for real; pause to simulate latency; prompt the user; or act as a simpler, less capable implementation of the real module.' },
    { t: 'sa', q: 'What is the difference between "mocks" and "spies"?', k: ['Mock: a fake object implementing a type\'s interface; by default methods do nothing / return null, properties undefined', 'Spy: wraps a REAL object; by default calls delegate to the real object\'s methods', 'Both can be stubbed (when) and verified (verify)'], m: 'A mock is a completely fake object that implements a type\'s public interface. By default its methods do nothing (returning null) and its properties are undefined, until you stub them. A spy wraps a real object and mirrors its interface. By default every call goes through to the real object\'s implementation, but you can override chosen methods and verify how it was called. Use a spy when you want mostly real behavior plus the ability to observe calls or replace a few of them.' },
    { t: 'sa', q: 'What is the difference between "when" and "verify" in ts-mockito?', k: ['when: stubs/programs behavior BEFORE the code runs (thenReturn, thenThrow, thenResolve, thenCall...)', 'verify: asserts AFTER the code runs that methods were (or weren\'t) called, how many times, with which args, in what order', 'when sets up inputs to the code under test; verify checks its outputs/interactions'], m: 'when() stubs a method: before the code under test runs, you tell the mock what to do when a method is called with certain arguments, e.g. when(mockService.getUser("a")).thenReturn(user), or thenThrow/thenResolve/thenReject/thenCall. verify() is an assertion made afterwards that checks how the mock was used: that a method was called, how many times (once, twice, times(n), never), with which arguments, and in what order (calledBefore/calledAfter). when controls the input the code under test receives; verify checks the interactions it produced.' },
    { t: 'mc', q: 'In ts-mockito, what does an unstubbed method on a mock return?', o: ['null', 'The real implementation\'s result', 'An exception', 'undefined is never returned; it returns 0'], a: 0, e: 'The slides: console.log(foo.getBar(999)) prints null because it wasn\'t stubbed.' },
    { t: 'mc', q: 'What does `instance(mockedFoo)` do?', o: ['Returns the object you pass to the code under test; when/verify are called on mockedFoo itself', 'Creates a new real Foo', 'Verifies that Foo was instantiated', 'Resets the mock'], a: 0, e: 'Stub and verify on the mock object; give the instance to the code being tested.' },
    { t: 'mc', q: 'Which line is CORRECT ts-mockito usage?', o: ['verify(mockedFoo.getBar(3)).called();', 'verify(foo.getBar(3)).called(); // foo = instance(mockedFoo)', 'mockedFoo.verify(getBar(3));', 'expect(mockedFoo.getBar).toHaveBeenCalled(3);'], a: 0, e: 'verify takes a call on the MOCK (not the instance).' },
    { t: 'tf', q: 'By default, a spy\'s methods delegate to the wrapped real object\'s methods.', a: true, e: 'That\'s what distinguishes a spy from a mock.' },
    { t: 'mc', q: 'What does this print?', c: `const foo = new Foo();
const spiedFoo = spy(foo);
when(spiedFoo.getBar(3)).thenReturn("one");
console.log(foo.getBar(3));
console.log(foo.getBaz());`, o: ['"one", then the result of the real getBaz()', 'null, null', '"one", null', 'The real getBar(3), then "one"'], a: 0, e: 'getBar(3) is stubbed on the spy; getBaz is not, so it calls the real method.' },
    { t: 'mc', q: 'Which verifies that `getBar(2)` was called exactly two times?', o: ['verify(mockedFoo.getBar(2)).twice();', 'verify(mockedFoo.getBar(2)).times(1);', 'when(mockedFoo.getBar(2)).twice();', 'verify(mockedFoo.getBar(2)).atMost(1);'], a: 0, e: '.twice() == .times(2).' },
    { t: 'code', q: 'Write a test (Jest + ts-mockito) for `LoginPresenter.login(alias, pw)`, which calls `userService.login(alias, pw)` (returns Promise<User>) and then `view.navigateToHome(user)`. Mock both the service and the view; stub login to resolve a user; verify navigateToHome was called with that user.', k: ['mock<UserService>() / mock<LoginView>() (or mock(Class))', 'when(mockService.login("a", "pw")).thenResolve(user)', 'Presenter constructed with instance(mockView) and instance(mockService)', 'await presenter.login("a", "pw")', 'verify(mockView.navigateToHome(user)).once() (or deepEqual)'], mc: `import { mock, instance, when, verify, anything } from "@typestrong/ts-mockito";

describe("LoginPresenter", () => {
  let mockView: LoginView;
  let mockService: UserService;
  let presenter: LoginPresenter;
  const user = new User("Audrey", "B", "@audrey", "img.png");

  beforeEach(() => {
    mockView = mock<LoginView>();
    mockService = mock<UserService>();
    presenter = new LoginPresenter(instance(mockView), instance(mockService));
  });

  test("navigates home after successful login", async () => {
    when(mockService.login("@audrey", "pw")).thenResolve(user);

    await presenter.login("@audrey", "pw");

    verify(mockService.login("@audrey", "pw")).once();
    verify(mockView.navigateToHome(user)).once();
    verify(mockView.displayErrorMessage(anything())).never();
  });
});` },
    { t: 'mc', q: 'How do you make a mocked async method return a rejected Promise?', o: ['when(mock.fetchData("b")).thenReject(new Error("b does not exist"))', 'when(mock.fetchData("b")).thenThrow()', 'verify(mock.fetchData("b")).rejected()', 'mock.fetchData.reject()'], a: 0, e: 'thenResolve and thenReject are for Promises. thenThrow throws synchronously.' },
    { t: 'mc', q: 'What is the difference between `resetCalls(mock)` and `reset(mock)`?', o: ['resetCalls clears call counts but keeps stubs; reset clears call counts AND removes stubs', 'They are identical', 'reset keeps stubs; resetCalls removes stubs', 'resetCalls deletes the mock'], a: 0, e: 'After reset, foo.getBar(1) returns null again.' },
    { t: 'mc', q: 'What does this print?', c: `when(mockedFoo.getBar(anyNumber())).thenReturn("one", "two", "three");
const foo = instance(mockedFoo);
console.log(foo.getBar(1), foo.getBar(1), foo.getBar(1), foo.getBar(1));`, o: ['one two three three', 'one two three null', 'one one one one', 'three three three three'], a: 0, e: 'The last defined behavior repeats forever.' },
    { t: 'mc', q: 'How do you retrieve the arguments of the most recent call to `sumTwoNumbers` on a mock?', o: ['const [a, b] = capture(mockedFoo.sumTwoNumbers).last();', 'verify(mockedFoo.sumTwoNumbers).args()', 'mockedFoo.sumTwoNumbers.lastArgs', 'when(mockedFoo.sumTwoNumbers).capture()'], a: 0, e: 'capture(method).last() / .first() / .byCallIndex(n).' },
    { t: 'tf', q: 'ts-mockito can mock interfaces using `mock<FooInterface>()`, as well as abstract classes and generic classes.', a: true, e: 'Interfaces have no runtime existence, so you use the generic form mock<I>().' },
    { t: 'mc', q: 'Which ts-mockito call replaces a method\'s implementation with custom logic?', o: ['when(mock.method(anyNumber(), anyNumber())).thenCall((a, b) => a * b)', 'when(mock.method()).thenReturn(fn)', 'spy(mock).replace()', 'verify(mock.method()).thenCall()'], a: 0, e: 'thenCall runs your function with the actual arguments.' },
    { t: 'mc', q: 'Which verification checks call ORDER between two mocks?', o: ['verify(mockedFoo.getBar(1)).calledBefore(mockedBar.getFoo(2))', 'verify(mockedFoo.getBar(1)).once().then(mockedBar)', 'when(mockedFoo.getBar(1)).before(mockedBar.getFoo(2))', 'expect(order).toBe([foo, bar])'], a: 0, e: 'calledBefore / calledAfter.' },
    { t: 'tf', q: 'You should call `when(...)` AFTER the code under test runs, to check its results.', a: false, e: 'when stubs behavior BEFORE execution. verify checks afterwards.' },
    { t: 'mc', q: 'When is a SPY a better choice than a MOCK?', o: ['When you want the real object\'s behavior but need to verify some calls or override one method (e.g., a presenter method you want to stub while testing another)', 'When the real object talks to a slow database', 'When the class doesn\'t exist yet', 'Never'], a: 0, e: 'Tweeter tests often spy on the presenter itself to stub a factory method while keeping the real logic.' },
    { t: 'code', q: 'Write a test that verifies `PostStatusPresenter.submitPost()` displays an error message when `statusService.postStatus` rejects. Use mocks for the view and service.', k: ['Stub postStatus to reject: when(mockService.postStatus(anything(), anything())).thenReject(new Error("boom"))', 'Call await presenter.submitPost(...)', 'verify(mockView.displayErrorMessage(...)).once() — optionally capture the message and check it contains "boom"', 'Optionally verify success message never displayed'], mc: `test("displays error when posting fails", async () => {
  const mockView = mock<PostStatusView>();
  const mockService = mock<StatusService>();
  const presenter = new PostStatusPresenter(instance(mockView), instance(mockService));

  when(mockService.postStatus(anything(), anything()))
    .thenReject(new Error("boom"));

  await presenter.submitPost("hello", currentUser, authToken);

  verify(mockView.displayErrorMessage(anything())).once();
  const [msg] = capture(mockView.displayErrorMessage).last();
  expect(msg).toContain("boom");
  verify(mockView.displayInfoMessage("Status posted!", anything())).never();
});` },
    { t: 'tf', q: 'Depending on abstractions (interfaces) in production code makes it much easier to substitute mocks in tests.', a: true, e: 'This ties Commandment 7 to Commandment 9 (write testable code).' },
    { t: 'mc', q: 'According to the Wikipedia "Mock object" article, which is a typical reason to use a mock object?', o: ['The real object is slow, nondeterministic, hard to set up in certain states, or doesn\'t exist yet', 'The real object is too simple', 'To increase code coverage numbers artificially', 'To avoid writing assertions'], a: 0, e: 'E.g., the current time or temperature, network errors, a database that takes too long.' },
    { t: 'mc', q: 'Which matcher would you use to match ANY argument in a stub or verification?', o: ['anything()', 'any', '_', '*'], a: 0, e: 'Also anyNumber(), anyString(), between(), deepEqual().' },
    { t: 'tf', q: 'A ts-mockito mock\'s properties can be stubbed with `when(mockedFoo.sampleGetter).thenReturn("three")`.', a: true, e: 'Stubbing property values / getters is supported.' },
    { t: 'mc', q: 'Your test passes `user` to the presenter, but the presenter calls the service with a new object equal to user. `verify(mockService.load(user)).once()` fails. Why, and what fixes it?', o: ['ts-mockito compares object args by reference; use deepEqual(user)', 'verify only works on primitives', 'You must call when() first', 'The mock must be reset'], a: 0, e: 'deepEqual compares structurally.' },
  ],
});
