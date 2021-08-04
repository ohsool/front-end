export const emailCheck = (email) => {
  
    let _reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  
    return _reg.test(email);
  };

export const pwdReg = (pwd) => {
    let reg_pwd = /^[A-za-z0-9]{4,15}/g;

    return reg_pwd.test(pwd);
}