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
    const {
      product,
    } = req.body;



    try {
      const newProduct = new Product(product as Product);
      const ucManagerProduct = new UCManagerProduct(daoProduct);
      let uploadResult;
      let uploadedFiles: Array<UploadedFile>;

      try {
        uploadResult = await uploadImages.handleArrayUploadFile(req, res);
      } catch (e) {
        return res.status(200).json({ error: [e.message] });
      };

      res.status(200).json({buceta: uploadResult})
      return;

      uploadedFiles = uploadResult.files;

      uploadedFiles.forEach(file => {
        newProduct.images.push(file.path);
      });

      let firstImage = uploadedFiles[0].filename;
      let thumbPath = path.resolve(uploadImages.uploadFilePath, `${firstImage.split('.')[0]}_thumb.${firstImage.split('.')[1]}`)

      sharp(path.resolve(uploadImages.uploadFilePath, firstImage))
        .resize(400, 400)
        .toFile(thumbPath, function (error) {
          res.status(200).json({ error: error.message });
        });

      newProduct.thumb = thumbPath;

      res.status(200).json({ product: await ucManagerProduct.new(newProduct) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ProductController;