import { HDLElement } from './HDLElement';
import { IHDLSignalInfo, IHDLSignal } from './interfaces/IHDLSignal';

/**
 * Signal element in VHDL.
 */
export class HDLSignal
    extends HDLElement<IHDLSignalInfo>
    implements IHDLSignal
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
