export async function emailValidation(email: string): Promise<boolean> {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
export async function passwordValidation(password: string): Promise<boolean> {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return passwordRegex.test(password);
}
export async function phoneValidation(phone: string): Promise<boolean> {
  const pattern = /^(?:\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
  return pattern.test(phone);
}
