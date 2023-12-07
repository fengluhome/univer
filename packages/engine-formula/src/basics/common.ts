import type {
    BooleanNumber,
    ICellData,
    IRange,
    IUnitRange,
    Nullable,
    ObjectMatrix,
    ObjectMatrixPrimitiveType,
} from '@univerjs/core';

export const ERROR_VALUE_OBJECT_CLASS_TYPE = 'errorValueObject';

export const ASYNC_OBJECT_CLASS_TYPE = 'asyncObject';

export const REFERENCE_OBJECT_CLASS_TYPE = 'referenceObject';

export const VALUE_OBJECT_CLASS_TYPE = 'valueObject';

export enum BooleanValue {
    FALSE = 'FALSE',
    TRUE = 'TRUE',
}

export enum AstNodePromiseType {
    SUCCESS,
    ERROR,
}

export interface ISheetItem {
    cellData: ObjectMatrix<ICellData>;
    rowCount: number;
    columnCount: number;
}

export interface ISheetData {
    [sheetId: string]: ISheetItem;
}

/**
 * The subset of workbook data needs to be assembled into a new reference object when being passed in,
 * and then input through the FormulaCurrentConfigService.
 */
export interface IUnitData {
    [unitId: string]: ISheetData;
}

export interface IRuntimeUnitDataType {
    [unitId: string]: { [sheetId: string]: ObjectMatrix<ICellData> };
}

export interface IRuntimeOtherUnitDataType {
    [unitId: string]: { [sheetId: string]: { [formulaId: string]: ICellData } };
}

export interface IUnitSheetNameMap {
    [unitId: string]: { [sheetName: string]: string };
}

export interface IDirtyUnitSheetNameMap {
    [unitId: string]: { [sheetId: string]: Nullable<string> };
}

export interface IDirtyUnitFeatureMap {
    [unitId: string]: { [sheetId: string]: { [featureId: string]: boolean } };
}

export interface IArrayFormulaRangeType {
    [unitId: string]: { [sheetId: string]: ObjectMatrixPrimitiveType<IRange> };
}

export interface IFeatureDirtyRangeType {
    [unitId: string]: { [sheetId: string]: IRange[] };
}

export interface IArrayFormulaUnitCellType {
    [unitId: string]: { [sheetId: string]: ObjectMatrixPrimitiveType<ICellData> };
}

export interface IFormulaData {
    [unitId: string]: { [sheetId: string]: ObjectMatrixPrimitiveType<IFormulaDataItem> };
}

export interface IOtherFormulaData {
    [unitId: string]: { [subComponentId: string]: { [formulaId: string]: IFormulaDataItem } };
}

/**
 * @f  formulaString, the text string of the formula.
 * @si The formula ID can be utilized in scenarios such as copy-pasting and drag-filling to convert formulas into references, eliminating the need for recreating the formulaString.
 */
export interface IFormulaDataItem {
    f: string; // formulaString
    x?: number; // Offset from x direction
    y?: number; // Offset from y direction
    si?: string; // formulaId,
    // row: number;
    // column: number;
    // sheetId: string;
}

export interface ISuperTable {
    sheetId: string;
    hasCustomTitle: BooleanNumber;
    titleMap: Map<string, number>;
    range: IRange;
}

export enum TableOptionType {
    ALL = '#All',
    DATA = '#Data',
    HEADERS = '#Headers',
    TOTALS = '#Totals',
}

export interface IUnitExcludedCell {
    [unitId: string]: { [sheetId: string]: ObjectMatrix<boolean> };
}

export interface IFormulaDatasetConfig {
    formulaData: IFormulaData;
    arrayFormulaCellData: IArrayFormulaUnitCellType;
    forceCalculate: boolean;
    dirtyRanges: IUnitRange[];
    dirtyNameMap: IDirtyUnitSheetNameMap;
    dirtyUnitFeatureMap: IDirtyUnitFeatureMap;
    excludedCell?: IUnitExcludedCell;
}

export enum ConcatenateType {
    FRONT,
    BACK,
}