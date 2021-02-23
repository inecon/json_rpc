This is a simple example of API server using NodeJS with Express, JSON-RPC 2.0, MongoDB

**Used 2 entity User and Car located at models directory**

Car { brand: , model: , color: }
User {name: , surname: , password: , car: {_id: }

**METHODS located at controllers/controller directory** :

**getCars** - _getting all cars from DB_
`{ 
"jsonrpc": "2.0", 
 "method": "getCars", 
 "id": 1 
}`

**getCarById** - _get Car from DB_
`{
"jsonrpc": "2.0", 
"method": "getCarById",
"params": {
    "_id": "6033c3d9f626cf0243fcf1fb"
}, 
"id": 1
}`
// _Car id we can get with_ **getCars** method

**getUsers** - _get all Users from DB_
`{
"jsonrpc": "2.0", 
"method": "getUsers", 
"id": 3
}`

**getUserById** - _get Car from DB_
`{
"jsonrpc": "2.0", 
"method": "getUserById",
"params": {
    "_id": "6033bf329c1ae9013f39db39"
}, 
"id": 1
}`
// _User id we can get with_ **getUsers** method

setCar
setUser

