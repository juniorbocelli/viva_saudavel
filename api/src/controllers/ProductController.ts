import { Request, Response } from 'express';
import * as path from 'path';
import sharp from 'sharp';

import Product from '../models/entities/Product';
import DAOProduct from '../data/persistence/mongo/dao/DAOProduct';
import UCManagerProduct from '../models/useCases/UCManagerProduct';
import ManageImages, { UploadedFile } from './utils/ManageImages';

class ProductController {
  static async new(req: Request, res: Response) {
    const daoProduct = new DAOProduct;
    const manageImages = new ManageImages();
    const ucManagerProduct = new UCManagerProduct(daoProduct);

    let uploadResult;
    let uploadedFiles: Array<UploadedFile>;

    try {
      try {
        uploadResult = await manageImages.handleArrayUploadFile(req, res);
      } catch (e) {
        return res.status(200).json({ error: [e.message] });
      };

      const newProduct = Product.getFromObject(JSON.parse(uploadResult.body.product) as Product);

      uploadedFiles = uploadResult.files;

      uploadedFiles.forEach(file => {
        newProduct.images.push(`${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER?.replace(".", "")}/${file.filename}`);
      });

      const firstImage = uploadedFiles[0].filename;
      const thumbName = `${firstImage.split('.')[0]}_thumb.${firstImage.split('.')[1]}`;
      const thumbPath = path.resolve(manageImages.uploadFilePath, thumbName);

      sharp(path.resolve(manageImages.uploadFilePath, firstImage))
        .resize(400, 400)
        .toFile(thumbPath, function (error) {
          if (error)
            throw new Error(`Ocorreu um erro ao tentar criar miniatura da imagem principal: ${error}`);
        });

      newProduct.thumb = `${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER?.replace(".", "")}/${firstImage.split('.')[0]}_thumb.${firstImage.split('.')[1]}`;

      res.status(200).json({ product: await ucManagerProduct.new(newProduct) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async get(req: Request, res: Response) {
    const daoProduct = new DAOProduct();
    const ucManagerProduct = new UCManagerProduct(daoProduct);

    try {
      const { id } = req.params;

      res.status(200).json({ product: await ucManagerProduct.get(id) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async update(req: Request, res: Response) {
    const daoProduct = new DAOProduct();
    const ucManagerProduct = new UCManagerProduct(daoProduct);
    const manageImages = new ManageImages();

    let uploadResult;
    let uploadedFiles: Array<UploadedFile>;

    try {
      const { id } = req.params;
      try {
        uploadResult = await manageImages.handleArrayUploadFile(req, res);
      } catch (e) {
        return res.status(200).json({ error: [e.message] });
      };

      // Get registered and updated products
      const previousProduct = await ucManagerProduct.get(id);

      if (previousProduct === null)
        throw new Error("Produto inválido");
        
      const receivedProduct = Product.getFromObject(JSON.parse(uploadResult.body.product) as Product);
      receivedProduct.id = previousProduct.id;

      // Delete removed images and return the list of remaining images
      const remainingImages = await manageImages.deleteRemovedImages(previousProduct.images, receivedProduct.images);

      // Delete thum if necessary and return thumb name or null (if thumb was deletede)
      const currentThumb = await manageImages.syncThumb(remainingImages, previousProduct.thumb as string);

      uploadedFiles = uploadResult.files;

      // New images are pushed after of already registered
      receivedProduct.images = [];

      remainingImages.forEach(image => {
        receivedProduct.images.push(`${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER?.replace(".", "")}/${image}`);
      });

      // Register new images
      uploadedFiles.forEach(file => {
        receivedProduct.images.push(`${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER?.replace(".", "")}/${file.filename}`);
      });

      // If currentThumb = null, else define new thumb
      if (currentThumb === null) {
        receivedProduct.thumb = null;

        let firstImage = `${receivedProduct.images[0].split('/').at(-1)}`;
        let thumbName = `${firstImage.split('.')[0]}_thumb.${firstImage.split('.')[1]}`;

        // res.status(200).json({ caralho: thumbName })
        // return;

        sharp(`${manageImages.uploadFilePath}/${firstImage}`)
          .resize(400, 400)
          .toFile(`${manageImages.uploadFilePath}/${thumbName}`, function (error) {
            if (error)
              throw new Error(`Ocorreu um erro ao tentar criar miniatura da imagem principal: ${error}`);
          });

        receivedProduct.thumb = `${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER?.replace(".", "")}/${thumbName}`;
      };

      res.status(200).json({ product: await ucManagerProduct.update(receivedProduct) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAll(req: Request, res: Response) {
    const daoProduct = new DAOProduct();
    const ucManagerProduct = new UCManagerProduct(daoProduct);

    try {
      res.status(200).json({ products: await ucManagerProduct.getAll() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getByFilter(req: Request, res: Response) {
    const daoProduct = new DAOProduct();
    const ucManagerProduct = new UCManagerProduct(daoProduct);

    try {
      const params = req.query;
      const filterToSearch: Object = {};

      Object.keys(params).forEach(key => {
        Object.defineProperty(filterToSearch, `filters.${key}`, { value: params[key], enumerable: true });
      });

      res.status(200).json({ products: await ucManagerProduct.getByFilter(filterToSearch) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ProductController;