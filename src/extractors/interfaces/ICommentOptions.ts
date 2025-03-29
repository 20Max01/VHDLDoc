/**
 * Options for how to treat HDL comments.
 */
export interface ICommentOptions {
    /**
     * Line must start with this prefix (after '--').
     * Example: '@' to accept '--@ comment'.
     */
    markerPrefix?: string;

    /**
     * If true, strip the marker prefix and one space (if present).
     * Example: '--@ Hello' becomes 'Hello'
     */
    stripPrefix?: boolean;
}
