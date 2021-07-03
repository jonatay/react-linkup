Shis has been migrated to https://github.com/jonatay/new-react-linkup
Still building/compiling on linux, but not windows, breaking changes in router, redux etc force radical rewrite.
Going to rebuild from ground up, but don't want to mess with this repo while live still using it.

# react-linkup

express server
create-react-app client
  * redux with sagas
  * react-router >4
  
Redux stuff is based on eggheads very good advanced redux tut

Client uses firebase Auth to login, obtains jsw token and attaches to every request header
[auth-acl](./doc/auth-acl.md)

Server validates token (using middleware) and interfaces with Firebase as a secure admin provider


