
import { Request, Response, NextFunction } from "express";
import * as itemService from "../services/item";
import type { Item } from "../models/item";


export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Item[] = await itemService.getAllItems();

        res.status(200).json(
            items
        );
    } catch (error) {
        next(error);
    }
};



export const createItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const item: Item = await itemService.createItem(req.body);

        res.status(201).json(
            {
                message: 'Item created susscssfully',
                item: item
            }
        );
    } catch (error) {
        next(error);
    }
};


export const updateItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Item = await itemService.updateItem(
            req.params.id,
            req.body
        );

        res.status(200).json(
            {
                message: 'Updated successfully',
                item: updated
            }
        );
    } catch (error) {
        next(error);
    }
};


export const deleteItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await itemService.deleteItem(req.params.id);
        res.status(200).json({
            message: 'Item deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
