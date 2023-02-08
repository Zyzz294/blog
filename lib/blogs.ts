import { join } from "path";
import fs  from "fs";
import matter from "gray-matter";
import { Blog } from "interfaces/Blog";

const getDir = (path: string) => join(process.cwd(), path);
const BLOG_DIR = getDir("/content/blogs");

const getFileNames = (dir: string): string[] => {
    return fs.readdirSync(dir);
}

const getBlogFileNames = () => {
    return getFileNames(getDir("/content/blogs"));
}

const getItemInPath = (filePath: string) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const {data, content} = matter(fileContent);
    return {...data, content} as Blog;
}

const getBlog = (name: string) => {
    const blog = getItemInPath(join(BLOG_DIR, name));
    blog.slug = name.replace(/\.md$/, "");
    return blog;
}

const getBlogBySlug = (slug: string) => {
    const fileName = slug + '.md';
    return getBlog(fileName);
}

const getBlogs = () => {
    const names = getBlogFileNames();

    const items = names.map(getBlog);
    return items;
}

export {
    getBlogFileNames,
    getBlogs,
    getBlogBySlug 
}