import { changeUnits } from "./index";
import {CHANGE_UNITS} from "./types";


describe('changeUnits', () => {
    it('has the correct type', () => {
        const action = changeUnits();

        expect(action.type).toEqual(CHANGE_UNITS);
    });

    it('has the correct payload', () => {
        const action = changeUnits('metric');

        expect(action.payload).toEqual({'units':'metric'});
    });
});