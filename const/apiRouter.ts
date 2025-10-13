export const API_ROUTE = {
  LOGIN: "/api/v1/login/access-token",
  REGISTER:"/api/v1/users/signup",
    SENDEMAIL: "/api/v1/password-recovery/{email}",
    LOGIN_USERNAME:"/api/v1/users/me",
    GET_LIST_USER:"/api/v1/users/", 
    CREATE_USERNAME:"/api/v1/users",
  
    //Roles
    GET_LIST_ROLES:"/api/v1/roles/",
    CREATE_ROLES:"/api/v1/roles",
    UPDATE_ROLES:"/api/v1/roles/{role_id}",
    DELETE_ROLES:"/api/v1/roles/{role_id}",
    

  //System
  GET_LIST_SYSTEM:"/api/v1/system/",
  CREATE_SYSTEM:"/api/v1/system",
  UPDATE_SYSTEM:"/api/v1/system/{system_id}",
  DELETE_SYSTEM:"/api/v1/system/{system_id}",

  //Permission
  GET_LIST_PERMISSION:"/api/v1/permission/",
  CREATE_PERMISSION:"/api/v1/permission",
  UPDATE_PERMISSION:"/api/v1/permission/{permission_id}",
  DELETE_PERMISSION:"/api/v1/permission/{permission_id}",
    
  };
