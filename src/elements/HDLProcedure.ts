import { HDLElement } from './HDLElement';
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
}
