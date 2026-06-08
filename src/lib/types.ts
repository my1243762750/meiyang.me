export interface ProjectMeta {
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  image?: string
  demo?: string
  source?: string
  featured?: boolean
}

export interface BlogMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime?: number
}

export interface MDXContent<T> {
  meta: T
  content: string
}
