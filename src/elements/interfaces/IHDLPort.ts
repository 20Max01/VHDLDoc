import { IHDLParameter, IVirtualBus } from './Common';
import { IHDLElementInfo } from './IHDLElement';

/**
 * Interface for port metadata.
 */
export interface IHDLPortInfo extends IHDLElementInfo {
    /**
     * List of ports.
     */
    portList?: IHDLParameter[];

    /**
     * List of virtual buses.
     */
    virtualBusList?: IVirtualBus[];
}

/**
 * Interface for port elements.
 */
export interface IHDLPort {
    /**
     * Get the port list of the element.
     */
    get portList(): IHDLParameter[] | undefined;

    /**
     * Get the virtual bus list of the element.
     */
    get virtualBusList(): IVirtualBus[] | undefined;
}
