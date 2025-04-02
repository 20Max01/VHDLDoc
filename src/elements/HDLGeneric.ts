import { HDLElement } from './HDLElement';
import { IHDLParameter } from './interfaces/Common';
import { IHDLGenericInfo, IHDLGeneric } from './interfaces/IHDLGeneric';

/**
 * Generic element in VHDL.
 */
export class HDLGeneric
    extends HDLElement<IHDLGenericInfo>
    implements IHDLGeneric
{
    /**
     * @inheritdoc
     */
    get genericList(): IHDLParameter[] | undefined {
        return this._info.genericList;
    }
}
