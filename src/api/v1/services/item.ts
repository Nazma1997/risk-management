
import { Item } from "../models/item";
import {
    getItems,
    createItems,
    updateItems,
    deleteItems
} from "../repositories/firestore";

const COLLECTION = "loans";

export const getAllItems = async (): Promise<Item[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getItems(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Item;
    });
};



export const createItem = async (item: Partial<Item>): Promise<Item> => {
    const id: string = await createItems(COLLECTION, item);
    return { id, ...item } as Item;
};


export const updateItem = async (
    id: string,
    item: Partial<Item>
): Promise<Item> => {
    await updateItems(COLLECTION, id, item);
    return { id, ...item } as Item;
};


export const deleteItem = async (id: string): Promise<void> => {
    await deleteItems(COLLECTION, id);
};
