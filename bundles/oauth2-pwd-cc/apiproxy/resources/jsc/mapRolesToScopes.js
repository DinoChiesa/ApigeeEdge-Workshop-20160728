// mapGroupsToScopes.js
// ------------------------------------------------------------------
//
// Map a set of user groups to a list of scopes. This would be
// better implemented as a micro-service, but this mock will serve
// the purpose for the demonstration.
//
// last saved: <2016-August-01 13:14:08>

var rolesVar = 'user_roles';
var scopesVar = 'user_scopes';
var roles = context.getVariable(rolesVar).split(',');
var result = [];

// This mapping could be quite complicated, but
// as it is now, it's just a 1:1 direct mapping.
var roleToScopeMap = {
      'read' : [ 'read' ],
      'write' : [ 'write' ],
      'delete' : [ 'delete' ]
    };

roles.forEach(function(role){
  if (roleToScopeMap.hasOwnProperty(role)) {
    roleToScopeMap[role].forEach(function(scope){
      result.push(scope);
    });
  }
});

context.setVariable(scopesVar, result.sort().join(' '));
