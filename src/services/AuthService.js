export const loginService = async (instance, username, password) => {
  const { data } = await instance.post("login", {
    username,
    password,
  });
  return data;
};

export const registerService = async (instance, username, password) => {
  const { data } = await instance.post("register", {
    username,
    password,
  });
  return data;
};

export const changePasswordService = async (
  instance,
  oldPassword,
  newPassword
) => {
  const { data } = await instance.post("users/change-password", {
    oldPassword,
    newPassword,
  });
  return data;
};
