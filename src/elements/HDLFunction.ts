import { HDLElement } from './HDLElement';
import { IHDLParameter } from './interfaces/Common';
import { IHDLFunctionInfo, IHDLFunction } from './interfaces/IHDLFunction';

/**
 * Function element in VHDL.
 */
export class HDLFunction
    extends HDLElement<IHDLFunctionInfo>
    implements IHDLFunction
{
    /**
     * @inheritdoc
     */
    get parameters(): string {
        return this._info.parameters;
    }

    /**
     * @inheritdoc
     */
    get parameterList(): IHDLParameter[] {
        return this._info.parameterList;
    }

    /**
     * @inheritdoc
     */
    get returnType(): string {
        return this._info.returnType;
    }
}
