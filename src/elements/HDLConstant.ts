import { HDLElement } from './HDLElement';
import { IHDLConstantInfo, IHDLConstant } from './interfaces/IHDLConstant';

/**
 * Constant element in VHDL.
 */
export class HDLConstant
    extends HDLElement<IHDLConstantInfo>
    implements IHDLConstant
{
    /**
     * @inheritdoc
     */
    get type(): string {
        return this._info.type;
    }

    /**
     * @inheritdoc
     */
    get defaultValue(): string | undefined {
        return this._info.defaultValue;
    }
}
