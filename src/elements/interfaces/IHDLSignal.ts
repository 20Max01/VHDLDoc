import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for signal metadata.
 */
export interface IHDLSignalInfo extends IHDLElementInfo {
    /**
     * Type of the signal.
     * e.g. "std_logic", "std_logic_vector(7 downto 0)".
     */
    type: string;

    /**
     * Default value of the signal.
     */
    defaultValue?: string;
}

/**
 * Interface for signal elements.
 */
export interface IHDLSignal extends IHDLElement<IHDLSignalInfo> {
    /**
     * Get the type of the signal.
     * e.g. "std_logic", "std_logic_vector(7 downto 0)".
     */
    get type(): string;

    /**
     * Get the default value of the signal.
     */
    get defaultValue(): string | undefined;
}
