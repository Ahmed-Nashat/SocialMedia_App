import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  aws_access_key_id,
  aws_bucket_name,
  aws_region,
  aws_secret_access_key,
} from "../../config/config.service.js";
import type { IFile } from "../interface/multer.interface.js";
import { enums } from "../index.js";
import { readFileSync } from "node:fs";
import { Upload } from "@aws-sdk/lib-storage";

export class S3Serive {
  client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: aws_region,
      credentials: {
        accessKeyId: aws_access_key_id,
        secretAccessKey: aws_secret_access_key,
      },
    });
  }

  // maximum 5 mega per file
  async uploadImage({
    Key,
    file,
    storage = enums.storageEnum.disk,
  }: {
    Key: string;
    file: IFile;
    storage?: enums.storageEnum;
  }) {
    return this.client.send(
      new PutObjectCommand({
        Bucket: aws_bucket_name,
        Key: `${Key}/${file.filename}`,
        Body:
          storage == enums.storageEnum.disk
            ? readFileSync(file.fullPath || file.path)
            : file.buffer,
        // default value
        ACL: "private",
      }),
    );
  }

  // more than 5 mega per file
  async uploadLargeImage({
    folder,
    file,
    storage = enums.storageEnum.disk,
  }: {
    folder: string;
    file: IFile;
    storage?: enums.storageEnum;
  }) {
    const data = new Upload({
      client: this.client,
      params: {
        Bucket: aws_bucket_name,
        Key: `${folder}/${file.filename}`,
        ACL: "private",
        Body:
          storage == enums.storageEnum.disk
            ? readFileSync(file.fullPath || file.path)
            : file.buffer,
        ContentType: file.mimetype,
      },
    });
    data.on("httpUploadProgress", (progress) => {});
    return await data.done();
  }
}

export const s3Service = new S3Serive();
