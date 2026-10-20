/* Mixed practice: identify which principle code violates, why, and how to fix it. */

BANK.topic({
  id: 'violations',
  group: 'principles',
  title: 'Spot the violation (mixed)',
  notes: `
<p>Mixed practice like the in-class design principles exercise: read the code, <strong>name the principle it violates</strong>, explain <strong>why</strong>, and say (or write) <strong>how to fix it</strong>.</p>
<h4>A quick checklist when reading code</h4>
<ul>
  <li>Speculative parameters, layers or options with no current use → <strong>Simplicity</strong></li>
  <li>The same or nearly the same code in several places → <strong>Avoid duplication</strong></li>
  <li>One class or method doing several unrelated jobs → <strong>SRP</strong> (and <strong>Decomposition</strong> if it's long or complex)</li>
  <li><code>a.getB().getC().getD()</code> chains, shared globals → <strong>Minimize dependencies</strong></li>
  <li><code>string</code>/<code>number</code> standing in for email, money, phone…; names like <code>doStuff</code> or <code>data</code> → <strong>High-quality abstraction</strong></li>
  <li>Public fields, names that reveal the algorithm (<code>bubbleSortUsers</code>), returning internal arrays → <strong>Information hiding</strong></li>
  <li>Concrete parameter types (<code>ArrayList</code>), <code>new</code> or static calls to collaborators → <strong>Depend on abstractions</strong></li>
  <li>A design choice (DB, format, URL, library) spread across many files → <strong>Isolated change</strong></li>
  <li>Empty catch, ignored return codes → <strong>Error handling</strong></li>
  <li>Nested loops or linear search over big data → <strong>Algorithm/data structure selection</strong></li>
  <li>A <code>switch</code> on type that must be edited for each new case → <strong>Open-Closed</strong></li>
</ul>
<p>Most real code violates more than one. On the exam, name the most obvious one first, then mention others.</p>`,
  questions: [
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class UserService {
  getUser(id: string) {
    try {
      return db.get(id);
    } catch (e) {}
  }
}`, o: ['Error handling', 'Simplicity', 'Algorithm selection', 'Open-Closed'], a: 0, e: 'The empty catch silently ignores the error. Fix: log it, rethrow it, or recover with a documented fallback.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `function sendWelcome(u: User) {
  const city = u.getAccount().getProfile().getAddress().getCity();
  mailer.send(u.email, "Welcome from " + city);
}`, o: ['Minimize dependencies', 'Error handling', 'YAGNI', 'Template Method'], a: 0, e: 'Chaining couples sendWelcome to Account, Profile and Address. Fix: pass the city in, or add u.getCity() that delegates.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `function totalLength(words: LinkedList<string>): number {
  let n = 0;
  for (const w of words) n += w.length;
  return n;
}`, o: ['Depend on abstractions', 'Decomposition', 'Information hiding', 'Error handling'], a: 0, e: 'It only iterates, so it should accept Iterable<string> (or string[]), not a concrete LinkedList.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class Order {
  public items: Item[] = [];
  public total: number = 0;
}
// elsewhere
order.items.push(item);
order.total += item.price;   // forgot in 3 other places...`, o: ['Information hiding (data hiding)', 'Algorithm selection', 'Simplicity', 'Template Method'], a: 0, e: 'Public fields let clients corrupt the data (total out of sync). Fix: private fields plus an addItem(item) method that keeps the total consistent.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `function price(p: Product): number {
  if (p.type === "book") return p.base * 0.9;
  else if (p.type === "food") return p.base * 1.0;
  else if (p.type === "electronics") return p.base * 1.15;
  // every new product type: add another branch here
}`, o: ['Open-Closed Principle', 'Error handling', 'Information hiding', 'Isolated change'], a: 0, e: 'New types require modifying price(). Fix: polymorphism (each product type implements price()) or a strategy map.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `function createAccount(email: string, phone: string, zip: string,
                       currencyCode: string, balanceCents: number) {
  if (!email.includes("@")) throw new Error();
  if (!/^\\d{5}$/.test(zip)) throw new Error();
  // ... same checks repeated in updateAccount, importAccount ...
}`, o: ['High-quality abstraction (primitive obsession)', 'Algorithm selection', 'Simplicity', 'Template Method'], a: 0, e: 'Email, Phone, ZipCode and Money should be classes that validate themselves (domain checking). That also removes the duplicated checks.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `// in 14 different files:
const res = await fetch("https://abc123.execute-api.us-west-2.amazonaws.com/prod/user/" + id);`, o: ['Isolated change (and DRY)', 'Error handling', 'SRP', 'Template Method'], a: 0, e: 'The API URL, and the choice of fetch, is scattered everywhere. Fix: one ServerFacade/ClientCommunicator that owns the base URL and HTTP calls.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `function findUser(users: User[], alias: string): User | undefined {
  // called 50,000 times per request with ~1,000,000 users
  for (const u of users) if (u.alias === alias) return u;
}`, o: ['Algorithm / data structure selection', 'Error handling', 'Information hiding', 'Open-Closed'], a: 0, e: 'Repeated linear search over a huge list. Fix: build a Map<string, User> once for O(1) lookups.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class ReportGenerator {
  generate(data: Row[], format: string, locale?: string,
           theme?: string, pluginHooks?: Plugin[],
           futureAiOptions?: unknown): string {
    // only format="csv" is used anywhere; other params ignored
  }
}`, o: ['Simplicity (YAGNI)', 'Information hiding', 'Algorithm selection', 'Error handling'], a: 0, e: 'Speculative parameters for features that don\'t exist. Fix: remove them, and add them back when there\'s a real need.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class StatusPresenter {
  async post(text: string) {
    const service = new StatusService();     // concrete
    const now = TimeUtil.now();              // static
    await service.postStatus(text, now);
  }
}`, o: ['Depend on abstractions (and testability)', 'Simplicity', 'Error handling', 'Algorithm selection'], a: 0, e: 'new and static calls are concrete dependencies that tests can\'t replace. Fix: inject a StatusService interface and a Clock.' },
    { t: 'sa', q: 'Identify the principle violated, explain why, and describe the fix.', c: `class Tweet {
  text: string; author: string;
  constructor(text: string, author: string) { this.text = text; this.author = author; }
  render(): string { return "<p>" + this.author + ": " + this.text + "</p>"; }
  save(): void { dynamo.putItem({ TableName: "tweets", Item: { /* ... */ } }); }
  sendPushNotifications(): void { /* call FCM for every follower */ }
}`, k: ['Single Responsibility Principle violated (low cohesion)', 'Why: data model, UI rendering, persistence, and notifications are different reasons to change', 'Fix: Tweet holds data; separate TweetView/renderer, TweetDAO/repository, NotificationService', 'Bonus: also Isolated Change (DB code inside a model class)'], m: 'It violates SRP. Tweet has at least four reasons to change: its data, its HTML rendering, its persistence (DynamoDB) and its notification delivery. Fix: keep Tweet as a data/domain class and move rendering to a view component, saving to a TweetDAO, and notifications to a NotificationService. Putting DynamoDB calls in a model class also violates Isolated Change and Depend on Abstractions.' },
    { t: 'sa', q: 'Identify the principle(s) violated and how to fix them.', c: `class FollowersPresenter {
  async loadMore() {
    try {
      const [items, more] = await this.service.loadMoreFollowers(this.user, 10, this.last);
      this.hasMore = more; this.last = items[items.length - 1];
      this.view.addItems(items);
    } catch (e) {
      this.view.displayError("Failed to load followers: " + e);
    }
  }
}
class FolloweesPresenter {
  async loadMore() {
    try {
      const [items, more] = await this.service.loadMoreFollowees(this.user, 10, this.last);
      this.hasMore = more; this.last = items[items.length - 1];
      this.view.addItems(items);
    } catch (e) {
      this.view.displayError("Failed to load followees: " + e);
    }
  }
}`, k: ['Avoid code duplication (DRY) violated', 'Algorithms are similar, not identical (differ in service call + description)', 'Fix: Template Method — abstract PagedItemPresenter with template loadMore() and abstract getMoreItems() and getItemDescription()', 'Subclasses implement only the varying steps'], m: 'It violates Avoid Code Duplication: the two methods are nearly identical and differ only in which service method they call and the description text. Fix with Template Method: an abstract PagedItemPresenter whose loadMore() holds the shared logic (paging state, addItems, error handling) and calls protected abstract getMoreItems(user, pageSize, last) and getItemDescription(). FollowersPresenter and FolloweesPresenter extend it and implement just those two steps.' },
    { t: 'code', q: 'Fix the violation(s) in this code.', c: `function avg(nums: number[]): number {
  let total = 0;
  for (let i = 0; i < nums.length; i++) total += nums[i];
  return total / nums.length;   // nums may be empty
}

try {
  const a = avg(scores);
  show(a);
} catch {}`, k: ['Error handling: empty array gives NaN silently; the caller\'s empty catch hides errors', 'Throw a descriptive error (or document return) when nums is empty', 'Caller handles the error (display/log), no empty catch'], mc: `/** @throws Error if nums is empty */
function average(nums: readonly number[]): number {
  if (nums.length === 0) {
    throw new Error("Cannot average an empty list");
  }
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

try {
  show(average(scores));
} catch (e) {
  console.error(e);
  showMessage("No scores yet");
}` },
    { t: 'code', q: 'This class violates several principles (name them in a comment), then refactor it.', c: `class Stuff {
  public list: any[] = [];
  doIt(x: any) {
    if (x.t == 1) { /* save to MySQL */ }
    else if (x.t == 2) { /* email user */ }
    else if (x.t == 3) { /* render HTML */ }
  }
}`, k: ['Names violations: poor naming/abstraction (Stuff, doIt, x, t), SRP (one method does 3 jobs), info hiding (public list), OCP (type switch), primitive obsession/any', 'Refactor into well-named classes each with one responsibility', 'Use an interface/polymorphism instead of a type code switch', 'Private state'], mc: `// Violations: poor names / abstraction (Stuff, doIt, any, t),
// SRP (persistence + email + rendering), info hiding (public list),
// OCP (type-code switch), primitive obsession (t == 1/2/3).

interface Task {
  run(): Promise<void>;
}

class SaveUserTask implements Task {
  constructor(private repo: UserRepository, private user: User) {}
  async run() { await this.repo.save(this.user); }
}

class WelcomeEmailTask implements Task {
  constructor(private mailer: Mailer, private user: User) {}
  async run() { await this.mailer.sendWelcome(this.user.email); }
}

class TaskQueue {
  private tasks: Task[] = [];
  add(task: Task) { this.tasks.push(task); }
  async runAll() { for (const t of this.tasks) await t.run(); }
}` },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class Matrix {
  // 2,400 lines, 61 methods, 33 fields:
  // parsing, math, rendering, file I/O, undo/redo, networking...
}`, o: ['Decomposition (hypo-decomposition) / SRP', 'Hyper-decomposition', 'Algorithm selection', 'Error handling'], a: 0, e: 'Size metrics (2,400 lines, 61 methods, 33 fields) and multiple responsibilities. Split it into focused classes.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class CreditCardNumber {
  private digits: Digit[];   // class Digit { value: 0|1|...|9 }
  constructor(raw: string) { this.digits = [...raw].map(c => new Digit(c)); }
}`, o: ['Hyper-decomposition (decomposed too far)', 'Hypo-decomposition', 'Information hiding', 'Error handling'], a: 0, e: 'The paper\'s example. A validated string is enough inside CreditCardNumber.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `class Inventory {
  bubbleSortProductsByPrice(): Product[] { /* ... */ }
  linearSearchBySku(sku: string): Product | undefined { /* ... */ }
}`, o: ['Information hiding (naming reveals implementation)', 'Open-Closed', 'Error handling', 'YAGNI'], a: 0, e: 'Names should say what, not how: sortByPrice(), findBySku(). (Bubble sort may also be a poor algorithm choice.)' },
    { t: 'sa', q: 'Identify the principle violated, why it matters, and the fix.', c: `let currentUser: User | null = null;     // global
let authToken = "";                       // global

class FeedPresenter { load() { api.feed(currentUser!.alias, authToken); } }
class PostPresenter { post(t: string) { api.post(currentUser!.alias, t, authToken); } }
class LogoutPresenter { logout() { currentUser = null; authToken = ""; } }`, k: ['Minimize dependencies — classes coupled through shared global mutable data (hidden dependency)', 'Why: hard to see/understand, changes in one ripple to others, hard to test/reuse; reduces orthogonality', 'Fix: encapsulate in a UserInfo/session object (or context) passed/injected explicitly with clear methods'], m: 'It violates Minimize Dependencies: the presenters are coupled through shared global mutable variables, which is a hidden, indirect form of dependency. The coupling is invisible in the class interfaces, any presenter can break the others by changing the globals, and the classes are hard to test in isolation. Fix: wrap the session in a UserInfo/Session class with explicit methods (getCurrentUser(), getToken(), clear()) and inject it into each presenter through its constructor, so the dependency is explicit and can be mocked.' },
    { t: 'mc', q: 'Which principle does this code MOST clearly violate?', c: `function f(a: number[], b: number) {
  let r = 0;
  for (const x of a) if (x > b) r++;
  return r;
}`, o: ['High-quality abstraction (good naming)', 'Algorithm selection', 'Open-Closed', 'Error handling'], a: 0, e: 'f, a, b, r and x say nothing. Better: countGreaterThan(values, threshold).' },
    { t: 'mc', q: 'A change to how prices are rounded required editing 23 files. Which principle was violated?', o: ['Isolated change (avoid shotgun surgery)', 'Simplicity', 'Depend on abstractions only', 'Error handling'], a: 0, e: 'The rounding choice should live in one place (e.g., a Money class).' },
    { t: 'code', q: 'Rewrite this to follow Depend on Abstractions and make it testable.', c: `class WeatherWidget {
  async show() {
    const res = await fetch("https://api.weather.example/today");
    const data = await res.json();
    document.getElementById("w")!.innerText = data.temp + "°";
  }
}`, k: ['WeatherService interface (getTodayTemp)', 'View/Display interface for output (or presenter + view split)', 'Dependencies injected via constructor', 'Concrete HttpWeatherService implements the interface; tests can pass mocks'], mc: `interface WeatherService {
  getTodayTemp(): Promise<number>;
}

interface WeatherView {
  showTemp(text: string): void;
}

class HttpWeatherService implements WeatherService {
  async getTodayTemp() {
    const res = await fetch("https://api.weather.example/today");
    if (!res.ok) throw new Error("Weather request failed: " + res.status);
    return (await res.json()).temp as number;
  }
}

class WeatherPresenter {
  constructor(private service: WeatherService, private view: WeatherView) {}
  async show() {
    const t = await this.service.getTodayTemp();
    this.view.showTemp(t + "°");
  }
}` },
    { t: 'tf', q: 'This code violates the Open-Closed Principle.', c: `abstract class Notifier { abstract send(to: string, msg: string): void; }
class EmailNotifier extends Notifier { send(to: string, msg: string) { /* SES */ } }
class SmsNotifier extends Notifier { send(to: string, msg: string) { /* SNS */ } }
function alertAll(users: User[], n: Notifier) { users.forEach(u => n.send(u.contact, "Alert")); }`, a: false, e: 'This follows OCP: new channels are added as new Notifier subclasses without modifying alertAll.' },
    { t: 'tf', q: 'This code follows the Information Hiding principle well.', c: `class Playlist {
  private songs: Song[] = [];
  add(s: Song) { this.songs.push(s); }
  getSongs(): Song[] { return this.songs; }
}`, a: false, e: 'getSongs returns the internal array itself, so callers can mutate it. Return a copy or a readonly array.' },
    { t: 'sa', q: 'Two of the course\'s principles are violated here. Name both and explain the fix.', c: `async function handler(event: any) {
  // parse
  const body = JSON.parse(event.body);
  // validate
  if (!body.to || !body.subject) return;          // just stop
  // build email + send via SES SDK
  const ses = new SESClient({ region: "us-west-2" });
  await ses.send(new SendEmailCommand({ /* 40 lines of params */ }));
  // write audit log to DynamoDB
  // ... 30 more lines ...
}`, k: ['Error handling: invalid input silently returns instead of reporting an error (should throw e.g. "[Bad Request] ..." for API Gateway to map to 400)', 'SRP/Decomposition: one long handler parses, validates, sends email, and logs to DynamoDB', 'Also acceptable: Depend on abstractions/Isolated change — SES client created inline', 'Fix: handler delegates to validate(), EmailService (behind interface), AuditDAO; throw descriptive errors'], m: '(1) Error handling: when the input is invalid the handler just returns, so the caller gets no indication. It should throw a descriptive error like "[Bad Request] missing to/subject" that API Gateway can map to a 400. (2) SRP / decomposition: one long function parses, validates, builds and sends the email, and writes an audit log. Fix: a short handler that calls parseRequest(), validate(), an injected EmailService (which wraps SES, isolating that choice) and an AuditDAO.' },
    { t: 'mc', q: 'Which principle is MOST supported by moving all DynamoDB code in Tweeter into DAO classes behind interfaces?', o: ['Isolated change (plus info hiding and depend on abstractions)', 'Simplicity only', 'Algorithm selection', 'Template Method'], a: 0, e: 'Switching databases would affect only the DAO implementations.' },
  ],
});
