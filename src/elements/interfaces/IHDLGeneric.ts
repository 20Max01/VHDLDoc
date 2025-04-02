import { IHDLParameter } from './Common';
import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for process metadata.
 */
export interface IHDLGenericInfo extends IHDLElementInfo {
    /**
     * List of generics.
     */
    genericList?: IHDLParameter[];
}

/**
 * Interface for process elements.
 */
export interface IHDLGeneric extends IHDLElement<IHDLGenericInfo> {
    /**
     * Get the generic list of the element.
     */
    get genericList(): IHDLParameter[] | undefined;
}
