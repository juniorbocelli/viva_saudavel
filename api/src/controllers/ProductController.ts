import { Request, Response } from 'express';
import * as path from 'path';
import sharp from 'sharp';

import Product from '../models/entities/Product';
import DAOProduct from '../persistence/mongo/dao/DAOProduct';
import UCManagerProduct from '../models/useCases/UCManagerProduct';
import UploadImages, { UploadedFile } from './utils/UploadImages';

class ProductController {
  static async new(req: Request, res: Response) {
    const daoProduct = new DAOProduct;
    const uploadImages = new UploadImages();
    const ucManagerProduct = new UCManagerProduct(daoProduct);

    let uploadResult;
    let uploadedFiles: Array<UploadedFile>;

    try {
      try {
        uploadResult = await uploadImages.handleArrayUploadFile(req, res);
      } catch (e) {
        return res.status(200).json({ error: [e.message] });
      };

      const newProduct = new Product(JSON.parse(uploadResult.body.product) as Product);

      uploadedFiles = uploadResult.files;

      uploadedFiles.forEach(file => {
        newProduct.images.push(`${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER?.replace(".", "")}/${file.filename}`);
      });

      const firstImage = uploadedFiles[0].filename;
      const thumbName = `${firstImage.split('.')[0]}_thumb.${firstImage.split('.')[1]}`
      const thumbPath = path.resolve(uploadImages.uploadFilePath, thumbName);

      sharp(path.resolve(uploadImages.uploadFilePath, firstImage))
        .resize(400, 400)
        .toFile(thumbPath, function (error) {
          if (error)
            res.status(200).json({ error: "Ocorreu um erro ao tentar criar miniatura da imagem principal" });
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
    const uploadImages = new UploadImages();

    try {
      const { id } = req.params;
      const previousProduct = await ucManagerProduct.get(id);
      // const receivedProduct = new Product(JSON.parse(uploadResult.body.product) as Product);

      res.status(200).json({ bosta: await uploadImages.handleGetBody(req, res) });
      return;

      res.status(200).json({ product: await ucManagerProduct.get(id) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ProductController;