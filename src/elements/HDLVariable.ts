import { HDLElement } from './HDLElement';
import { IHDLVariableInfo, IHDLVariable } from './interfaces/IHDLVariable';

/**
 * Variable element in VHDL.
 */
export class HDLVariable
    extends HDLElement<IHDLVariableInfo>
    implements IHDLVariable
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
