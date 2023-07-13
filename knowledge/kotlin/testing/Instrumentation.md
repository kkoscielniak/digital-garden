Instrumentation clears the app state between each test, so that no test depends on each other. This is called a _stateless test,_ because the state of each test is independent from the other.

When each test runs in its own instrumentation, if one test fails other tests will continue to execute. This is very important for large apps with many tests, and allows the developer to isolate the exact problem.
