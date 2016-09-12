insert new PermissionSetAssignment(
 PermissionSetId = [SELECT Id FROM PermissionSet WHERE Name = 'DreamHouse'].Id,
  AssigneeId = UserInfo.getUserId()
  );

