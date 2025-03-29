import { IPosition } from './interfaces/Common';
import { IHDLElement, IHDLElementInfo } from './interfaces/IHDLElement';

/**
 * Base implementation for all HDL elements.
 * @template T - Type of the HDL element info.
 */
export class HDLElement<T extends IHDLElementInfo> implements IHDLElement<T> {
    protected _info: T;

    /**
     * Create a new HDL element.
     * @param info Metadata about the HDL element
     */
    constructor(info: T) {
        this._info = info;
    }

    /**
     * Get the name of the HDL element.
     */
    get name(): string {
        return this._info.name ?? '';
    }

    /**
     * Get the machine-generated description of the HDL element.
     */
    get description(): string | undefined {
        return this._info.description;
    }

    /**
     * Get the code comment associated with the HDL element.
     */
    get comment(): string | undefined {
        return this._info.comment;
    }

    /**
     * Get the position of the HDL element in the source code.
     */
    get position(): IPosition {
        return this._info.position;
    }

    /**
     * Get the full metadata object.
     */
    get info(): T {
        return this._info;
    }
}
