/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * kickflow REST API v1
 * kickflowの開発者用REST API (v1)
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod';


/**
 * 添付ファイルをアップロードします。最大2MBまでのファイルをアップロード可能です。

注意：このAPIはエンタープライズプランのお客様のみ利用可能です。

注意：アップロードしたファイルはすみやかにチケット作成などで使用してください。チケットなどから参照されていないファイルは最短24時間経過後に自動的に削除されます。
 * @summary 添付ファイルをアップロード
 */
export const uploadFileBody = zod.object({
  "file": zod.instanceof(File).optional().describe('添付ファイル')
})

export const uploadFileResponse = zod.object({
  "signedId": zod.string().describe('添付ファイルの署名済みID')
})

/**
 * 添付ファイルのAmazon S3上のURLを含む情報を取得します。

注意: このAPIが返すURLは、5分間で失効します。

注意: チケットに添付されていないファイルはURLを取得できません。先にチケットに添付してください。
 * @summary 添付ファイルの情報を取得
 */
export const getFileResponse = zod.object({
  "url": zod.string().url().describe('Amazon S3のURL'),
  "filename": zod.string().describe('ファイル名'),
  "checksum": zod.string().describe('チェックサム'),
  "byteSize": zod.number().describe('バイト数'),
  "contentType": zod.string().describe('Content-Type'),
  "createdAt": zod.string().datetime({}).describe('作成日時')
})

