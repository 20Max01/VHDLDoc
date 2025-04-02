import { IHDLParameter } from './Common';
import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for procedure metadata.
 */
export interface IHDLProcedureInfo extends IHDLElementInfo {
    /**
     * Parameter list as string.
     */
    parameters: string;

    /**
     * Parameter list as structured array.
     */
    parameterList: IHDLParameter[];
}

/**
 * Interface for procedure elements.
 */
export interface IHDLProcedure extends IHDLElement<IHDLProcedureInfo> {
    /**
     * Get the parameter list of the procedure.
     */
    get parameters(): string;

    /**
     * Get the parameter list of the procedure as structured array.
     */
    get parameterList(): IHDLParameter[];
}
