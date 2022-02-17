import { generateEmail } from "../utils/generateEmail";
import { generatePassword } from "../utils/generatePassword";
import { signup } from "../utils/sign-up";
import { stubCurrentTime } from "../utils/stubCurrentTime";

describe('tests upload-vocabularies controller, /upload-vocabularies', () => {
    describe("Tests start after signing up and retrieve access token", () => {
        let resetCurrentTime: () => void;
        let accessToken: string;
        let email: string;
        let password: string;
        let posixTime = 1645056178765;

        beforeEach(async () => {
            // 'Wed Feb 16 2022 19:02:58 GMT-0500 (Eastern Standard Time)' Equivalent to posix time passed / new Date(posixTime)
            resetCurrentTime = stubCurrentTime(posixTime);
            email = generateEmail();
            password = generatePassword();
            const response = await signup(email, password);
            accessToken = (response.data as any).accessToken;
            console.log("Signup succeeds :", accessToken);
        });

        afterEach(() => {
            resetCurrentTime();
        });

        test("it makes ensure time is mocked correctly", () => {
            expect(
                new Date(posixTime).toString()
            ).toBe(
                'Wed Feb 16 2022 19:02:58 GMT-0500 (Eastern Standard Time)'
            );
        })
    })
})