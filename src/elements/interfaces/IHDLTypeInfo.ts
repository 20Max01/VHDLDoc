import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for type metadata.
 */
export interface IHDLTypeInfo extends IHDLElementInfo {
    /**
     * Full VHDL array/type expression.
     */
    typeExpression: string;
}

/**
 * Interface for type elements.
 */
export interface IHDLType extends IHDLElement<IHDLTypeInfo> {
    /**
     * Get the full VHDL type expression.
     */
    get typeExpression(): string;
}
