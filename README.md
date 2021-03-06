This is a simple example of API server using NodeJS with Express, JSON-RPC 2.0, MongoDB

**Here 2 entity User and Car located at models directory**

Car { brand: , model: , color: }
User {name: , surname: , password: , car: {_id: }

**METHODS located at controllers/carController directory** :

**setCar** - _set Car to DB_
`{
"jsonrpc": "2.0", 
"method": "setCar", 
"params": {
    "brand": "Fiat",
    "model" : "Punto",
    "color" : "Green"
}, 
"id": 1
}`

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

**getCarsByUserId**
`{"jsonrpc": "2.0", 
 "method": "getCarsByUserId",
 "params": {
     "_id": "603e3aaf2be2819bb224f2be"
 }, 
 "id": 3}`

**removeCarById** _remove Car from DB by ID_
`{
"jsonrpc": "2.0", 
"method": "removeCarById",
"params": {
    "_id": "603500244421d012b31898ae"
}, 
"id": 3
}`

**setUser** - _set User to DB_
`{
"jsonrpc": "2.0", 
"method": "setUser", 
"params": {
    "name": "Nikita",
    "surname" : "proger",
    "password" : 234566,
    "car": {
        "_id": "6033bed066ff1e0116100553"
    }
}, 
"id": 1
}`

**getUsers** - _get all Users from DB_
`{
"jsonrpc": "2.0", 
"method": "getUsers", 
"id": 3
}`

**getUserById** - _get User from DB_
`{
"jsonrpc": "2.0", 
"method": "getUserById",
"params": {
    "_id": "6033bf329c1ae9013f39db39"
}, 
"id": 1
}`
// _User id we can get with_ **getUsers** method

**getUsersByCarId**
`
{"jsonrpc": "2.0", 
"method": "getUsersByCarId",
"params": {
    "_id": "603d2302e9a108866ef67465"
}, 
"id": 3}`

**removeUserById** _remove User from DB by ID_
`{
"jsonrpc": "2.0", 
"method": "removeUserById",
"params": {
    "_id": "6034ffde4421d012b31898ad"
}, 
"id": 3
}`

Postman collection with requests examples - [https://www.getpostman.com/collections/34f13dd00bf7fe1a9374]
