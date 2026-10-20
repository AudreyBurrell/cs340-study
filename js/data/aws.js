/* AWS: cloud computing + console/CLI/SDK, Lambda & IAM, API Gateway, HTTP/CORS/client access */

BANK.topic({
  id: 'aws-cloud',
  group: 'aws',
  title: 'Cloud computing & AWS console/CLI/SDK',
  notes: `
<p><strong>Cloud computing</strong> means renting someone else's IT infrastructure instead of buying and maintaining your own. AWS describes it as the <em>on-demand delivery of IT resources over the Internet with pay-as-you-go pricing</em>. Benefits include agility, elasticity (scale up and down as needed), cost savings (pay for what you use, with no upfront hardware) and global deployment in minutes.</p>
<h4>Service models (lecture notes)</h4>
<ul>
  <li><strong>IaaS (Infrastructure as a Service):</strong> rent VMs, network, storage and databases. You configure and manage everything yourself, including installing software. It's easy to add or remove capacity.</li>
  <li><strong>PaaS (Platform as a Service):</strong> deploy and scale apps without managing the infrastructure. For example, give the provider your Git repo and it deploys, configures and manages the app.</li>
  <li><strong>Serverless:</strong> goes further. You don't write a "server" program at all. You give the provider your <em>handlers</em> (e.g. Lambda functions) and it runs them whenever a client calls your Web API. A <em>serverless database</em> exposes Web APIs for CRUD, with no database server for you to manage. (There are still servers, you just never see them.)</li>
  <li>(AWS also lists <strong>SaaS</strong>: complete applications run by the provider, like email.)</li>
</ul>
<h4>Three ways to access cloud services</h4>
<ol>
  <li><strong>Web Console:</strong> a browser UI for managing resources.</li>
  <li><strong>CLI:</strong> install it on your computer to do anything the console can, and <strong>automate</strong> tasks.</li>
  <li><strong>SDKs:</strong> language libraries for writing programs that configure, manage and interact with resources (e.g. AWS SDK for JavaScript v3).</li>
</ol>
<h4>AWS services in CS 340</h4>
<p><strong>S3</strong> for file storage, <strong>Lambda</strong> for serverless Web API handlers, <strong>API Gateway</strong> to invoke Lambdas on web requests, <strong>DynamoDB</strong> for a serverless database, and <strong>SQS</strong> for asynchronous processing.</p>
<h4>The CLI exercise</h4>
<pre class="code">aws configure                     # Access Key ID, Secret Access Key,
                                  # default region (us-west-2), output format (json)
aws s3 mb s3://my-unique-bucket   # make bucket (names are globally unique)
aws s3 cp hello.txt s3://my-unique-bucket/
aws s3 ls s3://my-unique-bucket</pre>
<ul>
  <li><code>aws configure</code> stores credentials in <code>~/.aws/credentials</code> and settings in <code>~/.aws/config</code>.</li>
  <li>Use an <strong>IAM user</strong> (or IAM Identity Center) with access keys, not the root account, for day-to-day work. Never commit access keys to Git.</li>
  <li>S3 stores <em>objects</em> (files plus metadata) in <em>buckets</em>, identified by a <em>key</em>.</li>
  <li>SDK v3 style: <code>const client = new S3Client({ region }); await client.send(new PutObjectCommand({ Bucket, Key, Body }));</code></li>
</ul>`,
  questions: [
    { t: 'mc', q: 'Which is the best definition of cloud computing?', o: ['Renting someone else\'s IT infrastructure (on demand, pay-as-you-go) instead of buying and maintaining your own', 'Storing files only on your laptop', 'A type of database', 'Writing code in a browser'], a: 0, e: 'From the lecture notes and AWS\'s "What is cloud computing?" page.' },
    { t: 'mc', q: 'In which model do you rent virtual machines, networks, and storage but configure and manage everything (including installing software) yourself?', o: ['IaaS', 'PaaS', 'Serverless', 'SaaS'], a: 0, e: 'Infrastructure as a Service.' },
    { t: 'mc', q: 'In which model do you give the provider access to your Git repository and it deploys, configures, and manages the application for you?', o: ['PaaS', 'IaaS', 'On-premises', 'Colocation'], a: 0, e: 'PaaS hides the servers from developers.' },
    { t: 'sa', q: 'Explain serverless computing using the CS 240 Chess server as a comparison.', k: ['In CS 240 you wrote a server program with HTTP handlers and ran it on a machine', 'Serverless: you give the cloud provider just your handler code (+ supporting code)', 'Provider runs the handlers whenever clients call the Web API — no server program or machine to manage', 'Servers still exist; you just never see/manage them'], m: 'In CS 240 you wrote a Chess "server" program, a set of HTTP handlers implementing a Web API plus the code behind them, and you had to run it on some machine. With serverless computing you don\'t write or run a server program at all. You give the cloud provider your handlers and their supporting code (e.g. Lambda functions), and it makes sure they run whenever a client calls your Web API, through API Gateway. There are still servers, but you never see or manage them.' },
    { t: 'sa', q: 'Name the three ways to access cloud computing services like AWS and give one advantage of each.', k: ['Web Console — browser UI, easy/visual for manual management', 'CLI — install locally, can do anything the console can; enables scripting/automation', 'SDKs — use from programs in various languages to configure, manage, interact with resources'], m: '(1) Web Console: a browser interface that is easy and visual for exploring and managing resources by hand. (2) CLI: installed on your own computer and able to do anything the console can, so tasks can be scripted and automated. (3) SDKs: libraries for languages like JavaScript/TypeScript, so your programs can configure, manage and use cloud resources (e.g. a Lambda calling SES or DynamoDB).' },
    { t: 'tf', q: 'The AWS CLI can do anything that can be done through the AWS Web Console, and it allows automating tasks.', a: true, e: 'From the lecture notes.' },
    { t: 'mc', q: 'Which command sets up your access key, secret key, default region, and output format for the AWS CLI?', o: ['aws configure', 'aws login', 'aws init', 'aws setup-keys'], a: 0, e: 'It prompts for AWS Access Key ID, AWS Secret Access Key, Default region name and Default output format.' },
    { t: 'mc', q: 'Which CLI command creates an S3 bucket named my-bucket-123?', o: ['aws s3 mb s3://my-bucket-123', 'aws s3 create my-bucket-123', 'aws s3 cp s3://my-bucket-123', 'aws bucket new my-bucket-123'], a: 0, e: 'mb = "make bucket".' },
    { t: 'mc', q: 'Which CLI command copies the local file notes.txt into the bucket my-bucket-123?', o: ['aws s3 cp notes.txt s3://my-bucket-123/', 'aws s3 mb notes.txt s3://my-bucket-123', 'aws s3 put notes.txt my-bucket-123', 'aws cp s3 notes.txt'], a: 0, e: 'aws s3 cp <source> <destination>.' },
    { t: 'tf', q: 'S3 bucket names must be globally unique across all AWS accounts.', a: true, e: 'Bucket names share a global namespace, which is why the exercise asked for a unique name.' },
    { t: 'mc', q: 'Which AWS service does CS 340 use for file storage?', o: ['S3', 'SQS', 'Lambda', 'API Gateway'], a: 0, e: 'S3 = Simple Storage Service.' },
    { t: 'mc', q: 'Which AWS service does CS 340 use for asynchronous server processing?', o: ['SQS', 'S3', 'DynamoDB', 'IAM'], a: 0, e: 'SQS = Simple Queue Service.' },
    { t: 'mc', q: 'Which AWS service provides serverless database persistence in CS 340?', o: ['DynamoDB', 'S3', 'SQS', 'Lambda'], a: 0, e: 'DynamoDB is a serverless NoSQL database.' },
    { t: 'tf', q: 'A "serverless database" requires you to set up and manage a database server machine.', a: false, e: 'It exposes Web APIs for CRUD. It runs on machines you never see or manage.' },
    { t: 'tf', q: 'For security, you should use the AWS root account credentials for everyday CLI work.', a: false, e: 'Create an IAM user (or use IAM Identity Center) with only the permissions you need. Protect the root account.' },
    { t: 'mc', q: 'Where does `aws configure` store your access keys by default?', o: ['~/.aws/credentials', 'In the S3 bucket', 'In package.json', 'In the Lambda function'], a: 0, e: 'Region and output format go in ~/.aws/config.' },
    { t: 'mc', q: 'Which is a key benefit of cloud computing highlighted by AWS?', o: ['Elasticity: scale resources up or down as demand changes, paying only for what you use', 'You must buy hardware upfront', 'Capacity is fixed for 3 years', 'No internet connection is needed'], a: 0, e: 'Agility, elasticity, cost savings, global deployment in minutes.' },
    { t: 'code', q: 'Write TypeScript using AWS SDK v3 to upload the string "hello" to bucket "my-bucket" with key "greeting.txt".', k: ['import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"', 'const client = new S3Client({ region: "us-west-2" })', 'await client.send(new PutObjectCommand({ Bucket, Key, Body }))'], mc: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-west-2" });

export async function uploadGreeting(): Promise<void> {
  await client.send(
    new PutObjectCommand({
      Bucket: "my-bucket",
      Key: "greeting.txt",
      Body: "hello",
      ContentType: "text/plain",
    })
  );
}` },
    { t: 'tf', q: 'In S3, files are stored as objects inside buckets, and each object is identified by a key.', a: true, e: 'The key is like a file path.' },
    { t: 'mc', q: 'Which command lists the contents of an S3 bucket?', o: ['aws s3 ls s3://my-bucket', 'aws s3 mb s3://my-bucket', 'aws s3 rm s3://my-bucket', 'aws configure list s3'], a: 0, e: 'ls lists buckets or objects.' },
    { t: 'sa', q: 'Why might a team prefer the CLI or SDK over the Web Console for managing cloud resources?', k: ['Automation/scripting — repeatable, no manual clicking', 'Can be version-controlled / reproduced across environments', 'SDK lets the application itself create/use resources programmatically', 'Fewer manual mistakes; faster for bulk tasks'], m: 'The CLI and SDK make work repeatable and automatable: scripts can create buckets, deploy Lambdas or update APIs the same way every time, be kept in version control, and run in CI. That\'s faster and less error-prone than clicking through the console. The SDK also lets the application itself work with resources at run time, e.g. a Lambda writing to DynamoDB.' },
    { t: 'tf', q: 'Software architecture is heavily influenced by technology, which is why CS 340 introduces cloud technologies.', a: true, e: 'Opening line of the cloud lecture notes.' },
    { t: 'mc', q: 'Which pairing of AWS service to CS 340 role is CORRECT?', o: ['Lambda → serverless Web API handlers; API Gateway → invokes Lambdas on Web API requests', 'S3 → message queue; SQS → file storage', 'DynamoDB → HTTP routing', 'IAM → file storage'], a: 0, e: 'Lambda runs handlers; API Gateway maps HTTP requests to them.' },
    { t: 'tf', q: 'Access keys should never be committed to a public GitHub repository.', a: true, e: 'Leaked keys are quickly found and abused by bots.' },
    { t: 'mc', q: 'With pay-as-you-go cloud pricing, you primarily pay for…', o: ['The resources you actually use', 'A fixed amount regardless of usage', 'Only the hardware you buy upfront', 'Nothing, ever'], a: 0, e: 'You pay for what you use, though watch the free tier limits.' },
  ],
});

BANK.topic({
  id: 'lambda-iam',
  group: 'aws',
  title: 'Lambda & IAM',
  notes: `
<p><strong>AWS Lambda</strong> is a compute service that runs your code <em>without provisioning or managing servers</em>. It's event-driven: code runs in response to events such as API Gateway requests, S3 uploads, SQS messages or test events. It scales automatically, and you pay only for the compute time you use (number of requests and duration).</p>
<h4>A TypeScript handler</h4>
<pre class="code">import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-west-2" });

export const handler = async (event: EmailRequest): Promise&lt;EmailResponse&gt; =&gt; {
  console.log("Request:", JSON.stringify(event));   // → CloudWatch Logs
  await ses.send(new SendEmailCommand({
    Source: event.from,
    Destination: { ToAddresses: [event.to] },
    Message: {
      Subject: { Data: event.subject },
      Body: { Text: { Data: event.textBody }, Html: { Data: event.htmlBody } },
    },
  }));
  return { message: "Email sent to " + event.to, timestamp: new Date().toISOString() };
};</pre>
<ul>
  <li>Lambda's Node.js runtime runs <strong>JavaScript</strong>, so you <strong>transpile</strong> TS (<code>tsc</code> or esbuild) and deploy the <code>.js</code>.</li>
  <li><strong>Handler setting</strong> is <code>fileName.exportName</code>, e.g. <code>index.handler</code> or <code>dist/EmailLambda.handler</code>.</li>
  <li><strong>Deployment package:</strong> a .zip of your compiled code, uploaded in the console, through S3, or with <code>aws lambda create-function / update-function-code</code>.</li>
  <li><strong>Lambda layer:</strong> a .zip of shared dependencies. For Node it must contain <code>nodejs/node_modules/…</code>. Attach the layer to functions so each function's zip stays small and dependencies are shared (DRY).</li>
  <li>Defaults: 3 s timeout (max 15 min) and 128 MB memory, both configurable.</li>
</ul>
<h4>IAM execution role</h4>
<ul>
  <li>A Lambda runs with an <strong>IAM role</strong> (its execution role) that grants it permission to call other AWS services.</li>
  <li>Create the role: IAM → Roles → Create role → trusted entity <em>AWS service: Lambda</em> (trust policy principal <code>lambda.amazonaws.com</code>) → attach permission policies → name it.</li>
  <li>Policies: <code>AWSLambdaBasicExecutionRole</code> (write to CloudWatch Logs: <code>logs:CreateLogGroup</code>, <code>CreateLogStream</code>, <code>PutLogEvents</code>) plus whatever the function needs, e.g. <code>ses:SendEmail</code> (AmazonSESFullAccess in the exercise).</li>
  <li><strong>Least privilege:</strong> grant only the permissions that are needed.</li>
  <li>Roles give <em>temporary</em> credentials to whoever assumes them, unlike IAM users with long-term access keys.</li>
</ul>
<h4>Test and debug</h4>
<ul>
  <li><strong>Test event:</strong> in the console's Test tab, create a named JSON event (e.g. <code>{"to": "…", "from": "…", "subject": "…"}</code>) and click Test. You see the result, duration, billed duration, memory used and log output.</li>
  <li><strong>Logs:</strong> <code>console.log</code>/<code>console.error</code> go to <strong>CloudWatch Logs</strong>, log group <code>/aws/lambda/&lt;function-name&gt;</code>, with log streams per execution environment. Open them from the Monitor tab → View CloudWatch logs.</li>
  <li>SES starts in <strong>sandbox</strong> mode: you can only send to and from <em>verified</em> email addresses.</li>
</ul>`,
  questions: [
    { t: 'sa', q: 'What is AWS Lambda?', k: ['Serverless compute service: runs your code (functions) without provisioning/managing servers', 'Event-driven — runs in response to events/triggers (API Gateway request, S3, SQS, test event)', 'Scales automatically; pay only for compute used (requests/duration)'], m: 'AWS Lambda is a serverless compute service that runs your code (a function with a handler) without you provisioning or managing servers. It\'s event-driven, so code runs in response to triggers such as API Gateway requests, S3 uploads or SQS messages. AWS scales it automatically, and you pay only for the requests and compute time you use. In CS 340, Lambdas implement the handlers behind the web API.' },
    { t: 'sa', q: 'Describe how to set up an IAM security role for executing a Lambda function (e.g., one that sends email with SES).', k: ['IAM console → Roles → Create role', 'Trusted entity: AWS service → Lambda (trust policy allows lambda.amazonaws.com to assume role)', 'Attach permission policies: CloudWatch Logs (AWSLambdaBasicExecutionRole) + service permission (e.g., SES send email)', 'Name the role; select it as the Lambda\'s execution role', 'Least privilege'], m: 'In the IAM console go to Roles → Create role. Choose "AWS service" as the trusted entity and Lambda as the use case, which creates a trust policy letting lambda.amazonaws.com assume the role. Attach permission policies: AWSLambdaBasicExecutionRole so it can write CloudWatch logs, plus what the function needs, such as SES send permission (AmazonSESFullAccess in the exercise; ideally just ses:SendEmail). Name the role, then select it as the function\'s execution role when creating or configuring the Lambda. Grant only the needed permissions (least privilege).' },
    { t: 'mc', q: 'How do you write log messages from a Node.js/TypeScript Lambda function?', o: ['console.log / console.error — output goes to CloudWatch Logs', 'Write to a local file in /tmp and read it later', 'alert()', 'Return the logs in the HTTP response only'], a: 0, e: 'Lambda sends stdout/stderr to CloudWatch Logs, provided the role has logs permissions.' },
    { t: 'mc', q: 'Where do you view a Lambda function\'s logs?', o: ['CloudWatch Logs, log group /aws/lambda/<function-name> (via Monitor → View CloudWatch logs)', 'In the S3 console', 'In the IAM console', 'Only in your local terminal'], a: 0, e: 'Each execution environment writes a log stream in the function\'s log group.' },
    { t: 'mc', q: 'What is a "test event" in the Lambda console?', o: ['A JSON payload you define and send to the function to invoke it for testing', 'An automated unit test written in Jest', 'A CloudWatch alarm', 'An IAM permission check'], a: 0, e: 'Create it in the Test tab, then click Test to see the response and logs.' },
    { t: 'tf', q: 'Lambda\'s Node.js runtime executes TypeScript source files directly, so no compile step is needed.', a: false, e: 'You transpile TS to JS (tsc or esbuild) and deploy the JavaScript, which the exercise had you do.' },
    { t: 'mc', q: 'What is a Lambda layer?', o: ['A .zip archive of shared libraries/dependencies (e.g., node_modules) that functions can include without bundling them in each function', 'A security group', 'An API Gateway stage', 'A CloudWatch dashboard'], a: 0, e: 'Layers keep deployment packages small and share dependencies across functions.' },
    { t: 'mc', q: 'For a Node.js Lambda layer, what folder structure must the zip use so the runtime finds modules?', o: ['nodejs/node_modules/...', 'lib/...', 'layer/js/...', 'Any structure works'], a: 0, e: 'Lambda adds /opt/nodejs/node_modules to the module path.' },
    { t: 'mc', q: 'If the Lambda handler is configured as `index.handler`, what does that mean?', o: ['Call the exported function named handler in the file index.js', 'Call the function index in handler.js', 'Use the default handler', 'Run index.ts with ts-node'], a: 0, e: 'Format: file.exportedFunction.' },
    { t: 'tf', q: 'A Lambda function\'s execution role determines which AWS services and resources the function is allowed to access.', a: true, e: 'Without SES permissions, SendEmail fails with an AccessDenied error.' },
    { t: 'mc', q: 'Which managed policy gives a Lambda permission to write logs to CloudWatch?', o: ['AWSLambdaBasicExecutionRole', 'AmazonS3FullAccess', 'AdministratorAccess', 'AmazonAPIGatewayInvokeFullAccess'], a: 0, e: 'It grants logs:CreateLogGroup, logs:CreateLogStream and logs:PutLogEvents.' },
    { t: 'tf', q: 'The principle of least privilege means a role should be granted only the permissions it actually needs.', a: true, e: 'Prefer ses:SendEmail over AdministratorAccess.' },
    { t: 'code', q: 'Write a TypeScript Lambda handler that receives `{ name: string }`, logs the event, and returns `{ greeting: "Hello, <name>" }`. Throw an error with a "[Bad Request]" prefix if name is missing.', k: ['export const handler = async (event: ...) => {...}', 'console.log the event (→ CloudWatch)', 'Validate input; throw new Error("[Bad Request] ...")', 'Return an object { greeting: ... }'], mc: `interface GreetRequest { name?: string }
interface GreetResponse { greeting: string }

export const handler = async (event: GreetRequest): Promise<GreetResponse> => {
  console.log("Received event:", JSON.stringify(event));

  if (!event.name) {
    throw new Error("[Bad Request] name is required");
  }

  return { greeting: "Hello, " + event.name };
};` },
    { t: 'sa', q: 'List the steps of the Lambda/SES exercise, from TypeScript code to a tested function.', k: ['Write the Lambda in TS (uses SES via AWS SDK to send email)', 'Transpile TS → JS', 'Zip dependencies and create a Lambda layer', 'Create an IAM role with needed permissions (SES + logs)', 'Deploy the function using the zip file and IAM role (attach layer)', 'Test with a test event (check CloudWatch logs)'], m: '1) Write a TS Lambda that sends email with SES through the AWS SDK. 2) Transpile the TS to JS. 3) Zip the dependencies (nodejs/node_modules) and create a Lambda layer. 4) Create an IAM role with SES and CloudWatch Logs permissions. 5) Create or deploy the function from the zip, choose the IAM role as its execution role, set the handler, and attach the layer. 6) Test it with a test event and check the result and the CloudWatch logs.' },
    { t: 'mc', q: 'Your Lambda runs but SES returns "Email address is not verified." What is the likely cause?', o: ['SES is in sandbox mode, so both sender and recipient must be verified identities', 'The Lambda timeout is too long', 'CloudWatch is disabled', 'The handler name is wrong'], a: 0, e: 'New SES accounts are sandboxed.' },
    { t: 'tf', q: 'The default timeout for a new Lambda function is 3 seconds, and the maximum is 15 minutes.', a: true, e: 'Increase the timeout for slower work.' },
    { t: 'mc', q: 'With Lambda, how are you billed?', o: ['Per request and for compute duration (scaled by memory)', 'A fixed monthly server fee', 'Per line of code', 'Only for idle time'], a: 0, e: 'You pay nothing when the function isn\'t running (beyond storage etc.).' },
    { t: 'tf', q: 'Lambda automatically scales by running more instances of your function as the number of events increases.', a: true, e: 'Concurrency scales with demand, up to account limits.' },
    { t: 'mc', q: 'Your Lambda produces no logs in CloudWatch at all. Which is the most likely cause?', o: ['Its execution role lacks CloudWatch Logs permissions (e.g., missing AWSLambdaBasicExecutionRole)', 'console.log is not supported in Lambda', 'S3 is down', 'The function returned a value'], a: 0, e: 'Without logs permissions, the function can\'t create its log group or streams.' },
    { t: 'mc', q: 'Which statement about IAM roles vs. IAM users is correct?', o: ['Roles are assumed by services/entities and provide temporary credentials; users typically have long-term credentials like access keys', 'Roles have passwords; users do not', 'Users are only for Lambda', 'They are identical'], a: 0, e: 'Lambda assumes its execution role.' },
    { t: 'code', q: 'Write the TypeScript to send an email with SES (SDK v3) inside a Lambda handler, given an event with `to`, `from`, `subject`, `textBody`.', k: ['import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"', 'Create SESClient with region', 'SendEmailCommand with Source, Destination.ToAddresses, Message.Subject.Data, Message.Body.Text.Data', 'await client.send(command); return a result'], mc: `import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-west-2" });

export const handler = async (event: {
  to: string; from: string; subject: string; textBody: string;
}) => {
  console.log("Sending email to", event.to);

  await ses.send(
    new SendEmailCommand({
      Source: event.from,
      Destination: { ToAddresses: [event.to] },
      Message: {
        Subject: { Data: event.subject },
        Body: { Text: { Data: event.textBody } },
      },
    })
  );

  return { message: "Email sent to " + event.to, timestamp: new Date().toISOString() };
};` },
    { t: 'tf', q: 'Running a test event in the Lambda console shows the execution result plus details such as duration, billed duration, memory used, and log output.', a: true, e: 'Shown in the execution results panel.' },
    { t: 'mc', q: 'Which trusted entity must an execution role\'s trust policy allow?', o: ['lambda.amazonaws.com', 's3.amazonaws.com', 'Your IAM user only', 'apigateway.amazonaws.com only'], a: 0, e: 'Lambda must be allowed to assume (sts:AssumeRole) the role.' },
    { t: 'tf', q: 'Using a Lambda layer for shared node_modules supports the "avoid duplication" principle across multiple functions.', a: true, e: 'One copy of the dependencies is shared by many functions.' },
    { t: 'mc', q: 'Why does the Tweeter server keep Lambda handlers thin and delegate to service classes?', o: ['SRP/testability: handlers adapt events to service calls, while business logic lives in testable, reusable classes', 'Lambda forbids classes', 'To increase billing', 'Handlers can\'t call functions'], a: 0, e: 'Keeps AWS-specific code isolated (Isolated Change).' },
  ],
});

BANK.topic({
  id: 'api-gateway',
  group: 'aws',
  title: 'API Gateway',
  notes: `
<p><strong>AWS API Gateway</strong> is a managed service for creating, publishing, maintaining, monitoring and securing web APIs. In CS 340 each <strong>endpoint</strong> is a <em>resource URL</em> plus an <em>HTTP method</em> (e.g. <code>POST /session</code>) mapped to a <strong>Lambda function</strong> that runs when a client calls it. CORS can be enabled and configured per endpoint.</p>
<h4>Building a web API that invokes Lambdas</h4>
<ol>
  <li><strong>Create a new API</strong> (REST API): API Gateway console → Create API → REST API → name it.</li>
  <li><strong>Create resources</strong> (URL paths), e.g. <code>/sendemail</code>, including path parameters like <code>/sendemail/{to}/{from}</code>.</li>
  <li><strong>Create methods</strong> on resources (GET, POST…) with integration type <strong>Lambda function</strong> and the function chosen.</li>
  <li><strong>Pass the request body:</strong> by default (non-proxy integration) the JSON body is passed to the Lambda as its event.</li>
  <li><strong>Pass URL path parameters and headers:</strong> declare them in the Method Request, then write a <strong>mapping template</strong> (VTL) in the Integration Request, e.g. <code>"to": "$input.params('to')"</code> or <code>"subject": "$input.params('EmailSubject')"</code>.</li>
  <li><strong>Map Lambda output to HTTP responses:</strong> on success the Lambda's returned object becomes the JSON body with 200. For a thrown exception, an <em>Integration Response</em> uses a <strong>Lambda error regex</strong> on the error message (e.g. <code>.*\\[Bad Request\\].*</code>) to choose the status (400), which must also be declared in the <em>Method Response</em>. Add a second regex (e.g. <code>.*\\[Internal Server Error\\].*</code>) for 500. An error that matches no regex falls through to the <em>default</em> integration response, which is 200, so map your errors explicitly.</li>
  <li><strong>Configure CORS:</strong> "Enable CORS" on the resource adds an <code>OPTIONS</code> method (mock integration) returning <code>Access-Control-Allow-Origin/Methods/Headers</code> and adds <code>Access-Control-Allow-Origin</code> to the method responses.</li>
  <li><strong>Deploy the API</strong> to a <strong>stage</strong> (e.g. <code>dev</code>, <code>prod</code>). Invoke URL: <code>https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/{resource}</code>. Changes take effect only after you <em>redeploy</em>.</li>
  <li><strong>Test:</strong> inside AWS with the method's <em>Test</em> button (no deployment needed, and CORS doesn't apply); outside with <strong>curl</strong> or <strong>Postman</strong>.</li>
  <li><strong>Document:</strong> Stage → Export → Swagger / OpenAPI (JSON or YAML).</li>
</ol>
<h4>The two approaches from the Send Email exercise</h4>
<pre class="code"># 1: all inputs in the body
POST /sendemail
{ "to": "bob@uvnets.com", "from": "bob@gmail.com", "subject": "…", "textBody": "…", "htmlBody": "…" }

# 2: inputs in the URL path + headers, assembled by a mapping template
POST /sendemail/bob@uvnets.com/bob@gmail.com
EmailSubject: Important email from Lambda land
EmailText: This is an email from Lambda land

# mapping template (Integration Request, application/json)
{
  "to": "$input.params('to')",
  "from": "$input.params('from')",
  "subject": "$input.params('EmailSubject')",
  "textBody": "$input.params('EmailText')",
  "htmlBody": "$input.params('EmailText')"
}

# test from outside
curl -X POST -H "Content-Type: application/json" \\
  -d '{"to":"a@b.com","from":"c@d.com","subject":"hi","textBody":"hi"}' \\
  https://abc123.execute-api.us-west-2.amazonaws.com/dev/sendemail</pre>
<p><strong>Lambda <em>proxy</em> integration</strong> is the alternative: the whole HTTP request (headers, pathParameters, queryStringParameters, body as a string) is passed in, and the Lambda must return <code>{ statusCode, headers, body: string }</code>.</p>`,
  questions: [
    { t: 'sa', q: 'What is AWS API Gateway, and how is it used with Lambda in CS 340?', k: ['Managed AWS service to create (publish, secure, monitor) web APIs', 'Each endpoint = resource URL + HTTP method', 'Endpoints are mapped to Lambda functions that are invoked when clients call them', 'Builds HTTP responses from the Lambda output/exceptions; can configure CORS'], m: 'API Gateway is a managed AWS service for creating and publishing web APIs. You define resources (URL paths) and HTTP methods on them, and each endpoint is integrated with a Lambda function. When a client sends an HTTP request, API Gateway passes the path, headers and body to the Lambda, runs it, and builds the HTTP response (status code, headers, body) from the Lambda\'s output or exception. It also handles CORS, stages and deployment.' },
    { t: 'mc', q: 'In API Gateway, an API "endpoint" consists of…', o: ['A resource URL and an HTTP method', 'A Lambda layer and an IAM role', 'An S3 bucket and key', 'A stage and a region only'], a: 0, e: 'E.g., resource /session + method POST.' },
    { t: 'mc', q: 'Which parts of an HTTP request can be used to pass parameters to an API Gateway endpoint?', o: ['URL path, headers, and body', 'Only the body', 'Only query strings', 'Only cookies'], a: 0, e: 'From the slides: URL path, headers, body (query strings too).' },
    { t: 'mc', q: 'In the Send Email exercise\'s Approach #2, how is `EmailSubject` passed?', o: ['As an HTTP request header', 'In the JSON body', 'As a path parameter', 'In a cookie'], a: 0, e: '`to` and `from` are path parameters; subject and text are headers. A mapping template builds the Lambda input.' },
    { t: 'mc', q: 'What is a mapping template in API Gateway (non-proxy integration)?', o: ['A template (VTL) in the integration request/response that transforms HTTP request data (path params, headers, body) into the Lambda\'s input JSON, or the output into a response', 'An IAM policy', 'A CloudFormation file', 'A CORS header'], a: 0, e: 'E.g. "to": "$input.params(\'to\')".' },
    { t: 'code', q: 'Write an API Gateway mapping template that builds the Lambda input `{to, from, subject, textBody}` for `POST /sendemail/{to}/{from}` where subject and text come from headers named `EmailSubject` and `EmailText`.', k: ['JSON object with four fields', 'Uses $input.params(\'to\') and $input.params(\'from\') for path params', 'Uses $input.params(\'EmailSubject\') and $input.params(\'EmailText\') for headers', 'Values in quotes (strings)'], mc: `{
  "to": "$input.params('to')",
  "from": "$input.params('from')",
  "subject": "$input.params('EmailSubject')",
  "textBody": "$input.params('EmailText')"
}` },
    { t: 'tf', q: 'After changing methods or resources in API Gateway, you must (re)deploy the API to a stage before external clients see the changes.', a: true, e: 'The deployed stage is a snapshot of the API.' },
    { t: 'mc', q: 'What is the format of an API Gateway REST API invoke URL?', o: ['https://{api-id}.execute-api.{region}.amazonaws.com/{stage}/{resource}', 'https://s3.amazonaws.com/{bucket}', 'https://lambda.{region}.aws/{function}', 'http://localhost:8080/{resource}'], a: 0, e: 'Stage names like dev or prod appear in the path.' },
    { t: 'mc', q: 'In the common case, what HTTP response does API Gateway return when the Lambda succeeds?', o: ['Status 200 with the Lambda\'s output object as JSON in the response body', 'Status 500 with an empty body', 'Status 302 redirect', 'Status 204 always'], a: 0, e: 'From the API Gateway Responses slide.' },
    { t: 'mc', q: 'How does API Gateway (non-proxy) map a Lambda exception to a specific HTTP status code?', o: ['An Integration Response uses a regular expression on the error message (Lambda error regex) to select a status code like 400', 'It always returns 200', 'The browser decides', 'IAM maps it'], a: 0, e: 'E.g., ".*\\[Bad Request\\].*" → 400 and ".*\\[Internal Server Error\\].*" → 500. An error matching no regex uses the default response (200).' },
    { t: 'tf', q: 'For a status code like 400 to be returned via an integration response mapping, it must also be defined in the Method Response.', a: true, e: 'Method Response declares the possible status codes and headers clients can receive.' },
    { t: 'sa', q: 'Explain how you would pass request URL parameters to a Lambda function in API Gateway (non-proxy integration).', k: ['Create resource path with parameter placeholders, e.g., /sendemail/{to}/{from}', 'Declare path params (and headers) in the Method Request', 'Integration Request mapping template uses $input.params(\'to\') etc. to build Lambda input JSON', 'Deploy and test'], m: 'Create resources with path-parameter placeholders, e.g. /sendemail/{to}/{from}. In the method\'s Method Request, the path parameters appear automatically; add any headers or query strings you\'ll use. In the Integration Request, add a mapping template for application/json that builds the Lambda\'s event, like { "to": "$input.params(\'to\')", "from": "$input.params(\'from\')", … }. Then redeploy the API and test it.' },
    { t: 'mc', q: 'What does clicking "Enable CORS" on an API Gateway resource do?', o: ['Adds an OPTIONS method that returns Access-Control-Allow-* headers and adds Access-Control-Allow-Origin to method responses', 'Disables all browsers', 'Encrypts the API', 'Creates an IAM role'], a: 0, e: 'Browsers send preflight OPTIONS requests for many cross-origin calls.' },
    { t: 'tf', q: 'Testing an API method using the API Gateway console\'s "Test" button calls it from inside AWS, before or without deploying.', a: true, e: 'It\'s an internal test. External testing uses curl or Postman against the deployed stage URL.' },
    { t: 'code', q: 'Write a curl command that POSTs JSON `{"to":"a@b.com","from":"me@x.com","subject":"Hi","textBody":"Hello"}` to `https://abc123.execute-api.us-west-2.amazonaws.com/dev/sendemail`.', k: ['curl -X POST', '-H "Content-Type: application/json"', '-d \'{json}\'', 'Correct URL'], mc: `curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"to":"a@b.com","from":"me@x.com","subject":"Hi","textBody":"Hello"}' \\
  https://abc123.execute-api.us-west-2.amazonaws.com/dev/sendemail` },
    { t: 'mc', q: 'How do you generate a Swagger (OpenAPI) file documenting your API in API Gateway?', o: ['Stages → choose stage → Export → Swagger/OpenAPI (JSON or YAML)', 'Lambda → Monitor → Export', 'IAM → Policies → Export', 'Run npm run swagger'], a: 0, e: 'The exercise\'s final step.' },
    { t: 'mc', q: 'With Lambda PROXY integration, what must the Lambda return?', o: ['An object with statusCode, headers, and body (a string)', 'Any object; API Gateway always wraps it', 'An HTML page only', 'Nothing'], a: 0, e: 'With proxy integration the Lambda controls the entire HTTP response.' },
    { t: 'tf', q: 'With Lambda proxy integration, the Lambda receives the full HTTP request (headers, path parameters, query string, body as a string) in its event.', a: true, e: 'Unlike non-proxy integration, no mapping template is needed.' },
    { t: 'mc', q: 'A deployed endpoint works from Postman but fails from your React app with a CORS error. Most likely fix?', o: ['Enable/configure CORS on the resource (OPTIONS method + Access-Control-Allow-Origin on responses), then redeploy', 'Change the Lambda runtime', 'Add more memory to the Lambda', 'Use HTTP instead of HTTPS'], a: 0, e: 'Postman doesn\'t enforce CORS; browsers do.' },
    { t: 'sa', q: 'List the main steps to create a web API in API Gateway that invokes a Lambda function and is callable from outside AWS.', k: ['Create a new (REST) API', 'Create resources (URLs), incl. path params', 'Create HTTP methods on resources with Lambda integration', 'Configure request mapping (body/path/headers) and response mapping (status codes)', 'Enable CORS if browsers will call it', 'Deploy to a stage', 'Test with console Test, then curl/Postman with invoke URL'], m: '1) Create a new REST API. 2) Create resources (URL paths), with path parameters if needed. 3) Create HTTP methods on them, choosing Lambda function integration. 4) Configure the input (body passthrough, or mapping templates for path parameters and headers) and the output (method/integration responses mapping errors to status codes). 5) Enable CORS for browser clients. 6) Deploy to a stage to get the invoke URL. 7) Test internally with the console\'s Test button, then externally with curl or Postman. 8) Optionally export Swagger documentation.' },
    { t: 'mc', q: 'In the slides\' common-case error mapping, which status code range indicates a bad request?', o: ['40x', '20x', '30x', '50x'], a: 0, e: '40x = bad request; 500 = internal server error.' },
    { t: 'tf', q: 'A Lambda can be called by API Gateway only if API Gateway has permission to invoke it (a resource-based permission the console adds automatically when you set up the integration).', a: true, e: 'The console asks to add the lambda:InvokeFunction permission.' },
    { t: 'mc', q: 'Which resource path correctly declares two path parameters?', o: ['/sendemail/{to}/{from}', '/sendemail/:to/:from', '/sendemail?to&from', '/sendemail/<to>/<from>'], a: 0, e: 'API Gateway uses curly braces.' },
    { t: 'mc', q: 'Which tool from the exercise is used to test the API externally?', o: ['curl or Postman', 'Jest', 'ts-mockito', 'CloudFormation'], a: 0, e: 'Both send real HTTP requests from outside AWS.' },
    { t: 'tf', q: 'In VTL mapping templates, `$input.params(\'x\')` can find a parameter named x in the path, query string, or headers.', a: true, e: 'It searches all three, in that order.' },
  ],
});

