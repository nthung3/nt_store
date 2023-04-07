import express from 'express';
import CategoryService from './category.service.js';

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        return res.status(201).json(await CategoryService.createCategory({ name }));
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};

export const ListCategory = async (req, res) => {
    try {
        return res.status(200).json({ data: await CategoryService.listCategory() });
    } catch (error) {
        res.status(500).json({ message: '500 Internal Server Error' });
        console.log(error);
    }
};
