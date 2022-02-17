import "jest";
import { generateEmail } from "../utils/generateEmail";
import { generatePassword } from "../utils/generatePassword";
import { signin } from "../utils/sign-in";
import { signup } from "../utils/sign-up";

describe ('tests sign-in controller, /sigin-in', ():void => {
  let email: string = "";
  let password: string  = "";
  describe('test starts after signin up', () => {
    beforeEach(async (): Promise<void> => {
      email = generateEmail();
      password = generatePassword();
      await signup(email, password);
    });

    it('sign in user successfully', async (): Promise<void> => {
      const user =  await signin(email, password);
      console.log("TEST SIGNIN:", user.data);
      expect(user.data).toBeDefined()
    })
  })
});

