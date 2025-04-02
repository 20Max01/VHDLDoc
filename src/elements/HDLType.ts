import { HDLElement } from './HDLElement';
import { IHDLType, IHDLTypeInfo } from './interfaces/IHDLTypeInfo';

/**
 * Type element in VHDL.
 */
export class HDLType extends HDLElement<IHDLTypeInfo> implements IHDLType {
    /**
     * @inheritdoc
     */
    get typeExpression(): string {
        return this._info.typeExpression;
    }
}
