import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for process metadata.
 */
export interface IHDLProcessInfo extends IHDLElementInfo {
    /**
     * Sensitivity list of the process.
     */
    sensitivityList?: string[];

    /**
     * Type of process (optional: FSM, combinatorial, etc.).
     */
    processType?: string;
}

/**
 * Interface for process elements.
 */
export interface IHDLProcess extends IHDLElement<IHDLProcessInfo> {
    /**
     * Get the sensitivity list of the process.
     * e.g. "clk", "reset".
     */
    get sensitivityList(): string[] | undefined;

    /**
     * Get the type of the process.
     * e.g. "FSM", "combinatorial", etc.
     */
    get processType(): string | undefined;
}
