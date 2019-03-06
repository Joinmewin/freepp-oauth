1.Purpose 
========

This document describes how to integrate FreePP OAuth with 3rd Party’s Web
Application.



2.Before User Login: Create 3rd Party Application , and Agent 
============================================================

Please go to FreePP Developer Web, and create App and Agent for 3rd Party
application.  

Examples for Application, and Agents creation :  


![](media/f8f7e31560697bb7768f287df15467bc.png)

![](media/2e1dd90f3024af31f5277d8073a8d550.png)

3.Login Flow
==========

Following are Flow Diagram which describes the Login Interaction between
User, FreePP Authentication Server, and 3rd Party Application.  

![](media/9b04f11b113eb4efa9952adf96e8bb69.png)

3.1 Steps Description:
------------------

1. 3rd Party directs user to FreePP Authentication Login Page with appid,
   agid, redirect_uri & state.Please Refer "OAuth login".

2. FreePP Login page will popup in browser, and user login in as
   authenticated. Browser shows Profiles List of user’s FreePP account, and
   user chooses which profile to be approved. Then user agrees to grant the
   requested permission to 3rd Party Application.

3. FreePP Authentication Server redirects user back to 3rd Party via
   redirect_uri, and return granted code,& state. Please refer “Redirect code
   handle".

4. 3rd Party requests access token by “https://imc-pro.freepp.com/provider/token”
   endoint with code.

5. FreePP Authentication Server validate 3rd Party Application, and returns
   access token, and refresh token. Please refer “Request Access Token by
   Code”.  
   3rd Party Application could refresh token before token expired. Please refer
   “Refresh access Token”.



# 4. API Description:

## 4.1 OAuth login

| Method   | GET                                                          |
| -------- | ------------------------------------------------------------ |
| Header   |                                                              |
| Request  | /oauth/login?domain_id={{dmid}}&agent_id={{agid}}&client_id={{appid}}&redirect_uri=https://www.agent-bot.com/redirecturl&[scope](#identify-access-scopes)=Profile.Basic+Agent.Basic&state=A |
| Response | Continue user login flow, and if login successfully , server will send "code" back to "reidrecturl" |

---------------------------

### **Identify access scopes**

| *Scopes*        | *Description*                         |
|-----------------|---------------------------------------|
| Profile.Basic   | Profile Basic Opertation.             |
| Agent.Basic     | Agent Basic Opertation.               |
| Agent.JsSdk.All | This is only for JSSDK Service of APP |
| Robot.Basic     | Robot Basic Operation.                |



###  Redirect code handle

| Method   | GET                                                                                                                                                                                                                                                                                                                                                      |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header   |                                                                                                                                                                                                                                                                                                                                                          |
| Redirect | https://www.agent-bot.com/redirecturl? code=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTc0NzcwOTMsImlhdCI6MTUxNzQ3NjQ5NCwiZG1JZCI6ImMyMWY5NjliLTVmMDMtNDMzZC05NWUwLTRmOGYxMzZlNzY4MiIsImdyYW50SWQiOiIzTE9zVEkwN0Z2YkZWTTlNZVJJcXRHZThDV0dYeDB4R0x0cktlbVB6V3Z1YWc4aWxMQTVIczRJakZlOHpTMTQzIn0.VgYI-YxNUHb1Fm4p5VnZIXe91ZqmsKh1zwIPP6znHW8&state=A |



**Error Response**

If the user denies the permissions requested by your application, the following
parameters are returned in the callback URL query string.

| errorCode (integer) | errorMsg (string) | State                                |
| ------------------- | ----------------- | ------------------------------------ |
| 100                 | DISALLOWED        | State parameter from agent developer |
| 101                 | CANCELLOGIN       | State parameter from agent developer |
| 102                 | CANCELPROFILE     | State parameter from agent developer |
| 103                 | PARAMETERERROR    | parameter error                      |



This is an example of an error response.

https://www.agent-bot.com/redirecturl?errorCode=100&errorMsg=DISALLOWED&state=A



### 4.2 Request Access Token by Code 

OAuth provides 2 types of access token request for different usage, one is “
authorization_code”, the other is “client_credential”.

Please note that request/refreshed access token will make previous access token
invalid.  

**DO**

```
For 3rd party application, efficient access token management is
required. We suggest to run required/refresh access token near expired time by token
management.
```



Following case shall be **avoided** :

**DO NOT**

```
Frequently required/refresh access token by single or multi threads.
```