BANK.topic({
  id: 'http-cors',
  group: 'aws',
  title: 'HTTP, cookies, CORS & client access',
  notes: `
<h4>HTTP messages (MDN)</h4>
<pre class="code">POST /sendemail HTTP/1.1          ← start line: method, request target, version
Host: api.example.com              ← headers
Content-Type: application/json
                                   ← blank line
{"to":"bob@uvnets.com"}            ← optional body

HTTP/1.1 200 OK                    ← status line: version, status code, reason
Content-Type: application/json
Access-Control-Allow-Origin: *

{"message":"sent"}</pre>
<p>Status codes: 2xx success (200 OK, 201 Created, 204 No Content), 3xx redirect, 4xx client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx server error (500).</p>
<h4>Cookies</h4>
<ul>
  <li>The server sends <code>Set-Cookie: name=value; …</code>. The browser stores it and sends <code>Cookie: name=value</code> on later requests to that server. HTTP is stateless, and cookies add state.</li>
  <li>Uses: <strong>session management</strong> (logins, carts), <strong>personalization</strong> (preferences, themes), <strong>tracking</strong>.</li>
  <li>Attributes: <code>Expires</code>/<code>Max-Age</code> (without them it's a session cookie), <code>Secure</code> (HTTPS only), <code>HttpOnly</code> (not readable from JS <code>document.cookie</code>, which helps against XSS), <code>SameSite</code> (Strict/Lax/None; CSRF protection), <code>Domain</code>, <code>Path</code>.</li>
</ul>
<h4>CORS</h4>
<ul>
  <li><strong>Same-origin policy:</strong> by default a browser only lets a page call or download URLs from the same <em>origin</em>, meaning the same <strong>protocol, domain and port</strong>.</li>
  <li><strong>CORS</strong> is a protocol servers use to <em>allow</em> cross-origin requests by returning headers that tell the browser which pages may access a resource (<code>Access-Control-Allow-Origin</code>, <code>-Methods</code>, <code>-Headers</code>, <code>-Credentials</code>).</li>
  <li><strong>Simple requests</strong> are sent directly. The browser checks <code>Access-Control-Allow-Origin</code> on the response.</li>
  <li><strong>Preflighted requests:</strong> the browser first sends <code>OPTIONS</code> with <code>Origin</code>, <code>Access-Control-Request-Method</code> and <code>Access-Control-Request-Headers</code>. Per the slides this happens when the method isn't GET/POST/HEAD, when there are custom headers, or when the request includes credentials. (MDN also lists a Content-Type other than form-urlencoded, multipart/form-data or text/plain, so <code>application/json</code> triggers a preflight.)</li>
  <li><strong>CORS is enforced by the browser.</strong> curl and Postman do not enforce it.</li>
</ul>
<h4>Fetch vs. Axios</h4>
<ul>
  <li><strong>Fetch:</strong> native in browsers (no install), may need <code>node-fetch</code> in older Node, fewer features. You must <code>JSON.stringify</code> the body and call <code>await response.json()</code>. It does <em>not</em> reject on 4xx/5xx, so check <code>response.ok</code>.</li>
  <li><strong>Axios:</strong> install and import it. Richer and simpler: it serializes the body and parses <code>response.data</code>, and <em>rejects</em> on non-2xx (<code>axios.isAxiosError(e)</code>, <code>e.response?.status</code>).</li>
  <li>Both work with async/await or <code>.then().catch()</code>.</li>
</ul>`,
  questions: [
    { t: 'mc', q: 'Two URLs have the same "origin" if they share the same…', o: ['Protocol (scheme), domain (host), and port', 'Domain only', 'Path and query string', 'IP address only'], a: 0, e: 'https://domain-a.com:443 vs http://domain-a.com:80 are different origins.' },
    { t: 'sa', q: 'What is the same-origin policy, and what is CORS?', k: ['Same-origin policy: by default browsers only let a page access resources from the same origin (protocol, domain, port)', 'CORS: protocol letting servers allow cross-origin requests', 'Server returns headers (Access-Control-Allow-Origin, etc.) telling the browser which origins may access the resource', 'Enforced by the browser'], m: 'Under the same-origin policy, browsers by default only let a web page download or call URLs from the same origin, meaning the same protocol, domain and port it came from. CORS (Cross-Origin Resource Sharing) is the protocol a server uses to relax that: it returns headers like Access-Control-Allow-Origin, -Methods and -Headers telling the browser which other origins may access the resource. For some requests the browser checks first with a preflight OPTIONS request. CORS is enforced by the browser, not by curl or Postman.' },
    { t: 'tf', q: 'CORS is enforced by the browser; tools like curl and Postman do not enforce it.', a: true, e: 'Straight from the slides.' },
    { t: 'mc', q: 'Which HTTP method does the browser use for a CORS preflight request?', o: ['OPTIONS', 'GET', 'HEAD', 'PATCH'], a: 0, e: 'With Origin, Access-Control-Request-Method and Access-Control-Request-Headers.' },
    { t: 'mc', q: 'According to the slides, which situation triggers a CORS preflight request?', o: ['The request method is PUT or DELETE (not GET, POST, or HEAD)', 'Any GET request', 'A same-origin request', 'Any request made with curl'], a: 0, e: 'Also: custom headers, or credentials (per the slides).' },
    { t: 'tf', q: 'Adding a custom header like `EmailSubject` to a cross-origin request causes the browser to send a preflight request.', a: true, e: 'Custom (non-safelisted) headers require a preflight.' },
    { t: 'mc', q: 'Which response header tells the browser which origins may access the resource?', o: ['Access-Control-Allow-Origin', 'Content-Type', 'Set-Cookie', 'Authorization'], a: 0, e: 'E.g. Access-Control-Allow-Origin: https://myapp.com, or *.' },
    { t: 'mc', q: 'What are the three parts of an HTTP request message (in order)?', o: ['Start line (method, target, version); headers; blank line then optional body', 'Body; headers; status line', 'Status code; cookies; JSON', 'URL; IP; port'], a: 0, e: 'Responses use a status line (version, status code, reason phrase) instead.' },
    { t: 'mc', q: 'Which is a valid HTTP response status line?', o: ['HTTP/1.1 404 Not Found', 'GET /index.html HTTP/1.1', 'Host: example.com', 'Content-Length: 42'], a: 0, e: 'Option B is a request line; C and D are headers.' },
    { t: 'mc', q: 'Which header does a server use to create a cookie in the browser?', o: ['Set-Cookie', 'Cookie', 'Access-Control-Allow-Credentials', 'Authorization'], a: 0, e: 'The browser then sends it back in the Cookie header.' },
    { t: 'mc', q: 'What does the `HttpOnly` cookie attribute do?', o: ['Prevents JavaScript (document.cookie) from reading the cookie, mitigating XSS', 'Sends the cookie only over HTTP, not HTTPS', 'Makes the cookie expire immediately', 'Shares the cookie with all domains'], a: 0, e: 'Secure is the attribute that restricts a cookie to HTTPS.' },
    { t: 'sa', q: 'Name the three main purposes cookies are used for, per MDN.', k: ['Session management (logins, shopping carts, game scores)', 'Personalization (user preferences, themes)', 'Tracking (recording/analyzing user behavior)'], m: 'Session management (logins, shopping carts, anything the server should remember), personalization (user preferences, themes, settings), and tracking (recording and analyzing user behavior).' },
    { t: 'tf', q: 'A cookie without Expires or Max-Age is a session cookie that is deleted when the browser session ends.', a: true, e: 'Permanent cookies set Expires or Max-Age.' },
    { t: 'mc', q: 'Which statement about the Fetch API vs. Axios is correct (per the slides)?', o: ['Fetch is native in most browsers (no install); Axios must be installed and imported but is more feature-rich with a simpler API', 'Axios is built into browsers; fetch must be installed', 'Both require installation', 'Fetch automatically parses JSON into response.data'], a: 0, e: 'With fetch you call response.json(); with axios you read response.data.' },
    { t: 'tf', q: 'fetch() rejects its promise when the server returns HTTP 500.', a: false, e: 'fetch only rejects on network errors. Check response.ok or response.status.' },
    { t: 'code', q: 'Write an async TypeScript function `registerUser(userData: Record<string, string>)` using fetch that POSTs JSON to `/api/register`, handles a 403 specially (log "Forbidden"), throws for other non-OK statuses, and logs the parsed user details. Catch and log errors.', k: ['await fetch(\'/api/register\', { method: \'POST\', headers: {\'Content-Type\': \'application/json\'}, body: JSON.stringify(userData) })', 'if (!response.ok) { if (response.status === 403) { ...; return; } throw new Error(`Status: ...`) }', 'const data = await response.json(); console.log(...)', 'try/catch that logs the error'], mc: `const registerUser = async (userData: Record<string, string>) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 403) {
        console.error("Forbidden: you are not allowed to register.");
        return;
      }
      throw new Error("Status: " + response.status);
    }

    const data = await response.json();
    console.log("User details:", data);
  } catch (error) {
    console.error("Error during registration:", error);
  }
};` },
    { t: 'code', q: 'Write an async TypeScript function `registerUser(userData: Record<string, string>)` using Axios that POSTs to `/api/register`, logs the user details from the response, logs "Forbidden" on a 403 (detected with `axios.isAxiosError`), and logs any other error.', k: ['import axios from "axios"', 'await axios.post(\'/api/register\', userData, { headers: {...} })', 'console.log(response.data)', 'catch: if (axios.isAxiosError(error) && error.response?.status === 403) {...}', 'Otherwise log error.response?.data || error.message'], mc: `import axios from "axios";

const registerUser = async (userData: Record<string, string>) => {
  try {
    const response = await axios.post("/api/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("User details:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        console.error("Forbidden: you are not allowed to register.");
        return;
      }
      console.error("Error during registration:", error.response?.data || error.message);
    } else {
      console.error("Error during registration:", error);
    }
  }
};` },
    { t: 'mc', q: 'With axios, where is the parsed JSON response body?', o: ['response.data', 'await response.json()', 'response.body', 'response.text'], a: 0, e: 'Axios parses JSON automatically.' },
    { t: 'tf', q: 'A web page at https://domain-a.com can, by default, call a web API at https://api.domain-b.com without any CORS headers from the server.', a: false, e: 'That\'s a cross-origin request. The server must return CORS headers allowing domain-a.com.' },
    { t: 'mc', q: 'Your React app at http://localhost:3000 calls your API Gateway URL. Which origin must the API allow?', o: ['http://localhost:3000', 'https://execute-api.amazonaws.com', 'localhost (any port)', 'No origin needed'], a: 0, e: 'Protocol + host + port of the page making the request (or *).' },
    { t: 'tf', q: 'Sending a POST with `Content-Type: application/json` cross-origin will trigger a preflight request (per MDN).', a: true, e: 'Only form-urlencoded, multipart/form-data and text/plain content types count as "simple".' },
    { t: 'mc', q: 'Which status code best indicates the client sent invalid input?', o: ['400 Bad Request', '200 OK', '500 Internal Server Error', '301 Moved Permanently'], a: 0, e: '4xx = client error.' },
    { t: 'mc', q: 'What is the difference between 401 and 403?', o: ['401: not authenticated (missing/invalid credentials); 403: authenticated or known but not allowed', '401: server error; 403: not found', 'They mean the same thing', '401: success; 403: redirect'], a: 0, e: 'Unauthorized vs Forbidden.' },
    { t: 'sa', q: 'Explain the difference between a "simple" CORS request and a "preflighted" one.', k: ['Simple: browser sends the actual request directly (GET/POST/HEAD with safelisted headers/content types) and checks Access-Control-Allow-Origin on the response', 'Preflighted: browser first sends an OPTIONS request asking permission for the method/headers', 'Server must answer OPTIONS with Access-Control-Allow-Origin/Methods/Headers before browser sends the real request', 'Triggers: non-GET/POST/HEAD methods, custom headers, credentials (per slides) / non-simple content types'], m: 'A simple request (e.g. a GET or POST with only standard headers and a simple content type) is sent directly. The browser includes an Origin header and then checks the response\'s Access-Control-Allow-Origin before letting the page read it. A preflighted request first gets an OPTIONS request from the browser, carrying Origin, Access-Control-Request-Method and Access-Control-Request-Headers, to ask whether the real request is allowed. Only if the server answers with matching Access-Control-Allow-* headers does the browser send the actual request. Preflights happen for methods other than GET/POST/HEAD, custom headers, credentials (per the slides), or a content type like application/json.' },
    { t: 'tf', q: 'The `Secure` cookie attribute means the cookie is only sent over HTTPS.', a: true, e: 'HttpOnly is a different attribute (no JS access).' },
  ],
});
