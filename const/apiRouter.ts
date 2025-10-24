import { get } from "http";

export const API_ROUTE = {
  LOGIN: "/api/v1/login/access-token",
  REGISTER:"/api/v1/users/signup",
    SENDEMAIL: "/api/v1/password-recovery/{email}",
    LOGIN_USERNAME:"/api/v1/users/me",
    GET_LIST_USER:"/api/v1/users/", 
    CREATE_USERNAME:"/api/v1/users",
    UPDATE_USERNAME:"/api/v1/users/{user_id}",
    DELETE_USERNAME:"/api/v1/users/{user_id}",

  
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
  UPDATE_PERMISSION:"/api/v1/permission/{Permission_id}",
  DELETE_PERMISSION:"/api/v1/permission/{Permission_id}",

    //Projects
    GET_LIST_PROJECTS:"/api/v1/projects/",
    CREATE_PROJECTS:"/api/v1/projects/",
    UPDATE_PROJECTS:"/api/v1/projects/{project_id}",
    DELETE_PROJECTS:"/api/v1/projects/{project_id}",

//RolePermission
    GET_LIST_ROLEPERMISSION:"/api/v1/RolePermission/permission",
    CREATE_ROLEPERMISSION:"/api/v1/RolePermission/permission",
    UPDATE_ROLEPERMISSION:"/api/v1/RolePermission/permission/{role_permission_id}",
    DELETE_ROLEPERMISSION:"/api/v1/RolePermission/permission/{role_permission_id}",

    //SystemPermission

    GET_LIST_SYSTEMPERMISSION:"/api/v1/SystemPermission/permission",
    CREATE_SYSTEMPERMISSION:"/api/v1/SystemPermission/permission",
    UPDATE_SYSTEMPERMISSION:"/api/v1/SystemPermission/permission/{system_permission_id}",
    DELETE_SYSTEMPERMISSION:"/api/v1/SystemPermission/permission/{system_permission_id}",
  
  
    //UserProjectRole
    GET_LIST_USERPROJECTROLE:"/api/v1/UserProjectRole/assignments",
    CREATE_USERPROJECTROLE:"/api/v1/UserProjectRole/{project_id}",
   DELETE_USERPROJECTROLE:"/api/v1/UserProjectRole/{user_project_role_id}",
    UPDATE_USERPROJECTROLE:"/api/v1/UserProjectRole/{user_id}/{project_id}/{old_role_id}",

///Attributes
    GET_LIST_ATTRIBUTES:"/api/v1/attributes/",
    CREATE_ATTRIBUTES:"/api/v1/attributes/",
    UPDATE_ATTRIBUTES:"/api/v1/attributes/{attribute_id}",
    DELETE_ATTRIBUTES:"/api/v1/attributes/{attribute_id}",

///ProjectTemplates
GET_LIST_PROJECTTEMPLATES:"/api/v1/project_templates/",
CREATE_PROJECTTEMPLATES:"/api/v1/project_templates/",
UPDATE_PROJECTTEMPLATES:"/api/v1/project_templates/{template_id}",
DELETE_PROJECTTEMPLATES:"/api/v1/project_templates/{template_id}",


///TemplateAttributesLink

GET_LIST_TEMPLATEATTRIBUTESLINK:"/api/v1/template_attributes/by-template/{template_id}",
CREATE_TEMPLATEATTRIBUTESLINK:"/api/v1/template_attributes/",
UPDATE_TEMPLATEATTRIBUTESLINK:"/api/v1/template_attributes/{link_id}",
DELETE_TEMPLATEATTRIBUTESLINK:"/api/v1/template_attributes/{link_id}",

///NodeAttribute
CREATE_NODEATTRIBUTE:"/api/v1/node_attribute/filter",

//filter





}
