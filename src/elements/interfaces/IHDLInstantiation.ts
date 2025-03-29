import { IHDLElement, IHDLElementInfo } from './IHDLElement';

/**
 * Interface for component instantiation metadata.
 */
export interface IHDLInstantiationInfo extends IHDLElementInfo {
    /**
     * Type of the instantiated.
     * e.g. "my_component", "my_package.my_component".
     */
    instanceType: string;
}

/**
 * Interface for instantiation elements.
 */
export interface IHDLInstantiation extends IHDLElement<IHDLInstantiationInfo> {
    /**
     * Get the type of the instantiated element.
     */
    get instanceType(): string;
}
