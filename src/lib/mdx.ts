import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")

function readDir(dirName: string) {
  const dir = path.join(contentDir, dirName)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
}

function readFile<T>(dirName: string, slug: string): { meta: T; content: string } | null {
  const filePath = path.join(contentDir, dirName, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)
  return { meta: data as T, content }
}

function getAll<T>(dirName: string): { meta: T; slug: string }[] {
  const files = readDir(dirName)
  return files.map((f) => {
    const slug = f.replace(/\.md$/, "")
    const filePath = path.join(contentDir, dirName, f)
    const source = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(source)
    return { meta: data as T, slug }
  })
}

export const getProject = (slug: string) =>
  readFile<import("./types").ProjectMeta>("projects", slug)

export const getAllProjects = () =>
  getAll<import("./types").ProjectMeta>("projects")

export const getBlogPost = (slug: string) =>
  readFile<import("./types").BlogMeta>("blog", slug)

export const getAllBlogPosts = () =>
  getAll<import("./types").BlogMeta>("blog")
