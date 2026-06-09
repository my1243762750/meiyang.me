import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")

function readDir(dirName: string, locale: string) {
  const dir = path.join(contentDir, locale, dirName)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
}

function readFile<T>(
  dirName: string,
  slug: string,
  locale: string,
): { meta: T; content: string } | null {
  const filePath = path.join(contentDir, locale, dirName, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)
  return { meta: data as T, content }
}

function getAll<T>(
  dirName: string,
  locale: string,
): { meta: T; slug: string }[] {
  const files = readDir(dirName, locale)
  return files.map((f) => {
    const slug = f.replace(/\.md$/, "")
    const filePath = path.join(contentDir, locale, dirName, f)
    const source = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(source)
    return { meta: data as T, slug }
  })
}

export const getProject = (slug: string, locale = "en") =>
  readFile<import("./types").ProjectMeta>("projects", slug, locale)

export const getAllProjects = (locale = "en") =>
  getAll<import("./types").ProjectMeta>("projects", locale)

export const getBlogPost = (slug: string, locale = "en") =>
  readFile<import("./types").BlogMeta>("blog", slug, locale)

export const getAllBlogPosts = (locale = "en") =>
  getAll<import("./types").BlogMeta>("blog", locale)
