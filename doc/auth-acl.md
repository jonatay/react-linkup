# [<](../README.md) Auth

* Taken care of by
  [Express Firebase Middleware](https://github.com/antonybudianto/express-firebase-middleware).
  Client gets token from firebase-web, and attaches to all req headers.
* This token is _(all /api/\*)_ validated using
  [firebase-auth](https://firebase.google.com/docs/auth/admin/verify-id-tokens).

# ACL

* **roles** are assigned to **users**
* roles have **resources**
* resources have **actions**
* roles can have **parents** from whome they inherit

eg:
* *role* **fleetTranSecUser** has
  * *resource* **[fleetTranSec, fleetVehiclesSec]**
  * *permissions* **get**
* *role* **fleetTranOperatorr** has
  * *parent* **[fleetTranSecUser, fleetTranrecUser, fleetTranReaUser]**
  * *permission* **[view, create, put]**
* *role* **fleetTranManager** has
   * *parent* **fleetTranOperator**
   * *permission* **delete**
* *role* **fleetTranManager** has
   * *parent* **fleetTranOperator**
   * *permission* **delete**



[node_acl](https://github.com/optimalbits/node_acl) used as follows:
