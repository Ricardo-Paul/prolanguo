import { AbstractPreparer } from "./AbstractPreparer";
import * as Joi from "joi";

describe("Abstract Preparer", () => {
  describe("test starts after creating an AbstractPreparer child class", () => {
    interface Me {
      name: string,
      prof: string
    }
    class MePreparer extends AbstractPreparer<Me> {
      public canPrepareMe(data: any): boolean{
        return this.isDataValid(data, Joi.object({
          name: Joi.string(),
          prof: Joi.string()
        }))
      }
    };

    test("it returns true for correct input", () => {
      const me = new MePreparer().canPrepareMe({
        name: "ricardo",
        prof: "developer"
      });

      expect(me).toBeTrue();
    });

    test("it return false when value is missing", () => {
      const me = new MePreparer().canPrepareMe({
        name: "ricardo"
      });

      expect(me).toBeFalse();
    });
  })
});