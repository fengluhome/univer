/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, expect, it } from 'vitest';

import { ErrorType } from '@univerjs/engine-formula';
import { extractFormulaError } from '../utils';

describe('Test utils', () => {
    it('Function extractFormulaError', () => {
        expect(extractFormulaError({ v: ErrorType.DIV_BY_ZERO })).toBe(ErrorType.DIV_BY_ZERO);
        expect(extractFormulaError({ v: ErrorType.NAME })).toBe(ErrorType.NAME);
        expect(extractFormulaError({ v: ErrorType.VALUE })).toBe(ErrorType.VALUE);
        expect(extractFormulaError({ v: ErrorType.NUM })).toBe(ErrorType.NUM);
        expect(extractFormulaError({ v: ErrorType.NA })).toBe(ErrorType.NA);
        expect(extractFormulaError({ v: ErrorType.CYCLE })).toBe(ErrorType.CYCLE);
        expect(extractFormulaError({ v: ErrorType.REF })).toBe(ErrorType.REF);
        expect(extractFormulaError({ v: ErrorType.SPILL })).toBe(ErrorType.SPILL);
        expect(extractFormulaError({ v: ErrorType.CALC })).toBe(ErrorType.CALC);
        expect(extractFormulaError({ v: ErrorType.ERROR })).toBe(ErrorType.ERROR);
        expect(extractFormulaError({ v: ErrorType.CONNECT })).toBe(ErrorType.CONNECT);
        expect(extractFormulaError({ v: ErrorType.NULL })).toBe(ErrorType.NULL);

        expect(extractFormulaError({ f: '=SUM(1)' })).toBeNull();
        expect(extractFormulaError({ si: 'id1' })).toBeNull();
        expect(extractFormulaError({ p: null })).toBeNull();
        expect(extractFormulaError({ v: 'test' })).toBeNull();
        expect(extractFormulaError({ v: 1 })).toBeNull();
        expect(extractFormulaError({})).toBeNull();
        expect(extractFormulaError(null)).toBeNull();
        expect(extractFormulaError(undefined)).toBeNull();
    });
});
