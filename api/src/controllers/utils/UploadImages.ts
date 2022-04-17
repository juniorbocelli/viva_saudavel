import { Request, Response } from 'express';
import multer, { StorageEngine, Multer } from 'multer';
import crypto from 'crypto';
import * as path from 'path';

class UploadImages {
  private uploadFilePath: string;
  private storageFile: StorageEngine;
  private uploadFile: Multer;

  constructor() {
    this.uploadFilePath = `${process.env.DEFAULT_FILE_STORAGE}/${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER}`;

    this.storageFile = multer.diskStorage({
      destination: this.uploadFilePath,
      filename(req: Express.Request, file: Express.Multer.File, fn: (error: Error | null, filename: string) => void): void {
        fn(null, `${crypto.randomBytes(8).toString('hex')}${path.extname(file.originalname)}`);
      },
    });

    this.uploadFile = multer({
      storage: this.storageFile,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        const extension: boolean = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
        const mimeType: boolean = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;

        if (extension && mimeType) {
          return callback(null, true);
        }
        callback(new Error('Só são permitidos arquivos *.jpg e *.png'));
      },
    });
  };

  public handleArrayUploadFile = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
      let uploader = this.uploadFile.array('picture');
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ file: req.files, body: req.body });
      });
    });
  };

  public handleSingleUploadFile = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
      let uploader = this.uploadFile.single('picture');
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ file: req.file, body: req.body });
      });
    });
  };
};

export default UploadImages;