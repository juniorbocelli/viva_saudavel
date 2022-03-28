/**
* Formulário com dados do usuário logado
*/
export type UserFormData = {
    firstName: string;
    lastName: string;
    username: string;
    newEmail: string;
    newPassword: string;
  };
  
  export type UserDataSend = {
    new_email: string;
    new_password: string;
  };