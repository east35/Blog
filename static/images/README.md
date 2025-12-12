# Images Directory

Place all your blog post images in this directory, organized by year.

## Structure

```
static/images/
├── 2014/
├── 2015/
├── 2017/
├── 2018/
├── 2019/
├── 2020/
├── 2021/
├── 2022/
├── 2023/
├── 2024/
└── 2025/
```

## Usage in Markdown

Reference images in your markdown files like this:

```markdown
![Alt text](/images/2025/projectname/image.jpg)
```

The build process will automatically copy all images from `static/images/` to `public/images/` during the build.
