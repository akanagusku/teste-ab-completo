export declare interface IComponentHost {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    hidden: boolean;
    setComponents(components: []): void;
    setHidden(isHidden);
}
