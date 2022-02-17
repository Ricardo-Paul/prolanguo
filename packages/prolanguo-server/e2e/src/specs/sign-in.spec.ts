import "jest";
import { generateEmail } from "../utils/generateEmail";
import { generatePassword } from "../utils/generatePassword";
import { Signin } from "../utils/sign-in";
import { Signup } from "../utils/sign-up";


describe ('tests sign-in controller, /sigin-in', ():void => {
  let email = "";
  let password  = "";
  describe('test starts after signin up', () => {
    beforeEach(async (): Promise<void> => {
      email = generateEmail();
      password = generatePassword();
      await Signup(email, password);
    });

    it('sign in user successfully', async (): Promise<void> => {
      const user =  await Signin(email, password);
      console.log("TEST SIGNIN:", user.data);
      expect(user.data).toBeDefined()
    })
  })
});

