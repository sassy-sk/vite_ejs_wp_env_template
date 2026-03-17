import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const filePath = process.argv[2]

if (!filePath) {
  console.error('使い方: npm run wp-post:create -- post-data/faq.json')
  process.exit(1)
}

const dataFile = path.resolve(process.cwd(), filePath)

if (!fs.existsSync(dataFile)) {
  console.error(`ファイルが見つかりません: ${dataFile}`)
  process.exit(1)
}

const { config, posts } = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
const { post_type, taxonomy, thumbnail: thumbnailUrl } = config

console.log(`投稿タイプ : ${post_type}`)
console.log(`タクソノミー: ${taxonomy}`)
console.log(`件数       : ${posts.length}件\n`)

function cli(cmd) {
  return execSync(`npx wp-env run cli wp ${cmd}`, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim()
}

let thumbnailId = null
function getThumbnailId() {
  if (thumbnailId) return thumbnailId
  if (!thumbnailUrl) return null
  console.log('アイキャッチ画像を登録中...')
  try {
    thumbnailId = cli(
      `media import "${thumbnailUrl}" --title="${post_type}テスト画像" --porcelain`
    )
    console.log(`画像ID: ${thumbnailId}\n`)
  } catch {
    console.warn('画像登録に失敗しました。アイキャッチなしで続行します。')
  }
  return thumbnailId
}

posts.forEach((post, i) => {
  const label = `[${i + 1}/${posts.length}]`
  try {
    const imgId = post.thumbnail ? getThumbnailId() : null

    const escapedContent = post.content.replace(/"/g, '\\"')
    const escapedExcerpt = post.excerpt.replace(/"/g, '\\"')

    const args = [
      `post create`,
      `--post_type=${post_type}`,
      `--post_title="${post.title}"`,
      `--post_excerpt="${escapedExcerpt}"`,
      `--post_content="${escapedContent}"`,
      `--post_status=publish`,
      imgId ? `--meta_input='{"_thumbnail_id":"${imgId}"}'` : '',
      `--porcelain`,
    ]
      .filter(Boolean)
      .join(' ')

    const postId = cli(args)

    // タクソノミーをスラッグで指定
    if (taxonomy && post.category_slug) {
      cli(`post term add ${postId} ${taxonomy} ${post.category_slug}`)
    }

    console.log(`${label} ✓ "${post.title}" (ID: ${postId})`)
  } catch (err) {
    console.error(`${label} ✗ "${post.title}" 失敗`)
    console.error(err.stderr || err.message)
  }
})

console.log('\n完了！')