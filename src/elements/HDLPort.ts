import { HDLElement } from './HDLElement';
import { IHDLParameter, IVirtualBus } from './interfaces/Common';
import { IHDLPortInfo, IHDLPort } from './interfaces/IHDLPort';

/**
 * Port element for HDL
 */
export class HDLPort extends HDLElement<IHDLPortInfo> implements IHDLPort {
    /**
     * @inheritdoc
     */
    get portList(): IHDLParameter[] | undefined {
        return this._info.portList;
    }

    /**
     * @inheritdoc
     */
    get virtualBusList(): IVirtualBus[] | undefined {
        return this._info.virtualBusList;
    }
}
