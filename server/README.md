# react-linkup

express server
create-react-app client
  * redux with sagas
  * react-router >4
  
Redux stuff is based on eggheads very good advanced redux tut

Client uses firebase Auth to login, obtains jsw token and attaches to every request header
[auth-acl](./doc/auth-acl.md)

Server validates token (using middleware) and interfaces with Firebase as a secure admin provider


