import "jest";
import { generateEmail } from "../utils/generateEmail";
import { generatePassword } from "../utils/generatePassword";
import { Signup } from "../utils/sign-up";


describe('it signup users successfully', () => {
  const email = generateEmail();
  const password = generatePassword();

  it('returns user data', async () => {
    const user = await Signup(email, password);
    console.log("New User :", user.data);
    expect(user.data).toBeDefined()
  });
})