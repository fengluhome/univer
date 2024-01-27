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

import type { ArrayValueObject } from '../../..';
import { ErrorType } from '../../../basics/error-type';
import type { BaseValueObject } from '../../../engine/value-object/base-value-object';
import { ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { BaseFunction } from '../../base-function';

export class Hlookup extends BaseFunction {
    override calculate(
        lookupValue: BaseValueObject,
        tableArray: BaseValueObject,
        rowIndexNum: BaseValueObject,
        rangeLookup?: BaseValueObject
    ) {
        if (lookupValue.isError()) {
            return lookupValue;
        }

        if (tableArray.isError()) {
            return new ErrorValueObject(ErrorType.REF);
        }

        if (!tableArray.isArray()) {
            return new ErrorValueObject(ErrorType.VALUE);
        }

        if (rowIndexNum.isError()) {
            return new ErrorValueObject(ErrorType.NA);
        }

        if (rangeLookup?.isError()) {
            return new ErrorValueObject(ErrorType.NA);
        }

        const rangeLookupValue = this.getZeroOrOneByOneDefault(rangeLookup);

        if (rangeLookupValue == null) {
            return new ErrorValueObject(ErrorType.VALUE);
        }

        const rowIndexNumValue = this.getIndexNumValue(rowIndexNum);

        if (rowIndexNumValue instanceof ErrorValueObject) {
            return rowIndexNumValue;
        }

        const searchArray = (tableArray as ArrayValueObject).slice([0, 1]);

        const resultArray = (tableArray as ArrayValueObject).slice([rowIndexNumValue - 1, rowIndexNumValue]);

        if (searchArray == null || resultArray == null) {
            return new ErrorValueObject(ErrorType.VALUE);
        }

        if (lookupValue.isArray()) {
            return lookupValue.map((value) => {
                return this._handleSingleObject(value, searchArray, resultArray, rangeLookupValue);
            });
        }

        return this._handleSingleObject(lookupValue, searchArray, resultArray, rangeLookupValue);
    }

    private _handleSingleObject(
        value: BaseValueObject,
        searchArray: ArrayValueObject,
        resultArray: ArrayValueObject,
        rangeLookupValue: number
    ) {
        if (rangeLookupValue === 0) {
            return this.equalSearch(value, searchArray, resultArray);
        }

        return this.binarySearch(value, searchArray, resultArray);
    }
}
