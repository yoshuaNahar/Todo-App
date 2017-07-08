### Basic todo app

An introduction to Angular with TypeScript.
Also created a simple Java backend.

**Use these commands to run Angular:**

* `npm init`
* `ng serve` (in prod: `ng build --prod --aot`)

All urls should redirect to the index.html page, add below line in the `000-default.conf` file:<br>
`ErrorDocument 404 /index.html`

The correct url to use is: http://domain/todo-app/custom-name-here

**Use these commands to run Java:**
* `mvn clean package`
* `java -jar todo_app-0.0.1.jar` (please tell hibernate to create the db, now set at `validate`) 
