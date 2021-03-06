import { Request, Response } from 'express';
import multer, { StorageEngine, Multer } from 'multer';
import crypto from 'crypto';
import * as path from 'path';
import fs from 'fs';

export type UploadedFile = {
  fieldname: string; // file
  originalname: string; // myPicture.png
  encoding: string; // 7bit
  mimetype: string; // image/png
  destination: string; // ./public/uploads
  filename: string; // 1571575008566-myPicture.png
  path: string; // public/uploads/1571575008566-myPicture.png
  size: number; // 1255
};

class UploadImages {
  public uploadFilePath: string;
  private storageFile: StorageEngine;
  private uploadFile: Multer;

  constructor() {
    this.uploadFilePath = path.resolve(__dirname, '../..', `${process.env.DEFAULT_IMAGE_PRODUCT_STORAGE_FOLDER}`);

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
      let uploader = this.uploadFile.array('files', undefined);
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ files: req.files, body: req.body });
      });
    });
  };

  public handleSingleUploadFile = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
      let uploader = this.uploadFile.single('files');
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ file: req.file, body: req.body });
      });
    });
  };

  public handleGetBody = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
      let uploader = this.uploadFile.none();
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ files: req.files, body: req.body });
      });
    });
  };

  public fileExist = async (path: string) => {
    return fs.promises.access(path, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  };

  public deleteFile = async (path: string) => {
    if (!(await this.fileExist(path)))
      return;

    fs.unlink(path, (error) => {
      if (error) {
        throw new Error(`Erro ao tentar deletar imagem: ${error.message}`);
      };
    });
  };

  /**
   * Return file name list of not deleted images and remove deleted images pron disk
   * @param previousImages 
   * @param notDeletedImages 
   * @returns 
   */
  public deleteRemovedImages = async (previousImages: Array<string>, notDeletedImages: Array<string>): Promise<Array<string>> => {
    let remainingImages: Array<string> = [];

    previousImages = previousImages.map(image => {
      let splited = image.split('/');
      return splited[splited.length - 1];
    });

    notDeletedImages = notDeletedImages.map(image => {
      let splited = image.split('/');
      return splited[splited.length - 1];
    });

    // No files deleted
    if (previousImages.length === notDeletedImages.length)
      return previousImages;

    previousImages.forEach((image) => {
      if (notDeletedImages.indexOf(image) === -1)
        this.deleteFile(`${this.uploadFilePath}/${image}`);
      else
        remainingImages.push(image);
    });

    return remainingImages;
  };

  /**
   * Verify if thumb  shoulf be removed and remove returning the name of thumb or null
   * @param remainingImages 
   * @param previousThumb 
   * @returns 
   */
  public syncThumb = async (remainingImages: Array<string>, previousThumb: string): Promise<string | null> => {
    const thumbFileName = previousThumb.split('/').at(-1);

    if (typeof (thumbFileName) === 'undefined')
      throw new Error("Nome de miniatura inválido");

    for (let image of remainingImages) {
      let regExp = new RegExp(image.split('.')[0], 'g');

      if (regExp.test(thumbFileName))
        return image;
    };

    this.deleteFile(`${this.uploadFilePath}/${thumbFileName}`);

    return null;
  };
};

export default UploadImages;