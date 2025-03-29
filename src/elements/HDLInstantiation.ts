import { HDLElement } from './HDLElement';
import {
    IHDLInstantiationInfo,
    IHDLInstantiation,
} from './interfaces/IHDLInstantiation';

/**
 * Instantiation element in VHDL.
 */
export class Instantiation
    extends HDLElement<IHDLInstantiationInfo>
    implements IHDLInstantiation
{
    /**
     * @inheritdoc
     */
    get instanceType(): string {
        return this._info.instanceType;
    }
}
