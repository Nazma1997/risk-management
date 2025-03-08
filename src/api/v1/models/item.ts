/**
 * @interface Item
 * @description Represents an item object.
 */
export type Item = {
    id: string;
    name: string;
    description: string;
    price?: number;
    created_at: Date;
    update_at: Date;
    is_reviewed: Boolean;
    is_approved: Boolean
};
