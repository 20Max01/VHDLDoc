import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for concurrent signal assignment metadata.
 */
export interface IHDLAssignmentInfo extends IHDLElementInfo {
    /** Name of the signal being assigned. */
    target: string;

    /** The expression assigned to the signal. */
    expression: string;
}

/**
 * Interface for concurrent signal assignment elements.
 */
export interface IHDLAssignment extends IHDLElement<IHDLAssignmentInfo> {
    get target(): string;
    get expression(): string;
}
