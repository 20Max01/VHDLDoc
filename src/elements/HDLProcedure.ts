import { HDLElement } from './HDLElement';
import { IHDLParameter } from './interfaces/Common';
import { IHDLProcedureInfo, IHDLProcedure } from './interfaces/IHDLProcedure';

/**
 * Procedure element in VHDL.
 */
export class HDLProcedure
    extends HDLElement<IHDLProcedureInfo>
    implements IHDLProcedure
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
}
