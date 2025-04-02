import { IHDLParameter } from './Common';
import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for function metadata.
 */
export interface IHDLFunctionInfo extends IHDLElementInfo {
    /**
     * Parameter list as string.
     */
    parameters: string;

    /**
     * Structured list of parameters.
     */
    parameterList: IHDLParameter[];

    /**
     * Return type.
     */
    returnType: string;
}

/**
 * Interface for function elements.
 */
export interface IHDLFunction extends IHDLElement<IHDLFunctionInfo> {
    /**
     * Get the parameter list of the function.
     */
    get parameters(): string;

    /**
     * Get structured parameter list.
     */
    get parameterList(): IHDLParameter[];

    /**
     * Get the return type of the function.
     */
    get returnType(): string;
}