#### a. grant_type = authorization_code

This is authorized request to get grand code to query user’s information in
JoinMe Server, and needs approved by user. For the OAuth’s flow, please use this
type to get Access Token.

| Method   | POST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header   | Content-Type : application/json Authorization : Basic base64(appid:appkey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| API      | /provider/token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Body     | { "domain_id": {{dmid}}, "client_id":{{appid}}, "agent_id": {{agid}}, "grant_type": "authorization_code", "redirect_uri": "https://www.agent-bot.com/redirecturl" "code": "{{code}}" }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Response | { "token_type": "Bearer", "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTA2NTEyMTksImlhdCI6MTUxMDY0NzYyMCwKICAiZG1JZCI6ICJjMjFmOTY5Yi01ZjAzLTQzM2QtOTVlMC00ZjhmMTM2ZTc2ODIiLAogICJhcHBJZCI6ICIxNGJkOGE4ZC1kMDJkLTQ5N2EtOWRmNy03MzQ0NzljOGNmMTIiLAogICJ0b2tlbklkIjogImh3WkxVc1ZjS0U0TjVMVWYwUHFBcFhkejZaTnpmZmdubXpGb1dXYmZ0M0l0dVZ3YmZPS0FIbExGNW9lUVhJcFoiCn0.md7wOkUEsIwTLa4lZsmms3lbQOvcTY4P0vCIvgtVig0", "expires_in": 3599, "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTA2NDc2MTksImRtSWQiOiJjMjFmOTY5Yi01ZjAzLTQzM2QtOTVlMC00ZjhmMTM2ZTc2ODIiLCJhcHBJZCI6IjE0YmQ4YThkLWQwMmQtNDk3YS05ZGY3LTczNDQ3OWM4Y2YxMiIsImF1dGhJZCI6IjhPajN4QnhvZmlwc1ZQcFlhSHJ2SDVpUUVIbGR3NlNTZ3pqWjdLMjVCZENyaGdoQWlRTW1GYUp6d3ppdUNRWEMifQ.9TDwPnZFoHbs2ReaCT6Wtwk8o4-ckb9P61zPl6I4nkA" } |



#### b. grant_type = client_credentials

This is authorized request to get JSON Web Tokens(JWT) for JSSDK service. 3rd
Party can call this API directly for JSSDK service.

| Method   | POST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header   | Authorization : Basic base64(appId:appKey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Request  | /provider/token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Body     | { domain_id : {{dmid}}, grant_type : client_credentials, client_id :{{appid}},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|          | agent_id : {{agid}}, scope : Agent.JsSdk.All }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Response | { "token_type": "Bearer", "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTA2NTEyMTksImlhdCI6MTUxMDY0NzYyMCwKICAiZG1JZCI6ICJjMjFmOTY5Yi01ZjAzLTQzM2QtOTVlMC00ZjhmMTM2ZTc2ODIiLAogICJhcHBJZCI6ICIxNGJkOGE4ZC1kMDJkLTQ5N2EtOWRmNy03MzQ0NzljOGNmMTIiLAogICJ0b2tlbklkIjogImh3WkxVc1ZjS0U0TjVMVWYwUHFBcFhkejZaTnpmZmdubXpGb1dXYmZ0M0l0dVZ3YmZPS0FIbExGNW9lUVhJcFoiCn0.md7wOkUEsIwTLa4lZsmms3lbQOvcTY4P0vCIvgtVig0", "expires_in": 3599, "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTA2NDc2MTksImRtSWQiOiJjMjFmOTY5Yi01ZjAzLTQzM2QtOTVlMC00ZjhmMTM2ZTc2ODIiLCJhcHBJZCI6IjE0YmQ4YThkLWQwMmQtNDk3YS05ZGY3LTczNDQ3OWM4Y2YxMiIsImF1dGhJZCI6IjhPajN4QnhvZmlwc1ZQcFlhSHJ2SDVpUUVIbGR3NlNTZ3pqWjdLMjVCZENyaGdoQWlRTW1GYUp6d3ppdUNRWEMifQ.9TDwPnZFoHbs2ReaCT6Wtwk8o4-ckb9P61zPl6I4nkA" } |



##  4.3 Refresh access Token

| Method   | POST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header   | Content-Type : application/json Authorization : Basic base64(appid:appkey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| API      | /provider/token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Body     | { "domain_id": {{dmid}}, "client_id":{{appid}}, "agent_id": {{agid}}, "grant_type": "refresh_token", "refresh_token": {{refresh_token}} }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Response | { "token_type": "Bearer", "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTA2NTEyMTksImlhdCI6MTUxMDY0NzYyMCwKICAiZG1JZCI6ICJjMjFmOTY5Yi01ZjAzLTQzM2QtOTVlMC00ZjhmMTM2ZTc2ODIiLAogICJhcHBJZCI6ICIxNGJkOGE4ZC1kMDJkLTQ5N2EtOWRmNy03MzQ0NzljOGNmMTIiLAogICJ0b2tlbklkIjogImh3WkxVc1ZjS0U0TjVMVWYwUHFBcFhkejZaTnpmZmdubXpGb1dXYmZ0M0l0dVZ3YmZPS0FIbExGNW9lUVhJcFoiCn0.md7wOkUEsIwTLa4lZsmms3lbQOvcTY4P0vCIvgtVig0", "expires_in": 3599, "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTA2NDc2MTksImRtSWQiOiJjMjFmOTY5Yi01ZjAzLTQzM2QtOTVlMC00ZjhmMTM2ZTc2ODIiLCJhcHBJZCI6IjE0YmQ4YThkLWQwMmQtNDk3YS05ZGY3LTczNDQ3OWM4Y2YxMiIsImF1dGhJZCI6IjhPajN4QnhvZmlwc1ZQcFlhSHJ2SDVpUUVIbGR3NlNTZ3pqWjdLMjVCZENyaGdoQWlRTW1GYUp6d3ppdUNRWEMifQ.9TDwPnZFoHbs2ReaCT6Wtwk8o4-ckb9P61zPl6I4nkA" } |



# 5. Using Access Token to call OAuth APIs  

JoinMe OAuth API released is below:

## 5.1 **OAuth Profile Info** 

Profile request example  

```http
curl -X GET \
-H 'Authorization: Bearer {ENTER_ACCESS_TOKEN}' \
http://api.joinme.com/OAuthbot/v1/profile 
```

Get user profile information by oauth.  



| Method   | GET                                                          |
| -------- | ------------------------------------------------------------ |
| Header   | Authorization : Bearer {Access Token}                        |
| Request  | /OAuthbot/v1/profile                                         |
| Body     | None                                                         |
| Response | {<br />"name": "Joinme Test",<br />"pid": "Uxxxxxxxxxxxxxx...",<br />"avatar": "https://abc.com/...",<br />"locale": "zh_TW"<br />} |



Server returns the status code 200 and a JSON object with the following parameters.  

| **Field** | **Type** | **Description**                                              |
| --------- | -------- | ------------------------------------------------------------ |
| name      | String   | Display Name                                                 |
| pid       | String   | Profile ID                                                   |
| avator    | String   | Image URL                                                    |
| locale    | Locale   | A set of parameters that defines the user's language. Reference from [ISO639](http://www.oracle.com/technetwork/java/javase/javase7locales-334809.html). |



# 6. Examples : Sample Web Application Server for OAuth 

Please download "oAuth" which is Sample Web Server to run OAuth flow with JoinMe Server. You can build this sample code to start your first Web Application.


## 6.1  Nodejs Environment preparation

Executes the followings commands to setup building environment.

1. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
2. nvm install v6.2.2



## 6.2 Build, Run Web Application Server

Change to "oAuth" folder. Execute the following commands to build, and run the sample server.

1. npm run build
2. PORT=9000 node server start

Now, your web application server is running.



## 6.3 Run Test Page for JoinMe OAuth Flow

Test entrance web page in your server is :  http://$sample_server_ip:$port/oauth/3rdparty

Redirect URL to handle result:   http://$sample_server:$port/oauth/code 



### 6.3.1 Open Web browser, and run the test page. 

Following is the screenshot.  Please fill in the parameters : agid, appid, appkey, and uri.

You can get your agid, appid, appkey from Developer Registration of JoinMe.  

URI could be " http://$sample_server:$port/oauth/code" in sample server

![](media/2476211ef0e9044e41ce82b4c24c61d1.png)



### 6.3.2 Result Pages 

Followings are the result pages after oauth flow.

This is the code result. 

![](media/e804402391634d067a915dfc6bd7eb55.png)



This is getting Access Token Result from Code, and get user profile result.

![](media/0bdca8d1ef6594cee9115738b613cb2c.png)

# 7. License

[Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) 
