import {
    passwordIsInvalid,
    emailIsInvalid,
} from "../infra/services/authentication";

describe("Password tests battery", () => {
    test("Only numbers should result in an invalid password", () => {
        const result = passwordIsInvalid("12345678");
        expect(result).toBe(true);
    });
    test("Only lowercase letters should result in an invalid password", () => {
        const result = passwordIsInvalid("abcdefgh");
        expect(result).toBe(true);
    });
    test("Less than 8 characters should result in an invalid password", () => {
        const result = passwordIsInvalid("123abc");
        expect(result).toBe(true);
    });
    test("Without symbol should result in an invalid password", () => {
        const result = passwordIsInvalid("123abcABC");
        expect(result).toBe(true);
    });
    test("With min length, uppercase and symbol, it should be valid", () => {
        const result = passwordIsInvalid("123abcABC@@@");
        expect(result).toBe(false);
    });
});

describe("Email tests battery", () => {
    test("Without @gmail.com should result in an invalid email", () => {
        const result = emailIsInvalid("myemail");
        expect(result).toBe(true);
    });
    test("With @gmail.com should result in an valid email", () => {
        const result = emailIsInvalid("myemail@gmail.com");
        expect(result).toBe(false);
    });
});
