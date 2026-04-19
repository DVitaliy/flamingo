import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, writeFile } from 'node:fs/promises'
import dotenv from 'dotenv'

const execFileAsync = promisify(execFile)

dotenv.config({ path: '.env.local' })
dotenv.config()

const graphqlUrl = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!graphqlUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_GRAPHQL_URL')
}

if (!anonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const { stdout } = await execFileAsync(
  'pnpm',
  [
    'dlx',
    'get-graphql-schema',
    graphqlUrl,
    '--header',
    `apikey=${anonKey}`,
    '--header',
    `Authorization=Bearer ${anonKey}`
  ],
  {
    maxBuffer: 10 * 1024 * 1024
  }
)

await mkdir('__generated__', { recursive: true })
await writeFile('schema.graphql', stdout, 'utf8')
console.log('schema.graphql updated')
console.log('__generated__ directory ensured')
