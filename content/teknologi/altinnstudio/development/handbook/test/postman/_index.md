---
title: Postman
description: API Testing with postman
tags: [development, testing, api]
weight: 100
---

## Postman
To test API endpoints the tool postman enables easy configuration and setup of various HTTP requests, [read more about postman here.](https://learning.getpostman.com/docs/postman/sending_api_requests/requests)

### Authentication

Several of the exposed APIs requires various cookies, for instance authentication and gitea information. To be able to do requests against these APIs the cookies have to be included in the HTTP request, and configured in postman. The cookies can be found in the following way:
- In your browser login to dev.altinn.studio/altin.studio/altinn3.no depending on what environment you are targeting
- Notice that the cookies AltinnStudioDesigner, AltinnStudioRuntime and i_like_gitea (among others) has been saved for the domain name you have logged in to.
  - For Chrome cookies can be found under settings -> advanced -> cookies -> see all.

The two cookies AltinnStudioDesigner and AltinnStudioRuntime works as auth against the Designer and APP API respectively, so if you are targeting a Designer API you should include the AltinnStudioDesigner cookie, along with the i_like_gitea cookie, and if you are targeting a runtime API the AltinnStudioRuntime cookie should be included.
Cookies are easily added to the postman requests under the slightly hidden cookies setting, see:

![Postman Cookies](postman-cookies.PNG?width=800)

### Set up postman tests
1. Download and install postman native app.
2. Import the files from src/test/Postman/Collection to the collections area in Postman.
3. Import the environment .json file from src/test/Postman to the environments area in Postman.

### How to write postman tests
1. Find the area/collection where the new test has to be added.
2. Add a new request of type GET/POST/PUT/DELETE under the right folder.
3. Provide the endpoint, input for the request.
4. Make sure the variable values are accessed from environments file.
5. Write the tests as a javascript code in the 'tests' section of a request.
[More about test scrips](https://learning.getpostman.com/docs/postman/scripts/test_scripts/)
6. Tests should have one test to verify valid response code and another test to validate the content of the response.

### Information about the postman collections
1. Collections folder include postman collections for Platform API, Storage API, APP API.
2. Platform API uses Platform.postman_environment as an environment file.
3. Storage, App API and Negative tests uses App.postman_environment as an environment file.
4. One has to fill in the values (testdata) in the environment file based on the environment under test.
5. The collections has steps that would authenticate an user and set appropriate cookies.

### Run Postman tests against a test environment.
1. Open Postman and Import the Postman collection file and the corresponding envrinonment file.
2. Select the environment file and fill in the necesary information for the required collection.
3. Required Test data for App / Storage / Negative Tests Collection are envUrl, org(appOwner, app(level2-app), testUserName(level2LoginUser), testUserPassword(use same password for two users), level3-app, level1-app, testUserName2(level1LoginUser)
4. Required Test data for Platform are envUrl, org(appOwner), app(level2-app), partyID, SSN, OrgNr, userID
5. Open the Postman runner -> Select the collection and environment and click 'Start Run'

Note: newman can be used to a Postman collection from command line interface.