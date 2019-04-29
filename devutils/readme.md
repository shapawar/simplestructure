## This directory only used for development purpose to build and unit test block code quickly to minimize errors if any while developing main functionalities 

## You can use this directory for your POC work and If you don't want to push your POC work in remote repo then you can ignore this by adding into .gitignore file


## Registration Component

## User Signup

###_**/v1/registration/**-

* User registration process is done here. There are two files signup.router and signup.service.
signup.router file contains the signup related routes and written the bussiness logic in service file.

#### Input parameters

* Accepts `Body data` 
* There are five parameter with some validation
  1)username (string)
  2)emialid (string with valid email ID)
  3)mobile number(967-579-2036)
  4)password (string)
  5)address (text)

#### Returns

* If user signup successfully then return signup successfully message
* If `Error` then return metadata with error message.


#### `BodyData` 

json
{
	"username":"tomes11",
	"email":"tomes@gmail.com",
	"mobile":"964-804-2036",
	"password":"tomes@123",
	 "address":"USA"
}


#Login Component

## User Signin

###_**/v1/login/**-

User authorization is cheak here using user 'username' and 'password' fileds. After successful login create JWT token for authenticate data. Send JWT token to user and redirect to 'main' page.
There are two files. 
                    1) Login route.js  (For manage login routes)
                    2)login.Service.js (contains bussiness logic)

#### Input parameters

* Accepts `Body data` 
* There are two parameter 
  1. username 
  2. password 

#### Returns

* If user signin successfully then render on ejs template(main.ejs) file with signin successfully message and JWT token.

* If `Error` then return metadata with error deatils.                    

###'BodyData'

json{
    username:"tomes11",
    password:"tomes@123"
}


##Users Component

### CRUD Rest API

*All endpoints requires `Authentication: JWT ` token in header.
* Users component contain below files.
  1)user.model.js (Joi library configuration for validate user inputs)
  2)user.route.js (Its like controller for handling response and request object and handling routes of rest API)
  3)user.service.js (This file contain all business logic of all API)
  4)user.test.js (We have write all unit testing code to in this file )


##Create User(Post method)

###_**/v1/users/**-

This method is user for create a new user. We want JWT token for authenticate user data, After verify token we procced the next operation.  

#### Input parameters

* Accepts `Body data` 
* There are five parameter with some validation
  1)username (string)
  2)emialid (string with valid email ID)
  3)mobile number(967-579-2036)
  4)password (string)
  5)address (text)

#### Returns

* If user create successfully then return message and insert count.
* If `Error` then return metadata with error details and message.


#### `BodyData` 

```json
{
	"username":"tomes11",
	"email":"tomes@gmail.com",
	"mobile":"964-804-2036",
	"password":"tomes@123",
	 "address":"USA"
}
```

## Fetch Users List(Get method)

###_**/v1/users/**-

Fetch all users deatils using this method. 

#### Input parameters


#### Returns

* Return array of all users deatils and successfull message.

#### `ParamData` 

```json
{
	
}
```

## Fetch single user details(GET method)

###_**/v1/users/tomas**-

If we want to specific user details then we want used this method. 

#### Input parameters

* Accepts `params data` 
* We want only username for fetching user details.

#### Returns

* If user match then return user details otherwise return null array.


#### `ParamData` 

```json
{
	"username":"tomas"
}
```

## Delete single user (DELETE method)

###_**/v1/users/tomas**-

If we want to delete specific user from portal then we used this method.
pass the username in params of the header.

#### Input parameters

* Accepts `params data` 
* We want only username for delete user.

#### Returns

* If user match then delete user from portal and return success message and delete user count otherwise return error message 'user not found'.


#### `ParamData` 

```json
{
	"username":"tomas"
}
```

##Update User(PUT method)

###_**/v1/users/**-

This method  is used for update user details. 

#### Input parameters

* Accepts `Body data` 
* There are two parameter 
  1)username (string)
  5)address (text)

#### Returns

* If user match then update user details otherwise throw error message.

#### `BodyData` 

```json
{
	"username":"tomes",
	 "address":"India"
}
```







