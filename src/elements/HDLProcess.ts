import { HDLElement } from './HDLElement';
import { IHDLProcessInfo, IHDLProcess } from './interfaces/IHDLProcess';

/**
 * Process element in VHDL.
 */
export class HDLProcess
    extends HDLElement<IHDLProcessInfo>
    implements IHDLProcess
{
    /**
     * @inheritdoc
     */
    get sensitivityList(): string[] | undefined {
        return this._info.sensitivityList;
    }

    /**
     * @inheritdoc
     */
    get processType(): string | undefined {
        return this._info.processType;
    }
}
