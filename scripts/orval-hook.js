import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const generatedDir = path.resolve(__dirname, '../src/kickflow-api/generated')

const nameMapping = {
  カテゴリ: 'category',
  コメント: 'comment',
  チーム: 'team',
  チケット: 'ticket',
  ファイル: 'file',
  フォルダ: 'folder',
  ユーザー: 'user',
  ワークフロー: 'workflow',
  監査ログ: 'audit-log',
  管理者ロール: 'role',
  経路: 'route',
  組織図: 'organization-chart',
  代理承認: 'proxy-approver',
  代理申請: 'proxy-applicant',
  汎用マスタ: 'general-master',
  役職: 'grade',
}

function renameItems(dirPath) {
  try {
    const items = fs.readdirSync(dirPath)

    items.forEach((item) => {
      const oldPath = path.join(dirPath, item)
      // Check if the path exists before stating
      if (!fs.existsSync(oldPath)) {
        console.warn(`Path does not exist, skipping: ${oldPath}`)
        return
      }
      const stats = fs.statSync(oldPath)
      let lookupName = ''
      let fileSuffix = ''

      if (stats.isDirectory()) {
        lookupName = item
      } else {
        const firstDotIndex = item.indexOf('.')
        if (firstDotIndex === -1) {
          // ファイル名にドットがない場合 (通常はありえないが念のため)
          lookupName = item
          fileSuffix = ''
        } else {
          lookupName = item.substring(0, firstDotIndex)
          fileSuffix = item.substring(firstDotIndex) // .zod.ts などを含む
        }
      }

      if (nameMapping[lookupName]) {
        const newBaseName = nameMapping[lookupName]
        const newName = stats.isDirectory()
          ? newBaseName
          : `${newBaseName}${fileSuffix}`
        const newPath = path.join(dirPath, newName)

        // Avoid renaming to itself or if new path already exists unexpectedly
        if (oldPath !== newPath) {
          if (fs.existsSync(newPath)) {
            console.warn(
              `Target path already exists, skipping rename: ${newPath}`,
            )
            // If it's a directory that already exists, still try to process its contents
            if (stats.isDirectory()) {
              renameItems(newPath) // Process existing directory
            }
          } else {
            console.log(`Renaming ${oldPath} to ${newPath}`)
            fs.renameSync(oldPath, newPath)
            // If it was a directory that got renamed, process its contents in the new path
            if (stats.isDirectory()) {
              renameItems(newPath)
            }
          }
        } else if (stats.isDirectory()) {
          // If oldPath equals newPath and it's a directory, process its contents
          renameItems(oldPath)
        }
      } else if (stats.isDirectory()) {
        // If it's a directory but not in mapping, still process its contents
        renameItems(oldPath)
      }
    })
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error)
  }
}

console.log(`Starting rename process in ${generatedDir}...`)
renameItems(generatedDir)
console.log('Rename process completed.')
