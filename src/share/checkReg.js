export const emailCheck = (email) => {
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
  
    return _reg.test(email);
  };

export const pwdReg = (pwd) => {
    let reg_pwd = /^[A-za-z0-9]{4,15}/g;

    return reg_pwd.test(pwd);
}