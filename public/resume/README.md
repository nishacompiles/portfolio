# Resume

Place your resume PDF in this folder with the exact filename:

```
public/resume/Manisha-Sahay-Resume.pdf
```

The **Download Resume** button in the hero is wired to
`/resume/Manisha-Sahay-Resume.pdf` (see `site.resumeHref` in `src/data/site.ts`).

## How it works

- When the PDF is present, the hero shows an active **Download Resume** button.
- When the file is missing, the button renders disabled ("available soon") —
  no broken link, no fake PDF.
- After adding the PDF, restart the dev server (or rebuild) and it will appear.

## Note

You can also update the "download" filename by changing `site.resumeHref`.