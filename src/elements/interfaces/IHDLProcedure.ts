import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for procedure metadata.
 */
export interface IHDLProcedureInfo extends IHDLElementInfo {
    /**
     * Parameter list as string.
     */
    parameters: string;
}

/**
 * Interface for procedure elements.
 */
export interface IHDLProcedure extends IHDLElement<IHDLProcedureInfo> {
    /**
     * Get the parameter list of the procedure.
     */
    get parameters(): string;
}
