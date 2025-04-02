import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for variable metadata.
 */
export interface IHDLVariableInfo extends IHDLElementInfo {
    /**
     * Type of the variable.
     * e.g. "integer", "std_logic".
     */
    type: string;

    /**
     * Default value of the variable.
     */
    defaultValue?: string;
}

/**
 * Interface for variable elements.
 */
export interface IHDLVariable extends IHDLElement<IHDLVariableInfo> {
    /**
     * Get the type of the variable.
     */
    get type(): string;

    /**
     * Get the default value of the variable.
     */
    get defaultValue(): string | undefined;
}
