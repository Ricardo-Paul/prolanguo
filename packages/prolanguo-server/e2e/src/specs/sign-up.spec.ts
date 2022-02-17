import "jest";
import { generateEmail } from "../utils/generateEmail";
import { generatePassword } from "../utils/generatePassword";
import { signup } from "../utils/sign-up";

describe('tests sign-up controller, /sigin-up', () => {
  const email = generateEmail();
  const password = generatePassword();

  it('returns user data', async () => {
    const user = await signup(email, password);
    console.log("New User :", user.data);
    expect(user.data).toBeDefined()
  });
})
