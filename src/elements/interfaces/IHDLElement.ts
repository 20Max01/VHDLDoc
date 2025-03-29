import { IPosition } from './Common';

/**
 * Shared metadata for any HDL element.
 */
export interface IHDLElementInfo {
    /**
     * Name of the HDL element.
     * e.g. "my_signal", "my_function", "my_process".
     */
    name?: string;

    /**
     * Machine generated description of the element.
     */
    description?: string;

    /**
     * Code comment associated with the HDL element.
     */
    comment?: string;

    /**
     * Position of the HDL element in the source code.
     */
    position: IPosition;
}

/**
 * Static interface for all HDL elements.
 * @template T - Type of the HDL element info.
 */
export interface IHDLElement_<T extends IHDLElementInfo> {
    new (info: T): IHDLElement<T>;
}

/**
 * Interface for all HDL elements.
 * @template T - Type of the HDL element info.
 */
export interface IHDLElement<T extends IHDLElementInfo> {
    /**
     * Get the name of the HDL element.
     */
    get name(): string;

    /**
     * Get the machine generated description of the HDL element.
     */
    get description(): string | undefined;

    /**
     * Get the code comment associated with the HDL element.
     */
    get comment(): string | undefined;

    /**
     * Get the position of the HDL element in the source code.
     */
    get position(): IPosition;

    /**
     * Get the full metadata object.
     */
    get info(): T;
}
