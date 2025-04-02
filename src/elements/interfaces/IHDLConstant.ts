import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for constant metadata.
 */
export interface IHDLConstantInfo extends IHDLElementInfo {
    /**
     * Type of the constant.
     * e.g. "integer", "std_logic".
     */
    type: string;

    /**
     * Default value of the constant.
     */
    defaultValue?: string;
}

/**
 * Interface for constant elements.
 */
export interface IHDLConstant extends IHDLElement<IHDLConstantInfo> {
    /**
     * Get the type of the constant.
     */
    get type(): string;

    /**
     * Get the default value of the constant.
     */
    get defaultValue(): string | undefined;
}
