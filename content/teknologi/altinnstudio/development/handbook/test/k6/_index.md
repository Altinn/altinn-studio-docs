---
title: k6
description: Performance and Functional Testing of API with K6
tags: [development, testing, api]
weight: 100
---

k6 is a developer-centric, free and open-source load testing tool built for making performance testing a productive and enjoyable experience. [read more about K6 here](https://k6.io/docs/)

### Set up k6 tests
1. Clone the k6 tests from [GitHub Repo](https://github.com/Altinn/altinn-studio/tree/master/src/test/K6/src)
2. Install docker and make sure the drive having the k6 tests is shared. 
3. Open cmd and download the latest k6 docker image `docker pull loadimpact/k6`

### How to write k6 tests
1. Find the area/collection where the new test has to be added.
2. k6 test project is divided into three basic folders.
    - tests - includes all the .js test files that send data to methods in api and validated response
    - data - includes all the testdata ex., attachments, formdata, appmetadata, etc.,
    - api - includes the api calls to platform/app apis by getting data from the tests and returns the response of the http requests. (post, get, put, delete)
3. Begin by adding the endpoint to _config.json_
4. Create a new method for the actual api in a .js file under folder `K6/src/api` which gets in data from the tests and returns response. Refer below picture for a sample method calling an api with endpoint and headers and returning the response.
![ApiCall Example](apicall.PNG "ApiCall Example")
5. Create a test .js file under `K6/src/tests`. Refer below picture for a sample test file. 
![Tests Example](testexample.PNG "Tests Example")
[More about k6 test scripts](https://k6.io/docs/using-k6/test-life-cycle)
6. One test can call many api endpoints with appropriate data, the result output of the test is determined by the __checks__ in a tests and the __thresholds__ defined in a test.
[More about k6 test checks and thresholds](https://k6.io/docs/using-k6/checks)

### Run k6 tests locally with a k6 docker image
The local repo where the code has to be mounted inside a docker container and all the environment variables required for the tests has to be passed when running a test.
See the table below for the required environment variables for the test files.
```cmd
docker run -i -v C:/Repos/altinn-studio/src/test/K6/src/:/src loadimpact/k6 run src/tests/platform/pdf/pdf.js -e env=value
```

### Environment variables required for different test files
 Tests/env variables | env | username | userpwd | org | level2app | testapp
:--- | :---: | :---: | :---: |:---: | :---: | :---:
platform/pdf/pdf.js | X | | | | | |
platform/authorization/authorization.js | X | X | X | X | X | X |
platform/register/register.js | X | X | X | X | X |  |
platform/profile/profile.js | X | X | X | X | X |  |
platform/storage/instances.js | X | X | X | X | X |  |
platform/storage/data.js | X | X | X | X | X |  |
platform/storage/events.js | X | X | X | X | X |  |
platform/storage/messageboxinstances.js | X | X | X | X | X |  |
platform/storage/process.js | X | X | X | X | X |  |
platform/storage/applications.js | X | X | X | X | X | X |
app/instances.js | X | X | X | X | X |  |
app/data.js | X | X | X | X | X |  |
app/process.js | X | X | X | X | X |  |
app/end2end.js | X | X | X | X | X |  |

### k6 test pipeline in Azure Devops
[Azure Devops Pipeline](https://dev.azure.com/brreg/altinn-studio/_build?definitionId=96)

### Visualizing k6 results
k6 by default outputs in stdout format while running a test. Below is described various methods to visualise results.

- To get a junit.xml output from k6 tests, pipe the results to a k6-to-junit npm package with file name. (use `npm install -g k6-to-junit` to install the package globally).
This comes in handy to view test results in CI/CD pipelines.

```cmd
docker run -i -v C:/Repos/altinn-studio/src/test/K6/src/:/src loadimpact/k6 run src/tests/platform/pdf/pdf.js -e env=value | k6-to-junit results.xml
```
- k6 performance test results can be visualised with the help of a influxdb and grafana instance that stores and reads the test results and displays as graph.
[More about influxdb and grafana results](https://k6.io/docs/results-visualization/influxdb-+-grafana)


### Initial results from a sample tests against performance test environment.
- Test case: Login - Build test data - Create instance - Upload formdata - validate and archive instance
- Http-requests: 14
- Iteration: 1
- Iteration duration: ~27 seconds
- Average http_req_duration : 1.9s
