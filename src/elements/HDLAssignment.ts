import { HDLElement } from './HDLElement';
import {
    IHDLAssignment,
    IHDLAssignmentInfo,
} from './interfaces/IHDLAssignment';

/**
 * Concurrent signal assignment in VHDL.
 */
export class HDLAssignment
    extends HDLElement<IHDLAssignmentInfo>
    implements IHDLAssignment
{
    /**
     * @inheritdoc
     */
    get target(): string {
        return this._info.target;
    }

    /**
     * @inheritdoc
     */
    get expression(): string {
        return this._info.expression;
    }
}
